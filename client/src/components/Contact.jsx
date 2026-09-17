import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

function Toast({ type, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      style={{
        position: "fixed", top: 88, right: 24, zIndex: 999,
        padding: "12px 18px", borderRadius: 10,
        background: type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
        border: `1px solid ${type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
        color: type === "success" ? "#10B981" : "#EF4444",
        display: "flex", alignItems: "center", gap: 10,
        fontSize: 14, fontWeight: 500,
        backdropFilter: "blur(8px)",
      }}
    >
      <span>{type === "success" ? "✓" : "✕"}</span>
      <span>{message}</span>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await axios.post("/contact", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      showToast("success", "Message sent! I'll get back to you soon.");
    } catch (err) {
      let msg = "Could not send message. Please try again.";
      if (err.response) msg = err.response.data.details || err.response.data.error || msg;
      else if (err.request) msg = "No response from server. Check your connection.";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%", padding: "11px 14px",
    background: "var(--surface-raised)",
    border: `1px solid ${hasError ? "#EF4444" : "var(--border)"}`,
    borderRadius: 10, color: "var(--text-primary)",
    fontFamily: "var(--font-sans)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const labelStyle = {
    display: "block", fontSize: 12, fontWeight: 500,
    color: "var(--text-secondary)", marginBottom: 6,
    fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
  };

  return (
    <>
      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      <section id="contact" ref={ref} style={{ background: "var(--surface-raised)", position: "relative" }}>
        <div className="section-wrapper">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: 56 }}
          >
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's Talk</h2>
            <p className="section-sub">
              Open to full-time roles, freelance projects, and research collaborations.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start" }} className="contact-grid">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div style={{
                padding: "20px 22px", background: "var(--surface-card)",
                border: "1px solid var(--border)", borderRadius: 12, marginBottom: 20,
              }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                  Currently open to work
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Looking for AI/ML roles, full-stack positions, and interesting freelance work. Feel free to reach out directly.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                      background: "var(--surface-card)", border: "1px solid var(--border)",
                      borderRadius: 10, color: "var(--text-secondary)", textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-dim)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {icon}
                    <span style={{ fontSize: 13, fontWeight: 500, color: "inherit" }}>{label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "inherit" }}>→</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 }}
              style={{
                padding: "32px 32px",
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle(errors.name)}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-dim)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.name ? "#EF4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.name && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle(errors.email)}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-dim)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? "#EF4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Subject</label>
                <input
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle(false)}
                  onFocus={(e) => { e.target.style.borderColor = "var(--accent-dim)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Message *</label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle(errors.message), resize: "vertical", minHeight: 120 }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--accent-dim)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.message ? "#EF4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.message && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -1 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="btn-primary"
                style={{ width: "100%", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Sending..." : "Send Message →"}
              </motion.button>
            </motion.form>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
