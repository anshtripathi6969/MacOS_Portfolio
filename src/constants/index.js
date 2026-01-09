// ---------------- NAVBAR ----------------

const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 2,
    name: "Contact",
    type: "contact",
  },
  {
    id: 3,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 3, img: "/icons/user.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

// ---------------- DOCK ----------------

const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive",
    icon: "trash.png",
    canOpen: false,
  },
];

// ---------------- BLOG ----------------

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

// ---------------- TECH STACK ----------------

const techStack = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS"] },
  { category: "Database", items: ["MongoDB", "MYSQL"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "Docker"] },
];

// ---------------- SOCIALS ----------------

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/anshtripathi6969",
  },
  {
    id: 2,
    text: "Instagram",
    icon: "/images/insta.png",
    bg: "#4bcb63",
    link: "https://www.instagram.com/anshtripathi8989/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/AnshTri65204980",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/anshtripathi20/",
  },
];

// ---------------- PHOTOS ----------------

const photosLinks = [
  { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
  { id: 2, icon: "/icons/gicon2.svg", title: "Memories" },
  { id: 3, icon: "/icons/file.svg", title: "Places" },
  { id: 4, icon: "/icons/gicon4.svg", title: "People" },
  { id: 5, icon: "/icons/gicon5.svg", title: "Favorites" },
];

const gallery = [
  { id: 1, img: "/images/gal1.png" },
  { id: 2, img: "/images/gal2.png" },
  { id: 3, img: "/images/gal3.png" },
  { id: 4, img: "/images/gal4.png" },
];

// ---------------- FINDER LOCATIONS ----------------

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // PROJECT 1
    {
      id: 5,
      name: "Auto Syntax - SAAS Code Editor",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-28 left-10",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "Project Description.txt",
          icon: "/images/briefing.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "• Developed a full-stack SaaS-based online code editor with support for 10+ programming languages, enabling users to write, run, and share code snippets efficiently.",
            "• Enabled dynamic theming with 5 VSCode-inspired themes and custom font settings, improving user personalization and accessibility.",
            "• Supported webhook integration and smart output rendering (error/success states), improving runtime feedback for over 300 test cases.",
            "• Implemented Clerk authentication and integrated Pro-tier monetization using Lemon Squeezy, resulting in a functional paywall system for gated IDE features.",
          ],
        },
        {
          id: 2,
          name: "LIVE WEBSITE",
          icon: "/images/terminal.png",
          kind: "file",
          fileType: "url",
          href: "https://full-stack-saa-s-code-editor.vercel.app",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Site Preview",
          icon: "/images/eye.png",
          kind: "file",
          fileType: "img",
          position: "top-40 left-1/3",
          imageUrl: "/images/design2.png",
        },
      ],
    },

    // PROJECT 2
    {
      id: 6,
      name: "Illuvium - Stunning 3D Gaming Website",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-50",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Project Description.txt",
          icon: "/images/briefing.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "• Built a modern, interactive 3D gaming landing page supporting 60 FPS animations using React.js and Tailwind CSS, simulating the look and feel of a AAA game studio website.",
            "• Integrated immersive 3D models and animations via Spline and Sketchfab, enhancing user engagement and creating a dynamic user experience.",
            "• Designed a fully responsive layout with smooth transitions and animated elements, optimized for both desktop and mobile platforms.",
            "• Implemented a modular and scalable component architecture, enabling seamless future updates and improving code maintainability.",
          ],
        },
        {
          id: 2,
          name: "LIVE WEBSITE",
          icon: "/images/ghost.png",
          kind: "file",
          fileType: "url",
          href: "https://3-d-gaming-website-eta.vercel.app",
          position: "top-20 left-20",
        },
        {
          id: 3,
          name: "Site Preview",
          icon: "/images/eye.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/design4.png",
        },
      ],
    },

    // PROJECT 3
    {
      id: 7,
      name: "SPICY SPOON - RESTAURANT WEBSITE",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Food Delivery App Project.txt",
          icon: "/images/briefing.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Spicy Spoon website is a fully responsive restaurant landing page designed using HTML, CSS, and JavaScript.",
            "It features dynamic hero sections, smooth animations, and modern UI elements to enhance user engagement.",
            "Interactive components like reservation forms, offer banners, and menu highlights create a complete browsing experience.",
            "The layout is optimized for performance and showcases a visually rich, restaurant-themed interface across all devices.",
          ],
        },
        {
          id: 2,
          name: "LIVE WEBSITE",
          icon: "/images/restaurant.png",
          kind: "file",
          fileType: "url",
          href: "https://spicyspoon.vercel.app/#top",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Site Preview",
          icon: "/images/eye.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/restaur.jpeg",
        },
      ],
    },
  ],
};

// ---------------- ABOUT LOCATION ----------------

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
  id: 1,
  name: "LinkedIn Profile",
  icon: "/images/link.png",   // use your LinkedIn icon here
  kind: "file",
  fileType: "url",
  position: "top-10 left-5",
  href: "https://www.linkedin.com/in/anshtripathi20/"   // your LinkedIn link
},

    {
  id: 2,
  name: "GitHub Profile",
  icon: "/images/github.png",   // optional: change to any icon you want
  kind: "file",
  fileType: "url",
  position: "top-20 right-30",
  href: "https://github.com/anshtripathi6969"   // your GitHub link
},

    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/myself2.jpeg",
      description: [
  "Hello, I’m Ansh — a dedicated developer with a strong focus on building high-quality, modern web applications and AI-driven solutions.",
  "My expertise spans React, Next.js, TypeScript, and cloud technologies, with hands-on experience in developing scalable SaaS platforms and intelligent ML tools.",
  "I prioritize clean architecture, seamless user experiences, and efficient, maintainable code in every project I work on.",
  "Beyond development, I’m committed to continuous learning, exploring emerging technologies, and refining my craft to deliver impactful, performance-oriented digital products."
],
    },
  ],
};

// ---------------- RESUME LOCATION ----------------

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

// ---------------- TRASH LOCATION ----------------

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Trash File 1",
      icon: "/images/trash.png",
      kind: "file",
      fileType: "url",
      href: "https://www.instagram.com/taylorswift/",
      position: "top-10 right-20",
    },
    {
      id: 2,
      name: "Trash File 2",
      icon: "/images/trash.png",
      kind: "file",
      fileType: "url",
      href: "https://www.instagram.com/leomessi/",
      position: "top-5 right-60",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

// ---------------- WINDOW CONFIG ----------------

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  INITIAL_Z_INDEX,
  WINDOW_CONFIG,
};
