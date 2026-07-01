import './CaseStudyIndex.css'

interface Props {
  onNavigate: (path: string) => void
}

const caseStudies = [
  {
    path: '/case-study/intapp',
    meta: '2022–2026 · Intapp · UI Engineering Manager',
    title: 'Intapp Uniform Design System',
    desc: 'Building a framework-agnostic design system from scratch to unify nine enterprise products across five different front-end stacks, scaling it into the foundation for AI-assisted development.',
    tags: ['Design Tokens', 'Multi-Framework', 'AI Tooling', 'Team Leadership'],
  },
  {
    path: '/case-study/syracuse',
    meta: '2020–2022 · Syracuse University · Full Stack Developer',
    title: 'Syracuse University Design System',
    desc: 'Unifying the visual identity of a major research university across 13 schools, dozens of departments, and over 500 web properties — each with its own team, culture, and existing tech stack.',
    tags: ['CSS Framework', 'Icon Library', 'Brand Alignment', 'Institutional Adoption'],
  },
]

export default function CaseStudyIndex({ onNavigate }: Props) {
  const go = (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onNavigate(path)
  }

  return (
    <section className="cs-index" id="case-study">
      <div className="cs-index-container">
        <div className="cs-index-eyebrow">Case Studies</div>
        <h2 className="cs-index-heading">Selected work</h2>
        <div className="cs-index-grid">
          {caseStudies.map(cs => (
            <a
              key={cs.path}
              className="cs-index-card"
              href={cs.path}
              onClick={go(cs.path)}
            >
              <div className="cs-index-card-meta">{cs.meta}</div>
              <h3 className="cs-index-card-title">{cs.title}</h3>
              <p className="cs-index-card-desc">{cs.desc}</p>
              <div className="cs-index-card-tags">
                {cs.tags.map(t => <span key={t} className="cs-index-card-tag">{t}</span>)}
              </div>
              <span className="cs-index-card-cta">
                Read case study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.75 23.25C12.55 23.25 12.361 23.172 12.22 23.03C11.928 22.738 11.928 22.262 12.22 21.969L21.44 12.749H0.75C0.336 12.75 0 12.414 0 12C0 11.586 0.336 11.25 0.75 11.25H21.439L12.219 2.03C12.078 1.889 12 1.7 12 1.5C12 1.3 12.078 1.111 12.22 0.97C12.361 0.828 12.55 0.75 12.75 0.75C12.95 0.75 13.139 0.828 13.28 0.97L23.78 11.47C23.85 11.54 23.905 11.622 23.943 11.715C23.946 11.723 23.95 11.732 23.953 11.741C23.984 11.822 24 11.911 24 12C24 12.087 23.984 12.174 23.953 12.258C23.951 12.264 23.949 12.269 23.947 12.274C23.905 12.378 23.849 12.461 23.779 12.531L13.28 23.03C13.139 23.172 12.95 23.25 12.75 23.25Z" fill="currentColor"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
