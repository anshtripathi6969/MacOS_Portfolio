import React from "react";
import { Dock, Navbar, Welcome } from "./components";
import Terminal from "./windows/Terminal.jsx";
import Resume from "./windows/Resume.jsx";
import Finder from "./windows/Finder.jsx";
import TextFile from "./windows/TextFile.jsx";
import ImageFile from "./windows/ImageFile.jsx";
import Contact from "./windows/Contact.jsx";
import Home from "./components/Home.jsx";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Resume />
      <Finder />
      <TextFile />
      <ImageFile />
      <Contact />
      <Home />
    </main>
  );
};

export default App;
