"use client";

import { motion } from "framer-motion";
import {
  FaPython,
  FaChartPie,
  FaBolt,
} from "react-icons/fa";
import {
  SiMysql,
  SiMongodb,
  SiScikitlearn,
  SiTableau,
  SiNumpy,
  SiPandas,
  SiTensorflow,
  SiPytorch,
  SiDocker,
  SiFastapi,
  SiOpencv,
  SiStreamlit,
  SiMlflow,
  SiHuggingface,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Core Languages & Libraries",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "scikit-learn", icon: <SiScikitlearn /> },
      { name: "PySpark", icon: <FaBolt className="text-orange-400" /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: <SiMysql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
  },
  {
    title: "ML Engineering",
    skills: [
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "MLflow", icon: <SiMlflow /> },
      { name: "Hugging Face", icon: <SiHuggingface /> },
      { name: "OpenCV", icon: <SiOpencv /> },
    ],
  },
  {
    title: "Data Visualization",
    skills: [
      { name: "Tableau", icon: <SiTableau /> },
      { name: "Power BI", icon: <FaChartPie /> },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
  },
  {
    title: "Deployment & Tools",
    skills: [
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Streamlit", icon: <SiStreamlit /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Git" },
      { name: "VS Code" },
    ],
  },
  {
    title: "Productivity",
    skills: [
      { name: "Excel" },
      { name: "Google Sheets" },
      { name: "Jupyter Notebook" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <motion.h2
        className="text-4xl font-bold text-center mb-16 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Skills & Technologies
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center gap-2 bg-white/10 px-3 py-1.5 text-sm text-white rounded-full hover:bg-white/20 transition"
                >
                  {skill.icon && <span className="text-base">{skill.icon}</span>}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
