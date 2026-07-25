import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Education', href: '/education' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href) => location.pathname === href || (href === '/' && location.pathname === '/')

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 h-20 bg-forest-900/95 backdrop-blur-[18px] shadow-lg"
    >
      <div className="container-main h-full flex items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className="font-heading text-2xl font-bold text-white tracking-wide transition-colors duration-300 hover:text-lime-300"
          aria-label="Krisha Pablo - Home"
        >
          KP
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`nav-underline font-body text-sm font-medium transition-colors duration-300 ${
                isActive(link.href) ? 'text-lime-300 active' : 'text-white hover:text-sage-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            className="btn-accent flex items-center gap-2 text-sm !py-2 !px-5"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </div>

        <button
          className="md:hidden text-white transition-transform duration-300 active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-forest-900/95 backdrop-blur-[18px] absolute top-20 left-0 right-0 border-t border-forest-700 transition-all duration-400 ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center py-6 gap-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-body text-base font-medium transition-colors duration-300 ${
                isActive(link.href) ? 'text-lime-300' : 'text-white hover:text-sage-400'
              }`}
              style={{ animation: mobileOpen ? `fadeUp 0.3s ease-out ${i * 0.05}s both` : 'none' }}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-accent flex items-center gap-2 text-sm !py-2 !px-5 mt-2"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </div>
      </div>
    </nav>
  )
}