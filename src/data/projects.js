/** @typedef {'image' | 'video'} PreviewKind */

/**
 * Flagship featured project — AlphaMap
 */
export const featuredProject = {
  id: 'alphamap',
  title: 'AlphaMap',
  tagline: 'Installable semantic compression & encryption for secure, efficient data systems.',
  description:
    'AlphaMap is a flagship engineering product combining semantic compression, custom encoding, and encryption into an installable Python package — built for research-grade reliability with startup-scale product direction.',
  install: 'pip install alphamap',
  capabilities: [
    'Semantic compression',
    'Encryption system',
    'Custom encoding engine',
    'Real-time compression insights',
    'Installable package ecosystem',
  ],
  stack: ['Python', 'React', 'Cryptography', 'CLI'],
  github: 'https://github.com/SHRE-RAAM-P-J/Alpha_Map',
  preview: '/media/projects/compression.webp',
  accent: '#6366f1',
};

/**
 * Showcase grid projects (below featured)
 */
export const showcaseProjects = [
  {
    id: 'crowd-analyzer',
    title: 'Crowd Analyzer',
    description:
      'End-to-end AI surveillance and analytics: ESP32-CAM capture, YOLOv8 detection, density heatmaps, live dashboard, and alerting — a real-world edge-to-cloud deployment.',
    highlights: ['ESP32-CAM', 'YOLOv8', 'Heatmaps', 'Live dashboard'],
    stack: ['ESP32-CAM', 'YOLOv8', 'Flask', 'Python', 'OpenCV'],
    github: 'https://github.com/SHRE-RAAM-P-J/Crowd-Anlayser-Esp32Cam',
    live: null,
    preview: '/media/projects/crowd-analyzer.webp',
    previewVideo: '/media/hero-dev-loop.mp4',
    accent: '#22d3ee',
  },
  {
    id: 'instagram-analytics',
    title: 'Instagram Influencer Analytics',
    description:
      'Large-scale influencer intelligence pipeline with dataset cleaning, analytics workflows, automation, reporting, and ML-assisted ranking insights.',
    highlights: ['Dataset pipelines', 'Automation', 'ML-assisted insights'],
    stack: ['Python', 'Pandas', 'NumPy', 'Apify', 'Google Sheets'],
    github: 'https://github.com/SHRE-RAAM-P-J/instagram-influencer-analytics',
    live: null,
    preview: '/media/projects/analytics.webp',
    accent: '#a855f7',
  },
  {
    id: 'estatein',
    title: 'Estatein',
    description:
      'Modern real estate web platform with responsive UI, premium interface design, and a scalable React + Vite frontend architecture.',
    highlights: ['React + Vite', 'Responsive UI', 'Premium UX'],
    stack: ['React', 'Vite', 'CSS', 'JavaScript'],
    github: 'https://github.com/SHRE-RAAM-P-J/Estatein',
    live: 'https://estatei.vercel.app',
    preview: '/media/projects/estatein.webp',
    accent: '#818cf8',
  },
  {
    id: 'inamigos',
    title: 'InAmigos Intern Website',
    description:
      'NGO foundation web delivery with responsive implementation, UI recreation, redirects, and a practical deployment workflow.',
    highlights: ['Foundation delivery', 'Responsive UI', 'Deployed pages'],
    stack: ['HTML', 'CSS', 'React', 'Vite'],
    github: 'https://github.com/SHRE-RAAM-P-J/InAmigos-Intern',
    live: 'https://shre-raam-p-j.github.io/InAmigos-Intern/',
    preview: '/media/projects/web-delivery.webp',
    accent: '#34d399',
  },
  {
    id: 'trading-bot',
    title: 'Trading Bot',
    description:
      'Automation-focused trading workflow with structured logic execution, market interaction concepts, and repeatable strategy operations.',
    highlights: ['Automation', 'Logic execution', 'Market workflows'],
    stack: ['Python', 'Automation', 'APIs'],
    github: 'https://github.com/SHRE-RAAM-P-J/Trading_Bot',
    live: null,
    preview: '/media/projects/trading.webp',
    accent: '#f472b6',
  },
  {
    id: 'duplicate-finder',
    title: 'Duplicate File Finder',
    description:
      'Desktop productivity tool in C++ and Qt for fast duplicate detection, storage optimization, and system organization at scale.',
    highlights: ['C++', 'Qt', 'File optimization'],
    stack: ['C++', 'Qt', 'Desktop'],
    github: 'https://github.com/SHRE-RAAM-P-J/Duplicate-File-Finder',
    live: null,
    preview: '/media/projects/desktop.webp',
    accent: '#34d399',
  },
];

/** @deprecated Use showcaseProjects — kept for any legacy imports */
export const projects = [featuredProject, ...showcaseProjects];
