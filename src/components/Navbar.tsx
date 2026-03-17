'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollY } from '@/utils/hooks'

const NAV_LINKS = [
  { label: 'cd ~/about', href: '#about', section: 'about' },
  { label: 'cd ~/experience', href: '#experience', section: 'experience' },
  { label: 'cd ~/projects', href: '#projects', section: 'projects' },
  { label: 'cd ~/skills', href: '#skills', section: 'skills' },
  { label: 'cd ~/contact', href: '#contact', section: 'contact' },
]

interface NavbarProps {
  onOpenPalette?: () => void
}

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent))
  }, [])

  const isScrolled = scrollY > 20

  // Scroll-spy: detect active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.section)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      setMenuOpen(false)
    },
    []
  )

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-md border-b border-[#222]'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-mono text-sm text-[#e8e8e8] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1"
            aria-label="Ali Smaili — back to top"
          >
            <span className="text-[var(--accent)] opacity-70">&gt;</span>
            <span>ali.smaili</span>
            <span className="animate-blink text-[var(--accent)]">_</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.section}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-mono text-xs tracking-wide transition-all duration-200 relative py-1 ${
                  activeSection === link.section
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-current={activeSection === link.section ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.section && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]"
                    style={{ boxShadow: '0 0 6px var(--accent)' }}
                  />
                )}
              </a>
            ))}

            {/* ⌘K shortcut indicator */}
            {onOpenPalette && (
              <button
                onClick={onOpenPalette}
                className="nav-shortcut-pill cursor-none"
                aria-label={`Open command palette (${isMac ? '⌘K' : 'Ctrl+K'})`}
                title="Command palette"
              >
                {isMac ? '⌘K' : 'Ctrl+K'}
              </button>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-[var(--text-primary)]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-6 h-px bg-[var(--text-primary)]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-[var(--text-primary)]"
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Decorative grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-mono text-xs text-[var(--text-muted)] mb-4"
            >
              {'> navigating...'}
            </motion.div>

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.section}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                className={`font-mono text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                  activeSection === link.section
                    ? 'text-[var(--accent)] text-glow-accent'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-8 font-mono text-xs text-[var(--text-muted)]"
            >
              ali.smaili © 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
