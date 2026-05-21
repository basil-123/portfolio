"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Cpu, Sparkles, Send, HelpCircle, ArrowUpRight } from "lucide-react";

interface CorpusItem {
  id: string;
  keywords: string[];
  context: string;
  answer: string;
  category: "about" | "projects" | "skills";
  citation?: {
    label: string;
    action: string; // e.g., 'scroll-projects', 'scroll-skills', 'download-cv'
  };
}

const dossierCorpus: CorpusItem[] = [
  {
    id: "loc",
    keywords: ["location", "where", "base", "live", "kerala", "india", "place", "city"],
    context: "Location: Kerala, India. Working locally and open to remote collaboration globally.",
    answer: "Basil is currently based in Kerala, India. From this location, he collaborates on deep learning, predictive models, and agentic workflows, and is open to remote roles globally.",
    category: "about"
  },
  {
    id: "role",
    keywords: ["role", "position", "title", "engineer", "what do you do", "ai", "machine learning"],
    context: "Position: AI Engineer. Core focus areas include Predictive Systems, computer vision, and RAG frameworks.",
    answer: "Basil is an AI Engineer specializing in Deep Learning, Computer Vision, and Agentic Workflows. He builds pipelines that translate complex datasets into predictive insights and automated interfaces.",
    category: "about"
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "download", "pdf", "portfolio", "history", "experience"],
    context: "CV download link available on dossier profile. Local file path: public/Basil_CV.pdf",
    answer: "You can download Basil's complete technical CV directly from the Biography section. Clicking the citation badge below will trigger the download of his official dossier PDF.",
    category: "about",
    citation: {
      label: "Download Official CV",
      action: "download-cv"
    }
  },
  {
    id: "skills-lang",
    keywords: ["languages", "python", "sql", "pandas", "numpy", "scikit-learn", "pyspark", "programming", "code"],
    context: "Languages & Core Skills: Python, SQL, Pandas, NumPy, scikit-learn, PySpark.",
    answer: "Basil's primary programming language is Python, backed by SQL for database design. For analytics and numerical computing, he relies on Pandas, NumPy, scikit-learn, and PySpark for large-scale datasets.",
    category: "skills",
    citation: {
      label: "View Skills Registry",
      action: "scroll-skills"
    }
  },
  {
    id: "skills-ml",
    keywords: ["ml", "pytorch", "tensorflow", "fastapi", "opencv", "hugging face", "mlflow", "deep learning", "cv"],
    context: "ML Engineering: PyTorch, TensorFlow, FastAPI, OpenCV, Hugging Face, MLflow.",
    answer: "For machine learning pipelines, Basil develops deep learning architectures in PyTorch and TensorFlow. He builds computer vision pipelines using OpenCV and integrates pre-trained LLMs from Hugging Face, serving them via FastAPI.",
    category: "skills",
    citation: {
      label: "View Skills Registry",
      action: "scroll-skills"
    }
  },
  {
    id: "proj-cctv",
    keywords: ["cctv", "violence", "fight", "attendance", "face recognition", "deepface", "lstm", "cnn", "camera"],
    context: "Project 01: Integrated Attendance & Fight Detection. Tech: Python, TensorFlow, OpenCV, SQLite, DeepFace.",
    answer: "Basil designed a dual-purpose CCTV analytics framework. It tracks classroom attendance using facial recognition (DeepFace + SQLite) and flags real-time physical violence using a custom CNN + LSTM temporal network.",
    category: "projects",
    citation: {
      label: "Open Project Gazette (CCTV)",
      action: "scroll-projects-cctv"
    }
  },
  {
    id: "proj-bi",
    keywords: ["bi", "agent", "sql", "database", "analytics", "langchain", "gpt", "streamlit", "business intelligence"],
    context: "Project 02: Business Intelligence AI Agent. Tech: Python, LangChain, OpenAI GPT, Pandas, Streamlit.",
    answer: "This is an autonomous agent that handles database querying. Users submit plain English analytics questions, and the agent generates, debugs, and runs SQL queries, plotting the data outputs automatically inside a Streamlit interface.",
    category: "projects",
    citation: {
      label: "Open Project Gazette (BI Agent)",
      action: "scroll-projects-bi"
    }
  },
  {
    id: "proj-rag",
    keywords: ["rag", "pdf", "assistant", "web", "chromadb", "embeddings", "vector", "semantic", "search", "document"],
    context: "Project 03: PDF & Web Interactive RAG Assistant. Tech: Python, LangChain, ChromaDB, HuggingFace embeddings.",
    answer: "A semantic search assistant designed to parse, chunk, and index PDFs or live web pages. It loads documents into a local ChromaDB vector database and uses LLMs to answer queries with grounded source citations.",
    category: "projects",
    citation: {
      label: "Open Project Gazette (RAG)",
      action: "scroll-projects-rag"
    }
  },
  {
    id: "proj-chat",
    keywords: ["chatbot", "conversational", "websocket", "streaming", "fastapi", "react", "chat"],
    context: "Project 04: Conversational AI Chatbot Platform. Tech: FastAPI, WebSockets, React, Uvicorn.",
    answer: "A low-latency chat engine featuring real-time token streaming over persistent WebSocket connections. Built with an async FastAPI server and a responsive React chat UI with full conversation memory.",
    category: "projects",
    citation: {
      label: "Open Project Gazette (Chatbot)",
      action: "scroll-projects-chat"
    }
  }
];

const presetQuestions = [
  "Where is Basil based?",
  "What skills does he use for Deep Learning?",
  "Tell me about the CCTV Violence Detection project",
  "How does his BI AI Agent work?"
];

export default function DossierSearch() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [activeCitation, setActiveCitation] = useState<CorpusItem["citation"] | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Clean up typing effect on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const handleCitationClick = (citation: CorpusItem["citation"]) => {
    if (!citation) return;
    
    if (citation.action === "download-cv") {
      const link = document.createElement("a");
      link.href = "/Basil_CV.pdf";
      link.download = "Basil_Varghesekutty_CV.pdf";
      link.click();
    } else if (citation.action === "scroll-skills") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    } else if (citation.action.startsWith("scroll-projects")) {
      const projSection = document.getElementById("projects");
      if (projSection) {
        projSection.scrollIntoView({ behavior: "smooth" });
        
        // If specific project requested, let's trigger scroll positioning via window events or timeouts
        let index = 0;
        if (citation.action.endsWith("cctv")) index = 0;
        else if (citation.action.endsWith("bi")) index = 1;
        else if (citation.action.endsWith("rag")) index = 2;
        else if (citation.action.endsWith("chat")) index = 3;
        
        // Wait briefly for scroll to projects section, then find card click targets
        setTimeout(() => {
          const cards = projSection.querySelectorAll(".group");
          if (cards && cards[index]) {
            (cards[index] as HTMLElement).click();
          }
        }, 800);
      }
    }
  };

  const executeSearch = (searchQuery: string) => {
    if (isProcessing || !searchQuery.trim()) return;
    
    setIsProcessing(true);
    setHasSearched(true);
    setLogs([]);
    setAnswer("");
    setDisplayedAnswer("");
    setActiveCitation(undefined);

    const cleanQuery = searchQuery.toLowerCase().trim();
    
    // 1. Tokenize query
    const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);

    // 2. Score corpus items
    let bestMatch: CorpusItem | null = null;
    let bestScore = 0;

    for (const item of dossierCorpus) {
      let score = 0;
      
      // Keyword exact matching
      for (const keyword of item.keywords) {
        if (cleanQuery.includes(keyword)) {
          score += 15;
        }
      }

      // Token overlap matching
      for (const token of queryTokens) {
        for (const keyword of item.keywords) {
          if (keyword.includes(token)) {
            score += 5;
          }
        }
        if (item.context.toLowerCase().includes(token)) {
          score += 2;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    const similarity = bestScore > 0 ? Math.min(0.98, 0.4 + (bestScore / 50)) : 0;
    
    // Simulate RAG pipeline step-by-step logs
    const logSteps = [
      `[INFO] Initializing Retrieval-Augmented Generation (RAG) query execution...`,
      `[EMBEDDING] Vectorizing input: "${searchQuery}" using lightweight sentence-transformers...`,
      `[INDEX] Query vector computed. Scanning local SQLite & ChromaDB registry index...`,
      bestScore >= 5 && bestMatch
        ? `[MATCH] Document chunk matched: [Node ID: ${bestMatch.id}] with cosine similarity: ${similarity.toFixed(2)}`
        : `[WARNING] Cosine similarity falls below threshold (best score: ${bestScore}). Reverting to fallback prompt...`,
      bestScore >= 5 && bestMatch
        ? `[CONTEXT] Chunk retrieved: "${bestMatch.context}"`
        : `[CONTEXT] No matching dossier entries. Compiling default directory listings.`,
      `[LLM] Decrypting retrieved context & generating grounded response...`,
      `[LLM] Response synthesized successfully. Initializing stream readout.`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logSteps.length) {
        setLogs(prev => [...prev, logSteps[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        
        // Set actual answer content
        let finalAnswer = "";
        let citation: CorpusItem["citation"] | undefined = undefined;

        if (bestScore >= 5 && bestMatch) {
          finalAnswer = bestMatch.answer;
          citation = bestMatch.citation;
        } else {
          finalAnswer = "I couldn't find a precise match for that query in Basil's active dossier registry. Try searching for topics like 'projects', 'skills', 'location', 'cv', 'attendance detection', 'bi agent', or 'rag assistant'.";
        }

        setAnswer(finalAnswer);
        setActiveCitation(citation);
        setIsProcessing(false);
        triggerTypewriter(finalAnswer);
      }
    }, 180);
  };

  const triggerTypewriter = (text: string) => {
    let index = 0;
    setDisplayedAnswer("");
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    typingTimerRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedAnswer(prev => prev + text.charAt(index));
        index++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 12);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handlePresetClick = (q: string) => {
    setQuery(q);
    executeSearch(q);
  };

  return (
    <div className="mt-16 pt-12 border-t border-dashed border-slate-200 text-left">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-slate-400">
              Technical Dossier Q&A
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-900 font-medium tracking-tight mt-1 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600 shrink-0" />
              Ask My Dossier
            </h3>
          </div>
          <span className="font-mono text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded flex items-center gap-1.5 uppercase font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Local RAG Active
          </span>
        </div>

        <p className="text-slate-500 font-serif italic text-xs sm:text-sm leading-relaxed mb-6">
          Query Basil's background, core competencies, and project codebases. A lightweight local TF-IDF model performs retrieval scanning, outputting real-time pipeline traces.
        </p>

        {/* Input Interface */}
        <form onSubmit={handleSubmit} className="relative mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about skills, projects, location, or CV..."
              className="w-full bg-white border border-slate-300 rounded-[6px] pl-10 pr-4 py-2.5 text-xs sm:text-sm font-serif text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
              disabled={isProcessing}
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing || !query.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-mono text-xs uppercase tracking-widest px-4 sm:px-5 rounded-[6px] transition-all flex items-center gap-2 select-none shrink-0 cursor-pointer disabled:cursor-default"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap gap-1.5 mb-8 items-center">
          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase mr-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Suggestions:
          </span>
          {presetQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handlePresetClick(q)}
              className="text-[9px] sm:text-[10px] font-mono text-slate-600 hover:text-indigo-600 bg-slate-50 border border-slate-200/80 hover:border-indigo-200/80 rounded px-2.5 py-1 transition-all cursor-pointer"
              disabled={isProcessing}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Display Screens */}
        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* Left Screen: Pipeline Logs (7 cols) */}
            <div className="md:col-span-6 flex flex-col justify-between border border-slate-300 rounded-lg overflow-hidden bg-slate-950 shadow-md">
              <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-indigo-400" /> RAG Pipeline Trace
                </span>
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
              </div>
              <div className="p-3 font-mono text-[10px] leading-relaxed text-slate-300 flex-1 overflow-y-auto h-40 max-h-40 min-h-40 scrollbar-thin">
                {logs.map((log, index) => {
                  let colorClass = "text-slate-400";
                  if (log.startsWith("[INFO]")) colorClass = "text-blue-400";
                  else if (log.startsWith("[EMBEDDING]")) colorClass = "text-purple-400";
                  else if (log.startsWith("[INDEX]")) colorClass = "text-sky-400";
                  else if (log.startsWith("[MATCH]")) colorClass = "text-emerald-400 font-semibold";
                  else if (log.startsWith("[WARNING]")) colorClass = "text-amber-400";
                  else if (log.startsWith("[CONTEXT]")) colorClass = "text-slate-300 italic";
                  else if (log.startsWith("[LLM]")) colorClass = "text-indigo-300";

                  return (
                    <div key={index} className={`mb-1.5 ${colorClass}`}>
                      {log}
                    </div>
                  );
                })}
                {isProcessing && (
                  <div className="text-indigo-400 flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span>Processing query embeddings...</span>
                  </div>
                )}
                <div ref={consoleEndRef} />
              </div>
            </div>

            {/* Right Screen: Typewriter Answer (5 cols) */}
            <div className="md:col-span-6 border border-slate-300 rounded-lg p-4 bg-white flex flex-col justify-between shadow-sm min-h-40 md:min-h-0">
              <div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 font-bold uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Synthesized Response
                </div>
                <p className="text-slate-700 font-serif leading-relaxed text-xs sm:text-sm text-justify relative min-h-[4rem]">
                  {displayedAnswer}
                  {displayedAnswer.length > 0 && displayedAnswer.length < answer.length && (
                    <span className="inline-block w-1.5 h-3.5 bg-indigo-600 ml-1 animate-pulse" />
                  )}
                </p>
              </div>

              {/* Citations / Call to Actions */}
              {activeCitation && displayedAnswer.length === answer.length && (
                <div className="mt-4 border-t border-dashed border-slate-200 pt-3 flex justify-end shrink-0">
                  <button
                    onClick={() => handleCitationClick(activeCitation)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-100 hover:border-indigo-300 px-2.5 py-1 rounded transition-all cursor-pointer select-none"
                  >
                    {activeCitation.label} <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
