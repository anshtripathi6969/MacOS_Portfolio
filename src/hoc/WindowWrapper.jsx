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
    // Attach Draggable to the *actual* header element when it exists.
    // We listen for `isOpen` changes because the header is only rendered
    // once the component mounts and the window is opened.
    useLayoutEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const headerEl = wrapper.querySelector('#window-header');
      if (!headerEl) return;

      const draggable = Draggable.create(wrapper, {
        trigger: headerEl,
        onPress: () => focusWindow(windowKey),
        onClick: (e) => e.stopPropagation(),
        cursor: 'grab',
      })[0];

      return () => draggable.kill();
    }, [isOpen]);

    // ------------ SHOW / HIDE WITH ANIMATIONS ------------
    useLayoutEffect(() => {
      const el = wrapperRef.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";

        // 🎯 CENTER WINDOW ON OPEN
        const rect = el.getBoundingClientRect();
        gsap.set(el, {
          x: (window.innerWidth - rect.width) / 2,
          y: (window.innerHeight - rect.height) / 2 - 60, // 🍎 Bringing it even closer to the visual center
        });

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
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
          top: 0,
          left: 0,
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
