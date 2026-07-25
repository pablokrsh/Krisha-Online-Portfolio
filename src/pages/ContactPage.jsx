import Contact from '../components/Contact'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function ContactPage() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-mint-100" ref={sectionRef}>
      <Contact />
    </div>
  )
}