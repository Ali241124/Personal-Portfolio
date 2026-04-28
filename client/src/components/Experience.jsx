import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    year: "2024 – Present",
    title: "AI/ML Developer",
    place: "Independent Projects & Research",
    type: "work",
    description: "Building end-to-end machine learning pipelines: data collection, model training (TensorFlow, PyTorch), REST API deployment, and React frontends.",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    color: "#00d4ff",
  },
  {
    year: "2022 – Present",
    title: "BS Computer Science",
    place: "University Of Central Punjab, Lahore",
    type: "education",
    description: "Pursuing a degree with focus on Artificial Intelligence, Machine Learning, Data Structures, Algorithms, and Software Engineering.",
    tags: ["AI", "ML", "Algorithms", "Data Structures"],
    color: "#7c3aed",
  },
  {
    year: "2024",
    title: "Deep Learning Specialization",
    place: "Coursera / deeplearning.ai",
    type: "cert",
    description: "Completed Andrew Ng's 5-course Deep Learning Specialization covering neural networks, CNNs, RNNs, and sequence models.",
    tags: ["Neural Networks", "CNN", "RNN", "Coursera"],
    color: "#10b981",
  },
  {
    year: "2023",
    title: "Machine Learning with Python",
    place: "IBM / Coursera",
    type: "cert",
    description: "Completed supervised and unsupervised learning, model evaluation, and scikit-learn fundamentals.",
    tags: ["Scikit-learn", "Regression", "Clustering"],
    color: "#f59e0b",
  },
];

const typeIcon = { work: "💼", education: "🎓", cert: "🏆" };

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--bg-primary)", position: "relative" }}>
      <div className="grid-bg" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span className="section-tag">📅 Experience & Education</span>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Education, certifications, and hands-on development experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute", left: "24px", top: 0, bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, #00d4ff, #7c3aed, #10b981)",
              transformOrigin: "top", borderRadius: "1px"
            }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ display: "flex", gap: "28px", marginBottom: "36px", position: "relative" }}
            >
              {/* Dot */}
              <div style={{ flexShrink: 0, paddingTop: "18px" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.4, type: "spring" }}
                  style={{
                    width: 50, height: 50, borderRadius: "50%",
                    background: `${item.color}15`,
                    border: `2px solid ${item.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px",
                    boxShadow: `0 0 20px ${item.color}30`,
                  }}
                >
                  {typeIcon[item.type]}
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 6 }}
                className="glass"
                style={{ flex: 1, padding: "22px 24px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: item.color, fontWeight: 500 }}>{item.place}</p>
                  </div>
                  <span style={{
                    padding: "4px 12px", borderRadius: "100px",
                    background: `${item.color}15`, border: `1px solid ${item.color}30`,
                    fontSize: "12px", color: item.color,
                    fontFamily: "var(--font-mono)", height: "fit-content"
                  }}>
                    {item.year}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "14px" }}>
                  {item.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "3px 10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px", fontSize: "11px",
                      color: "var(--text-muted)", fontFamily: "var(--font-mono)"
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
