import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import achievements from "../data/achievements";

const featured = achievements.filter((a) => a.featured);

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={ref} className="py-24 bg-white dark:bg-primary-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent-teal/10 text-accent-teal text-sm font-semibold tracking-wide mb-4">
            🏆 Certifications
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Key <span className="text-accent-teal">Achievements</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Certifications and courses that have shaped my technical foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-gray-50 dark:bg-primary-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-primary-700 relative overflow-hidden flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="h-48 w-full relative overflow-hidden bg-gray-200 dark:bg-primary-900">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Color accent top bar overlay */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 z-10" 
                  style={{ background: item.color || '#0d9488' }} 
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-sm font-semibold font-mono"
                      style={{ color: item.color || '#0d9488' }}
                    >
                      {item.issuer}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {item.date}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Achievements button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm font-mono mb-6">
            Showing {featured.length} of {achievements.length} achievements
          </p>

          <Link to="/achievements">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-50 dark:bg-primary-800 border border-gray-200 dark:border-primary-700 text-primary-900 dark:text-white font-medium hover:border-accent-teal hover:text-accent-teal transition-colors shadow-sm group"
            >
              View All Achievements
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primary-900 group-hover:bg-accent-teal/10">
                →
              </span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
