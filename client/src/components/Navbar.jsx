import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience",   href: "#experience" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar({ aiEnabled, setAiEnabled }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("home");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (location.pathname !== "/") return;
      let cur = "home";
      for (const { href } of NAV) {
        const el = document.getElementById(href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 160) cur = href.slice(1);
      }
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const goto = (href) => {
    if (location.pathname !== "/") { window.location.href = "/" + href; return; }
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(10,10,18,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

          {/* Logo / Brand Name (Removed AH box as requested) */}
          <Link to="/" onClick={e => { if (location.pathname === "/") { e.preventDefault(); goto("#home"); }}}
            style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
            <div style={{ fontWeight: 800, fontSize: "clamp(16px, 3.5vw, 18px)", color: "var(--text-1)", letterSpacing: "-0.03em" }}>
              Syed Ali <span style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hassan</span>
            </div>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--violet)", letterSpacing: "0.05em", marginTop: -1 }}>
              AI Engineer
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Main navigation">
            {NAV.map(({ label, href }) => {
              const active = activeSection === href.slice(1);
              return (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); goto(href); }}
                  style={{
                    padding: "7px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", transition: "all 0.2s",
                    color: active ? "#fff" : "var(--text-2)",
                    background: active ? "rgba(139,92,246,0.18)" : "transparent",
                    border: active ? "1px solid var(--border-accent)" : "1px solid transparent",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text-1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.background = "transparent"; }}}
                >{label}</a>
              );
            })}

            <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noreferrer"
              style={{
                marginLeft: 6, padding: "7px 16px", borderRadius: 8,
                background: "var(--grad-primary)", color: "#fff",
                fontSize: 12.5, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 4px 14px rgba(139,92,246,0.35)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,92,246,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(139,92,246,0.35)"; }}
            >Resume ↗</a>

            {setAiEnabled && (
              <div style={{ marginLeft: 8, paddingLeft: 10, borderLeft: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--mono)" }}>AI</span>
                <button onClick={() => setAiEnabled(!aiEnabled)} role="switch" aria-checked={aiEnabled} aria-label="Toggle AI"
                  style={{
                    position: "relative", width: 36, height: 18, borderRadius: 10,
                    background: aiEnabled ? "var(--grad-primary)" : "rgba(255,255,255,0.1)",
                    border: "none", cursor: "pointer", transition: "all 0.2s", outline: "none",
                  }}>
                  <span style={{
                    position: "absolute", top: 1, left: aiEnabled ? 19 : 2,
                    width: 15, height: 15, borderRadius: "50%",
                    background: "#fff", transition: "left 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}/>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            className="nav-hamburger"
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
              borderRadius: 8, cursor: "pointer", padding: "8px 10px", color: "var(--text-1)",
            }}>
            <div style={{ width: 20, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{
                display: "block", height: 2, width: "100%", background: "currentColor", borderRadius: 1, transition: "all 0.25s",
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}/>
              <span style={{
                display: "block", height: 2, width: "100%", background: "currentColor", borderRadius: 1, transition: "all 0.25s",
                opacity: menuOpen ? 0 : 1,
              }}/>
              <span style={{
                display: "block", height: 2, width: "100%", background: "currentColor", borderRadius: 1, transition: "all 0.25s",
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}/>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(10,10,18,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  onClick={e => { e.preventDefault(); goto(href); }}
                  style={{
                    display: "block", padding: "10px 12px", fontSize: 14.5, fontWeight: 500,
                    borderRadius: 8, textDecoration: "none", transition: "color 0.2s",
                    color: activeSection === href.slice(1) ? "var(--violet)" : "var(--text-2)",
                    background: activeSection === href.slice(1) ? "rgba(139,92,246,0.1)" : "transparent",
                  }}>{label}</a>
              ))}
              <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 10, padding: "11px 18px", borderRadius: 8,
                  background: "var(--grad-primary)", color: "#fff", fontSize: 13.5, fontWeight: 600,
                }}>View Resume ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) { .nav-desktop { display: none !important; } }
        @media (min-width: 961px) { .nav-hamburger { display: none !important; } }
      `}</style>
    </header>
  );
}
