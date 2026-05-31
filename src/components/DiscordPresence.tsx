
import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
}

interface ActivityTimestamps {
  start?: number;
  end?: number;
}

interface Activity {
  id: string;
  name: string;
  type: number; // 0=game, 4=custom
  state?: string;
  details?: string;
  emoji?: { name: string; id?: string; animated?: boolean };
  application_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  timestamps?: ActivityTimestamps;
}

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  discord_user: DiscordUser;
  spotify: SpotifyData | null;
  activities: Activity[];
  active_on_discord_mobile?: boolean;
  active_on_discord_desktop?: boolean;
  active_on_discord_web?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DISCORD_ID = '572100111732047872';
const WS_URL = 'wss://api.lanyard.rest/socket';
const REST_URL = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

const STATUS_COLORS: Record<string, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

const STATUS_GLOWS: Record<string, string> = {
  online: '0 0 8px #23a55a88',
  idle: '0 0 8px #f0b23288',
  dnd: '0 0 8px #f23f4388',
  offline: 'none',
};

const STATUS_LABELS: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do not disturb',
  offline: 'Offline',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarUrl(id: string, hash: string | null): string | null {
  if (!hash) return null;
  return `https://cdn.discordapp.com/avatars/${id}/${hash}.png?size=128`;
}

function formatElapsed(startMs: number): string {
  const elapsed = Math.floor((Date.now() - startMs) / 1000);
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getActivityImageUrl(activity: Activity): string | null {
  if (!activity.assets?.large_image || !activity.application_id) return null;
  const img = activity.assets.large_image;
  if (img.startsWith('mp:external/')) {
    const decoded = img.replace('mp:external/', '');
    return `https://media.discordapp.net/external/${decoded}`;
  }
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
}

function getActivitySmallImageUrl(activity: Activity): string | null {
  if (!activity.assets?.small_image || !activity.application_id) return null;
  const img = activity.assets.small_image;
  if (img.startsWith('mp:external/')) {
    const decoded = img.replace('mp:external/', '');
    return `https://media.discordapp.net/external/${decoded}`;
  }
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
}

const DesktopIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
    style={{ color: 'var(--dc-icon-color)', marginLeft: '4px', verticalAlign: 'middle' }}>
    <path d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v12h16V4H4zm6 14v2H8v2h8v-2h-2v-2H10z"/>
  </svg>
);

const MobileIcon = () => (
  <svg width="12" height="14" viewBox="0 0 24 24" fill="currentColor"
    style={{ color: 'var(--dc-icon-color)', marginLeft: '4px', verticalAlign: 'middle' }}>
    <path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 20a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5-4H7V4h10v13z"/>
  </svg>
);

const WebIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
    style={{ color: 'var(--dc-icon-color)', marginLeft: '4px', verticalAlign: 'middle' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// ─── Sub-components ──────────────────────────────────────────────────────────

const SkeletonBlock: React.FC<{ width?: string; height?: string; borderRadius?: string; style?: React.CSSProperties }> = ({
  width = '100%', height = '12px', borderRadius = '4px', style,
}) => (
  <div style={{
    width, height, borderRadius,
    background: 'linear-gradient(90deg, var(--dc-skeleton-bg) 25%, var(--dc-skeleton-shine) 50%, var(--dc-skeleton-bg) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    ...style,
  }} />
);

const LoadingSkeleton: React.FC = () => (
  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <SkeletonBlock width="52px" height="52px" borderRadius="50%" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <SkeletonBlock width="60%" height="13px" />
        <SkeletonBlock width="40%" height="10px" />
        <SkeletonBlock width="30%" height="10px" />
      </div>
    </div>
    <div style={{
      background: 'var(--dc-inner-bg)', border: '1px solid var(--dc-peek-border)', borderRadius: '10px', padding: '10px',
      display: 'flex', gap: '10px', alignItems: 'center',
    }}>
      <SkeletonBlock width="44px" height="44px" borderRadius="8px" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <SkeletonBlock width="80%" height="11px" />
        <SkeletonBlock width="55%" height="10px" />
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DiscordPresence() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [elapsed, setElapsed] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [spotifyProgress, setSpotifyProgress] = useState(0);
  const [spotifyElapsed, setSpotifyElapsed] = useState('0:00');
  const [spotifyRemaining, setSpotifyRemaining] = useState('0:00');

  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── useEffect #1: WebSocket + REST fallback ───────────────────────────────
  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.op === 1) {
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        heartbeatRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
        }, msg.d.heartbeat_interval);
      }

      if (msg.op === 0) {
        setData(msg.d);
        setLoading(false);
      }
    };

    ws.onerror = () => {
      fetch(REST_URL)
        .then((r) => r.json())
        .then((json) => {
          if (json?.data) { setData(json.data); setLoading(false); }
        })
        .catch(() => setLoading(false));
    };

    ws.onclose = () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [connect]);

  // ── useEffect #2: Elapsed timer for activity ──────────────────────────────
  useEffect(() => {
    if (elapsedRef.current) clearInterval(elapsedRef.current);

    const gameActivity = data?.activities?.find(
      (a) => a.type === 0 && a.timestamps?.start,
    );

    if (gameActivity?.timestamps?.start) {
      const start = gameActivity.timestamps.start;
      setElapsed(formatElapsed(start));
      elapsedRef.current = setInterval(() => {
        setElapsed(formatElapsed(start));
      }, 1000);
    } else {
      setElapsed('');
    }

    return () => { if (elapsedRef.current) clearInterval(elapsedRef.current); };
  }, [data?.activities]);

  // ── useEffect #3: Spotify progress ticker ──────────────────────────────
  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);

    if (!data?.spotify?.timestamps) {
      setSpotifyProgress(0);
      setSpotifyElapsed('0:00');
      setSpotifyRemaining('0:00');
      return;
    }

    const tick = () => {
      const { start, end } = data.spotify.timestamps;
      const total = end - start;
      const now = Date.now();
      const elapsed = now - start;
      const pct = Math.min((elapsed / total) * 100, 100);

      const em = Math.floor(elapsed / 60000);
      const es = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
      const remaining = Math.max(0, total - elapsed);
      const rm = Math.floor(remaining / 60000);
      const rs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');

      setSpotifyProgress(pct);
      setSpotifyElapsed(`${em}:${es}`);
      setSpotifyRemaining(`${rm}:${rs}`);
    };

    tick();
    progressRef.current = setInterval(tick, 1000);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [data?.spotify?.timestamps?.start, data?.spotify?.timestamps?.end]);

  // ── Derived values ────────────────────────────────────────────────────────
  const status = data?.discord_status ?? 'offline';
  const statusColor = STATUS_COLORS[status];
  const statusGlow = STATUS_GLOWS[status];
  const isOffline = status === 'offline';

  const avatarUrl = data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : null;
  const displayName = data?.discord_user.global_name || data?.discord_user.username || 'Unknown';
  const username = data?.discord_user.username || '';

  const customStatus = data?.activities?.find((a) => a.type === 4);
  const gameActivity = data?.activities?.find((a) => a.type === 0);
  const spotify = data?.spotify;

  const platform = data?.active_on_discord_mobile
    ? 'mobile'
    : data?.active_on_discord_desktop
    ? 'desktop'
    : data?.active_on_discord_web
    ? 'web'
    : null;

  // ── Stacked card items ────────────────────────────────────────────────────
  type CardItem =
    | { type: 'game'; data: Activity }
    | { type: 'stream'; data: Activity }
    | { type: 'watch'; data: Activity }
    | { type: 'compete'; data: Activity }
    | { type: 'spotify'; data: SpotifyData };

  const items: CardItem[] = [];
  const streamActivity = data?.activities?.find(a => a.type === 1);
  const watchActivity = data?.activities?.find(a => a.type === 3);
  const competingActivity = data?.activities?.find(a => a.type === 5);

  if (gameActivity) items.push({ type: 'game', data: gameActivity });
  if (streamActivity) items.push({ type: 'stream', data: streamActivity });
  if (watchActivity) items.push({ type: 'watch', data: watchActivity });
  if (competingActivity) items.push({ type: 'compete', data: competingActivity });
  if (spotify)      items.push({ type: 'spotify',  data: spotify });

  // Click-to-switch
  const handleSwitch = () => {
    if (items.length <= 1 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % items.length);
      setAnimating(false);
    }, 150);
  };

  const currentItem = items[activeIndex] ?? null;

  // ─────────────────────────────────────────────────────────────────────────

  const cardStyle: React.CSSProperties = {
    width: '280px',
    background: 'var(--dc-bg)',
    border: '1px solid var(--dc-border)',
    borderRadius: '16px',
    fontFamily: '"Inter", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');

        :root {
          --dc-bg: #fafafa;
          --dc-border: #e5e5e5;
          --dc-inner-bg: #f0f0f0;
          --dc-inner-border: #d4d4d4;
          --dc-text: #1a1a1a;
          --dc-text-secondary: #3a3a3a;
          --dc-text-muted: #888;
          --dc-text-faint: #999;
          --dc-label: #999;
          --dc-peek-bg: #eaeaea;
          --dc-peek-border: #d4d4d4;
          --dc-skeleton-bg: #e0e0e0;
          --dc-skeleton-shine: #d0d0d0;
          --dc-avatar-fallback-bg: #e0e0e0;
          --dc-icon-color: #999;
          --dc-custom-status: #999;
          --dc-no-activity: #999;
          --dc-emoji-fallback-bg: #e0e0e0;
          --dc-emoji-fallback-text: #999;
        }

        .dark {
          --dc-bg: #0d0d0d;
          --dc-border: #1e1e1e;
          --dc-inner-bg: #0a0a0a;
          --dc-inner-border: #2a2a2a;
          --dc-text: #ffffff;
          --dc-text-secondary: #e0e0e0;
          --dc-text-muted: #666;
          --dc-text-faint: #555;
          --dc-label: #4a4a4a;
          --dc-peek-bg: #0e0e0e;
          --dc-peek-border: #1a1a1a;
          --dc-skeleton-bg: #1a1a1a;
          --dc-skeleton-shine: #252525;
          --dc-avatar-fallback-bg: #1e1e1e;
          --dc-icon-color: #555;
          --dc-custom-status: #666;
          --dc-no-activity: #444;
          --dc-emoji-fallback-bg: #1a1a1a;
          --dc-emoji-fallback-text: #555;
        }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes discordFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .discord-card-section {
          animation: discordFadeIn 0.4s ease forwards;
        }

        .discord-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div style={cardStyle}>
        {/* Top accent gradient line */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)`,
          transition: 'background 0.5s ease',
        }} />

        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
          borderRadius: '16px',
        }} />

        {/* Content wrapper */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div style={{ padding: '14px' }}>

              {/* ── Header ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {imgError || !avatarUrl ? (
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '50%',
                      background: 'var(--dc-avatar-fallback-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 700, color: 'var(--dc-text-muted)',
                      filter: isOffline ? 'grayscale(0.5)' : 'none',
                      transition: 'filter 0.5s ease',
                    }}>
                      MK
                    </div>
                  ) : (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      onError={() => setImgError(true)}
                      style={{
                        width: '46px', height: '46px', borderRadius: '50%',
                        objectFit: 'cover',
                        filter: isOffline ? 'grayscale(0.5)' : 'none',
                        transition: 'filter 0.5s ease',
                      }}
                    />
                  )}
                  {/* Status dot */}
                  <div style={{
                    position: 'absolute', bottom: '1px', right: '1px',
                    width: '11px', height: '11px', borderRadius: '50%',
                    background: statusColor,
                    border: '2px solid var(--dc-bg)',
                    boxShadow: statusGlow,
                    transition: 'background 0.5s ease, box-shadow 0.5s ease',
                  }} />
                </div>

                {/* Name + username + status */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }} className="discord-truncate">
                    <span style={{
                      color: 'var(--dc-text)', fontSize: '15px', fontWeight: 600,
                      lineHeight: 1.2, letterSpacing: '-0.01em',
                    }}>
                      {displayName}
                    </span>
                    {platform === 'desktop' && <DesktopIcon />}
                    {platform === 'mobile' && <MobileIcon />}
                    {platform === 'web' && <WebIcon />}
                  </div>
                  <div style={{ color: 'var(--dc-text-faint)', fontSize: '12px', fontWeight: 400, letterSpacing: '0' }} className="discord-truncate">
                    @{username}
                  </div>
                  <div style={{
                    color: statusColor, fontSize: '11px', marginTop: '3px',
                    fontWeight: 500, letterSpacing: '0.01em',
                    textTransform: 'none', transition: 'color 0.5s ease',
                  }}>
                    {STATUS_LABELS[status]}
                  </div>

                  {/* Custom status */}
                  {customStatus && (
                    <div style={{
                      color: 'var(--dc-custom-status)', fontSize: '11px', marginTop: '4px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontWeight: 400, letterSpacing: '0',
                    }} className="discord-truncate">
                      {customStatus.emoji && (
                        <span style={{ fontSize: '12px' }}>
                          {customStatus.emoji.id
                            ? <img
                                src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}?size=16`}
                                alt={customStatus.emoji.name}
                                style={{ width: '14px', height: '14px', verticalAlign: 'middle' }}
                              />
                            : customStatus.emoji.name}
                        </span>
                      )}
                      {customStatus.state}
                    </div>
                  )}
                </div>
              </div>

              {/* ── No activity fallback ── */}
              {items.length === 0 && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--dc-no-activity)',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  letterSpacing: '0.02em',
                  padding: '4px 0',
                  textAlign: 'center',
                }}>
                  No activity right now
                </div>
              )}

              {/* ── Stacked card slot ── */}
              {currentItem && (
                <div>
                  {/* Section label */}
                  <div style={{
                    color: 'var(--dc-label)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.06em', marginBottom: '5px',
                  }}>
                    {currentItem.type === 'game' ? 'PLAYING' :
                     currentItem.type === 'stream' ? 'STREAMING' :
                     currentItem.type === 'watch' ? 'WATCHING' :
                     currentItem.type === 'compete' ? 'COMPETING IN' :
                     'LISTENING TO'}
                  </div>

                  {/* Deck wrapper */}
                  <div
                    style={{
                      position: 'relative',
                      cursor: items.length > 1 ? 'pointer' : 'default',
                      paddingBottom: items.length > 1 ? '6px' : '0',
                    }}
                    onClick={handleSwitch}
                    onMouseEnter={() => items.length > 1 && setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {/* Peek card behind */}
                    {items.length > 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: '8px',
                        right: '8px',
                        height: '100%',
                        background: 'var(--dc-peek-bg)',
                        border: '1px solid var(--dc-peek-border)',
                        borderRadius: '10px',
                        zIndex: 0,
                        opacity: 0.6,
                      }} />
                    )}

                    {/* Active card on top */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      background: 'var(--dc-inner-bg)',
                      border: '1px solid var(--dc-inner-border)',
                      borderRadius: '10px',
                      padding: '8px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      opacity: animating ? 0 : 1,
                      transform: animating
                        ? 'scale(0.97)'
                        : hovered && items.length > 1
                          ? 'translateY(-2px)'
                          : 'scale(1)',
                      transition: 'opacity 0.15s ease, transform 0.15s ease',
                    }}>
                      {currentItem.type !== 'spotify' ? (() => {
                        const act = currentItem.data as Activity;
                        const largeImg = getActivityImageUrl(act);
                        const smallImg = getActivitySmallImageUrl(act);
                        return (
                          <>
                            {largeImg ? (
                              <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img
                                  src={largeImg}
                                  alt={act.assets?.large_text || act.name}
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                  style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                                {smallImg && (
                                  <img
                                    src={smallImg}
                                    alt={act.assets?.small_text || ''}
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    style={{
                                      position: 'absolute', bottom: '-4px', right: '-4px',
                                      width: '16px', height: '16px', borderRadius: '50%',
                                      border: '2px solid var(--dc-inner-bg)', objectFit: 'cover',
                                    }}
                                  />
                                )}
                              </div>
                            ) : (
                              <div style={{
                                width: '38px', height: '38px', borderRadius: '8px',
                                background: 'var(--dc-emoji-fallback-bg)', color: 'var(--dc-emoji-fallback-text)', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '18px',
                              }}>
                                {act.name.includes('Discord') ? '💬' : act.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                color: 'var(--dc-text-secondary)', fontSize: '12px', fontWeight: 600,
                                marginBottom: '2px', lineHeight: 1.3, letterSpacing: '-0.01em',
                              }} className="discord-truncate">
                                {act.name}
                              </div>
                              {act.details || act.name.includes('Discord') ? (
                                <div style={{ color: 'var(--dc-text-muted)', fontSize: '11px', fontWeight: 400, letterSpacing: '0', lineHeight: 1.3 }} className="discord-truncate">
                                  {act.details || (act.name.includes('Discord') ? 'In Voice Channel' : '')}
                                </div>
                              ) : null}
                              {act.state && (
                                <div style={{ color: 'var(--dc-text-muted)', fontSize: '11px', fontWeight: 400, letterSpacing: '0', lineHeight: 1.3 }} className="discord-truncate">
                                  {act.state}
                                </div>
                              )}
                              {elapsed && (
                                <div style={{
                                  color: 'var(--dc-text-muted)', fontSize: '10px', marginTop: '4px',
                                  fontFamily: '"Geist Mono", monospace', fontWeight: 400,
                                }}>
                                  {elapsed} elapsed
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })() : (() => {
                        const sp = currentItem.data as SpotifyData;
                        return (
                          <>
                            <img
                              src={sp.album_art_url}
                              alt={sp.album}
                              style={{
                                width: '38px', height: '38px', borderRadius: '6px',
                                objectFit: 'cover', flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'flex-start', marginBottom: '2px',
                              }}>
                                <div style={{
                                  fontSize: '9px', fontWeight: 600, color: '#1db954',
                                  letterSpacing: '0.07em', textTransform: 'uppercase',
                                }}>
                                  ● SPOTIFY
                                </div>
                                <span style={{
                                  fontFamily: '"Geist Mono", monospace',
                                  fontSize: '10px', color: '#1db954',
                                  lineHeight: 1, flexShrink: 0, marginLeft: '6px',
                                }}>
                                  {spotifyElapsed}
                                </span>
                              </div>
                              <div style={{
                                fontSize: '12px', fontWeight: 600, color: 'var(--dc-text-secondary)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                              }}>
                                {sp.song}
                              </div>
                              <div style={{
                                fontSize: '11px', color: 'var(--dc-text-muted)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                marginBottom: '5px',
                              }}>
                                {sp.artist}
                              </div>
                              <div style={{
                                width: '100%', height: '2px',
                                background: '#1e1e1e', borderRadius: '999px',
                              }}>
                                <div style={{
                                  width: `${spotifyProgress}%`, height: '100%',
                                  background: '#1db954', borderRadius: '999px',
                                  transition: 'width 1s linear',
                                }} />
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  );
}
