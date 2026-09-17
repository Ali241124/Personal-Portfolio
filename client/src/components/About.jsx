import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  { degree: "MS Artificial Intelligence", school: "UET Lahore", period: "2026 – Present", status: "current" },
  { degree: "BS Software Engineering",    school: "University of Central Punjab", period: "2022 – 2026", status: "completed" },
];

const interests = ["Machine Learning", "NLP & LLMs", "Computer Vision", "Full-Stack Dev", "Data Science", "MLOps"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--surface-raised)", position: "relative" }}>
      <div className="section-wrapper">

        <motion.div {...fadeUp()} style={{ marginBottom: 56 }}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">A little about me</h2>
          <p className="section-sub">
            Engineer and developer with a focus on AI/ML and full-stack applications.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }} className="about-grid">

          {/* Left — photo + interests */}
          <motion.div {...fadeUp(0.15)}>
            <div style={{
              width: "100%", aspectRatio: "3 / 4", borderRadius: 16,
              overflow: "hidden", border: "1px solid var(--border)",
              background: "var(--surface-card)", marginBottom: 20,
            }}>
              <img
                src="/profile.jpeg"
                alt="Syed Ali Hassan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interests.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div {...fadeUp(0.25)}>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
              I'm <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Syed Ali Hassan</strong>, 
              a software engineering graduate from the University of Central Punjab and currently 
              pursuing an MS in Artificial Intelligence at UET Lahore.
            </p>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
              My background is in building full-stack web and mobile applications, 
              and over the past two years I've shifted more of my focus toward machine learning — 
              particularly NLP, computer vision, and deploying models as accessible tools.
            </p>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 40 }}>
              I like projects where I can work across the full stack: from data preprocessing 
              and model training to building the interface that actually lets people use it. 
              I use Python, React, and Node.js most often.
            </p>

            {/* Education cards */}
            <div style={{ marginBottom: 36 }}>
              <p className="skill-group-title" style={{ marginBottom: 14 }}>Education</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {education.map(({ degree, school, period, status }) => (
                  <div key={degree} style={{
                    padding: "14px 16px",
                    background: "var(--surface-card)",
                    border: `1px solid ${status === "current" ? "var(--accent-ring)" : "var(--border)"}`,
                    borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap",
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{degree}</p>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{school}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {status === "current" && (
                        <span style={{
                          fontSize: 10, padding: "2px 8px", borderRadius: 100,
                          background: "var(--accent-glow)", color: "var(--accent)",
                          fontFamily: "var(--font-mono)", border: "1px solid var(--accent-ring)",
                        }}>Active</span>
                      )}
                      <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/SyedAliHassan-Resume(AI).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ display: "inline-flex" }}
            >
              Download CV ↗
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
