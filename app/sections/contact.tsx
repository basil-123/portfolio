'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">Let's Work Together</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            I'm actively looking for opportunities in data science and machine learning. If you're hiring or open to collaboration, feel free to get in touch!
          </p>
        </motion.div>

        {/* Centered Premium Contact Card (Index Card / Postal Card style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-[18px] sm:rounded-[24px] p-6 sm:p-10 paper-shadow relative overflow-hidden"
        >
          {/* Subtle top edge decoration matching projects */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500" />

          <div className="flex flex-col gap-4 w-full">
            {/* Email link */}
            <a 
              href="mailto:basilvarghese012@gmail.com" 
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Email Me</p>
                <p className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">basilvarghese012@gmail.com</p>
              </div>
            </a>

            {/* Phone link */}
            <a 
              href="tel:+919562731781" 
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Call Me</p>
                <p className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">+91 9562731781</p>
              </div>
            </a>

            {/* Location */}
            <a 
              href="https://www.google.com/maps?q=Ernakulam,+Kerala,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Location</p>
                <p className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Ernakulam, Kerala, India</p>
              </div>
            </a>
          </div>

          {/* Social Links divider */}
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <h3 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-4">Connect on Socials</h3>
            <div className="flex justify-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/basil-varghesekutty-31a2b9227"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button variant="outline" size="icon" className="w-11 h-11 rounded-full border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.6v2.2h.1c.5-.8 1.8-1.6 3.3-1.6 3.5 0 4.3 2.3 4.3 5.3V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4v7.6h-4z" />
                  </svg>
                </Button>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/basil-123"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button variant="outline" size="icon" className="w-11 h-11 rounded-full border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8 11.3.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.2.1 1.8 1.3 1.8 1.3 1 .1 1.5 1.2 1.5 1.2.9 1.6 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2.9-.3 1.9-.5 2.8-.5s1.9.2 2.8.5c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .8.9 1.2 1.9 1.2 3.1 0 4.4-2.8 5.3-5.5 5.7.4.3.7.9.7 1.8v2.7c0 .3.2.7.8.6 4.6-1.5 8-6 8-11.3C24 5.9 18.6.5 12 .5z" />
                  </svg>
                </Button>
              </a>

              {/* Email Button */}
              <a href="mailto:basilvarghese012@gmail.com" className="group">
                <Button variant="outline" size="icon" className="w-11 h-11 rounded-full border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
