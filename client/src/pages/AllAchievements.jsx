import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

export default function AllAchievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = achievements.filter((a) => {
    return (
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          All Achievements
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
              🏆 Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              All <span className="text-accent-teal">Achievements</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              A complete list of my certifications and milestones.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center max-w-lg mx-auto mb-10">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search achievements by title, issuer, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/50 transition-shadow text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white dark:bg-primary-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-primary-700 relative overflow-hidden flex flex-col h-full"
                >
                  {/* Featured badge */}
                  {achievement.featured && (
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-accent-teal/90 text-white rounded-full text-xs font-semibold shadow-md">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image Section */}
                  <div className="h-48 w-full relative overflow-hidden bg-gray-100 dark:bg-primary-800">
                    {achievement.image ? (
                      <img 
                        src={achievement.image} 
                        alt={achievement.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🏅
                      </div>
                    )}
                    {/* Color accent top bar overlay */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 z-10" 
                      style={{ background: achievement.color || '#0d9488' }} 
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex flex-col gap-2 mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {achievement.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-semibold font-mono"
                          style={{ color: achievement.color || '#0d9488' }}
                        >
                          {achievement.issuer}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {achievement.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                      {achievement.desc}
                    </p>
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
              <p className="font-mono">No achievements found matching your criteria.</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
