import { useState, useEffect } from 'react'
import './Nav.css'

interface NavProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  crownProgress?: number
  onNavigate: (path: string) => void
}

export default function Nav({ theme, onToggleTheme, crownProgress = 0, onNavigate }: NavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const goToResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onNavigate('/resume')
  }

  // Close drawer on escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const close = () => setDrawerOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavCrown progress={crownProgress} />

          {/* Desktop links */}
          <ul className="nav-links nav-links--desktop">
            <li><a href="/#about">About</a></li>
            <li><a href="/#case-study">Case Study</a></li>
            <li><a href="/resume" onClick={goToResume}>Resume</a></li>
            <li><ThemeToggle theme={theme} onToggle={onToggleTheme} /></li>
            <li><a href="mailto:aimee.maroney@gmail.com" className="nav-contact">Contact</a></li>
          </ul>

          {/* Mobile controls */}
          <div className="nav-mobile-controls">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a href="mailto:aimee.maroney@gmail.com" className="nav-contact">Contact</a>
            <button
              className="nav-menu-btn"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer overlay */}
      <div
        className={`nav-overlay ${drawerOpen ? 'nav-overlay--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        className={`nav-drawer ${drawerOpen ? 'nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="nav-drawer-header">
          <button className="nav-drawer-close" onClick={close} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <ul className="nav-drawer-links">
          <li><a href="/#about" onClick={close}>About</a></li>
          <li><a href="/#case-study" onClick={close}>Case Study</a></li>
          <li><a href="/resume" onClick={(e) => { goToResume(e); close() }}>Resume</a></li>
        </ul>
      </div>
    </>
  )
}

function NavCrown({ progress }: { progress: number }) {
  return (
    <div
      className="nav-crown"
      aria-hidden="true"
      style={{
        opacity: progress,
        transform: `translateY(-50%) scale(${0.6 + progress * 0.4})`,
      }}
    >
      <svg viewBox="0 0 98 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48.8356 0L3.10181 62.162H8.4907L48.8356 7.98843L88.7268 62.1094H95.0081L48.8356 0Z" fill="var(--color-accent)"/>
        <path d="M49.0549 29.7334L43.8335 34.9548L49.0549 40.1762L54.2763 34.9548L49.0549 29.7334Z" fill="var(--color-accent)"/>
        <path d="M93.8304 68.6157H4.27946V73.8518H93.8304V68.6157Z" fill="currentColor"/>
        <path d="M48.9715 52.2939L97.4382 2.81926L97.573 62.0947L92.7761 62.0976V57.329H92.8064L92.739 14.4999L50.9353 57.1747L48.9715 59.1875L5.2029 13.7616L4.93434 57.329H4.96364V62.1581L0.16774 62.162L0.570084 2.08098L48.9715 52.2939Z" fill="currentColor"/>
      </svg>
    </div>
  )
}

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button
      className="nav-theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2.93" y1="2.93" x2="4" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="12" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2.93" y1="13.07" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="4" x2="13.07" y2="2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
