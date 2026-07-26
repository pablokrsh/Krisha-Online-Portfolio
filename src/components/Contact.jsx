import { useEffect, useRef, useState } from 'react'
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const contactCards = [
  {
    icon: <FiMapPin size={24} />,
    title: 'Address',
    lines: ['Poblacion Central Junction', 'Kapangan, Benguet'],
  },
  {
    icon: <FiMail size={24} />,
    title: 'Email',
    lines: ['krishaa.pablo@gmail.com'],
  },
  {
    icon: <FiPhone size={24} />,
    title: 'Phone',
    lines: ['0912 409 2596'],
  },
]

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Contact() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState({})

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!validateEmail(formData.email)) errs.email = 'Invalid email format'
    if (!formData.subject.trim()) errs.subject = 'Subject is required'
    if (!formData.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errs = validate()
    setErrors(errs)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const newFormData = { ...formData, [field]: value }
      const errs = {}
      if (!newFormData.name.trim()) errs.name = 'Name is required'
      if (!newFormData.email.trim()) errs.email = 'Email is required'
      else if (!validateEmail(newFormData.email)) errs.email = 'Invalid email format'
      if (!newFormData.subject.trim()) errs.subject = 'Subject is required'
      if (!newFormData.message.trim()) errs.message = 'Message is required'
      setErrors(errs)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length > 0) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTouched({})
    setErrors({})
  }

  const anim = (delay) =>
    reduced ? {} : { animation: sectionInView ? `fadeUp 0.7s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--el-bg)' }} aria-labelledby="contact-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16" style={anim(0)}>
          <p className="font-body text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--el-text-sub)' }}>Reach Out</p>
          <h2 id="contact-heading" className="font-heading text-4xl md:text-5xl font-semibold" style={{ color: 'var(--el-text)' }}>
            Get in Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, i) => (
            <div key={card.title} className="card-base card-hover text-center" style={anim(0.1 + i * 0.1)}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110" style={{ background: 'var(--el-accent)', color: 'var(--el-card)' }}>
                {card.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: 'var(--el-text)' }}>{card.title}</h3>
              {card.lines.map((line) => (
                <p key={line} className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mb-12" style={anim(0.3)}>
          <div className="card-base overflow-hidden p-0 h-64 relative">
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--el-bg)' }}>
              <div className="text-center">
                <FiMapPin size={48} style={{ color: 'var(--el-text-faint)' }} className="mx-auto mb-3" />
                <p className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>Kapangan, Benguet, Philippines</p>
                <p className="font-body text-xs mt-1" style={{ color: 'var(--el-text-faint)' }}>Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto" style={anim(0.4)}>
          <div className="card-base card-hover">
            <h3 className="font-heading text-xl font-semibold mb-6 text-center" style={{ color: 'var(--el-text)' }}>Send a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 rounded-[14px] text-center flex items-center justify-center gap-2" style={{ background: 'var(--el-highlight)', border: '1px solid var(--el-fill)', animation: 'scaleIn 0.4s cubic-bezier(.2,.8,.2,1) both' }}>
                <FiCheckCircle size={18} style={{ color: 'var(--el-accent)' }} />
                <p className="font-body text-sm" style={{ color: 'var(--el-accent)' }}>Thank you! Your message has been sent.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="font-body text-sm font-medium mb-1 block" style={{ color: 'var(--el-text)' }}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`input-base ${errors.name && touched.name ? 'input-error' : ''}`}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="font-body text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-body text-sm font-medium mb-1 block" style={{ color: 'var(--el-text)' }}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`input-base ${errors.email && touched.email ? 'input-error' : ''}`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="font-body text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="font-body text-sm font-medium mb-1 block" style={{ color: 'var(--el-text)' }}>Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  className={`input-base ${errors.subject && touched.subject ? 'input-error' : ''}`}
                  placeholder="Message subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && touched.subject && (
                  <p id="subject-error" className="font-body text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.subject}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="font-body text-sm font-medium mb-1 block" style={{ color: 'var(--el-text)' }}>Message</label>
                <textarea
                  id="contact-message"
                  className={`input-base min-h-[140px] resize-y ${errors.message && touched.message ? 'input-error' : ''}`}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && touched.message && (
                  <p id="message-error" className="font-body text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 relative overflow-hidden">
                <FiSend size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
