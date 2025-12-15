<!-- ================= HERO ================= -->
<div align="center">

# 🍎 macOS-Inspired Portfolio  
### _A fully interactive macOS desktop inside the browser_

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-fast-purple?logo=vite" />
  <img src="https://img.shields.io/badge/GSAP-animations-green?logo=greensock" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" />
</p>

<p align="center">
  <b>Not a website. A desktop experience.</b>
</p>

🚀 **Live Demo:**  
👉 https://mac-os-portfolio1.vercel.app  

</div>

---

## 🖥️ What Is This?

This project is a **pixel-polished macOS-style portfolio** built with **React + Vite**, designed to feel like a **real operating system**, not a static website.

Instead of scrolling pages, users:
- Boot into the system
- Interact with windows
- Open Finder
- View a PDF resume
- Use a terminal
- Navigate via a Dock

> Think macOS Ventura — but in your browser.

---

## ⚡ Key Highlights

- 🧠 **Boot Screen System**
- 🪟 **Draggable macOS-style windows**
- 📄 **Native PDF Resume Viewer**
- 🎨 **Live wallpaper**
- 🧲 **Dock with animations**
- 🎯 **Window focus & z-index control**
- 🚀 **Production-ready & deployed**

---

## 🧠 Boot Sequence

A realistic macOS-inspired boot flow before the desktop unlocks.

<div align="center">

<!-- BOOT GIF -->
<img src="https://your-gif-url/boot-screen.gif" width="700" />

</div>

**Features**
- Auto-typing terminal logs
- Controlled boot stages
- Zustand-powered global state
- Desktop only renders after boot completion

---

## 🪟 Window System

Every app runs inside a **draggable macOS-style window**.

<div align="center">

<!-- WINDOW DRAG GIF -->
<img src="https://your-gif-url/window-drag.gif" width="700" />

</div>

**Includes**
- Close / minimize / maximize buttons
- GSAP-powered drag physics
- Focus handling (active window on click)
- Reusable `WindowWrapper` HOC

---

## 📄 Resume Viewer (PDF)

Native, lightweight PDF preview — no heavy libraries.

<div align="center">

<!-- PDF VIEWER GIF -->
<img src="https://your-gif-url/pdf-viewer.gif" width="600" />

</div>

**Why iframe instead of libraries?**
- Zero runtime errors
- Faster load
- Perfect compatibility on Vercel
- Clean & reliable

---

## 🧭 Finder & Desktop

macOS-style Finder and desktop icons.

<div align="center">

<!-- FINDER GIF -->
<img src="https://your-gif-url/finder.gif" width="700" />

</div>

---

## 🎨 Live Wallpaper

Subtle motion background inspired by macOS Ventura.

<div align="center">

<!-- WALLPAPER GIF -->
<img src="https://your-gif-url/wallpaper.gif" width="800" />

</div>

---

## 🧱 Tech Stack

| Tech | Purpose |
|----|----|
| **React** | UI & component logic |
| **Vite** | Lightning-fast bundler |
| **GSAP** | Animations & dragging |
| **Zustand** | Boot & app state |
| **Lucide Icons** | Clean iconography |
| **CSS / Flexbox** | Layout |
| **Vercel** | Deployment |

---

## 📁 Project Structure

src/
├── boot/ # Boot system
├── components/ # Navbar, Dock, Welcome
├── windows/ # Terminal, Finder, Resume
├── hoc/ # WindowWrapper
├── store/ # Zustand state
├── constants/
└── App.jsx

yaml
Copy code

---

## 🚀 Run Locally

```bash
git clone https://github.com/AnshTripathi6969/MacOS_Portfolio.git
cd MacOS_Portfolio
npm install
npm run dev
🌍 Deployment
Built with Vite

Deployed on Vercel

PDFs served via /public/files

Zero SSR / zero config

🧠 Engineering Challenges Solved
❌ PDF rendering failures → solved with native iframe

🪟 Window focus & layering logic

🧲 Smooth drag without layout breaking

🧠 Boot state synchronization

🚀 Vercel build edge cases

🔮 Future Enhancements
🔍 Spotlight search

🧲 Window snapping

🖱 Right-click context menu

🔊 System sounds

🕒 Real-time menu bar clock

📱 Mobile fallback UI

👨‍💻 Author
Ansh Tripathi
B.Tech CSE (Cloud Computing)
Frontend • Systems UI • Creative Engineering

⭐ Like this project?
Star ⭐ the repo

Fork 🍴 it

Get inspired 💡
