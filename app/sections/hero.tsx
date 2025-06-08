"use client";

import { useCallback, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import dynamic from "next/dynamic";

export default function Hero({ particlesOpacity = 1 }: { particlesOpacity?: number }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const Particles = init ? dynamic(() => import("@tsparticles/react").then((mod) => mod.Particles), {
    ssr: false
  }) : () => null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {init && (
        <div className="absolute inset-0 -z-10 transition-opacity duration-1000" style={{ opacity: particlesOpacity }}>
          <Particles
            id="tsparticles"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  outModes: "bounce",
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: { min: 0.1, max: 0.5 },
                  animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                  }
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                  random: true,
                },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}

      <div className="max-w-3xl text-center w-full text-white z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <div>Hi, I'm</div>
          <div className="text-primary md:text-7xl">Basil Varghesekutty</div>
        </h1>

        <div className="mt-4 text-2xl text-muted-foreground font-medium text-primary">
          <TypeAnimation
            sequence={[
              "Data Scientist",
              2000,
              "Data Analyst",
              2000,
              "Machine Learning Engineer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Passionate about building intelligent systems that learn from data and
          power real-world impact. Skilled in machine learning, data analytics,
          and full-stack AI solutions.
        </p>
      </div>
    </section>
  );
}