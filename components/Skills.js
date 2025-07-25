"use client"

import { useState, useEffect, useRef } from "react"
import {
  Palette,
  Settings,
  Smartphone,
  Database,
  Wrench,
} from "lucide-react"
import styles from "../styles/Sections.module.css"
import homeStyles from "../styles/Home.module.css"

const skillsData = {
  frontend: {
    title: "Frontend Development",
    icon: Palette,
    skills: [
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "HTML/CSS", icon: "/icons/html5.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  backend: {
    title: "Backend Development",
    icon: Settings,
    skills: [
      { name: "Laravel", icon: "/icons/laravel.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "PHP", icon: "/icons/php.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
    ],
  },
  mobile: {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: "/icons/flutter.svg" },
      { name: "Dart", icon: "/icons/dart.svg" },
      { name: "React Native", icon: "/icons/react.svg" },
    ],
  },
  database: {
    title: "Database & Cloud",
    icon: Database,
    skills: [
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
    ],
  },
  tools: {
    title: "Tools & Software",
    icon: Wrench,
    skills: [
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Android Studio", icon: "/icons/androidstudio.svg" },
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Figma", icon: "/icons/figma.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "Terminal", icon: "/icons/bash.svg" },
    ],
  },
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const skillsSection = entry.target
          skillsSection.classList.add("visible")

          const header = skillsSection.querySelector(`.${styles.skillsHeader}`)
          if (header) {
            header.classList.add("scrollElement", "visible")
          }

          const categories = skillsSection.querySelectorAll(`.${styles.skillCategory}`)
          categories.forEach((category, index) => {
            setTimeout(() => {
              category.classList.add("scrollElement", "visible")
              const skillTags = category.querySelectorAll(`.${styles.skillTag}`)
              skillTags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                  tag.classList.add("visible")
                }, tagIndex * 50)
              })
            }, index * 100)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCategoryHover = (category) => setActiveCategory(category)
  const handleCategoryLeave = () => setActiveCategory(null)

  return (
    <section
      ref={skillsRef}
      className={`${styles.skillsSection} ${homeStyles.skills} scrollElement`}
      id="skills"
    >
      <div className={styles.skillsContainer}>
        <div className={styles.skillsHeader}>
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I use to build amazing applications</p>
        </div>

        <div className={`${styles.skillsGrid} ${isVisible ? styles.animate : ""}`}>
          {Object.entries(skillsData).map(([categoryKey, category], index) => {
            const CategoryIcon = category.icon
            return (
              <div
                key={categoryKey}
                className={`${styles.skillCategory} ${
                  activeCategory === categoryKey ? styles.active : ""
                } scrollElement`}
                onMouseEnter={() => handleCategoryHover(categoryKey)}
                onMouseLeave={handleCategoryLeave}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>
                    <CategoryIcon size={24} />
                  </div>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                </div>

                <div className={styles.skillsListGrid}>
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`${styles.skillTag} scrollElement`}
                      style={{
                        animationDelay: `${index * 0.1 + skillIndex * 0.05}s`,
                      }}
                    >
                      <div className={styles.skillIcon}>
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          width="32"
                          height="32"
                          style={{ objectFit: "contain", display: "block" }}
                        />
                      </div>
                      <span className={styles.skillName}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
