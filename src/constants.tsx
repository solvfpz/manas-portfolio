
import React from 'react';
import { Project, Experience, Contribution, BlogPost, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    title: "Real Time Attendance System",
    description: "Full-stack app with secure auth, live updates, and admin dashboard.",
    tags: ["HTML", "CSS", "JavaScript", "FireBase", "ML"],
    github: "https://github.com/solvfpz/smart-geo-campus",
    image: "/image3.png"
  },
  {
    title: "CurrencyConverterBot",
    description: "A lightweight bot that converts currencies in real time using live exchange rates, allowing users to instantly convert amounts with simple commands.",
    tags: ["JavaScript", "API Integration", "Real-time Data", "Bot Development", "Automation"],
    github: "https://github.com/solvfpz/currencyconverterbot",
    image: "/image2.jpg"
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Independent Projects",
    role: "Full Stack Developer",
    period: "2024 - Present",
    logo: "M",
    isRemote: true,
    description: [
      "Built full-stack web applications from scratch, handling frontend, backend, and deployment.",
      "Developed real-time systems including attendance tracking and automation bots.",
      "Worked with modern stacks like Next.js, Firebase, Node.js, and REST APIs.",
      "Focused on clean UI, scalable logic, and real-world usability."
    ]
  },
];

export const CONTRIBUTIONS: Contribution[] = [
  {
    repo: "solana-labs/solana-program-library",
    title: "examples: add simple NFT mint for students",
    type: 'pull-request'
  },
  {
    repo: "vercel/next.js",
    title: "Add ShadCN UI Integration to create-next-app",
    type: 'merge'
  },
  {
    repo: "langchain-ai/langchain",
    title: "feat: add web UI demo for student projects",
    type: 'pull-request'
  }
];

export const BLOGS: BlogPost[] = [
  {
    title: "Horizontal Scaling in Databases: Part 1 — Read Replicas",
    summary: "As applications grow, databases often become the bottleneck. Learn how read replicas helps serve data efficiently.",
    publishedAt: "2025-12-26",
    slug: "read-replicas"
  },
  {
    title: "How to convert any Medium blog to Markdown in seconds",
    summary: "Convert your Medium articles into clean, editable Markdown format quickly with mdify—no copy-pasting required.",
    publishedAt: "2025-11-14",
    slug: "mdify"
  }
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "React/Next.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "Firebase", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" }
];
