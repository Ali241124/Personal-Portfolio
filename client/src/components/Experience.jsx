import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TYPE_COLORS = {
  work:      { bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)", text: "#a78bfa", label: "Work" },
  education: { bg: "rgba(34,211,238,0.10)", border: "rgba(34,211,238,0.28)", text: "#67e8f9", label: "Edu" },
  cert:      { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)", text: "#6ee7b7", label: "Cert" },
};

const timeline = [
  {
    period: "2026 – Present",
    title: "MS in Artificial Intelligence",
    place: "University of Engineering & Technology (UET), Lahore",
    type: "education",
    description: "Master's research focusing on multi-agent collaboration frameworks, stateful graph reasoning with LangGraph, and optimized transformer inference pipelines.",
    tags: ["Agentic AI", "Deep Learning", "LangGraph", "PyTorch"],
  },
  {
    period: "2024 – Present",
    title: "AI Systems & Full-Stack Developer",
    place: "Independent Projects & Open Source",
    type: "work",
    description: "Architected end-to-end applications spanning agentic code repair pipelines, self-healing workflow executors, computer vision systems (YOLOv8), and enterprise RAG bots.",
    tags: ["FastAPI", "PostgreSQL", "Docker", "React", "ChromaDB"],
  },
  {
    period: "2024",
    title: "Deep Learning Specialization",
    place: "DeepLearning.AI · Coursera",
    type: "cert",
    description: "Comprehensive mastery of deep neural networks, hyperparameter optimization, convolutional architectures, and attention-based sequence modeling under Andrew Ng.",
    tags: ["CNN", "RNN", "Attention Mechanisms", "Optimization"],
  },
  {
    period: "2024",
    title: "AWS Certified Solutions Architect",
    place: "Amazon Web Services",
    type: "cert",
    description: "Demonstrated technical skills in architecting secure, reliable, and cost-effective distributed systems and cloud workloads on AWS infrastructure.",
    tags: ["Cloud Architecture", "VPC", "Security", "High Availability"],
  },
  {
    period: "2022 – 2026",
    title: "BS in Software Engineering",
    place: "University of Central Punjab, Lahore",
    type: "education",
    description: "Graduated with strong foundations in data structures, algorithms, object-oriented software engineering, database design, and machine learning fundamentals.",
    tags: ["Software Engineering", "Algorithms", "Databases", "Distributed Systems"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative" }}>
      <div className="bg-grid" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-label">Timeline</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Experience & <span>Journey</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 12 }}>
            The path of academic excellence, industry credentials, and engineering projects shaping my career.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>

          {/* Vertical track */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 20,
              top: 8,
              bottom: 8,
              width: 2,
              background: "linear-gradient(180deg, var(--violet) 0%, rgba(34,211,238,0.4) 60%, transparent 100%)",
              borderRadius: 2,
              transformOrigin: "top",
            }}
          />

          <div style={{ paddingLeft: "clamp(52px, 8vw, 68px)" }}>
            {timeline.map((item, i) => {
              const tc = TYPE_COLORS[item.type] || TYPE_COLORS.work;
              return (
                <motion.div
                  key={item.title + item.period}
                  {...fadeUp(i * 0.09)}
                  style={{ marginBottom: i === timeline.length - 1 ? 0 : 32, position: "relative" }}
                >
                  {/* Dot */}
                  <div style={{
                    position: "absolute",
                    left: `calc(-1 * clamp(52px, 8vw, 68px))`,
                    top: 16,
                    width: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: 14, height: 14,
                      borderRadius: "50%",
                      background: "var(--bg)",
                      border: `2px solid ${tc.text}`,
                      boxShadow: `0 0 10px ${tc.border}`,
                      flexShrink: 0,
                    }} />
                  </div>

                  {/* Card */}
                  <div className="card" style={{ padding: "22px 24px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 10,
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.3 }}>{item.title}</h3>
                        <p style={{ fontSize: 13, color: "var(--cyan)", fontFamily: "var(--mono)", marginTop: 3 }}>{item.place}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          background: tc.bg,
                          border: `1px solid ${tc.border}`,
                          borderRadius: 4,
                          color: tc.text,
                          fontFamily: "var(--mono)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}>
                          {tc.label}
                        </span>
                        <span style={{
                          fontSize: 11,
                          padding: "3px 9px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          color: "var(--text-3)",
                          fontFamily: "var(--mono)",
                          whiteSpace: "nowrap",
                        }}>
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 16 }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          background: "rgba(139,92,246,0.07)",
                          border: "1px solid rgba(139,92,246,0.18)",
                          borderRadius: 4,
                          color: "var(--text-2)",
                          fontFamily: "var(--mono)",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
