import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

// Only show featured projects on the homepage
const featuredProjects = projects.filter((p) => p.featured);

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            A selection of real-world AI/ML and web projects I've built.
          </p>
        </motion.div>

        {/* Cards grid — only featured */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px"
        }}>
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project, i) => (
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

        {/* View All Projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          {/* Subtle count label */}
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px", fontFamily: "var(--font-mono)" }}>
            Showing {featuredProjects.length} of {projects.length} projects
          </p>

          <Link to="/projects" id="view-all-projects-link">
            <motion.button
              id="view-all-projects-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,212,255,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 42px",
                background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))",
                border: "1px solid rgba(0,212,255,0.35)",
                borderRadius: "100px",
                color: "var(--accent-blue)",
                fontFamily: "var(--font-primary)",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.3s",
                letterSpacing: "0.3px",
              }}
            >
              View All Projects
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(0,212,255,0.15)",
                fontSize: "16px",
              }}>→</span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}