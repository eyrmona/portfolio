import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-inner">
        <div className="hero-eyebrow">UI Engineer & Design Systems</div>
        <h1 className="hero-name">Aimee Maroney</h1>
        <p className="hero-bio">
          I build the infrastructure that connects design to code — design systems, token architectures,
          component libraries, and the tooling that makes them scale. I work at the intersection of
          engineering rigor and design craft, with a background in both.
        </p>
        <div className="hero-tags">
          <span className="tag">Design Systems</span>
          <span className="tag">Web Components</span>
          <span className="tag">Design Tokens</span>
          <span className="tag">React</span>
          <span className="tag">TypeScript</span>
          <span className="tag">SCSS</span>
          <span className="tag">Stencil</span>
          <span className="tag">Accessibility</span>
          <span className="tag">AI Tooling</span>
        </div>
        <div className="hero-actions">
          <a href="#case-study" className="btn-primary">View Case Study</a>
          <a href="mailto:aimee.maroney@gmail.com" className="btn-secondary">Get in Touch</a>
        </div>
      </div>
      <div className="hero-graphic" aria-hidden="true">
        <div className="token-grid">
          {tokenSamples.map((t, i) => (
            <div key={i} className="token-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="token-swatch" style={{ background: t.color }} />
              <div className="token-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const tokenSamples = [
  { name: 'color-button-primary-surface-default', color: '#082f5e' },
  { name: 'color-button-primary-surface-hover', color: '#0a3d7a' },
  { name: 'color-button-primary-surface-active', color: '#062548' },
  { name: 'color-ui-surface-primary', color: '#ffffff' },
  { name: 'color-ui-surface-secondary', color: '#f4f5f8' },
  { name: 'color-feedback-success-default', color: '#1a7f4e' },
  { name: 'color-feedback-warning-default', color: '#c47a00' },
  { name: 'color-feedback-error-default', color: '#c4272b' },
  { name: 'color-feedback-info-default', color: '#1461c4' },
  { name: 'color-ai-surface-default', color: '#6b2fa0' },
  { name: 'color-neutral-300', color: '#d0d1dc' },
  { name: 'color-text-primary', color: '#111827' },
]
