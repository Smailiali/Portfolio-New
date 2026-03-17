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
      viewBox="0 0 440 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Full base fill — no transparent gaps */}
      <rect width="440" height="300" fill="#080808" />

      {/* ── Browser chrome (y 0–26) ── */}
      <rect width="440" height="26" fill="#111" />
      <circle cx="16" cy="13" r="4.5" fill="#ff5f57" />
      <circle cx="30" cy="13" r="4.5" fill="#febc2e" />
      <circle cx="44" cy="13" r="4.5" fill="#28c840" />
      <rect x="62" y="5" width="210" height="16" rx="3" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="167" y="16.5" fill="#555" fontSize="7" textAnchor="middle" fontFamily="monospace">docassist.app</text>

      {/* ── Left sidebar (x 0–145, y 26–300) ── */}
      <rect x="0" y="26" width="145" height="274" fill="#0c0c0c" />

      {/* Sidebar header */}
      <rect x="0" y="26" width="145" height="20" fill="#0f0f0f" />
      <text x="10" y="39" fill="#555" fontSize="6.5" fontFamily="monospace" letterSpacing="0.08em">DOCUMENTS</text>
      <rect x="122" y="30" width="14" height="12" rx="2" fill="#00e5ff15" stroke="#00e5ff30" strokeWidth="0.5" />
      <text x="129" y="39" fill="#00e5ff" fontSize="8" textAnchor="middle" fontFamily="monospace">+</text>

      {/* PDF item 1 — selected */}
      <rect x="0" y="46" width="145" height="46" fill="#00e5ff08" />
      <rect x="0" y="46" width="3" height="46" fill="#00e5ff" />
      <rect x="10" y="54" width="20" height="24" rx="2" fill="#00e5ff18" stroke="#00e5ff35" strokeWidth="0.5" />
      <text x="20" y="70" fill="#00e5ff" fontSize="6.5" textAnchor="middle" fontFamily="monospace">PDF</text>
      <rect x="36" y="56" width="96" height="5" rx="1" fill="#2a2a2a" />
      <rect x="36" y="65" width="70" height="4" rx="1" fill="#1e1e1e" />
      <text x="36" y="82" fill="#00e5ff" fontSize="5.5" fontFamily="monospace" opacity="0.7">Contract_v3.pdf</text>

      {/* PDF item 2 */}
      <rect x="0" y="92" width="145" height="46" fill="transparent" />
      <rect x="10" y="100" width="20" height="24" rx="2" fill="#1a1a1a" stroke="#252525" strokeWidth="0.5" />
      <text x="20" y="116" fill="#444" fontSize="6.5" textAnchor="middle" fontFamily="monospace">PDF</text>
      <rect x="36" y="102" width="88" height="5" rx="1" fill="#1e1e1e" />
      <rect x="36" y="111" width="64" height="4" rx="1" fill="#181818" />
      <text x="36" y="128" fill="#3a3a3a" fontSize="5.5" fontFamily="monospace">NDA_2026.pdf</text>

      {/* PDF item 3 */}
      <rect x="0" y="138" width="145" height="46" fill="transparent" />
      <rect x="10" y="146" width="20" height="24" rx="2" fill="#1a1a1a" stroke="#252525" strokeWidth="0.5" />
      <text x="20" y="162" fill="#444" fontSize="6.5" textAnchor="middle" fontFamily="monospace">PDF</text>
      <rect x="36" y="148" width="94" height="5" rx="1" fill="#1e1e1e" />
      <rect x="36" y="157" width="58" height="4" rx="1" fill="#181818" />
      <text x="36" y="174" fill="#3a3a3a" fontSize="5.5" fontFamily="monospace">Settlement.pdf</text>

      {/* PDF item 4 */}
      <rect x="0" y="184" width="145" height="46" fill="transparent" />
      <rect x="10" y="192" width="20" height="24" rx="2" fill="#1a1a1a" stroke="#252525" strokeWidth="0.5" />
      <text x="20" y="208" fill="#444" fontSize="6.5" textAnchor="middle" fontFamily="monospace">PDF</text>
      <rect x="36" y="194" width="80" height="5" rx="1" fill="#1e1e1e" />
      <rect x="36" y="203" width="68" height="4" rx="1" fill="#181818" />
      <text x="36" y="220" fill="#3a3a3a" fontSize="5.5" fontFamily="monospace">Lease_Draft.pdf</text>

      {/* Sidebar footer — upload button, fills to y=300 */}
      <rect x="0" y="230" width="145" height="70" fill="#0a0a0a" />
      <rect x="8" y="240" width="129" height="24" rx="3" fill="#141414" stroke="#1e1e1e" strokeWidth="0.5" />
      <text x="72" y="256" fill="#444" fontSize="6.5" textAnchor="middle" fontFamily="monospace">+ Upload document</text>

      {/* Sidebar divider */}
      <line x1="145" y1="26" x2="145" y2="300" stroke="#1e1e1e" strokeWidth="1" />

      {/* ── Right chat panel (x 145–440, y 26–300) ── */}
      <rect x="145" y="26" width="295" height="274" fill="#080808" />

      {/* Chat header */}
      <rect x="145" y="26" width="295" height="26" fill="#0c0c0c" />
      <circle cx="163" cy="39" r="5.5" fill="#00e5ff" opacity="0.55" />
      <rect x="176" y="34" width="72" height="5" rx="1" fill="#1e1e1e" />
      <rect x="176" y="43" width="48" height="4" rx="1" fill="#161616" />
      <rect x="396" y="31" width="36" height="18" rx="3" fill="#00e5ff12" stroke="#00e5ff22" strokeWidth="0.5" />
      <text x="414" y="43" fill="#00e5ff" fontSize="6" textAnchor="middle" fontFamily="monospace">Clear</text>

      {/* User message 1 — right */}
      <rect x="270" y="62" width="162" height="32" rx="4" fill="#161616" stroke="#232323" strokeWidth="0.5" />
      <rect x="280" y="70" width="144" height="5" rx="1" fill="#2a2a2a" />
      <rect x="280" y="79" width="114" height="4" rx="1" fill="#212121" />
      <rect x="280" y="87" width="86" height="4" rx="1" fill="#1c1c1c" />

      {/* AI response 1 — left with citation */}
      <rect x="153" y="104" width="196" height="58" rx="4" fill="#001c1c" stroke="#00e5ff1e" strokeWidth="0.5" />
      <circle cx="167" cy="118" r="5.5" fill="#00e5ff" opacity="0.5" />
      <rect x="180" y="113" width="148" height="5" rx="1" fill="#00e5ff2e" />
      <rect x="180" y="122" width="162" height="4" rx="1" fill="#00e5ff22" />
      <rect x="180" y="131" width="130" height="4" rx="1" fill="#00e5ff18" />
      <rect x="180" y="140" width="100" height="4" rx="1" fill="#00e5ff12" />
      {/* Citations */}
      <rect x="180" y="150" width="44" height="9" rx="2" fill="#00e5ff20" stroke="#00e5ff40" strokeWidth="0.5" />
      <text x="202" y="157" fill="#00e5ff" fontSize="6" textAnchor="middle" fontFamily="monospace">↗ p.12</text>
      <rect x="230" y="150" width="40" height="9" rx="2" fill="#00e5ff10" stroke="#00e5ff25" strokeWidth="0.5" />
      <text x="250" y="157" fill="#00e5ff" fontSize="6" textAnchor="middle" fontFamily="monospace">p.28</text>

      {/* User message 2 — right */}
      <rect x="296" y="172" width="136" height="26" rx="4" fill="#161616" stroke="#232323" strokeWidth="0.5" />
      <rect x="306" y="180" width="118" height="5" rx="1" fill="#2a2a2a" />
      <rect x="306" y="189" width="88" height="4" rx="1" fill="#1c1c1c" />

      {/* AI response 2 — left */}
      <rect x="153" y="208" width="188" height="46" rx="4" fill="#001c1c" stroke="#00e5ff1e" strokeWidth="0.5" />
      <circle cx="167" cy="222" r="5.5" fill="#00e5ff" opacity="0.5" />
      <rect x="180" y="217" width="152" height="5" rx="1" fill="#00e5ff2e" />
      <rect x="180" y="226" width="140" height="4" rx="1" fill="#00e5ff22" />
      <rect x="180" y="235" width="108" height="4" rx="1" fill="#00e5ff18" />
      <rect x="180" y="244" width="42" height="9" rx="2" fill="#00e5ff20" stroke="#00e5ff40" strokeWidth="0.5" />
      <text x="201" y="251" fill="#00e5ff" fontSize="6" textAnchor="middle" fontFamily="monospace">↗ p.7</text>

      {/* Input bar — fills panel to y=300 */}
      <rect x="145" y="262" width="295" height="38" fill="#0c0c0c" />
      <rect x="153" y="269" width="224" height="24" rx="4" fill="#111" stroke="#1e1e1e" strokeWidth="0.5" />
      <rect x="163" y="278" width="110" height="4" rx="1" fill="#1e1e1e" />
      <rect x="275" y="276" width="1.5" height="8" rx="0.5" fill="#00e5ff" opacity="0.65" />
      <rect x="383" y="269" width="50" height="24" rx="4" fill="#00e5ff1a" stroke="#00e5ff35" strokeWidth="0.5" />
      <text x="408" y="285" fill="#00e5ff" fontSize="7" textAnchor="middle" fontFamily="monospace">Send ›</text>
    </svg>
  )
}

function DSAMasteryIllustration() {
  return (
    <svg
      viewBox="0 0 440 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Full base fill */}
      <rect width="440" height="300" fill="#080808" />

      {/* ── Browser chrome (y 0–26) ── */}
      <rect width="440" height="26" fill="#111" />
      <circle cx="16" cy="13" r="4.5" fill="#ff5f57" />
      <circle cx="30" cy="13" r="4.5" fill="#febc2e" />
      <circle cx="44" cy="13" r="4.5" fill="#28c840" />
      <rect x="62" y="5" width="210" height="16" rx="3" fill="#0d0d0d" stroke="#222" strokeWidth="0.5" />
      <text x="167" y="16.5" fill="#555" fontSize="7" textAnchor="middle" fontFamily="monospace">dsa-mastery.app</text>

      {/* ── Left sidebar (x 0–155, y 26–300) ── */}
      <rect x="0" y="26" width="155" height="274" fill="#0c0c0c" />

      {/* Stats bar */}
      <rect x="0" y="26" width="155" height="42" fill="#0f0f0f" />
      <rect x="8" y="32" width="66" height="14" rx="2" fill="#ffb30012" />
      <text x="41" y="42" fill="#ffb300" fontSize="6.5" textAnchor="middle" fontFamily="monospace">65+ Problems</text>
      <rect x="82" y="32" width="64" height="14" rx="2" fill="#00e5ff0e" />
      <text x="114" y="42" fill="#00e5ff" fontSize="6.5" textAnchor="middle" fontFamily="monospace">22 Topics</text>

      {/* Progress bar */}
      <rect x="8" y="52" width="139" height="5" rx="2.5" fill="#1a1a1a" />
      <rect x="8" y="52" width="96" height="5" rx="2.5" fill="#ffb300" opacity="0.6" />
      <text x="8" y="65" fill="#444" fontSize="5.5" fontFamily="monospace">22 / 30 completed</text>

      {/* Divider */}
      <rect x="0" y="68" width="155" height="1" fill="#1a1a1a" />

      {/* Problem items — each 38px tall, 5 items = 190px, fills 68–258 */}
      {[
        { label: 'Two Sum',         diff: 'Easy', dc: '#00e5ff', done: true,  sel: true  },
        { label: 'Merge Intervals', diff: 'Med',  dc: '#ffb300', done: false, sel: false },
        { label: 'LRU Cache',       diff: 'Hard', dc: '#ff5f57', done: false, sel: false },
        { label: "Dijkstra's",      diff: 'Hard', dc: '#ff5f57', done: false, sel: false },
        { label: 'Binary Search',   diff: 'Easy', dc: '#00e5ff', done: false, sel: false },
      ].map((item, i) => {
        const y = 69 + i * 38
        return (
          <g key={i}>
            <rect x="0" y={y} width="155" height="38" fill={item.sel ? '#00e5ff07' : 'transparent'} />
            {item.sel && <rect x="0" y={y} width="3" height="38" fill="#00e5ff" />}
            <circle cx="16" cy={y + 19} r="5" fill={item.done ? '#00e5ff' : '#222'} stroke={item.done ? 'none' : '#333'} strokeWidth="0.5" />
            {item.done && <text x="16" y={y + 22.5} fill="#000" fontSize="7" textAnchor="middle" fontFamily="monospace">✓</text>}
            <rect x="28" y={y + 10} width={item.sel ? 82 : 76} height="6" rx="1.5" fill={item.sel ? '#00e5ff28' : '#1e1e1e'} />
            <rect x="28" y={y + 20} width="60" height="4" rx="1" fill="#181818" />
            <rect x="120" y={y + 12} width="28" height="14" rx="2.5" fill={`${item.dc}18`} />
            <text x="134" y={y + 22} fill={item.dc} fontSize="5.5" textAnchor="middle" fontFamily="monospace">{item.diff}</text>
          </g>
        )
      })}

      {/* Sidebar bottom — spaced repetition hint, fills to y=300 */}
      <rect x="0" y="259" width="155" height="41" fill="#0a0a0a" />
      <rect x="8" y="266" width="139" height="26" rx="3" fill="#111" stroke="#1e1e1e" strokeWidth="0.5" />
      <circle cx="22" cy="279" r="5" fill="#ffb300" opacity="0.45" />
      <rect x="34" y="274" width="64" height="5" rx="1" fill="#ffb30028" />
      <rect x="34" y="283" width="82" height="4" rx="1" fill="#1e1e1e" />
      <text x="124" y="283" fill="#ffb300" fontSize="6" fontFamily="monospace">SM-2</text>

      {/* Left panel divider */}
      <line x1="155" y1="26" x2="155" y2="300" stroke="#1a1a1a" strokeWidth="1" />

      {/* ── Right panel — code editor (x 155–440, y 26–300) ── */}
      <rect x="155" y="26" width="285" height="274" fill="#060606" />

      {/* Tabs bar */}
      <rect x="155" y="26" width="285" height="22" fill="#0d0d0d" />
      <rect x="161" y="28" width="82" height="18" rx="2" fill="#080808" stroke="#1a1a1a" strokeWidth="0.5" />
      <text x="170" y="40" fill="#ccc" fontSize="6.5" fontFamily="monospace">solution.js</text>
      <text x="252" y="40" fill="#3a3a3a" fontSize="6.5" fontFamily="monospace">notes.md</text>
      <text x="310" y="40" fill="#3a3a3a" fontSize="6.5" fontFamily="monospace">tests.js</text>

      {/* Line number gutter */}
      <rect x="155" y="48" width="24" height="220" fill="#0a0a0a" />
      {Array.from({ length: 13 }, (_, i) => (
        <text key={i} x="174" y={60 + i * 16} fill="#2a2a2a" fontSize="6" textAnchor="end" fontFamily="monospace">{i + 1}</text>
      ))}

      {/* Code lines */}
      {/* Line 1: function twoSum(nums, target) { */}
      <rect x="186" y="52" width="32" height="6" rx="1" fill="#569cd660" />
      <rect x="222" y="52" width="52" height="6" rx="1" fill="#9cdcfe55" />
      <rect x="278" y="52" width="20" height="6" rx="1" fill="#66666660" />

      {/* Line 2: const map = new Map() */}
      <rect x="194" y="68" width="30" height="6" rx="1" fill="#569cd660" />
      <rect x="228" y="68" width="22" height="6" rx="1" fill="#9cdcfe55" />
      <rect x="254" y="68" width="52" height="6" rx="1" fill="#66666650" />

      {/* Line 3: for (let i = 0; i < nums.length; i++) { */}
      <rect x="194" y="84" width="18" height="6" rx="1" fill="#c586c060" />
      <rect x="216" y="84" width="66" height="6" rx="1" fill="#9cdcfe50" />
      <rect x="286" y="84" width="32" height="6" rx="1" fill="#66666650" />

      {/* Line 4 — HIGHLIGHTED ACTIVE LINE */}
      <rect x="178" y="98" width="256" height="16" rx="2" fill="#00e5ff09" stroke="#00e5ff14" strokeWidth="0.5" />
      <rect x="202" y="103" width="16" height="5" rx="1" fill="#c586c060" />
      <rect x="222" y="103" width="78" height="5" rx="1" fill="#66666660" />
      <rect x="304" y="103" width="44" height="5" rx="1" fill="#9cdcfe55" />

      {/* Line 5: return [map.get(complement), i] */}
      <rect x="210" y="118" width="24" height="6" rx="1" fill="#569cd660" />
      <rect x="238" y="118" width="86" height="6" rx="1" fill="#00e5ff45" />

      {/* Line 6: map.set(nums[i], i) */}
      <rect x="202" y="134" width="92" height="6" rx="1" fill="#66666655" />

      {/* Line 7: closing } */}
      <rect x="194" y="150" width="7" height="6" rx="1" fill="#66666655" />

      {/* Line 8: closing } */}
      <rect x="186" y="166" width="7" height="6" rx="1" fill="#66666655" />

      {/* Lines 9-11: empty */}
      <rect x="186" y="182" width="30" height="5" rx="1" fill="#1a1a1a" />
      <rect x="186" y="198" width="48" height="5" rx="1" fill="#1a1a1a" />
      <rect x="186" y="214" width="22" height="5" rx="1" fill="#1a1a1a" />

      {/* ── AI Translation panel (y 252–300) fills to bottom ── */}
      <rect x="155" y="252" width="285" height="48" fill="#0b0b0b" />
      <rect x="155" y="252" width="285" height="1" fill="#ffb30018" />
      <circle cx="174" cy="271" r="7" fill="#ffb300" opacity="0.45" />
      <rect x="188" y="265" width="72" height="6" rx="1" fill="#ffb30030" />
      <rect x="188" y="275" width="52" height="5" rx="1" fill="#ffb30018" />
      {['JS', 'Py', 'Go', 'Rb', '+8'].map((lang, i) => (
        <g key={lang}>
          <rect x={272 + i * 28} y={261} width="24" height="18" rx="3" fill="#ffb30010" stroke="#ffb30020" strokeWidth="0.5" />
          <text x={284 + i * 28} y={273} fill="#ffb300" fontSize="6.5" textAnchor="middle" fontFamily="monospace">{lang}</text>
        </g>
      ))}
      {/* Progress bar at very bottom */}
      <rect x="163" y="285" width="261" height="8" rx="1" fill="#111" />
      <rect x="163" y="285" width="148" height="8" rx="1" fill="#ffb30016" />
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
