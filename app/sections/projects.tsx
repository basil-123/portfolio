'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Github, ArrowUpRight, X, BookOpen, Layers, Terminal, ArrowRight, ChevronDown } from 'lucide-react'

// Detailed project dataset synced with Basil-123's actual GitHub repos
const projectsList = [
  {
    id: "01",
    title: "Integrated Attendance & Fight Detection",
    subtitle: "CCTV surveillance automation via deep learning & facial recognition.",
    github: "https://github.com/basil-123/Violence-Detection",
    relatedRepos: [
      { name: "Violence Detection System", url: "https://github.com/basil-123/Violence-Detection" },
      { name: "Attendance Logging Module", url: "https://github.com/basil-123/attendance" },
      { name: "DeepFace Recognition Engine", url: "https://github.com/basil-123/deepface" }
    ],
    issue: "VOL. I NO. 01",
    date: "FEB 2026",
    price: "10 CENTS",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask", "React", "SQLite", "DeepFace"],
    image: "/cctv_sketch.png",
    naturalImage: "/cctv_natural.png",
    bgVideo: "/attendance_bg.mp4",
    caption: "FIG. 01 - CCTV AI OPTICAL ANALYSIS FRAMEWORK",
    editorial: "A dual-purpose pipeline for automated classroom attendance and real-time CCTV violence alerts. Built using custom CNN+LSTM models and face recognition libraries to secure and automate academic environments.",
    overview: "This project solves two critical school challenges in a single deployment: student roll-call overhead and classroom/corridor safety. It integrates multi-camera video streams, extracts face embeddings to match database logs, and uses temporal neural networks to spot physical violence.",
    architecture: [
      "Inference Pipeline: OpenCV captures CCTV frames and feeds them concurrently to the face detector and violence analyzer.",
      "Violence Recognition: Pretrained MobileNetV2 features are sequenced through an LSTM cell to detect high-energy physical combat.",
      "Facial Recognition: DeepFace extracts face vectors using MTCNN alignment, cross-referencing names in a local SQLite store.",
      "Alert Dashboard: Real-time alerts are streamed via Server-Sent Events to a React administration console."
    ],
    decisions: [
      "DeepFace: Selected for its modular wrapper around state-of-the-art models, allowing rapid testing of VGG-Face and FaceNet.",
      "LSTM: Chosen over heavier 3D CNNs to keep real-time inference rates high on standard GPU/CPU edge hardware.",
      "SQLite: Kept database structures simple and self-contained for local server deployments."
    ]
  },
  {
    id: "02",
    title: "Business Intelligence AI Agent",
    subtitle: "Natural language interface for database querying & automated analytics.",
    github: "https://github.com/basil-123/bi_agent",
    relatedRepos: [
      { name: "BI AI Agent Repo", url: "https://github.com/basil-123/bi_agent" }
    ],
    issue: "VOL. I NO. 02",
    date: "MAR 2026",
    price: "5 CENTS",
    tech: ["Python", "LangChain", "OpenAI GPT", "Pandas", "Streamlit", "SQLAlchemy"],
    image: "/bi_agent_sketch.png",
    naturalImage: "/bi_agent_natural.png",
    bgVideo: undefined,
    caption: "FIG. 02 - DATABASE INFERENCE ENGINE PIPELINE",
    editorial: "An autonomous agent that translates plain English queries into SQL and Python scripts, executing database analytics and drawing charts. It democratizes data reporting for non-technical stakeholders.",
    overview: "Solves the bottleneck of non-technical stakeholders waiting for database reports. Users can ask questions like 'Show me sales trends for last quarter broken down by region,' and the agent handles the schema parsing, code generation, and visualization.",
    architecture: [
      "ReAct Execution Loop: Employs LangChain/LangGraph to orchestrate a reasoning-and-acting feedback loop.",
      "Self-Correction Engine: Captures syntax or runtime exceptions from SQL executions and feeds them back to the LLM to fix queries.",
      "Sandboxed Python Tool: Executes Pandas operations and Matplotlib/Plotly code to compile local charts safely.",
      "Interface: Powered by Streamlit for instant, lightweight frontend data tables and chart plots."
    ],
    decisions: [
      "LangChain/LangGraph: Selected for robust multi-step routing and conversational memory management.",
      "OpenAI GPT: Chosen as the core controller due to superior function calling capabilities and SQL generation accuracy.",
      "Streamlit: Utilized for high development speed, avoiding the overhead of separate frontend state management."
    ]
  },
  {
    id: "03",
    title: "PDF & Web Interactive RAG Assistant",
    subtitle: "Smart semantic Q&A over local files and live website domains.",
    github: "https://github.com/basil-123/PDF-WEB-assistant",
    relatedRepos: [
      { name: "RAG Assistant Repo", url: "https://github.com/basil-123/PDF-WEB-assistant" }
    ],
    issue: "VOL. I NO. 03",
    date: "APR 2026",
    price: "FREE",
    tech: ["Python", "LangChain", "ChromaDB", "HuggingFace", "Streamlit", "PyPDF"],
    image: "/rag_sketch.png",
    naturalImage: "/rag_natural.png",
    bgVideo: "/web_assistant_bg.mp4",
    caption: "FIG. 03 - VECTOR SEMANTIC RETRIEVAL TOPOLOGY",
    editorial: "A high-fidelity retrieval assistant built to conquer document fatigue. It parses, chunks, and vectorizes large PDFs or live web pages, allowing users to ask natural questions and get answers with sources.",
    overview: "This project provides document Q&A that goes beyond keyword searches. It uses dense vector representations to retrieve semantically matching document chunks, passing them as context to a generative LLM for synthesis.",
    architecture: [
      "Document Loader: Parses uploaded PDFs and scrapes public web URLs into raw text logs.",
      "Embedding Pipeline: Chunks text recursively (1000 tokens, 200 overlap) and generates vectors via HuggingFace models.",
      "Vector Index: Stores embeddings in ChromaDB with cosine similarity indexing for low-latency retrieval.",
      "Generator Module: Assembles context prompt injections to synthesize grounded answers without hallucinations."
    ],
    decisions: [
      "ChromaDB: Chosen for its ease of use, local disk persistence, and strong developer community integration.",
      "Recursive Text Splitter: Selected to preserve semantic paragraph contexts compared to strict character chunking.",
      "HuggingFace Embeddings: Configured with open-source sentence-transformers to support local offline vector generation."
    ]
  },
  {
    id: "04",
    title: "Conversational AI Chatbot Platform",
    subtitle: "Context-aware chat engine featuring low-latency message streaming.",
    github: "https://github.com/basil-123/chatbot",
    relatedRepos: [
      { name: "Conversational Chatbot Repo", url: "https://github.com/basil-123/chatbot" }
    ],
    issue: "VOL. I NO. 04",
    date: "MAY 2026",
    price: "7 CENTS",
    tech: ["Python", "FastAPI", "WebSockets", "React", "Tailwind CSS", "Uvicorn"],
    image: "/chatbot_sketch.png",
    naturalImage: "/chatbot_natural.png",
    bgVideo: "/chat.mp4",
    caption: "FIG. 04 - WEBSOCKET CHAT DATA ROUTING LAYOUT",
    editorial: "A customizable chat engine designed to provide instant, human-like responses with context-aware chat history and prompt steering. Supports streaming responses and WebSocket connections.",
    overview: "Built to demonstrate modern chat UI/UX and high-performance server integrations. Features asynchronous message handling, customizable chat roles/personas, and responsive UI layouts for mobile and web.",
    architecture: [
      "WebSocket Hub: Manages persistent connections to enable full-duplex communication and lower token streaming latency.",
      "Memory Buffer: Manages recent chat message histories inside volatile sessions to steer LLM responses.",
      "Asynchronous Server: FastAPI running on Uvicorn handle concurrent client connections efficiently.",
      "Client UI: React hooks handle state updates, scrolling behaviors, markdown rendering, and code syntax highlighting."
    ],
    decisions: [
      "FastAPI + WebSockets: Selected for performance benchmarks under concurrent connections.",
      "React + Tailwind CSS: Designed for smooth, responsive layouts, dark mode flexibility, and micro-interactions.",
      "Volatile Memory: Configured to support rapid conversations without the retrieval latency of disk database reads."
    ]
  }
]

type Project = typeof projectsList[0];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position over the container height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'editorial' | 'technical' | 'repos'>('editorial')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Flat vs Raised shadows for 3D depth simulation
  const flatShadow = "0px 2px 6px rgba(15,23,42,0.06), 0px 1px 3px rgba(15,23,42,0.03)"
  const raisedShadow = "0px 24px 48px -8px rgba(15,23,42,0.12), 0px 12px 24px -4px rgba(15,23,42,0.06)"

  // Scroll mapping points
  const points = [0, 0.15, 0.35, 0.45, 0.65, 0.75, 0.95, 1.0]

  // Heights: 48px collapsed, 480px expanded (active POV is slightly upper to reveal lower pages)
  const h1 = useTransform(scrollYProgress, points, isMobile 
    ? [500, 500, 40, 40, 40, 40, 40, 40] 
    : [520, 520, 48, 48, 48, 48, 48, 48])
  const h2 = useTransform(scrollYProgress, points, isMobile 
    ? [40, 40, 500, 500, 40, 40, 40, 40] 
    : [48, 48, 520, 520, 48, 48, 48, 48])
  const h3 = useTransform(scrollYProgress, points, isMobile 
    ? [40, 40, 40, 40, 500, 500, 40, 40] 
    : [48, 48, 48, 48, 520, 520, 48, 48])
  const h4 = useTransform(scrollYProgress, points, isMobile 
    ? [40, 40, 40, 40, 40, 40, 500, 500] 
    : [48, 48, 48, 48, 48, 48, 520, 520])

  // rotateX: 0deg active (parallel to screen), 68deg collapsed (lying flat on desk, slightly upper POV)
  const rx_val = isMobile ? 55 : 68
  const rx1 = useTransform(scrollYProgress, points, [0, 0, rx_val, rx_val, rx_val, rx_val, rx_val, rx_val])
  const rx2 = useTransform(scrollYProgress, points, [rx_val, rx_val, 0, 0, rx_val, rx_val, rx_val, rx_val])
  const rx3 = useTransform(scrollYProgress, points, [rx_val, rx_val, rx_val, rx_val, 0, 0, rx_val, rx_val])
  const rx4 = useTransform(scrollYProgress, points, [rx_val, rx_val, rx_val, rx_val, rx_val, rx_val, 0, 0])

  // y: vertical positioning inside the 3D space
  const y1 = useTransform(scrollYProgress, points, isMobile
    ? [20, 20, -30, -30, -30, -30, -30, -30]
    : [20, 20, -40, -40, -40, -40, -40, -40])
  const y2 = useTransform(scrollYProgress, points, isMobile
    ? [520, 520, 20, 20, -10, -10, -10, -10]
    : [540, 540, 20, 20, -16, -16, -16, -16])
  const y3 = useTransform(scrollYProgress, points, isMobile
    ? [540, 540, 520, 520, 20, 20, 10, 10]
    : [564, 564, 564, 564, 20, 20, 8, 8])
  const y4 = useTransform(scrollYProgress, points, isMobile
    ? [560, 560, 540, 540, 520, 520, 20, 20]
    : [588, 588, 588, 588, 588, 588, 20, 20])

  // z: translation along Z-axis (lifts up closer to viewer when active)
  const z1 = useTransform(scrollYProgress, points, [40, 40, -30, -30, -30, -30, -30, -30])
  const z2 = useTransform(scrollYProgress, points, [-20, -20, 40, 40, -20, -20, -20, -20])
  const z3 = useTransform(scrollYProgress, points, [-10, -10, -10, -10, 40, 40, -10, -10])
  const z4 = useTransform(scrollYProgress, points, [0, 0, 0, 0, 0, 0, 40, 40])

  // x: horizontal offsets when collapsed, 0 when active
  const x1 = useTransform(scrollYProgress, points, isMobile
    ? [0, 0, -3, -3, -3, -3, -3, -3]
    : [0, 0, -6, -6, -6, -6, -6, -6])
  const x2 = useTransform(scrollYProgress, points, isMobile
    ? [4, 4, 0, 0, 4, 4, 4, 4]
    : [8, 8, 0, 0, 8, 8, 8, 8])
  const x3 = useTransform(scrollYProgress, points, isMobile
    ? [-2, -2, -2, -2, 0, 0, -2, -2]
    : [-4, -4, -4, -4, 0, 0, -4, -4])
  const x4 = useTransform(scrollYProgress, points, isMobile
    ? [3, 3, 3, 3, 3, 3, 0, 0]
    : [6, 6, 6, 6, 6, 6, 0, 0])

  // zIndex: active card on top
  const zi1 = useTransform(scrollYProgress, points, [30, 30, 10, 10, 10, 10, 10, 10])
  const zi2 = useTransform(scrollYProgress, points, [15, 15, 30, 30, 15, 15, 15, 15])
  const zi3 = useTransform(scrollYProgress, points, [20, 20, 20, 20, 30, 30, 20, 20])
  const zi4 = useTransform(scrollYProgress, points, [25, 25, 25, 25, 25, 25, 30, 30])

  // boxShadow transitions
  const sh1 = useTransform(scrollYProgress, points, [raisedShadow, raisedShadow, flatShadow, flatShadow, flatShadow, flatShadow, flatShadow, flatShadow])
  const sh2 = useTransform(scrollYProgress, points, [flatShadow, flatShadow, raisedShadow, raisedShadow, flatShadow, flatShadow, flatShadow, flatShadow])
  const sh3 = useTransform(scrollYProgress, points, [flatShadow, flatShadow, flatShadow, flatShadow, raisedShadow, raisedShadow, flatShadow, flatShadow])
  const sh4 = useTransform(scrollYProgress, points, [flatShadow, flatShadow, flatShadow, flatShadow, flatShadow, flatShadow, raisedShadow, raisedShadow])

  // Opacities of expanded content
  const o1 = useTransform(scrollYProgress, points, [1, 1, 0, 0, 0, 0, 0, 0])
  const o2 = useTransform(scrollYProgress, points, [0, 0, 1, 1, 0, 0, 0, 0])
  const o3 = useTransform(scrollYProgress, points, [0, 0, 0, 0, 1, 1, 0, 0])
  const o4 = useTransform(scrollYProgress, points, [0, 0, 0, 0, 0, 0, 1, 1])

  // Chevrons
  const rc1 = useTransform(scrollYProgress, points, [180, 180, 0, 0, 0, 0, 0, 0])
  const rc2 = useTransform(scrollYProgress, points, [0, 0, 180, 180, 0, 0, 0, 0])
  const rc3 = useTransform(scrollYProgress, points, [0, 0, 0, 0, 180, 180, 0, 0])
  const rc4 = useTransform(scrollYProgress, points, [0, 0, 0, 0, 0, 0, 180, 180])

  // Header text opacities (fades to 0 when completely scrolled up / on the top stack)
  const ho1 = useTransform(scrollYProgress, points, [1, 1, 0, 0, 0, 0, 0, 0])
  const ho2 = useTransform(scrollYProgress, points, [1, 1, 1, 1, 0, 0, 0, 0])
  const ho3 = useTransform(scrollYProgress, points, [1, 1, 1, 1, 1, 1, 0, 0])
  const ho4 = useTransform(scrollYProgress, points, [1, 1, 1, 1, 1, 1, 1, 1])

  // Header border and background color transforms to make scrolled-up pages completely blank white sheets
  const bc1 = useTransform(ho1, [0, 1], ["rgba(241, 245, 249, 0)", "rgba(241, 245, 249, 1)"])
  const bc2 = useTransform(ho2, [0, 1], ["rgba(241, 245, 249, 0)", "rgba(241, 245, 249, 1)"])
  const bc3 = useTransform(ho3, [0, 1], ["rgba(241, 245, 249, 0)", "rgba(241, 245, 249, 1)"])
  const bc4 = useTransform(ho4, [0, 1], ["rgba(241, 245, 249, 0)", "rgba(241, 245, 249, 1)"])

  const bg1 = useTransform(ho1, [0, 1], ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 0.2)"])
  const bg2 = useTransform(ho2, [0, 1], ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 0.2)"])
  const bg3 = useTransform(ho3, [0, 1], ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 0.2)"])
  const bg4 = useTransform(ho4, [0, 1], ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 0.2)"])

  const motionTransforms = [
    { height: h1, rotateX: rx1, y: y1, z: z1, x: x1, zIndex: zi1, shadow: sh1, opacity: o1, rotateChevron: rc1, headerOpacity: ho1, headerBorderColor: bc1, headerBgColor: bg1 },
    { height: h2, rotateX: rx2, y: y2, z: z2, x: x2, zIndex: zi2, shadow: sh2, opacity: o2, rotateChevron: rc2, headerOpacity: ho2, headerBorderColor: bc2, headerBgColor: bg2 },
    { height: h3, rotateX: rx3, y: y3, z: z3, x: x3, zIndex: zi3, shadow: sh3, opacity: o3, rotateChevron: rc3, headerOpacity: ho3, headerBorderColor: bc3, headerBgColor: bg3 },
    { height: h4, rotateX: rx4, y: y4, z: z4, x: x4, zIndex: zi4, shadow: sh4, opacity: o4, rotateChevron: rc4, headerOpacity: ho4, headerBorderColor: bc4, headerBgColor: bg4 }
  ]

  const handleCardClick = (idx: number, project: Project) => {
    const currentHeight = motionTransforms[idx].height.get();
    const activeThreshold = isMobile ? 150 : 200;
    if (currentHeight > activeThreshold) {
      setSelectedProject(project)
      setActiveTab('editorial')
    } else {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const containerTop = rect.top + scrollTop
        const containerHeight = rect.height
        
        // Target scroll progress percentages for centering each card
        const targets = [0.05, 0.40, 0.70, 0.98]
        const targetFraction = targets[idx]
        
        const scrollableRange = containerHeight - window.innerHeight
        const targetScrollY = containerTop + (scrollableRange * targetFraction)
        
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative z-10 bg-[#faf9f6]/40 border-t border-b border-slate-200/50 h-[300vh]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-16 overflow-hidden">
        
        {/* Section Heading */}
        <div className="text-center z-20 px-4 shrink-0 mb-6 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Archive Sheets
          </span>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight font-serif">
            The Project Gazette
          </h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto text-[11px] sm:text-sm leading-relaxed px-4">
            {isMobile 
              ? "Scroll to stack/unstack each sheet in the pile. Tap any sheet to view its full dossier."
              : "Scroll to expand each page in the vertical paper pile. Click any active sheet to view the full dossier."
            }
          </p>
        </div>

        {/* Progress Track and Stack Deck Wrapper */}
        <div className="w-full max-w-5xl px-4 sm:px-6 relative flex gap-8 items-center h-[620px] sm:h-[660px]">
          
          {/* Scroll Progress Timeline Track (Left Side) */}
          <div className="relative w-0.5 bg-slate-200/80 hidden lg:block h-[450px] shrink-0 z-20">
            <motion.div 
              className="w-full bg-indigo-500 origin-top h-full" 
              style={{ scaleY: scrollYProgress }} 
            />
            <div className="absolute top-0 -left-1.5 w-3.5 h-3.5 rounded-full bg-slate-200 border-2 border-white" />
            <div className="absolute bottom-0 -left-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white" />
          </div>

          {/* Vertical Stack Deck - Styled like a 3D desk space */}
          <div 
            className="flex-1 relative h-full select-none"
            style={{ 
              perspective: "1800px", 
              transformStyle: "preserve-3d" 
            }}
          >
          {projectsList.map((project, idx) => {
            const transforms = motionTransforms[idx]

            return (
              <motion.div
                key={project.id}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  width: "100%",
                  height: transforms.height,
                  rotateX: transforms.rotateX,
                  x: transforms.x,
                  y: transforms.y,
                  z: transforms.z,
                  zIndex: transforms.zIndex,
                  boxShadow: transforms.shadow,
                  transformStyle: "preserve-3d",
                }}
                className="bg-white border border-slate-200/90 rounded-[6px] transition-shadow relative overflow-hidden flex flex-col justify-between cursor-pointer group"
                onClick={() => handleCardClick(idx, project)}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50/10 via-transparent to-transparent pointer-events-none" />

                {/* 1. Spine / Header Row (Always Visible - 48px high on desktop, 40px on mobile to look like a thin paper edge) */}
                <motion.div
                  style={{
                    borderColor: transforms.headerBorderColor,
                    backgroundColor: transforms.headerBgColor,
                  }}
                  className="h-[38px] sm:h-[46px] min-h-[38px] sm:min-h-[46px] border-b select-none overflow-hidden relative z-10"
                >
                  <motion.div
                    style={{ opacity: transforms.headerOpacity }}
                    className="h-full w-full flex items-center justify-between px-3 sm:px-6"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <h3 className="text-[11px] sm:text-sm font-serif font-bold text-slate-800 tracking-tight line-clamp-1 transition-transform duration-500 ease-out group-hover:scale-[1.03] origin-left">
                        {project.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <motion.div style={{ rotate: transforms.rotateChevron }} className="text-slate-400">
                        <ChevronDown className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* 2. Expanded Content Block (Fades in/out) */}
                <motion.div
                  style={{
                    opacity: transforms.opacity,
                  }}
                  className="flex-1 flex flex-col justify-between p-3 sm:p-6 pt-2 sm:pt-3 overflow-hidden relative z-10"
                >
                  <div className="flex-1 grid grid-cols-12 gap-3 sm:gap-6 items-stretch overflow-hidden">
                    
                    {/* Left Column: Editorial Content */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between overflow-hidden relative z-10 py-1 transition-transform duration-500 ease-out group-hover:scale-[1.04] origin-left">
                      <div>
                        {/* Subtitle */}
                        <div className="border-y border-dashed border-slate-200 py-1 text-[9px] sm:text-xs font-mono text-slate-500 italic mb-2">
                          {project.subtitle}
                        </div>

                        {/* PC-only Vintage Gazette Stats Grid */}
                        <div className="hidden lg:grid grid-cols-3 gap-2 border-b border-dashed border-slate-200 pb-2 mb-3 text-[10px] font-mono text-slate-500 font-bold">
                          <div>
                            <span className="block text-slate-400 font-extrabold uppercase text-[7px] tracking-wider">GAZETTE ISSUE</span>
                            <span className="text-slate-700">{project.issue}</span>
                          </div>
                          <div>
                            <span className="block text-slate-400 font-extrabold uppercase text-[7px] tracking-wider">RELEASE DATE</span>
                            <span className="text-slate-700">{project.date}</span>
                          </div>
                          <div>
                            <span className="block text-slate-400 font-extrabold uppercase text-[7px] tracking-wider">PRINT PRICE</span>
                            <span className="text-slate-700">{project.price}</span>
                          </div>
                        </div>
 
                        {/* Editorial Body Text */}
                        <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed font-serif text-justify overflow-hidden line-clamp-4 lg:line-clamp-8 mb-2 sm:mb-3">
                          {project.editorial}
                        </p>

                        {/* PC-only Specs Section to fill up unused space */}
                        <div className="hidden lg:block border-t border-slate-100 pt-3 mt-3">
                          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block mb-1">
                            System Architecture Preview
                          </span>
                          <ul className="space-y-1.5 font-serif text-[10px] text-slate-500">
                            {project.architecture.slice(0, 4).map((item, idx) => {
                              const [title, desc] = item.split(': ')
                              return (
                                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                  <span className="mt-1 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                                  <span>
                                    <strong className="text-slate-800 font-sans text-[8px] uppercase tracking-wider mr-1">{title}:</strong>
                                    {desc}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
 
                      {/* Footer Actions */}
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-indigo-600 font-bold border-t border-slate-100 pt-2 shrink-0 mt-2 sm:mt-0">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> Open Dossier
                        </span>
                        <span className="flex items-center gap-1">
                          Codebase <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Technical Video/Image Frame Box & Tech Badges */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between overflow-hidden relative z-10 mt-3 lg:mt-0">
                      {/* Technical Video/Image Frame */}
                      <div className="flex flex-col justify-center mb-3 sm:mb-4 shrink-0 lg:flex-1">
                        <div className="bg-[#fcfbf9] border border-slate-300 rounded-[4px] p-1.5 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-transform duration-500 group-hover:scale-[1.02]">
                          <div className="aspect-[16/10] bg-slate-900 rounded-[2px] overflow-hidden relative border border-slate-200">
                            {project.bgVideo ? (
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster={project.naturalImage}
                                className="w-full h-full object-cover filter brightness-[1.02] contrast-[0.98]"
                              >
                                <source src={project.bgVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img 
                                src={project.naturalImage} 
                                alt={project.title} 
                                className="w-full h-full object-cover filter brightness-[1.02] contrast-[0.98]"
                              />
                            )}
                          </div>
                        </div>
                        {/* Caption under the frame */}
                        <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 font-bold tracking-wider text-center mt-2 uppercase">
                          {project.caption}
                        </div>

                        {/* PC-only Repo Indicators to fill up unused space */}
                        <div className="hidden lg:flex items-center gap-2 mt-3 border-t border-slate-100 pt-3">
                          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                            Source Repos
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.relatedRepos.map((repo, rIdx) => (
                              <span key={rIdx} className="inline-flex items-center gap-0.5 text-[9px] font-mono text-indigo-600 bg-indigo-50/50 border border-indigo-100/50 px-1.5 py-0.5 rounded">
                                {repo.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1 justify-start lg:justify-end shrink-0">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[8px] sm:text-[9px] font-mono font-semibold px-1.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200/80 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="text-[8px] font-mono text-slate-500 pt-0.5 bg-slate-50 px-1.5 rounded">
                            +{project.tech.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
            </div>
          </div>
        </div>

      {/* Detailed Modal (The Open Newspaper Dossier) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
            
            {/* Blurred Glass Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Newspaper Spread Modal Content */}
            <motion.div
              className="bg-[#fdfcfb] border-t sm:border border-slate-300 w-full max-w-5xl rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden relative z-10 h-[92vh] sm:h-auto max-h-[92vh] sm:max-h-[85vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
            >
              {/* Vintage Header/Titlebar */}
              <div className="bg-[#f2efe9] border-b border-slate-300 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono bg-slate-800 text-[#fdfcfb] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    GAZETTE DOSSIER
                  </span>
                </div>
                
                {/* Close button with card look */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200/80 transition-colors text-slate-600 hover:text-slate-900 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Newspaper Body - Scrollable */}
              <div className="overflow-y-auto flex-1 p-4 sm:p-8">
                {/* Newspaper Header */}
                <div className="text-center border-b-2 border-double border-slate-400 pb-4 sm:pb-5 mb-4 sm:mb-6">
                  <h3 className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-slate-400 uppercase">
                    THE PORTFOLIO TELEGRAPH
                  </h3>
                  <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 mt-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-serif italic text-slate-500 mt-2">
                    "{selectedProject.subtitle}"
                  </p>
                </div>

                {/* Tabs Selector (Styled like file folder tabs) */}
                <div className="flex border-b border-slate-300 gap-1 sm:gap-2 mb-4 sm:mb-6 shrink-0 font-mono text-xs sm:text-sm overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setActiveTab('editorial')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg transition-colors border-t border-x border-transparent flex items-center gap-2 shrink-0 ${
                      activeTab === 'editorial' 
                        ? 'bg-[#fdfcfb] border-slate-300 text-indigo-600 font-bold -mb-px' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Editorial
                  </button>
                  <button
                    onClick={() => setActiveTab('technical')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg transition-colors border-t border-x border-transparent flex items-center gap-2 shrink-0 ${
                      activeTab === 'technical' 
                        ? 'bg-[#fdfcfb] border-slate-300 text-indigo-600 font-bold -mb-px' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Technical Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('repos')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg transition-colors border-t border-x border-transparent flex items-center gap-2 shrink-0 ${
                      activeTab === 'repos' 
                        ? 'bg-[#fdfcfb] border-slate-300 text-indigo-600 font-bold -mb-px' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Source Repositories
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[250px]">
                  
                  {/* Tab 1: Editorial Overview (Multi-column newspaper look) */}
                  {activeTab === 'editorial' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black mb-3">
                          FRONT PAGE REPORT
                        </h4>
                        <p className="text-slate-700 font-serif leading-relaxed text-sm sm:text-base text-justify first-letter:text-4xl first-letter:font-bold first-letter:font-serif first-letter:text-indigo-600 first-letter:float-left first-letter:mr-2">
                          {selectedProject.overview}
                        </p>
                      </div>
                      <div className="bg-[#f8f6f0] p-4 sm:p-5 rounded-lg border border-slate-200/80">
                        {/* Schematic illustration embedded inside the Editorial Dossier */}
                        <div className="mb-4 bg-white border border-slate-300 p-1.5 rounded shadow-[0_2px_8px_-3px_rgba(15,23,42,0.08)]">
                          <div className="bg-[#faf9f6]/30 border border-slate-100 rounded overflow-hidden">
                            <img 
                              src={selectedProject.image} 
                              alt={selectedProject.title} 
                              className="w-full h-40 object-contain filter grayscale sepia-[15%] contrast-115 mix-blend-multiply opacity-95"
                            />
                          </div>
                          <div className="text-[8px] font-mono text-slate-400 tracking-widest text-center mt-2 border-t border-slate-100 pt-1 uppercase">
                            {selectedProject.caption}
                          </div>
                        </div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                          <span>SUMMARY DIGEST</span>
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm font-serif leading-relaxed italic mb-4">
                          "{selectedProject.editorial}"
                        </p>
                        <div className="border-t border-slate-200 pt-3">
                          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block mb-2">Core Tech Used:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tech.map((t) => (
                              <span key={t} className="text-[10px] font-mono bg-white text-slate-600 border border-slate-200/80 px-2 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Technical Specifications */}
                  {activeTab === 'technical' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black mb-3 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-indigo-500" /> Pipeline Architecture
                        </h4>
                        <ul className="space-y-3 font-serif text-sm text-slate-700">
                          {selectedProject.architecture.map((item, index) => {
                            const [title, desc] = item.split(': ')
                            return (
                              <li key={index} className="flex items-start gap-2.5">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                                <span className="leading-relaxed">
                                  <strong className="text-slate-900 font-sans text-xs uppercase tracking-wider mr-1">{title}:</strong>
                                  {desc}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black mb-3 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-indigo-500" /> Engineering Decisions
                        </h4>
                        <ul className="space-y-3 font-serif text-sm text-slate-700">
                          {selectedProject.decisions.map((item, index) => {
                            const [title, desc] = item.split(': ')
                            return (
                              <li key={index} className="flex items-start gap-2.5">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                                <span className="leading-relaxed">
                                  <strong className="text-slate-900 font-sans text-xs uppercase tracking-wider mr-1">{title}:</strong>
                                  {desc}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Repository / Source Links */}
                  {activeTab === 'repos' && (
                    <div className="max-w-xl mx-auto py-4">
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black mb-4">
                        PUBLISHED CODEBASES
                      </h4>
                      
                      <div className="space-y-3">
                        {selectedProject.relatedRepos.map((repo, rIdx) => (
                          <a
                            key={rIdx}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white hover:bg-indigo-50/30 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group/repo"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 group-hover/repo:bg-indigo-50 rounded-lg text-slate-700 group-hover/repo:text-indigo-600 transition-colors">
                                <Github className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-slate-800 group-hover/repo:text-indigo-700 transition-colors block">
                                  {repo.name}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  github.com/{repo.url.split('github.com/')[1]}
                                </span>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 group-hover/repo:text-indigo-600 font-bold transition-colors">
                              Source Code <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 text-xs font-mono text-slate-500 leading-relaxed text-center">
                        All repositories are licensed under standard open-source licenses. Feel free to clone, open issues, or submit pull requests.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Tag */}
              <div className="bg-[#f2efe9] border-t border-slate-300 px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between text-[10px] font-mono text-slate-400 shrink-0">
                <span>PUBLISHER: BASIL-123</span>
                <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}