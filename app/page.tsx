"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Hero from "@/sections/hero";
import Skills from "@/sections/skills";
import Projects from "@/sections/projects";
import About from "@/sections/about";
import Contact from "@/sections/contact";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedBackground from "@/app/components/AnimatedBackground";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateOpacities = () => {
    // When contact section is in view, return full particles opacity
    if (contactInView) {
      return { lottieOpacity: 0, particlesOpacity: 1 };
    }

    // When hero is in view, show only particles
    if (heroInView) {
      return { lottieOpacity: 0, particlesOpacity: 1 };
    }

    // During scroll transition
    const windowHeight = window.innerHeight;
    const fadeStart = windowHeight * 0.2;
    const fadeEnd = windowHeight * 0.8;
    const scrollPosition = Math.min(scrollY, fadeEnd);
    
    const progress = Math.min((scrollPosition - fadeStart) / (fadeEnd - fadeStart), 1);
    
    return {
      lottieOpacity: Math.min(progress * 1.2, 0.3),
      particlesOpacity: 1 - (progress * 1.2)
    };
  };

  const { lottieOpacity, particlesOpacity } = calculateOpacities();

  return (
    <>
      {/* Lottie Background */}
      <div
        className="fixed inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: lottieOpacity }}
      >
        <AnimatedBackground />
      </div>

      <main className="relative mx-auto max-w-5xl px-4 space-y-32 pb-32">
        <div ref={heroRef}>
          <Hero particlesOpacity={particlesOpacity} />
        </div>

        <RevealOnScroll delay={0.2}>
          <Skills />
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.3}>
          <Projects />
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.4}>
          <About />
        </RevealOnScroll>
        
        <div ref={contactRef}>
          <RevealOnScroll delay={0.5}>
            <Contact />
          </RevealOnScroll>
        </div>
      </main>
    </>
  );
}