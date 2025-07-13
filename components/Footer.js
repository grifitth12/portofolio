// components/Footer.js
import styles from '../styles/Sections.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <span>© 2025 Portfolio. Designed with passion in Bogor.</span>
        </div>
        <div className={styles.footerRight}>
          <a 
            href="https://www.instagram.com/allvinrizky_?igsh=dGw4Ym84MmRwdGtp" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com/in/namaLinkedinKamu" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/grifitth12" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Github"
          >
            Github
          </a>
          <a 
            href="https://discord.com/users/1270375691099045953" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Discord"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
