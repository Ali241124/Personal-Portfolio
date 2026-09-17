import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    period: "2026 – Present",
    title: "MS Artificial Intelligence",
    place: "University of Engineering and Technology (UET), Lahore",
    type: "education",
    description: "Currently pursuing a master's degree focused on deep learning, natural language processing, and AI systems design.",
    tags: ["Deep Learning", "NLP", "AI Systems"],
  },
  {
    period: "2024 – Present",
    title: "AI/ML Developer",
    place: "Independent Projects & Research",
    type: "work",
    description: "Built end-to-end ML pipelines: data collection, model training (TensorFlow, PyTorch), REST API deployment, and React frontends. Projects include an MNIST classifier, real-time object detector, and BERT-based sentiment analyzer.",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
  },
  {
    period: "2024",
    title: "Deep Learning Specialization",
    place: "Coursera · deeplearning.ai",
    type: "cert",
    description: "Completed Andrew Ng's 5-course specialization covering neural networks, CNNs, RNNs, and sequence models.",
    tags: ["Neural Networks", "CNN", "RNN"],
  },
  {
    period: "2023",
    title: "Machine Learning with Python",
    place: "IBM · Coursera",
    type: "cert",
    description: "Completed supervised and unsupervised learning, model evaluation, and scikit-learn fundamentals.",
    tags: ["Scikit-learn", "Regression", "Clustering"],
  },
  {
    period: "2022 – 2026",
    title: "BS Software Engineering",
    place: "University of Central Punjab, Lahore",
    type: "education",
    description: "Studied software engineering with a focus on AI, machine learning, algorithms, and full-stack development.",
    tags: ["AI", "ML", "Algorithms", "Software Engineering"],
  },
];

const typeLabel = { work: "Work", education: "Education", cert: "Certification" };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--surface-base)", position: "relative" }}>
      <div className="bg-grid" style={{ opacity: 0.15 }} />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-sub">
            My background in software engineering, AI research, and development projects.
          </p>
        </motion.div>

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="timeline-line"
          />

          <div style={{ paddingLeft: 56 }}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                style={{ marginBottom: i === timeline.length - 1 ? 0 : 32, position: "relative" }}
              >
                {/* Dot */}
                <div
                  className="timeline-dot"
                  style={{ position: "absolute", left: -56, top: 2 }}
                >
                  <span style={{ fontSize: 13 }}>
                    {item.type === "work" ? "💼" : item.type === "education" ? "🎓" : "✓"}
                  </span>
                </div>

                {/* Card */}
                <div style={{
                  padding: "20px 22px",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{item.title}</h3>
                      <p style={{ fontSize: 12, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{item.place}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 100,
                        background: "var(--surface-raised)", color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)", border: "1px solid var(--border)",
                        whiteSpace: "nowrap",
                      }}>
                        {typeLabel[item.type]}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 12 }}>
                    {item.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
