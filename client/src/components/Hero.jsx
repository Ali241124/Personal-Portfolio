import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let animId;

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.4 + 0.4,
      speedX: (Math.random() - 0.5) * 0.12,
      speedY: -Math.random() * 0.2 - 0.05,
      opacity: Math.random() * 0.3 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
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
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--surface-base)",
        overflow: "hidden",
        paddingTop: "clamp(88px, 12vh, 120px)",
        paddingBottom: 64,
      }}
    >
      {/* Background accents */}
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div className="hero-content-grid">
          {/* Left Column: Introductions & CTA */}
          <div style={{ maxWidth: 640 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 20 }}
            >
              <span className="section-label">
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent)",
                  }}
                />
                MS Artificial Intelligence · UET Lahore
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontSize: "clamp(32px, 5.2vw, 58px)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                marginBottom: 14,
              }}
            >
              Syed Ali Hassan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              style={{
                fontSize: "clamp(17px, 2.2vw, 22px)",
                color: "var(--accent)",
                fontWeight: 500,
                marginBottom: 20,
                letterSpacing: "-0.01em",
              }}
            >
              AI/ML Engineer & Full-Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.27 }}
              style={{
                fontSize: "clamp(15px, 1.8vw, 16px)",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              Engineering autonomous agentic workflows, production RAG pipelines, and full-stack AI web systems. Dedicated to bridging rigorous machine learning models with responsive user interfaces.
            </motion.p>

            {/* Quick Stat Pill Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 12,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Focus</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>Agentic AI & RAG</div>
              </div>
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Core Stack</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>Python · PyTorch · React</div>
              </div>
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Availability</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)", marginTop: 2 }}>Open to Roles</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Explore Projects →
              </a>
              <a
                href="https://github.com/Ali241124"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                GitHub
              </a>
              <a
                href="/SyedAliHassan-Resume(AI).pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Resume ↗
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Developer Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-terminal-card"
          >
            <div
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                width: "100%",
                maxWidth: 440,
              }}
            >
              {/* Terminal Window Header */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "var(--surface-raised)",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                </div>
                <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  engineer.config.ts
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setActiveTab("profile")}
                    style={{
                      background: activeTab === "profile" ? "var(--border)" : "transparent",
                      border: "none",
                      color: activeTab === "profile" ? "var(--accent)" : "var(--text-muted)",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    style={{
                      background: activeTab === "stack" ? "var(--border)" : "transparent",
                      border: "none",
                      color: activeTab === "stack" ? "var(--accent)" : "var(--text-muted)",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    Stack
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                style={{
                  padding: "20px 22px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {activeTab === "profile" ? (
                  <>
                    <p style={{ color: "var(--text-muted)", marginBottom: 8 }}>
                      <span style={{ color: "var(--accent)" }}>&gt;</span> cat profile.json
                    </p>
                    <div style={{ color: "var(--text-primary)" }}>&#123;</div>
                    <div style={{ paddingLeft: 16 }}>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"name"</span>: <span style={{ color: "#a78bfa" }}>"Syed Ali Hassan"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"role"</span>: <span style={{ color: "#a78bfa" }}>"Software & AI Engineer"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"education"</span>: &#123;
                      </div>
                      <div style={{ paddingLeft: 16 }}>
                        <div>
                          <span style={{ color: "#38bdf8" }}>"current"</span>: <span style={{ color: "#34d399" }}>"MS AI @ UET Lahore"</span>,
                        </div>
                        <div>
                          <span style={{ color: "#38bdf8" }}>"undergrad"</span>: <span style={{ color: "#34d399" }}>"BS Software Eng @ UCP"</span>
                        </div>
                      </div>
                      <div style={{ paddingLeft: 0 }}>&#125;,</div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"passions"</span>: [
                      </div>
                      <div style={{ paddingLeft: 16, color: "#facc15" }}>
                        "Agentic Workflows", "Vector Search RAG", "Deep Learning"
                      </div>
                      <div>]</div>
                    </div>
                    <div style={{ color: "var(--text-primary)" }}>&#125;</div>
                  </>
                ) : (
                  <>
                    <p style={{ color: "var(--text-muted)", marginBottom: 8 }}>
                      <span style={{ color: "var(--accent)" }}>&gt;</span> ./show_stack.sh
                    </p>
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>AI & ML:</span> PyTorch, TensorFlow, HuggingFace, YOLOv8, LangGraph
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>Backend:</span> Python, FastAPI, Node.js, Express, PostgreSQL, ChromaDB
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>Frontend:</span> React, TypeScript, Tailwind CSS, Vite
                    </div>
                    <div>
                      <span style={{ color: "var(--accent)" }}>Tools:</span> Docker, Git, Linux, Ollama, REST APIs
                    </div>
                  </>
                )}

                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 14,
                    borderTop: "1px dashed var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>status: 0 errors</span>
                  <span style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--accent)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    ready
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-terminal-card {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
