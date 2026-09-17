import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience",   href: "#experience" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar({ aiEnabled = false, setAiEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (location.pathname !== "/") return;
      const sections = navLinks.map(l => l.href.slice(1));
      let current = "home";
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 140) current = s;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollTo = (href) => {
    if (location.pathname !== "/") { window.location.href = "/" + href; return; }
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.3s ease, border-color 0.3s ease",
      background: scrolled ? "rgba(8,11,16,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link to="/" onClick={(e) => { if (location.pathname === "/") { e.preventDefault(); scrollTo("#home"); } }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--accent-glow)",
              border: "1px solid var(--accent-ring)", display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 13,
              fontWeight: 700, color: "var(--accent)", letterSpacing: "0.05em" }}>AH</div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Ali Hassan
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="navbar-desktop">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", transition: "color 0.2s ease, background 0.2s ease",
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    background: isActive ? "var(--accent-glow)" : "transparent" }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >{link.label}</a>
              );
            })}
            <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: 12, padding: "7px 18px", borderRadius: 7, background: "transparent",
                border: "1px solid var(--border-strong)", color: "var(--text-primary)", fontSize: 13,
                fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-dim)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >Resume</a>
            {setAiEnabled && (
              <div style={{ marginLeft: 12, paddingLeft: 12, borderLeft: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Syed AI</span>
                <button onClick={() => setAiEnabled(!aiEnabled)} role="switch" aria-checked={aiEnabled}
                  aria-label="Toggle AI assistant"
                  style={{ position: "relative", width: 40, height: 22, borderRadius: 11,
                    background: aiEnabled ? "var(--accent)" : "var(--border-strong)",
                    border: "none", cursor: "pointer", transition: "background 0.2s ease", outline: "none" }}>
                  <span style={{ position: "absolute", top: 3, left: aiEnabled ? 21 : 3, width: 16, height: 16,
                    borderRadius: "50%", background: "white", transition: "left 0.2s ease", display: "block" }} />
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            className="navbar-mobile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "var(--text-secondary)" }}>
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 1.5, width: "100%", background: "currentColor", borderRadius: 1, transition: "transform 0.25s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
              <span style={{ display: "block", height: 1.5, width: "100%", background: "currentColor", borderRadius: 1, transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: 1.5, width: "100%", background: "currentColor", borderRadius: 1, transition: "transform 0.25s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ borderBottom: "1px solid var(--border)", background: "rgba(8,11,16,0.96)", backdropFilter: "blur(12px)" }}>
            <div style={{ padding: "12px 24px 24px" }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{ display: "block", padding: "12px 8px", fontSize: 15, fontWeight: 500,
                    textDecoration: "none", color: activeSection === link.href.slice(1) ? "var(--accent)" : "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-subtle)", transition: "color 0.2s" }}
                >{link.label}</a>
              ))}
              <a href="/SyedAliHassan-Resume(AI).pdf" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", marginTop: 16, padding: "9px 20px", borderRadius: 7,
                  border: "1px solid var(--border-strong)", color: "var(--text-primary)", fontSize: 13,
                  fontWeight: 500, textDecoration: "none" }}>Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{"@media (max-width:900px){.navbar-desktop{display:none!important;}}@media (min-width:901px){.navbar-mobile-btn{display:none!important;}}"}</style>
    </nav>
  );
}