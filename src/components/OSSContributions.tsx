
import React, { useState } from 'react';
import { GitMerge, GitPullRequest, ChevronDown } from 'lucide-react';
import { CONTRIBUTIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const OSSContributions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold">Open Source Contributions</h2>
      <div className="w-full">
        {CONTRIBUTIONS.map((con, idx) => (
          <div key={idx} className="border-b border-border/50">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="group flex flex-1 w-full items-center justify-between py-3 hover:bg-muted/30 rounded-lg px-2 -mx-2 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-left w-full pr-2">
                <div className="flex items-center gap-2">
                  {con.type === 'merge' ? 
                    <GitMerge className="size-4 text-purple-500" /> : 
                    <GitPullRequest className="size-4 text-green-500" />
                  }
                  <span className="font-mono text-sm break-all">{con.repo}</span>
                </div>
                <span className="text-sm text-muted-foreground line-clamp-1 sm:ml-auto md:ml-0">{con.title}</span>
              </div>
              <ChevronDown className={`size-4 text-muted-foreground transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OSSContributions;
