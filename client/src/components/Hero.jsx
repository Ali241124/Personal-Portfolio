import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ROLES = ["AI / ML Engineer", "Deep Learning Developer", "Python Developer", "Data Scientist"];

// Particle canvas background
function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", resize);

    const NODES = 55;
    const nodes = Array.from({ length: NODES }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.55)";
        ctx.fill();
      });
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.6 }} />;
}

// Typing animation
function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "clamp(18px, 3vw, 26px)",
      color: "var(--accent-blue)", display: "inline-block",
      borderRight: "2px solid var(--accent-blue)",
      paddingRight: "4px", animation: "blink-cursor 0.8s step-end infinite",
      minHeight: "40px"
    }}>
      {displayed}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center",
      background: "var(--gradient-hero)", overflow: "hidden",
    }}>
      <div className="grid-bg" />
      <ParticleNetwork />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        top: "-100px", right: "-100px", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
        bottom: "-80px", left: "-80px", pointerEvents: "none"
      }} />

      <div className="section-wrapper" style={{ position: "relative", zIndex: 1, paddingTop: "120px", maxWidth: "900px" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <span style={{ fontSize: "8px", color: "#10b981" }}>●</span>
            &nbsp;Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 800, letterSpacing: "-2px",
            lineHeight: 1.05, margin: "20px 0 16px",
          }}
        >
          Hi, I'm{" "}
          <span className="gradient-text">Syed Ali Hassan</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginBottom: "24px", height: "44px", display: "flex", alignItems: "center" }}
        >
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontSize: "18px", color: "var(--text-secondary)",
            maxWidth: "560px", lineHeight: 1.75, marginBottom: "40px"
          }}
        >
          Passionate about building intelligent systems — from neural networks
          and computer vision to NLP and full-stack AI applications. Turning
          data into decisions, one model at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View Projects</span>
            <span>→</span>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            marginTop: "64px", display: "flex", gap: "40px", flexWrap: "wrap"
          }}
        >
          {[
            { label: "Projects Built", value: "10+" },
            { label: "ML Models Trained", value: "20+" },
            { label: "Technologies", value: "15+" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: "32px", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--accent-blue)" }}>
                {value}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "6px",
          color: "var(--text-muted)", fontSize: "12px"
        }}
      >
        <span>scroll</span>
        <span style={{ fontSize: "18px" }}>↓</span>
      </motion.div>
    </section>
  );
}