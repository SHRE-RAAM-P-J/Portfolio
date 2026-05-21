/** @typedef {'engineering' | 'college' | 'learning' | 'guides' | 'projects' | 'productivity'} BlogBanner */

export const BLOG_CATEGORIES = [
  'All',
  'College Life',
  'Engineering Thoughts',
  'Learning Journey',
  'Beginner Guides',
  'Projects & Building',
  'Productivity',
];

/** @type {Array<{ id: string; title: string; excerpt: string; category: string; tags: string[]; readTime: number; date: string; featured?: boolean; banner: BlogBanner; content: Array<{ type: 'p' | 'h2' | 'h3' | 'ul'; text?: string; items?: string[] }> }>} */
export const blogs = [
  {
    id: 'why-dsa',
    title: 'Why DSA? — My Point of View',
    excerpt:
      'Startups often care about what you ship; large companies often care about how you think at scale. Here is a balanced take from a student still figuring both paths out.',
    category: 'Engineering Thoughts',
    tags: ['Engineering Thoughts', 'Learning Journey'],
    readTime: 6,
    date: 'May 2026',
    featured: true,
    banner: 'engineering',
    content: [
      {
        type: 'p',
        text: 'If you are in computer science, you have probably heard some version of this debate: “Just learn DSA” versus “Just build projects.” I do not think either side is fully wrong — but the context matters more than people admit.',
      },
      {
        type: 'h2',
        text: 'Two different worlds, two different signals',
      },
      {
        type: 'p',
        text: 'From what I have observed (and from conversations with seniors and recruiters), startups and early product teams often care most about whether you can ship: prototypes, internships, real repos, and the ability to learn fast under pressure. They want momentum.',
      },
      {
        type: 'p',
        text: 'Large MNCs — especially teams maintaining huge codebases — often value structured problem-solving because their work involves performance, reliability, and trade-offs at scale. DSA interviews became a standardized way to test that style of thinking, even when day-to-day work looks different.',
      },
      {
        type: 'h2',
        text: 'Neither path is “the truth”',
      },
      {
        type: 'p',
        text: 'I am not anti-DSA. Patterns like arrays, trees, and basic complexity intuition helped me write cleaner logic and debug faster. But grinding hundreds of problems without building anything never made me feel job-ready.',
      },
      {
        type: 'p',
        text: 'Likewise, copying projects without understanding fundamentals left me stuck when requirements changed. The sweet spot, for me, has been alternating: build something real, hit a wall, then study the concept that removes the wall.',
      },
      {
        type: 'h2',
        text: 'What I am doing personally',
      },
      {
        type: 'ul',
        items: [
          'Weekly project work (portfolio, tools, internships) as the main growth engine.',
          'Light DSA practice for clarity — not as performance theater.',
          'Documenting learnings so interview answers come from real stories, not memorized scripts.',
        ],
      },
      {
        type: 'h2',
        text: 'A question worth discussing',
      },
      {
        type: 'p',
        text: 'If you are early in your journey: what role are you actually preparing for right now — builder, optimizer, or both? Your answer should shape how you split time between shipping and studying.',
      },
      {
        type: 'p',
        text: 'I am still experimenting. If you have a different experience — startup, service company, or freelance — I would genuinely like to hear how DSA showed up (or did not) in your path.',
      },
    ],
  },
  {
    id: 'first-semester',
    title: 'What First Semester Actually Taught Me',
    excerpt:
      'Beyond grades: managing energy, finding serious friends, and learning that consistency beats cramming.',
    category: 'College Life',
    tags: ['College Life', 'Productivity'],
    readTime: 4,
    date: 'Apr 2026',
    banner: 'college',
    content: [
      {
        type: 'p',
        text: 'First semester felt like a reset button. I came in thinking marks alone would define progress. Halfway through, I realized energy management and people around me mattered just as much.',
      },
      {
        type: 'h2',
        text: 'Small habits that helped',
      },
      {
        type: 'ul',
        items: [
          'Fixed study blocks instead of random all-nighters.',
          'One personal project lane alongside college assignments.',
          'Saying no to distractions that felt urgent but were not important.',
        ],
      },
      {
        type: 'p',
        text: 'College is not only about surviving exams. It is about learning how you work when nobody is chasing you — that skill transfers everywhere.',
      },
    ],
  },
  {
    id: 'ship-before-perfect',
    title: 'Ship Before It Feels Perfect',
    excerpt:
      'Perfection delayed my projects for months. Shipping ugly v1s is what finally made me learn faster.',
    category: 'Projects & Building',
    tags: ['Projects & Building', 'Learning Journey'],
    readTime: 5,
    date: 'Mar 2026',
    banner: 'projects',
    content: [
      {
        type: 'p',
        text: 'I used to redesign the same landing page for weeks because it did not feel “portfolio ready.” Meanwhile, the backend was empty and the demo did not exist.',
      },
      {
        type: 'h2',
        text: 'What changed my mindset',
      },
      {
        type: 'p',
        text: 'Internship deadlines do not care about your Figma gradients. Stakeholders want something working. That pressure taught me to ship a rough version, collect feedback, then polish.',
      },
      {
        type: 'p',
        text: 'Now I aim for: working core → clear README → then visual upgrades. It is less stressful and far more honest about progress.',
      },
    ],
  },
  {
    id: 'learning-routine',
    title: 'A Simple Learning Routine That Stuck',
    excerpt:
      'How I structure weekdays between college, coding, and rest without burning out.',
    category: 'Productivity',
    tags: ['Productivity', 'Learning Journey'],
    readTime: 4,
    date: 'Mar 2026',
    banner: 'productivity',
    content: [
      {
        type: 'p',
        text: 'I am not a productivity guru. I am a student who burned out once and had to rebuild discipline slowly.',
      },
      {
        type: 'h2',
        text: 'The routine (realistic, not aesthetic)',
      },
      {
        type: 'ul',
        items: [
          'Morning: college priorities first.',
          'Afternoon: one deep work block (60–90 min) on projects.',
          'Evening: light review or reading — no heavy coding if I am drained.',
          'Weekly: one offline break block with zero screens.',
        ],
      },
      {
        type: 'p',
        text: 'The goal is repeatability, not hero days. A boring streak of average days beats one legendary night followed by three zero days.',
      },
    ],
  },
  {
    id: 'tutorial-trap',
    title: 'Escaping Tutorial Hell (Slowly)',
    excerpt:
      'Watching courses felt productive until I tried building without pausing the video. Here is what helped me break the loop.',
    category: 'Learning Journey',
    tags: ['Learning Journey', 'Beginner Guides'],
    readTime: 5,
    date: 'Feb 2026',
    banner: 'learning',
    content: [
      {
        type: 'p',
        text: 'Tutorial hell is embarrassing to admit because it looks like work from the outside. Tabs open, notes taken — but output? Almost none.',
      },
      {
        type: 'h2',
        text: 'Rules I follow now',
      },
      {
        type: 'ul',
        items: [
          'Pause every 10–15 minutes and recreate without looking.',
          'Change one variable on purpose — break things intentionally.',
          'Finish with a tiny extension the tutorial did not cover.',
        ],
      },
      {
        type: 'p',
        text: 'Learning clicked when the discomfort of figuring things out became normal, not something to avoid.',
      },
    ],
  },
  {
    id: 'react-basics',
    title: 'React Mental Models for Beginners',
    excerpt:
      'State, effects, and components make more sense when you stop memorizing syntax and start thinking in UI flows.',
    category: 'Beginner Guides',
    tags: ['Beginner Guides', 'Engineering Thoughts'],
    readTime: 5,
    date: 'Jan 2026',
    banner: 'guides',
    content: [
      {
        type: 'p',
        text: 'When I started React, I treated hooks like magic spells. Copy `useState`, hope it works. That worked until the UI needed real logic.',
      },
      {
        type: 'h2',
        text: 'Three ideas that helped me',
      },
      {
        type: 'ul',
        items: [
          'UI is a function of state — draw the state first, then the screen.',
          'One source of truth per concern — duplicate state creates bugs.',
          'Effects are for syncing with the outside world, not for random timing fixes.',
        ],
      },
      {
        type: 'p',
        text: 'If you are learning React now, build one small app with three screens before chasing advanced patterns. Clarity comes from reps, not packages.',
      },
    ],
  },
];

export const featuredBlog = blogs.find((b) => b.featured) ?? blogs[0];

/** @deprecated Use `blogs` */
export const articles = blogs;
