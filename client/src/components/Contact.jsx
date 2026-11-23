import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const directEmail = "syedali.hassan2040@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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
          {/* Subtle top ambient glow inside the card */}
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

          {/* Primary Action Button (Direct mailto + Copy button) */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
            position: "relative",
            zIndex: 2,
          }}>
            <a
              href={`mailto:${directEmail}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 28px",
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

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-hover)",
                borderRadius: 100,
                color: copied ? "var(--cyan)" : "var(--text-1)",
                fontFamily: "var(--font)",
                fontSize: 13.5,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              className="contact-copy-btn"
            >
              {copied ? (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
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
      `}</style>
    </section>
  );
}
