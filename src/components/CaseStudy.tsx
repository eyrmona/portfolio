import { useState, useEffect } from 'react'
import './CaseStudy.css'
import './CaseStudyIndex.css'

const navSections = [
  { id: 'problem',       num: '01', name: 'The Problem' },
  { id: 'role',          num: '02', name: 'My Role' },
  { id: 'discovery',     num: '03', name: 'Discovery' },
  { id: 'design-language', num: '04', name: 'Design Language' },
  { id: 'tokens',        num: '05', name: 'Tokens' },
  { id: 'architecture',  num: '06', name: 'Architecture' },
  { id: 'documentation', num: '07', name: 'Documentation' },
  { id: 'adoption',      num: '08', name: 'Adoption' },
  { id: 'ai',            num: '09', name: 'AI Optimization' },
  { id: 'impact',        num: '10', name: 'Impact' },
]

export default function CaseStudy() {
  const [activeSection, setActiveSection] = useState('problem')
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
    const article = document.getElementById('case-study')
    const onScroll = () => {
      setShowScrollTop(article ? window.scrollY > article.offsetTop + 300 : false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article className="case-study" id="case-study">
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
          <div className="cs-eyebrow">Case Study · 2022–2026</div>
          <h2 className="cs-title">Intapp Design System</h2>
          <p className="cs-subtitle">
            Building a framework-agnostic design system from scratch to unify nine enterprise
            products across five different front-end stacks, scaling it to become the
            foundation for AI-assisted development at Intapp.
          </p>
          <div className="cs-meta-row">
            <div className="cs-meta-item">
              <span className="cs-meta-label">Company</span>
              <span className="cs-meta-value">Intapp</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">My Role</span>
              <span className="cs-meta-value">UI Engineering Manager</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Team</span>
              <span className="cs-meta-value">3 to 7 people</span>
            </div>
            <div className="cs-meta-item">
              <span className="cs-meta-label">Products</span>
              <span className="cs-meta-value">9 enterprise products</span>
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
        <Section id="problem" label="01 / The Problem">
          <h3>Fragmentation at scale</h3>
          <p>
            Intapp is a large enterprise software company whose product suite was built almost entirely
            through acquisition. Each product came with its own visual language, its own front-end
            framework, and its own component library, or lack of one. The result was a portfolio of
            nine products that shared a company name but little else.
          </p>
          <div className="callout-grid">
            <Callout icon="⚡" label="15 button components" sub="across the product suite, all slightly different" />
            <Callout icon="🧩" label="5 front-end stacks" sub="React, Angular, Next.js, React Native, .Net" />
            <Callout icon="🎨" label="No shared tokens" sub="no CSS library, no icon library, no shared system" />
            <Callout icon="📐" label="No governance" sub="a UI kit existed but with no contribution model" />
          </div>
          <p>
            The company was looking to improve product experience but was also undergoing a rebrand (new logos, new colors, new typography) which
            had to roll out across all products simultaneously. A design system wasn't a nice-to-have.
            It was the only viable path.
          </p>
        </Section>

        {/* My Role */}
        <Section id="role" label="02 / My Role">
          <h3>Starting as the bridge between design and engineering</h3>
          <p>
            I joined in December 2022 as the UI engineer on a three-person founding team alongside a
            senior designer and a principal designer. My background in both design and engineering made me the natural bridge
            between the two disciplines from day one.
          </p>
          <ul className="role-list">
            <li>Gathered and translated engineering requirements for the design team</li>
            <li>Audited current product accessibility and advised on compliance</li>
            <li>Created the icon library</li>
            <li>Designed the design token architecture and set up token management tooling</li>
            <li>Built the initial CSS framework: base, typography, layout, utilities, components, mixins</li>
            <li>Served as the primary engineering liaison with product teams during adoption</li>
          </ul>
          <p>
            As the system grew and engineering demand increased, my role expanded to hiring and managing
            two additional engineers, strategy, leadership presentations, and driving cross-product adoption.
          </p>
        </Section>

        {/* Discovery */}
        <Section id="discovery" label="03 / Discovery">
          <h3>Understanding the landscape before building anything</h3>
          <p>
            Before writing a line of code, we ran a structured discovery process to understand what we
            were actually solving for.
          </p>
          <ul className="process-list">
            <li>
              <strong>In-person kickoff workshop</strong>, attended by design, product managers, and
              engineers from DealCloud (the largest product). Whiteboard session to surface pain points,
              identify shared patterns, and understand what problems the system needed to solve.
            </li>
            <li>
              <strong>Product map</strong>: catalogued all nine products, their tech stacks, stakeholders,
              engineering teams, and end users.
            </li>
            <li>
              <strong>Interface audit</strong>: gathered screenshots of all product interfaces to identify
              shared components, divergent patterns, and product-specific bespoke elements.
            </li>
            <li>
              <strong>Component inventory</strong>: audited what existed and what was needed, distinguishing
              which components were genuinely shared vs. too specific to any one product.
            </li>
          </ul>
          <div className="stack-table">
            <div className="stack-table-header">
              <span>Product</span>
              <span>Stack</span>
            </div>
            {products.map((p, i) => (
              <div key={i} className="stack-table-row">
                <span className="stack-product">{p.name}</span>
                <div className="stack-tags">
                  {p.stack.map((s, j) => <span key={j} className="tag tag-sm">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Design Language */}
        <Section id="design-language" label="04 / Design Language">
          <h3>Uniform: a design language built for enterprise clarity</h3>
          <p>
            With discovery complete, we developed the visual design language in parallel with engineering
            infrastructure. This involved gathering brand requirements, creating mood boards, narrowing
            to four explorations, and pressure-testing the finalists with stakeholders and real clients.
          </p>
          <p>
            The final direction was named <strong>Uniform</strong>, chosen deliberately for what it
            represented: uniformity, consistency, clarity across the entire product suite.
          </p>
          <p>
            Color was one of the most complex areas. Enterprise products have semantic color requirements
            that go well beyond brand primaries:
          </p>
          <div className="color-grid">
            {semanticColors.map((c, i) => (
              <div key={i} className="color-chip">
                <div className="color-chip-swatch" style={{ background: c.color }} />
                <div className="color-chip-label">{c.label}</div>
              </div>
            ))}
          </div>
          <p>
            Each semantic category required its own full palette (default, hover, active, disabled,
            subtle background) plus light and dark mode variants. The token architecture was the mechanism
            that made all of this manageable.
          </p>
        </Section>

        {/* Design Tokens */}
        <Section id="tokens" label="05 / Design Tokens">
          <h3>A three-layer token architecture built to scale</h3>
          <p>
            Tokens are the connective tissue between design decisions and implementation. The architecture
            uses three explicit layers (global primitives, semantic decisions, and mode overrides), managed
            in Figma via Token Studio and synced to the code repository through an automated build pipeline.
          </p>

          <div className="arch-diagram">
            <div className="arch-layer">
              <div className="arch-layer-label">Global</div>
              <code>global.json</code>
              <div className="arch-layer-desc">Raw values: full color palettes, spacing scale, type scale</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-layer">
              <div className="arch-layer-label">Semantic</div>
              <code>Uniform.json</code>
              <div className="arch-layer-desc">Named decisions: <code>color-button-primary-surface-default</code></div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-layer">
              <div className="arch-layer-label">Mode</div>
              <code>Light.json · Dark.json</code>
              <div className="arch-layer-desc">Only the overrides needed to switch between light and dark</div>
            </div>
          </div>

          <p>
            The separation between layers was a deliberate architectural decision. By keeping raw values
            in global, semantic decisions in the theme layer, and only overrides in the mode files, the
            diff between light and dark is minimal: no duplication, no drift.
          </p>

          <h4>Build pipeline</h4>
          <p>
            Stage 1 (Token Transformer) resolves all Token Studio aliases and math operations into flat
            JSON. Stage 2 (Style Dictionary) converts that JSON into platform-specific outputs:
          </p>
          <pre><code>{`variables/
├── css/
│   ├── global.scss           # Primitive CSS custom properties
│   └── uniform.scss          # Combined light + dark (USE THIS)
├── scss/
│   ├── uniform-light.scss
│   └── uniform-dark.scss
└── react-native/
    ├── uniform-light.js
    └── uniform-dark.js`}</code></pre>

          <h4>Dark mode without touching component code</h4>
          <p>
            Dark mode is opt-in and implemented entirely in the token layer. A product enables it by
            setting <code>data-mode="dark"</code> on any element, with no component code changes required:
          </p>
          <pre><code>{`:root {
  --color-uniform-ui-surface-primary: #ffffff;
  --color-button-primary-surface-default: #082f5e;
}

:root[data-mode='dark'],
[data-mode='dark'] {
  --color-uniform-ui-surface-primary: #25242a;
  --color-button-primary-surface-default: #4c96f0;
}`}</code></pre>

          <h4>Naming convention</h4>
          <p>
            Tokens follow a self-documenting pattern: <code>category-component-property-state</code>.
            Example: <code>color-button-primary-surface-default</code>. Design and engineering share the
            same vocabulary, with no translation layer needed in handoff.
          </p>
        </Section>

        {/* Architecture */}
        <Section id="architecture" label="06 / Architecture">
          <h3>Framework-agnostic by design</h3>
          <p>
            With nine products across React 17, React 18, Angular, Next.js, React Native, and .Net, no
            single framework could serve as the source of truth. The solution was to build on the
            Web Components standard using Stencil as a compiler, then derive framework-specific packages
            from that single source.
          </p>

          <div className="package-table">
            <div className="package-table-header">
              <span>Package</span>
              <span>Description</span>
            </div>
            {packages.map((p, i) => (
              <div key={i} className="package-table-row">
                <code>{p.name}</code>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>

          <h4>One component, every framework</h4>
          <p>
            Components are authored once in Stencil (TypeScript + JSX) prefixed <code>uds-</code>.
            The Stencil build then compiles to standards-based Web Components, auto-generates React
            wrapper components, and produces SSR-compatible variants for Next.js. A component is written
            and maintained in one place. Consuming teams get it in their native format.
          </p>

          <h4>Branching and release strategy</h4>
          <pre><code>{`feature branch → develop → main
                    ↓          ↓
                  dev1 CDN   qa1 CDN + Artifactory publish`}</code></pre>
          <p>
            A <code>beta</code> branch exists for major version releases, publishing with a{' '}
            <code>@beta</code> dist-tag so product teams can test before stable release. Packages only
            publish when their <code>package.json</code> version is explicitly bumped, giving the team
            precise control over what ships.
          </p>

          <h4>Quality gates</h4>
          <ul className="role-list">
            <li>PropComments test: all <code>@Props</code> must have documented comments and default values</li>
            <li>Full unit test suite</li>
            <li>End-to-end test suite</li>
            <li>Chromatic visual regression testing on every push</li>
            <li>Pre-commit hooks that catch token renames before they reach the repository</li>
          </ul>
        </Section>

        {/* Documentation */}
        <Section id="documentation" label="07 / Documentation">
          <h3>Four audiences, four entry points</h3>
          <p>
            The documentation strategy was built around four distinct audiences: designers, engineers
            consuming the system, engineers contributing to it, and (as the system matured) AI agents
            consuming and surfacing documentation to others.
          </p>
          <div className="doc-grid">
            <div className="doc-card">
              <div className="doc-card-label">Storybook</div>
              <p>Live component reference and primary engineering documentation. Three separate Storybook instances (one per framework package) composed into a single parent deployed to CDN environments.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">ZeroHeight</div>
              <p>Design documentation layer for designers and product managers. Houses usage guidelines, interaction patterns, brand documentation, and links to live Storybook for each component.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Auto-generated API docs</div>
              <p>Stencil generates component API documentation automatically from source, but only if prop comments are present. A PropComments test enforces this at build time. Documentation can never drift from implementation.</p>
            </div>
            <div className="doc-card">
              <div className="doc-card-label">Claude Code primers</div>
              <p>Each <code>@ids</code> package ships a markdown primer that engineers add to their project's <code>CLAUDE.md</code>, giving AI assistants accurate, system-specific context about tokens, APIs, naming conventions, and known gotchas.</p>
            </div>
          </div>
        </Section>

        {/* Adoption */}
        <Section id="adoption" label="08 / Adoption Strategy">
          <h3>Meeting teams where they were</h3>
          <p>
            Resistance to adoption is the most common place design systems stall. Product teams worried
            about roadmap impact, engineering teams were uncertain whether Web Components would work in
            their stacks, and leadership didn't fully understand that the system was technical
            infrastructure, not just a visual makeover.
          </p>
          <p>
            Our strategy was to function as an internal consultancy. We reviewed each team's codebase and
            roadmap and developed a custom adoption plan. There was no single path.
          </p>

          <div className="adoption-steps">
            <div className="adoption-step">
              <div className="adoption-step-num">1</div>
              <div>
                <strong>Icons first</strong>
                <p>Low friction, no conflicting dependencies. Immediate visible improvement.</p>
              </div>
            </div>
            <div className="adoption-step">
              <div className="adoption-step-num">2</div>
              <div>
                <strong>Tokens and CSS styles</strong>
                <p>Map existing variables to design system tokens. Brand alignment with minimal migration cost.</p>
              </div>
            </div>
            <div className="adoption-step">
              <div className="adoption-step-num">3</div>
              <div>
                <strong>Components, one at a time</strong>
                <p>Replace components incrementally as teams have capacity. No big-bang migration required.</p>
              </div>
            </div>
          </div>

          <p>
            For DealCloud, the rebrand deadline drove rapid adoption of the CSS and icon libraries, the
            fastest path to brand alignment ahead of their annual trade conference announcement.
          </p>
          <p>
            For Time and Billstream, design system engineers embedded directly in those teams, installing
            icons, mapping variables, and cleaning up conflicting CSS. This built trust and demonstrated
            value before asking teams to take on component migration work.
          </p>
          <p>
            Trust was also built through consistency: weekly office hours, a dedicated Slack channel for
            developers with package update announcements, Q&A, and demo videos of new work.
          </p>
        </Section>

        {/* AI Scaling */}
        <Section id="ai" label="09 / AI Optimization">
          <h3>When AI started generating UI without knowing the design system existed</h3>
          <p>
            As AI coding tools became embedded in engineering workflows across Intapp, a new problem
            emerged: AI was generating UI that didn't match Intapp standards. Design drift in every sprint,
            caught in QA rather than prevented at authoring time. The design system existed, but AI tools
            just couldn't see it.
          </p>
          <p>
            The response was to treat AI readiness as a first-class system requirement.
          </p>

          <div className="ai-initiative-list">
            <div className="ai-initiative">
              <h4>Claude Code usage primers</h4>
              <p>Each <code>@ids</code> package ships a markdown primer that engineers add to <code>CLAUDE.md</code>. AI assistants then have accurate system context (token formats, naming conventions, component APIs, known gotchas) rather than generic web knowledge.</p>
            </div>
            <div className="ai-initiative">
              <h4>MCP servers for live documentation access</h4>
              <p>ZeroHeight, Figma, and Atlassian (Confluence) were all configured as MCP servers in the IDS developer environment. Engineers working in Claude Code or Cursor had the same documentation context available as a senior design system team member.</p>
            </div>
            <div className="ai-initiative">
              <h4>Claude Code skills for developer workflows</h4>
              <div className="skill-table">
                {skills.map((s, i) => (
                  <div key={i} className="skill-row">
                    <code>{s.cmd}</code>
                    <span>{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ai-initiative">
              <h4>AI Design System Assistant</h4>
              <p>A conversational assistant deployed in Slack and surfaced in ZeroHeight, trained on UDS documentation. Any Intapp employee (designer, PM, or engineer) could ask which component to use or which token applied, and receive an answer grounded in UDS rather than generic web knowledge.</p>
            </div>
            <div className="ai-initiative">
              <h4>Figma MCP integration</h4>
              <p>Connected UDS components, tokens, and patterns directly into the Figma design environment. AI-generated design suggestions in Figma were scoped to UDS, keeping generated designs on-brand automatically and reducing handoff gaps.</p>
            </div>
            <div className="ai-initiative">
              <h4>create-intapp-app CLI</h4>
              <p>A scaffolding CLI that solved the blank-repository problem. Every new project at Intapp had been spending its first sprint recreating infrastructure that already existed.</p>
              <pre><code>{`npx create-intapp-app my-project
# Choose stack: Vanilla JS, React, or Next.js
# UDS tokens, components, TypeScript config,
# CI/CD, and linting pre-wired`}</code></pre>
              <p className="cs-meta-label" style={{marginTop: '1rem'}}>Skills</p>
              <div className="skill-table">
                {cliSkills.map((s, i) => (
                  <div key={i} className="skill-row">
                    <code>{s.cmd}</code>
                    <span>{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="callout-box">
            <strong>The strategic framing</strong>
            <p>
              These initiatives were presented to executive leadership not as tooling improvements but as
              a strategic argument: without shared infrastructure, AI accelerates fragmentation. Every team
              using AI to generate UI without system context was compounding drift. UDS, positioned as the
              shared infrastructure that grounded AI agents in Intapp's standards, reframed the design
              system from a component library into the foundation that made responsible AI-assisted
              development possible at scale.
            </p>
          </div>
        </Section>

        {/* Impact */}
        <Section id="impact" label="10 / Impact">
          <h3>What changed</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-card-icon">🎯</div>
              <div className="impact-card-title">Brand alignment</div>
              <p>Nine previously fragmented products sharing a unified visual language, launched in coordination with the company rebrand.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">⚡</div>
              <div className="impact-card-title">Developer efficiency</div>
              <p>Teams no longer spending sprint time customizing Material UI or PrimeNG to match brand standards. More time on features, less on component plumbing.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">♿</div>
              <div className="impact-card-title">Improved accessibility</div>
              <p>Accessibility baked into shared components: every team inherits compliant behavior without needing to implement it independently.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🤝</div>
              <div className="impact-card-title">Reduced silos</div>
              <p>Shared vocabulary between design, product, and engineering. Closer alignment between disciplines and the beginning of breaking down cross-product communication barriers.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🏢</div>
              <div className="impact-card-title">Client confidence</div>
              <p>Consistent, polished UI across the product suite reinforced Intapp's brand in sales and renewal conversations.</p>
            </div>
            <div className="impact-card">
              <div className="impact-card-icon">🤖</div>
              <div className="impact-card-title">AI-ready infrastructure</div>
              <p>The system became the grounding layer for AI-assisted development, preventing drift at the source rather than catching it in QA.</p>
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

const products = [
  { name: 'DealCloud', stack: ['React 17', 'Custom CSS'] },
  { name: 'Time', stack: ['React 18', 'Material UI'] },
  { name: 'Billstream', stack: ['Angular', 'Prime NG'] },
  { name: 'Compliance', stack: ['Angular', 'Prime NG'] },
  { name: 'Termsheet', stack: ['Angular', 'Material UI'] },
  { name: 'Time & DealCloud Mobile', stack: ['React Native'] },
  { name: 'Collaboration', stack: ['React 18', 'Fluent UI'] },
  { name: 'Celeste', stack: ['Next.js', 'ShadCN', 'Tailwind'] },
  { name: 'Admin UIs', stack: ['Mixed frameworks'] },
]

const semanticColors = [
  { label: 'Success', color: '#1a7f4e' },
  { label: 'Warning', color: '#c47a00' },
  { label: 'Error', color: '#c4272b' },
  { label: 'Information', color: '#1461c4' },
  { label: 'AI', color: '#6b2fa0' },
  { label: 'Neutral', color: '#6b7280' },
  { label: 'Workflow', color: '#0e7fa3' },
]

const packages = [
  { name: '@ids/tokens', desc: 'Design tokens synced from Figma via Token Studio' },
  { name: '@ids/styles', desc: 'SCSS styles for all components' },
  { name: '@ids/web-components', desc: 'Web Components built with Stencil, the source of truth' },
  { name: '@ids/react', desc: 'React 18 components, generated from Stencil via react-output-target' },
  { name: '@ids/react-next', desc: 'React 19 components with SSR support, generated from Stencil' },
]

const cliSkills = [
  { cmd: '/handoff', desc: 'Fetches a designer\'s prototype by Jira ticket or ADO URL, diffs it against the product repo, and writes a HANDOFF_PLAN.md with components to add, new tokens, and (when stacks differ) a translated src/_handoff/App.tsx' },
  { cmd: '/scaffold-ticket', desc: 'Takes a Jira ticket number, reads its acceptance criteria, and scaffolds a create-intapp-app prototype pre-wired with the relevant UDS components and token context' },
]

const skills = [
  { cmd: '/create-component', desc: 'Full workflow: plan API, Stencil, SCSS, sandbox, React, tests, stories, CHANGELOG' },
  { cmd: '/audit-component', desc: 'Reviews a component against all quality requirements, produces a prioritized gap list' },
  { cmd: '/update-changelogs', desc: 'Drafts and inserts CHANGELOG entries for the current branch across all affected packages' },
  { cmd: '/deploy-prep', desc: 'Version bumps, CHANGELOG headers, and versions.md updates before a release' },
  { cmd: '/create-pr', desc: 'Generates PR title and description from commits, assigns reviewers, runs automated review' },
  { cmd: '/review-pr', desc: 'Reviews an open PR against IDS conventions and posts inline comments to Azure DevOps' },
]
