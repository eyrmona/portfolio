import { useState, useEffect } from 'react'
import './CaseStudy.css'
import './CaseStudyIndex.css'

const navSections = [
  { id: 'su-problem',       num: '01', name: 'The Problem' },
  { id: 'su-role',          num: '02', name: 'My Role' },
  { id: 'su-brand',         num: '03', name: 'Brand Foundation' },
  { id: 'su-solution',      num: '04', name: 'The Solution' },
  { id: 'su-documentation', num: '05', name: 'Documentation' },
  { id: 'su-adoption',      num: '06', name: 'Adoption' },
  { id: 'su-impact',        num: '07', name: 'Impact' },
  { id: 'su-next',          num: '08', name: 'Next Steps' },
]

export default function SyracuseCaseStudy() {
  const [activeSection, setActiveSection] = useState('su-problem')
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set())
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            setVisitedSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )
    navSections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const article = document.getElementById('su-case-study')
    const onScroll = () => {
      setShowScrollTop(article ? window.scrollY > article.offsetTop + 300 : false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    document.getElementById('su-case-study')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article className="case-study case-study--su" id="su-case-study">
      <div className="cs-container">

        {/* Back link */}
        <a href="/#case-study" className="cs-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.25 0.75C11.45 0.75 11.639 0.828 11.78 0.97C12.072 1.262 12.072 1.738 11.78 2.031L2.56 11.251H23.25C23.664 11.25 24 11.586 24 12C24 12.414 23.664 12.75 23.25 12.75H2.561L11.781 21.97C11.922 22.111 12 22.3 12 22.5C12 22.7 11.922 22.889 11.78 23.03C11.639 23.172 11.45 23.25 11.25 23.25C11.05 23.25 10.861 23.172 10.72 23.03L0.22 12.53C0.15 12.46 0.095 12.378 0.057 12.285C0.054 12.277 0.05 12.268 0.047 12.259C0.016 12.178 0 12.089 0 12C0 11.913 0.016 11.826 0.047 11.742C0.049 11.736 0.051 11.731 0.053 11.726C0.095 11.622 0.151 11.539 0.221 11.469L10.72 0.97C10.861 0.828 11.05 0.75 11.25 0.75Z" fill="currentColor"/>
          </svg>
          All Case Studies
        </a>

        {/* Header */}
        <header className="cs-header">
          <div className="cs-eyebrow">Case Study · 2020–2022</div>
          <h2 className="cs-title">Syracuse University Design System</h2>
          <p className="cs-subtitle">
            Unifying the visual identity of a major research university across 13 schools,
            dozens of departments, and over 500 web properties — each with its own team,
            culture, and existing tech stack.
          </p>
          <div className="cs-meta-row">
            <div className="cs-meta-item">
              <span className="cs-meta-label">Organization</span>
              <span className="cs-meta-value">Syracuse University</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">My Role</span>
              <span className="cs-meta-value">Full Stack Developer</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Scope</span>
              <span className="cs-meta-value">500+ web properties</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Outcome</span>
              <span className="cs-meta-value">100% adoption in 1 year</span>
            </div>
          </div>
        </header>

        {/* Table of contents */}
        <nav className="cs-toc" aria-label="Case study sections">
          <p className="cs-meta-label" style={{ marginBottom: '1rem' }}>Contents</p>
          <div className="cs-toc-grid">
            {navSections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  'cs-toc-item',
                  activeSection === s.id ? 'active' : '',
                  visitedSections.has(s.id) && activeSection !== s.id ? 'visited' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="cs-toc-num">{s.num}</span>
                <span className="cs-toc-name">{s.name}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Problem */}
        <Section id="su-problem" label="01 / The Problem">
          <h3>Five hundred websites, zero shared language</h3>
          <p>
            Syracuse University was undergoing a major rebrand and needed its digital presence to follow.
            The challenge wasn't a single website — it was an entire ecosystem: 13 schools and colleges,
            dozens of departments, and over 500 web properties, each managed autonomously.
          </p>
          <div className="callout-grid">
            <Callout icon="🏛️" label="13 schools & colleges" sub="each with their own web team and visual identity" />
            <Callout icon="🌐" label="500+ web properties" sub="across departments, programs, and research centers" />
            <Callout icon="🧩" label="Multiple CMS platforms" sub="Drupal, WordPress, custom builds — no shared infrastructure" />
            <Callout icon="🎨" label="No shared design language" sub="inconsistent typography, color, and component patterns everywhere" />
          </div>
          <p>
            Each school had its own designers, its own visual language, and deeply held opinions about what
            made their site feel like theirs. A top-down mandate for consistency would meet resistance —
            the solution had to respect institutional autonomy while still delivering brand alignment.
          </p>
        </Section>

        {/* My Role */}
        <Section id="su-role" label="02 / My Role">
          <h3>Hired to build the system from the ground up</h3>
          <p>
            The university hired me as a full stack developer in the Marketing & Communications department
            to initiate and build a design system capable of aligning the entire digital estate. I was the
            primary driver of the project from conception to adoption.
          </p>
          <ul className="role-list">
            <li>Partnered with the university's external branding agency to gather requirements and translate them into web standards</li>
            <li>Audited 15+ web properties to identify shared patterns, divergent implementations, and accessibility gaps</li>
            <li>Designed and built the CSS framework from scratch: tokens, typography, layout, components, and utilities</li>
            <li>Built and published a custom icon font library for use across all university web properties</li>
            <li>Designed and built the design system documentation site</li>
            <li>Led school-by-school adoption, working directly with web teams to implement the new standards</li>
          </ul>
        </Section>

        {/* Brand Foundation */}
        <Section id="su-brand" label="03 / Brand Foundation">
          <h3>Starting with the brand agency</h3>
          <p>
            Before writing a line of CSS, I worked closely with the university's branding agency to gather
            all visual requirements and translate them into web-ready standards. The agency had defined the
            direction; my job was to operationalize it.
          </p>
          <ul className="process-list">
            <li>
              <strong>Brand requirements gathering</strong>: reviewed the agency's deliverables —
              color palette, typography system, logo usage rules, photography guidelines — and identified
              everything that needed a web-specific interpretation or constraint.
            </li>
            <li>
              <strong>Core color palette</strong>: established primary, secondary, and accent colors with
              defined accessible contrast pairings. Syracuse orange anchored the system, with a neutral
              and supporting palette for UI surfaces, text, and semantic states.
            </li>
            <li>
              <strong>Web style guide</strong>: drafted a living style guide that translated brand decisions
              into implementable rules — pixel values, hex codes, font-size scales, spacing ratios — that
              any team could reference alongside the agency materials.
            </li>
            <li>
              <strong>Accessibility baseline</strong>: flagged and resolved brand color combinations that
              failed WCAG 2.1 contrast requirements before they were baked into the system.
            </li>
          </ul>
        </Section>

        {/* Solution */}
        <Section id="su-solution" label="04 / The Solution">
          <h3>A CSS framework built for institutional flexibility</h3>
          <p>
            Given the diversity of CMS platforms and the strong desire from schools to retain their own
            character, a component library tied to any particular framework was never an option. The right
            solution was a CSS-first system: framework-agnostic, adoptable by any team, on any platform.
          </p>
          <p>
            The framework combined two philosophies deliberately:
          </p>
          <div className="adoption-steps">
            <div className="adoption-step">
              <div className="adoption-step-num">1</div>
              <div>
                <strong>Opinionated classes</strong>
                <p>Pre-built component classes (buttons, cards, navigation, forms, typography) that enforce brand standards out of the box. A school adopting these gets brand-compliant UI immediately.</p>
              </div>
            </div>
            <div className="adoption-step">
              <div className="adoption-step-num">2</div>
              <div>
                <strong>Utility classes</strong>
                <p>A complementary set of single-purpose utilities for spacing, color, alignment, and sizing — giving teams the flexibility to customize layouts and fine-tune visual details without overriding component CSS or fighting the system.</p>
              </div>
            </div>
          </div>
          <p>
            Alongside the CSS framework, a custom <strong>icon font library</strong> was designed and
            distributed for use across all university web properties — consistent iconography as a
            single npm package, usable on any platform via a font import.
          </p>
          <div className="callout-box">
            <strong>Why CSS over a component library</strong>
            <p>
              A React or Vue component library would have excluded every team on Drupal, WordPress, or a
              custom CMS. A CSS framework works everywhere HTML exists. The framework approach also lowered
              the barrier to adoption: teams didn't need to refactor their markup or replace their CMS
              templates — they just added classes.
            </p>
          </div>
        </Section>

        {/* Documentation */}
        <Section id="su-documentation" label="05 / Documentation">
          <h3>A documentation site as the system's front door</h3>
          <p>
            The CSS framework was only as useful as it was discoverable. A robust documentation site was a
            core deliverable — not an afterthought. The site served as the primary resource for every web
            team at the university.
          </p>
          <div className="doc-grid">
            <div className="doc-card">
              <div className="doc-card-label">Live component examples</div>
              <p>Every component class documented with live rendered examples, code snippets, and copy-paste HTML. Teams could see exactly what they were getting before they implemented it.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Color & typography system</div>
              <p>The full color palette documented with hex values, accessible pairings, and usage guidance. Typography scale with font-family, weights, and size reference.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Icon library reference</div>
              <p>Searchable icon font reference with each icon name, class, and usage example — the same resource served both designers and developers.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Utility class reference</div>
              <p>Complete list of utility classes with examples, making customization patterns explicit rather than leaving teams to guess what was available.</p>
            </div>
          </div>
        </Section>

        {/* Adoption */}
        <Section id="su-adoption" label="06 / Adoption">
          <h3>Earning trust, school by school</h3>
          <p>
            The hardest part of the project wasn't building the system — it was getting 13 autonomous
            institutions to trust it. Each school had cultivated its own web identity over years.
            Their hesitation was legitimate: they didn't want to become interchangeable.
          </p>
          <p>
            The approach was hands-on and consultative, not mandate-driven. I worked directly with each
            school's web team, sitting alongside their designers and developers to implement the CSS
            framework in the context of their existing site.
          </p>
          <div className="ai-initiative-list">
            <div className="ai-initiative">
              <h4>Meeting teams where they were</h4>
              <p>
                Rather than asking schools to rebuild from scratch, the adoption path started with
                the lowest-friction entry point: applying brand colors and typography. This produced
                immediate visible improvement with minimal migration effort, and demonstrated the
                system's value before asking for deeper investment.
              </p>
            </div>
            <div className="ai-initiative">
              <h4>Utility classes as the bridge</h4>
              <p>
                The utility class layer was the key to building trust. Schools could use the opinionated
                component classes for structural elements while using utilities to add their own color
                accents, custom spacing, and personality. The system gave them a foundation —
                not a cage.
              </p>
            </div>
            <div className="ai-initiative">
              <h4>Customization by design</h4>
              <p>
                I worked with each school on how to use the utility system to maintain their unique
                character within brand standards. The College of Law and the School of Architecture
                had very different aesthetics — both are fully on-brand, and neither looks like the
                other. That was intentional.
              </p>
            </div>
          </div>
        </Section>

        {/* Impact */}
        <Section id="su-impact" label="07 / Impact">
          <h3>Full university alignment in one year</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-card-icon">🎯</div>
              <div className="impact-card-title">100% adoption</div>
              <p>Within one year, all 13 schools, colleges, and departments had adopted the new brand standards across their web properties.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">📈</div>
              <div className="impact-card-title">+30% brand confidence</div>
              <p>User testing scores on brand confidence and recognition improved by 30% following the rollout of the unified visual system.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🌐</div>
              <div className="impact-card-title">500+ properties aligned</div>
              <p>Every web property in the university estate — from the main site to individual research center pages — aligned to a single visual language.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🏛️</div>
              <div className="impact-card-title">Identity preserved</div>
              <p>Each school maintained its unique character and voice. Consistent brand standards and distinctive institutional identity coexisted — by design.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">♿</div>
              <div className="impact-card-title">Accessibility baseline</div>
              <p>Accessible contrast, keyboard navigation, and semantic markup baked into framework components — every team inherited compliance without implementing it independently.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">⚡</div>
              <div className="impact-card-title">Faster web launches</div>
              <p>New department sites and program pages could be built on the CSS framework in days rather than weeks, with brand compliance guaranteed from the start.</p>
            </div>
          </div>
        </Section>

        {/* Next Steps */}
        <Section id="su-next" label="08 / Next Steps">
          <h3>Wagtail CMS templates</h3>
          <p>
            With adoption achieved and the CSS framework stable, the team began the next phase of the work:
            building a set of Wagtail CMS templates for schools to adopt.
          </p>
          <p>
            Where the CSS framework gave teams a design language, the Wagtail templates would give them
            a full content management experience — predefined page templates, content block patterns, and
            navigation structures built to match the new brand standards. Schools could stand up a
            brand-compliant site without starting from a blank CMS install.
          </p>
          <ul className="process-list">
            <li>
              <strong>Predefined page templates</strong>: home, department overview, program pages, faculty
              profiles, news — the pages every university entity needs, pre-built and on-brand.
            </li>
            <li>
              <strong>Content block system</strong>: a library of reusable content blocks (hero, card grid,
              callout, accordion, media embed) that editors could compose into pages without writing HTML.
            </li>
            <li>
              <strong>CSS framework integration</strong>: templates rendered using the design system CSS
              classes and icon font, ensuring visual consistency without requiring editors or developers
              to know the underlying framework.
            </li>
          </ul>
        </Section>

      </div>

      {showScrollTop && (
        <button className="cs-scroll-top" onClick={scrollToTop} aria-label="Back to top of case study">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Top</span>
        </button>
      )}
    </article>
  )
}

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section className="cs-section" id={id}>
      <div className="cs-section-label">{label}</div>
      <div className="cs-section-content">{children}</div>
    </section>
  )
}

function Callout({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="callout-card">
      <span className="callout-icon">{icon}</span>
      <strong>{label}</strong>
      <span>{sub}</span>
    </div>
  )
}
