import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { BLOGS } from '../constants';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const post = BLOGS.find((p) => p.slug === slug);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/content/blog/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }
        const markdown = await response.text();
        const html = marked(markdown);
        setContent(html);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl pb-20" style={{ padding: '60px 24px' }}>
        <div className="text-center" style={{ color: '#666', fontSize: '14px' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl pb-20" style={{ padding: '60px 24px' }}>
        <div className="text-center" style={{ color: '#ef4444', fontSize: '14px' }}>
          Error: {error}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <a href="/blogs" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-all group">
            Back to Blogs
          </a>
        </div>
      </div>
    );
  }

  const readingTime = Math.max(1, Math.floor(content.split(/\s+/).length / 200));
  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <style>{`
        .blog-content {
          font-family: 'Space Grotesk', sans-serif;
          color: #a3a3a3;
          font-size: 15px;
          line-height: 1.8;
        }
        .blog-content h1 {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0 0 32px 0;
          line-height: 1.2;
        }
        .blog-content h2 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin: 48px 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #1e1e1e;
        }
        .blog-content h3 {
          font-size: 15px;
          font-weight: 600;
          color: #e0e0e0;
          margin: 32px 0 12px 0;
        }
        .blog-content p {
          margin: 0 0 20px 0;
          color: #a3a3a3;
        }
        .blog-content strong {
          color: #ffffff;
          font-weight: 600;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid #1e1e1e;
          margin: 40px 0;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 20px;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .blog-content li {
          color: #a3a3a3;
          line-height: 1.7;
        }
        .blog-content code {
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          color: #4ade80;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .blog-content pre {
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 10px;
          padding: 16px;
          overflow-x: auto;
          margin: 24px 0;
        }
        .blog-content pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: #e0e0e0;
        }
        .blog-content blockquote {
          border-left: 2px solid #333;
          padding-left: 16px;
          margin: 24px 0;
          color: #666;
          font-style: italic;
        }
        .blog-content a {
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-content a:hover {
          color: #93c5fd;
        }
        .blog-content img {
          border-radius: 10px;
          margin: 24px 0;
          max-width: 100%;
        }
      `}</style>

      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '60px 24px',
      }}>
        {post && (
          <div style={{ marginBottom: '48px' }}>
            <p style={{
              fontSize: '12px',
              color: '#555',
              fontFamily: 'Geist Mono, monospace',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              {formattedDate} · {readingTime} min read
            </p>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              margin: 0,
            }}>
              {post.title}
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.6,
              marginTop: '16px',
            }}>
              {post.summary}
            </p>
            <div style={{
              height: '1px',
              background: '#1e1e1e',
              marginTop: '32px',
            }} />
          </div>
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div style={{
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: '1px solid #1e1e1e',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <a
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-all group"
          >
            Back to Blogs
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
