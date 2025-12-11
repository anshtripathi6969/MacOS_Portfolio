import React, { useRef, useLayoutEffect } from "react";
import useWindowStore from "#store/window.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if(!el) return;

      const [instance] = Draggable.create(el, {onPress: () => focusWindow(windowKey)});

      return () => instance.kill();
    } , [])

    const windowData = windows[windowKey];
    if (!windowData) return null; // safety

    const { isOpen, zIndex } = windowData;

    // --- Show / Hide using CSS, not React ---
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";

        // GSAP open animation (macOS style)
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power3.out" }
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          ease: "power3.in",
          onComplete: () => {
            if (ref.current) ref.current.style.display = "none";
          }
        });
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          display: "none", // hidden by default, controlled by GSAP
          position: "absolute"
        }}
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
