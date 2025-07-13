// components/Experience.js
import styles from '../styles/Sections.module.css'
import homeStyles from '../styles/Home.module.css'

const experience = [
  {
    period: "2024 - Present",
    role: "Frontend Developer",
    company: "Personal Projects",
    description: "Developed modern and responsive UIs using React.js, Next.js, and Flask (Python) for various web applications, including a weather app with API integration."
  },
  {
    period: "2024 - Present",
    role: "Backend Developer",
    company: "Advanced Laravel Project",
    description: "Built a complex train ticket booking system using Laravel 12 with real-time seat selection, admin panel, QR ticketing, and role-based access management."
  },
  {
    period: "2025",
    role: "Cybersecurity Competition Finalist",
    company: "LKS (National Skills Competition)",
    description: "Participated in the LKS Cybersecurity competition and achieved 4th place at the regional level, focusing on hardening, firewall, IDS, and system security."
  },
  {
    period: "2025 - Present",
    role: "App Developer",
    company: "Flutter Project",
    description: "Created a productivity mobile app named 'Tadayo' using Flutter, featuring a modular to-do list system, custom UI design, and local data management."
  }
]

export default function Experience() {
  return (
    <section className={styles.experienceSection} id="experience">
      <div className={homeStyles.sectionHeader}>
        <h2>Experience</h2>
        <p>My professional journey in design and creative direction.</p>
      </div>
      <div className={styles.experienceList}>
        {experience.map((exp, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.expPeriod}>{exp.period}</div>
            <div className={styles.expContent}>
              <h3>{exp.role}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}