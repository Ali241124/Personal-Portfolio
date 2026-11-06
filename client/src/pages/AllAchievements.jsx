import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

export default function AllAchievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = achievements.filter((a) => {
    return (
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.badge && a.badge.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
            Syed Ali Hassan · Certifications & Credentials
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
            <span className="section-label">Verified Record</span>
            <h1 className="section-title">All Certifications & Credentials</h1>
            <p className="section-sub">
              Complete index of formal industry certifications, academic specializations, and professional qualifications.
            </p>
          </motion.div>

          {/* Search bar */}
          <div style={{ maxWidth: 440, marginBottom: 36 }}>
            <input
              type="text"
              placeholder="Search credentials by title, issuer or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
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

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: 24,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
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
                  className="achievement-card-item"
                >
                  <div
                    style={{
                      height: 3,
                      width: "100%",
                      background: item.color || "var(--accent)",
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
                          color: item.color || "var(--accent)",
                          background: "rgba(255,255,255,0.03)",
                          padding: "3px 8px",
                          borderRadius: 4,
                          border: "1px solid var(--border)",
                        }}
                      >
                        {item.badge || "Verified"}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "var(--font-mono)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.35,
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </h3>

                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        marginBottom: 14,
                      }}
                    >
                      {item.issuer}
                    </div>

                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                        flexGrow: 1,
                      }}
                    >
                      {item.desc}
                    </p>
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
              No matching credentials found for "{searchQuery}".
            </div>
          )}
        </div>
      </main>

      <style>{`
        .back-btn-hover:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .achievement-card-item:hover {
          border-color: var(--border-strong) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}
