import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPython, FaReact, FaNodeJs, FaDocker, FaGitAlt,
} from "react-icons/fa";
import {
  SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv,
  SiMongodb, SiJupyter, SiNumpy, SiPandas,
} from "react-icons/si";

const skillGroups = [
  {
    category: "AI / Machine Learning",
    color: "#00d4ff",
    skills: [
      { name: "Python", icon: <FaPython />, level: 92 },
      { name: "TensorFlow", icon: <SiTensorflow />, level: 85 },
      { name: "PyTorch", icon: <SiPytorch />, level: 80 },
      { name: "Scikit-learn", icon: <SiScikitlearn />, level: 88 },
      { name: "OpenCV", icon: <SiOpencv />, level: 78 },
      { name: "HuggingFace", icon: <span>🤗</span>, level: 72 },
    ],
  },
  {
    category: "Data & Tools",
    color: "#7c3aed",
    skills: [
      { name: "NumPy / Pandas", icon: <SiNumpy />, level: 90 },
      { name: "Jupyter", icon: <SiJupyter />, level: 95 },
      { name: "Git", icon: <FaGitAlt />, level: 85 },
      { name: "Docker", icon: <FaDocker />, level: 68 },
      { name: "MongoDB", icon: <SiMongodb />, level: 75 },
    ],
  },
  {
    category: "Web Development",
    color: "#ec4899",
    skills: [
      { name: "React", icon: <FaReact />, level: 82 },
      { name: "Node.js", icon: <FaNodeJs />, level: 78 },
    ],
  },
];

function SkillBar({ name, icon, level, color, inView, delay }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", fontSize: "14px", fontWeight: 500 }}>
          <span style={{ color, fontSize: "18px" }}>{icon}</span>
          {name}
        </div>
        <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{level}%</span>
      </div>
      <div style={{
        height: "6px", borderRadius: "999px",
        background: "rgba(255,255,255,0.06)", overflow: "hidden"
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          style={{
            height: "100%", borderRadius: "999px",
            background: `linear-gradient(90deg, ${color}, ${color}88)`
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} style={{ background: "var(--bg-primary)", position: "relative" }}>
      <div className="grid-bg" />
      <div className="section-wrapper" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span className="section-tag">⚡ Technical Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Specialized in AI/ML technologies with strong full-stack capabilities.
          </p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px"
        }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="glass"
              style={{ padding: "28px" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: 4, height: 24, borderRadius: "2px",
                  background: group.color
                }} />
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {group.category}
                </h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color={group.color}
                  inView={inView}
                  delay={gi * 0.15 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Icon cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: "56px", display: "flex",
            flexWrap: "wrap", gap: "16px", justifyContent: "center"
          }}
        >
          {[
            { icon: <FaPython />, label: "Python" },
            { icon: <SiTensorflow />, label: "TensorFlow" },
            { icon: <SiPytorch />, label: "PyTorch" },
            { icon: <FaReact />, label: "React" },
            { icon: <SiMongodb />, label: "MongoDB" },
            { icon: <FaDocker />, label: "Docker" },
            { icon: <SiPandas />, label: "Pandas" },
            { icon: <SiOpencv />, label: "OpenCV" },
            { icon: <span>🤗</span>, label: "HuggingFace" },
          ].map(({ icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.15, borderColor: "var(--accent-blue)" }}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                fontSize: "13px", color: "var(--text-secondary)",
                cursor: "default", transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: "16px", color: "var(--accent-blue)" }}>{icon}</span>
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}