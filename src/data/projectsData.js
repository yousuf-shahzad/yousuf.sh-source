const projectsData = [
  {
    title: "Game.co.uk Stock Checker",
    description: "A CLI tool for monitoring product availability on Game.co.uk, featuring dual checking methods via HTTP requests and browser automation. Built with Python using aiohttp and Playwright, the tool implements advanced rate limiting, error recovery, and real-time status updates. Includes a proof-of-concept checkout automation system demonstrating web automation capabilities. The project showcases reverse engineering skills through detailed analysis of the site's stock checking system and JSON-LD schema implementation.",
    technologies: ["Python", "aiohttp", "Playwright", "JSON-LD"],
    links: {
      github: "https://github.com/yousuf-shahzad/game-stock-checker/",
    },
  },
  {
    title: "Rava Habit Tracker",
    description: "A minimalistic productivity application that seamlessly combines habit tracking with focused work sessions. Named after the Persian/Urdu word 'راوا', Rava features a customizable Pomodoro timer, comprehensive habit tracking with streak monitoring, and detailed progress analytics. Built with React 18, Tailwind CSS, and modern web technologies, it delivers a responsive and intuitive experience across all devices.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Recharts"],
    links: {
      demo: "https://rava-gules.vercel.app",
      github: "https://github.com/yousuf-shahzad/rava",
    },
  },
  {
    title: "Statistical Distribution Generator",
    description: "A sophisticated visualization tool that generates and displays bell curves (normal distributions) with stunning interactive plots. Originally developed in Python and converted to JavaScript using Plotly, this application makes complex statistical concepts accessible and visually engaging. Features dynamic parameter adjustments and real-time graph updates.",
    technologies: ["JavaScript", "Plotly"],
    links: {
      github: "https://github.com/yousuf-shahzad/bell-curve-generator",
    },
  },
  {
    title: "Maths Club Website",
    description: "A comprehensive web application for Upton Court Grammar School's Maths Society, designed to enhance mathematical engagement through challenges, leaderboards, and newsletter systems. Built using Flask and Jinja templating, the website provides an interactive platform for students to explore and excel in mathematics.",
    technologies: ["Python", "Flask", "Jinja", "PostgreSQL", "Sphinx"],
    links: {
      demo: "https://ucgsmaths.com",
      github: "https://github.com/yousuf-shahzad/maths-soc-source",
    },
  }
];

export default projectsData;