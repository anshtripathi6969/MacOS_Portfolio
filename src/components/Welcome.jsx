import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ----------------------------------------
// TYPOGRAPHY WEIGHT CONFIG
// ----------------------------------------
const FONT_WEIGHTS = {
  title: { min: 320, max: 900, base: 480 },
  subtitle: { min: 260, max: 520, base: 310 },
};

// ----------------------------------------
// MATTE GRADIENT COLORS (TITLE ONLY)
// ----------------------------------------
const MATTE_COLORS = ["#F3F4F6", "#D7DAE0", "#B4B9C2", "#8A90A0"];
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ----------------------------------------
// RENDER TEXT (subtitle keeps solid color)
// ----------------------------------------
const renderText = (text, className, baseWeight, isSubtitle = false) =>
  [...text].map((char, i) => (
    <span
      key={`${char}-${i}`}
      data-letter
      data-type={isSubtitle ? "subtitle" : "title"}
      className={className}
      style={{
        display: "inline-block",
        pointerEvents: "none",
        fontVariationSettings: `'wght' ${baseWeight}`,

        // Subtitle = fixed matte black
        color: isSubtitle ? "#1F1F22" : "transparent",
        background: isSubtitle
          ? "none"
          : "linear-gradient(90deg, #F3F4F6, #D7DAE0, #B4B9C2, #8A90A0)",
        WebkitBackgroundClip: isSubtitle ? "none" : "text",

        textShadow: isSubtitle ? "0 1px 2px rgba(0,0,0,0.25)" : "none",

        filter: isSubtitle
          ? "none"
          : `
            drop-shadow(1px 0 rgba(255,60,60,0.10))
            drop-shadow(-1px 0 rgba(60,180,255,0.10))
            drop-shadow(0 0 6px rgba(0,0,0,0.22))
          `,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

// ----------------------------------------
// PHYSICS ENGINE (works on title + subtitle)
// ----------------------------------------
const setupPremiumPhysics = (container, config, ambientLightRef) => {
  if (!container) return;

  const letters = [...container.querySelectorAll("[data-letter]")];
  const light = ambientLightRef.current;

  const { min, max, base } = config;
  const states = letters.map(() => ({ weight: base, velocity: 0 }));

  let lastX = 0;
  let velocityX = 0;

  // Ambient glow
  gsap.to(light, {
    opacity: 0.32,
    scale: 1.18,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Intro reveal animation
  gsap.fromTo(
    letters,
    { opacity: 0, y: 26, scale: 0.96, filter: "blur(12px)" },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.02,
    }
  );

  // Hover physics
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    velocityX = mouseX - lastX;
    lastX = mouseX;

    gsap.to(light, {
      x: (mouseX - rect.width / 2) * 0.08,
      opacity: 0.37,
      scale: 1.22,
      duration: 0.4,
    });

    letters.forEach((letter, index) => {
      const type = letter.dataset.type;
      const box = letter.getBoundingClientRect();

      const centerX = box.left - rect.left + box.width / 2;
      const distance = Math.abs(mouseX - centerX);
      const intensity = Math.exp(-(distance ** 2) / 3500);

      // Weight spring physics
      const targetWeight = min + (max - min) * intensity;
      const state = states[index];

      state.velocity += (targetWeight - state.weight) * 0.12;
      state.velocity *= 0.72;
      state.weight += state.velocity;

      gsap.set(letter, {
        fontVariationSettings: `'wght' ${state.weight}`,
      });

      // Motion effects
      gsap.to(letter, {
        y: -10 * intensity,
        scale: 1 + 0.18 * intensity,
        rotate: velocityX * 0.05 * intensity,
        duration: 0.35,
        ease: "power3.out",
      });

      // Title-only effects
      if (type === "title") {
        gsap.to(letter, {
          backgroundImage: `linear-gradient(90deg, ${rand(
            MATTE_COLORS
          )}, ${rand(MATTE_COLORS)})`,
          duration: 0.45,
        });

        gsap.to(letter, {
          filter: `
            drop-shadow(${1 + intensity}px 0 rgba(255,60,60,0.12))
            drop-shadow(${-1 - intensity}px 0 rgba(60,180,255,0.12))
          `,
          duration: 0.3,
        });
      }
    });
  };

  // Reset on mouse leave
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      gsap.to(letter, {
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    gsap.to(light, {
      opacity: 0.28,
      scale: 1.15,
      duration: 0.6,
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// ----------------------------------------
// COMPONENT
// ----------------------------------------
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ambientLightRef = useRef(null);

  useGSAP(() => {
    const clean1 = setupPremiumPhysics(
      titleRef.current,
      FONT_WEIGHTS.title,
      ambientLightRef
    );
    const clean2 = setupPremiumPhysics(
      subtitleRef.current,
      FONT_WEIGHTS.subtitle,
      ambientLightRef
    );

    return () => {
      clean1?.();
      clean2?.();
    };
  }, []);

  return (
    <section id="welcome" style={{ position: "relative" }}>
      {/* Ambient Glow */}
      <div
        ref={ambientLightRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "500px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(120,120,130,0.28), transparent 70%)",
          filter: "blur(90px)",
          borderRadius: "50%",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* Subtitle */}
      <p ref={subtitleRef} style={{ display: "inline-block" }}>
        {renderText(
          "Hey , I'm Ansh! Welcome to my",
          "text-2xl sm:text-3xl font-georama",
          FONT_WEIGHTS.subtitle.base,
          true
        )}
      </p>

      {/* Title */}
      <h1 ref={titleRef} className="mt-6" style={{ display: "inline-block" }}>
        {renderText(
          "portfolio",
          "text-6xl sm:text-8xl lg:text-9xl italic font-georama",
          FONT_WEIGHTS.title.base
        )}
      </h1>
    </section>
  );
};

export default Welcome;
