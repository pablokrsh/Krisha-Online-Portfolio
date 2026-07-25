import { useEffect, useRef, useState } from 'react'
import { FiBookOpen, FiAward, FiTarget, FiMapPin } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const timeline = [
  {
    year: '2021 - Present',
    title: 'Bachelor of Science in Environmental Science',
    institution: 'Benguet State University',
    location: 'La Trinidad, Benguet',
    description: 'Currently in my fourth year, focusing on environmental management, ecological conservation, and sustainable practices.',
    icon: <FiBookOpen size={20} />,
    highlights: ['Student ID: 2302620', '4th Year Student', 'Research Focus'],
  },
  {
    year: '2019 - 2021',
    title: 'Senior High School',
    institution: 'Kapangan National High School',
    location: 'Kapangan, Benguet',
    description: 'Completed senior high school with strong academic performance and involvement in environmental clubs.',
    icon: <FiAward size={20} />,
    highlights: ['STEM Strand', 'With Honors', 'Environmental Club'],
  },
  {
    year: '2015 - 2019',
    title: 'Junior High School',
    institution: 'Kapangan National High School',
    location: 'Kapangan, Benguet',
    description: 'Developed foundational knowledge and active participation in school activities.',
    icon: <FiTarget size={20} />,
    highlights: ['Active Student', 'Club Member'],
  },
]

const goals = [
  { icon: '🌱', title: 'Environmental Advocacy', description: 'Promote sustainable practices and environmental awareness in local communities.' },
  { icon: '🔬', title: 'Research Excellence', description: 'Contribute meaningful research in environmental science and conservation.' },
  { icon: '🤝', title: 'Community Impact', description: 'Use knowledge and skills to create positive change in Benguet province.' },
]

function TimelineItem({ item, index, reduced }) {
  const [ref, inView] = useInView()
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={reduced ? {} : {
        animation: inView
          ? `${isEven ? 'slideInLeft' : 'slideInRight'} 0.6s cubic-bezier(.2,.8,.2,1) both`
          : 'none',
      }}
    >
      <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-forest-900 flex items-center justify-center text-white -translate-x-1/2 z-10 shadow-card transition-all duration-300 hover:scale-110 hover:shadow-card-hover">
        {item.icon}
      </div>

      <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
        <div className="card-base card-hover">
          <span className="font-body text-xs font-medium text-sage-600 uppercase tracking-wider">{item.year}</span>
          <h3 className="font-heading text-xl font-semibold text-forest-900 mt-1 mb-2">{item.title}</h3>
          <p className="font-body text-sm text-sage-600 mb-1">{item.institution}</p>
          <p className={`font-body text-xs text-sage-500 flex items-center gap-1 mb-3 ${isEven ? 'justify-start md:justify-end' : 'justify-start'}`}>
            <FiMapPin size={12} /> {item.location}
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
  const [goalsRef, goalsInView] = useInView()
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

        <div className="relative mb-20">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-forest-900/10 -translate-x-1/2" />
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} reduced={reduced} />
            ))}
          </div>
        </div>

        <div ref={goalsRef}>
          <h3
            className="font-heading text-2xl font-semibold text-forest-900 mb-8 text-center"
            style={reduced ? {} : { animation: goalsInView ? 'fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both' : 'none' }}
          >
            Future Goals
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, i) => (
              <div
                key={goal.title}
                className="card-base card-hover text-center group"
                style={reduced ? {} : { animation: goalsInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${i * 0.15}s both` : 'none' }}
              >
                <span className="text-4xl mb-4 block transition-transform duration-300 group-hover:scale-125">{goal.icon}</span>
                <h4 className="font-heading text-lg font-semibold text-forest-900 mb-2">{goal.title}</h4>
                <p className="font-body text-sm text-forest-900/70">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
