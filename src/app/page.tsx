import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Sections will be imported here as they are built */}
        <section
          id="hero"
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '1rem' }}>
            {'> portfolio loading... phase 1 complete.'}
          </p>
        </section>
      </main>
    </>
  )
}
