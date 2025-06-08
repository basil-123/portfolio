"use client";

import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [opacity, setOpacity] = useState(1);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 400, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 z-[-1] transition-opacity duration-500"
      style={{ opacity, width: "100%", height: "100%" }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ width: "100%", height: "100%" }}
        options={{
          fullScreen: false,
          background: {
            color: { value: "#000000" },
          },
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outMode: "out",
            },
            links: {
              enable: true,
              distance: 120,
              color: "#ffffff",
              opacity: 0.2,
              width: 1,
            },
          },
        }}
      />
    </div>
  );
}
