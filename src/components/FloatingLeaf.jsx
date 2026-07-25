import { useReducedMotion } from '../hooks/useReducedMotion'

export function FloatingLeaf({ className = '', delay = 0, size = 24 }) {
  const reduced = useReducedMotion()

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        animation: reduced ? 'none' : `leafFloat ${8 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.23C7.76 17.12 10.56 12.35 17 8Z"
        fill="rgba(234,241,177,0.15)"
        stroke="rgba(234,241,177,0.25)"
        strokeWidth="0.5"
      />
      <path
        d="M21 3C12 5 9.9 11.17 7.82 16.34"
        stroke="rgba(234,241,177,0.2)"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  )
}
