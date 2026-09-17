import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import './index.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SyedAI from "./components/SyedAI";
import AllProjects from "./pages/AllProjects";
import Achievements from "./components/Achievements";
import AllAchievements from "./pages/AllAchievements";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

// Subtle cursor spotlight effect
function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div
      className="cursor-spotlight"
      style={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}

function HomePage() {
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <div style={{ background: "var(--surface-base)", color: "var(--text-primary)", minHeight: "100vh", overflowX: "hidden" }}>
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar aiEnabled={aiEnabled} setAiEnabled={setAiEnabled} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
      </main>
      {aiEnabled && <SyedAI onClose={() => setAiEnabled(false)} />}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/achievements" element={<AllAchievements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
