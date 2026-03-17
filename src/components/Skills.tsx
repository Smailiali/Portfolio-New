'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups, CATEGORY_COLORS } from '@/data/skills'
import type { SkillCategory } from '@/data/skills'

/* ============================================
   CONSTELLATION DATA
   Hand-placed node coordinates (800 × 560 viewBox)
   Grouped into 4 cluster regions
   ============================================ */
interface CNode {
  id: string
  label: string
  x: number
  y: number
  category: SkillCategory
  fv: 1 | 2 | 3 | 4     // float variant
  la: 'start' | 'middle' | 'end'  // SVG text-anchor
  dx: number             // label x offset from node
  dy: number             // label y offset from node
}

interface CEdge {
  a: string
  b: string
  category: SkillCategory
}

const NODES: CNode[] = [
  // ── Languages (amber) — top-left ──
  { id: 'JavaScript',        label: 'JavaScript',        x:  82, y:  95, category: 'languages', fv: 1, la: 'start',  dx: 10, dy: -10 },
  { id: 'TypeScript',        label: 'TypeScript',        x: 165, y:  65, category: 'languages', fv: 2, la: 'middle', dx:  0, dy: -12 },
  { id: 'Python',            label: 'Python',            x: 238, y: 100, category: 'languages', fv: 3, la: 'start',  dx: 10, dy: -10 },
  { id: 'HTML',              label: 'HTML',              x:  90, y: 175, category: 'languages', fv: 4, la: 'start',  dx: 10, dy:  14 },
  { id: 'CSS',               label: 'CSS',               x: 200, y: 158, category: 'languages', fv: 1, la: 'middle', dx:  0, dy: -12 },
  { id: 'SQL',               label: 'SQL',               x: 153, y: 122, category: 'languages', fv: 2, la: 'end',    dx:-10, dy: -10 },

  // ── Frontend (cyan) — top-right ──
  { id: 'React',             label: 'React',             x: 530, y:  88, category: 'frontend',  fv: 3, la: 'end',    dx:-10, dy: -10 },
  { id: 'Nextjs',            label: 'Next.js',           x: 614, y:  58, category: 'frontend',  fv: 4, la: 'middle', dx:  0, dy: -12 },
  { id: 'TailwindCSS',       label: 'Tailwind CSS',      x: 678, y: 102, category: 'frontend',  fv: 1, la: 'start',  dx: 10, dy: -10 },
  { id: 'Bootstrap',         label: 'Bootstrap',         x: 648, y: 166, category: 'frontend',  fv: 2, la: 'start',  dx: 10, dy:  14 },
  { id: 'ResponsiveDesign',  label: 'Responsive Design', x: 558, y: 170, category: 'frontend',  fv: 3, la: 'end',    dx:-10, dy:  14 },

  // ── Backend (green) — bottom-left ──
  { id: 'Nodejs',            label: 'Node.js',           x:  88, y: 375, category: 'backend',   fv: 4, la: 'start',  dx: 10, dy: -10 },
  { id: 'Expressjs',         label: 'Express.js',        x: 175, y: 335, category: 'backend',   fv: 1, la: 'middle', dx:  0, dy: -12 },
  { id: 'RESTAPIs',          label: 'REST APIs',         x: 255, y: 370, category: 'backend',   fv: 2, la: 'start',  dx: 10, dy: -10 },
  { id: 'GraphQL',           label: 'GraphQL',           x: 188, y: 440, category: 'backend',   fv: 3, la: 'start',  dx: 10, dy:  14 },
  { id: 'PostgreSQL',        label: 'PostgreSQL',        x:  92, y: 458, category: 'backend',   fv: 4, la: 'start',  dx: 10, dy:  14 },
  { id: 'MongoDB',           label: 'MongoDB',           x: 282, y: 448, category: 'backend',   fv: 1, la: 'start',  dx: 10, dy:  14 },

  // ── AI & Tools (purple) — bottom-right ──
  { id: 'ClaudeAPI',         label: 'Claude API',        x: 532, y: 362, category: 'ai-tools',  fv: 2, la: 'end',    dx:-10, dy: -10 },
  { id: 'OpenAIAPI',         label: 'OpenAI API',        x: 618, y: 338, category: 'ai-tools',  fv: 3, la: 'middle', dx:  0, dy: -12 },
  { id: 'PromptEngineering', label: 'Prompt Engineering',x: 694, y: 388, category: 'ai-tools',  fv: 4, la: 'end',    dx:-10, dy: -10 },
  { id: 'Git',               label: 'Git',               x: 562, y: 458, category: 'ai-tools',  fv: 1, la: 'end',    dx:-10, dy:  14 },
  { id: 'GitHub',            label: 'GitHub',            x: 658, y: 462, category: 'ai-tools',  fv: 2, la: 'start',  dx: 10, dy:  14 },
]

const EDGES: CEdge[] = [
  // Languages
  { a: 'JavaScript', b: 'TypeScript',   category: 'languages' },
  { a: 'TypeScript', b: 'Python',       category: 'languages' },
  { a: 'JavaScript', b: 'HTML',         category: 'languages' },
  { a: 'HTML',       b: 'CSS',          category: 'languages' },
  { a: 'CSS',        b: 'SQL',          category: 'languages' },
  { a: 'TypeScript', b: 'SQL',          category: 'languages' },
  // Frontend
  { a: 'React',            b: 'Nextjs',           category: 'frontend' },
  { a: 'React',            b: 'TailwindCSS',      category: 'frontend' },
  { a: 'Nextjs',           b: 'TailwindCSS',      category: 'frontend' },
  { a: 'TailwindCSS',      b: 'Bootstrap',        category: 'frontend' },
  { a: 'Bootstrap',        b: 'ResponsiveDesign', category: 'frontend' },
  { a: 'React',            b: 'ResponsiveDesign', category: 'frontend' },
  // Backend
  { a: 'Nodejs',    b: 'Expressjs',  category: 'backend' },
  { a: 'Expressjs', b: 'RESTAPIs',   category: 'backend' },
  { a: 'Expressjs', b: 'GraphQL',    category: 'backend' },
  { a: 'Nodejs',    b: 'PostgreSQL', category: 'backend' },
  { a: 'PostgreSQL',b: 'MongoDB',    category: 'backend' },
  { a: 'GraphQL',   b: 'MongoDB',    category: 'backend' },
  // AI & Tools
  { a: 'ClaudeAPI',         b: 'OpenAIAPI',          category: 'ai-tools' },
  { a: 'ClaudeAPI',         b: 'PromptEngineering',  category: 'ai-tools' },
  { a: 'OpenAIAPI',         b: 'PromptEngineering',  category: 'ai-tools' },
  { a: 'Git',               b: 'GitHub',             category: 'ai-tools' },
  { a: 'PromptEngineering', b: 'Git',                category: 'ai-tools' },
]

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]))

function getConnectedIds(nodeId: string): Set<string> {
  const set = new Set<string>([nodeId])
  EDGES.forEach(e => {
    if (e.a === nodeId) set.add(e.b)
    if (e.b === nodeId) set.add(e.a)
  })
  return set
}

/* ============================================
   CATEGORY CLUSTER LABELS
   ============================================ */
const CLUSTER_LABELS = [
  { label: 'Languages',    x: 158, y: 36,  category: 'languages' as SkillCategory },
  { label: 'Frontend',     x: 608, y: 28,  category: 'frontend'  as SkillCategory },
  { label: 'Backend & Data', x: 178, y: 300, category: 'backend' as SkillCategory },
  { label: 'AI & Tools',  x: 612, y: 300,  category: 'ai-tools'  as SkillCategory },
]

/* ============================================
   CONSTELLATION (SVG, desktop)
   ============================================ */
function Constellation() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const connected = hoveredId ? getConnectedIds(hoveredId) : null

  const nodeOpacity = (id: string) => {
    if (!hoveredId) return 1
    return connected!.has(id) ? 1 : 0.18
  }

  const edgeOpacity = (e: CEdge) => {
    if (!hoveredId) return 0.14
    if (e.a === hoveredId || e.b === hoveredId) return 0.85
    const hNode = NODE_MAP[hoveredId]
    if (hNode && hNode.category === e.category) return 0.3
    return 0.04
  }

  const floatAnim = (n: CNode, i: number) =>
    revealed
      ? `nodeFloat${n.fv} ${4 + (i * 0.53 % 3).toFixed(0)}s ${((i * 0.41) % 2.4).toFixed(1)}s ease-in-out infinite`
      : 'none'

  return (
    <div ref={wrapperRef} className="w-full">
      <svg
        viewBox="0 0 800 560"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ height: 'clamp(340px, 60vw, 560px)' }}
        aria-label="Skill constellation visualization"
      >
        {/* ── Cluster labels ── */}
        {CLUSTER_LABELS.map(cl => (
          <text
            key={cl.label}
            x={cl.x}
            y={cl.y}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.15em"
            fill={CATEGORY_COLORS[cl.category]}
            opacity={revealed ? (hoveredId ? (NODE_MAP[hoveredId]?.category === cl.category ? 0.9 : 0.2) : 0.55) : 0}
            style={{ transition: 'opacity 0.25s ease', textTransform: 'uppercase' }}
          >
            {cl.label.toUpperCase()}
          </text>
        ))}

        {/* ── Edges ── */}
        {EDGES.map((e, i) => {
          const na = NODE_MAP[e.a]
          const nb = NODE_MAP[e.b]
          if (!na || !nb) return null
          return (
            <line
              key={`${e.a}-${e.b}`}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke={CATEGORY_COLORS[e.category]}
              strokeWidth="0.75"
              opacity={revealed ? edgeOpacity(e) : 0}
              style={{
                transition: `opacity ${revealed ? '0.25s' : `${0.6 + i * 0.04}s`} ease ${revealed && !hoveredId ? '0s' : `${0.5 + i * 0.04}s`}`,
              }}
            />
          )
        })}

        {/* ── Nodes ── */}
        {NODES.map((n, i) => {
          const color = CATEGORY_COLORS[n.category]
          const isHovered = hoveredId === n.id
          const opacity = nodeOpacity(n.id)

          return (
            <g
              key={n.id}
              style={{
                opacity: revealed ? opacity : 0,
                transition: !revealed
                  ? `opacity 0.5s ease ${(0.3 + i * 0.05).toFixed(2)}s`
                  : 'opacity 0.22s ease',
              }}
            >
              {/*
                Positioning and animation MUST be on separate <g> elements.
                CSS `animation` (transform property) overrides SVG `transform`
                presentation attributes — combining them on one element moves
                every node to (0,0) when the float animation starts.
                Middle <g>: absolute position via SVG attribute only (no CSS).
                Inner <g>:  float animation only (small relative transforms).
              */}
              <g transform={`translate(${n.x}, ${n.y})`}>
              <g style={{ animation: floatAnim(n, i) }}>
                {/* Hover glow ring */}
                <circle
                  r={isHovered ? 14 : 0}
                  fill={color}
                  opacity={0.14}
                  style={{ transition: 'r 0.2s ease' }}
                />
                {/* Outer ring (always visible at low opacity) */}
                <circle
                  r={isHovered ? 9 : 7}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={isHovered ? 0.4 : 0.15}
                  style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
                />
                {/* Main node circle */}
                <circle
                  r={isHovered ? 5.5 : 3.5}
                  fill={color}
                  opacity={isHovered ? 1 : 0.75}
                  style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
                />
                {/* Invisible larger hit area */}
                <circle
                  r={18}
                  fill="transparent"
                  style={{ cursor: 'crosshair' }}
                  onMouseEnter={() => setHoveredId(n.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
                {/* Label */}
                <text
                  x={n.dx}
                  y={n.dy}
                  textAnchor={n.la}
                  fontSize={isHovered ? '9.5' : '8'}
                  fontFamily="var(--font-mono)"
                  fill={color}
                  opacity={isHovered ? 1 : 0.45}
                  style={{
                    transition: 'opacity 0.2s ease, font-size 0.2s ease',
                    pointerEvents: 'none',
                    letterSpacing: isHovered ? '0.04em' : '0',
                  }}
                >
                  {n.label}
                </text>
              </g>{/* end animation <g> */}
              </g>{/* end position <g> */}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ============================================
   MOBILE TERMINAL FALLBACK
   ============================================ */
function TerminalFallback() {
  return (
    <div className="font-mono text-sm space-y-6">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: gi * 0.1 }}
        >
          {/* Command line */}
          <p className="mb-1.5">
            <span style={{ color: CATEGORY_COLORS[group.category] }}>{'$ '}</span>
            <span style={{ color: 'var(--text-primary)' }}>ls </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              ~/skills/{group.category === 'ai-tools' ? 'ai-tools' : group.category}
            </span>
          </p>
          {/* Output: skill pills */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 pl-4">
            <span style={{ color: 'var(--text-muted)' }}>{'> '}</span>
            {group.skills.map((skill, si) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: gi * 0.1 + si * 0.04 }}
                className="inline-block px-2 py-0.5 text-xs"
                style={{
                  color: group.color,
                  background: `${group.color}10`,
                  border: `1px solid ${group.color}30`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ============================================
   SKILLS SECTION
   ============================================ */
export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          SKILLS
        </motion.p>

        <motion.p
          className="font-sans text-sm mt-2 mb-10 hidden sm:block"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Hover a node to explore connections.
        </motion.p>

        {/* Desktop constellation */}
        <div className="hidden sm:block">
          <Constellation />
        </div>

        {/* Mobile terminal fallback */}
        <div className="sm:hidden">
          <TerminalFallback />
        </div>
      </div>

      {/* Bottom divider */}
      <div className="container-custom mt-16">
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
