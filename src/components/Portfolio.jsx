import { useState, useEffect, useCallback, useRef } from 'react'
import { FiArrowLeft, FiEdit2, FiMapPin, FiCalendar, FiTag, FiClock, FiPlus, FiX, FiUpload, FiTrash2, FiCheck } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import FBSEImg from '../assets/img/Portfolio/FBSE.png'
import CIImg from '../assets/img/Portfolio/CI.png'

const defaultCategories = ['All', 'Academic Achievement', 'Professional Development', 'Research', 'Creative', 'Activities']

const initialCertificates = [
  {
    id: 1,
    title: 'Filipino Brand of Service Excellence',
    category: 'Professional Development',
    place: 'Municipal Gymnasium, Kapangan, Benguet',
    date: 'June 17, 2026',
    time: '8 hours (face-to-face training)',
    keywords: ['Service Excellence', 'Tourism Training', 'Professional Growth'],
    description: 'This certificate recognizes your participation in an 8-hour face-to-face training conducted by the Department of Tourism, Philippines. The program focuses on enhancing service quality and professionalism in the tourism and hospitality industry, promoting the Filipino Brand of Service Excellence. It highlights your commitment to improving customer service skills and contributing to the tourism sector\'s goal of delivering world-class experiences with genuine Filipino warmth and hospitality.',
    image: FBSEImg,
  },
  {
    id: 2,
    title: 'Student Internship Program',
    category: 'Academic Achievement',
    place: 'Lomon, Paykek, Kapangan, Benguet',
    date: 'May 25 – June 25, 2026',
    time: 'Issued June 29, 2026',
    keywords: ['Environmental Science', 'Internship Experience', 'Professional Development'],
    description: 'This certificate acknowledges your successful completion of the Student Internship Program under the Bachelor of Science in Environmental Science at Benguet State University. The internship, conducted by the Municipality of Kapangan, Province of Benguet, provided hands-on experience in environmental management and local governance. It reflects your dedication, professionalism, and commitment to applying environmental science principles in real-world community settings—showcasing your readiness for future roles in sustainability and environmental stewardship.',
    image: CIImg,
  },
]

function CertificateModal({ cert, isNew, onClose, onSave, categories }) {
  const [isEditing, setIsEditing] = useState(isNew)
  const [editForm, setEditForm] = useState(() => ({
    title: cert?.title || '',
    category: cert?.category || categories[0] || '',
    place: cert?.place || '',
    date: cert?.date || '',
    time: cert?.time || '',
    keywords: cert?.keywords ? [...cert.keywords] : [],
    description: cert?.description || '',
  }))
  const [editImagePreview, setEditImagePreview] = useState(cert?.image || null)
  const [newKeyword, setNewKeyword] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && !isEditing) onClose()
  }, [onClose, isEditing])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const updateField = (field, value) => setEditForm(prev => ({ ...prev, [field]: value }))

  const addKeyword = () => {
    const kw = newKeyword.trim()
    if (kw && !editForm.keywords.includes(kw)) {
      updateField('keywords', [...editForm.keywords, kw])
      setNewKeyword('')
    }
  }

  const removeKeyword = (kw) => updateField('keywords', editForm.keywords.filter(k => k !== kw))

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setEditImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleSave = () => {
    onSave({
      id: cert?.id || Date.now(),
      ...editForm,
      image: editImagePreview,
    })
    onClose()
  }

  const inputStyle = {
    background: 'var(--el-bg)',
    color: 'var(--el-text)',
    border: '1px solid var(--el-border)',
  }

  const labelStyle = {
    color: 'var(--el-text-sub)',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && !isEditing) onClose() }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-[24px] overflow-hidden"
        style={{ background: 'var(--el-card)', boxShadow: 'var(--shadow-hover)' }}
        role="dialog"
        aria-modal="true"
        aria-label={cert?.title || 'New Certificate'}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: 'var(--el-card)', borderBottom: '1px solid var(--el-border)' }}
        >
          <button
            onClick={() => isEditing ? setIsEditing(false) : onClose()}
            className="flex items-center gap-2 px-3 py-2 rounded-[12px] font-body text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ color: 'var(--el-text)', background: 'var(--el-bg)' }}
          >
            <FiArrowLeft size={18} />
            <span>{isEditing ? 'Cancel Edit' : 'Back'}</span>
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-[12px] font-body text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ color: 'var(--el-text)', background: 'var(--el-bg)' }}
            >
              <FiEdit2 size={16} />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {isEditing ? (
            <div
              className={`rounded-[18px] border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${isDragging ? 'scale-[1.02]' : ''}`}
              style={{
                background: isDragging ? 'color-mix(in srgb, var(--el-accent) 10%, var(--el-bg))' : 'var(--el-bg)',
                borderColor: isDragging ? 'var(--el-accent)' : 'var(--el-border)',
                minHeight: '200px',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {editImagePreview ? (
                <img src={editImagePreview} alt="Preview" className="w-full h-auto object-contain rounded-[14px]" style={{ maxHeight: '350px' }} />
              ) : (
                <>
                  <FiUpload size={40} style={{ color: 'var(--el-text-sub)' }} />
                  <p className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>Drag & drop an image here, or click to browse</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="rounded-[18px] overflow-hidden" style={{ background: 'var(--el-bg)' }}>
              <img
                src={editImagePreview}
                alt={`Certificate: ${editForm.title}`}
                className="w-full h-auto object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <label className="font-body text-xs font-medium uppercase tracking-wider block" style={labelStyle}>Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="input-base"
                    style={inputStyle}
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium uppercase tracking-wider mb-3"
                  style={{ background: 'var(--el-accent)', color: 'var(--el-card)' }}
                >
                  {editForm.category}
                </span>
              )}

              {isEditing ? (
                <div className="space-y-2 mt-3">
                  <label className="font-body text-xs font-medium uppercase tracking-wider block" style={labelStyle}>Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="input-base text-xl font-semibold"
                    style={inputStyle}
                    placeholder="Certificate title"
                  />
                </div>
              ) : (
                <h3 className="font-heading text-2xl md:text-3xl font-semibold" style={{ color: 'var(--el-text)' }}>
                  {editForm.title}
                </h3>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium uppercase tracking-wider flex items-center gap-2" style={labelStyle}>
                      <FiMapPin size={14} /> Location
                    </label>
                    <input type="text" value={editForm.place} onChange={(e) => updateField('place', e.target.value)} className="input-base" style={inputStyle} placeholder="Venue, Municipality" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium uppercase tracking-wider flex items-center gap-2" style={labelStyle}>
                      <FiCalendar size={14} /> Date
                    </label>
                    <input type="text" value={editForm.date} onChange={(e) => updateField('date', e.target.value)} className="input-base" style={inputStyle} placeholder="e.g. June 17, 2026" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium uppercase tracking-wider flex items-center gap-2" style={labelStyle}>
                      <FiClock size={14} /> Duration
                    </label>
                    <input type="text" value={editForm.time} onChange={(e) => updateField('time', e.target.value)} className="input-base" style={inputStyle} placeholder="e.g. 8 hours (face-to-face)" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 p-4 rounded-[14px]" style={{ background: 'var(--el-bg)' }}>
                    <FiMapPin size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--el-accent)' }} />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--el-text-sub)' }}>Location</p>
                      <p className="font-body text-sm" style={{ color: 'var(--el-text)' }}>{editForm.place}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-[14px]" style={{ background: 'var(--el-bg)' }}>
                    <FiCalendar size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--el-accent)' }} />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--el-text-sub)' }}>Date</p>
                      <p className="font-body text-sm" style={{ color: 'var(--el-text)' }}>{editForm.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-[14px]" style={{ background: 'var(--el-bg)' }}>
                    <FiClock size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--el-accent)' }} />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--el-text-sub)' }}>Duration</p>
                      <p className="font-body text-sm" style={{ color: 'var(--el-text)' }}>{editForm.time}</p>
                    </div>
                  </div>
                </>
              )}

              <div className={`flex items-start gap-3 p-4 rounded-[14px] ${isEditing ? 'col-span-full' : ''}`} style={{ background: 'var(--el-bg)' }}>
                <FiTag size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--el-accent)' }} />
                <div className="flex-1">
                  <p className="font-body text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--el-text-sub)' }}>Keywords</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {editForm.keywords.map((kw) => (
                          <span key={kw} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-body rounded-full" style={{ background: 'var(--el-card)', color: 'var(--el-text)', border: '1px solid var(--el-border)' }}>
                            {kw}
                            <button onClick={() => removeKeyword(kw)} className="hover:opacity-70" style={{ color: 'var(--el-text-sub)' }}>
                              <FiX size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword() } }}
                          className="input-base text-xs flex-1"
                          style={inputStyle}
                          placeholder="Add keyword..."
                        />
                        <button onClick={addKeyword} className="px-3 py-1 rounded-[10px] text-xs font-body font-medium" style={{ background: 'var(--el-accent)', color: 'var(--el-card)' }}>
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {editForm.keywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 text-xs font-body rounded-full" style={{ background: 'var(--el-card)', color: 'var(--el-text)', border: '1px solid var(--el-border)' }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[14px]" style={{ background: 'var(--el-bg)' }}>
              <p className="font-body text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--el-text-sub)' }}>Description</p>
              {isEditing ? (
                <textarea
                  value={editForm.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={5}
                  className="input-base text-sm leading-relaxed resize-y"
                  style={inputStyle}
                  placeholder="Describe the certificate..."
                />
              ) : (
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--el-text)' }}>{editForm.description}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div
            className="sticky bottom-0 z-10 flex items-center justify-end gap-3 px-6 py-4"
            style={{ background: 'var(--el-card)', borderTop: '1px solid var(--el-border)' }}
          >
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] font-body text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ color: 'var(--el-text)', background: 'var(--el-bg)', border: '1px solid var(--el-border)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] font-body text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ color: 'var(--el-card)', background: 'var(--el-accent)' }}
            >
              <FiCheck size={16} />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [sectionRef, sectionInView] = useInView()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedCert, setSelectedCert] = useState(null)
  const [isNewCert, setIsNewCert] = useState(false)
  const [isManaging, setIsManaging] = useState(false)
  const [categories, setCategories] = useState(defaultCategories)
  const [certificates, setCertificates] = useState(initialCertificates)
  const reduced = useReducedMotion()

  const filtered = activeCategory === 'All' ? certificates : certificates.filter(c => c.category === activeCategory)
  const anim = (delay) => reduced ? {} : { animation: sectionInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  const handleSaveCert = (cert) => {
    setCertificates(prev => {
      const idx = prev.findIndex(c => c.id === cert.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = cert
        return next
      }
      return [...prev, cert]
    })
  }

  const handleDeleteCert = (id) => {
    setCertificates(prev => prev.filter(c => c.id !== id))
  }

  const handleOpenNew = () => {
    setIsNewCert(true)
    setSelectedCert(null)
  }

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--el-bg-alt)' }} aria-labelledby="portfolio-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16" style={anim(0)}>
          <p className="font-body text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--el-text-sub)' }}>My Achievements</p>
          <h2 id="portfolio-heading" className="font-heading text-4xl md:text-5xl font-semibold" style={{ color: 'var(--el-text)' }}>Portfolio</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12" style={anim(0.1)}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat}
              className="px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={activeCategory === cat
                ? { background: 'var(--el-accent)', color: 'var(--el-card)', boxShadow: 'var(--shadow)', transform: 'scale(1.05)' }
                : { background: 'var(--el-card)', color: 'var(--el-text)', border: '1px solid var(--el-border)' }
              }
            >{cat}</button>
          ))}
          <button
            onClick={() => setIsManaging(!isManaging)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: isManaging ? 'var(--el-accent)' : 'var(--el-card)',
              color: isManaging ? 'var(--el-card)' : 'var(--el-text)',
              border: '1px solid var(--el-border)',
            }}
            title={isManaging ? 'Done managing' : 'Manage portfolio'}
          >
            <FiEdit2 size={15} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cert, index) => (
            <article
              key={cert.id}
              className="card-neo card-neo-hover group flex flex-col cursor-pointer relative"
              style={reduced ? {} : { animation: sectionInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${0.2 + index * 0.1}s both` : 'none' }}
              onClick={() => { if (!isManaging) { setSelectedCert(cert); setIsNewCert(false) } }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (!isManaging && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setSelectedCert(cert); setIsNewCert(false) } }}
            >
              {isManaging && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteCert(cert.id) }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                  style={{ background: 'var(--el-accent)', color: 'var(--el-card)' }}
                  title="Delete certificate"
                >
                  <FiX size={16} />
                </button>
              )}

              <div className="rounded-[18px] mb-6 overflow-hidden" style={{ background: 'var(--el-bg)' }}>
                <img
                  src={cert.image}
                  alt={`Certificate: ${cert.title}`}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{ maxHeight: '260px' }}
                />
              </div>

              <div className="flex-1 flex flex-col">
                <span className="font-body text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--el-text-sub)' }}>{cert.category}</span>
                <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--el-text)' }}>{cert.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <FiMapPin size={14} style={{ color: 'var(--el-accent)' }} />
                    <span className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>{cert.place}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar size={14} style={{ color: 'var(--el-accent)' }} />
                    <span className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>{cert.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {cert.keywords.map((kw) => (
                    <span key={kw} className="px-3 py-1 text-xs font-body rounded-full transition-colors duration-300" style={{ background: 'var(--el-bg)', color: 'var(--el-text)' }}>{kw}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {isManaging && (
            <article
              className="card-neo flex flex-col items-center justify-center cursor-pointer min-h-[340px] border-2 border-dashed transition-all duration-300 hover:scale-[1.02]"
              style={{ borderColor: 'var(--el-border)', background: 'transparent' }}
              onClick={handleOpenNew}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenNew() } }}
            >
              <FiPlus size={40} style={{ color: 'var(--el-text-sub)' }} className="mb-3" />
              <span className="font-body text-sm font-medium" style={{ color: 'var(--el-text-sub)' }}>Add Certificate</span>
            </article>
          )}
        </div>

        <div className="text-center mt-12" style={anim(0.7)}><p className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>More achievements coming soon — stay tuned!</p></div>
      </div>

      {(selectedCert || isNewCert) && (
        <CertificateModal
          cert={selectedCert}
          isNew={isNewCert}
          onClose={() => { setSelectedCert(null); setIsNewCert(false) }}
          onSave={handleSaveCert}
          categories={categories}
        />
      )}
    </section>
  )
}
