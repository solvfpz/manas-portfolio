
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BLOGS } from '../constants';

const BlogGrid: React.FC<{ limit?: number }> = ({ limit }) => {
  const displayBlogs = limit ? BLOGS.slice(0, limit) : BLOGS;

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayBlogs.map((blog) => (
          <a key={blog.slug} href={`#/blogs/${blog.slug}`} className="block group h-full">
            <div className="rounded-lg text-card-foreground flex flex-col h-full border border-border/50 p-4 bg-accent/20 transition-all duration-300 hover:bg-muted/50 hover:shadow-lg">
              <div className="flex flex-col gap-2 h-full">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{blog.publishedAt}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-auto">
                  {blog.summary}
                </p>
                <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors mt-4">
                  Read more <ArrowRight className="ml-1 size-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;
