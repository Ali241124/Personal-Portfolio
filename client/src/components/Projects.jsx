import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "MNIST Digit Classifier",
    desc: "A high-accuracy CNN model built with TensorFlow/Keras to classify handwritten digits from the MNIST dataset. Achieved 98.8% test accuracy with data augmentation and dropout regularization.",
    tags: ["Python", "TensorFlow", "CNN", "Keras"],
    category: "ai-ml",
    emoji: "🧠",
    color: "#00d4ff",
    github: "https://mnist-digit-classifier-two.vercel.app/",
    demo: null,
  },
  {
    title: "Sentiment Analyzer",
    desc: "Fine-tuned a BERT-based NLP model for multi-class sentiment analysis on product reviews. Built a REST API with FastAPI and a React frontend for real-time predictions.",
    tags: ["Python", "BERT", "HuggingFace", "FastAPI", "React"],
    category: "ai-ml",
    emoji: "💬",
    color: "#7c3aed",
    github: "https://github.com/",
    demo: null,
  },
  {
    title: "Real-Time Object Detection",
    desc: "YOLOv8-powered object detection web app using OpenCV and Flask. Supports live webcam feed and image upload with bounding box visualization and confidence scores.",
    tags: ["Python", "YOLOv8", "OpenCV", "Flask"],
    category: "ai-ml",
    emoji: "👁️",
    color: "#10b981",
    github: "https://github.com/",
    demo: null,
  },
  {
    title: "AI Chatbot with LLM",
    desc: "Conversational chatbot powered by LangChain and the OpenAI API with memory, context-aware replies, and a sleek React chat interface with streaming responses.",
    tags: ["Python", "LangChain", "OpenAI API", "React"],
    category: "ai-ml",
    emoji: "🤖",
    color: "#f59e0b",
    github: "https://github.com/",
    demo: null,
  },
  {
    title: "Auto Avenue",
    desc: "Full-featured React Native car marketplace app with real-time listings, photo gallery, filter search, and a Node.js backend with MongoDB for managing inventory.",
    tags: ["React Native", "Node.js", "MongoDB", "Express"],
    category: "web",
    emoji: "🚗",
    color: "#ec4899",
    github: "https://github.com/",
    demo: null,
  },
  {
    title: "AI Portfolio Website",
    desc: "This professional portfolio — built with React, Framer Motion, and a Node.js + MongoDB backend. Features particle animations, AI/ML theme, and a working contact form.",
    tags: ["React", "Framer Motion", "Node.js", "MongoDB"],
    category: "web",
    emoji: "✨",
    color: "#06b6d4",
    github: "https://github.com/",
    demo: null,
  },
];

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "web", label: "Web" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("all");

  const filtered = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span className="section-tag">🚀 Projects</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
            A selection of real-world AI/ML and web projects I've built.
          </p>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {FILTERS.map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() => setFilter(key)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "9px 22px",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: filter === key ? "var(--accent-blue)" : "rgba(255,255,255,0.1)",
                  background: filter === key ? "rgba(0,212,255,0.12)" : "transparent",
                  color: filter === key ? "var(--accent-blue)" : "var(--text-secondary)",
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px"
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.02,
                  boxShadow: `0 20px 40px ${project.color}25, 0 0 0 1px ${project.color}40`
                }}
                className="glass"
                style={{
                  padding: "28px",
                  position: "relative",
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Color accent top bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`
                }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "24px"
                  }}>
                    {project.emoji}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href={project.github} target="_blank" rel="noreferrer"
                      style={{
                        width: 34, height: 34, borderRadius: "8px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--text-secondary)", fontSize: "15px", transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = project.color; e.currentTarget.style.borderColor = project.color; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >↗</a>
                  </div>
                </div>

                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px", color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
                  {project.desc}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 10px",
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}25`,
                      borderRadius: "6px",
                      fontSize: "11px",
                      color: project.color,
                      fontFamily: "var(--font-mono)"
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}