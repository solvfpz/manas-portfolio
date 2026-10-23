
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCES } from '../constants';

const WorkExperience: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold">Work Experience</h2>
      <div className="w-full space-y-2">
        {EXPERIENCES.map((exp, idx) => (
          <div key={exp.company} className="border-b border-border/50">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="group flex flex-1 w-full items-center justify-between py-4 hover:bg-muted/30 rounded-lg px-2 -mx-2 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pr-2 gap-1 text-left">
                <div className="flex items-center gap-3">
                  {exp.logo.startsWith('/') || exp.logo.startsWith('http') ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-8 w-8 shrink-0 rounded-md object-cover border border-border"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold text-xs shrink-0 border border-border">
                      {exp.logo}
                    </div>
                  )}
                  <div className="flex items-center gap-x-1.5">
                    <span className="font-semibold text-base">{exp.company}</span>
                    <span className="text-muted-foreground text-xs font-mono hidden sm:inline">/</span>
                    <span className="text-muted-foreground text-xs font-mono">{exp.role}</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground tabular-nums pl-11 sm:pl-0">
                  {exp.period}
                </div>
              </div>
              <ChevronDown className={`size-4 text-muted-foreground transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-1 pl-11">
                    <div className="flex gap-2 mb-3">
                      {exp.isRemote && (
                        <span className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50 text-[10px] px-2 py-0.5 rounded-md font-semibold">Remote</span>
                      )}
                      {exp.isIntern && (
                        <span className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50 text-[10px] px-2 py-0.5 rounded-md font-semibold">Intern</span>
                      )}
                      {exp.isFreelance && (
                        <span className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50 text-[10px] px-2 py-0.5 rounded-md font-semibold">Freelance</span>
                      )}
                    </div>
                    <ul className="list-disc space-y-1.5 text-sm text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                    {exp.stack && exp.stack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
