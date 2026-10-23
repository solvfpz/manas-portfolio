
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Github, Linkedin, Mail, ArrowRight, ChevronRight, GitMerge, GitPullRequest, Plus, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '../config/personal';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [time, setTime] = useState(new Date());
  const [showToTop, setShowToTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Track scroll position: reveals the "back to top" control and drives the nav progress line.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShowToTop(y > 320);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <div className="min-h-screen bg-background relative font-sans">
      {/* Decorative vertical borders */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 border-l-2 border-dotted border-foreground/40 ml-[calc(50%-28rem)] z-0"></div>
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-0.5 border-r-2 border-dotted border-foreground/40 mr-[calc(50%-28rem)] z-0"></div>

      <div className="container relative mx-auto max-w-4xl px-4 md:px-6 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border/20 bg-background/80 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-foreground ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>Home</Link>
            <Link to="/projects" className={`text-sm font-medium transition-colors hover:text-foreground ${location.pathname === '/projects' ? 'text-foreground' : 'text-muted-foreground'}`}>Projects</Link>
            <Link to="/blogs" className={`text-sm font-medium transition-colors hover:text-foreground ${location.pathname === '/blogs' ? 'text-foreground' : 'text-muted-foreground'}`}>Blog</Link>
          </div>

          <div className="flex items-center gap-1">
            <AnimatePresence initial={false}>
              {showToTop && (
                <motion.button
                  key="to-top"
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  title="Back to top"
                  initial={{ opacity: 0, y: -6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.92 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="group flex h-9 w-9 items-center justify-center rounded-md text-foreground/45 transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-none"
                >
                  <ArrowUp className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                </motion.button>
              )}
            </AnimatePresence>

            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-accent transition-colors relative w-9 h-9 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Reading progress line, pinned to the nav's bottom border */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-foreground/45"
            style={{ transform: `scaleX(${progress})` }}
          />
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full pt-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-8 text-xs text-muted-foreground border-t border-border mt-12">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
              <p>Designed & Developed by <span className="font-semibold text-foreground">{PERSONAL.name}</span></p>
              <p className="opacity-70">© 2026. All rights reserved.</p>
            </div>

            <div className="flex flex-col gap-1 items-center sm:items-end text-center sm:text-right">
              <p className="font-mono tabular-nums">
                <span className="text-foreground font-semibold">{formatTime(time)}</span> IST
              </p>
              <p className="font-mono tabular-nums">{PERSONAL.location}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
