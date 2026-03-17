'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '@/utils/hooks'

/* ============================================
   STAT CARD
   ============================================ */
interface StatCardProps {
  target: number
  suffix: string
  label: string
  delay?: number
}

function StatCard({ target, suffix, label, delay = 0 }: StatCardProps) {
  const [triggered, setTriggered] = useState(false)
  const count = useCountUp(target, 1500, triggered)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => setTriggered(true)}
      className="border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col gap-2"
    >
      <span
        className="font-mono font-bold text-[var(--accent)]"
        style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', lineHeight: 1 }}
      >
        {count}{suffix}
      </span>
      <p className="font-sans text-sm text-[var(--text-secondary)] leading-tight">{label}</p>
    </motion.div>
  )
}

const STATS: StatCardProps[] = [
  { target: 3, suffix: '+', label: 'Years of Experience', delay: 0 },
  { target: 4, suffix: '', label: 'AI Pipelines Shipped', delay: 0.1 },
  { target: 75, suffix: '%', label: 'Workflow Efficiency Gain', delay: 0.2 },
  { target: 50, suffix: '+', label: 'Staff Supported', delay: 0.3 },
]

/* ============================================
   ABOUT SECTION
   ============================================ */
export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          ABOUT
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
          {/* Left column — paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <span className="accent-line" />
            <h2
              className="font-mono font-bold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-primary)' }}
            >
              About Me
            </h2>
            <p
              className="font-sans text-base lg:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m a full-stack developer who builds things that actually get used. From
              migrating an entire law firm off legacy software to building AI-powered document
              tools, I care about shipping solutions that make real impact — not just writing
              code for the sake of it.
            </p>
          </motion.div>

          {/* Right column — stat cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(stat => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className="mt-20 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            opacity: 0.3,
          }}
        />
      </div>
    </section>
  )
}
