'use client'

import { useState, useEffect, useRef } from 'react' // useRef kept for completedRef
import { motion, AnimatePresence } from 'framer-motion'

interface BootSequenceProps {
  onComplete: () => void
}

const LINES = [
  '> loading portfolio...',
  '> initializing modules...',
  '> compiling experience...',
  '> rendering projects...',
  '> ready.',
]

// Lines appear at: 0ms, 600ms, 1400ms (after bar fills), 2400ms, 3400ms
const LINE_DELAYS = [0, 600, 2600, 3400, 4200]

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [barWidth, setBarWidth] = useState(0)
  const [barComplete, setBarComplete] = useState(false)
  const completedRef = useRef(false)

  const handleComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true
      onComplete()
    }
  }

  useEffect(() => {
    // Boot sequence plays on every page load — no sessionStorage skip.

    // Show lines one by one
    const timers: ReturnType<typeof setTimeout>[] = []

    LINE_DELAYS.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, i])
        }, delay)
      )
    })

    // Progress bar: starts filling ~200ms after line 1 appears (800ms total)
    // Takes 1.6s to fill — feels like real loading
    timers.push(
      setTimeout(() => {
        const start = performance.now()
        const duration = 1600
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          // Ease-out cubic so bar accelerates at start and eases at the end
          const eased = 1 - Math.pow(1 - progress, 3)
          setBarWidth(eased * 100)
          if (progress < 1) {
            requestAnimationFrame(tick)
          } else {
            setBarComplete(true)
          }
        }
        requestAnimationFrame(tick)
      }, 800)
    )

    // Fade out: "ready." has been visible for ~900ms before overlay exits
    timers.push(
      setTimeout(() => {
        setIsVisible(false)
      }, 5100)
    )

    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {isVisible && (
        <motion.div
          key="boot-sequence"
          className="fixed inset-0 z-[100] flex flex-col justify-center items-start bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative corners */}
          <span
            className="absolute top-6 left-6 font-mono text-xs"
            style={{ color: '#333', letterSpacing: '0.1em' }}
          >
            System Boot
          </span>
          <span
            className="absolute top-6 right-6 font-mono text-xs"
            style={{ color: '#333', letterSpacing: '0.1em' }}
          >
            v1.0.0
          </span>

          <div className="px-8 md:px-16 w-full max-w-2xl">
            {LINES.map((line, i) => {
              const isVisible = visibleLines.includes(i)
              const isLastLine = i === LINES.length - 1
              const isModulesLine = i === 1

              return (
                <div key={i}>
                  <AnimatePresence>
                    {isVisible && (
                      <motion.div
                        variants={lineVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-mono text-sm leading-8"
                        style={{
                          color: isLastLine ? '#00e5ff' : '#888',
                        }}
                      >
                        {line}
                        {isLastLine && isVisible && (
                          <span
                            className="inline-block w-2 h-4 ml-1 align-middle animate-blink"
                            style={{ background: '#00e5ff' }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress bar after line 1 */}
                  {isModulesLine && isVisible && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-sm leading-8 flex items-center gap-2"
                      style={{ color: '#555' }}
                    >
                      <span style={{ color: '#555' }}>[</span>
                      <div
                        className="relative"
                        style={{ width: '180px', height: '10px', background: '#1a1a1a' }}
                      >
                        <div
                          style={{
                            width: `${barWidth}%`,
                            height: '100%',
                            background: '#00e5ff',
                            boxShadow: '0 0 8px rgba(0, 229, 255, 0.5)',
                            transition: 'none',
                          }}
                        />
                      </div>
                      <span style={{ color: '#555' }}>]</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: barComplete ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: '#00e5ff' }}
                      >
                        100%
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
