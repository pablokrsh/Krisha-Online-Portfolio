import { FiFacebook, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: <FiFacebook size={20} />, href: 'https://www.facebook.com/2.krishaaa.0', label: 'Facebook' },
  { icon: <FiInstagram size={20} />, href: 'https://www.instagram.com/ia_krsh?igsh=ZWZtNzE0bHF2ajdo', label: 'Instagram' },
  { icon: <FaTiktok size={20} />, href: 'https://www.tiktok.com/@ia_krsh?is_from_webapp=1&sender_device=pc', label: 'TikTok' },
  { icon: <FiGithub size={20} />, href: '#', label: 'GitHub' },
  { icon: <FiLinkedin size={20} />, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()

  const anim = (delay) =>
    reduced ? {} : { animation: inView ? `fadeUp 0.6s cubic-bezier(.2,.8,.2,1) ${delay}s both` : 'none' }

  return (
    <footer ref={ref} style={{ background: 'var(--el-footer-bg)', color: 'var(--el-text)' }} className="py-16 px-6 md:px-12" role="contentinfo">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div style={anim(0)}>
            <h3 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--el-highlight)', textShadow: '0 0 12px var(--el-highlight)' }}>Krisha Pablo</h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--el-text-sub)' }}>
              Environmental Science Student at Benguet State University. Passionate about sustainability, creativity, and making a positive impact.
            </p>
          </div>

          <div style={anim(0.1)}>
            <h4 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--el-highlight)', textShadow: '0 0 10px var(--el-highlight)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    style={{ color: 'var(--el-text-sub)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--el-highlight)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--el-text-sub)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={anim(0.2)}>
            <h4 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--el-highlight)', textShadow: '0 0 10px var(--el-highlight)' }}>Social Links</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label} (opens in new tab)`}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    border: '1px solid var(--el-border)',
                    color: 'var(--el-text-sub)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--el-highlight)'; e.currentTarget.style.color = 'var(--el-highlight)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--el-border)'; e.currentTarget.style.color = 'var(--el-text-sub)'; }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--el-footer-border)' }}>
          <p className="font-body text-sm" style={{ color: 'var(--el-text-sub)' }}>
            &copy; {new Date().getFullYear()} Krisha Pablo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
