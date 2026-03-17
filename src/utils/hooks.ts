'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ============================================
   useScrollProgress
   Returns 0–1 progress as user scrolls the page
   ============================================ */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

/* ============================================
   useScrollY
   Returns raw scrollY value
   ============================================ */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

/* ============================================
   useMouseTilt
   Returns { rotateX, rotateY, glowX, glowY } for 3D card tilt
   ============================================ */
export interface TiltValues {
  rotateX: number
  rotateY: number
  glowX: number
  glowY: number
}

export function useMouseTilt(maxDeg = 4) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })
  const frameRef = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  // 0–1
        const y = (e.clientY - rect.top) / rect.height   // 0–1
        setTilt({
          rotateX: (0.5 - y) * maxDeg * 2,
          rotateY: (x - 0.5) * maxDeg * 2,
          glowX: x * 100,
          glowY: y * 100,
        })
      })
    },
    [maxDeg]
  )

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return { ref, tilt }
}

/* ============================================
   useInView
   Returns true when the ref element is in the viewport
   ============================================ */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // fire once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

/* ============================================
   useCountUp
   Counts from 0 to target when triggered
   ============================================ */
export function useCountUp(target: number, duration = 1500, triggered = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration, triggered])

  return count
}

/* ============================================
   useDynamicGreeting
   Returns time-based greeting string
   ============================================ */
export function useDynamicGreeting(): string {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting('Good morning')
    else if (hour >= 12 && hour < 17) setGreeting('Good afternoon')
    else if (hour >= 17 && hour < 21) setGreeting('Good evening')
    else setGreeting('Working late?')
  }, [])

  return greeting
}

/* ============================================
   useTypingEffect
   Cycles through an array of strings with a typewriter effect.

   Uses refs for the animation state so each step always reads
   the *current* values — no stale-closure issues. The effect
   runs once and self-schedules via a timer chain.
   ============================================ */
export function useTypingEffect(
  strings: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  enabled = true
) {
  const [displayText, setDisplayText] = useState('')

  // Mutable engine state — never stale in closures
  const engineRef = useRef({ index: 0, text: '', isDeleting: false })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    const tick = () => {
      const { index, text, isDeleting } = engineRef.current
      const currentString = strings[index]

      if (!isDeleting) {
        // Type one more character
        const next = currentString.slice(0, text.length + 1)
        engineRef.current.text = next
        setDisplayText(next)

        if (next.length === currentString.length) {
          // Fully typed — pause, then switch to deleting
          timerRef.current = setTimeout(() => {
            engineRef.current.isDeleting = true
            timerRef.current = setTimeout(tick, deletingSpeed)
          }, pauseDuration)
        } else {
          timerRef.current = setTimeout(tick, typingSpeed)
        }
      } else {
        // Delete one character
        const next = text.slice(0, -1)
        engineRef.current.text = next
        setDisplayText(next)

        if (next.length === 0) {
          // Fully deleted — move to next string and start typing
          engineRef.current.isDeleting = false
          engineRef.current.index = (index + 1) % strings.length
          timerRef.current = setTimeout(tick, typingSpeed)
        } else {
          timerRef.current = setTimeout(tick, deletingSpeed)
        }
      }
    }

    timerRef.current = setTimeout(tick, typingSpeed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]) // Re-runs when boot completes and enabled flips to true

  return displayText
}
