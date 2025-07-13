"use client"

// hooks/useScrollAnimations.js - Stable version to prevent contact section disappearing

import { useEffect, useRef, useCallback } from "react"

export const useScrollAnimations = () => {
  const observerRef = useRef(null)
  const specialObserverRef = useRef(null)
  const animatedElementsRef = useRef(new Set())
  const scrollTimeoutRef = useRef(null)
  const resizeTimeoutRef = useRef(null)
  const protectedElementsRef = useRef(new Set()) // Protect certain elements from reset

  // Scroll handlers
  const navbarScrollHandlerRef = useRef(null)
  const parallaxHandlerRef = useRef(null)
  const progressHandlerRef = useRef(null)

  // Protected elements that shouldn't be reset
  const addProtectedElement = useCallback((element) => {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }
    if (element) {
      protectedElementsRef.current.add(element)
    }
  }, [])

  // Responsive configuration
  const getResponsiveConfig = useCallback(() => {
    const isMobile = window.innerWidth <= 768
    const isSmallMobile = window.innerWidth <= 480
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    return {
      threshold: isMobile ? 0.05 : 0.1,
      rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
      once: true,
      animationDuration: prefersReducedMotion ? 0 : isSmallMobile ? 400 : isMobile ? 600 : 800,
      staggerDelay: prefersReducedMotion ? 0 : isMobile ? 50 : 100,
      enableParallax: !isMobile && !prefersReducedMotion,
    }
  }, [])

  const handleIntersection = useCallback((entries) => {
    const config = getResponsiveConfig()

    entries.forEach((entry) => {
      const element = entry.target
      const animationType = element.dataset.animation || "fadeInUp"

      if (entry.isIntersecting && !animatedElementsRef.current.has(element)) {
        triggerAnimation(element, animationType, config)

        if (config.once) {
          animatedElementsRef.current.add(element)
          observerRef.current?.unobserve(element)
        }
      }
    })
  }, [])

  const triggerAnimation = useCallback((element, animationType, config) => {
    element.classList.remove("scroll-hidden", "scroll-pending")

    // Apply responsive animation duration
    if (config.animationDuration > 0) {
      element.style.transitionDuration = `${config.animationDuration}ms`
    }

    switch (animationType) {
      case "fadeInUp":
        element.classList.add("scrollElement", "visible")
        break
      case "slideInLeft":
        element.classList.add("scrollLeft", "visible")
        break
      case "slideInRight":
        element.classList.add("scrollRight", "visible")
        break
      case "scaleIn":
        element.classList.add("scrollScale", "visible")
        break
      case "staggered":
        handleStaggeredAnimation(element, config)
        break
      case "projectCard":
        element.classList.add("scrollVisible")
        break
      default:
        element.classList.add("visible")
    }

    // Add to protected elements if it's a key section
    if (element.id === 'contact' || element.closest('#contact')) {
      addProtectedElement(element)
    }

    element.dispatchEvent(
      new CustomEvent("animationTriggered", {
        detail: { type: animationType, config },
      }),
    )
  }, [addProtectedElement])

  const handleStaggeredAnimation = useCallback((container, config) => {
    const children = container.querySelectorAll("[data-stagger]")
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add("visible")
      }, index * config.staggerDelay)
    })
  }, [])

  const setupObservers = useCallback(() => {
    const config = getResponsiveConfig()

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    })

    specialObserverRef.current = new IntersectionObserver(handleIntersection, {
      threshold: config.threshold * 3,
      rootMargin: config.rootMargin.replace("-50px", "-100px"),
    })
  }, [handleIntersection, getResponsiveConfig])

  const initializeAnimations = useCallback(() => {
    const scrollElements = document.querySelectorAll(`
      .scrollElement,
      .scrollLeft,
      .scrollRight,
      .scrollScale,
      .projectCard,
      [data-animation],
      [data-scroll]
    `)

    scrollElements.forEach((element) => {
      // Don't reset protected elements
      if (protectedElementsRef.current.has(element)) {
        return
      }

      if (!element.classList.contains("visible")) {
        element.classList.add("scroll-hidden")
      }

      const useSpecialObserver = element.dataset.specialObserver === "true"
      const observer = useSpecialObserver ? specialObserverRef.current : observerRef.current
      observer?.observe(element)
    })

    // Initialize specific animations
    initializeSkillAnimations()
    initializeProjectAnimations()
  }, [])

  const initializeSkillAnimations = useCallback(() => {
    const skillBars = document.querySelectorAll(".skillProgress")
    const config = getResponsiveConfig()

    skillBars.forEach((bar) => {
      const skillItem = bar.closest(".skillItem")
      if (skillItem) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const percentage = bar.dataset.percentage || bar.style.width || "0%"
                const percentageValue = percentage.replace("%", "")

                setTimeout(() => {
                  bar.style.width = `${percentageValue}%`
                  bar.classList.add("animated")
                }, config.animationDuration / 2)
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.5 },
        )

        observer.observe(skillItem)
      }
    })
  }, [getResponsiveConfig])

  const initializeProjectAnimations = useCallback(() => {
    const projectCards = document.querySelectorAll(".projectCard")
    const config = getResponsiveConfig()

    projectCards.forEach((card, index) => {
      card.style.setProperty("--animation-delay", `${index * (config.staggerDelay / 1000)}s`)
      card.dataset.animation = "projectCard"
    })
  }, [getResponsiveConfig])

  const setupNavbarEffects = useCallback(() => {
    const navbar = document.querySelector(".nav")
    if (!navbar) return

    let lastScrollY = window.scrollY
    const config = getResponsiveConfig()

    const handleNavbarScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      const scrollThreshold = config.enableParallax ? 100 : 50

      if (currentScrollY > scrollThreshold) {
        if (isScrollingDown) {
          navbar.style.transform = "translateY(-100%)"
        } else {
          navbar.style.transform = "translateY(0)"
          navbar.style.background = "rgba(250, 250, 250, 0.98)"
        }
      } else {
        navbar.style.transform = "translateY(0)"
        navbar.style.background = "rgba(250, 250, 250, 0.95)"
      }

      lastScrollY = currentScrollY
    }

    navbarScrollHandlerRef.current = handleNavbarScroll
  }, [getResponsiveConfig])

  const setupParallaxEffects = useCallback(() => {
    const config = getResponsiveConfig()
    if (!config.enableParallax) return

    const parallaxElements = document.querySelectorAll("[data-parallax]")

    if (!parallaxElements.length) return

    const handleParallax = () => {
      const scrolled = window.pageYOffset

      parallaxElements.forEach((element) => {
        const rate = Number.parseFloat(element.dataset.parallax) || 0.5
        const yPos = -(scrolled * rate)
        element.style.transform = `translateY(${yPos}px)`
      })
    }

    parallaxHandlerRef.current = handleParallax
  }, [getResponsiveConfig])

  const setupProgressIndicators = useCallback(() => {
    const progressBars = document.querySelectorAll(".progress-bar")

    if (!progressBars.length) return

    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100

      progressBars.forEach((bar) => {
        bar.style.width = `${Math.min(progress, 100)}%`
      })
    }

    progressHandlerRef.current = updateProgress
  }, [])

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) return

    const config = getResponsiveConfig()
    const throttleDelay = config.enableParallax ? 16 : 32

    scrollTimeoutRef.current = setTimeout(() => {
      if (navbarScrollHandlerRef.current) navbarScrollHandlerRef.current()
      if (parallaxHandlerRef.current && config.enableParallax) parallaxHandlerRef.current()
      if (progressHandlerRef.current) progressHandlerRef.current()

      scrollTimeoutRef.current = null
    }, throttleDelay)
  }, [getResponsiveConfig])

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeoutRef.current)
    resizeTimeoutRef.current = setTimeout(() => {
      // Reinitialize observers with new responsive config
      observerRef.current?.disconnect()
      specialObserverRef.current?.disconnect()
      setupObservers()

      // Reset parallax elements
      const parallaxElements = document.querySelectorAll("[data-parallax]")
      parallaxElements.forEach((element) => {
        element.style.transform = ""
      })

      // Reinitialize animations
      initializeAnimations()
    }, 250)
  }, [setupObservers, initializeAnimations])

  // Public methods
  const animateElement = useCallback(
    (element, animationType = "fadeInUp") => {
      if (typeof element === "string") {
        element = document.querySelector(element)
      }

      if (element) {
        const config = getResponsiveConfig()
        triggerAnimation(element, animationType, config)
      }
    },
    [triggerAnimation, getResponsiveConfig],
  )

  const resetAnimation = useCallback((element) => {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }

    if (element) {
      // Don't reset protected elements (like contact section)
      if (protectedElementsRef.current.has(element)) {
        return
      }

      // Don't reset contact section and its children
      if (element.id === 'contact' || element.closest('#contact')) {
        return
      }
      
      element.classList.remove("visible", "scrollElement", "scrollLeft", "scrollRight", "scrollScale")
      element.style.transitionDuration = ""
      animatedElementsRef.current.delete(element)
    }
  }, [])

  const refreshAnimations = useCallback(() => {
    // Clear all animated elements except protected ones
    const elementsToKeep = new Set()
    
    protectedElementsRef.current.forEach(element => {
      elementsToKeep.add(element)
    })

    animatedElementsRef.current.forEach(element => {
      if (!elementsToKeep.has(element)) {
        element.classList.remove("visible")
        element.classList.add("scroll-hidden")
      }
    })

    // Clear non-protected elements
    animatedElementsRef.current = new Set([...elementsToKeep])

    setTimeout(() => {
      initializeAnimations()
    }, 100)
  }, [initializeAnimations])

  // Force keep contact section visible
  const forceContactVisible = useCallback(() => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.classList.add('visible')
      contactSection.style.opacity = '1'
      contactSection.style.transform = 'translateY(0)'
      addProtectedElement(contactSection)
    }
  }, [addProtectedElement])

  useEffect(() => {
    setupObservers()
    setupNavbarEffects()
    setupParallaxEffects()
    setupProgressIndicators()

    // Delay initialization to ensure DOM is ready
    const initTimer = setTimeout(() => {
      initializeAnimations()
      // Ensure contact section is always visible
      forceContactVisible()
    }, 100)

    // Add passive event listeners for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    // Listen for orientation changes on mobile
    window.addEventListener(
      "orientationchange",
      () => {
        setTimeout(handleResize, 100)
      },
      { passive: true },
    )

    return () => {
      clearTimeout(initTimer)
      clearTimeout(scrollTimeoutRef.current)
      clearTimeout(resizeTimeoutRef.current)

      observerRef.current?.disconnect()
      specialObserverRef.current?.disconnect()

      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [
    setupObservers,
    setupNavbarEffects,
    setupParallaxEffects,
    setupProgressIndicators,
    initializeAnimations,
    handleScroll,
    handleResize,
    forceContactVisible
  ])

  return {
    animateElement,
    resetAnimation,
    refreshAnimations,
    addProtectedElement,
    forceContactVisible,
  }
}

// Enhanced scroll animation CSS with stable visibility
export const scrollAnimationCSS = `
  /* Base scroll animation classes with stable visibility */
  .scroll-hidden {
    opacity: 0;
    transform: translateY(50px);
  }
  
  .scrollElement {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .scrollLeft {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(-50px);
    opacity: 0;
  }
  
  .scrollRight {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(50px);
    opacity: 0;
  }
  
  .scrollScale {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(0.8);
    opacity: 0;
  }
  
  .visible {
    opacity: 1 !important;
    transform: translateY(0) translateX(0) scale(1) !important;
  }
  
  .scrollVisible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  /* Specific protection for contact section */
  #contact {
    opacity: 1;
    transform: translateY(0);
  }
  
  #contact.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .scroll-hidden {
      transform: translateY(30px);
    }
    
    .scrollLeft {
      transform: translateX(-30px);
    }
    
    .scrollRight {
      transform: translateX(30px);
    }
    
    .scrollScale {
      transform: scale(0.9);
    }
    
    .scrollElement,
    .scrollLeft,
    .scrollRight,
    .scrollScale {
      transition-duration: 0.6s;
    }
  }
  
  @media (max-width: 480px) {
    .scroll-hidden {
      transform: translateY(20px);
    }
    
    .scrollLeft {
      transform: translateX(-20px);
    }
    
    .scrollRight {
      transform: translateX(20px);
    }
    
    .scrollScale {
      transform: scale(0.95);
    }
    
    .scrollElement,
    .scrollLeft,
    .scrollRight,
    .scrollScale {
      transition-duration: 0.5s;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .scroll-hidden,
    .scrollElement,
    .scrollLeft,
    .scrollRight,
    .scrollScale {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
  
  /* Performance optimizations */
  .scrollElement,
  .scrollLeft,
  .scrollRight,
  .scrollScale {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  .visible {
    will-change: auto;
  }
`