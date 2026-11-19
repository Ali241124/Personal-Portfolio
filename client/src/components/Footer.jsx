import { motion } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Ali241124",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/syedalihassan24",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:syedali.hassan2040@gmail.com",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

const LINKS = ["Home","About","Skills","Projects","Achievements","Experience","Contact"];

export default function Footer() {
  const scrollTo = href => document.getElementById(href.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      paddingTop: 56,
      paddingBottom: 32,
    }}>
      <div className="container">
        {/* Top row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--grad-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, color: "#fff",
              }}>AH</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-1)" }}>Syed Ali Hassan</div>
                <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--violet)" }}>AI Engineer</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 280 }}>
              Building intelligent, production-ready AI systems and seamless full-stack applications.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {SOCIALS.map(({ label, href, icon }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ y: -3 }}
                  aria-label={label}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    color: "var(--text-2)", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--violet)"; e.currentTarget.style.color = "var(--violet)"; e.currentTarget.style.background = "var(--violet-glow)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.background = "var(--surface)"; }}
                >{icon}</motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {LINKS.map(label => (
                <a key={label} href={`#${label.toLowerCase()}`}
                  onClick={e => { e.preventDefault(); scrollTo(label); }}
                  style={{ fontSize: 14, color: "var(--text-2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-1)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:syedali.hassan2040@gmail.com"
                style={{ fontSize: 14, color: "var(--text-2)", textDecoration: "none" }}>
                syedali.hassan2040@gmail.com
              </a>
              <div style={{ fontSize: 14, color: "var(--text-2)" }}>Lahore, Pakistan</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, color: "var(--violet)",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}/>
                Available for opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          paddingTop: 24, borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "var(--mono)" }}>
            © {new Date().getFullYear()} Syed Ali Hassan. All rights reserved.
          </span>
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>
            Engineered with React 19 · Tailwind CSS · Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
