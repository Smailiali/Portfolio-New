'use client'

import { motion } from 'framer-motion'

const SOURCES = [
  { label: 'Udemy', detail: 'Angela Yu — Full-Stack Web Development' },
  { label: 'Zero to Mastery Academy', detail: 'Web Dev + Prompt Engineering' },
  { label: 'DevBern Bootcamp', detail: 'Intensive full-stack program' },
  { label: 'DevelopedByEd', detail: 'Frontend & React deep-dives' },
]

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          EDUCATION
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-fluid-lg font-mono font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Self-taught.{' '}
          <span style={{ color: 'var(--accent)' }}>Hands-on.</span>
        </motion.h2>

        {/* Closing one-liner */}
        <motion.p
          className="font-sans text-base mb-12 max-w-xl"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          I believe in learning by building. Every project on this site was built to
          solve a real problem.
        </motion.p>

        {/* Source cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOURCES.map((src, i) => (
            <motion.div
              key={src.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative p-5 group"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Index decoration */}
              <span
                className="font-mono text-xs mb-3 block"
                style={{ color: 'var(--text-muted)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <p
                className="font-mono font-semibold text-sm mb-1"
                style={{ color: 'var(--accent)' }}
              >
                {src.label}
              </p>
              <p
                className="font-sans text-xs leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {src.detail}
              </p>

              {/* Bottom accent line — expands on card hover */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--accent)' }}
              />
            </motion.div>
          ))}
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
