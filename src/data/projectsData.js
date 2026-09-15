const projectsData = [
  {
    slug: 'maths-club-website',
    title: 'Maths Club Website',
    description:
      "A comprehensive web application for Upton Court Grammar School's Maths Society, designed to enhance mathematical engagement through challenges, leaderboards, and newsletter systems. Built using Flask and Jinja templating, the website provides an interactive platform for students to explore and excel in mathematics.",
    technologies: ['Python', 'Flask', 'Jinja', 'PostgreSQL', 'Sphinx'],
    caseStudy: {
      role: 'Full-stack developer',
      problem:
        'The Maths Society needed a more engaging home for challenges, updates, and student participation than static announcements could provide.',
      solution:
        'Built a Flask application with challenge flows, leaderboards, and newsletter-oriented content so students could return regularly and track progress.',
      highlights: [
        'Designed a server-rendered Flask/Jinja experience for quick page loads and straightforward deployment.',
        'Structured the platform around repeat participation through challenges and visible progress.',
        'Used PostgreSQL-backed data flows for persistent society content and leaderboard state.',
      ],
      lessons:
        'This project sharpened my thinking around building useful internal tools for a real group of users, not just building a technically interesting demo.',
      context: 'School society platform',
    },
    links: {
      demo: 'https://ucgsmaths.com',
      github: 'https://github.com/yousuf-shahzad/maths-soc-source',
    },
    category: 'Web development',
    summary:
      'A home for mathematical curiosity. Challenges, leaderboards, and a newsletter for a school maths society.',
    visual: 'maths',
    featuredOrder: 1,
  },
  {
    slug: 'mc-kube',
    title: 'MC-Kube Distributed Minecraft Server Manager',
    description:
      'A robust orchestration platform for managing Minecraft servers at scale, featuring automatic load balancing, seamless failover, and continuous health checks. The Rust-based backend coordinates with a custom Java plugin on each server, enabling dynamic player transfers, global broadcasts, remote command execution, and server enable/disable functionalities. The system includes a modern web dashboard for real-time monitoring and control, supporting high availability and resilience in multiplayer environments. mc-kube demonstrates advanced distributed systems engineering and cross-language communication.',
    technologies: ['Rust', 'Java', 'HTML', 'CSS', 'Python'],
    caseStudy: {
      role: 'Backend and systems contributor',
      problem:
        'Managing multiple Minecraft servers manually becomes fragile when player load changes, servers fail, or operators need to coordinate commands across instances.',
      solution:
        'Implemented an orchestration layer that can observe server health, coordinate a Java-side plugin, and support operational commands from a web dashboard.',
      highlights: [
        'Explored cross-language coordination between a Rust control plane and Java server plugins.',
        'Focused on resilience patterns such as health checks, failover, and server enable/disable controls.',
        'Built toward operator visibility with dashboard-oriented status and command surfaces.',
      ],
      lessons:
        'The project made distributed systems feel concrete: every clean abstraction still has to survive latency, state, failures, and operator expectations.',
      context: 'Distributed systems project',
    },
    links: {
      github: 'https://github.com/sudhakara-ambati/mc-kube',
    },
    category: 'Distributed systems',
    summary:
      'A Rust control plane and Java plugin for coordinating Minecraft servers, health checks, and operator commands.',
    visual: 'systems',
    featuredOrder: 2,
  },
  {
    slug: 'game-stock-checker',
    title: 'Game.co.uk Stock Checker',
    description:
      "A CLI tool for monitoring product availability on Game.co.uk, featuring dual checking methods via HTTP requests and browser automation. Built with Python using aiohttp and Playwright, the tool implements advanced rate limiting, error recovery, and real-time status updates. Includes a proof-of-concept checkout automation system demonstrating web automation capabilities. The project showcases reverse engineering skills through detailed analysis of the site's stock checking system and JSON-LD schema implementation.",
    technologies: ['Python', 'aiohttp', 'Playwright', 'JSON-LD'],
    caseStudy: {
      role: 'Automation developer',
      problem:
        'Manual stock checking is slow and unreliable when product availability changes quickly.',
      solution:
        'Created a Python CLI that combines direct HTTP checks with Playwright browser automation for cases where page behavior needs to be observed directly.',
      highlights: [
        'Used async HTTP requests to make repeated checks efficient.',
        'Added browser automation as a fallback for dynamic flows.',
        'Handled rate limiting and recoverable failures so the tool could keep running without constant supervision.',
      ],
      lessons:
        'This was a useful exercise in balancing speed, reliability, and politeness when automating against real websites.',
      context: 'CLI automation project',
    },
    links: {
      github: 'https://github.com/yousuf-shahzad/game-stock-checker/',
    },
    category: 'Automation',
    summary:
      'An asynchronous Python CLI that combines HTTP checks and browser automation to monitor changing product availability.',
    visual: 'terminal',
    featuredOrder: 0,
  },
  {
    slug: 'rava-habit-tracker',
    title: 'Rava Habit Tracker',
    description:
      "A minimalistic productivity application that seamlessly combines habit tracking with focused work sessions. Named after the Persian/Urdu word 'راوا', Rava features a customizable Pomodoro timer, comprehensive habit tracking with streak monitoring, and detailed progress analytics. Built with React 18, Tailwind CSS, and modern web technologies, it delivers a responsive and intuitive experience across all devices.",
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Recharts'],
    caseStudy: {
      role: 'Frontend developer',
      problem:
        'Habit tracking and focused work sessions are often separated, even though they support the same goal: consistent progress.',
      solution:
        'Built a React application that combines habit streaks, Pomodoro-style focus sessions, and progress analytics in one minimal interface.',
      highlights: [
        'Designed a quiet interface suited to repeated daily use.',
        'Combined habit state, streak tracking, and focus timers in a single user flow.',
        'Used charting to make progress legible without overwhelming the core experience.',
      ],
      lessons:
        'Rava pushed me to think about product restraint: productivity tools need to stay useful without becoming another source of friction.',
      context: 'Productivity app',
    },
    links: {
      demo: 'https://rava-gules.vercel.app',
      github: 'https://github.com/yousuf-shahzad/rava',
    },
    category: 'Product design & development',
    summary:
      'Habit tracking, focus sessions, and progress in one quiet interface. Built for a little more consistency, every day.',
    visual: 'habits',
    featuredOrder: 3,
  },
  {
    slug: 'statistical-distribution-generator',
    title: 'Statistical Distribution Generator',
    description:
      'A sophisticated visualization tool that generates and displays bell curves (normal distributions) with stunning interactive plots. Originally developed in Python and converted to JavaScript using Plotly, this application makes complex statistical concepts accessible and visually engaging. Features dynamic parameter adjustments and real-time graph updates.',
    technologies: ['JavaScript', 'Plotly'],
    caseStudy: {
      role: 'Visualization developer',
      problem:
        'Normal distributions are easier to understand when learners can manipulate parameters and see the curve respond immediately.',
      solution:
        'Converted an original Python idea into a JavaScript visualization with interactive parameter changes and real-time plotted output.',
      highlights: [
        'Translated statistical concepts into an interactive browser experience.',
        'Used Plotly to make curve changes clear and responsive.',
        'Focused on making abstract mathematical behavior visible through direct manipulation.',
      ],
      lessons:
        'The strongest educational tools do not just explain a concept; they let someone test their intuition against it.',
      context: 'Mathematics visualization',
    },
    links: {
      github: 'https://github.com/yousuf-shahzad/bell-curve-generator',
    },
    category: 'Data visualization',
    summary:
      'An interactive exploration of normal distributions, bringing statistical parameters to life with Plotly.',
    visual: 'distribution',
    featuredOrder: 0,
  },
]

export default projectsData
