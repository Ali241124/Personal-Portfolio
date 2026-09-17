import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "React Native", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "FastAPI", "REST APIs"],
  },
  {
    title: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch", "Scikit-learn", "HuggingFace", "OpenCV"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "SQL", "Firebase"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Postman", "Jupyter", "NumPy", "Pandas"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} style={{ background: "var(--surface-base)", position: "relative" }}>
      <div className="bg-grid" style={{ opacity: 0.2 }} />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div {...fadeUp()} style={{ marginBottom: 56 }}>
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">What I work with</h2>
          <p className="section-sub">
            Tools and technologies I use regularly across AI/ML and full-stack projects.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp(i * 0.07)}
              style={{
                padding: "22px 24px",
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
              }}
            >
              <p className="skill-group-title">{cat.title}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
