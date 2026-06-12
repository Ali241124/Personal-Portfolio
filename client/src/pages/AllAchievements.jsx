import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

export default function AllAchievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

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
          All Achievements
        </span>
      </nav>

      {/* ── Main content ── */}
      <section
        ref={ref}
        style={{ position: "relative", overflow: "hidden", padding: "80px 24px" }}
      >
        <div className="grid-bg" />
        <div className="section-wrapper" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <span className="section-tag">🏆 Portfolio</span>
            <h1 className="section-title">
              All <span className="gradient-text">Achievements</span>
            </h1>
            <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
              A complete list of my certifications and milestones.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            <AnimatePresence mode="popLayout">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
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
                    boxShadow: `0 20px 40px ${achievement.color}25, 0 0 0 1px ${achievement.color}40`,
                  }}
                  className="glass"
                  style={{
                    padding: "0",
                    position: "relative",
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                  }}
                >
                  {/* Featured badge */}
                  {achievement.featured && (
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
                      zIndex: 10
                    }}>
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image Section */}
                  <div style={{
                    height: "200px",
                    width: "100%",
                    position: "relative",
                    background: `${achievement.color}15`,
                    borderBottom: `1px solid ${achievement.color}20`
                  }}>
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.8
                      }}
                    />
                    {/* Color accent top bar overlay */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${achievement.color}, ${achievement.color}44)`
                    }} />
                  </div>

                  <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Header */}
                    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                        {achievement.title}
                      </h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", color: achievement.color, fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                          {achievement.issuer}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          {achievement.date}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px", flex: 1 }}>
                      {achievement.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {achievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏅</div>
              <p style={{ fontFamily: "var(--font-mono)" }}>No achievements added yet.</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
