'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react' // If you don't have lucide-react, let me know!

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative z-10">
      <div className="container mx-auto px-8 space-y-28">
        <h2 className="text-5xl font-extrabold text-center text-white mb-12">
          My Projects
        </h2>

        {/* Project 1 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-4xl font-bold">🎯 Integrated Attendance Monitoring & Fight Detection</h3>
            
            {/* GITHUB LINK ADDED HERE */}
            <a 
              href="https://github.com/basil-123/Violence-Detection-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-all text-lg font-medium"
            >
              <Github className="w-6 h-6" /> 
              View Code
            </a>
          </div>

          <p className="text-2xl leading-relaxed">
            A smart AI-driven classroom system that automates student attendance and detects violent actions using real-time surveillance.
          </p>
          <ul className="list-disc list-inside ml-8 text-xl space-y-3">
            <li>Built a deep learning model to detect fights in classroom CCTV feeds.</li>
            <li>Used facial recognition for automated attendance logging.</li>
            <li>Triggered real-time alarms to alert when violence is detected.</li>
            <li>Developed a dashboard for faculty to view alerts and attendance.</li>
          </ul>
          <p className="text-lg italic text-white/80">
            Tech Stack: Python, TensorFlow, OpenCV, Flask, React, SQLite
          </p>
        </motion.div>

        {/* Project 2 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-4xl font-bold">🌐 Edu-Pulse Hub</h3>
            
            {/* GITHUB LINK PLACEHOLDER */}
            <a 
              href="https://github.com/basil-123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-all text-lg font-medium"
            >
              <Github className="w-6 h-6" /> 
              View Code
            </a>
          </div>

          <p className="text-2xl leading-relaxed">
            An academic community platform designed for college students to collaborate, share study resources, and stay informed.
          </p>
          <ul className="list-disc list-inside ml-8 text-xl space-y-3">
            <li>Created a social platform where students post materials and updates.</li>
            <li>Integrated real-time syncing using Firebase and Firestore.</li>
            <li>Designed an engaging UI for browsing content and connecting.</li>
            <li>Fostered collaboration in academic environments through tech.</li>
          </ul>
          <p className="text-lg italic text-white/80">
            Tech Stack: Next.js, Tailwind CSS, Firebase, Firestore, Vercel
          </p>
        </motion.div>

        {/* Project 3 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8 text-white"
        >
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-4xl font-bold">🛤️ Admin Panel for Train Booking</h3>
            
            {/* GITHUB LINK PLACEHOLDER */}
            <a 
              href="https://github.com/basil-123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-all text-lg font-medium"
            >
              <Github className="w-6 h-6" /> 
              View Code
            </a>
          </div>

          <p className="text-2xl leading-relaxed">
            A web-based backend dashboard that simplifies train booking operations and manages real-time schedule and passenger data.
          </p>
          <ul className="list-disc list-inside ml-8 text-xl space-y-3">
            <li>Developed a responsive admin dashboard to manage train data.</li>
            <li>Implemented secure login and data control for CRUD operations.</li>
            <li>Stored booking and customer info in a structured MySQL database.</li>
            <li>Enhanced the efficiency of administrative workflows.</li>
          </ul>
          <p className="text-lg italic text-white/80">
            Tech Stack: HTML, CSS, JavaScript, PHP, MySQL
          </p>
        </motion.div>
      </div>
    </section>
  )
}