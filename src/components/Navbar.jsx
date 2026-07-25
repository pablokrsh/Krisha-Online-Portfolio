import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiDownload, FiSun, FiMoon, FiHome, FiUser, FiBookOpen, FiFolder, FiMail, FiSearch } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import pfp from '../assets/img/pfp.png'

const navLinks = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'About', href: '/about', icon: FiUser },
  { name: 'Education', href: '/education', icon: FiBookOpen },
  { name: 'Portfolio', href: '/portfolio', icon: FiFolder },
  { name: 'Contact', href: '/contact', icon: FiMail },
]

const neoShadow = `
  4px 4px 8px var(--neo-dark),
  -4px -4px 8px var(--neo-light),
  inset 2px 2px 4px var(--neo-light),
  inset -2px -2px 4px var(--neo-dark)
`

const neoShadowPressed = `
  inset 4px 4px 8px var(--neo-dark),
  inset -4px -4px 8px var(--neo-light)
`

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href) => location.pathname === href || (href === '/' && location.pathname === '/')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container-main px-6 md:px-12 pt-4">
        <div className="mx-auto max-w-[900px]">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="relative flex items-center justify-between gap-4 rounded-[2rem] p-2 transition-all duration-300"
            style={{
              background: 'var(--navbar-bg)',
              backdropFilter: 'blur(18px)',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Left: User Avatar */}
            <Link to="/" aria-label="Krisha Pablo - Home" className="flex-shrink-0">
              <img
                src={pfp}
                alt="Krisha Pablo"
                className="w-10 h-10 rounded-full object-cover ring-2 transition-all duration-300 hover:scale-105 hover:ring-4"
                style={{
                  ringColor: 'var(--accent)',
                  objectFit: 'cover',
                }}
              />
            </Link>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                    style={{
                      color: active ? 'var(--accent)' : 'var(--navbar-text)',
                      background: active ? 'var(--accent-light)' : 'transparent',
                    }}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={20} style={{ color: active ? 'var(--accent)' : 'var(--icon)' }} />
                    <span className="font-body text-sm font-medium">{link.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right: Search + Theme Toggle + Download CV */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--icon)' }} />
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 sm:w-64 pl-10 pr-4 py-2 text-sm rounded-xl transition-all duration-300 focus:outline-none"
                  style={{
                    background: 'var(--surface-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '1rem',
                  }}
                  placeholder="Search..."
                  aria-label="Search"
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, var(--surface-secondary), var(--surface))',
                  border: '1px solid var(--border)',
                  boxShadow: neoShadow,
                  color: 'var(--icon)',
                }}
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>

              {/* Download CV */}
              <a
                href="#contact"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, var(--surface-secondary), var(--surface))',
                  border: '1px solid var(--border)',
                  boxShadow: neoShadow,
                  color: 'var(--icon)',
                }}
                aria-label="Download CV"
              >
                <FiDownload size={20} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 active:scale-90"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ color: 'var(--navbar-text)', background: 'var(--surface-secondary)' }}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-full left-4 right-4 mt-4 rounded-2xl p-6 space-y-2 transition-all duration-400 ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            style={{
              background: 'var(--navbar-bg)',
              backdropFilter: 'blur(18px)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link, i) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                    style={{
                      color: active ? 'var(--accent)' : 'var(--navbar-text)',
                      background: active ? 'var(--accent-light)' : 'transparent',
                      animation: mobileOpen ? `fadeUp 0.3s ease-out ${i * 0.05}s both` : 'none',
                    }}
                  >
                    <Icon size={22} style={{ color: active ? 'var(--accent)' : 'var(--icon)' }} />
                    <span className="font-body text-base font-medium">{link.name}</span>
                  </Link>
                )
              })}

              <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="relative mb-4">
                  <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--icon)' }} />
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'var(--surface-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '1rem',
                    }}
                    placeholder="Search..."
                    aria-label="Search"
                  />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'linear-gradient(145deg, var(--surface-secondary), var(--surface))',
                      border: '1px solid var(--border)',
                      boxShadow: neoShadow,
                      color: 'var(--icon)',
                    }}
                  >
                    {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
                  </button>

                  <a
                    href="#contact"
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'linear-gradient(145deg, var(--surface-secondary), var(--surface))',
                      border: '1px solid var(--border)',
                      boxShadow: neoShadow,
                      color: 'var(--icon)',
                    }}
                    aria-label="Download CV"
                  >
                    <FiDownload size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}