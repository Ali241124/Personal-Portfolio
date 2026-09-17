import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let animId;

    // Sparse particles
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.25 - 0.05,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center",
      background: "var(--surface-base)", overflow: "hidden", paddingTop: 72,
    }}>
      {/* Subtle animated grid */}
      <div className="bg-grid" />

      {/* Ambient orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 64 }} className="hero-grid">

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 24 }}
            >
              <span className="section-label">
                Currently pursuing MS Artificial Intelligence · UET Lahore
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 8 }}
            >
              Hi, I'm{" "}
              <span style={{ color: "var(--accent)" }}>Syed Ali Hassan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "var(--text-secondary)", fontWeight: 400, marginBottom: 24, letterSpacing: "-0.01em" }}
            >
              Software Engineer &nbsp;·&nbsp; AI & Full-Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.27 }}
              style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}
            >
              I build web applications and integrate AI systems. My work spans from 
              crafting clean interfaces to training machine learning models and shipping 
              them as usable products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
            >
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">
                View Projects
              </a>
              <a href="https://github.com/Ali241124" target="_blank" rel="noreferrer" className="btn-secondary">
                GitHub ↗
              </a>
              <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noreferrer" className="btn-secondary">
                Resume ↗
              </a>
            </motion.div>
          </div>

          {/* Personal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-card-wrap"
          >
            <div style={{
              width: 260, height: 320,
              background: "var(--surface-card)", border: "1px solid var(--border)",
              borderRadius: 20, padding: 32,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 16, position: "relative", overflow: "hidden",
            }}>
              {/* Subtle corner accent */}
              <div style={{
                position: "absolute", top: -40, right: -40, width: 120, height: 120,
                background: "var(--accent-glow)", borderRadius: "50%", filter: "blur(30px)",
              }} />
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "var(--surface-raised)", border: "2px solid var(--border-strong)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--accent)",
                position: "relative", zIndex: 1,
              }}>
                AH
              </div>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Syed Ali Hassan</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Software Engineer</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", position: "relative", zIndex: 1 }}>
                {[
                  { label: "BS — Software Engineering", sub: "University of Central Punjab" },
                  { label: "MS — Artificial Intelligence", sub: "UET Lahore · 2026–Present" },
                ].map(({ label, sub }) => (
                  <div key={label} style={{
                    padding: "8px 12px", background: "var(--surface-raised)",
                    border: "1px solid var(--border-subtle)", borderRadius: 8,
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          style={{
            position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            color: "var(--text-muted)",
          }}
        >
          <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>scroll</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      <style>{`
        .hero-grid {
          grid-template-columns: 1fr auto;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-card-wrap {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
