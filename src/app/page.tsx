'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import BootSequence from '@/components/BootSequence'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CommandPalette from '@/components/CommandPalette'
import MatrixRain from '@/components/MatrixRain'

/* ============================================
   CMD+K BADGE — detects Mac vs Win/Linux
   ============================================ */
function CmdKBadge({ onClick }: { onClick: () => void }) {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent))
  }, [])
  return (
    <button
      onClick={onClick}
      className="cmd-hint-badge"
      aria-label={`Open command palette (${isMac ? '⌘K' : 'Ctrl+K'})`}
      title="Open command palette"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }} aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
      <kbd>{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
    </button>
  )
}

/* ============================================
   KONAMI CODE SEQUENCE
   ============================================ */
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
]

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)

  const handleBootComplete = useCallback(() => setBootComplete(true), [])
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const triggerMatrix = useCallback(() => {
    setPaletteOpen(false)
    setMatrixActive(true)
  }, [])
  const handleMatrixComplete = useCallback(() => setMatrixActive(false), [])

  /* Cmd+K / Ctrl+K to open command palette */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* Konami code listener */
  const konamiBufferRef = useRef<string[]>([])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiBufferRef.current.push(e.code)
      if (konamiBufferRef.current.length > KONAMI.length) {
        konamiBufferRef.current.shift()
      }
      if (
        konamiBufferRef.current.length === KONAMI.length &&
        konamiBufferRef.current.every((k, i) => k === KONAMI[i])
      ) {
        konamiBufferRef.current = []
        triggerMatrix()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [triggerMatrix])

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <ScrollProgress />
      <BootSequence onComplete={handleBootComplete} />
      <Navbar onOpenPalette={openPalette} />

      <main>
        <Hero isReady={bootComplete} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Special features */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={closePalette}
        onTriggerMatrix={triggerMatrix}
      />
      <MatrixRain active={matrixActive} onComplete={handleMatrixComplete} />

      {/* ⌘K hint badge — fixed bottom-right pill */}
      <CmdKBadge onClick={openPalette} />
    </MotionConfig>
  )
}
