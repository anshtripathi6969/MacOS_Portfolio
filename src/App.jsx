import React from "react";
import { Dock, Navbar, Welcome } from "./components";
import Terminal from "./windows/Terminal.jsx";
import Finder from "./windows/Finder.jsx";
import TextFile from "./windows/TextFile.jsx";
import ImageFile from "./windows/ImageFile.jsx";
import Contact from "./windows/Contact.jsx";
import Home from "./components/Home.jsx";
import Resume from "./windows/Resume.jsx";
import AIChat from "./windows/AIChat.jsx";

// 🆕 BOOT SYSTEM
import BootScreen from "./boot/BootScreen";
import useBootStore from "./store/bootStore";

// GSAP
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  const { stage } = useBootStore();

  if (stage !== "desktop") {
    return <BootScreen />;
  }

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      {/* Windows */}
      <Terminal />
      <Finder />
      <Resume />
      <AIChat />
      <TextFile />
      <ImageFile />
      <Contact />

      {/* Desktop icons */}
      <Home />
    </main>
  );
};

export default App;
