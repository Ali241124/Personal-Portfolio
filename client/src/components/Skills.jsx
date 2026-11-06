import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    badge: "Core",
    items: ["Deep Learning", "Transformers & LLMs", "Agentic AI", "LangGraph", "CrewAI", "PyTorch", "TensorFlow", "YOLOv8", "HuggingFace"],
  },
  {
    title: "Vector Search & Retrieval",
    badge: "Data",
    items: ["ChromaDB", "pgvector", "RAG Pipelines", "Embeddings", "Hybrid Search", "Semantic Caching"],
  },
  {
    title: "Backend & Systems",
    badge: "API",
    items: ["Python", "FastAPI", "Node.js", "Express", "RESTful APIs", "PostgreSQL", "MongoDB", "SQLite"],
  },
  {
    title: "Frontend Engineering",
    badge: "Client",
    items: ["React 19", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Vite", "HTML5/CSS3"],
  },
  {
    title: "DevOps & Infrastructure",
    badge: "Cloud",
    items: ["Docker", "Docker Compose", "Git / GitHub", "Linux", "Ollama", "Postman", "CI/CD Actions"],
  },
  {
    title: "Data Science & Analysis",
    badge: "Metrics",
    items: ["Pandas", "NumPy", "Scikit-Learn", "OpenCV", "Jupyter", "Exploratory Data Analysis"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Skills() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} style={{ background: "var(--surface-base)", position: "relative" }}>
      <div className="bg-grid" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp()} style={{ marginBottom: 48 }}>
          <span className="section-label">Technical Stack</span>
          <h2 className="section-title">Tools & Competencies</h2>
          <p className="section-sub">
            The programming languages, frameworks, and tools I leverage daily to engineer modern software systems.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 20,
          }}
        >
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp(i * 0.06)}
              className="card"
              style={{
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{cat.title}</h3>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: "rgba(99, 102, 241, 0.12)",
                    color: "var(--accent-secondary)",
                    border: "1px solid var(--accent-ring)",
                    fontWeight: 600,
                  }}
                >
                  {cat.badge}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      padding: "4px 10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      color: "var(--text-secondary)",
                      transition: "all 0.2s ease",
                    }}
                    className="skill-pill-hover"
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
        .skill-pill-hover:hover {
          border-color: var(--accent) !important;
          color: #FFFFFF !important;
          background: rgba(99, 102, 241, 0.1) !important;
        }
      `}</style>
    </section>
  );
}
