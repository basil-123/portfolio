'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src="/about-image.jpg" // Replace with your image path
              alt="About Me"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a passionate frontend developer with expertise in modern web technologies. 
              With 5+ years of experience, I specialize in building responsive, 
              accessible, and performant web applications.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">5+</span>
                </div>
                <p>Years of Experience</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">50+</span>
                </div>
                <p>Projects Completed</p>
              </div>
            </div>

            <Button className="gap-2">
              <Download size={16} />
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}