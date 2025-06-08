"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function DataNetworkBackground() {
  const [init, setInit] = useState(false);

  // Initialize particles engine once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // Callback when particles are loaded (optional)
  };

  const options = {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: {
        value: "#0f172a", // black/dark slate
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
        },
      },
      color: {
        value: "#38bdf8", // sky-400
      },
      links: {
        enable: true,
        distance: 120,
        color: "#64748b", // slate-500
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
      },
      size: {
        value: 3,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}