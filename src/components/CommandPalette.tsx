'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ============================================
   COMMAND DEFINITIONS
   ============================================ */
interface Command {
  id: string
  icon: string
  label: string
  description: string
  action: (opts: { triggerMatrix: () => void }) => void
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const COMMANDS: Command[] = [
  {
    id: 'about',
    icon: '📋',
    label: 'About',
    description: 'Jump to section',
    action: () => scrollTo('about'),
  },
  {
    id: 'experience',
    icon: '💼',
    label: 'Experience',
    description: 'Jump to section',
    action: () => scrollTo('experience'),
  },
  {
    id: 'projects',
    icon: '🚀',
    label: 'Projects',
    description: 'Jump to section',
    action: () => scrollTo('projects'),
  },
  {
    id: 'skills',
    icon: '⚡',
    label: 'Skills',
    description: 'Jump to section',
    action: () => scrollTo('skills'),
  },
  {
    id: 'contact',
    icon: '📬',
    label: 'Contact',
    description: 'Jump to section',
    action: () => scrollTo('contact'),
  },
  {
    id: 'resume',
    icon: '📄',
    label: 'Resume',
    description: 'Download PDF',
    action: () => window.open('/Ali_Smaili_Resume.pdf', '_blank'),
  },
  {
    id: 'github',
    icon: '🔗',
    label: 'GitHub',
    description: 'External link',
    action: () => window.open('https://github.com/Smailiali', '_blank'),
  },
  {
    id: 'linkedin',
    icon: '🔗',
    label: 'LinkedIn',
    description: 'External link',
    action: () => window.open('https://linkedin.com/in/smailiali', '_blank'),
  },
  {
    id: 'secret',
    icon: '🕹️',
    label: 'Secret',
    description: '↑ ↑ ↓ ↓ ← → ← → B A',
    action: ({ triggerMatrix }) => triggerMatrix(),
  },
]

/* ============================================
   COMMAND PALETTE COMPONENT
   ============================================ */
interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onTriggerMatrix: () => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  onTriggerMatrix,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  /* Filter commands by query */
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  /* Clamp activeIndex when filtered list changes */
  useEffect(() => {
    setActiveIndex(0)
  }, [filtered.length])

  /* On open: save focus, reset state, auto-focus input, lock body scroll */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      setQuery('')
      setActiveIndex(0)
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      ;(previousFocusRef.current as HTMLElement | null)?.focus?.()
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Execute a command then close */
  const execute = useCallback(
    (cmd: Command) => {
      onClose()
      // Small delay so close animation plays before side-effects
      setTimeout(() => cmd.action({ triggerMatrix: onTriggerMatrix }), 120)
    },
    [onClose, onTriggerMatrix]
  )

  /* Keyboard handler: arrows, enter, escape */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[activeIndex]) execute(filtered[activeIndex])
      } else if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'Tab') {
        // Focus trap — keep focus inside the dialog
        const focusable = document.querySelectorAll<HTMLElement>(
          '#command-palette-dialog [tabindex]:not([tabindex="-1"]), #command-palette-dialog input'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [filtered, activeIndex, execute, onClose]
  )

  /* Scroll active item into view */
  useEffect(() => {
    const item = listRef.current?.children[activeIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 99980 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Palette */}
          <motion.div
            key="cp-panel"
            id="command-palette-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[20%] mx-auto"
            style={{
              width: 'min(520px, calc(100vw - 2rem))',
              background: '#111',
              border: '1px solid rgba(0,229,255,0.25)',
              boxShadow:
                '0 0 0 1px rgba(0,229,255,0.08), 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,229,255,0.06)',
              zIndex: 99981,
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div
              style={{ borderBottom: '1px solid #1e1e1e' }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: '#555', flexShrink: 0 }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-controls="command-list"
                aria-activedescendant={
                  filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined
                }
                className="flex-1 bg-transparent outline-none font-mono text-sm"
                style={{ color: 'var(--text-primary)', caretColor: 'var(--accent)' }}
              />
              <kbd
                className="font-mono text-xs px-1.5 py-0.5"
                style={{
                  color: '#555',
                  border: '1px solid #2a2a2a',
                  borderRadius: '3px',
                  flexShrink: 0,
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Commands list */}
            <ul
              id="command-list"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="py-2 overflow-y-auto"
              style={{ maxHeight: '320px' }}
            >
              {filtered.length === 0 ? (
                <li
                  className="px-4 py-3 font-mono text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  No commands found.
                </li>
              ) : (
                filtered.map((cmd, i) => (
                  <li
                    key={cmd.id}
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => execute(cmd)}
                    className="flex items-center gap-3 px-4 cursor-pointer transition-colors duration-100"
                    style={{
                      minHeight: '44px',
                      background:
                        i === activeIndex
                          ? 'rgba(0,229,255,0.07)'
                          : 'transparent',
                      borderLeft:
                        i === activeIndex
                          ? '2px solid var(--accent)'
                          : '2px solid transparent',
                    }}
                  >
                    {/* Icon */}
                    <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>
                      {cmd.icon}
                    </span>

                    {/* Label */}
                    <span
                      className="flex-1 font-mono text-sm truncate"
                      style={{
                        color:
                          i === activeIndex
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {cmd.label}
                    </span>

                    {/* Description hint — hidden on small screens */}
                    <span
                      className="font-mono text-xs hidden sm:block"
                      style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                    >
                      {cmd.description}
                    </span>
                  </li>
                ))
              )}
            </ul>

            {/* Footer hint — keyboard shortcuts, hidden on touch devices */}
            <div
              className="hidden sm:flex items-center gap-4 px-4 py-2 font-mono text-xs"
              style={{
                borderTop: '1px solid #1a1a1a',
                color: 'var(--text-muted)',
              }}
            >
              <span>
                <kbd className="cp-kbd">↑</kbd>
                <kbd className="cp-kbd">↓</kbd> navigate
              </span>
              <span>
                <kbd className="cp-kbd">↵</kbd> select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
