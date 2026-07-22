import { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import CaseStudy from './components/CaseStudy'
import Resume from './components/Resume'
import CaseStudyIndex from './components/CaseStudyIndex'
import SyracuseCaseStudy from './components/SyracuseCaseStudy'
import ArtifactCaseStudy from './components/ArtifactCaseStudy'
import UDSDeepDive from './components/UDSDeepDive'
import CLIDeepDive from './components/CLIDeepDive'
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
  const scrollPositions = useRef<Record<string, number>>({})
  const pendingHash = useRef<string | null>(null)

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
    if (pendingHash.current) {
      const id = pendingHash.current
      pendingHash.current = null
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo(0, scrollPositions.current[path] ?? 0)
  }, [path])

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
    const hashIndex = to.indexOf('#')
    const toPath = hashIndex === -1 ? to : to.slice(0, hashIndex) || '/'
    const toHash = hashIndex === -1 ? '' : to.slice(hashIndex + 1)
    const from = window.location.pathname

    if (toPath === from) {
      if (toHash) {
        window.history.pushState({}, '', to)
        document.getElementById(toHash)?.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    scrollPositions.current[from] = window.scrollY
    pendingHash.current = toHash || null
    window.history.pushState({}, '', to)
    setPath(toPath)
  }

  const isResume = path === '/resume'
  const isIntapp = path === '/case-study/intapp'
  const isSyracuse = path === '/case-study/syracuse'
  const isArtifact = path === '/case-study/artifact'
  const isDeepDive = path === '/case-study/intapp/deep-dive'
  const isCLI = path === '/case-study/intapp/cli'
  const isHome = !isResume && !isIntapp && !isSyracuse && !isArtifact && !isDeepDive && !isCLI

  return (
    <>
      <Nav
        theme={theme}
        onToggleTheme={toggleTheme}
        crownProgress={isHome ? crownProgress : 1}
        onNavigate={navigate}
      />
      <main>
        {isResume   && <Resume />}
        {isIntapp   && <CaseStudy onNavigate={navigate} />}
        {isSyracuse && <SyracuseCaseStudy />}
        {isArtifact && <ArtifactCaseStudy />}
        {isDeepDive && <UDSDeepDive onNavigate={navigate} />}
        {isCLI      && <CLIDeepDive onNavigate={navigate} />}
        {isHome     && <><Hero crownProgress={crownProgress} theme={theme} /><CaseStudyIndex onNavigate={navigate} /></>}
      </main>
      <Footer />
    </>
  )
}
