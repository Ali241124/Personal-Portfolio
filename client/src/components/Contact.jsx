import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";

const socials = [
  { label: "GitHub", href: "https://github.com/Ali241124", icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syedalihassan24", icon: "💼" },
  { label: "Email", href: "mailto:syedali.hassan2040@gmail.com", icon: "✉️" },
];

function Toast({ type, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        position: "fixed", top: "90px", right: "24px", zIndex: 999,
        padding: "14px 20px", borderRadius: "12px",
        background: type === "success" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
        border: `1px solid ${type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
        color: type === "success" ? "#10b981" : "#ef4444",
        fontWeight: 600, fontSize: "14px",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", gap: "10px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}
    >
      {type === "success" ? "✅" : "❌"} {message}
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
      let errorMsg = "Could not send message. Please try again.";
      if (err.response) {
        errorMsg = err.response.data.details || err.response.data.error || errorMsg;
      } else if (err.request) {
        errorMsg = "No response from server. Please check your internet connection.";
      }
      showToast("error", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "#ef4444" : "rgba(0,212,255,0.15)"}`,
    borderRadius: "10px", color: "var(--text-primary)",
    fontFamily: "var(--font-primary)", fontSize: "15px", outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  });

  return (
    <>
      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      <section id="contact" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative" }}>
        <div className="grid-bg" />
        <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <span className="section-tag">📬 Get In Touch</span>
            <h2 className="section-title">
              Let's <span className="gradient-text">Collaborate</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Open to freelance projects, research collaborations, and full-time AI/ML roles.
            </p>
          </motion.div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1.6fr",
            gap: "40px", alignItems: "start"
          }} className="contact-grid">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
                  Open to Work 🚀
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  I'm actively looking for AI/ML roles, freelance projects, and
                  research opportunities. Let's build something awesome together!
                </p>
              </div>

              {socials.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank" rel="noreferrer"
                  whileHover={{ x: 6 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "16px", borderRadius: "12px", marginBottom: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.1)",
                    color: "var(--text-secondary)", textDecoration: "none",
                    transition: "border-color 0.2s",
                    fontSize: "14px", fontWeight: 500
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.1)"}
                >
                  <span style={{ fontSize: "22px" }}>{icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{label}</span>
                  <span style={{ marginLeft: "auto", color: "var(--text-muted)" }}>→</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Right — form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass"
              style={{ padding: "36px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="form-row">
                <div>
                  <input
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle("name")}
                    onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                    onBlur={(e) => e.target.style.borderColor = errors.name ? "#ef4444" : "rgba(0,212,255,0.15)"}
                  />
                  {errors.name && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
                </div>
                <div>
                  <input
                    placeholder="Your Email *"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle("email")}
                    onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                    onBlur={(e) => e.target.style.borderColor = errors.email ? "#ef4444" : "rgba(0,212,255,0.15)"}
                  />
                  {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle("subject")}
                  onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(0,212,255,0.15)"}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <textarea
                  placeholder="Your Message *"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(0,212,255,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = errors.message ? "#ef4444" : "rgba(0,212,255,0.15)"}
                />
                {errors.message && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary"
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending..." : "Send Message  →"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
