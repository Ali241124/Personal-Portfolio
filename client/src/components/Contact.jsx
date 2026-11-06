import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ali241124",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/syedalihassan24",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Email",
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
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setStatus(null);

    try {
      // Support both /contact and /api/contact routes
      await axios.post("/contact", form);
      setStatus({ type: "success", text: "Message transmitted successfully! I will get back to you shortly." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      const serverMsg = err.response?.data?.details || err.response?.data?.error;
      setStatus({ 
        type: "error", 
        text: serverMsg 
          ? `Direct send failed (${serverMsg}). Please email directly at syedali.hassan2040@gmail.com`
          : "Direct send failed. Please reach me directly at syedali.hassan2040@gmail.com" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} style={{ background: "var(--surface-raised)", position: "relative" }}>
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 48 }}
        >
          <span className="section-label">Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-sub">
            Have a project in mind, want to explore agentic AI systems, or looking to collaborate? Send a message.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
          className="contact-layout-grid"
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
            style={{ padding: "clamp(24px, 4vw, 36px)" }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginBottom: 8 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Miller"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginBottom: 8 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginBottom: 8 }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details regarding your goal or inquiry..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input"
                  style={{ resize: "vertical" }}
                />
              </div>

              {status && (
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    background: status.type === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                    border: `1px solid ${status.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                    color: status.type === "success" ? "#34d399" : "#f87171",
                  }}
                >
                  {status.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", marginTop: 8 }}
              >
                {loading ? "Transmitting..." : "Send Message →"}
              </button>
            </form>
          </motion.div>

          {/* Direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                Direct Contact
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                I am actively considering software engineering and AI/ML positions, research projects, and technical consulting.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      color: "var(--text-primary)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    className="contact-channel-hover"
                  >
                    <span style={{ color: "var(--accent-secondary)" }}>{s.icon}</span>
                    <span style={{ fontWeight: 500 }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="card"
              style={{
                padding: 24,
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--accent-secondary)", textTransform: "uppercase", marginBottom: 6 }}>
                Location & Timezone
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
                Lahore, Pakistan (PKT / UTC+5)
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                Available for remote workflows worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .contact-channel-hover:hover {
          border-color: var(--accent) !important;
          background: rgba(99, 102, 241, 0.1) !important;
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
