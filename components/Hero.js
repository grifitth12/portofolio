// components/Hero.js
import styles from '../styles/HeroSection.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContent} heroContent`}>
        <h1 className={styles.heroTitle}>
          <span className={`${styles.titleLine} scrollLeft`} data-stagger>Web</span>
          <span className={`${styles.titleLine} scrollLeft`} data-stagger>& Mobile Apps</span>
          <span className={`${styles.titleLine} scrollLeft`} data-stagger>Developer</span>
        </h1>
        <p className={`${styles.heroDescription} scrollElement`} data-animation="fadeInUp">
          Full-stack developer crafting high-performance web and mobile applications.
          Combining elegant UI/UX with scalable backend systems to deliver seamless digital experiences.
        </p>
        <div className={styles.heroButtons}>
          <a href="#work" className={`${styles.primaryBtn} scrollScale`} data-stagger>View Work</a>
          <a href="#contact" className={`${styles.secondaryBtn} scrollScale`} data-stagger>Get in Touch</a>
        </div>
      </div>
      <div className={`${styles.heroImage} heroImage scrollRight`} data-animation="slideInRight">
        <div className={styles.imageWrapper}>
          <img 
            src="images/alvin.jpg" 
            alt="Developer workspace"
          />
        </div>
      </div>
    </section>
  )
}
