import './Hero.css'
import TokenButtonDemo from './TokenButtonDemo'

export default function Hero({ crownProgress = 0, theme = 'dark' }: { crownProgress?: number; theme?: 'dark' | 'light' }) {
  return (
    <section className="hero" id="about">
      <div className="hero-inner">
        <AimLogo className="hero-logo" crownProgress={crownProgress} />
        <div className="hero-eyebrow">Design System Leader + UI Engineering</div>
        <h1 className="hero-name">Aimee Maroney</h1>
        <p className="hero-bio">
          I build the infrastructure that connects design to code: design systems, token architectures,
          component libraries, and the tooling that makes them scale. I work at the intersection of
          engineering rigor and design craft, with a background in both.
        </p>
        <div className="hero-tags">
          <span className="tag">Design Systems</span>
          <span className="tag">Figma</span>
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
      <div className="hero-graphic">
        <TokenButtonDemo theme={theme} />
      </div>
    </section>
  )
}

function AimLogo({ className, crownProgress = 0 }: { className?: string; crownProgress?: number }) {
  return (
    <svg className={className} width="98" height="136" viewBox="0 0 98 136" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Red → accent, Black → currentColor */}
      <g
        className="logo-crown-wrap"
        style={{
          opacity: 1 - crownProgress * 0.85,
          transform: `scale(${1 - crownProgress * 0.25}) translateY(${-crownProgress * 16}px)`,
        }}
      >
        <g className="logo-a">
          <path d="M48.8356 0L3.10181 62.162H8.4907L48.8356 7.98843L88.7268 62.1094H95.0081L48.8356 0Z" fill="var(--color-accent)"/>
          <path d="M49.0549 29.7334L43.8335 34.9548L49.0549 40.1762L54.2763 34.9548L49.0549 29.7334Z" fill="var(--color-accent)"/>
        </g>
        <path className="logo-bar" d="M93.8304 68.6157H4.27946V73.8518H93.8304V68.6157Z" fill="currentColor"/>
        <path className="logo-m" d="M48.9715 52.2939L97.4382 2.81926L97.573 62.0947L92.7761 62.0976V57.329H92.8064L92.739 14.4999L50.9353 57.1747L48.9715 59.1875L5.2029 13.7616L4.93434 57.329H4.96364V62.1581L0.16774 62.162L0.570084 2.08098L48.9715 52.2939Z" fill="currentColor"/>
      </g>
      <g className="logo-eye">
        <path d="M48.2662 91.0278C37.9953 91.0278 29.6713 99.3518 29.6713 109.623C29.6713 119.894 37.9953 128.285 48.2662 128.285C58.537 128.285 66.8611 119.961 66.8611 109.69C66.8611 99.419 58.537 91.0278 48.2662 91.0278ZM62.0949 109.623C62.0949 117.275 55.919 123.451 48.2662 123.451C40.6134 123.451 34.4375 117.275 34.4375 109.623C34.4375 101.97 40.6134 95.794 48.2662 95.794C55.919 95.794 62.0949 102.037 62.0949 109.623Z" fill="var(--color-accent)"/>
        <path d="M92.2361 107.475C87.1343 104.991 81.5625 100.963 76.9306 96.331C69.0093 88.4097 58.8056 83.9792 48.3333 83.9792H48.1319C37.6597 84.0463 27.5903 88.4097 19.7361 96.331C15.1042 100.963 9.53241 104.991 4.43055 107.475L0 109.623L4.43055 111.771C9.53241 114.255 15.1042 118.282 19.7361 122.914C27.5903 130.769 37.7269 135.199 48.1319 135.266H48.3333C58.8056 135.266 68.9421 130.903 76.9306 122.914C81.5625 118.282 87.1343 114.255 92.2361 111.771L96.6667 109.623L92.2361 107.475ZM86.1944 109.623C81.7639 112.241 77.3333 115.731 73.5741 119.558C58.9398 134.192 37.7269 134.192 23.0926 119.558C19.3333 115.799 14.8356 112.308 10.4722 109.623C14.9028 107.005 19.3333 103.514 23.0926 99.6875C37.7269 85.0532 58.9398 85.0532 73.5741 99.6875C77.2662 103.514 81.7639 107.005 86.1944 109.623Z" fill="currentColor"/>
        <path className="logo-pupil" d="M48.2662 115.597C51.5659 115.597 54.2408 112.922 54.2408 109.623C54.2408 106.323 51.5659 103.648 48.2662 103.648C44.9666 103.648 42.2917 106.323 42.2917 109.623C42.2917 112.922 44.9666 115.597 48.2662 115.597Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
