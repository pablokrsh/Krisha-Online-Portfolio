import Education from '../components/Education'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function EducationPage() {
  const [sectionRef, sectionInView] = useInView()
  const reduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-mint-50" ref={sectionRef}>
      <Education />
    </div>
  )
}