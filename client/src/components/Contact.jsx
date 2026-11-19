import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";

const CHANNELS = [
  {
    label: "GitHub",
    value: "github.com/Ali241124",
    href: "https://github.com/Ali241124",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/syedalihassan24",
    href: "https://www.linkedin.com/in/syedalihassan24",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "syedali.hassan2040@gmail.com",
    href: "mailto:syedali.hassan2040@gmail.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text: "" }

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
          ? `Send failed: ${serverMsg}. Please email me directly at syedali.hassan2040@gmail.com`
          : "Send failed. Please reach me directly at syedali.hassan2040@gmail.com",
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
      <div className="glow-orb glow-orb-violet" style={{ bottom: "-20%", right: "-5%", opacity: 0.5 }} />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div {...fadeUp()} style={{ marginBottom: 56 }}>
          <span className="section-label">Connect</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            Get in <span>Touch</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 12 }}>
            Have a project in mind, want to explore agentic AI systems, or looking to collaborate? Send a message and I'll respond promptly.
          </p>
        </motion.div>

        <div className="contact-grid">

          {/* Contact form */}
          <motion.div {...fadeUp(0.1)}>
            <div className="card" style={{ padding: "clamp(24px, 4vw, 36px)" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>
                Send a Message
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--text-2)", marginBottom: 24 }}>
                Fill in your details and I'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name + Email row */}
                <div className="form-row">
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>
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
                    <label style={{ display: "block", fontSize: 12.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>
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
                  <label style={{ display: "block", fontSize: 12.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Project inquiry, collaboration, etc."
                    value={form.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontFamily: "var(--mono)", color: "var(--text-3)", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Share details about your goal or inquiry..."
                    value={form.message}
                    onChange={handleChange}
                    className="form-input"
                    style={{ resize: "vertical", minHeight: 120 }}
                  />
                </div>

                {/* Status feedback */}
                {status && (
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "var(--r-sm)",
                    fontSize: 13.5,
                    background: status.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
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
                      Sending...
                    </>
                  ) : "Send Message →"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Direct channels card */}
            <div className="card" style={{ padding: "28px 26px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>
                Direct Contact
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 20 }}>
                I am actively considering AI/ML engineering roles, research projects, and technical consulting engagements.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    className="channel-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-md)",
                      color: "var(--text-1)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ color: "var(--cyan)", flexShrink: 0 }}>{ch.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{ch.label}</div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.value}</div>
                    </div>
                    <svg style={{ marginLeft: "auto", flexShrink: 0, color: "var(--text-3)" }} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Location card */}
            <div className="card" style={{
              padding: "24px 26px",
              background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(34,211,238,0.05) 100%)",
              border: "1px solid var(--border-accent)",
            }}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                Location & Availability
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>
                Lahore, Pakistan
              </div>
              <div style={{ fontSize: 13, color: "var(--text-2)", fontFamily: "var(--mono)", marginBottom: 14 }}>
                PKT · UTC+5
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: "var(--text-1)", fontWeight: 500 }}>Available for remote work worldwide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
        }
        .channel-row:hover {
          border-color: var(--border-accent) !important;
          background: rgba(139,92,246,0.07) !important;
          transform: translateX(4px);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
