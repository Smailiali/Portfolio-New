'use client'

import { useEffect, useRef, useState } from 'react'

/* ============================================
   MATRIX RAIN — Canvas-based easter egg
   Props:
     active   — when true, mounts and starts the animation
     onComplete — called after the full ~5s sequence ends
   ============================================ */

const CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

type Phase = 'rain' | 'message' | 'fading'

interface MatrixRainProps {
  active: boolean
  onComplete: () => void
}

export default function MatrixRain({ active, onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const t1Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [phase, setPhase] = useState<Phase>('rain')

  /* Reset phase when (re)activated */
  useEffect(() => {
    if (active) setPhase('rain')
  }, [active])

  /* Canvas rain loop */
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fit canvas to viewport
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const FONT_SIZE = 14
    const charArr = CHARS.split('')
    const numCols = Math.floor(canvas.width / FONT_SIZE)
    const numRows = Math.ceil(canvas.height / FONT_SIZE) + 1

    // Each column: current y-position (in rows) + individual speed
    const drops = Array.from({ length: numCols }, () => Math.random() * -60)
    const speeds = Array.from({ length: numCols }, () => 0.3 + Math.random() * 0.8)
    // Each column stores the last character drawn per row for the trail
    const trail: string[][] = Array.from({ length: numCols }, () =>
      Array.from({ length: numRows }, () => charArr[Math.floor(Math.random() * charArr.length)])
    )

    const RAIN_DURATION = 3500 // ms
    const startTime = performance.now()

    // Clear canvas to solid black at start
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const tick = () => {
      const elapsed = performance.now() - startTime

      if (elapsed >= RAIN_DURATION) {
        cancelAnimationFrame(rafRef.current)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setPhase('message')
        // After message is visible, fade it
        t1Ref.current = setTimeout(() => setPhase('fading'), 1600)
        // After fade, call onComplete
        t2Ref.current = setTimeout(onComplete, 2200)
        return
      }

      // Translucent black overlay creates the trail fade effect
      ctx.fillStyle = 'rgba(0,0,0,0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${FONT_SIZE}px monospace`

      for (let i = 0; i < numCols; i++) {
        const headRow = Math.floor(drops[i])
        const x = i * FONT_SIZE

        // Draw trail characters above the head (dimmer green)
        const TRAIL_LENGTH = 20
        for (let t = TRAIL_LENGTH; t > 0; t--) {
          const row = headRow - t
          if (row < 0 || row >= numRows) continue
          const trailAlpha = (TRAIL_LENGTH - t) / TRAIL_LENGTH
          const green = Math.floor(150 + trailAlpha * 105) // 150–255
          ctx.fillStyle = `rgba(0, ${green}, 0, ${0.15 + trailAlpha * 0.55})`
          const c = trail[i][row % numRows]
          ctx.fillText(c, x, row * FONT_SIZE)
        }

        // Leading character — bright white-green glow
        const headY = headRow * FONT_SIZE
        if (headY >= 0 && headY < canvas.height + FONT_SIZE) {
          const newChar = charArr[Math.floor(Math.random() * charArr.length)]
          trail[i][headRow % numRows] = newChar
          ctx.fillStyle = 'rgba(220, 255, 220, 0.98)'
          ctx.fillText(newChar, x, headY)
        }

        // Randomly reset column once it exits viewport
        if (headY > canvas.height && Math.random() > 0.972) {
          drops[i] = 0
        }
        drops[i] += speeds[i]
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (t1Ref.current) clearTimeout(t1Ref.current)
      if (t2Ref.current) clearTimeout(t2Ref.current)
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99990 }}
      aria-hidden="true"
    >
      {/* Canvas rain */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Message overlay — fades in after rain stops */}
      {(phase === 'message' || phase === 'fading') && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.72)',
            opacity: phase === 'fading' ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        >
          <p
            className="font-mono text-center px-8"
            style={{
              color: '#00ff41',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              textShadow: '0 0 20px #00ff41, 0 0 40px rgba(0,255,65,0.4)',
              letterSpacing: '0.04em',
            }}
          >
            {'> welcome to the matrix, recruiter.'}
            <span
              style={{
                display: 'inline-block',
                animation: 'blink 1s step-end infinite',
              }}
            >
              _
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
