export default function SectionDivider({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
          fill="currentColor"
          className="text-mint-50"
        />
        <path
          d="M0,50 C300,20 500,70 700,40 C900,10 1100,60 1200,30 L1200,80 L0,80 Z"
          fill="currentColor"
          className="text-mint-100"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
