// pages/index.js
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Experience from '../components/Experience.js'
import Skills from '../components/Skills'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { animateElement, resetAnimation } = useScrollAnimations()

  useEffect(() => {
    // Page load animation
    document.body.classList.add('page-loading')
    
    const loadTimer = setTimeout(() => {
      document.body.classList.remove('page-loading')
      document.body.classList.add('page-loaded')
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(loadTimer)
  }, [])

  return (
    <>
      <Head>
        <title>Portfolio - Me</title>
        <meta name="description" content="Portofolio" />
        <link rel="icon" href="/favicon.ico?v=7" type="image/x-icon" />
      </Head>

      <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
        <Navigation />
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
