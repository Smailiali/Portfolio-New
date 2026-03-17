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
            {/* TODO: Replace with real portfolio GitHub repo URL when published */}
            <a
              href="https://github.com/Smailiali/Portfolio-New"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200 hover:text-[var(--accent)]"
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

        {/* Konami code hint */}
        <p
          className="font-mono text-center mt-6"
          style={{ fontSize: '0.875rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
        >
          <span style={{ opacity: 0.5 }}>{'// '}</span>
          {'↑ ↑ ↓ ↓ ← → ← → B A'}
        </p>
      </div>
    </footer>
  )
}
