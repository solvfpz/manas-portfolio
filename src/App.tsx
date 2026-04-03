
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import SectionSeparator from './components/SectionSeparator';
import WorkExperience from './components/WorkExperience';
import ProjectGrid from './components/ProjectGrid';
import OSSContributions from './components/OSSContributions';
import BlogGrid from './components/BlogGrid';
import Skills from './components/Skills';
import CTA from './components/CTA';

const Home: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-12 pb-20">
      <Hero />

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl">
        <section className="flex flex-col gap-y-3">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground leading-relaxed">
            I enjoy building software from scratch and taking it all the way to production. From frontend and backend to deployment, my focus is on creating reliable, practical solutions. Hands-on building is how I learn and improve.
          </p>
        </section>
      </motion.div>

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl">
        <WorkExperience />
      </motion.div>

      <SectionSeparator />

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl">
        <ProjectGrid limit={3} />
        <div className="flex justify-center mt-8">
          <Link to="/projects" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-all group">
            Show All Projects <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      <SectionSeparator />

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl">
        <OSSContributions />
      </motion.div>

      <SectionSeparator />

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl">
        <BlogGrid limit={2} />
        <div className="flex justify-center mt-8">
          <Link to="/blogs" className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-all group">
            Show All Posts <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      <SectionSeparator />

      <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl pb-12">
        <Skills />
      </motion.div>

      <SectionSeparator />

      <motion.div {...fadeInUp}>
        <CTA />
      </motion.div>
    </div>
  );
};

const ProjectsPage: React.FC = () => (
  <div className="mx-auto w-full max-w-3xl space-y-12 pb-20">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ProjectGrid />
    </motion.div>
  </div>
);

const BlogsPage: React.FC = () => (
  <div className="mx-auto w-full max-w-3xl space-y-12 pb-20">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BlogGrid />
    </motion.div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
