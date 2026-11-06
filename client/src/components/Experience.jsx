import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    period: "2026 – Present",
    title: "MS in Artificial Intelligence",
    place: "University of Engineering and Technology (UET), Lahore",
    type: "education",
    description: "Master's research focusing on multi-agent collaboration frameworks, stateful graph reasoning with LangGraph, and optimized transformer inference.",
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
    description: "Completed comprehensive mastery of deep neural networks, hyperparameter optimization, convolutional architectures, and attention-based sequence modeling under Andrew Ng.",
    tags: ["CNN", "RNN", "Attention Mechanisms", "Optimization"],
  },
  {
    period: "2024",
    title: "AWS Certified Solutions Architect",
    place: "Amazon Web Services",
    type: "cert",
    description: "Demonstrated technical skills in architecting secure, reliable, and cost-effective distributed systems and cloud workloads.",
    tags: ["Cloud Architecture", "VPC", "Security", "High Availability"],
  },
  {
    period: "2022 – 2026",
    title: "BS in Software Engineering",
    place: "University of Central Punjab, Lahore",
    type: "education",
    description: "Graduated with strong foundations in data structures, algorithms, object-oriented software engineering, database design, and machine learning.",
    tags: ["Software Engineering", "Algorithms", "Databases", "Distributed Systems"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--surface-base)", position: "relative" }}>
      <div className="bg-grid" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 48 }}
        >
          <span className="section-label">Timeline</span>
          <h2 className="section-title">Experience & Journey</h2>
          <p className="section-sub">
            The path of academic excellence, industry credentials, and engineering projects shaping my career.
          </p>
        </motion.div>

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="timeline-line"
          />

          <div style={{ paddingLeft: "clamp(44px, 8vw, 60px)" }}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.title + item.period}
                {...fadeUp(i * 0.08)}
                style={{
                  marginBottom: i === timeline.length - 1 ? 0 : 36,
                  position: "relative",
                }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: "calc(-1 * clamp(44px, 8vw, 60px))",
                    top: 4,
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--accent-secondary)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    {item.type === "work" ? "W" : item.type === "education" ? "E" : "C"}
                  </span>
                </div>

                {/* Card Container */}
                <div
                  className="card"
                  style={{
                    padding: "22px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: "var(--accent-secondary)", fontFamily: "var(--font-mono)", marginTop: 2 }}>
                        {item.place}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 9px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: "12px 0 16px" }}>
                    {item.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          background: "rgba(99, 102, 241, 0.08)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                          borderRadius: 4,
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
