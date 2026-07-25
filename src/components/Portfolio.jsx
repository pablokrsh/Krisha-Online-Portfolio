import { useEffect, useRef, useState } from 'react'
import { FiExternalLink, FiFolder } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const categories = ['All', 'Projects', 'Research', 'Creative', 'Activities']

const projects = [
  {
    title: 'Watershed Analysis Study',
    category: 'Research',
    description: 'Comprehensive analysis of local watershed conditions in Benguet province, assessing water quality and biodiversity indicators.',
    tags: ['Research', 'Environmental Science', 'Data Analysis'],
    color: '#102F15',
  },
  {
    title: 'Eco-Friendly Packaging Design',
    category: 'Projects',
    description: 'Designed biodegradable packaging alternatives using locally sourced materials for small businesses.',
    tags: ['Design', 'Sustainability', 'Innovation'],
    color: '#728C5A',
  },
  {
    title: 'Community Waste Segregation',
    category: 'Activities',
    description: 'Led a community-based waste management program promoting proper segregation and recycling practices.',
    tags: ['Community', 'Environment', 'Leadership'],
    color: '#2E5A37',
  },
  {
    title: 'Crochet Collection',
    category: 'Creative',
    description: 'Handcrafted crochet pieces ranging from decorative items to wearable accessories, reflecting creativity and patience.',
    tags: ['Crochet', 'Handmade', 'Creative'],
    color: '#8CA672',
  },
  {
    title: 'Environmental Impact Assessment',
    category: 'Research',
    description: 'Conducted field research evaluating the environmental impact of local agricultural practices on soil health.',
    tags: ['Research', 'Agriculture', 'Soil Science'],
    color: '#102F15',
  },
  {
    title: 'Tree Planting Initiative',
    category: 'Activities',
    description: 'Organized and participated in reforestation efforts in degraded areas of Kapangan, Benguet.',
    tags: ['Environment', 'Reforestation', 'Volunteer'],
    color: '#A9C08F',
  },
]

export default function Portfolio() {
  const [sectionRef, sectionInView] = useInView()
  const [activeCategory, setActiveCategory] = useState('All')
  const reduced = useReducedMotion()

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const anim = (delay) =>
    reduced ? {} : { animation: sectionInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <section id="portfolio" className="section-padding bg-mint-50" aria-labelledby="portfolio-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16" style={anim(0)}>
          <p className="font-body text-sage-600 text-sm uppercase tracking-widest mb-3">My Work</p>
          <h2 id="portfolio-heading" className="font-heading text-4xl md:text-5xl font-semibold text-forest-900">
            Portfolio
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" style={anim(0.1)}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-forest-900 text-white shadow-card scale-105'
                  : 'bg-white text-forest-900 hover:bg-mint-100 border border-[#C7D8BC] hover:border-sage-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <article
              key={project.title}
              className="card-neo card-neo-hover group flex flex-col"
              style={reduced ? {} : {
                animation: sectionInView
                  ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${0.2 + index * 0.1}s both`
                  : 'none',
              }}
              onMouseDown={() => {}}
              onMouseUp={() => {}}
              onMouseLeave={() => {}}
            >
              <div
                className="h-48 rounded-[18px] mb-6 flex items-center justify-center overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                }}
              >
                <FiFolder size={48} className="text-forest-900/20 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/10 transition-all duration-400 rounded-[18px] flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                    <FiExternalLink size={24} className="text-forest-900" />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <span className="font-body text-xs font-medium text-sage-600 uppercase tracking-wider mb-2">{project.category}</span>
                <h3 className="font-heading text-xl font-semibold text-forest-900 mb-3">{project.title}</h3>
                <p className="font-body text-sm text-forest-900/70 mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-mint-100 text-forest-900 text-xs font-body rounded-full transition-colors duration-300 group-hover:bg-lime-300/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12" style={anim(0.7)}>
          <p className="font-body text-sage-600 text-sm">More projects coming soon — stay tuned!</p>
        </div>
      </div>
    </section>
  )
}
