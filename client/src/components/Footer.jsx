import { motion } from "framer-motion";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience",   href: "#experience" },
  { label: "Contact",      href: "#contact" },
];

const socials = [
  { label: "GitHub",   href: "https://github.com/Ali241124" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syedalihassan24" },
  { label: "Email",    href: "mailto:syedali.hassan2040@gmail.com" },
];

export default function Footer() {
  const scrollTo = (href) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "var(--surface-base)",
      borderTop: "1px solid var(--border-subtle)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 32px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: "var(--accent-glow)", border: "1px solid var(--accent-ring)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--accent)",
              }}>
                AH
              </div>
              <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>Syed Ali Hassan</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
              Software Engineer · AI & Full-Stack Developer
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" style={{ display: "flex", flexWrap: "wrap", gap: "4px 2px" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{
                  padding: "5px 10px", borderRadius: 5, fontSize: 12,
                  color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: "flex", gap: 8 }}>
            {socials.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                title={label}
                style={{
                  padding: "6px 14px", borderRadius: 7,
                  background: "var(--surface-card)", border: "1px solid var(--border)",
                  fontSize: 12, color: "var(--text-muted)", textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent-dim)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Syed Ali Hassan. Built with React & Framer Motion.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "6px 14px", borderRadius: 7, cursor: "pointer",
              background: "var(--surface-card)", border: "1px solid var(--border)",
              color: "var(--text-muted)", fontSize: 12, fontFamily: "var(--font-mono)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ↑ Back to top
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
