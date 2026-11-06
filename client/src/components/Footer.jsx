import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Ali241124" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syedalihassan24" },
  { label: "Email", href: "mailto:syedali.hassan2040@gmail.com" },
];

export default function Footer() {
  const scrollTo = (href) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--surface-base)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 36,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "var(--accent-glow)",
                  border: "1px solid var(--accent-ring)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--accent-secondary)",
                }}
              >
                AH
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                Syed Ali Hassan
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
              Software Engineer · AI & Machine Learning Systems
            </p>
          </div>

          {/* Quick Nav */}
          <nav aria-label="Footer navigation" style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div style={{ display: "flex", gap: 8 }}>
            {socials.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                }}
              >
                {label} ↗
              </motion.a>
            ))}
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
          }}
        >
          <span>© {new Date().getFullYear()} Syed Ali Hassan. All rights reserved.</span>
          <span>Engineered with React 19, Tailwind CSS & Vite</span>
        </div>
      </div>
    </footer>
  );
}
