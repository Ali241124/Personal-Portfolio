import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section tracking
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(2, 4, 16, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
          whileHover={{ scale: 1.05 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: "10px",
            background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-mono)",
            color: "white", boxShadow: "0 0 20px rgba(0,212,255,0.4)"
          }}>
            AI
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "17px", color: "var(--text-primary)" }}>
            Syed Ali Hassan
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <ul style={{ display: "flex", gap: "6px", listStyle: "none", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                whileHover={{ 
                  scale: 1.1,
                  color: "var(--accent-blue)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  display: "block",
                  color: activeSection === link.href.slice(1) ? "var(--accent-blue)" : "var(--text-secondary)",
                  background: activeSection === link.href.slice(1) ? "rgba(0,212,255,0.08)" : "transparent",
                  transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
          <li>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.4)"
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginLeft: "8px",
                padding: "9px 24px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                color: "white",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0,212,255,0.25)",
                display: "block",
              }}
            >
              Hire Me
            </motion.a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "none", flexDirection: "column", gap: "5px", padding: "4px"
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 0 ? { rotate: 45, y: 7 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: "block", width: 24, height: 2,
                background: "var(--accent-blue)", borderRadius: 2,
                transformOrigin: "center"
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 72, left: 0, right: 0, zIndex: 99,
              background: "rgba(2,4,16,0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(0,212,255,0.1)", padding: "16px 24px 24px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{
                  display: "block", padding: "14px 0",
                  borderBottom: "1px solid rgba(0,212,255,0.07)",
                  color: activeSection === link.href.slice(1) ? "var(--accent-blue)" : "var(--text-secondary)",
                  fontWeight: 500, fontSize: "16px", textDecoration: "none"
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}