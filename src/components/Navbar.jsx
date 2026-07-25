import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiDownload, FiSun, FiMoon } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Education', href: '/education' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

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
      className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300"
      style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(18px)', boxShadow: 'var(--shadow)' }}
    >
      <div className="container-main h-full flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="relative p-2 rounded-lg transition-all duration-300"
            style={{ background: 'var(--surface-secondary)', color: 'var(--icon)' }}
          >
            <span className="block transition-all duration-300" style={{ transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(1)' }}>
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </span>
          </button>
          <Link
            to="/"
            className="font-heading text-2xl font-bold tracking-wide transition-colors duration-300"
            aria-label="Krisha Pablo - Home"
          >
            <span style={{ color: 'var(--accent)' }}>Kri</span><span style={{ color: 'var(--navbar-text)' }}>Sha</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              aria-current={location.pathname === link.href ? 'page' : undefined}
              className="nav-underline font-body text-sm font-medium transition-colors duration-300"
              style={{ color: 'var(--navbar-text)' }}
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
          className="md:hidden transition-transform duration-300 active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{ color: 'var(--navbar-text)' }}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-20 left-0 right-0 border-t transition-all duration-400 ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(18px)', borderColor: 'var(--border)' }}
      >
        <div className="flex flex-col items-center py-6 gap-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-body text-base font-medium transition-colors duration-300"
              style={{ color: location.pathname === link.href ? 'var(--accent)' : 'var(--navbar-text)' }}
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