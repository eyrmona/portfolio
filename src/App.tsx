import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Resume from './components/Resume'
import Footer from './components/Footer'
import './App.css'

type Theme = 'dark' | 'light'

const CROWN_SCROLL_DISTANCE = 220

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark'
  })
  const [crownProgress, setCrownProgress] = useState(0)
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (path !== '/') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setCrownProgress(Math.min(1, Math.max(0, window.scrollY / CROWN_SCROLL_DISTANCE)))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [path])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const navigate = (to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(to)
    }
    window.scrollTo(0, 0)
  }

  const isResume = path === '/resume'

  return (
    <>
      <Nav
        theme={theme}
        onToggleTheme={toggleTheme}
        crownProgress={isResume ? 0 : crownProgress}
        onNavigate={navigate}
      />
      <main>
        {isResume ? (
          <Resume />
        ) : (
          <>
            <Hero crownProgress={crownProgress} theme={theme} />
            <CaseStudy />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
