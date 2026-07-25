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
  8px 8px 16px var(--neo-dark),
  -8px -8px 16px var(--neo-light),
  inset 4px 4px 8px var(--neo-light),
  inset -4px -4px 8px var(--neo-dark)
`

const pillShadow = `
  0 8px 32px rgba(0,0,0,0.18),
  0 4px 12px rgba(0,0,0,0.12),
  0 0 0 1px var(--border)
`

const pillShadowHover = `
  0 12px 40px rgba(0,0,0,0.22),
  0 6px 16px rgba(0,0,0,0.15),
  0 0 0 1px var(--border)
`

const pillGlow = `
  0 0 40px -4px var(--accent),
  0 0 80px -12px var(--secondary)
`

const buttonShadow = `
  0 4px 16px rgba(0,0,0,0.2),
  0 2px 4px rgba(0,0,0,0.1)
`

const buttonShadowHover = `
  0 8px 24px rgba(0,0,0,0.25),
  0 4px 8px rgba(0,0,0,0.15)
`

const buttonShadowPressed = `
  0 2px 8px rgba(0,0,0,0.2),
  inset 0 2px 4px rgba(0,0,0,0.1)
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 transition-all duration-300">
      {/* Glow behind pill - contained behind */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[140%] rounded-[4rem] pointer-events-none -z-10 opacity-60 transition-all duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, var(--accent) 0%, var(--secondary) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="relative mx-auto flex items-center justify-between gap-4 rounded-[3rem] transition-all duration-500"
        style={{
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-secondary) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          boxShadow: pillShadow,
          padding: '0.625rem 1.5rem',
          maxWidth: '1300px',
          transform: 'translateZ(0)',
        }}
      >
        {/* Left: User Avatar */}
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Krisha Pablo - Home" className="relative flex-shrink-0">
            <img
              src={pfp}
              alt="Krisha Pablo"
              className="w-11 h-11 rounded-full object-cover ring-2 transition-all duration-300 hover:scale-105 hover:ring-4"
              style={{
                ringColor: 'var(--accent)',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 0 2px var(--border)',
              }}
            />
            <span className="absolute inset-0 rounded-full transition-all duration-300" style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)',
              opacity: 0,
            }} />
          </Link>

          <Link to="/" className="hidden sm:flex flex-col items-start leading-tight transition-colors duration-300" aria-label="Krisha Pablo - Home">
            <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>KRI</span>
            <span style={{ color: 'var(--navbar-text)', fontSize: '0.75rem', fontWeight: 500 }}>SHA</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] transition-all duration-300 group"
                style={{
                  color: active ? 'var(--accent)' : 'var(--navbar-text)',
                  background: active ? 'var(--accent)' : 'transparent',
                  fontWeight: active ? '600' : '500',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  boxShadow: active ? '0 4px 16px rgba(0,0,0,0.2), 0 0 0 1px var(--border)' : 'none',
                  transition: 'all 0.3s cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <Icon
                  size={19}
                  className="transition-all duration-300 group-hover:scale-110"
                  style={{ color: active ? 'var(--text-white)' : 'var(--icon)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}
                />
                <span className="font-body text-sm hidden sm:inline" style={{ color: active ? 'var(--text-white)' : 'var(--navbar-text)', fontWeight: active ? '600' : '500' }}>
                  {link.name}
                </span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ background: 'var(--text-white)', boxShadow: '0 0 8px var(--accent)' }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right: Search Bar + Theme Toggle + Download CV */}
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300" style={{ color: 'var(--icon)', opacity: '0.7' }} />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 sm:w-64 pl-11 pr-4 py-2.5 text-sm rounded-[1.5rem] transition-all duration-300 focus:w-80 focus:outline-none"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border)',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s cubic-bezier(.2,.8,.2,1)',
                }}
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </div>

          {/* Theme Toggle - Solid 3D */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group"
            style={{
              background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-secondary) 100%)',
              border: '2px solid var(--border)',
              boxShadow: buttonShadow,
              color: 'var(--icon)',
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="relative z-10 transition-all duration-300" style={{
              transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(1)',
              color: 'var(--icon)',
              textShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}>
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </span>
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              background: 'linear-gradient(180deg, var(--accent), var(--secondary))',
            }} />
            <span className="absolute inset-0 rounded-xl opacity-0 group-focus:opacity-100 transition-opacity duration-300" style={{
              boxShadow: '0 0 0 3px var(--accent)',
            }} />
          </button>

          {/* Download CV - Solid 3D */}
          <a
            href="#contact"
            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group"
            style={{
              background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-secondary) 100%)',
              border: '2px solid var(--border)',
              boxShadow: buttonShadow,
              color: 'var(--icon)',
              transformStyle: 'preserve-3d',
            }}
            aria-label="Download CV"
          >
            <FiDownload size={20} className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              background: 'linear-gradient(180deg, var(--accent), var(--secondary))',
            }} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-body rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow)',
              whiteSpace: 'nowrap',
              fontWeight: '500',
            }}>
              Download CV
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-secondary) 100%)',
              border: '2px solid var(--border)',
              boxShadow: buttonShadow,
              color: 'var(--icon)',
            }}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 mt-4 rounded-2xl p-6 space-y-2 transition-all duration-500 ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          background: 'var(--navbar-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          boxShadow: pillShadowHover,
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
                  fontWeight: active ? '600' : '500',
                  animation: mobileOpen ? `fadeUp 0.3s ease-out ${i * 0.05}s both` : 'none',
                }}
              >
                <Icon size={24} style={{ color: active ? 'var(--accent)' : 'var(--icon)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
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
                  fontWeight: '500',
                  boxShadow: 'inset 2px 2px 4px var(--neo-dark), inset -2px -2px 4px var(--neo-light)',
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
                {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
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
                <FiDownload size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}