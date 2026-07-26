import { useState, useEffect } from 'react'
import { FiCalendar, FiMapPin, FiFlag, FiUser, FiHeart } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import CircularProgress from '../components/CircularProgress'
import { SectionLeaf } from '../components/SectionLeaf'

const personalInfo = [
  { icon: <FiUser size={20} />, label: 'Full Name', value: 'Krisha Pablo' },
  { icon: <FiCalendar size={20} />, label: 'Birth Date', value: 'February 20, 2005' },
  { icon: <FiMapPin size={20} />, label: 'Birth Place', value: 'Kapangan, Benguet' },
  { icon: <FiFlag size={20} />, label: 'Nationality', value: 'Filipino' },
  { icon: <FiHeart size={20} />, label: 'Gender', value: 'Female' },
]

const hobbies = [
  { icon: '🧶', name: 'Crochet' },
  { icon: '🎨', name: 'Drawing' },
  { icon: '♟️', name: 'Chess' },
  { icon: '🎬', name: 'Movies & Series' },
  { icon: '🎵', name: 'Music' },
  { icon: '📚', name: 'Manhwa & Manga' },
]

const skills = [
  { name: 'Environmental Science', level: 85 },
  { name: 'Research & Analysis', level: 80 },
  { name: 'Creative Design', level: 75 },
  { name: 'Data Analysis', level: 70 },
  { name: 'Sustainable Practices', level: 90 },
]

function AnimatedBar({ level, isInView, reduced }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (isInView && !reduced) {
      const t = setTimeout(() => setWidth(level), 200)
      return () => clearTimeout(t)
    } else if (reduced) { setWidth(level) }
  }, [isInView, level, reduced])
  return (
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--el-track)' }}>
      <div className="h-full rounded-full" style={{ width: `${width}%`, background: 'linear-gradient(90deg, var(--el-fill), var(--el-highlight))', transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)' }} />
    </div>
  )
}

export default function About() {
  const [sectionRef, sectionInView] = useInView()
  const [skillsRef, skillsInView] = useInView()
  const reduced = useReducedMotion()
  const anim = (delay) => reduced ? {} : { animation: sectionInView ? `fadeUp 0.7s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--el-bg)' }} aria-labelledby="about-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16 relative" style={anim(0)}>
          <SectionLeaf side="left" delay={0} />
          <SectionLeaf side="right" delay={1.5} />
          <p className="font-body text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--el-text-sub)' }}>Get to know me</p>
          <h2 id="about-heading" className="font-heading text-4xl md:text-5xl font-semibold" style={{ color: 'var(--el-text)' }}>About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div style={anim(0.1)}>
            <div className="card-neo card-neo-hover">
              <h3 className="font-heading text-2xl font-semibold mb-6" style={{ color: 'var(--el-text)' }}>Personal Information</h3>
              <div className="space-y-4">
                {personalInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4 p-3 rounded-[14px] transition-colors duration-300"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--el-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: 'var(--el-track)', color: 'var(--el-text-sub)' }}>{info.icon}</div>
                    <div>
                      <p className="text-sm font-body" style={{ color: 'var(--el-text-sub)' }}>{info.label}</p>
                      <p className="font-body font-medium" style={{ color: 'var(--el-text)' }}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={anim(0.2)}>
            <div className="card-neo card-neo-hover h-full">
              <h3 className="font-heading text-2xl font-semibold mb-6" style={{ color: 'var(--el-text)' }}>About Me</h3>
              <p className="font-body leading-relaxed mb-6" style={{ color: 'var(--el-text-sub)' }}>
                I am a dedicated Environmental Science student who values sustainability, creativity, and continuous growth. Alongside my academic interests, I enjoy expressing my creativity through crochet, drawing, and strategic thinking through chess. In my free time, I like watching movies and series, listening to music, and reading manhwa, manga, and manhua.
              </p>
              <div className="flex items-center gap-3" style={{ color: 'var(--el-text-sub)' }}>
                <FiHeart size={18} />
                <span className="font-body text-sm">Passionate about making a difference</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={skillsRef} style={anim(0.3)}>
          <div className="card-neo card-neo-hover mb-8">
            <h3 className="font-heading text-2xl font-semibold mb-8" style={{ color: 'var(--el-text)' }}>Skills & Proficiency</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-sm font-medium" style={{ color: 'var(--el-text)' }}>{skill.name}</span>
                    <span className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>{skill.level}%</span>
                  </div>
                  <AnimatedBar level={skill.level} isInView={skillsInView} reduced={reduced} />
                </div>
              ))}
            </div>

            <h3 className="font-heading text-xl font-semibold mb-6 text-center" style={{ color: 'var(--el-text)' }}>Circular Progress</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {skills.map((skill) => (
                <CircularProgress key={skill.name} value={skill.level} label={skill.name} size={90} strokeWidth={6} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12" style={anim(0.5)}>
          <div className="card-neo card-neo-hover">
            <h3 className="font-heading text-2xl font-semibold mb-8" style={{ color: 'var(--el-text)' }}>Hobbies & Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {hobbies.map((hobby, i) => (
                <div key={hobby.name} className="flex flex-col items-center gap-3 p-6 rounded-[18px] transition-all duration-300 hover:-translate-y-2 cursor-default group"
                  style={{ background: 'var(--el-track)', animation: sectionInView ? `scaleIn 0.5s cubic-bezier(.2,.8,.2,1) ${0.6 + i * 0.08}s both` : 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--el-highlight)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--el-track)'}
                >
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{hobby.icon}</span>
                  <span className="font-body text-sm font-medium text-center" style={{ color: 'var(--el-text)' }}>{hobby.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
