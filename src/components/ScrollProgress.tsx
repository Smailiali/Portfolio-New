'use client'

import { useScrollProgress } from '@/utils/hooks'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full transition-none origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, #00e5ff, #ffb300)',
          boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
        }}
      />
    </div>
  )
}
