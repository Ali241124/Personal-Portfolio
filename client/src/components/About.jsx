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
        <motion.div {...fadeUp()} style={{ marginBottom: 56 }}>
          <span className="section-label">Background</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Engineering with <span>Purpose</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 12 }}>
            Passionate about transforming machine learning research into reliable, production-grade tools.
          </p>
        </motion.div>

        <div className="about-grid">

          {/* Left — Photo + Interest Tags */}
          <motion.div {...fadeUp(0.1)}>
            {/* Profile photo */}
            <div style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 20,
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
              position: "relative",
            }}>
              <img
                src="/profile.jpeg"
                alt="Syed Ali Hassan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Subtle gradient frame */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "inherit",
                boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.15)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Interest tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interests.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + Education */}
          <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Bio card */}
            <div className="card" style={{ padding: "clamp(24px, 4vw, 36px)" }}>
              <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.85, marginBottom: 18 }}>
                I am <strong style={{ color: "var(--text-1)", fontWeight: 700 }}>Syed Ali Hassan</strong>, a Software Engineer currently pursuing an MS in Artificial Intelligence at UET Lahore.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.85, marginBottom: 18 }}>
                My engineering focus is centered on <strong style={{ color: "var(--cyan)" }}>Agentic AI architectures</strong>, <strong style={{ color: "var(--cyan)" }}>RAG pipelines</strong>, and full-stack software development. I build self-healing agents, multi-agent research tools, and fast inferencing backends integrated with modern React frontends.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.85 }}>
                Whether deploying fine-tuned LLMs, optimizing vector databases (pgvector/ChromaDB), or constructing intuitive web applications — I bring an end-to-end mindset from data pipeline to live production deployment.
              </p>
            </div>

            {/* Education */}
            <div>
              <p className="skill-group-title" style={{ marginBottom: 14 }}>Education & Academics</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {education.map(({ degree, school, period, status, detail }) => (
                  <div
                    key={degree}
                    style={{
                      padding: "20px 22px",
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
                      marginBottom: 8,
                    }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>{degree}</h3>
                        <p style={{ fontSize: 13, color: "var(--cyan)", fontFamily: "var(--mono)", marginTop: 3 }}>{school}</p>
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
