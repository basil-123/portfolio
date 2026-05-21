"use client";

import { motion } from "framer-motion";

interface SkillGroup {
  code: string;
  title: string;
  description: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    code: "01",
    title: "Languages & Core",
    description: "Foundational programming dialects and core mathematical libraries for numerical processing.",
    skills: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "PySpark"],
  },
  {
    code: "02",
    title: "Databases & Storage",
    description: "Relational and non-relational database management systems for structured datasets.",
    skills: ["MySQL", "MongoDB"],
  },
  {
    code: "03",
    title: "ML Engineering",
    description: "Deep learning models, computer vision architectures, and production pipeline management.",
    skills: ["PyTorch", "TensorFlow", "FastAPI", "OpenCV", "Hugging Face", "MLflow"],
  },
  {
    code: "04",
    title: "Data Visualization",
    description: "Analytical dashboards and plotting toolkits to synthesize insights.",
    skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn"],
  },
  {
    code: "05",
    title: "DevOps & Tools",
    description: "Container systems, distributed workflows, and code environments.",
    skills: ["Docker", "Git", "VS Code", "Jupyter Notebook", "Streamlit"],
  },
  {
    code: "06",
    title: "Productivity",
    description: "Spreadsheet software and local research tools for quick data auditing.",
    skills: ["Excel", "Google Sheets"],
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: [0.215, 0.610, 0.355, 1.0] 
    } 
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Title block */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12 border-b border-slate-200 pb-6 md:pb-8">
          <div className="md:col-span-2">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Technical Index
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-2 font-medium tracking-tight">
              Skills & Expertise
            </h2>
          </div>
          <div className="md:col-span-2 flex items-end">
            <p className="text-xs sm:text-sm font-serif text-slate-500 italic leading-relaxed md:text-right w-full">
              A directory of programming dialects, modeling frameworks, and engineering tools applied across predictive models, pipelines, and analytical interfaces.
            </p>
          </div>
        </div>

        {/* Boxy Grid Layout Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative border border-slate-950/10 p-3 sm:p-4 bg-slate-50/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
        >
          {/* Corner Crosshairs */}
          <div className="absolute -top-1.5 -left-1.5 text-[10px] font-mono text-slate-400 select-none pointer-events-none">+</div>
          <div className="absolute -top-1.5 -right-1.5 text-[10px] font-mono text-slate-400 select-none pointer-events-none">+</div>
          <div className="absolute -bottom-1.5 -left-1.5 text-[10px] font-mono text-slate-400 select-none pointer-events-none">+</div>
          <div className="absolute -bottom-1.5 -right-1.5 text-[10px] font-mono text-slate-400 select-none pointer-events-none">+</div>

          {/* Spaced Grid Container */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 bg-transparent"
          >
            {skillGroups.map((group) => (
              <motion.div
                variants={cellVariants}
                key={group.title}
                className="bg-white p-4 sm:p-5 flex flex-col justify-between hover:bg-slate-50/50 transition-all duration-300 group/card relative overflow-hidden min-h-[160px] sm:min-h-[195px] border border-slate-200/80 rounded-[6px] shadow-sm"
              >
                {/* Top edge active line animation on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-600 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Title & Description */}
                  <h3 className="font-serif text-base font-semibold text-slate-900 uppercase tracking-tight group-hover/card:text-indigo-600 group-hover/card:translate-x-1 transition-all duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-none shrink-0" />
                    {group.title}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 italic leading-relaxed mt-2 mb-4">
                    {group.description}
                  </p>
                </div>

                {/* Sub-grid list of Skills */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-dashed border-slate-200 mt-auto">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="group/skill flex items-center px-2.5 py-1 bg-slate-50 border border-slate-200/80 hover:bg-slate-950 hover:border-slate-950 hover:text-white transition-all duration-150 rounded-none cursor-default select-none"
                    >
                      <span className="font-mono text-[10px] sm:text-xs text-slate-700 group-hover/skill:text-slate-100 transition-colors duration-150 tracking-tight">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



