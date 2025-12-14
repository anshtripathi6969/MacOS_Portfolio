import React, { useRef, useLayoutEffect } from "react";
import useWindowStore from "#store/window.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

/*
  FIXES:
  - Drag ONLY by window header (not entire window)
  - Prevent draggable from blocking input typing
  - Properly handle visibility + animations
*/

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const wrapperRef = useRef(null);
    const headerRef = useRef(null);

    const windowData = windows[windowKey];
    if (!windowData) return null;

    const { isOpen, zIndex } = windowData;

    // --------------- DRAGGABLE FIX ---------------
    useGSAP(() => {
      const wrapper = wrapperRef.current;
      const header = headerRef.current;

      if (!wrapper || !header) return;

      // DRAGGABLE SHOULD BE ATTACHED ONLY TO HEADER!
      const draggable = Draggable.create(wrapper, {
        trigger: header,                 // ← FIXED
        onPress: () => focusWindow(windowKey),
        onClick: (e) => e.stopPropagation(),
        cursor: "grab",
      })[0];

      return () => draggable.kill();
    }, []);

    // ------------ SHOW / HIDE WITH ANIMATIONS ------------
    useLayoutEffect(() => {
      const el = wrapperRef.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          ease: "power3.in",
          onComplete: () => {
            if (wrapperRef.current) wrapperRef.current.style.display = "none";
          },
        });
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={wrapperRef}
        style={{
          zIndex,
          display: "none",
          position: "absolute",
        }}
        onMouseDown={() => focusWindow(windowKey)}
      >
        {/* HEADER REFERENCE FOR DRAGGING */}
        <div ref={headerRef} className="window-header-drag-zone">
          {/* Component's header slot appears inside */}
        </div>

        {/* Component renders inside the window */}
        <Component {...props} headerRef={headerRef} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name})`;

  return Wrapped;
};

export default WindowWrapper;
