import { useEffect, useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { FloatingLeaf } from './FloatingLeaf'
import pfp from '../assets/img/pfp.png'

const typingText = "I enjoy blending creativity and environmental awareness through design, learning, and personal projects."

export default function Hero() {
  const reduced = useReducedMotion()
  const [parallaxY, setParallaxY] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (reduced) {
      setDisplayedText(typingText)
      return
    }

    let index = 0
    let timeout
    let isDeleting = false

    const loop = () => {
      if (!isDeleting) {
        setDisplayedText(typingText.slice(0, index + 1))
        index++

        if (index === typingText.length) {
          timeout = setTimeout(() => { isDeleting = true; loop() }, 2000)
          return
        }
        timeout = setTimeout(loop, 50)
      } else {
        index--
        setDisplayedText(typingText.slice(0, index))

        if (index === 0) {
          isDeleting = false
          timeout = setTimeout(loop, 800)
          return
        }
        timeout = setTimeout(loop, 25)
      }
    }

    const startDelay = setTimeout(loop, 1200)
    return () => { clearTimeout(startDelay); clearTimeout(timeout) }
  }, [reduced])

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (reduced) return
    const handleScroll = () => setParallaxY(window.scrollY * 0.15)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reduced])

  const anim = (name, delay) =>
    reduced ? {} : { animation: `${name} 0.8s cubic-bezier(.2,.8,.2,1) ${delay}s both` }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #102F15 0%, #1A4322 100%)',
      }}
      aria-label="Hero section"
    >
      {/* Parallax background orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: reduced ? 'none' : `translateY(${parallaxY}px)` }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: 'radial-gradient(circle, #EAF1B1 0%, transparent 70%)',
              animation: reduced ? 'none' : `float ${6 + i * 2}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating leaves */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingLeaf className="left-[10%] bottom-[20%]" delay={0} size={28} />
          <FloatingLeaf className="left-[30%] bottom-[10%]" delay={2} size={22} />
          <FloatingLeaf className="right-[20%] bottom-[30%]" delay={4} size={32} />
          <FloatingLeaf className="right-[40%] bottom-[15%]" delay={1} size={20} />
          <FloatingLeaf className="left-[60%] bottom-[5%]" delay={3} size={26} />
          <FloatingLeaf className="left-[80%] bottom-[25%]" delay={5} size={24} />
        </div>
      )}

      <div className="container-main px-6 md:px-12 w-full relative z-10 pt-24 pb-32 md:pt-0 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20">

          {/* Profile picture - on top for mobile, right side for desktop */}
          <div
            className="order-1 lg:order-2 lg:absolute lg:bottom-0 lg:right-8 lg:z-10 w-[55%] sm:w-[45%] md:w-[40%] lg:w-[45%] pointer-events-none mx-auto lg:mx-0"
            style={anim('scaleIn', 0.6)}
          >
            <img
              src={pfp}
              alt="Krisha Pablo"
              className="w-full h-auto max-h-[30vh] sm:max-h-[35vh] md:max-h-[45vh] lg:max-h-[80vh] object-contain pointer-events-auto transition-all duration-400 hover:scale-[1.03]"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 8%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 8%, black 12%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-xl order-2 lg:order-1">
            <p className="font-body text-sage-400 text-lg mb-2" style={anim('fadeUp', 0.2)}>
              Hello, I'm
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-4" style={anim('fadeUp', 0.4)}>
              Krisha Pablo
            </h1>
            <p className="font-body text-lg text-sage-400 mb-2" style={anim('fadeUp', 0.6)}>
              Bachelor of Science in Environmental Science
            </p>
            <p className="font-body text-sage-500 text-sm mb-6" style={anim('fadeUp', 0.7)}>
              Fourth-Year Student &middot; Benguet State University
            </p>
            <p className="font-body text-white/70 text-base leading-relaxed mb-8 min-h-[48px]" style={anim('fadeUp', 0.8)}>
              {displayedText}
              <span className={`inline-block w-[2px] h-[1em] bg-lime-300 ml-[2px] align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={anim('fadeUp', 1)}>
              <a href="#portfolio" className="btn-accent inline-flex items-center justify-center gap-2">
                View Portfolio
                <FiArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-forest-900 inline-flex items-center justify-center">
                Contact Me
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div
            className="w-1 h-3 bg-white/50 rounded-full"
            style={{ animation: reduced ? 'none' : 'scrollBounce 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
