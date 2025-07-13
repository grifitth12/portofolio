import { useState } from 'react'
import styles from '../styles/Sections.module.css'

export default function About() {
  const [showResume, setShowResume] = useState(false)

  // Function untuk handle download CV
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'YourName_Resume.pdf'
    link.click()
  }

  // Function untuk show/hide resume modal
  const toggleResumeModal = () => {
    setShowResume(!showResume)
  }

  return (
    <section className={`${styles.aboutSection} scrollElement`} id="about" data-animation="fadeInUp">
      <div className={styles.aboutGrid}>
        <div className={`${styles.aboutText} scrollLeft`} data-animation="slideInLeft">
          <h2>About Me</h2>
          <p>
            I'm a full-stack developer based in Bogor with 1 year of practical experience building web applications. 
            Currently still in school, I've worked on various real-world and personal projects that have helped me develop 
            a strong foundation in modern web development.
          </p>
          <p>
             I'm passionate about creating user-focused digital experiences and always strive to write clean, efficient, 
             and maintainable code. I'm a fast learner, detail-oriented, and enjoy tackling challenges that help me grow 
             both technically and professionally.
          </p>
          <p>
             Outside of coding, I enjoy learning new things, exploring creative ideas, and staying curious about how technology shapes the world around us.
          </p>
          <div className={styles.aboutCTA}>
            {/* Opsi 1: Buka PDF di tab baru untuk preview */}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
              View Resume
            </a>
            
            {/* Opsi 2: Buka modal untuk preview */}
            {/* <button onClick={toggleResumeModal} className={styles.resumeBtn}>
              View Resume
            </button> */}
          </div>
        </div>
        <div className={`${styles.aboutStats} scrollRight`} data-animation="slideInRight">
          <div className={`${styles.stat} scrollScale`} data-stagger>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
          <div className={`${styles.stat} scrollScale`} data-stagger>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={`${styles.stat} scrollScale`} data-stagger>
            <span className={styles.statNumber}>1+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
        </div>
      </div>
      
      {/* Modal untuk preview PDF */}
      {showResume && (
        <div className={styles.resumeModal} onClick={toggleResumeModal}>
          <div className={styles.resumeModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.resumeModalHeader}>
              <h3>Resume Preview</h3>
              <div className={styles.resumeModalActions}>
                <button onClick={handleDownloadResume} className={styles.downloadBtn}>
                  Download PDF
                </button>
                <button onClick={toggleResumeModal} className={styles.closeBtn}>
                  ×
                </button>
              </div>
            </div>
            <div className={styles.resumeModalBody}>
              <iframe
                src="/resume.pdf"
                width="100%"
                height="600px"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}