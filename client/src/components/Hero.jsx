import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { label: "Projects Built", value: "12+" },
  { label: "Certifications", value: "5" },
  { label: "AI Systems", value: "7+" },
];

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      paddingTop: "clamp(84px, 14vw, 120px)",
      paddingBottom: "clamp(48px, 8vw, 80px)",
    }}>
      {/* Background orbs */}
      <div className="glow-orb glow-orb-violet" style={{ top: "-10%", right: "-5%", opacity: 0.7 }} />
      <div className="glow-orb glow-orb-cyan" style={{ bottom: "5%", left: "-5%", opacity: 0.6 }} />

      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.3,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }}/>

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-grid">

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Eyebrow */}
            <motion.div {...fadeUp(0)}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "6px 14px", marginBottom: "clamp(16px, 3vw, 26px)",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: 100,
                maxWidth: "100%",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 10px #22c55e", flexShrink: 0,
                }}/>
                <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--violet)", letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  MS Artificial Intelligence · UET Lahore
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.08)} style={{
              fontSize: "clamp(34px, 5.5vw, 64px)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.035em", marginBottom: 16,
              color: "var(--text-1)",
              wordBreak: "break-word",
            }}>
              Syed Ali<br/>
              <span style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hassan</span>
            </motion.h1>

            {/* Role */}
            <motion.p {...fadeUp(0.16)} style={{
              fontSize: "clamp(16px, 2.2vw, 21px)",
              color: "var(--text-2)", fontWeight: 400,
              marginBottom: 18, lineHeight: 1.5,
            }}>
              AI/ML Engineer{" "}
              <span style={{ color: "var(--border-hover)", margin: "0 8px" }}>·</span>
              {" "}Full-Stack Developer
            </motion.p>

            {/* Bio */}
            <motion.p {...fadeUp(0.22)} style={{
              fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--text-2)",
              lineHeight: 1.8, maxWidth: 520, marginBottom: "clamp(24px, 4vw, 36px)",
            }}>
              I build production-grade AI systems — from autonomous agentic workflows and RAG pipelines
              to computer vision models — and ship them as polished, responsive web applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="hero-cta-group">
              <a href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary">
                Explore Projects →
              </a>
              <a href="https://github.com/Ali241124" target="_blank" rel="noreferrer" className="btn-outline">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
                GitHub
              </a>
              <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noreferrer" className="btn-outline">
                Resume ↗
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.38)} className="hero-stats-row">
              {STATS.map(({ label, value }) => (
                <div key={label} className="hero-stat-item">
                  <div style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em", background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--mono)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-card"
          >
            {/* Clean Photo container without overlays or badges */}
            <div style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              position: "relative",
              maxWidth: 380,
              margin: "0 auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}>
              <img
                src="/profile.jpeg"
                alt="Syed Ali Hassan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:72px;font-weight:800;background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">AH</div>`;
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(32px, 5vw, 60px);
          align-items: center;
        }
        .hero-card { width: 100%; }
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: clamp(32px, 5vw, 48px);
        }
        .hero-stats-row {
          display: flex;
          gap: clamp(16px, 4vw, 32px);
          flex-wrap: wrap;
        }
        .hero-stat-item {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-card {
            max-width: 320px;
            margin: 0 auto;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-group a {
            flex: 1 1 100%;
            text-align: center;
          }
          .hero-stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
