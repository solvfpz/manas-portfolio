
import React from 'react';
import { Project, Experience, Contribution, BlogPost, Skill } from './types';

export const PROJECTS: Project[] = [
    {
    title: "Galaxy Mart",
    description:"A full-stack E-Commerce platform with secure authentication, real-time stock management, and admin dashboard. Includes crypto payment integration, order tracking, and modern UI.",
    tags: [
    "JavaScript",
    "React",
    "Next.js",
    "MongoDB",
    "Node.js",
    "Crypto Payments"
  ],
  link: "https://galaxymart.store/",
  github: "https://github.com/solvfpz/galaxymart-saas",
  image: "/image4.png"
  },
  {
  title: "QR Vault",
  description: "Instant UPI & crypto QR generator. Scan, pay, done.",
  tags: ["React", "Vite", "TailwindCSS", "UPI", "Crypto", "QR API", "Fintech"],
  link: "https://upi2qr-kappa.vercel.app/",
  github: "https://github.com/solvfpz/upi2qr",
  image: "/upi2qr-logo.png"
  },
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
    period: "2025 - Present",
    logo: "M",
    isRemote: true,
    description: [
      "Built full-stack web applications from scratch, handling frontend, backend, and deployment.",
      "Developed real-time systems including attendance tracking and automation bots.",
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
  title: "AI Won't Replace Developers — It Replaced My Google Searches",
  summary: "Everyone's panicking about AI taking dev jobs. I build with AI daily, and here's what's actually happening.",
  publishedAt: "2026-05-31",
  slug: "ai-wont-replace-developers"
},
{
  title: "Building with AI — How I Actually Use It in My Workflow",
  summary: "Not a tutorial. Just how I actually build stuff day to day as a 19-year-old developer who ships real projects.",
  publishedAt: "2026-05-31",
  slug: "building-with-ai"
}
];

export const SKILLS: Skill[] = [
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "React/Next.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "Firebase", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" }
];
