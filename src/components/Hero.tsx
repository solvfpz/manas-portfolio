
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import profilePic from './image1.jpeg';
import { PERSONAL } from '../config/personal';

const Hero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-center w-full mb-8 select-none relative z-10 py-4">
        <div className="relative group cursor-help inline-flex flex-col items-center">
          <span className="text-muted-foreground/10 text-center font-serif italic text-7xl sm:text-8xl md:text-9xl font-bold whitespace-nowrap transition-opacity group-hover:opacity-100 duration-300">
            改善
          </span>

          {/* Tooltip */}
          <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
            {/* Arrow */}
            <div className="w-4 h-4 bg-zinc-900 rotate-45 -mb-2 border-t border-l border-zinc-800"></div>

            {/* Content Card */}
            <div className="w-64 bg-zinc-900 rounded-xl border border-zinc-800 p-5 shadow-2xl text-left">
              <div className="flex items-baseline justify-between mb-4 border-b border-zinc-800 pb-4">
                <h3 className="text-3xl font-serif font-bold text-zinc-50">改善</h3>
                <span className="font-mono text-zinc-400 text-sm">/kaizen/</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">NOUN</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Continuous improvement;<br />
                  changing for the better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-row items-center justify-start gap-4 sm:gap-8">
          <div className="relative shrink-0 -mt-16 sm:mt-0">
            <div className="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 sm:h-40 sm:w-40 ring-2 ring-border ring-offset-2 ring-offset-background">
              <img
                src={profilePic}
                alt={PERSONAL.name}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2 text-left pt-0 sm:pt-16 -mt-4 sm:mt-0">
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-5xl tracking-tight">{PERSONAL.name}</h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" className="h-6 w-6" alt="Verified" />
              </div>
                <p className="text-muted-foreground font-mono text-sm">{PERSONAL.title}</p>
            </div>

            <div className="flex items-center gap-x-4 text-muted-foreground pt-1">
              <a href={`mailto:${PERSONAL.email}`} className="hover:text-foreground transition-colors"><Mail className="size-5" /></a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Github className="size-5" /></a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Linkedin className="size-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
