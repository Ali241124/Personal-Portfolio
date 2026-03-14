import { motion } from "framer-motion";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Ali241124", icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syedalihassan24", icon: "💼" },
  { label: "Email", href: "mailto:syedali.hassan2040@gmail.com", icon: "✉️" },
];

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "var(--bg-primary)",
      borderTop: "1px solid rgba(0,212,255,0.1)",
      position: "relative"
    }}>
      <div className="grid-bg" style={{ opacity: 0.3 }} />
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "48px 24px 32px", position: "relative", zIndex: 1
      }}>

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "24px",
          marginBottom: "36px"
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 34, height: 34, borderRadius: "8px",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-mono)",
              color: "white"
            }}>
              AI
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "16px" }}>
              Syed Ali Hassan
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{
                  padding: "6px 12px", borderRadius: "6px",
                  fontSize: "13px", color: "var(--text-secondary)",
                  textDecoration: "none", transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-blue)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.15, borderColor: "var(--accent-blue)" }}
                title={label}
                style={{
                  width: 36, height: 36, borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "17px", textDecoration: "none", transition: "border-color 0.2s"
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "24px" }} />

        {/* Bottom */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "12px"
        }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Syed Ali Hassan. Built with React & ❤️
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.08, borderColor: "var(--accent-blue)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 16px", borderRadius: "8px",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "var(--accent-blue)", fontSize: "13px", fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
              transition: "all 0.2s"
            }}
          >
            ↑ Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
