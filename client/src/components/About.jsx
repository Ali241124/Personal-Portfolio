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
    detail: "Core algorithms, distributed systems, full-stack application development, and software design.",
  },
];

const interests = [
  "Agentic Workflows",
  "Vector Search & RAG",
  "Large Language Models",
  "Computer Vision (YOLOv8)",
  "FastAPI & Microservices",
  "Full-Stack Web (React & Node)",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function About() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--surface-raised)", position: "relative" }}>
      <div className="section-wrapper">
        <motion.div {...fadeUp()} style={{ marginBottom: 48 }}>
          <span className="section-label">Background</span>
          <h2 className="section-title">Engineering with Purpose</h2>
          <p className="section-sub">
            Passionate about transforming machine learning models into reliable, high-speed production tools.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Left Column: Photo card + Tags */}
          <motion.div {...fadeUp(0.1)}>
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--surface-card)",
                marginBottom: 20,
                boxShadow: "0 16px 36px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src="/profile.jpeg"
                alt="Syed Ali Hassan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interests.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio & Credentials */}
          <motion.div {...fadeUp(0.2)}>
            <div
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "clamp(24px, 4vw, 36px)",
                marginBottom: 28,
              }}
            >
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 18 }}>
                I am <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>Syed Ali Hassan</strong>, a Software Engineer currently pursuing an MS in Artificial Intelligence at UET Lahore.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 18 }}>
                My engineering focus is centered on <strong style={{ color: "var(--accent-secondary)" }}>Agentic AI architectures</strong>, <strong style={{ color: "var(--accent-secondary)" }}>RAG pipelines</strong>, and full-stack software development. I engineer self-healing agents, multi-agent research tools, and fast inferencing backends integrated with modern React frontends.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Whether it's deploying fine-tuned LLMs, optimizing vector databases (pgvector/ChromaDB), or constructing intuitive web applications, I bring an end-to-end mindset from data pipeline to live production deployment.
              </p>
            </div>

            {/* Education Cards */}
            <div>
              <p className="skill-group-title" style={{ marginBottom: 14 }}>Education & Academics</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {education.map(({ degree, school, period, status, detail }) => (
                  <div
                    key={degree}
                    style={{
                      padding: "18px 20px",
                      background: "var(--surface-card)",
                      border: `1px solid ${status === "current" ? "var(--accent-ring)" : "var(--border)"}`,
                      borderRadius: "var(--radius)",
                      boxShadow: status === "current" ? "0 0 16px rgba(99, 102, 241, 0.12)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{degree}</h3>
                        <p style={{ fontSize: 13, color: "var(--accent-secondary)", fontFamily: "var(--font-mono)", marginTop: 2 }}>{school}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {status === "current" && (
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 100,
                              background: "var(--accent-glow)",
                              color: "var(--accent-secondary)",
                              fontFamily: "var(--font-mono)",
                              border: "1px solid var(--accent-ring)",
                              fontWeight: 600,
                            }}
                          >
                            In Progress
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          {period}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 6 }}>
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
