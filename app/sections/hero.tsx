"use client";

import { useCallback } from "react";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { TypeAnimation } from "react-type-animation";

interface HeroProps {
  particlesOpacity?: number;
}

export default function Hero({ particlesOpacity = 1 }: HeroProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Particles background with dynamic opacity */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: particlesOpacity }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            particles: {
              number: { 
                value: 80, 
                density: { 
                  enable: true, 
                  area: 800 
                } 
              },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { 
                value: { min: 0.1, max: 0.5 },
                animation: { 
                  enable: true,
                  speed: 1,
                  sync: false
                }
              },
              size: { 
                value: { min: 1, max: 3 },
                random: true
              },
              move: { 
                enable: true, 
                speed: 1.5, 
                direction: "none",
                outModes: "bounce",
                random: true,
                straight: false
              },
              links: {
                enable: true,
                distance: 120,
                color: "#ffffff",
                opacity: 0.3,
                width: 1,
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Hero content */}
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