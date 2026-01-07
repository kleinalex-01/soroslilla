import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'

const navLinks = [
  { to: '/', label: 'Főoldal' },
  { to: '/arak', label: 'Árak' },
  { to: '/rolam', label: 'Rólam' },
  { to: '/galeria', label: 'Galéria' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        <Link to="/" className="header__logo" onClick={closeMobileMenu}>
          <img src="/szalon-logo.jpg" alt="Soros Lilla kozmetika logó" className="header__logo-mark" />
          <div className="header__logo-textgroup">
            <span className="header__logo-text">Healthy Skin</span>
            <span className="header__logo-subtitle">Kozmetika</span>
          </div>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Link to="/idopontfoglalas" className="btn btn--primary header__cta">
            Időpontfoglalás
          </Link>
          
          <button
            className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menü megnyitása"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__menu-icon"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="header__overlay" onClick={closeMobileMenu} />
      )}
    </header>
  )
}
