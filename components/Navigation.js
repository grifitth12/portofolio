// components/Navigation.js
import { useState, useEffect } from 'react'
import styles from '../styles/Navigation.module.css'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(`.${styles.nav}`)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
 useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'auto'
  }

  return () => {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'auto'
  }
}, [isMenuOpen])

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span>Portfolio</span>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.navLinks}>
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Hamburger Button */}
      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <a href="#work" onClick={handleLinkClick}>Work</a>
          <a href="#experience" onClick={handleLinkClick}>Experience</a>
          <a href="#skills" onClick={handleLinkClick}>Skills</a>
          <a href="#about" onClick={handleLinkClick}>About</a>
          <a href="#contact" onClick={handleLinkClick}>Contact</a>
        </div>
      </div>
    </nav>
  )
}