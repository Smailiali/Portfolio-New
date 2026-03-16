'use client'

import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

/* ============================================
   "WHAT'S NEXT" TEASER CARD
   ============================================ */
function TeaserCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
      style={{ opacity: 0.65 }}
    >
      {/* Animated dashed border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '1px dashed #333',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="flex flex-col items-center justify-center gap-4 py-14 px-8 text-center">
        {/* Pulsing dot */}
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--accent)' }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div>
          <p
            className="font-mono text-xs mb-2 tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            {'// coming soon'}
          </p>
          <h3
            className="font-mono font-semibold mb-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)' }}
          >
            More projects in the pipeline.
          </h3>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
            Stay tuned.
          </p>
        </div>

        {/* Terminal blink cursor */}
        <span
          className="font-mono text-sm animate-blink"
          style={{ color: 'var(--accent)' }}
        >
          _
        </span>
      </div>
    </motion.div>
  )
}

/* ============================================
   PROJECTS SECTION
   ============================================ */
export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          PROJECTS
        </motion.p>

        {/* Subheading */}
        <motion.p
          className="font-sans text-sm mt-2 mb-12"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {"Things I've built that actually get used."}
        </motion.p>

        {/* Project cards — stacked, alternating layout */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              reverse={i % 2 !== 0}
              index={i}
            />
          ))}

          {/* Teaser */}
          <TeaserCard />
        </div>
      </div>

      {/* Bottom divider */}
      <div className="container-custom mt-20">
        <div
          className="h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            opacity: 0.25,
          }}
        />
      </div>
    </section>
  )
}
