import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const featuredProjects = projects.filter((p) => p.featured);

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-24 bg-gray-50 dark:bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent-teal/10 text-accent-teal text-sm font-semibold tracking-wide mb-4">
            🚀 Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-accent-teal">Work</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of real-world AI/ML and web projects I've built.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white dark:bg-primary-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-primary-700 relative overflow-hidden flex flex-col h-full"
            >
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
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
        </div>

        {/* View All Projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm font-mono mb-6">
            Showing {featuredProjects.length} of {projects.length} projects
          </p>

          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-700 text-primary-900 dark:text-white font-medium hover:border-accent-teal hover:text-accent-teal transition-colors shadow-sm group"
            >
              View All Projects
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-primary-800 group-hover:bg-accent-teal/10">
                →
              </span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
