import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'

const skillRadar = [
  { skill: 'Environmental Science', value: 90 },
  { skill: 'Research', value: 82 },
  { skill: 'Data Analysis', value: 75 },
  { skill: 'Creative Design', value: 78 },
  { skill: 'Communication', value: 85 },
  { skill: 'Problem Solving', value: 80 },
]

const performanceData = [
  { semester: '1st Sem', gpa: 1.75, credits: 18 },
  { semester: '2nd Sem', gpa: 1.60, credits: 21 },
  { semester: '3rd Sem', gpa: 1.50, credits: 19 },
  { semester: '4th Sem', gpa: 1.45, credits: 22 },
  { semester: '5th Sem', gpa: 1.40, credits: 20 },
  { semester: '6th Sem', gpa: 1.35, credits: 18 },
  { semester: '7th Sem', gpa: 1.30, credits: 15 },
]

const skillDistribution = [
  { name: 'Science', value: 35, color: '#102F15' },
  { name: 'Design', value: 20, color: '#728C5A' },
  { name: 'Research', value: 25, color: '#EAF1B1' },
  { name: 'Technology', value: 15, color: '#A9C08F' },
  { name: 'Soft Skills', value: 5, color: '#2E5A37' },
]

const weeklyProgress = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 2 },
  { day: 'Sun', hours: 1 },
]

const COLORS = ['#102F15', '#728C5A', '#EAF1B1', '#A9C08F', '#2E5A37']

const tooltipStyle = {
  contentStyle: { background: '#fff', border: '1px solid #C7D8BC', borderRadius: '12px', fontFamily: 'Inter', fontSize: '12px', boxShadow: '0 8px 24px rgba(16,47,21,.12)' },
}

function StatCard({ label, value, suffix = '', isInView, reduced }) {
  const count = useCountUp(value, 2000, true, isInView)
  return (
    <div className="card-neo card-neo-hover text-center p-6">
      <p className="font-heading text-4xl font-bold text-forest-900">{reduced ? value : count}{suffix}</p>
      <p className="font-body text-sm text-sage-600 mt-2">{label}</p>
    </div>
  )
}

export default function Skills() {
  const [sectionRef, sectionInView] = useInView()
  const [statsRef, statsInView] = useInView()
  const reduced = useReducedMotion()
  const anim = (delay) => reduced ? {} : { animation: sectionInView ? `fadeUp 0.7s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <section id="skills" className="section-padding bg-mint-100" aria-labelledby="skills-heading">
      <div className="container-main" ref={sectionRef}>
        <div className="text-center mb-16" style={anim(0)}>
          <p className="font-body text-sage-600 text-sm uppercase tracking-widest mb-3">Visual Stats</p>
          <h2 id="skills-heading" className="font-heading text-4xl md:text-5xl font-semibold text-forest-900">Skills & Analytics</h2>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Projects Completed" value={6} isInView={statsInView} reduced={reduced} />
          <StatCard label="GPA (Last Sem)" value={1.30} suffix="" isInView={statsInView} reduced={reduced} />
          <StatCard label="Skills Mastered" value={5} isInView={statsInView} reduced={reduced} />
          <StatCard label="Semesters" value={7} isInView={statsInView} reduced={reduced} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-neo card-neo-hover" style={anim(0.1)}>
            <h3 className="font-heading text-xl font-semibold text-forest-900 mb-4">Skill Proficiency</h3>
            <p className="font-body text-sm text-sage-600 mb-4">Radar overview of core competencies</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="#C7D8BC" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#102F15', fontFamily: 'Inter' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#728C5A' }} />
                  <Radar name="Skills" dataKey="value" stroke="#102F15" fill="#728C5A" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-neo card-neo-hover" style={anim(0.2)}>
            <h3 className="font-heading text-xl font-semibold text-forest-900 mb-4">Academic Performance</h3>
            <p className="font-body text-sm text-sage-600 mb-4">GPA trend across semesters</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C7D8BC" />
                  <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#102F15', fontFamily: 'Inter' }} />
                  <YAxis domain={[1, 2]} reversed tick={{ fontSize: 11, fill: '#728C5A', fontFamily: 'Inter' }} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="gpa" stroke="#102F15" strokeWidth={3} dot={{ fill: '#EAF1B1', strokeWidth: 2, r: 5 }} activeDot={{ r: 7, fill: '#728C5A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-neo card-neo-hover" style={anim(0.3)}>
            <h3 className="font-heading text-xl font-semibold text-forest-900 mb-4">Knowledge Distribution</h3>
            <p className="font-body text-sm text-sage-600 mb-4">Breakdown of skill areas</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={skillDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {skillDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                  <Legend formatter={(value) => <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#102F15' }}>{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-neo card-neo-hover" style={anim(0.4)}>
            <h3 className="font-heading text-xl font-semibold text-forest-900 mb-4">Weekly Study Hours</h3>
            <p className="font-body text-sm text-sage-600 mb-4">Average study time per day</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C7D8BC" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#102F15', fontFamily: 'Inter' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#728C5A', fontFamily: 'Inter' }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                    {weeklyProgress.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 4 ? '#EAF1B1' : '#102F15'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card-neo card-neo-hover" style={anim(0.5)}>
          <h3 className="font-heading text-xl font-semibold text-forest-900 mb-4">Credit Load Over Time</h3>
          <p className="font-body text-sm text-sage-600 mb-4">Number of credits per semester</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#728C5A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#728C5A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#C7D8BC" />
                <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#102F15', fontFamily: 'Inter' }} />
                <YAxis tick={{ fontSize: 11, fill: '#728C5A', fontFamily: 'Inter' }} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="credits" stroke="#102F15" strokeWidth={2} fill="url(#colorCredits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}