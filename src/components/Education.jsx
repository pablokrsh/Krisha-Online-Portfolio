import { useEffect, useRef, useState } from 'react'
import { FiBookOpen, FiAward, FiTarget, FiMapPin } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const timeline = [
  {
    year: '2023 – Present',
    title: 'Bachelor of Science in Environmental Science (BSES)',
    institution: 'Benguet State University (BSU)',
    college: 'College of Natural Sciences (CNS)',
    location: 'La Trinidad, Benguet',
    description: 'Currently pursuing a Bachelor of Science in Environmental Science at Benguet State University under the College of Natural Sciences. Passionate about environmental sustainability, ecological conservation, and continuous learning through academic and practical experiences.',
    icon: <FiBookOpen size={20} />,
    highlights: ['Student ID: 2302620', 'Fourth-Year Student', 'Environmental Sustainability'],
  },
  {
    year: '2021 – 2023',
    title: 'Humanities and Social Sciences (HUMSS)',
    institution: 'Kapangan Central National High School (KCNHS)',
    college: '',
    location: 'Kapangan, Benguet',
    description: 'Completed the Humanities and Social Sciences (HUMSS) strand, which strengthened my communication, critical thinking, research, and social awareness skills, providing a strong academic foundation for higher education.',
    icon: <FiAward size={20} />,
    highlights: ['HUMSS Strand', 'Communication & Research', 'Critical Thinking'],
  },
  {
    year: 'Junior High School',
    title: 'Junior High School',
    institution: 'Kapangan Central National High School (KCNHS)',
    college: '',
    location: 'Kapangan, Benguet',
    description: 'Completed Junior High School as an active and dedicated student, consistently participating in school activities and developing leadership, teamwork, and personal growth throughout my academic journey.',
    icon: <FiTarget size={20} />,
    highlights: ['Active Student', 'Leadership & Teamwork', 'School Activities'],
  },
]

function TimelineItem({ item, index, reduced }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className="relative flex items-start gap-6"
      style={reduced ? {} : {
        animation: inView
          ? `fadeUp 0.7s cubic-bezier(.2,.8,.2,1) ${index * 0.15}s both`
          : 'none',
      }}
    >
      {/* Timeline line and node */}
      <div className="relative flex-shrink-0 w-6 z-10">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-forest-900/10" />
        {/* Node */}
        <div className="relative w-12 h-12 rounded-full bg-forest-900 flex items-center justify-center text-white transition-all duration-500 hover:scale-125 hover:bg-sage-600">
          {item.icon}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 min-w-0">
        <div className="card-neo card-neo-hover p-6">
          <span className="font-body text-xs font-medium text-sage-600 uppercase tracking-wider">{item.year}</span>
          <h3 className="font-heading text-xl font-semibold text-forest-900 mt-1 mb-1">{item.title}</h3>
          <p className="font-body text-sm text-sage-600 mb-1">{item.institution}</p>
          {item.college && (
            <p className="font-body text-xs text-sage-500 flex items-center gap-1 mb-2">
              <FiMapPin size={10} /> {item.college}
            </p>
          )}
          <p className="font-body text-xs text-sage-500 flex items-center gap-1 mb-4">
            <FiMapPin size={10} /> {item.location}
          </p>
          <p className="font-body text-sm text-forest-900/70 mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h) => (
              <span key={h} className="px-3 py-1 bg-mint-100 text-forest-900 text-xs font-body rounded-full transition-colors duration-300 hover:bg-lime-300/40">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Education() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()

  return (
    <section id="education" className="section-padding bg-mint-50" aria-labelledby="education-heading">
      <div className="container-main" ref={sectionRef}>
        <div
          className="text-center mb-16"
          style={reduced ? {} : { animation: sectionInView ? 'fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both' : 'none' }}
        >
          <p className="font-body text-sage-600 text-sm uppercase tracking-widest mb-3">My Journey</p>
          <h2 id="education-heading" className="font-heading text-4xl md:text-5xl font-semibold text-forest-900">
            Education
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute top-0 bottom-0 left-[30px] w-0.5 bg-forest-900/10" />
          
          <div className="space-y-10">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}