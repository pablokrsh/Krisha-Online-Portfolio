import Hero from '../components/Hero'
import About from '../components/About'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Home() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-mint-100" ref={sectionRef}>
      <Hero />
      <About />
      <section className="section-padding bg-mint-50" aria-labelledby="featured-heading">
        <div className="container-main">
          <div
            className="text-center mb-16"
            style={reduced ? {} : { animation: sectionInView ? 'fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both' : 'none' }}
          >
            <p className="font-body text-sage-600 text-sm uppercase tracking-widest mb-3">Quick Links</p>
            <h2 id="featured-heading" className="font-heading text-4xl md:text-5xl font-semibold text-forest-900">
              Explore More
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="/education" className="card-neo card-neo-hover group text-center p-8">
              <span className="text-4xl mb-4 block transition-transform duration-300 group-hover:scale-125">🎓</span>
              <h3 className="font-heading text-xl font-semibold text-forest-900 mb-2">Education</h3>
              <p className="font-body text-sm text-forest-900/70">View my academic journey</p>
            </a>
            <a href="/portfolio" className="card-neo card-neo-hover group text-center p-8">
              <span className="text-4xl mb-4 block transition-transform duration-300 group-hover:scale-125">💼</span>
              <h3 className="font-heading text-xl font-semibold text-forest-900 mb-2">Portfolio</h3>
              <p className="font-body text-sm text-forest-900/70">Browse my projects</p>
            </a>
            <a href="/contact" className="card-neo card-neo-hover group text-center p-8">
              <span className="text-4xl mb-4 block transition-transform duration-300 group-hover:scale-125">✉️</span>
              <h3 className="font-heading text-xl font-semibold text-forest-900 mb-2">Contact</h3>
              <p className="font-body text-sm text-forest-900/70">Get in touch</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}