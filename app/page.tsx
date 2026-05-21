"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Hero = dynamic(() => import("@/sections/hero"), { ssr: false });
const Skills = dynamic(() => import("@/sections/skills"));
const Projects = dynamic(() => import("@/sections/projects"));
const About = dynamic(() => import("@/sections/about"));
const Contact = dynamic(() => import("@/sections/contact"));
const RevealOnScroll = dynamic(() => import("@/components/RevealOnScroll"));
const CursorTracker = dynamic(() => import("@/components/CursorTracker"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <CursorTracker />
      {/* Base Solid Background Layer to prevent stacking glitches with body */}
      <div className="fixed inset-0 bg-[#f8fafc] -z-20 pointer-events-none" />

      {/* Premium Professional Background system - Composited scroll transform */}
      <motion.div 
        animate={{
          x: [0, 50],
          y: [0, 50],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          },
          y: {
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="fixed -inset-[100px] grid-bg -z-10 pointer-events-none" 
      />
      
      {/* Animated Ambient Blur Blobs */}
      <motion.div 
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300/35 blur-[90px] -z-10 pointer-events-none will-change-transform" 
      />
      
      <motion.div 
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 70, -80, 0],
          scale: [1, 0.9, 1.15, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-sky-300/40 blur-[100px] -z-10 pointer-events-none will-change-transform" 
      />
      
      <motion.div 
        animate={{
          x: [0, 60, -70, 0],
          y: [0, 90, -50, 0],
          scale: [1, 1.1, 0.85, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full bg-rose-200/40 blur-[90px] -z-10 pointer-events-none will-change-transform" 
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 space-y-20 md:space-y-36 pb-16 md:pb-32">
        <Hero />

        <RevealOnScroll delay={0.1}>
          <Skills />
        </RevealOnScroll>
        
        {/* Render projects directly without scroll-reveal wrapper to avoid clipping sticky behaviors */}
        <Projects />
        
        <RevealOnScroll delay={0.1}>
          <About />
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.1}>
          <Contact />
        </RevealOnScroll>
      </main>
    </div>
  );
}