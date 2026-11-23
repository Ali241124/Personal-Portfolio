import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text: "" }

  const directEmail = "syedali.hassan2040@gmail.com";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("/contact", form);
      setStatus({ type: "success", text: "Message sent successfully! I will get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const serverMsg = err.response?.data?.details || err.response?.data?.error;
      setStatus({
        type: "error",
        text: serverMsg
          ? `Send failed: ${serverMsg}. Please reach me directly at ${directEmail}`
          : `Send failed. Please reach me directly at ${directEmail}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="contact" ref={ref} style={{ background: "var(--bg)", position: "relative" }}>
      <div className="glow-orb glow-orb-violet" style={{ bottom: "-15%", right: "-5%", opacity: 0.45 }} />
      <div className="glow-orb glow-orb-cyan" style={{ top: "10%", left: "-5%", opacity: 0.35 }} />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Main Hero Card Inspired by Reference ── */}
        <motion.div
          {...fadeUp(0)}
          className="contact-hero-banner"
          style={{
            position: "relative",
            background: "linear-gradient(145deg, rgba(17, 17, 32, 0.95) 0%, rgba(13, 13, 26, 0.98) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            borderRadius: "clamp(18px, 3vw, 28px)",
            padding: "clamp(48px, 7vw, 76px) clamp(20px, 5vw, 56px)",
            textAlign: "center",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          {/* Subtle top ambient glow */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 150,
            background: "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Eyebrow Label */}
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: "clamp(11px, 1.4vw, 12px)",
            color: "var(--cyan)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 16,
          }}>
            CONTACT
          </div>

          {/* Main Statement Title */}
          <h2 style={{
            fontSize: "clamp(28px, 4.8vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            color: "#ffffff",
            maxWidth: 820,
            margin: "0 auto 20px",
          }}>
            Let's build something people can{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              talk to.
            </span>
          </h2>

          {/* Subtitle / Pitch */}
          <p style={{
            fontSize: "clamp(14.5px, 1.8vw, 17px)",
            color: "var(--text-2)",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto clamp(28px, 4vw, 36px)",
          }}>
            Have a voice agent, RAG system, or AI product idea worth discussing? My inbox is open — for collaborations, speaking, and interesting problems.
          </p>

          {/* Action Buttons Row */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
            position: "relative",
            zIndex: 2,
          }}>
            {/* Primary Email Pill Button */}
            <a
              href={`mailto:${directEmail}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 26px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                borderRadius: 100,
                color: "#ffffff",
                fontFamily: "var(--mono)",
                fontSize: "clamp(13px, 1.6vw, 14.5px)",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(139, 92, 246, 0.45)",
                transition: "all 0.25s ease",
              }}
              className="contact-pill-btn"
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{directEmail}</span>
            </a>

            {/* Toggle Send Message Form Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 24px",
                background: showForm ? "rgba(139, 92, 246, 0.18)" : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${showForm ? "var(--violet)" : "var(--border-hover)"}`,
                borderRadius: 100,
                color: showForm ? "var(--cyan)" : "var(--text-1)",
                fontFamily: "var(--font)",
                fontSize: 13.5,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s ease",
                outline: "none",
              }}
              className="contact-copy-btn"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{showForm ? "Hide Message Form" : "Send a Message"}</span>
              <span style={{ fontSize: 11, marginLeft: 2, transform: showForm ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
            </button>
          </div>

          {/* ── Expandable Contact Form ── */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  maxWidth: 680,
                  margin: "36px auto 0",
                  textAlign: "left",
                  background: "rgba(10, 10, 18, 0.75)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "clamp(20px, 4vw, 32px)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>
                    Send a Direct Message
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>
                    Fill out the form below and it will be delivered straight to my personal inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="Project proposal, collaboration, consultation..."
                      value={form.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Share details about your idea, project, or inquiry..."
                      value={form.message}
                      onChange={handleChange}
                      className="form-input"
                      style={{ resize: "vertical", minHeight: 110 }}
                    />
                  </div>

                  {status && (
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: "var(--r-sm)",
                      fontSize: 13,
                      background: status.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                      border: `1px solid ${status.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                      color: status.type === "success" ? "#34d399" : "#f87171",
                      lineHeight: 1.5,
                    }}>
                      {status.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: "100%", marginTop: 4, opacity: loading ? 0.75 : 1 }}
                  >
                    {loading ? (
                      <>
                        <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Transmitting...
                      </>
                    ) : "Send Message →"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .contact-hero-banner {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-hero-banner:hover {
          border-color: rgba(139, 92, 246, 0.55);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.15);
        }
        .contact-pill-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 12px 36px rgba(139, 92, 246, 0.6);
        }
        .contact-copy-btn:hover {
          border-color: var(--violet);
          background: rgba(139, 92, 246, 0.12);
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
