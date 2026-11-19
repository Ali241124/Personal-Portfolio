import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    badge: "Core",
    color: "#8b5cf6",
    items: ["Deep Learning", "Transformers & LLMs", "Agentic AI", "LangGraph", "CrewAI", "PyTorch", "TensorFlow", "YOLOv8", "HuggingFace"],
  },
  {
    title: "Vector Search & Retrieval",
    badge: "Data",
    color: "#22d3ee",
    items: ["ChromaDB", "pgvector", "RAG Pipelines", "Embeddings", "Hybrid Search", "Semantic Caching"],
  },
  {
    title: "Backend & Systems",
    badge: "API",
    color: "#10b981",
    items: ["Python", "FastAPI", "Node.js", "Express", "RESTful APIs", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    title: "Frontend Engineering",
    badge: "Client",
    color: "#f59e0b",
    items: ["React 19", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Vite", "HTML5/CSS3"],
  },
  {
    title: "DevOps & Infrastructure",
    badge: "Cloud",
    color: "#ef4444",
    items: ["Docker", "Docker Compose", "Git / GitHub", "Linux", "Ollama", "Postman", "CI/CD Actions"],
  },
  {
    title: "Data Science & Analysis",
    badge: "Metrics",
    color: "#06b6d4",
    items: ["Pandas", "NumPy", "Scikit-Learn", "OpenCV", "Jupyter", "Exploratory Data Analysis"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} style={{ background: "var(--bg)", position: "relative" }}>
      <div className="bg-grid" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-label">Technical Stack</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Tools & <span>Competencies</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 12 }}>
            The programming languages, frameworks, and tools I leverage daily to engineer modern software systems.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: 20,
        }}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp(i * 0.07)}
              className="card card-accent-line"
              style={{ padding: "24px 22px", display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {/* Colored top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cat.color, opacity: 0.7 }} />

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, marginTop: 4 }}>
                <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text-1)" }}>{cat.title}</h3>
                <span style={{
                  fontSize: 10,
                  fontFamily: "var(--mono)",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: `${cat.color}18`,
                  color: cat.color,
                  border: `1px solid ${cat.color}30`,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}>
                  {cat.badge}
                </span>
              </div>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="skill-pill"
                    style={{
                      fontSize: 12,
                      fontFamily: "var(--mono)",
                      padding: "4px 10px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      color: "var(--text-2)",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-pill:hover {
          border-color: var(--violet-ring) !important;
          color: var(--violet) !important;
          background: var(--violet-glow) !important;
        }
      `}</style>
    </section>
  );
}
