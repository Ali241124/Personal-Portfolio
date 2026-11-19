import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import './index.css';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SyedAI from "./components/SyedAI";
import AllProjects from "./pages/AllProjects";
import AllAchievements from "./pages/AllAchievements";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function HomePage() {
  const [aiEnabled, setAiEnabled] = useState(false);
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-1)', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="noise-overlay" aria-hidden="true" />
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

export default function App() {
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
