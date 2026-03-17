'use client'

// To enable resume download, place your resume file at: public/Ali_Smaili_Resume.pdf

import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTypingEffect, useDynamicGreeting } from '@/utils/hooks'

/* ============================================
   CODE EDITOR DATA (module-level, no re-allocation)
   ============================================ */
type Span = { text: string; color: string }

const CODE_LINES: Span[][] = [
  [
    { text: 'const ', color: '#569cd6' },
    { text: 'developer', color: '#9cdcfe' },
    { text: ' = {', color: '#6b7280' },
  ],
  [
    { text: '  ', color: '' },
    { text: 'name', color: '#ffb300' },
    { text: ': ', color: '#6b7280' },
    { text: '"Ali Smaili"', color: '#00e5ff' },
    { text: ',', color: '#6b7280' },
  ],
  [
    { text: '  ', color: '' },
    { text: 'location', color: '#ffb300' },
    { text: ': ', color: '#6b7280' },
    { text: '"Irvine, CA"', color: '#00e5ff' },
    { text: ',', color: '#6b7280' },
  ],
  [
    { text: '  ', color: '' },
    { text: 'stack', color: '#ffb300' },
    { text: ': [', color: '#6b7280' },
    { text: '"React"', color: '#00e5ff' },
    { text: ', ', color: '#6b7280' },
    { text: '"Node.js"', color: '#00e5ff' },
    { text: ', ', color: '#6b7280' },
    { text: '"TypeScript"', color: '#00e5ff' },
    { text: ', ', color: '#6b7280' },
    { text: '"PostgreSQL"', color: '#00e5ff' },
    { text: '],', color: '#6b7280' },
  ],
  [
    { text: '  ', color: '' },
    { text: 'passion', color: '#ffb300' },
    { text: ': ', color: '#6b7280' },
    { text: '"Building tools that solve real problems"', color: '#00e5ff' },
    { text: ',', color: '#6b7280' },
  ],
  [
    { text: '  ', color: '' },
    { text: 'status', color: '#ffb300' },
    { text: ': ', color: '#6b7280' },
    { text: '"Open to opportunities"', color: '#00e5ff' },
  ],
  [
    { text: '};', color: '#6b7280' },
  ],
]

// Flatten to array of { char, color }
const FLAT_CHARS: { char: string; color: string }[] = []
CODE_LINES.forEach((line, lineIndex) => {
  line.forEach(span => {
    for (const char of span.text) {
      FLAT_CHARS.push({ char, color: span.color || '#6b7280' })
    }
  })
  if (lineIndex < CODE_LINES.length - 1) {
    FLAT_CHARS.push({ char: '\n', color: '' })
  }
})

/* ============================================
   CODE EDITOR SUB-COMPONENT
   ============================================ */
function CodeEditor({ isReady }: { isReady: boolean }) {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (!isReady) return

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setRevealed(prev => {
          if (prev >= FLAT_CHARS.length) {
            clearInterval(intervalId)
            return prev
          }
          return prev + 1
        })
      }, 18)
    }, 800)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [isReady])

  // Group consecutive chars with same color into spans
  const groupedLines = useMemo(() => {
    // Split FLAT_CHARS up to `revealed` into lines
    const chars = FLAT_CHARS.slice(0, revealed)
    const lines: { text: string; color: string }[][] = [[]]
    let currentLine = lines[0]
    let currentGroup: { text: string; color: string } | null = null

    for (const { char, color } of chars) {
      if (char === '\n') {
        if (currentGroup) currentLine.push(currentGroup)
        currentGroup = null
        currentLine = []
        lines.push(currentLine)
        continue
      }
      if (currentGroup && currentGroup.color === color) {
        currentGroup.text += char
      } else {
        if (currentGroup) currentLine.push(currentGroup)
        currentGroup = { text: char, color }
      }
    }
    if (currentGroup) currentLine.push(currentGroup)

    return lines
  }, [revealed])

  const isTyping = revealed < FLAT_CHARS.length

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isReady ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full border border-[#1e1e1e]"
      style={{ background: '#0d0d0d' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-4"
        style={{ background: '#161616', height: '40px' }}
      >
        {/* Traffic light dots */}
        <div className="flex items-center gap-2 mr-4">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        {/* Filename tab */}
        <div
          className="font-mono text-xs px-3 py-1 border border-[#2a2a2a]"
          style={{ color: '#888', background: '#0d0d0d' }}
        >
          developer.ts
        </div>
      </div>

      {/* Code area */}
      <div className="flex p-4 overflow-x-auto">
        {/* Line numbers */}
        <div
          className="font-mono text-xs leading-6 select-none pr-4 text-right shrink-0"
          style={{ color: '#3a3a3a' }}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Code content */}
        <pre className="flex-1 font-mono text-xs leading-6 overflow-x-auto whitespace-pre">
          {groupedLines.map((line, lineIdx) => (
            <div key={lineIdx}>
              {line.map((span, spanIdx) => (
                <span key={spanIdx} style={{ color: span.color || '#6b7280' }}>
                  {span.text}
                </span>
              ))}
              {/* Typing cursor on the current line */}
              {isTyping && lineIdx === groupedLines.length - 1 && (
                <span
                  className="inline-block w-[2px] h-[14px] animate-blink align-middle"
                  style={{
                    marginLeft: '1px',
                    background: '#00e5ff',
                    boxShadow: '0 0 4px #00e5ff',
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </div>
          ))}
          {/* Cursor after all code if fully revealed — keep blinking at end */}
          {!isTyping && (
            <span
              className="inline-block w-[2px] h-[14px] animate-blink align-middle"
              style={{
                marginLeft: '1px',
                background: '#00e5ff',
                boxShadow: '0 0 4px #00e5ff',
                verticalAlign: 'middle',
              }}
            />
          )}
        </pre>
      </div>
    </motion.div>
  )
}

/* ============================================
   HERO SECTION
   ============================================ */
interface HeroProps {
  isReady: boolean
}

const TAGLINES = [
  'Software Developer',
  'Full-Stack Engineer',
  'AI Solutions Architect',
  'Automation Engineer',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero({ isReady }: HeroProps) {
  const displayText = useTypingEffect(TAGLINES)
  const greeting = useDynamicGreeting()

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 bg-grid pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left side — text content */}
          <motion.div
            className="flex flex-col gap-6 py-12 lg:py-0"
            variants={containerVariants}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
          >
            {/* Prefix line */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm"
              style={{ color: '#555' }}
            >
              {'> initializing portfolio...'}
            </motion.p>

            {/* Dynamic greeting */}
            {greeting && (
              <motion.p
                variants={itemVariants}
                className="font-mono text-sm"
                style={{ color: '#888' }}
              >
                {`// ${greeting}`}
              </motion.p>
            )}

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-fluid-xl font-bold font-mono text-white"
              style={{ textShadow: '0 0 40px rgba(0,229,255,0.1)' }}
            >
              Ali Smaili
            </motion.h1>

            {/* Typing tagline */}
            <motion.div
              variants={itemVariants}
              className="text-fluid-md font-mono"
              style={{ minHeight: '2.5rem' }}
            >
              <span style={{ color: 'var(--accent)' }}>{displayText}</span>
              <span className="animate-blink" style={{ color: 'var(--accent)' }}>
                |
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <button
                className="btn-primary cursor-none"
                onClick={scrollToProjects}
                aria-label="View projects section"
              >
                [View Projects]
              </button>
              {/* TODO: Place your resume at public/Ali_Smaili_Resume.pdf */}
              <a
                className="btn-outline cursor-none"
                href="/Ali_Smaili_Resume.pdf"
                download
                aria-label="Download Ali Smaili's resume PDF"
              >
                [Download Resume]
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              {/* GitHub */}
              <a
                href="https://github.com/Smailiali"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none flex items-center gap-2 text-sm font-mono transition-all duration-200"
                style={{ color: '#888' }}
                aria-label="GitHub profile"
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow =
                    '0 0 12px rgba(0,229,255,0.5)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#888'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow = 'none'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/smailiali"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none flex items-center gap-2 text-sm font-mono transition-all duration-200"
                style={{ color: '#888' }}
                aria-label="LinkedIn profile"
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow =
                    '0 0 12px rgba(0,229,255,0.5)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#888'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow = 'none'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href="mailto:smailikhaledali@gmail.com"
                className="cursor-none flex items-center gap-2 text-sm font-mono transition-all duration-200"
                style={{ color: '#888' }}
                aria-label="Send email"
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#00e5ff'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow =
                    '0 0 12px rgba(0,229,255,0.5)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#888'
                  ;(e.currentTarget as HTMLAnchorElement).style.textShadow = 'none'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Email</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right side — Code editor */}
          <div className="hidden lg:block pb-12 lg:pb-0">
            <CodeEditor isReady={isReady} />
          </div>
        </div>
      </div>
    </section>
  )
}
