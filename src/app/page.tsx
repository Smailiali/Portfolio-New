'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import BootSequence from '@/components/BootSequence'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false)
  const handleBootComplete = useCallback(() => setBootComplete(true), [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <BootSequence onComplete={handleBootComplete} />
      <Navbar />
      <main>
        <Hero isReady={bootComplete} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
