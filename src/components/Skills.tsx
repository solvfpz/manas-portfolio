
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="rounded-md border border-border px-2.5 py-1 text-sm font-medium flex items-center gap-2 bg-background/50 hover:bg-muted/50 transition-colors cursor-default">
            <img src={skill.icon} alt={skill.name} className="size-4" />
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
