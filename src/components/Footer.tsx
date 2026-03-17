'use client'

export default function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container-custom">
        {/* Gradient accent line */}
        <div
          className="h-px mb-8"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--accent), var(--amber), transparent)',
            opacity: 0.15,
          }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <p
            className="font-mono text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Built with Next.js &amp; too much coffee ☕
          </p>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* TODO: Add real GitHub repo URL */}
            <a
              href="#"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              aria-label="View source on GitHub"
            >
              View source on GitHub
            </a>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>✦</span>
            <p
              className="font-mono text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              © 2026 Ali Smaili
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
