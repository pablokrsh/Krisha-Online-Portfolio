import { useReducedMotion } from '../hooks/useReducedMotion'

export function SectionLeaf({ side = 'left', delay = 0, size = 22 }) {
  const reduced = useReducedMotion()
  const pos = side === 'left' ? { left: '-36px', top: '50%' } : { right: '-36px', top: '50%' }

  return (
    <svg
      className="absolute pointer-events-none hidden md:block"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        ...pos,
        marginTop: '-12px',
        animation: reduced ? 'none' : `headerLeafDrift ${6 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.23C7.76 17.12 10.56 12.35 17 8Z"
        fill="var(--el-highlight)"
        fillOpacity={0.2}
        stroke="var(--el-highlight)"
        strokeOpacity={0.3}
        strokeWidth="0.5"
      />
      <path
        d="M21 3C12 5 9.9 11.17 7.82 16.34"
        stroke="var(--el-highlight)"
        strokeOpacity={0.25}
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  )
}
