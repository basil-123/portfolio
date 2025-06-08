"use client";

import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/sections/hero"), { ssr: false });
const Skills = dynamic(() => import("@/sections/skills"));
const Projects = dynamic(() => import("@/sections/projects"));
const About = dynamic(() => import("@/sections/about"));
const Contact = dynamic(() => import("@/sections/contact"));
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false });
const RevealOnScroll = dynamic(() => import("@/components/RevealOnScroll"));

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateOpacities = () => {
    if (!mounted) return { lottieOpacity: 0, particlesOpacity: 1 };
    if (contactInView) return { lottieOpacity: 0, particlesOpacity: 1 };
    if (heroInView) return { lottieOpacity: 0, particlesOpacity: 1 };

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

  if (!mounted) return null;

  return (
    <>
      <AnimatedBackground opacity={lottieOpacity} />

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