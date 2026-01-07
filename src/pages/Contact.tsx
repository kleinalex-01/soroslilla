import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FadeIn } from '../components/FadeIn'
import './Contact.scss'

// Initialize EmailJS - Replace with your Public Key from emailjs.com
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'

// Initialize on component mount
emailjs.init(EMAILJS_PUBLIC_KEY)

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  submit?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // Initialize EmailJS
  useEffect(() => {
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
      console.warn('EmailJS not configured. Please set your keys in Contact.tsx')
    }
  }, [])

  // Email validation regex (RFC 5322 simplified)
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation (basic international format)
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .trim()
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező'
    } else if (formData.name.length < 2) {
      newErrors.name = 'A név legalább 2 karakter hosszú legyen'
    } else if (formData.name.length > 100) {
      newErrors.name = 'A név maximum 100 karakter lehet'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Az email cím megadása kötelező'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Kérjük, adjon meg érvényes email címet'
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Kérjük, adjon meg érvényes telefonszámot'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'A tárgy megadása kötelező'
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'A tárgy legalább 5 karakter hosszú legyen'
    } else if (formData.subject.length > 100) {
      newErrors.subject = 'A tárgy maximum 100 karakter lehet'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Az üzenet megadása kötelező'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Az üzenet legalább 10 karakter hosszú legyen'
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Az üzenet maximum 5000 karakter lehet'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const sanitized = sanitizeInput(value)

    setFormData((prev) => ({
      ...prev,
      [name]: sanitized
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
      setSubmitStatus('error')
      setSubmitMessage('Az email szolgáltatás nincs konfigurálva. Kérjük, később próbálkozzon.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Prepare template parameters
      const templateParams = {
        to_email: 'contact@soroslilla.hu', // Your email address
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        phone: formData.phone.trim() || 'Nincs megadva',
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        reply_to: formData.email.trim()
      }

      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('success')
      setSubmitMessage('Köszönjük az üzenetet! Hamarosan felvesszük Önnel a kapcsolatot.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setSubmitMessage(
        'Az üzenet küldése során hiba történt. Kérjük, próbálja meg később.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <FadeIn>
        <section className="section contact-section">
          <div className="container">
            <div className="section__header">
              <span className="section__subtitle">Elérhetőség</span>
              <h1 className="section__title">Lépjen velünk kapcsolatba</h1>
              <p className="section__description">
                Kérdéseivel vagy időpontfoglalási kérésével forduljon hozzánk. Válaszolunk az üzenetekre 24 órán belül.
              </p>
            </div>

            <div className="contact__content">
              {/* Contact Methods */}
              <FadeIn delay={0.1} direction="left">
                <div className="contact__methods">
                  <div className="contact__method">
                    <div className="contact__method-icon">📞</div>
                    <h3 className="contact__method-title">Telefonon</h3>
                    <p className="contact__method-text">
                      Hívjon közvetlenül az időpontfoglaláshoz vagy kérdésekhez.
                    </p>
                    <a href="tel:+36701234567" className="contact__phone-cta">
                      +36 (70) 123-4567
                    </a>
                    <p className="contact__method-hours">
                      Hétfő - Péntek: 9:00 - 18:00<br />
                      Szombat: 10:00 - 16:00<br />
                      Vasárnap: Zárva
                    </p>
                  </div>

                  <div className="contact__method">
                    <div className="contact__method-icon">📍</div>
                    <h3 className="contact__method-title">Szalon Helye</h3>
                    <p className="contact__method-text">
                      Soros Lilla Szépségszalon<br />
                      1234 Budapest, Főút 123.
                    </p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact__map-link">
                      Irányok a térképen
                    </a>
                  </div>

                  <div className="contact__method">
                    <div className="contact__method-icon">⏰</div>
                    <h3 className="contact__method-title">Megközelíthetőség</h3>
                    <p className="contact__method-text">
                      Parkolás: Ingyenes parkolóhely<br />
                      Közlekedés: M2 metró + 5 perces séta<br />
                      Buszmegállók: 6 és 12-es járatok
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Contact Form */}
              <FadeIn delay={0.2} direction="right">
                <div className="contact__form-wrapper">
                  <h2 className="contact__form-title">Üzenet küldése</h2>

                  {submitStatus === 'success' && (
                    <div className="contact__alert contact__alert--success">
                      ✓ {submitMessage}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="contact__alert contact__alert--error">
                      ✕ {submitMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact__form" noValidate>
                    {/* Name Field */}
                    <div className="form__group">
                      <label htmlFor="name" className="form__label">
                        Név <span className="form__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        required
                        className={`form__input ${errors.name ? 'form__input--error' : ''}`}
                        placeholder="Teljes név"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <span id="name-error" className="form__error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form__group">
                      <label htmlFor="email" className="form__label">
                        Email <span className="form__required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                        placeholder="email@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className="form__error">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="form__group">
                      <label htmlFor="phone" className="form__label">
                        Telefonszám <span className="form__optional">(opcionális)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form__input ${errors.phone ? 'form__input--error' : ''}`}
                        placeholder="+36 (70) 123-4567"
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <span id="phone-error" className="form__error">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div className="form__group">
                      <label htmlFor="subject" className="form__label">
                        Tárgy <span className="form__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={100}
                        required
                        className={`form__input ${errors.subject ? 'form__input--error' : ''}`}
                        placeholder="Üzenet tárgya"
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                      />
                      {errors.subject && (
                        <span id="subject-error" className="form__error">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="form__group">
                      <label htmlFor="message" className="form__label">
                        Üzenet <span className="form__required">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={5000}
                        required
                        rows={6}
                        className={`form__textarea ${errors.message ? 'form__input--error' : ''}`}
                        placeholder="Írja meg az üzenetét..."
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      <span className="form__char-count">
                        {formData.message.length} / 5000
                      </span>
                      {errors.message && (
                        <span id="message-error" className="form__error">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--primary btn--lg contact__submit"
                    >
                      {isSubmitting ? 'Küldés...' : 'Üzenet küldése'}
                    </button>

                    <p className="contact__form-disclaimer">
                      Az adatai biztonságban vannak. Csak az üzenet küldéséhez használjuk fel őket.
                    </p>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
