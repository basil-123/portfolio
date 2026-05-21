"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl text-center w-full z-10 flex flex-col items-center"
      >
        {/* Professional Pill Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-[0_2px_12px_rgba(99,102,241,0.05)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Open for Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-none"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">Basil Varghesekutty</span>
        </motion.h1>

        {/* Typed Title */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide"
        >
          <TypeAnimation
            sequence={[
              "Machine Learning Engineer",
              2000,
              "AI Enthusiast",
              2000,
              "Data Scientist",
              2000,
              
              
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Sub-headline */}
        <motion.p 
          variants={itemVariants}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed font-medium"
        >
          Passionate about building intelligent systems that learn from data and
          power real-world impact. Skilled in machine learning, data analytics,
          and full-stack AI solutions.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a 
            href="#projects" 
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all text-sm sm:text-base border border-indigo-700"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all text-sm sm:text-base"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
          onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll Down</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}