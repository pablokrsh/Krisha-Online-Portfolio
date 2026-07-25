import About from '../components/About'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function AboutPage() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-mint-100" ref={sectionRef}>
      <section className="section-padding bg-mint-100" aria-labelledby="about-heading">
        <div className="container-main">
          <div
            className="text-center mb-16"
            style={reduced ? {} : { animation: sectionInView ? 'fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both' : 'none' }}
          >
            <p className="font-body text-sage-600 text-sm uppercase tracking-widest mb-3">Get to know me</p>
            <h2 id="about-heading" className="font-heading text-4xl md:text-5xl font-semibold text-forest-900">
              About Me
            </h2>
          </div>
        </div>
      </section>
      <About />
    </div>
  )
}