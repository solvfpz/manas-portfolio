
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';

const ProjectGrid: React.FC<{ limit?: number }> = ({ limit }) => {
  const displayProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold">Projects</h2>
      <div className="space-y-4">
        {displayProjects.map((project) => (
          <div key={project.title} className="rounded-lg text-card-foreground flex flex-col overflow-hidden border border-border/50 p-3 bg-accent/20 shadow-sm sm:flex-row sm:items-start transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted sm:w-64 sm:shrink-0">
              <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:pt-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-lg tracking-tight">{project.title}</h3>
                <div className="flex gap-2">
                  {project.link && (
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border px-2 py-1 rounded-md bg-background/50 transition-colors">
                      <ExternalLink className="size-3" /> Live
                    </a>
                  )}
                  <a href={project.github} target="_blank" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border px-2 py-1 rounded-md bg-background/50 transition-colors">
                    <Github className="size-3" /> GitHub
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded-md border border-border bg-muted/50 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
