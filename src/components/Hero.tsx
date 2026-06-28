import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-inner">
        <div className="hero-eyebrow">UI Engineer & Design Systems</div>
        <h1 className="hero-name">Aimee Maroney</h1>
        <p className="hero-bio">
          I build the infrastructure that connects design to code: design systems, token architectures,
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
  { name: 'color-button-primary-surface-hover', color: '#0b4184' },
  { name: 'color-button-primary-surface-active', color: '#0e54a9' },
  { name: 'color-action-secondary-default', color: '#0353c7' },
  { name: 'color-ui-surface-primary', color: '#ffffff' },
  { name: 'color-ui-surface-secondary', color: '#f2f0ee' },
  { name: 'color-ui-surface-tertiary', color: '#06254b' },
  { name: 'color-toast-alert-success-outline', color: '#286d35' },
  { name: 'color-toast-alert-warning-outline', color: '#92420e' },
  { name: 'color-toast-alert-error-outline', color: '#bf2832' },
  { name: 'color-button-ai-primary-surface-default', color: '#784dda' },
  { name: 'color-ui-text-primary-enabled', color: '#25242a' },
]
