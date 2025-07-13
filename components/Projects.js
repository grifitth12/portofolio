// components/Projects.js
import { useState } from 'react'
import styles from '../styles/Projects.module.css'
import homeStyles from '../styles/Home.module.css'

const projects = [
  {
    id: 1,
    title: "Soraki-Web",
    category: "web",
    year: "2025",
    image: "/images/soraki.jpg",
    description: "Soraki is a sleek weather app built with Flask, providing real-time forecasts, air quality, and UV index with a fresh, modern UI.."
  },
  {
    id: 2,
    title: "Tokiyo-Web",
    category: "Web",
    year: "2024",
    image: "/images/tokiyo.jpg",
    description: "Tokiyo is a minimalist Pomodoro timer app designed to boost focus and productivity through timeboxing, built with a clean and calming interface."
  },
  {
    id: 3,
    title: "Tadayo-App",
    category: "App-Mobile",
    year: "2025",
    image: "/images/tadayo.jpg",
    description: "Tadayo is a dynamic to-do list app built with Flutter, featuring custom UI, user profile editing, and modular task management."
  },
  {
    id: 4,
    title: "Tadaru-App",
    category: "App-Mobile",
    year: "2025",
    image: "/images/tadaru.jpg",
    description: "Tadaru is a minimalist and cozy e-book app built with Flutter. Save books, manage your reading list, and enjoy a calm reading experience — anytime, anywhere."
  },
  {
    id: 5,
    title: "Kaozen",
    category: "web",
    year: "2024",
    image: "/images/kaozen.jpg",
    description: "Kaozen is a modern face authentication system built with Python. It uses facial recognition to identify users securely and efficiently, blending simplicity with advanced technology."
  },
  {
    id: 6,
    title: "Tadeki-Web",
    category: "web",
    year: "2025",
    image: "/images/tadeki.jpg",
    description: "Tadeki is a Laravel-based train ticketing app with real-time seat checking, QR code tickets, payment simulation, station management, and admin role control."
  }
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    
    // Trigger filter animation untuk project cards
    const projectCards = document.querySelectorAll('.projectCard')
    projectCards.forEach((card, index) => {
      const cardCategories = card.dataset.category?.split(',') || [card.dataset.category]
      const shouldShow = filter === 'all' || cardCategories.includes(filter)
      
      if (shouldShow) {
        card.classList.remove('filterOut')
        card.classList.add('filterIn')
        setTimeout(() => {
          card.style.display = 'block'
        }, index * 50)
      } else {
        card.classList.remove('filterIn')
        card.classList.add('filterOut')
        setTimeout(() => {
          if (card.classList.contains('filterOut')) {
            card.style.display = 'none'
          }
        }, 300)
      }
    })
  }

  return (
    <>
      {/* Filter Navigation */}
      <section className={`${styles.filterSection} ${styles.projectsSection} scrollElement`} id="work" data-animation="fadeInUp">
        <div className={`${homeStyles.sectionHeader} scrollElement`} data-animation="fadeInUp">
          <h2>Selected Work</h2>
          <p>A collection of recent projects spanning web applications, mobile apps, and full-stack solutions.</p>
        </div>
        <div className={`${styles.filterNav} scrollElement staggered-container`} data-animation="fadeInUp">
          {['all', 'web', 'mobile'].map((filter, index) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => handleFilterClick(filter)}
              data-stagger
              style={{ '--stagger-delay': `${index * 0.1}s` }}
            >
              {filter === 'all' ? 'All Work' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <article 
            key={project.id} 
            className={`${styles.projectCard} projectCard scrollElement`}
            data-animation="projectCard"
            data-category={project.category}
            style={{ 
              '--animation-delay': `${index * 0.1}s`,
              '--item-index': index 
            }}
          >
            <div className={styles.projectImage}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className={styles.projectOverlay}>
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className={styles.year}>{project.year}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
