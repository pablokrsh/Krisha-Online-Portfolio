import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'

export default function CircularProgress({ value, size = 100, strokeWidth = 8, label, duration = 2000 }) {
  const [ref, isInView] = useInView()
  const count = useCountUp(value, duration, true, isInView)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (count / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--el-track)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--el-fill)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: `stroke-dashoffset ${duration}ms cubic-bezier(.2,.8,.2,1)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-body text-lg font-semibold" style={{ color: 'var(--el-text)' }}>{count}%</span>
        </div>
      </div>
      {label && (
        <span className="font-body text-xs font-medium text-center" style={{ color: 'var(--el-text-sub)' }}>{label}</span>
      )}
    </div>
  )
}
