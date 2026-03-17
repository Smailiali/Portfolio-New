'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

/* ============================================
   SOCIAL LINK DATA
   ============================================ */
const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Smailiali',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/smailiali',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:smailikhaledali@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
]

/* ============================================
   CONTACT SECTION
   ============================================ */
export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  /**
   * TODO: Wire up real form submission here.
   * Options:
   *   - EmailJS: import emailjs from '@emailjs/browser' and call emailjs.send(...)
   *   - Formspree: change action to 'https://formspree.io/f/YOUR_ID' and method to POST
   *   - Resend / Nodemailer via a Next.js API route
   * For now, falls back to mailto: link so nothing is lost.
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )
    window.location.href = `mailto:smailikhaledali@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <motion.p
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          CONTACT
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-fluid-lg font-mono font-bold mb-12 max-w-2xl"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {`Let's build something`}{' '}
          <span style={{ color: 'var(--accent)' }}>together.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form — takes 3/5 width on desktop */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="font-mono text-xs tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                NAME
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                placeholder="John Doe"
                className="contact-input"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="font-mono text-xs tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                EMAIL
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                placeholder="john@example.com"
                className="contact-input"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-mono text-xs tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                required
                rows={6}
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                placeholder={`Hi Ali, I'd like to talk about...`}
                className="contact-input resize-none"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn-send-sweep mt-2">
              <span className="btn-inner">
                <span>{sent ? 'Opening mail client…' : 'Send Message'}</span>
                {!sent && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22 11 13 2 9l20-7z" />
                  </svg>
                )}
              </span>
            </button>
          </motion.form>

          {/* Sidebar — 2/5 width */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-between gap-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Availability badge */}
            <div className="flex items-center gap-3">
              <motion.span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: '#22c55e' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span
                className="font-mono text-sm tracking-wider"
                style={{ color: '#22c55e' }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Blurb */}
            <div>
              <p
                className="font-sans text-base leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Have a project, a role, or just want to talk shop? I read every message and
                reply within 24 hours.
              </p>

              {/* Direct email */}
              <a
                href="mailto:smailikhaledali@gmail.com"
                className="font-mono text-sm"
                style={{ color: 'var(--accent)' }}
              >
                smailikhaledali@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-3 group w-fit"
                  aria-label={s.label}
                >
                  <span
                    className="transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s.icon}
                  </span>
                  <span
                    className="font-mono text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transition-transform"
                    style={{ color: 'var(--accent)' }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
