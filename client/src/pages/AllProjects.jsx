import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "agentic-ai", label: "Agentic AI" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "web", label: "Web Platform" },
];

export default function AllProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      style={{
        background: "var(--surface-base)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,11,16,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              background: "var(--surface-raised)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text-primary)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            className="back-btn-hover"
          >
            ← Back to Home
          </Link>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text-secondary)",
            }}
          >
            Syed Ali Hassan · Project Archive
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <main ref={ref} style={{ flexGrow: 1, padding: "clamp(32px, 5vw, 64px) 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 40 }}
          >
            <span className="section-label">Engineering Index</span>
            <h1 className="section-title">All Built Projects</h1>
            <p className="section-sub">
              Full archive of autonomous agent architectures, fine-tuned transformer experiments, and software systems.
            </p>
          </motion.div>

          {/* Filters & Search Control Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 36,
            }}
          >
            {/* Filter Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FILTERS.map(({ key, label }) => {
                const count = key === "all" ? projects.length : projects.filter((p) => p.category === key).length;
                const isActive = filter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 8,
                      border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                      background: isActive ? "var(--accent-glow)" : "var(--surface-card)",
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{label}</span>
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: 10,
                        background: isActive ? "rgba(45,212,191,0.2)" : "var(--surface-raised)",
                        fontSize: 10,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: 260, flexGrow: 1, maxWidth: 360 }}>
              <input
                type="text"
                placeholder="Search by tech, keyword or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text-primary)",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: 24,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="project-card-item"
                >
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
                            Live ↗
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          style={{
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                          }}
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
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "64px 20px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              No matching projects found for "{searchQuery}".
            </div>
          )}
        </div>
      </main>

      <style>{`
        .back-btn-hover:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .project-card-item:hover {
          border-color: var(--border-strong) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}
