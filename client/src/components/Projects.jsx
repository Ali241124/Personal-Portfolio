import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const featuredProjects = projects.filter((p) => p.featured);

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        background: "var(--surface-base)",
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 48 }}
        >
          <span className="section-label">Selected Works</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">
            A curated showcase of agentic workflows, deep learning applications, and full-stack software systems.
          </p>
        </motion.div>

        {/* Responsive grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 24,
          }}
        >
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.25s ease",
              }}
              className="project-card-item"
            >
              {/* Card top banner with accent line & category indicator */}
              <div
                style={{
                  height: 3,
                  width: "100%",
                  background: project.color || "var(--accent)",
                }}
              />

              <div
                style={{
                  padding: "24px 22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/* Meta header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: project.color || "var(--accent)",
                      background: "rgba(255,255,255,0.03)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {project.badge || project.category}
                  </span>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 12,
                          color: "var(--accent)",
                          textDecoration: "none",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View source code on GitHub"
                      style={{
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s",
                      }}
                      className="github-link-hover"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.35,
                    marginBottom: 10,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    marginBottom: 20,
                    flexGrow: 1,
                  }}
                >
                  {project.desc}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        background: "var(--surface-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: 5,
                        color: "var(--text-muted)",
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

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            Showing {featuredProjects.length} of {projects.length} curated systems
          </span>
          <Link to="/projects" className="btn-secondary" style={{ padding: "10px 24px" }}>
            View Full Project Archive →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .project-card-item:hover {
          border-color: var(--border-strong) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .github-link-hover:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
}
