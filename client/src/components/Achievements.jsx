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
            Formal specializations validating competencies across AI, machine learning, cloud architecture, and modern software engineering.
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

              {/* Certificate Image Preview Section */}
              {item.image && (
                <div
                  style={{
                    width: "100%",
                    height: 180,
                    overflow: "hidden",
                    position: "relative",
                    background: "rgba(0, 0, 0, 0.4)",
                    borderBottom: "1px solid var(--border)",
                  }}
                  className="cert-img-container"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      transition: "transform 0.35s ease",
                    }}
                    className="cert-img-preview"
                  />
                  {/* Subtle bottom gradient shadow */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(17, 17, 32, 0.75) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  padding: "22px 22px 20px",
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
                    marginBottom: 12,
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
                    fontSize: 17.5,
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
                    color: item.color || "var(--accent)",
                    marginBottom: 12,
                  }}
                >
                  {item.issuer}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    flexGrow: 1,
                    marginBottom: 18,
                  }}
                >
                  {item.desc}
                </p>

                {/* Direct PDF Certificate Link */}
                {item.certificate && (
                  <div style={{ marginTop: "auto", paddingTop: 10 }}>
                    <a
                      href={item.certificate}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline"
                      style={{
                        padding: "7px 14px",
                        fontSize: 12,
                        borderRadius: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        color: "var(--text-1)",
                        borderColor: "var(--border-strong)",
                        fontFamily: "var(--mono)",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = item.color || "var(--violet)";
                        e.currentTarget.style.color = item.color || "var(--violet)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-strong)";
                        e.currentTarget.style.color = "var(--text-1)";
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>View Certificate PDF ↗</span>
                    </a>
                  </div>
                )}
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
            Showing {featuredAchievements.length} of {achievements.length} verified credentials
          </span>
          <Link to="/achievements" className="btn-secondary" style={{ padding: "10px 24px" }}>
            View Full Credentials Archive ({achievements.length}) →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .achievement-card-item:hover {
          border-color: var(--border-strong) !important;
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        }
        .achievement-card-item:hover .cert-img-preview {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
