
import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-4 border-y border-border py-12 px-4 dark:bg-[radial-gradient(35%_80%_at_25%_0%,rgba(255,255,255,0.05),transparent)]">
      {/* Corner Pluses */}
      <Plus className="absolute top-[-12px] left-[-12px] text-border size-6" />
      <Plus className="absolute top-[-12px] right-[-12px] text-border size-6" />
      <Plus className="absolute bottom-[-12px] left-[-12px] text-border size-6" />
      <Plus className="absolute bottom-[-12px] right-[-12px] text-border size-6" />

      {/* Decorative center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-border/30 -z-10"></div>

      <h2 className="text-center font-semibold text-2xl md:text-3xl">Let’s Build Something Great.</h2>
      <p className="text-center font-medium text-muted-foreground text-sm md:text-base">
        Looking for a reliable developer? Let’s talk.
      </p>

      <div className="flex items-center justify-center gap-4 pt-4">
        <a href="mailto:manasvk2707@gmail.com" className="px-6 py-2 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors">
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default CTA;
