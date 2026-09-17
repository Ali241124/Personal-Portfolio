import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "web", label: "Web" },
];

export default function AllProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.category === filter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-gray-50 dark:bg-primary-900 text-gray-900 dark:text-white min-h-screen overflow-x-hidden">
      {/* ── Top nav bar ── */}
      <nav className="sticky top-0 z-50 flex items-center gap-4 px-6 md:px-10 py-4 bg-white/80 dark:bg-primary-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-primary-800">
        <Link to="/" id="back-to-home-link">
          <motion.button
            id="back-to-home-btn"
            whileHover={{ x: -4, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-teal/10 border border-accent-teal/20 rounded-full text-accent-teal font-medium text-sm transition-colors hover:bg-accent-teal/20"
          >
            ← Back to Home
          </motion.button>
        </Link>
        <span className="font-serif text-lg font-bold text-gray-900 dark:text-white ml-2">
          All Projects
        </span>
      </nav>

      {/* ── Main content ── */}
      <section ref={ref} className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent-teal/10 text-accent-teal text-sm font-semibold tracking-wide mb-4">
              📂 Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              All <span className="text-accent-teal">Projects</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Every project I've built — from AI/ML experiments to full-stack web apps.
            </p>

            {/* Filters and Search Container */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center max-w-4xl mx-auto mb-10">
              {/* Filter tabs */}
              <div className="flex gap-2 flex-wrap justify-center">
                {FILTERS.map(({ key, label }) => (
                  <motion.button
                    key={key}
                    id={`filter-${key}`}
                    onClick={() => setFilter(key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${
                      filter === key 
                        ? 'border-accent-teal bg-accent-teal/10 text-accent-teal' 
                        : 'border-gray-200 dark:border-primary-700 bg-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-primary-600'
                    }`}
                  >
                    {label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === key ? 'bg-accent-teal/20' : 'bg-gray-100 dark:bg-primary-800'
                    }`}>
                      {key === "all" ? projects.length : projects.filter(p => p.category === key).length}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/50 transition-shadow text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white dark:bg-primary-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-primary-700 relative overflow-hidden flex flex-col h-full"
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-accent-teal/90 text-white rounded-full text-xs font-semibold shadow-md">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image Section */}
                  <div className="h-48 w-full relative overflow-hidden bg-gray-100 dark:bg-primary-800">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {project.emoji}
                      </div>
                    )}
                    {/* Color accent top bar overlay */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 z-10" 
                      style={{ background: project.color || '#0d9488' }} 
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${project.color || '#0d9488'}15` }}
                        >
                          {project.emoji}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight pr-2">
                          {project.title}
                        </h3>
                      </div>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-primary-800 flex items-center justify-center text-gray-500 hover:text-accent-teal hover:bg-accent-teal/10 transition-colors shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium"
                          style={{ 
                            backgroundColor: `${project.color || '#0d9488'}10`,
                            color: project.color || '#0d9488',
                            borderColor: `${project.color || '#0d9488'}30`,
                            borderWidth: '1px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500 dark:text-gray-400"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-mono">No projects found matching your criteria.</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
