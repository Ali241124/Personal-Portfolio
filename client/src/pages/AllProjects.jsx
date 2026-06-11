import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "web", label: "Web" },
];

export default function AllProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [filter, setFilter] = useState("all");

  const filtered = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── Top nav bar ── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "18px 40px",
        background: "rgba(2,4,16,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-color)",
      }}>
        <Link to="/" id="back-to-home-link">
          <motion.button
            id="back-to-home-btn"
            whileHover={{ x: -4, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "100px",
              color: "var(--accent-blue)",
              fontFamily: "var(--font-primary)",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </motion.button>
        </Link>

        <span style={{
          fontFamily: "var(--font-heading)",
          fontSize: "17px",
          fontWeight: 700,
          background: "var(--gradient-text)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          All Projects
        </span>
      </nav>

      {/* ── Main content ── */}
      <section
        ref={ref}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="grid-bg" />
        <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <span className="section-tag">📂 Portfolio</span>
            <h1 className="section-title">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
              Every project I've built — from AI/ML experiments to full-stack web apps.
            </p>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {FILTERS.map(({ key, label }) => (
                <motion.button
                  key={key}
                  id={`filter-${key}`}
                  onClick={() => setFilter(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "9px 22px",
                    borderRadius: "100px",
                    border: "1px solid",
                    borderColor: filter === key ? "var(--accent-blue)" : "rgba(255,255,255,0.1)",
                    background: filter === key ? "rgba(0,212,255,0.12)" : "transparent",
                    color: filter === key ? "var(--accent-blue)" : "var(--text-secondary)",
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {label}
                  <span style={{
                    marginLeft: "8px",
                    padding: "1px 8px",
                    borderRadius: "100px",
                    background: filter === key ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.06)",
                    fontSize: "12px",
                  }}>
                    {key === "all" ? projects.length : projects.filter(p => p.category === key).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{
                    y: -10,
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.02,
                    boxShadow: `0 20px 40px ${project.color}25, 0 0 0 1px ${project.color}40`,
                  }}
                  className="glass"
                  style={{
                    padding: "28px",
                    position: "relative",
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      padding: "3px 10px",
                      background: "rgba(0,212,255,0.12)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: "100px",
                      fontSize: "10px",
                      color: "var(--accent-blue)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.5px",
                    }}>
                      ⭐ Featured
                    </div>
                  )}

                  {/* Color accent top bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
                    borderRadius: "16px 16px 0 0",
                  }} />

                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "12px",
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "24px",
                    }}>
                      {project.emoji}
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: project.featured ? "28px" : "0" }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        title="View on GitHub / Live"
                        style={{
                          width: 34, height: 34, borderRadius: "8px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "var(--text-secondary)", fontSize: "15px", transition: "all 0.2s",
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
                        fontFamily: "var(--font-mono)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <p style={{ fontFamily: "var(--font-mono)" }}>No projects in this category yet.</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
