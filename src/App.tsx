import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Footer from './components/Footer'
import './App.css'

type Theme = 'dark' | 'light'

const CROWN_SCROLL_DISTANCE = 220

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark'
  })
  const [crownProgress, setCrownProgress] = useState(0)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
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
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} crownProgress={crownProgress} />
      <main>
        <Hero crownProgress={crownProgress} />
        <CaseStudy />
      </main>
      <Footer />
    </>
  )
}
