'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-5 gap-6 md:gap-12 items-center"
        >
          {/* Classy Framed Avatar */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative h-64 sm:h-80 w-full max-w-[240px] sm:max-w-[280px] border border-slate-900/10 p-2 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="relative w-full h-full overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/dp.jpg"
                  alt="Basil Varghesekutty"
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                />
              </div>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-3 select-none">
              Fig. 01 — Dossier Portrait
            </span>
          </div>

          {/* Biography & Metadata Dossier */}
          <div className="md:col-span-3 text-left space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                Biography
              </span>
              <h2 className="text-4xl font-serif text-slate-900 mt-2 font-medium tracking-tight">
                Basil Varghesekutty
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold mt-1">
                Data Scientist & ML Practitioner
              </p>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-serif first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-slate-900 first-letter:leading-[0.85] first-letter:mt-1">
              Dedicated to uncovering insights and building predictive systems that solve complex, real-world business challenges. With a background rooted in hands-on model training, data pipelining, and visualization, my current work focuses on machine learning systems, natural language processing, and agentic workflows. Actively seeking to apply this technical foundation to drive high-impact initiatives.
            </p>

            {/* Dossier Metadata Table */}
            <div className="border-t border-b border-dashed border-slate-200 py-5 my-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-left">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400">Position</span>
                <span className="font-serif text-sm text-slate-800 font-semibold">Data Science Practitioner</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400">Location</span>
                <span className="font-serif text-sm text-slate-800 font-semibold">Kerala, India</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400">Focus Areas</span>
                <span className="font-serif text-sm text-slate-800 font-semibold">Predictive Systems & RAG</span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400">Core Interests</span>
                <span className="font-serif text-sm text-slate-800 font-semibold">DL, CV & Agentic Workflows</span>
              </div>
            </div>

            {/* Technical Outline Button */}
            <div className="pt-2">
              <a href="/Basil_CV.pdf" download className="inline-block">
                <button className="flex items-center gap-2 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 font-mono text-xs uppercase tracking-widest px-6 py-3 transition-all duration-200 cursor-pointer bg-white hover:bg-slate-50 select-none">
                  <Download size={14} />
                  Download Curriculum Vitae
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

