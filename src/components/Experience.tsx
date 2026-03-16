'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences, TAG_STYLES } from '@/data/experience'
import type { ExperienceTag } from '@/data/experience'

/* ============================================
   TAG PILL
   ============================================ */
function TagPill({ tag }: { tag: ExperienceTag }) {
  const s = TAG_STYLES[tag]
  return (
    <span
      className="inline-block font-mono text-[10px] px-2 py-0.5 tracking-wide"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {tag}
    </span>
  )
}

/* ============================================
   DETAIL CARD (shared between mobile + desktop)
   ============================================ */
function DetailCard({ index }: { index: number }) {
  const exp = experiences[index]
  return (
    <div
      className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
      style={{ borderTopColor: 'var(--accent)', borderTopWidth: 2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
        <div>
          {/* Company + role */}
          <p className="font-mono text-xs text-[var(--text-muted)] mb-1 tracking-wide">
            {exp.dateRange} &nbsp;·&nbsp; {exp.location}
          </p>
          <h3
            className="font-mono font-bold mb-0.5"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-primary)' }}
          >
            {exp.company}
          </h3>
          <p className="font-mono text-sm mb-4" style={{ color: 'var(--accent)' }}>
            {exp.role}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {exp.tags.map(tag => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>

          {/* Bullets */}
          <ul className="space-y-3">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="font-mono text-base shrink-0 mt-0.5 leading-5"
                  style={{ color: 'var(--accent)' }}
                >
                  ›
                </span>
                <span
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ============================================
   EXPERIENCE SECTION
   ============================================ */
export default function Experience() {
  const [selected, setSelected] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleSelect = (index: number) => {
    if (index === selected) return
    setDirection(index > selected ? 1 : -1)
    setSelected(index)
  }

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          EXPERIENCE
        </motion.p>

        {/* ─────────────────────────────────
            MOBILE: vertical timeline
            ───────────────────────────────── */}
        <div className="md:hidden mt-10 space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Left: vertical line + node */}
              <div className="flex flex-col items-center shrink-0 pt-1">
                <div
                  className="w-px"
                  style={{
                    height: i === 0 ? 8 : 16,
                    background: 'var(--border)',
                  }}
                />
                <div
                  className="w-3 h-3 rounded-full shrink-0 relative"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(0,229,255,0.5)',
                  }}
                />
                {i < experiences.length - 1 && (
                  <div
                    className="w-px flex-1 min-h-[5rem]"
                    style={{ background: 'var(--border)' }}
                  />
                )}
              </div>

              {/* Right: content card */}
              <div className="pb-10 flex-1 min-w-0">
                <p
                  className="font-mono text-[10px] tracking-wide mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {exp.dateRange} · {exp.location}
                </p>
                <h3
                  className="font-mono font-bold text-base mb-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {exp.company}
                </h3>
                <p
                  className="font-mono text-xs mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  {exp.role}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {exp.tags.map(tag => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2 items-start">
                      <span
                        className="font-mono text-sm shrink-0"
                        style={{ color: 'var(--accent)' }}
                      >
                        ›
                      </span>
                      <span
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─────────────────────────────────
            DESKTOP: horizontal timeline
            ───────────────────────────────── */}
        <motion.div
          className="hidden md:block mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Timeline strip */}
          <div className="relative py-3">
            {/* Connecting line — inset to span node-center to node-center */}
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: 'calc(100% / 6)',
                right: 'calc(100% / 6)',
                height: 1,
                background:
                  'linear-gradient(90deg, transparent 0%, #2a2a2a 8%, #333 50%, #2a2a2a 92%, transparent 100%)',
              }}
            />

            {/* Nodes grid */}
            <div className="grid grid-cols-3 gap-4 relative z-10">
              {experiences.map((exp, i) => {
                const isActive = selected === i
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleSelect(i)}
                    className="flex flex-col items-center gap-3 cursor-none group"
                    aria-pressed={isActive}
                    aria-label={`Select ${exp.company}`}
                  >
                    {/* Company name */}
                    <p
                      className="font-mono text-xs text-center leading-tight transition-colors duration-200 px-2 truncate w-full"
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {exp.company}
                    </p>

                    {/* Node circle */}
                    <div className="relative flex items-center justify-center">
                      {/* Pulse ring on active */}
                      {isActive && (
                        <motion.div
                          className="absolute rounded-full"
                          style={{ background: 'rgba(0,229,255,0.15)' }}
                          animate={{ width: [24, 36, 24], height: [24, 36, 24], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 relative z-10 transition-all duration-200"
                        animate={
                          isActive
                            ? {
                                backgroundColor: 'var(--accent)',
                                borderColor: 'var(--accent)',
                                boxShadow: '0 0 12px rgba(0,229,255,0.6), 0 0 24px rgba(0,229,255,0.2)',
                              }
                            : {
                                backgroundColor: '#1a1a1a',
                                borderColor: '#333',
                                boxShadow: 'none',
                              }
                        }
                      />
                    </div>

                    {/* Date range */}
                    <p
                      className="font-mono text-[10px] text-center transition-colors duration-200"
                      style={{
                        color: isActive ? 'var(--accent)' : '#444',
                      }}
                    >
                      {exp.dateRange}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Animated detail card */}
          <div className="mt-6" style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selected}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir * 50 }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: number) => ({ opacity: 0, x: dir * -50 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <DetailCard index={selected} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="container-custom mt-20"
      >
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
