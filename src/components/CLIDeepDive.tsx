import { useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import './UDSDeepDive.css'
import './CLIDeepDive.css'

interface Props {
  onNavigate: (path: string) => void
}

type SlideData = {
  id: string
  section: string
  title: string
  type: 'cover' | 'text' | 'image'
  caption?: string
  body?: ReactNode
  image?: string
  images?: string[]
}

const slides: SlideData[] = [
  {
    id: 'cover',
    section: 'Uniform — Intapp Design System',
    title: 'create-intapp-app',
    caption: 'A scaffolding CLI that closed the design-to-development gap — giving designers a code environment built on the real Intapp Design System, and every project an AI-native foundation from its first commit.',
    type: 'cover',
  },
  {
    id: 'problem-handoff',
    section: '01 / The Problem',
    title: 'Figma ends. Development begins. Something gets lost.',
    type: 'text',
    body: (
      <div className="cli-body">
        <div className="cli-callout">
          Designers write annotations. Engineers interpret them. Code diverges from design. Drift surfaces in QA — expensive, demoralizing, and preventable.
        </div>
        <ul className="cli-feature-list">
          <li>Design specifications are written in Figma. Engineers don&apos;t read them.</li>
          <li>Engineers build from intuition — familiar patterns, not the specified ones.</li>
          <li>AI coding tools generate UI from generic web knowledge, not Intapp&apos;s design system.</li>
          <li>Mismatches surface in design review or QA — long after the decisions that caused them.</li>
          <li>The cycle repeats every sprint, across every product team.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'problem-blank-repo',
    section: '01 / The Problem',
    title: 'Every new project rebuilt the same foundation.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Before create-intapp-app, the first sprint of every new Intapp project was infrastructure — not product work.</p>
        <div className="cli-two-col">
          <div>
            <div className="cli-col-label">Built from scratch, every time</div>
            <ul className="cli-feature-list">
              <li><code>.npmrc</code> config for Intapp&apos;s Artifactory registry</li>
              <li>IDS token and component wiring</li>
              <li>TypeScript, ESLint, and Prettier configuration</li>
              <li>Azure Pipelines CI/CD setup</li>
              <li>CLAUDE.md and AI context files</li>
            </ul>
          </div>
          <div>
            <div className="cli-col-label">The cost</div>
            <ul className="cli-feature-list">
              <li>1–2 sprint weeks per project, per team</li>
              <li>5+ product teams × repeated setup</li>
              <li>Inconsistent results across teams</li>
              <li>AI-generated UI arrived without IDS context</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'discovery-alternatives',
    section: '02 / Discovery',
    title: "The alternatives didn't fit.",
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">The business goal was clear: compress the time from design to production. Every tool evaluated fell short in a different way.</p>
        <div className="cli-feature-list-rich">
          <div className="cli-feature-item">
            <div className="cli-feature-icon">⊙</div>
            <div>
              <strong>Figma Make</strong>
              <p>Generates code from Figma designs, but keeping UDS packages current was a manual, error-prone process. Design system updates didn&apos;t propagate — every sprint risked drift from the real components.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">⊙</div>
            <div>
              <strong>Lovable / Bolt AI</strong>
              <p>Consumer prototyping tools with no proper branching or version control. Enterprise plans were a significant additional cost — and still didn&apos;t connect to Intapp&apos;s Artifactory registry, Azure DevOps infrastructure, or <code>@ids</code> packages.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">⊙</div>
            <div>
              <strong>Claude design mode</strong>
              <p>Generated visually similar UI but wrote its own component code rather than consuming the actual <code>@ids</code> library. The output looked right but had no real connection to UDS — drift was built in from the first generation.</p>
            </div>
          </div>
        </div>
        <div className="cli-callout cli-callout--insight">
          The gap wasn&apos;t a missing tool. It was a missing environment — built on the real design system, with real version control, inside Intapp&apos;s existing infrastructure.
        </div>
      </div>
    ),
  },
  {
    id: 'solution',
    section: '03 / The Solution',
    title: 'The environment was the problem.',
    type: 'text',
    body: (
      <div className="cli-body">
        <div className="cli-callout cli-callout--insight">
          Designers and engineers work in fundamentally different environments — different tools, different component sets, no shared language. create-intapp-app closes that gap by giving designers the same starting point as engineers.
        </div>
        <p className="cli-text">Prototypes built with the CLI use the exact same components that ship in production. No translation layer, no annotations, no interpretation required.</p>
        <div className="cli-code-block">
          <div className="cli-code-label">$ npx @ids/create-intapp-app</div>
          <pre><code>{`✔  Who's working in this repo?  ›  Individual
✔  What do you want to call this project?  ›  cobalt-onboarding
✔  What are you building?  ›  Prototype
✔  Which product?  ›  DealCloud
✔  Framework: React 18  ← recommended

  Scaffolding cobalt-onboarding...  ✔  Done.
  Run: cd cobalt-onboarding && npm install`}</code></pre>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture-interview',
    section: '04 / Architecture',
    title: 'Role-aware scaffolding: the right template, recommended.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">The CLI asks about intent, not technical choices. Four questions. One recommended starting point.</p>
        <div className="cli-phase-list">
          <div className="cli-phase-item">
            <div className="cli-phase-num">1</div>
            <div className="cli-phase-content">
              <strong>Solo or team?</strong>
              <span>Determines project naming convention and whether branch policies are relevant</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">2</div>
            <div className="cli-phase-content">
              <strong>Prototype or app?</strong>
              <span>Prototype → design-tools environment with pattern library. App → production structure with dashboard layout and CI/CD.</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">3</div>
            <div className="cli-phase-content">
              <strong>Which product?</strong>
              <span>Routes to the right Artifactory registry, Azure DevOps project, and framework recommendation</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">4</div>
            <div className="cli-phase-content">
              <strong>Framework</strong>
              <span>Pre-selected to the recommendation — Vanilla for designers, React 18 for DealCloud/Time, Next.js for Celeste. Always overrideable.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture-templates',
    section: '04 / Architecture',
    title: 'Four templates. Every one pre-wired.',
    type: 'text',
    body: (
      <div className="cli-body">
        <div className="cli-template-grid">
          <div className="cli-template-row">
            <div className="cli-template-name">
              <strong>Vanilla JS</strong>
              <code>@ids/web-components</code>
            </div>
            <span className="cli-template-desc">HTML + IDS web components. No framework overhead. Best for designers, quick concepts, and Angular-adjacent prototypes.</span>
          </div>
          <div className="cli-template-row">
            <div className="cli-template-name">
              <strong>React 18</strong>
              <code>@ids/react</code>
            </div>
            <span className="cli-template-desc">Vite + React 18. The default for DealCloud, Time, and most Intapp products — broadest library compatibility.</span>
          </div>
          <div className="cli-template-row">
            <div className="cli-template-name">
              <strong>React 19</strong>
              <code>@ids/react-next</code>
            </div>
            <span className="cli-template-desc">Vite + React 19 with Actions and improved hooks. For greenfield projects with no legacy library constraints.</span>
          </div>
          <div className="cli-template-row">
            <div className="cli-template-name">
              <strong>Next.js</strong>
              <code>@ids/react-next</code>
            </div>
            <span className="cli-template-desc">App Router + SSR + API routes. For content-heavy sites or full-stack dashboards. Deploys to Azure App Service.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture-box',
    section: '04 / Architecture',
    title: "What's in the box.",
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Every scaffold ships with the full stack — nothing to configure, nothing to look up.</p>
        <div className="cli-two-col">
          <div>
            <div className="cli-col-label">Infrastructure</div>
            <ul className="cli-feature-list">
              <li>IDS components, tokens, and icons</li>
              <li>Artifactory <code>.npmrc</code> (pre-filled per product)</li>
              <li>Azure Pipelines CI/CD</li>
              <li>ESLint + Prettier + TypeScript</li>
              <li>Working welcome page using IDS components</li>
            </ul>
          </div>
          <div>
            <div className="cli-col-label">AI context</div>
            <ul className="cli-feature-list">
              <li><code>CLAUDE.md</code> — full IDS primer for Claude Code</li>
              <li>Cursor and GitHub Copilot instruction files</li>
              <li>Claude Code skills for component building</li>
              <li>PreToolUse hooks that enforce IDS at authoring time</li>
              <li>Behavioral steering doc, auto-updated on upgrade</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture-manifest',
    section: '04 / Architecture',
    title: 'Your code is yours. Shared files stay current.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Every template ships a <code>shared.manifest.json</code> that draws a clear line between files the CLI manages and files that belong to you.</p>
        <div className="cli-two-col">
          <div>
            <div className="cli-col-label">CLI-managed (updated on upgrade)</div>
            <ul className="cli-feature-list">
              <li>ESLint and Stylelint config</li>
              <li><code>azure-pipelines.yml</code></li>
              <li>Claude Code hooks and skills</li>
              <li>Behavioral steering doc</li>
              <li>Setup and helper scripts</li>
            </ul>
          </div>
          <div>
            <div className="cli-col-label">Always yours (never touched)</div>
            <ul className="cli-feature-list">
              <li><code>src/</code> — all components and pages</li>
              <li><code>App.tsx</code> / <code>main.js</code></li>
              <li><code>CLAUDE.md</code> — yours to extend</li>
              <li>Your prototype screens and patterns</li>
            </ul>
          </div>
        </div>
        <div className="cli-callout">
          This boundary is what makes <code>upgrade</code> safe to run at any time — and keeps shared infrastructure current without touching product code.
        </div>
      </div>
    ),
  },
  {
    id: 'upgrade',
    section: '05 / Demo',
    title: "Templates evolve. Projects don't fall behind.",
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">The upgrade command pulls the latest shared assets — lint rules, Claude hooks, CI/CD, behavioral guides — into any existing project.</p>
        <div className="cli-code-block">
          <div className="cli-code-label">In-place upgrade</div>
          <pre><code>{`npx @ids/create-intapp-app upgrade

  Shows changelog since your scaffold version
  Updates managed files — asks before overwriting edits
  Your code is never touched

npx @ids/create-intapp-app upgrade --dry-run
  Preview changes without writing anything

npx @ids/create-intapp-app upgrade --adopt
  Install the 2.0 nav harness (pre-2.0 prototypes only)
  Sidebar, pattern gallery, "Your pages" — without touching your screens`}</code></pre>
        </div>
        <p className="cli-text">Conflict detection is hash-based: the CLI records file hashes at scaffold time. If you&apos;ve edited a managed file, it&apos;s flagged and kept — never silently overwritten.</p>
      </div>
    ),
  },
  {
    id: 'pattern-library',
    section: '05 / Demo',
    title: '2.0: A design environment, not just a blank page.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Version 2.0 turned the scaffolded app into a full prototype environment — with navigation, patterns, and tooling built in.</p>
        <div className="cli-feature-list-rich">
          <div className="cli-feature-item">
            <div className="cli-feature-icon">▤</div>
            <div>
              <strong>Auto-generated sidebar</strong>
              <p>Pages register with exported <code>meta</code>. The sidebar builds itself — add a file, it appears in the nav automatically.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">⬡</div>
            <div>
              <strong>Pattern library</strong>
              <p>IDS patterns — Dashboard, Form, Blank, and more — browsable and runnable. Updates delivered via 3-way merge so designer edits are never overwritten.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">⌗</div>
            <div>
              <strong>Your pages</strong>
              <p>Designer-authored screens live separately — never offered upstream pattern updates. Your screens stay yours.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">↯</div>
            <div>
              <strong>Change history</strong>
              <p><code>.intapp/history.md</code> — a per-project log Claude updates on every meaningful change. Context for debugging without interrupting the designer.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'ai-native',
    section: '06 / AI Native',
    title: 'AI context, baked in from the first commit.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Every scaffolded project is AI-ready by default — not as an afterthought, but as a first-class system requirement.</p>
        <div className="cli-feature-list-rich">
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◎</div>
            <div>
              <strong>CLAUDE.md — full IDS primer</strong>
              <p>Component APIs, token formats, icon names, naming conventions, known gotchas. AI reads Intapp&apos;s system, not generic web docs.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◈</div>
            <div>
              <strong>Claude Code skills</strong>
              <p><code>/build-component-options</code>, <code>/manage-patterns</code>, <code>/git-help</code> — structured workflows replacing open-ended AI sessions. One targeted pass instead of eight back-and-forth exchanges.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◉</div>
            <div>
              <strong>PreToolUse enforcement</strong>
              <p>Hooks intercept every file write and scan for IDS violations — raw HTML elements, hardcoded colors, invalid icon names. Agents self-correct before code lands on disk.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">○</div>
            <div>
              <strong>Behavioral steering</strong>
              <p><code>.claude/using-create-intapp-app.md</code> — a trusted guide covering setup, deploy, git, sandbox handling, and component-building. Auto-updated on every <code>upgrade</code>.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'workflow-loop',
    section: '07 / Workflow',
    title: 'PM to designer to engineer — the full loop.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">The CLI connects every stage of the design-to-production pipeline — from ticket to shipped feature — without handoff gaps or manual translation.</p>
        <div className="cli-phase-list">
          <div className="cli-phase-item">
            <div className="cli-phase-num">1</div>
            <div className="cli-phase-content">
              <strong>PM writes the ticket</strong>
              <span>A Jira ticket (DES-XXXX) captures the requirements and acceptance criteria.</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">2</div>
            <div className="cli-phase-content">
              <strong>Designer runs <code>/ticket DES-XXXX</code></strong>
              <span>Claude pulls the ticket requirements into the scaffolded prototype and guides building to spec — using real <code>@ids</code> components, not generic HTML.</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">3</div>
            <div className="cli-phase-content">
              <strong>Prototype pushed to Azure DevOps</strong>
              <span>Designer pushes to Playground ADO and pastes the prototype URL into the Jira ticket. No export, no screenshots, no Figma handoff document.</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">4</div>
            <div className="cli-phase-content">
              <strong>Engineer runs <code>/handoff DES-XXXX</code></strong>
              <span>Claude fetches the prototype source from ADO, scans the product codebase, and writes a <code>HANDOFF_PLAN.md</code> — no clone, no credential setup beyond what the engineer already has.</span>
            </div>
          </div>
          <div className="cli-phase-item">
            <div className="cli-phase-num">5</div>
            <div className="cli-phase-content">
              <strong>Implement, PR, merge</strong>
              <span>Engineer follows the plan. <code>/create-pr</code> opens the pull request in ADO. The loop closes with production code that matches the prototype.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'workflow-skills',
    section: '07 / Workflow',
    title: 'Two skills. The handoff is automatic.',
    type: 'text',
    body: (
      <div className="cli-body">
        <p className="cli-lead">Each side of the handoff has a dedicated skill — one for the designer building to spec, one for the engineer implementing it.</p>
        <div className="cli-feature-list-rich">
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◎</div>
            <div>
              <strong><code>/ticket</code> — designer side</strong>
              <p>Given a Jira ticket ID, Claude pulls the acceptance criteria and requirements into the prototype session. Guides building each spec point using the real <code>@ids</code> component library — no guessing what the PM meant, no generic web code.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◈</div>
            <div>
              <strong><code>/handoff</code> — engineer side</strong>
              <p>Given a ticket ID or prototype URL, Claude fetches the prototype source from Azure DevOps via the engineer&apos;s existing <code>az</code> session — no local clone required. Scans the product codebase, compares component usage, and writes a <code>HANDOFF_PLAN.md</code> listing: acceptance criteria from Jira, components to add, new tokens introduced, and non-UDS code worth reviewing.</p>
            </div>
          </div>
          <div className="cli-feature-item">
            <div className="cli-feature-icon">◉</div>
            <div>
              <strong>Framework translation, automatic</strong>
              <p>When the prototype and product use different frameworks (e.g. Vanilla → React 19), <code>/handoff</code> also emits a translated <code>src/_handoff/App.tsx</code> — components in the engineer&apos;s exact syntax, derived from the installed <code>@ids</code> package types at runtime.</p>
            </div>
          </div>
        </div>
        <div className="cli-callout cli-callout--insight">
          Two repos. No overlap on disk. The engineer never needs a checkout of the designer&apos;s prototype to get started.
        </div>
      </div>
    ),
  },
  {
    id: 'impact',
    section: '08 / Impact',
    title: 'What it changed.',
    type: 'text',
    body: (
      <div className="cli-body">
        <div className="cli-impact-grid">
          <div className="cli-impact-card">
            <div className="cli-impact-title">For designers</div>
            <p>Prototype in the real component environment. Figma handoffs that previously needed annotation and interpretation are replaced by running code using production components.</p>
          </div>
          <div className="cli-impact-card">
            <div className="cli-impact-title">For engineers</div>
            <p>New projects start from a working, fully-configured foundation. Zero sprint time rebuilding infrastructure that already exists across every other team.</p>
          </div>
          <div className="cli-impact-card">
            <div className="cli-impact-title">For AI</div>
            <p>Every project gives AI agents system-accurate context from day one. IDS-native code from the first generation — drift prevented at authoring time, not caught in QA.</p>
          </div>
          <div className="cli-impact-card cli-impact-card--wide">
            <div className="cli-impact-title">Projected AI token reduction</div>
            <p>CLI scaffolding eliminates 3–5 setup sessions per project that previously consumed <strong>40,000–80,000 tokens each</strong> in back-and-forth iteration — one of three compounding sources contributing to a projected <strong>60–70% reduction</strong> in AI token consumption per UI-related engineering task across 5+ product teams.</p>
          </div>
        </div>
      </div>
    ),
  },
]

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.25 0.75C11.45 0.75 11.639 0.828 11.78 0.97C12.072 1.262 12.072 1.738 11.78 2.031L2.56 11.251H23.25C23.664 11.25 24 11.586 24 12C24 12.414 23.664 12.75 23.25 12.75H2.561L11.781 21.97C11.922 22.111 12 22.3 12 22.5C12 22.7 11.922 22.889 11.78 23.03C11.639 23.172 11.45 23.25 11.25 23.25C11.05 23.25 10.861 23.172 10.72 23.03L0.22 12.53C0.15 12.46 0.095 12.378 0.057 12.285C0.054 12.277 0.05 12.268 0.047 12.259C0.016 12.178 0 12.089 0 12C0 11.913 0.016 11.826 0.047 11.742C0.049 11.736 0.051 11.731 0.053 11.726C0.095 11.622 0.151 11.539 0.221 11.469L10.72 0.97C10.861 0.828 11.05 0.75 11.25 0.75Z" fill="currentColor"/>
  </svg>
)

const ForwardArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.75 23.25C12.55 23.25 12.361 23.172 12.22 23.03C11.928 22.738 11.928 22.262 12.22 21.969L21.44 12.749H0.75C0.336 12.75 0 12.414 0 12C0 11.586 0.336 11.25 0.75 11.25H21.439L12.219 2.03C12.078 1.889 12 1.7 12 1.5C12 1.3 12.078 1.111 12.22 0.97C12.361 0.828 12.55 0.75 12.75 0.75C12.95 0.75 13.139 0.828 13.28 0.97L23.78 11.47C23.85 11.54 23.905 11.622 23.943 11.715C23.946 11.723 23.95 11.732 23.953 11.741C23.984 11.822 24 11.911 24 12C24 12.087 23.984 12.174 23.953 12.258C23.951 12.264 23.949 12.269 23.947 12.274C23.905 12.378 23.849 12.461 23.779 12.531L13.28 23.03C13.139 23.172 12.95 23.25 12.75 23.25Z" fill="currentColor"/>
  </svg>
)

export default function CLIDeepDive({ onNavigate }: Props) {
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
          <BackArrow />
          Uniform case study
        </a>
        <span className="uds-deck-page-title">create-intapp-app — CLI deep dive</span>
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
                <div className="uds-slide-eyebrow">{slide.section}</div>
                <h1 className="uds-slide-cover-title">{slide.title}</h1>
                <p className="uds-slide-cover-sub">{slide.caption}</p>
                <button className="uds-slide-cover-cta" onClick={next}>
                  Begin
                  <ForwardArrow />
                </button>
              </div>
            </div>
          ) : slide.type === 'text' ? (
            <div className="uds-slide uds-slide--text">
              <div className="uds-slide-header">
                <div className="uds-slide-section">{slide.section}</div>
                <h2 className="uds-slide-title">{slide.title}</h2>
              </div>
              {slide.body}
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
                  <img src={slide.image} alt={slide.title} className="uds-slide-img" loading="lazy" />
                </div>
              ) : null}
              {slide.caption && <p className="uds-slide-caption">{slide.caption}</p>}
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
          <BackArrow />
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
          <ForwardArrow />
        </button>
      </div>

      <div className="uds-deck-hint" aria-hidden="true">
        Use ← → arrow keys to navigate
      </div>
    </div>
  )
}
