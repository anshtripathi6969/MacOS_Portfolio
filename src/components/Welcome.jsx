import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ------------------------------
// TYPOGRAPHY WEIGHT CONFIG
// ------------------------------
const FONT_WEIGHTS = {
  title: { min: 320, max: 900, base: 480 },
  subtitle: { min: 260, max: 520, base: 310 },
};

// ------------------------------
// BRIGHT MATTE PALETTE
// ------------------------------
const MATTE_COLORS = [
  "#F3F4F6", // bright silver
  "#D7DAE0", // light matte
  "#B4B9C2", // soft steel
  "#8A90A0", // cool gray
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ------------------------------
// TEXT RENDER WITH M3 ABERRATION
// ------------------------------
const renderText = (text, className, baseWeight) =>
  [...text].map((char, i) => (
    <span
      key={`${char}-${i}`}
      data-letter
      className={className}
      style={{
        display: "inline-block",
        pointerEvents: "none",
        fontVariationSettings: `'wght' ${baseWeight}`,

        // Matte gradient
        backgroundImage: `linear-gradient(
          90deg,
          #F3F4F6,
          #D7DAE0,
          #B4B9C2,
          #8A90A0
        )`,
        WebkitBackgroundClip: "text",
        color: "transparent",

        // Apple M-series chromatic aberration
        filter: `
          drop-shadow(1px 0 0 rgba(255,60,60,0.10))
          drop-shadow(-1px 0 0 rgba(60,180,255,0.10))
          drop-shadow(0 0 6px rgba(0,0,0,0.22))
        `,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

// ------------------------------
// PREMIUM MOTION PHYSICS ENGINE
// ------------------------------
const setupPremiumPhysics = (container, config, ambientLightRef) => {
  if (!container) return;

  const letters = [...container.querySelectorAll("[data-letter]")];
  const light = ambientLightRef.current;

  const { min, max, base } = config;
  const states = letters.map(() => ({ weight: base, velocity: 0 }));

  let lastX = 0;
  let velocityX = 0;

  // Ambient light base glow
  gsap.to(light, {
    opacity: 0.32,
    scale: 1.18,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Smooth intro reveal
  gsap.fromTo(
    letters,
    {
      opacity: 0,
      y: 26,
      scale: 0.96,
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.022,
    }
  );

  // Physics-based hover
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Calculate cursor velocity for inertial motion
    velocityX = mouseX - lastX;
    lastX = mouseX;

    // Move ambient matte glow with physics
    gsap.to(light, {
      x: (mouseX - rect.width / 2) * 0.08,
      opacity: 0.37 + Math.abs(velocityX) * 0.002,
      scale: 1.22 + Math.abs(velocityX) * 0.002,
      duration: 0.5,
      ease: "power3.out",
    });

    letters.forEach((letter, index) => {
      const box = letter.getBoundingClientRect();
      const centerX = box.left - rect.left + box.width / 2;

      const distance = Math.abs(mouseX - centerX);
      const intensity = Math.exp(-(distance ** 2) / 3500);

      // Spring physics for weight morph
      const targetWeight = min + (max - min) * intensity;
      const state = states[index];

      state.velocity += (targetWeight - state.weight) * 0.12; // spring force
      state.velocity *= 0.72; // damping
      state.weight += state.velocity;

      gsap.set(letter, {
        fontVariationSettings: `'wght' ${state.weight}`,
      });

      // Lift + subtle tilt based on velocity
      gsap.to(letter, {
        y: -12 * intensity,
        scale: 1 + 0.22 * intensity,
        rotate: velocityX * 0.05 * intensity,
        duration: 0.35,
        ease: "power3.out",
      });

      // Subtle matte gradient shift
      gsap.to(letter, {
        backgroundImage: `linear-gradient(
          90deg,
          ${rand(MATTE_COLORS)},
          ${rand(MATTE_COLORS)}
        )`,
        duration: 0.45,
        ease: "sine.out",
      });

      // Animate chromatic aberration dynamically
      gsap.to(letter, {
        filter: `
          drop-shadow(${1 + intensity}px 0 rgba(255,60,60,0.12))
          drop-shadow(${-1 - intensity}px 0 rgba(60,180,255,0.12))
          drop-shadow(0 0 6px rgba(0,0,0,0.25))
        `,
        duration: 0.3,
      });
    });
  };

  // Reset on leave
  const handleMouseLeave = () => {
    letters.forEach((letter, index) => {
      gsap.to(letter, {
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.to(light, {
        opacity: 0.28,
        scale: 1.18,
        duration: 0.6,
      });
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

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
      {/* Ambient Matte Glow */}
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
          FONT_WEIGHTS.subtitle.base
        )}
      </p>

      {/* Title */}
      <h1
        ref={titleRef}
        className="mt-6"
        style={{ display: "inline-block" }}
      >
        {renderText(
          "portfolio",
          "text-6xl sm:text-8xl lg:text-9xl italic font-georama",
          FONT_WEIGHTS.title.base
        )}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
