// components/Contact.js
import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import styles from '../styles/Sections.module.css'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  })
  const [isVisible, setIsVisible] = useState(true)

  const sectionRef = useRef(null)
  const { animateElement } = useScrollAnimations()

  const whatsappNumber = "6281398036877"
  const whatsappMessage = "Halo! Saya tertarik untuk berdiskusi tentang project. Bisa kita ngobrol?"

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, '_blank')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await emailjs.send(
        'service_4e8araf',
        'template_9e1jfr1',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          date: new Date().toLocaleDateString()
        },
        'GMiE2rauv6Xzy94fE'
      )
      console.log('Email sent successfully:', result)

      try {
        await emailjs.send(
          'service_4e8araf',
          'template_fwjep16',
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
          },
          'GMiE2rauv6Xzy94fE'
        )
        console.log('Auto-reply sent successfully')
      } catch (autoReplyError) {
        console.warn('Auto-reply failed:', autoReplyError)
      }

      setFormData({ name: '', email: '', message: '' })
      showNotification('success', 'Email berhasil dikirim! Terima kasih sudah menghubungi saya.')
      setTimeout(() => {
        setShowForm(false)
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible')
        }
      }, 5000)

    } catch (error) {
      console.error('Error sending email:', error)
      showNotification('error', `Maaf, terjadi kesalahan: ${error.text || error.message || 'Unknown error'}. Silakan coba lagi atau hubungi via WhatsApp.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({ name: '', email: '', message: '' })
    setNotification({ show: false, type: '', message: '' })
    if (sectionRef.current) {
      sectionRef.current.classList.add('visible')
    }
  }

  const handleShowForm = () => {
    setShowForm(true)
    setNotification({ show: false, type: '', message: '' })
  }

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.classList.add('visible')
    }
  }, [showForm])

  return (
    <section
      ref={sectionRef}
      className={`${styles.contactSection} scrollElement visible`}
      id="contact"
      data-animation="fadeInUp"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div className={`${styles.contactContent} scrollScale visible`} data-animation="scaleIn">
        <h2>Let's Work Together</h2>
        <p>Ready to bring your vision to life? Let's discuss your next project.</p>

        {notification.show && (
          <div className={`${styles.notification} ${styles[notification.type]} ${styles.show}`}>
            <div className={styles.notificationContent}>
              <span className={styles.notificationIcon}>
                {notification.type === 'success' ? '✅' : '❌'}
              </span>
              <p>{notification.message}</p>
            </div>
            <div className={styles.notificationProgress}></div>
          </div>
        )}

        {!showForm ? (
          <div className={styles.contactButtons} key="contact-buttons">
            <button
              onClick={openWhatsApp}
              className={`${styles.contactBtn} scrollLeft visible`}
              data-stagger
            >
              <img
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                className={styles.iconInline}
              />
              WhatsApp
            </button>
            <button
              onClick={handleShowForm}
              className={`${styles.scheduleBtn} scrollRight visible`}
              data-stagger
            >
              <img
                src="/icons/mail.svg"
                alt="Email"
                className={styles.iconInline}
              />
              Send Email
            </button>
          </div>
        ) : (
          <div key="form-container">
            <form onSubmit={handleSubmit} className={styles.emailForm}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                disabled={isLoading}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                disabled={isLoading}
              />
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className={styles.formTextarea}
                disabled={isLoading}
              />
              <div className={styles.formButtons}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
                >
                  {isLoading ? (
                    <>
                      <span className={styles.loadingSpinner}></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelBtn}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
