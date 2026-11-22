import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  {
    degree: "MS Artificial Intelligence",
    school: "University of Engineering and Technology (UET), Lahore",
    period: "2026 – Present",
    status: "current",
    detail: "Focus on Deep Learning, Large Language Model architectures, and Agentic AI Systems.",
  },
  {
    degree: "BS Software Engineering",
    school: "University of Central Punjab (UCP), Lahore",
    period: "2022 – 2026",
    status: "completed",
    detail: "Core algorithms, distributed systems, full-stack development, and software design.",
  },
];

const interests = [
  "Agentic Workflows",
  "Vector Search & RAG",
  "Large Language Models",
  "Computer Vision",
  "FastAPI & Microservices",
  "React & Full-Stack",
];

const highlights = [
  { metric: "12+", label: "Completed Projects", desc: "Agentic AI systems, RAG workflows & web platforms" },
  { metric: "5", label: "Professional Certifications", desc: "AWS Solutions Architect & DeepLearning.AI" },
  { metric: "7+", label: "Autonomous AI Pipelines", desc: "Built with LangGraph, CrewAI, Ollama & YOLO" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative" }}>
      <div className="bg-grid" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div {...fadeUp()} style={{ marginBottom: 40 }}>
          <span className="section-label">Background</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Engineering with <span>Purpose</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 12 }}>
            Passionate about transforming machine learning research into reliable, production-grade tools.
          </p>
        </motion.div>

        {/* Clean Responsive 2-Column Layout (No duplicate profile image) */}
        <div className="about-grid">

          {/* Left Column — Philosophy, Core Focus & Tags */}
          <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card" style={{ padding: "clamp(20px, 4vw, 32px)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 14 }}>
                Software & AI Engineering
              </h3>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
                I am <strong style={{ color: "var(--text-1)", fontWeight: 700 }}>Syed Ali Hassan</strong>, a Software Engineer pursuing an MS in Artificial Intelligence at UET Lahore.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 16 }}>
                My engineering focus is centered on <strong style={{ color: "var(--cyan)" }}>Agentic AI architectures</strong>, <strong style={{ color: "var(--cyan)" }}>RAG pipelines</strong>, and modern full-stack development. I build self-healing agent loops, multi-agent synthesis teams, and fast inferencing backends integrated with modern React frontends.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8 }}>
                Whether optimizing vector embeddings with pgvector & ChromaDB, fine-tuning LLMs, or designing clean user interfaces — I bring an end-to-end mindset from data pipeline to live production deployment.
              </p>
            </div>

            {/* Core Competency Tags */}
            <div className="card" style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                Areas of Expertise
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {interests.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column — Education & Metrics */}
          <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Highlights row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
              {highlights.map((h) => (
                <div key={h.label} className="card" style={{ padding: "16px 18px", textAlign: "left" }}>
                  <div style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 800, background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em" }}>
                    {h.metric}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-1)", marginTop: 4 }}>
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Cards */}
            <div>
              <p className="skill-group-title" style={{ marginBottom: 12 }}>Education & Academics</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {education.map(({ degree, school, period, status, detail }) => (
                  <div
                    key={degree}
                    style={{
                      padding: "18px 20px",
                      background: "var(--surface)",
                      border: `1px solid ${status === "current" ? "var(--border-accent)" : "var(--border)"}`,
                      borderRadius: "var(--r-md)",
                      boxShadow: status === "current" ? "0 0 20px rgba(139,92,246,0.1)" : "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {status === "current" && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 2, background: "var(--grad-primary)",
                      }} />
                    )}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 6,
                    }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>{degree}</h3>
                        <p style={{ fontSize: 12.5, color: "var(--cyan)", fontFamily: "var(--mono)", marginTop: 2 }}>{school}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {status === "current" && (
                          <span style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 100,
                            background: "var(--violet-glow)",
                            color: "var(--violet)",
                            fontFamily: "var(--mono)",
                            border: "1px solid var(--violet-ring)",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}>
                            In Progress
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>
                          {period}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, marginTop: 4 }}>
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
