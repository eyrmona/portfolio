import { useState, useEffect } from 'react'
import './CaseStudy.css'
import './CaseStudyIndex.css'

const navSections = [
  { id: 'ae-problem',    num: '01', name: 'The Problem' },
  { id: 'ae-role',       num: '02', name: 'My Role' },
  { id: 'ae-branding',   num: '03', name: 'Branding Capture' },
  { id: 'ae-tokens',     num: '04', name: 'Token Architecture' },
  { id: 'ae-figma',      num: '05', name: 'Figma Library' },
  { id: 'ae-tailwind',   num: '06', name: 'Tailwind & Build' },
  { id: 'ae-challenges', num: '07', name: 'Challenges' },
  { id: 'ae-impact',     num: '08', name: 'Impact' },
]

export default function ArtifactCaseStudy() {
  const [activeSection, setActiveSection] = useState('ae-problem')
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
    const article = document.getElementById('ae-case-study')
    const onScroll = () => {
      setShowScrollTop(article ? window.scrollY > article.offsetTop + 300 : false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    document.getElementById('ae-case-study')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article className="case-study" id="ae-case-study">
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
          <div className="cs-eyebrow">Case Study · 2024–2025 · Freelance</div>
          <h2 className="cs-title">Artifact Engine Design System</h2>
          <p className="cs-subtitle">
            Building a fully white-label design system for an AI-driven content management
            platform — one where every client site looks completely unique, yet the entire
            system is generated from a single token architecture.
          </p>
          <div className="cs-meta-row">
            <div className="cs-meta-item">
              <span className="cs-meta-label">Client</span>
              <a className="cs-meta-value cs-meta-link" href="https://apphammer.co" target="_blank" rel="noreferrer">AppHammer / Artifact Engine ↗</a>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">My Role</span>
              <span className="cs-meta-value">Design Systems Consultant</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Stack</span>
              <span className="cs-meta-value">Figma · Tailwind · Django</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Type</span>
              <span className="cs-meta-value">Freelance engagement</span>
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
        <Section id="ae-problem" label="01 / The Problem">
          <h3>One platform, infinite brand identities</h3>
          <p>
            Artifact Engine is an AI-driven content management system built for two audiences: marketing
            agencies managing dozens of client websites simultaneously, and educational institutions
            overseeing dozens of department or school sites from a single platform. Both audiences share
            the same core challenge — scale — but with opposing requirements.
          </p>
          <div className="callout-grid">
            <Callout icon="🏢" label="Marketing agencies" sub="Managing dozens of client sites, each requiring distinct brand identities" />
            <Callout icon="🏛️" label="Educational institutions" sub="Managing departments and schools that share a brand but need individual character" />
            <Callout icon="🎨" label="Full white-labeling required" sub="The platform itself had to be completely invisible; only the client's brand shows" />
            <Callout icon="🚫" label="No cookie-cutter output" sub="Every generated site had to feel intentionally designed, not templated" />
          </div>
          <p>
            The design system had to solve both sides of this tension: be opinionated enough to produce
            professional, accessible results automatically, but flexible enough that no two client sites
            could be mistaken for each other.
          </p>
        </Section>

        {/* Role */}
        <Section id="ae-role" label="02 / My Role">
          <h3>End-to-end design system architecture</h3>
          <p>
            AppHammer engaged me as a freelance design systems consultant to own the entire front-end
            design architecture for Artifact Engine. The AppHammer engineering team handled the custom
            Django backend; my scope was everything that determined how a client's brand became a working
            design system.
          </p>
          <ul className="role-list">
            <li>Designed the branding capture interface — the forms and AI prompting flows that gather a client's visual identity</li>
            <li>Architected the token system that maps captured brand values to a scalable, white-label design language</li>
            <li>Built the Figma component library and content block pattern library (hero banners, headers, navigation, cards, and more)</li>
            <li>Mapped the token architecture to all Figma components and patterns</li>
            <li>Applied the token architecture to a Tailwind CSS configuration that served as the runtime styling layer</li>
            <li>Collaborated with AppHammer devs to connect the Figma content blocks to the Django rendering pipeline via custom plugins and MCP integrations</li>
          </ul>
        </Section>

        {/* Branding Capture */}
        <Section id="ae-branding" label="03 / Branding Capture">
          <h3>Translating a client's brand into system inputs</h3>
          <p>
            Before any design system can generate a unique site, it needs a well-defined picture of the
            client's brand. The branding capture interface was the system's front door — a structured
            conversation between the platform and the client that gathered everything needed to drive the
            token architecture.
          </p>
          <p>
            The capture process used a combination of two approaches:
          </p>
          <div className="adoption-steps">
            <div className="adoption-step">
              <div className="adoption-step-num">1</div>
              <div>
                <strong>AI prompting</strong>
                <p>Conversational AI gathered qualitative brand direction — tone, personality, visual references, adjectives the client used to describe their brand. This informed decisions that couldn't be captured in a form field: spatial density, border radius philosophy, typographic weight and rhythm.</p>
              </div>
            </div>
            <div className="adoption-step">
              <div className="adoption-step-num">2</div>
              <div>
                <strong>Structured forms</strong>
                <p>Explicit form inputs captured the precise values: primary and secondary colors (hex or brand swatches), chosen typefaces, corner radius preferences, and spacing scale. These became the direct inputs to the token generation pipeline.</p>
              </div>
            </div>
          </div>
          <p>
            The combination was important. Forms alone can produce technically correct but visually
            inconsistent results. AI prompting alone lacks the precision needed for a token system.
            Together they captured both the numbers and the intent behind them.
          </p>
        </Section>

        {/* Token Architecture */}
        <Section id="ae-tokens" label="04 / Token Architecture">
          <h3>A token system that generates itself from brand inputs</h3>
          <p>
            The token architecture was the heart of the entire system. Every value captured in the
            branding phase needed to map cleanly to a token, and every token needed to cascade
            predictably to components and layouts.
          </p>

          <h4>Form values to tokens</h4>
          <p>
            Client inputs mapped directly to semantic token slots: the primary brand color became
            <code>color-brand-primary</code>, the chosen typeface became <code>font-family-heading</code>,
            corner radius preference resolved to a spacing-scale-relative <code>radius-base</code> value.
            No manual translation was needed — the mapping was codified in the pipeline.
          </p>

          <h4>AI-generated color palettes</h4>
          <p>
            A client providing two or three core brand colors isn't enough to build a full UI. The system
            needed tints, shades, surface colors, hover states, and subtle backgrounds. AI was used to
            generate these programmatically from the core colors:
          </p>
          <ul className="role-list">
            <li>Tint and shade scales (100–900) generated from each core brand color</li>
            <li>Surface and background tokens derived from the lightest tints</li>
            <li>Secondary action and selection colors pulled from mid-range shades</li>
            <li>All generated values fed back into the token layer as named semantic tokens</li>
          </ul>

          <div className="arch-diagram">
            <div className="arch-layer">
              <div className="arch-layer-label">Brand Input</div>
              <code>Primary, Secondary, Accent</code>
              <div className="arch-layer-desc">Client-provided core colors from branding capture</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-layer">
              <div className="arch-layer-label">AI Palette Generation</div>
              <code>100–900 scales</code>
              <div className="arch-layer-desc">Tints, shades, surfaces, and interaction states</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-layer">
              <div className="arch-layer-label">Semantic Tokens</div>
              <code>color-surface-*, color-action-*</code>
              <div className="arch-layer-desc">Named decisions consumed by components and Tailwind</div>
            </div>
          </div>
        </Section>

        {/* Figma Library */}
        <Section id="ae-figma" label="05 / Figma Library">
          <h3>Components and content blocks tokenized for infinite variation</h3>
          <p>
            With the token architecture in place, the next step was building the Figma library — the
            bridge between the token system and the actual pages a client would publish.
          </p>
          <p>
            The library was organized in two layers:
          </p>
          <div className="doc-grid">
            <div className="doc-card">
              <div className="doc-card-label">Core components</div>
              <p>Primitive UI elements — buttons, inputs, badges, icons, typography styles — all bound to token variables. Swapping a client's token set into the Figma file instantly recolors and re-styles every component.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Content block patterns</div>
              <p>Compositional blocks that agencies and institutions use to build pages: hero banners, section headers, navigation bars, card grids, feature callouts, and footer layouts. Each block assembled from tokenized components.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Token mapping</div>
              <p>Every Figma element — fill, stroke, text style, corner radius, spacing — was bound to a token variable rather than a hardcoded value. This was what made the library genuinely white-label rather than just re-skinneable.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Figma MCP integration</div>
              <p>Custom plugins and MCP integrations allowed the AI to read content blocks directly from the Figma file. The AppHammer team used this to drive server-side rendering — Figma was the authoritative source for both design and content structure.</p>
            </div>
          </div>
        </Section>

        {/* Tailwind */}
        <Section id="ae-tailwind" label="06 / Tailwind & Build">
          <h3>Tokens to Tailwind: the runtime styling layer</h3>
          <p>
            The final step in the design architecture was applying the token system to a Tailwind CSS
            configuration. This was the layer that made the design system real in the browser.
          </p>
          <p>
            The Tailwind config was generated from the same token values that drove the Figma library.
            Brand colors, type scales, spacing, and border radii all flowed into Tailwind's theme
            extension — meaning the utility classes available in any client's site were directly derived
            from that client's token set.
          </p>
          <pre><code>{`// tailwind.config.js — generated from client token set
theme: {
  extend: {
    colors: {
      'brand-primary':   'var(--color-brand-primary)',
      'brand-surface':   'var(--color-surface-default)',
      'action-default':  'var(--color-action-default)',
      'action-hover':    'var(--color-action-hover)',
    },
    fontFamily: {
      heading: 'var(--font-family-heading)',
      body:    'var(--font-family-body)',
    },
    borderRadius: {
      base: 'var(--radius-base)',
      card: 'var(--radius-card)',
    },
  }
}`}</code></pre>
          <p>
            The Django backend rendered pages server-side using the content blocks from Figma, styled
            entirely through this Tailwind configuration. No JavaScript framework was required — pages
            were fast, lightweight HTML with tokenized utility classes, and the CMS generated them
            on the fly from content and brand data.
          </p>
          <div className="callout-box">
            <strong>Framework-agnostic by design</strong>
            <p>
              This project demonstrated a core principle: a well-built token system is not dependent on
              any front-end framework. The same token architecture that drove the Figma library drove
              the Tailwind config, and could equally drive a React, Vue, or vanilla CSS implementation.
              The tokens are the system — everything else is output.
            </p>
          </div>
        </Section>

        {/* Challenges */}
        <Section id="ae-challenges" label="07 / Challenges">
          <h3>When brand colors break accessibility</h3>
          <p>
            The hardest design system problem to solve at scale is one that gets worse the more clients
            you onboard: brand colors that fail accessibility contrast requirements.
          </p>
          <p>
            A client's primary brand color might be a mid-range orange that passes contrast on a white
            background but fails completely when placed on a light surface token, or when used as button
            text against its own background. These issues couldn't be caught manually at scale — they had
            to be detected and resolved automatically.
          </p>
          <div className="ai-initiative-list">
            <div className="ai-initiative">
              <h4>Contrast-aware token generation</h4>
              <p>
                The AI palette generation pipeline was trained to evaluate contrast ratios at every step.
                When generating a tint-shade scale from a brand color, the model checked each generated
                value against its intended pairing (text on surface, icon on background, button label on
                button fill) and flagged any combination falling below WCAG AA thresholds.
              </p>
            </div>
            <div className="ai-initiative">
              <h4>Automatic color adjustment</h4>
              <p>
                For flagged combinations, the model was given two resolution strategies: shift the
                generated color toward a passing value (darkening a light text color, lightening a dark
                surface) while staying as close as possible to the brand intent, or suggest an alternative
                token pairing that avoids the failing combination entirely.
              </p>
            </div>
            <div className="ai-initiative">
              <h4>Interactive element overrides</h4>
              <p>
                Buttons and interactive states were the most problematic surface. A brand's primary color
                might be unusable as a button background with white text, requiring the model to either
                adjust the background shade or recommend switching to a dark label. These overrides were
                codified as explicit token decisions rather than CSS hacks — the accessibility fix lived
                in the token layer, not the component.
              </p>
            </div>
          </div>
          <p>
            Getting this right required significant iteration on the AI prompts and the generation
            pipeline logic. Contrast is not just a binary pass/fail — it interacts with brand intent,
            semantic meaning, and component context. The final system handled the common cases
            automatically and surfaced edge cases for human review rather than silently producing
            inaccessible output.
          </p>
        </Section>

        {/* Impact */}
        <Section id="ae-impact" label="08 / Impact">
          <h3>Complete customization, zero framework dependency</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-card-icon">🎨</div>
              <div className="impact-card-title">True white-labeling</div>
              <p>Every client site generated a completely unique visual identity from their brand inputs — colors, typography, spatial treatments — with no shared visual footprint between clients.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">⚡</div>
              <div className="impact-card-title">Extremely fast page loads</div>
              <p>Server-side Django rendering with tokenized Tailwind utility classes and no JavaScript framework overhead produced lean, fast HTML. No client-side hydration, no bundle weight.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🤖</div>
              <div className="impact-card-title">AI-driven page assembly</div>
              <p>AI read content blocks directly from Figma via MCP integrations and assembled pages server-side from content and brand data — keeping design and production permanently in sync.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">♿</div>
              <div className="impact-card-title">Accessibility at generation time</div>
              <p>Contrast checking and color adjustment baked into the token generation pipeline — accessibility compliance was enforced before a client's brand ever reached a component, not after.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">📐</div>
              <div className="impact-card-title">Framework-agnostic proof</div>
              <p>The project demonstrated that a token-based design system is not a React or component framework concept. The same token architecture powered Figma, Tailwind, and Django with no coupling to any particular stack.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🚀</div>
              <div className="impact-card-title">Agency-scale throughput</div>
              <p>Marketing agencies could onboard a new client, capture their brand, and produce a working site with a unique identity in a fraction of the time a traditional bespoke build would require.</p>
            </div>
          </div>
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
