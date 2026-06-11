import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "ML Models Deployed", value: "20+" },
  { label: "Technologies Mastered", value: "15+" },
  { label: "Years of Learning", value: "3+" },
];

const interests = ["Neural Networks", "Computer Vision", "NLP & LLMs", "Data Science", "Full-Stack Apps", "MLOps"];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" style={{ opacity: 0.5 }} />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">👤 About Me</span>
          <h2 className="section-title">
            Passionate About <span className="gradient-text">Intelligent Systems</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "60px" }}>
            Building the bridge between cutting-edge research and real-world applications.
          </p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "60px", alignItems: "start"
        }} className="about-grid">

          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Avatar placeholder */}
            <div style={{
              width: "100%", maxWidth: 360, aspectRatio: "3/4",
              borderRadius: "20px", marginBottom: "32px",
              background: "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.15) 100%)",
              border: "1px solid var(--border-color)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "100px",
              boxShadow: "var(--shadow-glow)",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 60%)"
              }} />
              <img
                src="/profile.jpeg"
                alt="Syed Ali Hassan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "20px"
                }}
              />
            </div>

            {/* Interest chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {interests.map((item) => (
                <span key={item} style={{
                  padding: "6px 14px",
                  background: "rgba(0,212,255,0.06)",
                  border: "1px solid rgba(0,212,255,0.15)",
                  borderRadius: "100px",
                  fontSize: "13px",
                  color: "var(--accent-cyan)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "16px", marginBottom: "20px" }}>
              I'm <strong style={{ color: "var(--text-primary)" }}>Syed Ali Hassan</strong>, an AI/ML enthusiast
              and developer passionate about creating intelligent applications that solve real-world problems.
              My journey started with Python and data science, and has expanded into deep learning,
              computer vision, and full-stack development.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, fontSize: "16px", marginBottom: "36px" }}>
              I specialize in designing and training neural networks using <strong style={{ color: "var(--accent-blue)" }}>
                TensorFlow & PyTorch</strong>, building scalable backend APIs, and creating seamless user
              experiences with React. I'm always exploring the latest breakthroughs in LLMs and generative AI.
            </p>

            {/* Stats grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "20px", marginBottom: "36px"
            }}>
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    borderColor: "var(--accent-blue)",
                    boxShadow: "0 10px 30px rgba(0, 212, 255, 0.2)"
                  }}
                  className="glass"
                  style={{ padding: "20px", textAlign: "center", cursor: "default" }}
                >
                  <div style={{
                    fontSize: "32px", fontWeight: 800,
                    fontFamily: "var(--font-heading)",
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                  }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>{label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/SyedAliHassan-Resume(AI).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              📄 Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
