'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

/* ============================================
   BROWSER-FRAME MOCKUP ILLUSTRATIONS
   ============================================ */

function DocAssistIllustration() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="320" height="200" fill="#080808" />

      {/* Browser chrome */}
      <rect width="320" height="32" fill="#141414" />
      {/* Traffic lights */}
      <circle cx="18" cy="16" r="5" fill="#ff5f57" />
      <circle cx="34" cy="16" r="5" fill="#febc2e" />
      <circle cx="50" cy="16" r="5" fill="#28c840" />
      {/* URL bar */}
      <rect x="68" y="8" width="184" height="16" rx="3" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="160" y="19" fill="#555" fontSize="7" textAnchor="middle" fontFamily="monospace">docassist.app</text>

      {/* ── Left panel: document viewer ── */}
      <rect x="0" y="32" width="118" height="168" fill="#0a0a0a" />
      {/* Doc header bar */}
      <rect x="10" y="41" width="64" height="7" rx="1.5" fill="#1e1e1e" />
      <rect x="78" y="41" width="28" height="7" rx="2" fill="#00e5ff15" stroke="#00e5ff30" strokeWidth="0.5" />
      <text x="92" y="47.5" fill="#00e5ff" fontSize="5.5" textAnchor="middle" fontFamily="monospace">PDF</text>

      {/* Text lines */}
      {[58, 68, 78, 88].map((y, i) => (
        <rect key={i} x="10" y={y} width={[96, 82, 90, 74][i]} height="4" rx="1" fill="#1e1e1e" />
      ))}

      {/* Highlighted citation block */}
      <rect x="8" y="100" width="2" height="28" fill="#00e5ff" opacity="0.7" />
      <rect x="14" y="100" width="94" height="5" rx="1" fill="#00e5ff18" />
      <rect x="14" y="109" width="88" height="5" rx="1" fill="#00e5ff18" />
      <rect x="14" y="118" width="72" height="5" rx="1" fill="#00e5ff18" />

      {/* More text lines */}
      {[132, 142, 152].map((y, i) => (
        <rect key={i} x="10" y={y} width={[90, 96, 78][i]} height="4" rx="1" fill="#1a1a1a" />
      ))}

      {/* Panel divider */}
      <line x1="118" y1="32" x2="118" y2="200" stroke="#1e1e1e" strokeWidth="1" />

      {/* ── Right panel: chat interface ── */}
      <rect x="118" y="32" width="202" height="168" fill="#080808" />

      {/* Chat header */}
      <rect x="126" y="38" width="80" height="8" rx="2" fill="#111" />
      <circle cx="216" cy="42" r="4" fill="#00e5ff" opacity="0.5" />
      <rect x="222" y="39" width="36" height="6" rx="1" fill="#1e1e1e" />

      {/* User message bubble (right) */}
      <rect x="196" y="56" width="116" height="26" rx="4" fill="#161616" stroke="#222" strokeWidth="0.5" />
      <rect x="204" y="63" width="100" height="4" rx="1" fill="#2e2e2e" />
      <rect x="204" y="71" width="82" height="4" rx="1" fill="#2e2e2e" />

      {/* AI response bubble (left) */}
      <rect x="126" y="92" width="148" height="44" rx="4" fill="#001a1a" stroke="#00e5ff25" strokeWidth="0.5" />
      {/* AI icon */}
      <circle cx="138" cy="100" r="4" fill="#00e5ff" opacity="0.6" />
      <rect x="148" y="97" width="116" height="4" rx="1" fill="#00e5ff35" />
      <rect x="148" y="105" width="100" height="4" rx="1" fill="#00e5ff28" />
      <rect x="148" y="113" width="80" height="4" rx="1" fill="#00e5ff20" />
      {/* Page citation badge */}
      <rect x="148" y="122" width="34" height="9" rx="2" fill="#00e5ff20" stroke="#00e5ff40" strokeWidth="0.5" />
      <text x="165" y="129.5" fill="#00e5ff" fontSize="5.5" textAnchor="middle" fontFamily="monospace">↗ p.12</text>

      {/* Second user message */}
      <rect x="220" y="148" width="92" height="16" rx="4" fill="#161616" stroke="#222" strokeWidth="0.5" />
      <rect x="228" y="154" width="76" height="4" rx="1" fill="#2e2e2e" />

      {/* Input bar */}
      <rect x="126" y="174" width="184" height="18" rx="3" fill="#0f0f0f" stroke="#1e1e1e" strokeWidth="0.5" />
      <rect x="134" y="180" width="100" height="4" rx="1" fill="#1e1e1e" />
      {/* Send button */}
      <rect x="296" y="175" width="16" height="16" rx="3" fill="#00e5ff20" stroke="#00e5ff40" strokeWidth="0.5" />
      <text x="304" y="186" fill="#00e5ff" fontSize="8" textAnchor="middle">›</text>
    </svg>
  )
}

function DSAMasteryIllustration() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="320" height="200" fill="#080808" />

      {/* Browser chrome */}
      <rect width="320" height="32" fill="#141414" />
      <circle cx="18" cy="16" r="5" fill="#ff5f57" />
      <circle cx="34" cy="16" r="5" fill="#febc2e" />
      <circle cx="50" cy="16" r="5" fill="#28c840" />
      <rect x="68" y="8" width="184" height="16" rx="3" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="160" y="19" fill="#555" fontSize="7" textAnchor="middle" fontFamily="monospace">dsa-mastery.app</text>

      {/* ── Left panel: problem list ── */}
      <rect x="0" y="32" width="120" height="168" fill="#0a0a0a" />

      {/* Stats row */}
      <rect x="8" y="40" width="50" height="8" rx="1.5" fill="#ffb30015" />
      <text x="33" y="47" fill="#ffb300" fontSize="6" textAnchor="middle" fontFamily="monospace">65+ Problems</text>

      {/* Stat badges */}
      <rect x="8" y="54" width="32" height="18" rx="2" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="24" y="61" fill="#ffb300" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">65+</text>
      <text x="24" y="69" fill="#555" fontSize="4.5" textAnchor="middle" fontFamily="monospace">probs</text>
      <rect x="46" y="54" width="32" height="18" rx="2" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="62" y="61" fill="#00e5ff" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">22</text>
      <text x="62" y="69" fill="#555" fontSize="4.5" textAnchor="middle" fontFamily="monospace">topics</text>

      {/* Progress bar */}
      <rect x="8" y="78" width="104" height="4" rx="2" fill="#111" />
      <rect x="8" y="78" width="72" height="4" rx="2" fill="#ffb300" opacity="0.7" />
      <text x="8" y="89" fill="#555" fontSize="5" fontFamily="monospace">22/30 completed</text>

      {/* Problem list items */}
      {[
        { y: 96, label: 'Two Sum', diff: 'Easy', diffColor: '#00e5ff', bg: '#00e5ff12', done: true },
        { y: 116, label: 'Merge Intervals', diff: 'Med', diffColor: '#ffb300', bg: '#ffb30008', done: false },
        { y: 136, label: 'LRU Cache', diff: 'Hard', diffColor: '#ff5f57', bg: '#ff5f5708', done: false },
        { y: 156, label: 'Dijkstra\'s Algo', diff: 'Hard', diffColor: '#ff5f57', bg: 'transparent', done: false },
      ].map((item, i) => (
        <g key={i}>
          <rect x="8" y={item.y} width="104" height="16" rx="2" fill={item.bg} stroke={i === 0 ? '#00e5ff20' : '#1a1a1a'} strokeWidth="0.5" />
          <circle cx="18" cy={item.y + 8} r="3" fill={item.done ? '#00e5ff' : '#2a2a2a'} />
          <rect x="26" y={item.y + 5} width={item.done ? 48 : 44} height="4" rx="1" fill={item.done ? '#00e5ff35' : '#2a2a2a'} />
          <rect x="86" y={item.y + 3} width="22" height="10" rx="2" fill={`${item.diffColor}20`} />
          <text x="97" y={item.y + 10.5} fill={item.diffColor} fontSize="5" textAnchor="middle" fontFamily="monospace">{item.diff}</text>
        </g>
      ))}

      {/* Panel divider */}
      <line x1="120" y1="32" x2="120" y2="200" stroke="#1e1e1e" strokeWidth="1" />

      {/* ── Right panel: code editor ── */}
      <rect x="120" y="32" width="200" height="168" fill="#060606" />

      {/* Line number gutter */}
      <rect x="120" y="32" width="20" height="168" fill="#0a0a0a" />
      {[40, 52, 64, 76, 88, 100, 112, 124].map((y, i) => (
        <text key={i} x="135" y={y + 4} fill="#2a2a2a" fontSize="6" textAnchor="end" fontFamily="monospace">{i + 1}</text>
      ))}

      {/* Code lines (syntax highlighted) */}
      {/* function twoSum */}
      <rect x="146" y="38" width="28" height="5" rx="1" fill="#569cd660" />
      <rect x="178" y="38" width="36" height="5" rx="1" fill="#9cdcfe50" />
      <rect x="218" y="38" width="12" height="5" rx="1" fill="#6b728060" />

      {/* const seen = new Map() */}
      <rect x="154" y="50" width="24" height="5" rx="1" fill="#569cd660" />
      <rect x="182" y="50" width="20" height="5" rx="1" fill="#9cdcfe50" />
      <rect x="206" y="50" width="44" height="5" rx="1" fill="#6b728050" />

      {/* for (let i = 0) */}
      <rect x="154" y="62" width="16" height="5" rx="1" fill="#c586c060" />
      <rect x="174" y="62" width="52" height="5" rx="1" fill="#9cdcfe50" />

      {/* if (seen.has...) — highlighted active line */}
      <rect x="162" y="74" width="96" height="8" rx="1.5" fill="#00e5ff08" stroke="#00e5ff15" strokeWidth="0.5" />
      <rect x="166" y="77" width="12" height="4" rx="1" fill="#c586c060" />
      <rect x="182" y="77" width="64" height="4" rx="1" fill="#6b728060" />

      {/* return [seen.get, i] */}
      <rect x="170" y="88" width="22" height="5" rx="1" fill="#569cd660" />
      <rect x="196" y="88" width="60" height="5" rx="1" fill="#00e5ff45" />

      {/* seen.set(nums[i], i) */}
      <rect x="162" y="100" width="80" height="5" rx="1" fill="#6b728060" />

      {/* closing brackets */}
      <rect x="154" y="112" width="6" height="5" rx="1" fill="#6b728060" />
      <rect x="146" y="124" width="6" height="5" rx="1" fill="#6b728060" />

      {/* AI translation panel at bottom */}
      <rect x="128" y="152" width="182" height="38" rx="3" fill="#0d0d0d" stroke="#ffb30025" strokeWidth="0.5" />
      <circle cx="140" cy="163" r="5" fill="#ffb300" opacity="0.5" />
      <rect x="152" y="159" width="60" height="5" rx="1" fill="#ffb30035" />
      <rect x="152" y="168" width="90" height="4" rx="1" fill="#ffb30020" />
      {/* Language badges */}
      {['JS', 'Py', 'Go', '+9'].map((lang, i) => (
        <g key={lang}>
          <rect x={248 + i * 16} y={157} width="14" height="12" rx="2" fill="#ffb30015" stroke="#ffb30025" strokeWidth="0.5" />
          <text x={255 + i * 16} y={165.5} fill="#ffb300" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{lang}</text>
        </g>
      ))}
    </svg>
  )
}

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  docassist: <DocAssistIllustration />,
  'dsa-mastery': <DSAMasteryIllustration />,
}

/* ============================================
   PROJECT CARD
   ============================================ */
interface ProjectCardProps {
  project: Project
  reverse?: boolean
  index?: number
}

export default function ProjectCard({ project, reverse = false, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)
  const animatingRef = useRef(false)
  const tiltCurrent = useRef({ x: 0, y: 0 })
  const tiltTarget = useRef({ x: 0, y: 0 })
  const glowCurrent = useRef({ x: 50, y: 50 })
  const glowTarget = useRef({ x: 50, y: 50 })
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    // Disable on touch devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const MAX = 4

    const runFrame = () => {
      tiltCurrent.current.x = lerp(tiltCurrent.current.x, tiltTarget.current.x, 0.1)
      tiltCurrent.current.y = lerp(tiltCurrent.current.y, tiltTarget.current.y, 0.1)
      glowCurrent.current.x = lerp(glowCurrent.current.x, glowTarget.current.x, 0.08)
      glowCurrent.current.y = lerp(glowCurrent.current.y, glowTarget.current.y, 0.08)

      setTransform(
        `perspective(1000px) rotateX(${tiltCurrent.current.x.toFixed(3)}deg) rotateY(${tiltCurrent.current.y.toFixed(3)}deg)`
      )
      setGlowPos({ x: Math.round(glowCurrent.current.x), y: Math.round(glowCurrent.current.y) })

      const diff =
        Math.abs(tiltCurrent.current.x - tiltTarget.current.x) +
        Math.abs(tiltCurrent.current.y - tiltTarget.current.y)

      if (diff > 0.005) {
        frameRef.current = requestAnimationFrame(runFrame)
      } else {
        animatingRef.current = false
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width
      const ny = (e.clientY - rect.top) / rect.height
      tiltTarget.current = { x: (0.5 - ny) * MAX * 2, y: (nx - 0.5) * MAX * 2 }
      glowTarget.current = { x: nx * 100, y: ny * 100 }
      if (!animatingRef.current) {
        animatingRef.current = true
        frameRef.current = requestAnimationFrame(runFrame)
      }
    }

    const onMouseEnter = () => setIsHovered(true)

    const onMouseLeave = () => {
      setIsHovered(false)
      tiltTarget.current = { x: 0, y: 0 }
      glowTarget.current = { x: 50, y: 50 }
      if (!animatingRef.current) {
        animatingRef.current = true
        frameRef.current = requestAnimationFrame(runFrame)
      }
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseenter', onMouseEnter)
    card.addEventListener('mouseleave', onMouseLeave)
    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseenter', onMouseEnter)
      card.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const illustration = ILLUSTRATIONS[project.id]

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        transform,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      className="relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-[border-color,box-shadow] duration-300"
      aria-label={`Project: ${project.title}`}
    >
      {/* Border glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `0 0 0 1px ${project.accentColor}40, 0 0 40px ${project.accentColor}10`,
        }}
      />

      {/* Light reflection overlay (follows cursor) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.04) 0%, transparent 65%)`,
        }}
      />

      {/* Card content — responsive split */}
      <div
        className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        {/* ── Mockup pane ── */}
        {/* The SVG illustrations are self-contained browser mockups (include their own
            traffic-light dots and URL bar), so no outer title bar wrapper needed here. */}
        <div className="lg:w-[55%] border-b lg:border-b-0 border-[var(--border)] relative overflow-hidden bg-[#080808] aspect-[8/5] lg:aspect-auto"
          style={{ borderRight: reverse ? 'none' : '1px solid var(--border)', borderLeft: reverse ? '1px solid var(--border)' : 'none' }}
        >
          {illustration ?? (
            <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center py-12">
              <span className="font-mono text-xs text-[#333]">preview unavailable</span>
            </div>
          )}
        </div>

        {/* ── Info pane ── */}
        <div className="lg:w-[45%] p-6 md:p-8 flex flex-col justify-center gap-5">
          {/* Title + tagline */}
          <div>
            <p className="font-mono text-xs mb-2 tracking-widest" style={{ color: project.accentColor, opacity: 0.7 }}>
              featured project
            </p>
            <h3
              className="font-mono font-bold mb-1.5"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <p className="font-sans text-sm italic" style={{ color: 'var(--text-muted)' }}>
              {project.tagline}
            </p>
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.description}
          </p>

          {/* Features 2x2 grid */}
          <div className="grid grid-cols-2 gap-2">
            {project.features.map(f => (
              <div
                key={f.label}
                className="flex items-start gap-2 p-2 border border-[var(--border)]"
                style={{ background: 'var(--surface-2)' }}
              >
                <span className="text-sm shrink-0 mt-0.5" role="img" aria-hidden="true">
                  {f.icon}
                </span>
                <span
                  className="font-sans text-xs leading-snug"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={project.githubUrl}
              className="btn-outline text-xs px-4 py-2 cursor-none"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
            >
              ⎇ GitHub
            </a>
            <a
              href={project.demoUrl}
              className="btn-primary text-xs px-4 py-2 cursor-none"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              style={{ background: project.accentColor }}
            >
              ↗ Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
