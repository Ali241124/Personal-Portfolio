import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

export default function AllAchievements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("all");

  // Extract unique issuers for filtering
  const issuers = useMemo(() => {
    const list = achievements.map((a) => a.issuer.split("·")[0].trim());
    return ["all", ...Array.from(new Set(list))];
  }, []);

  const filtered = useMemo(() => {
    return achievements.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIssuer =
        selectedIssuer === "all" ||
        a.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
      return matchSearch && matchIssuer;
    });
  }, [searchQuery, selectedIssuer]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      {/* Top Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10, 10, 18, 0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 0",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: 14,
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
            }}
            className="back-btn-hover"
          >
            ← Back to Portfolio
          </Link>
          <div style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            Credentials Archive
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "64px 0 100px" }}>
        <div className="container">
          {/* Header */}
          <div style={{ maxWidth: 700, marginBottom: 40 }}>
            <span className="section-label">All Accreditations</span>
            <h1 className="section-title" style={{ marginTop: 12 }}>
              Verified Credentials & Certifications
            </h1>
            <p className="section-sub" style={{ marginTop: 12 }}>
              Complete archive of professional certifications, specialized technical coursework, and industry-recognized credentials.
            </p>
          </div>

          {/* Search & Filter Bar */}
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
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by title, topic, or issuer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 360,
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

            {/* Issuer Filter Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {issuers.map((iss) => (
                <button
                  key={iss}
                  onClick={() => setSelectedIssuer(iss)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    background: selectedIssuer === iss ? "var(--violet-glow)" : "rgba(255,255,255,0.03)",
                    color: selectedIssuer === iss ? "var(--violet)" : "var(--text-secondary)",
                    border: `1px solid ${selectedIssuer === iss ? "var(--border-accent)" : "var(--border)"}`,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                  }}
                >
                  {iss === "all" ? "All Issuers" : iss}
                </button>
              ))}
            </div>
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

                  {/* Certificate Image Preview */}
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
                        fontSize: 17.5,
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
                        color: item.color || "var(--accent)",
                        marginBottom: 12,
                      }}
                    >
                      {item.issuer}
                    </div>

                    <p
                      style={{
                        fontSize: 13.5,
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                        flexGrow: 1,
                        marginBottom: 16,
                      }}
                    >
                      {item.desc}
                    </p>

                    {item.certificate && (
                      <div style={{ marginTop: "auto", paddingTop: 8 }}>
                        <a
                          href={item.certificate}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline"
                          style={{
                            padding: "6px 13px",
                            fontSize: 11.5,
                            borderRadius: 6,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
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
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{item.certificate.endsWith('.pdf') ? 'View Certificate PDF ↗' : 'View Certificate ↗'}</span>
                        </a>
                      </div>
                    )}
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
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        }
        .achievement-card-item:hover .cert-img-preview {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
