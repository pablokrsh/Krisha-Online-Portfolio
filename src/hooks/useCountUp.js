import { useEffect, useState } from 'react'

export function useCountUp(end, duration = 2000, startOnView = false, isInView = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (startOnView && !isInView) return

    let startTime = null
    let animationFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startOnView, isInView])

  return count
}
