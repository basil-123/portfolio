'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground">
            I'm actively looking for opportunities in data science and machine learning. If you're hiring or open to collaboration, feel free to get in touch!
          </p>
        </motion.div>

        {/* Centered Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto space-y-8 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <p className="text-muted-foreground">basilvarghese012@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <p className="text-muted-foreground">+91 9562731781</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <p className="text-muted-foreground">Ernakulam, Kerala, India</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Connect with me</h3>
            <div className="flex justify-center gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/basil-varghesekutty-31a2b9227"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
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
              >
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8 11.3.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.2.1 1.8 1.3 1.8 1.3 1 .1 1.5 1.2 1.5 1.2.9 1.6 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2.9-.3 1.9-.5 2.8-.5s1.9.2 2.8.5c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .8.9 1.2 1.9 1.2 3.1 0 4.4-2.8 5.3-5.5 5.7.4.3.7.9.7 1.8v2.7c0 .3.2.7.8.6 4.6-1.5 8-6 8-11.3C24 5.9 18.6.5 12 .5z" />
                  </svg>
                </Button>
              </a>

              {/* Email */}
              <a href="mailto:basilvarghese012@gmail.com">
                <Button variant="outline" size="icon">
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
