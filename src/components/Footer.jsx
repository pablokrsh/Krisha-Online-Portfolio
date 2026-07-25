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
    <footer ref={ref} className="bg-forest-900 text-white py-16 px-6 md:px-12" role="contentinfo">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div style={anim(0)}>
            <h3 className="font-heading text-2xl font-bold mb-4">Krisha Pablo</h3>
            <p className="font-body text-sage-400 text-sm leading-relaxed">
              Environmental Science Student at Benguet State University. Passionate about sustainability, creativity, and making a positive impact.
            </p>
          </div>

          <div style={anim(0.1)}>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-sage-400 hover:text-lime-300 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={anim(0.2)}>
            <h4 className="font-heading text-lg font-semibold mb-4">Social Links</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label} (opens in new tab)`}
                  className="w-10 h-10 rounded-full border border-sage-600 flex items-center justify-center text-sage-400 hover:border-lime-300 hover:text-lime-300 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-8 text-center">
          <p className="font-body text-sm text-sage-500">
            &copy; {new Date().getFullYear()} Krisha Pablo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
