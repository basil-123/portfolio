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
          <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto">
            <Image
              src="/dp.jpg" // Replace with your image path
              alt="About Me"
              fill
              className="object-cover"
              priority
            />
          </div>


          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a data science enthusiast with a deep passion for solving real-world problems through data. 
              I'm actively seeking an opportunity to join a forward-thinking company where I can apply my skills, 
              continue learning, and give my best to contribute meaningfully to impactful projects.
            </p>
            
            {/* <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">ML</span>
                </div>
                <p>Machine Learning Projects</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">Python</span>
                </div>
                <p>Programming Expertise</p>
              </div>
            </div> */}

            <a href="/resume.pdf" download>
              <Button className="gap-2">
                <Download size={16} />
                Download Resume
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
