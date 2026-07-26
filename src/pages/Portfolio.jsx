import { useState, useEffect } from 'react'
import { FiExternalLink, FiFolder } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { SectionLeaf } from '../components/SectionLeaf'

const categories = ['All', 'Projects', 'Research', 'Creative', 'Activities']

const projects = [
  { title: 'Watershed Analysis Study', category: 'Research', description: 'Comprehensive analysis of local watershed conditions in Benguet province, assessing water quality and biodiversity indicators.', tags: ['Research', 'Environmental Science', 'Data Analysis'], color: 'var(--el-accent)' },
  { title: 'Eco-Friendly Packaging Design', category: 'Projects', description: 'Designed biodegradable packaging alternatives using locally sourced materials for small businesses.', tags: ['Design', 'Sustainability', 'Innovation'], color: 'var(--el-accent-2)' },
  { title: 'Community Waste Segregation', category: 'Activities', description: 'Led a community-based waste management program promoting proper segregation and recycling practices.', tags: ['Community', 'Environment', 'Leadership'], color: 'var(--el-accent-3)' },
  { title: 'Crochet Collection', category: 'Creative', description: 'Handcrafted crochet pieces ranging from decorative items to wearable accessories, reflecting creativity and patience.', tags: ['Crochet', 'Handmade', 'Creative'], color: 'var(--el-accent-4)' },
  { title: 'Environmental Impact Assessment', category: 'Research', description: 'Conducted field research evaluating the environmental impact of local agricultural practices on soil health.', tags: ['Research', 'Agriculture', 'Soil Science'], color: 'var(--el-accent)' },
  { title: 'Tree Planting Initiative', category: 'Activities', description: 'Organized and participated in reforestation efforts in degraded areas of Kapangan, Benguet.', tags: ['Environment', 'Reforestation', 'Volunteer'], color: 'var(--el-accent-5)' },
]

export default function Portfolio() {
  const [sectionRef, sectionInView] = useInView()
  const [activeCategory, setActiveCategory] = useState('All')
  const reduced = useReducedMotion()

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)
  const anim = (delay) => reduced ? {} : { animation: sectionInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--el-bg-alt)' }} aria-labelledby="portfolio-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16 relative" style={anim(0)}>
          <SectionLeaf side="left" delay={1.5} />
          <SectionLeaf side="right" delay={0.5} />
          <p className="font-body text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--el-text-sub)' }}>My Work</p>
          <h2 id="portfolio-heading" className="font-heading text-4xl md:text-5xl font-semibold" style={{ color: 'var(--el-text)' }}>Portfolio</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" style={anim(0.1)}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat}
              className="px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={activeCategory === cat
                ? { background: 'var(--el-accent)', color: 'var(--el-card)', boxShadow: 'var(--shadow)', transform: 'scale(1.05)' }
                : { background: 'var(--el-card)', color: 'var(--el-text)', border: '1px solid var(--el-border)' }
              }
            >{cat}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <article key={project.title} className="card-neo card-neo-hover group flex flex-col" style={reduced ? {} : { animation: sectionInView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${0.2 + index * 0.1}s both` : 'none' }}>
              <div className="h-48 rounded-[18px] mb-6 flex items-center justify-center overflow-hidden relative" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${project.color} 15%, transparent), color-mix(in srgb, ${project.color} 30%, transparent))` }}>
                <FiFolder size={48} style={{ color: 'var(--el-text)', opacity: 0.15 }} className="transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-[18px] flex items-center justify-center transition-all duration-400">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"><FiExternalLink size={24} style={{ color: 'var(--el-text)' }} /></div>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-body text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--el-text-sub)' }}>{project.category}</span>
                <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--el-text)' }}>{project.title}</h3>
                <p className="font-body text-sm mb-4 flex-1" style={{ color: 'var(--el-text-sub)' }}>{project.description}</p>
                <div className="flex flex-wrap gap-2">{project.tags.map(tag => (<span key={tag} className="px-3 py-1 text-xs font-body rounded-full transition-colors duration-300" style={{ background: 'var(--el-bg)', color: 'var(--el-text)' }}>{tag}</span>))}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12" style={anim(0.7)}><p className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>More projects coming soon — stay tuned!</p></div>
      </div>
    </section>
  )
}
