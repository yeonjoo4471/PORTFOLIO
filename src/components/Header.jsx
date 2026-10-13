import { useEffect, useState } from 'react'

import '../styles/header.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (event, sectionId) => {
    event.preventDefault()

    const target = document.getElementById(sectionId)

    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    window.history.replaceState(
      window.history.state, '', `${window.location.pathname}${window.location.search}`,
    )

    setMobileMenuOpen(false)
  }

  return (
    <header
      className={[
        'global-header',
        isScrolled ? 'is-scrolled' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="header-inner container archive-layout">
        <a
          href="#hero"
          className="header-logo"
          aria-label="포트폴리오 처음으로 이동"
          onClick={(event) => handleNavClick(event, 'hero')}
        >
          <span className="logo-badge">YJ</span>

          <span className="logo-text">
            <span className="logo-name">YEON JOO</span>
            <span className="logo-role">WEB PUBLISHER</span>
          </span>
        </a>

        <nav
          className={[
            'header-nav',
            mobileMenuOpen ? 'is-open' : '',
          ].filter(Boolean).join(' ')}
          aria-label="메인 내비게이션"
        >
          <ul className="nav-list">
            <li>
              <a
                href="#hero"
                onClick={(event) => handleNavClick(event, 'hero')}
              >
                <span className="nav-num">00</span>
                <span>HOME</span>
              </a>
            </li>

            <li>
              <a
                href="#about"
                onClick={(event) => handleNavClick(event, 'about')}
              >
                <span className="nav-num">01</span>
                <span>ABOUT</span>
              </a>
            </li>

            <li>
              <a
                href="#skills"
                onClick={(event) => handleNavClick(event, 'skills')}
              >
                <span className="nav-num">02</span>
                <span>SKILLS</span>
              </a>
            </li>

            <li>
              <a
                href="#projects"
                onClick={(event) => handleNavClick(event, 'projects')}
              >
                <span className="nav-num">03</span>
                <span>PROJECTS</span>
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={(event) => handleNavClick(event, 'contact')}
              >
                <span className="nav-num">05</span>
                <span>CONTACT</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => {
            setMobileMenuOpen((current) => !current)
          }}
          aria-label={
            mobileMenuOpen
              ? '메뉴 닫기'
              : '메뉴 열기'
          }
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={[
              'hamburger',
              mobileMenuOpen ? 'active' : '',
            ].filter(Boolean).join(' ')}
          />
        </button>
      </div>
    </header>
  )
}