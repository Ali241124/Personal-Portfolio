import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ aiEnabled = false, setAiEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (location.pathname !== "/") return;
      const sections = navLinks.map((l) => l.href.slice(1));
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
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(9, 13, 22, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo Brand */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                scrollTo("#home");
              }
            }}
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
                border: "1px solid var(--accent-ring)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--accent-secondary)",
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)",
              }}
            >
              AH
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                Syed Ali Hassan
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-secondary)",
                  letterSpacing: "0.02em",
                }}
              >
                AI Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: 4 }}
            className="navbar-desktop"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  style={{
                    padding: "7px 13px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                    background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                    border: isActive ? "1px solid var(--border-strong)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="/SyedAliHassan-Resume(AI).pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: 12,
                padding: "8px 18px",
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              Resume ↗
            </a>

            {setAiEnabled && (
              <div
                style={{
                  marginLeft: 12,
                  paddingLeft: 12,
                  borderLeft: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  AI
                </span>
                <button
                  onClick={() => setAiEnabled(!aiEnabled)}
                  role="switch"
                  aria-checked={aiEnabled}
                  aria-label="Toggle AI Assistant"
                  style={{
                    position: "relative",
                    width: 38,
                    height: 20,
                    borderRadius: 10,
                    background: aiEnabled ? "var(--accent-gradient)" : "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      left: aiEnabled ? 20 : 2,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      transition: "left 0.2s ease",
                      display: "block",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                  />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="navbar-mobile-btn"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              cursor: "pointer",
              padding: "9px 10px",
              color: "var(--text-primary)",
            }}
          >
            <div style={{ width: 20, display: "flex", flexDirection: "column", gap: 5 }}>
              <span
                style={{
                  display: "block",
                  height: 2,
                  width: "100%",
                  background: "currentColor",
                  borderRadius: 1,
                  transition: "transform 0.25s",
                  transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 2,
                  width: "100%",
                  background: "currentColor",
                  borderRadius: 1,
                  transition: "opacity 0.25s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 2,
                  width: "100%",
                  background: "currentColor",
                  borderRadius: 1,
                  transition: "transform 0.25s",
                  transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              borderBottom: "1px solid var(--border)",
              background: "rgba(9, 13, 22, 0.98)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ padding: "16px 24px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  style={{
                    display: "block",
                    padding: "12px 14px",
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: 8,
                    textDecoration: "none",
                    color: activeSection === link.href.slice(1) ? "var(--accent-secondary)" : "var(--text-secondary)",
                    background: activeSection === link.href.slice(1) ? "rgba(99, 102, 241, 0.1)" : "transparent",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/SyedAliHassan-Resume(AI).pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 12,
                  padding: "12px 20px",
                  borderRadius: 8,
                  background: "var(--accent-gradient)",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop { display: none !important; }
        }
        @media (min-width: 901px) {
          .navbar-mobile-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
