import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

const featuredAchievements = achievements.filter((a) => a.featured);

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={ref}
      style={{
        background: "var(--surface-raised)",
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
          <span className="section-label">Certifications & Accreditations</span>
          <h2 className="section-title">Verified Credentials</h2>
          <p className="section-sub">
            Formal specializations validating competencies across cloud architecture, neural networks, and modern software design.
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
          {featuredAchievements.map((item, i) => (
            <motion.div
              key={item.id}
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
              className="achievement-card-item"
            >
              {/* Accent top stripe */}
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
                {/* Meta details */}
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
                    {item.badge || "Verified Credential"}
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

                {/* Title */}
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

                {/* Issuer */}
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

                {/* Description */}
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
        </div>

        {/* View All Achievements Button */}
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
            Showing {featuredAchievements.length} of {achievements.length} accreditations
          </span>
          <Link to="/achievements" className="btn-secondary" style={{ padding: "10px 24px" }}>
            View Full Credentials Archive →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .achievement-card-item:hover {
          border-color: var(--border-strong) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </section>
  );
}
