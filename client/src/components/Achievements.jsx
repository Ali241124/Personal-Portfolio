import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

// Only show featured achievements on the homepage
const featuredAchievements = achievements.filter((a) => a.featured);

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={ref} style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span className="section-tag">🏆 Certifications</span>
          <h2 className="section-title">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            A selection of professional certifications and milestones I've earned.
          </p>
        </motion.div>

        {/* Cards grid — only featured */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <AnimatePresence mode="popLayout">
            {featuredAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.02,
                  boxShadow: `0 20px 40px ${achievement.color}25, 0 0 0 1px ${achievement.color}40`
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

        {/* View All Achievements button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          {/* Subtle count label */}
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px", fontFamily: "var(--font-mono)" }}>
            Showing {featuredAchievements.length} of {achievements.length} achievements
          </p>

          <Link to="/achievements" id="view-all-achievements-link">
            <motion.button
              id="view-all-achievements-btn"
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
              View All Achievements
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
