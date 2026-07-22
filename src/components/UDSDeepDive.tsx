import { useState, useEffect, useCallback, useRef } from 'react'
import './UDSDeepDive.css'

import imgBefore1 from '../assets/uds/before-1.jpg'
import imgDiscovery1 from '../assets/uds/discovery-1.png'
import imgDiscovery2 from '../assets/uds/discovery-2.png'
import imgChroma1 from '../assets/uds/chroma-1.png'
import imgChroma2 from '../assets/uds/chroma-2.png'
import imgChroma3 from '../assets/uds/chroma-3.png'
import imgGlass1 from '../assets/uds/glass-1.png'
import imgGlass2 from '../assets/uds/glass-2.png'
import imgGlass3 from '../assets/uds/glass-3.png'
import imgMood1 from '../assets/uds/mood-1.png'
import imgMood2 from '../assets/uds/mood-2.png'
import imgMood3 from '../assets/uds/mood-3.png'
import imgResult1 from '../assets/uds/result-1.jpg'
import imgResult2 from '../assets/uds/result-2.jpg'
import imgFoundations1 from '../assets/uds/foundations-1.png'
import imgFoundations2 from '../assets/uds/foundations-2.png'
import imgTokens from '../assets/uds/tokens-palette.png'
import imgStorybook from '../assets/uds/storybook-packages.png'
import imgIcons from '../assets/uds/icon-library.png'
import imgAccordion from '../assets/uds/accordion.png'
import imgCoverage from '../assets/uds/test-coverage.png'

interface Props {
  onNavigate: (path: string) => void
}

type SlideData = {
  id: string
  section: string
  title: string
  caption: string
  image?: string
  images?: string[]
  type: 'cover' | 'image'
}

const slides: SlideData[] = [
  {
    id: 'cover',
    section: 'UDS Deep Dive',
    title: 'Building Uniform',
    caption: 'A look inside the discovery, design exploration, and technical build that shaped the Intapp Design System — from fragmented legacy UI to a unified, AI-ready platform.',
    type: 'cover',
  },
  {
    id: 'before',
    section: '01 / Before',
    title: 'Where we started',
    caption: 'DealCloud before Uniform — generic styling, inconsistent components, no shared system. Each of nine products had its own visual language, or none at all.',
    image: imgBefore1,
    type: 'image',
  },
  {
    id: 'discovery-1',
    section: '02 / Discovery',
    title: 'Questions we asked every team',
    caption: 'A structured questionnaire sent to engineering leads across all products before we wrote a line of code. We needed to understand existing stacks, build tools, CSS setup, and what teams actually needed from a design system.',
    image: imgDiscovery1,
    type: 'image',
  },
  {
    id: 'discovery-2',
    section: '02 / Discovery',
    title: 'What we heard from DealCloud & Intapp teams',
    caption: 'Kickoff workshop output: DealCloud and Intapp were effectively two separate engineering businesses. No component library. No version sync. Complex data display needs that couldn\'t be solved with off-the-shelf components.',
    image: imgDiscovery2,
    type: 'image',
  },
  {
    id: 'chroma',
    section: '03 / Design Exploration',
    title: 'Direction 1: Chroma',
    caption: 'A bold purple/violet direction with high-contrast UI, Source Sans Pro typography, and saturated data visualization palettes. Energetic and geometric — but potentially too distinct from Intapp\'s existing brand identity.',
    images: [imgChroma3, imgChroma1, imgChroma2],
    type: 'image',
  },
  {
    id: 'glass',
    section: '03 / Design Exploration',
    title: 'Direction 2: Glass',
    caption: 'A cleaner, more restrained direction — Inter typography, lavender-tinted light mode, deep dark mode. Focused spatial hierarchy and frosted-glass references. Of the three directions, Glass came closest to Intapp\'s existing visual language.',
    images: [imgGlass3, imgGlass1, imgGlass2],
    type: 'image',
  },
  {
    id: 'mood',
    section: '04 / Final Direction',
    title: 'Uniform: direction, components & mood',
    caption: 'The chosen direction: precision construction, organic symmetry, macro meets micro. Tested against real DealCloud product screens in light and dark mode — the palette held up at density and the type hierarchy felt native to the product rather than imposed on it.',
    images: [imgMood3, imgMood1, imgMood2],
    type: 'image',
  },
  {
    id: 'result-1',
    section: '05 / The Result',
    title: 'Uniform in production: DealCloud',
    caption: 'DealCloud with Uniform applied — new dark navy top nav, clean type hierarchy, Intapp branding, properly structured deal management interface. Night and day from the starting point.',
    image: imgResult1,
    type: 'image',
  },
  {
    id: 'result-2',
    section: '05 / The Result',
    title: 'Uniform in production: Deal Pipeline',
    caption: 'The Uniform dark theme across DealCloud\'s core Deal Pipeline dashboard. Interactive charts, complex data tables, filter chips — all on-system, all consistent across the product.',
    image: imgResult2,
    type: 'image',
  },
  {
    id: 'foundations-1',
    section: '06 / Foundations & Tokens',
    title: 'Global color palette',
    caption: 'The Uniform global palette: intapp-blue, bright-green, and cerulean as primary brand scales — each with 11 stops from .50 to .950. Stored in global.json as raw primitives, the first layer in a three-tier token architecture.',
    image: imgFoundations1,
    type: 'image',
  },
  {
    id: 'foundations-2',
    section: '06 / Foundations & Tokens',
    title: 'The full palette: 151 tokens across 15 groups',
    caption: 'The complete color system spans tomato, marigold, mango, caribbean, cobalt, and more — 151 global tokens covering every semantic use case across status, data visualization, and UI states in both light and dark modes.',
    image: imgFoundations2,
    type: 'image',
  },
  {
    id: 'tokens',
    section: '06 / Foundations & Tokens',
    title: 'Token architecture in action',
    caption: 'The UDS Tokens tool in Storybook: Global → Semantic → Component layers. Each token carries an alias chain that makes light/dark mode switching a CSS variable swap — no component code changes required.',
    image: imgTokens,
    type: 'image',
  },
  {
    id: 'storybook',
    section: '07 / Component Library',
    title: 'Three frameworks, one codebase',
    caption: 'UDS Storybook hosts three framework packages: Web Components (Angular-compatible), React, and React-Next (React 19 + SSR). Components are authored once in Stencil and compiled to each target — one source of truth, three publishing paths.',
    image: imgStorybook,
    type: 'image',
  },
  {
    id: 'icons',
    section: '07 / Component Library',
    title: 'UDS Icon Library',
    caption: '200+ icons published as an icon font, searchable in Storybook. Icons are versioned independently from components and include AI-specific icons for emerging product features across the Intapp suite.',
    image: imgIcons,
    type: 'image',
  },
  {
    id: 'accordion',
    section: '07 / Component Library',
    title: 'Component patterns: real product contexts',
    caption: 'UDS Patterns Library shows each component in actual Intapp product contexts — matter detail panels, help center FAQs, document review, conflict checks. Engineers see how components behave in the real product, not just in isolation.',
    image: imgAccordion,
    type: 'image',
  },
  {
    id: 'coverage',
    section: '08 / Quality',
    title: '90.35% statement coverage',
    caption: '90.35% statements, 100% functions across 2,267 test statements. Every component ships with a full unit test suite. Coverage is tracked in Storybook and enforced in CI — quality is a gate, not a goal.',
    image: imgCoverage,
    type: 'image',
  },
]

export default function UDSDeepDive({ onNavigate }: Props) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= slides.length || fading) return
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 180)
  }, [fading])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  const slide = slides[current]
  const progress = ((current + 1) / slides.length) * 100

  return (
    <div className="uds-deck">
      <div className="uds-deck-topbar">
        <a
          href="/case-study/intapp"
          className="uds-deck-back"
          onClick={(e) => { e.preventDefault(); onNavigate('/case-study/intapp') }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 0.75C11.45 0.75 11.639 0.828 11.78 0.97C12.072 1.262 12.072 1.738 11.78 2.031L2.56 11.251H23.25C23.664 11.25 24 11.586 24 12C24 12.414 23.664 12.75 23.25 12.75H2.561L11.781 21.97C11.922 22.111 12 22.3 12 22.5C12 22.7 11.922 22.889 11.78 23.03C11.639 23.172 11.45 23.25 11.25 23.25C11.05 23.25 10.861 23.172 10.72 23.03L0.22 12.53C0.15 12.46 0.095 12.378 0.057 12.285C0.054 12.277 0.05 12.268 0.047 12.259C0.016 12.178 0 12.089 0 12C0 11.913 0.016 11.826 0.047 11.742C0.049 11.736 0.051 11.731 0.053 11.726C0.095 11.622 0.151 11.539 0.221 11.469L10.72 0.97C10.861 0.828 11.05 0.75 11.25 0.75Z" fill="currentColor"/>
          </svg>
          Uniform case study
        </a>
        <span className="uds-deck-page-title">Building Uniform — A deeper look</span>
        <span className="uds-deck-counter">{current + 1} / {slides.length}</span>
      </div>

      <div className="uds-deck-progress" role="progressbar" aria-valuenow={current + 1} aria-valuemax={slides.length}>
        <div className="uds-deck-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div
        className="uds-deck-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`uds-slide-wrap ${fading ? 'uds-slide-wrap--fading' : ''}`}>
          {slide.type === 'cover' ? (
            <div className="uds-slide uds-slide--cover">
              <div className="uds-slide-cover-inner">
                <div className="uds-slide-eyebrow">Uniform — Intapp Design System</div>
                <h1 className="uds-slide-cover-title">{slide.title}</h1>
                <p className="uds-slide-cover-sub">{slide.caption}</p>
                <button className="uds-slide-cover-cta" onClick={next}>
                  Begin
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.75 23.25C12.55 23.25 12.361 23.172 12.22 23.03C11.928 22.738 11.928 22.262 12.22 21.969L21.44 12.749H0.75C0.336 12.75 0 12.414 0 12C0 11.586 0.336 11.25 0.75 11.25H21.439L12.219 2.03C12.078 1.889 12 1.7 12 1.5C12 1.3 12.078 1.111 12.22 0.97C12.361 0.828 12.55 0.75 12.75 0.75C12.95 0.75 13.139 0.828 13.28 0.97L23.78 11.47C23.85 11.54 23.905 11.622 23.943 11.715C23.946 11.723 23.95 11.732 23.953 11.741C23.984 11.822 24 11.911 24 12C24 12.087 23.984 12.174 23.953 12.258C23.951 12.264 23.949 12.269 23.947 12.274C23.905 12.378 23.849 12.461 23.779 12.531L13.28 23.03C13.139 23.172 12.95 23.25 12.75 23.25Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="uds-slide uds-slide--image">
              <div className="uds-slide-header">
                <div className="uds-slide-section">{slide.section}</div>
                <h2 className="uds-slide-title">{slide.title}</h2>
              </div>
              {slide.images ? (
                <div className="uds-slide-img-grid">
                  {slide.images.map((src, i) => (
                    <img key={i} src={src} alt={`${slide.title} ${i + 1}`} className="uds-slide-img" loading="lazy" />
                  ))}
                </div>
              ) : slide.image ? (
                <div className="uds-slide-img-wrap">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="uds-slide-img"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <p className="uds-slide-caption">{slide.caption}</p>
            </div>
          )}
        </div>
      </div>

      <div className="uds-deck-nav">
        <button
          className="uds-deck-btn"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 0.75C11.45 0.75 11.639 0.828 11.78 0.97C12.072 1.262 12.072 1.738 11.78 2.031L2.56 11.251H23.25C23.664 11.25 24 11.586 24 12C24 12.414 23.664 12.75 23.25 12.75H2.561L11.781 21.97C11.922 22.111 12 22.3 12 22.5C12 22.7 11.922 22.889 11.78 23.03C11.639 23.172 11.45 23.25 11.25 23.25C11.05 23.25 10.861 23.172 10.72 23.03L0.22 12.53C0.15 12.46 0.095 12.378 0.057 12.285C0.054 12.277 0.05 12.268 0.047 12.259C0.016 12.178 0 12.089 0 12C0 11.913 0.016 11.826 0.047 11.742C0.049 11.736 0.051 11.731 0.053 11.726C0.095 11.622 0.151 11.539 0.221 11.469L10.72 0.97C10.861 0.828 11.05 0.75 11.25 0.75Z" fill="currentColor"/>
          </svg>
          Prev
        </button>

        <div className="uds-deck-dots" role="tablist" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`uds-deck-dot ${i === current ? 'uds-deck-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}: ${s.title}`}
              aria-selected={i === current}
              role="tab"
            />
          ))}
        </div>

        <button
          className="uds-deck-btn"
          onClick={next}
          disabled={current === slides.length - 1}
          aria-label="Next slide"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.75 23.25C12.55 23.25 12.361 23.172 12.22 23.03C11.928 22.738 11.928 22.262 12.22 21.969L21.44 12.749H0.75C0.336 12.75 0 12.414 0 12C0 11.586 0.336 11.25 0.75 11.25H21.439L12.219 2.03C12.078 1.889 12 1.7 12 1.5C12 1.3 12.078 1.111 12.22 0.97C12.361 0.828 12.55 0.75 12.75 0.75C12.95 0.75 13.139 0.828 13.28 0.97L23.78 11.47C23.85 11.54 23.905 11.622 23.943 11.715C23.946 11.723 23.95 11.732 23.953 11.741C23.984 11.822 24 11.911 24 12C24 12.087 23.984 12.174 23.953 12.258C23.951 12.264 23.949 12.269 23.947 12.274C23.905 12.378 23.849 12.461 23.779 12.531L13.28 23.03C13.139 23.172 12.95 23.25 12.75 23.25Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="uds-deck-hint" aria-hidden="true">
        Use ← → arrow keys to navigate
      </div>
    </div>
  )
}
