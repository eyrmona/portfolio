import './Resume.css'

const summary = `Design systems leader with 10+ years at the intersection of design and engineering. Built Intapp's Uniform Design System from zero to company-wide infrastructure: a multi-framework component library, semantic design token architecture, AI-powered developer tooling, and governance adopted by 5+ product teams. As Engineering Manager, grew and developed a UI engineering team, authored the career ladder, and partnered with executive leadership to establish the design system as strategic company infrastructure. Equally fluent in Figma and TypeScript, in design reviews and executive roadmap presentations, and always the bridge between beautiful design and bulletproof code.`

const expertise = [
  'Design System Strategy', 'Team Leadership & Development', 'Component Architecture',
  'Design Tokens', 'Design-to-Code', 'Design System Governance', 'Multi-Framework Libraries',
  'Accessibility / WCAG 2.1', 'AI-Powered Tooling', 'Executive Stakeholder Alignment',
  'Cross-Functional Leadership', 'Mono-repo Architecture', 'Agile / Scrum', 'Career Ladder Development',
]

const experience = [
  {
    title: 'Design System Engineering Manager',
    company: 'Intapp',
    dates: 'July 2024 – June 2026',
    bullets: [
      "Built and scaled Intapp's Uniform Design System engineering team; hired and managed 2 UI Engineers, authored the 5-level UI Engineering career ladder (Associate through Principal), and established the team's operating model, roadmap process, and design system governance framework",
      'Drove design system adoption across 5+ product engineering teams and set integration playbook for acquired products, positioning UDS as the default infrastructure for every new product at Intapp',
      'Presented executive investment case for UDS to senior leadership, framing the design system as AI-ready, org-wide shared infrastructure, and securing expanded roadmap and headcount',
      'Led 3 AI-driven strategic initiatives: AI Design System Assistant (Slack/ZeroHeight), Figma MCP for real-time design-to-code alignment, and create-intapp-app CLI for instant UDS-preconfigured project scaffolding',
      'Developed and promoted 2 direct reports to Senior UI Engineer in February 2026 through structured career development, mentorship, and documented promotion cases',
    ],
  },
  {
    title: 'Lead UI Engineer',
    company: 'Intapp',
    dates: '2022 – 2025',
    bullets: [
      "Architected Intapp's Uniform Design System from the ground up: a production-ready component library published across React, Angular, Next.js, and Web Components (StencilJS) from a single mono-repo",
      'Delivered 30+ production components built to WCAG 2.1 accessibility standards, adopted by teams including Time, Activator, and Billstream',
      'Designed and implemented semantic design token architecture enabling dark/light mode, white-labeling, and rapid rebranding applied across all Intapp products',
      'Integrated ZeroHeight and Storybook into a unified documentation ecosystem for seamless design-to-code handoff, keeping design guidelines and live component references in sync',
      'Established Artifactory private registry and CI/CD pipeline as the single versioned source for all UDS packages; co-reduced CI test times from 12+ minutes to under 4 minutes',
    ],
  },
  {
    title: 'Freelance Design Systems Consultant',
    company: 'AppHammer | Artifact Engine',
    dates: 'Jan 2024 – June 2025',
    bullets: [
      'Designed and built a complete design system for Artifact Engine, an AI-driven content management system for agencies: design tokens, a Figma component library, and a Tailwind CSS configuration serving as a unified source of truth across the product',
      'Architected a Figma-to-production pipeline that reads token values directly from Figma files and applies them at build time, eliminating manual design handoff and keeping design and production permanently in sync',
      'Built a schema-driven page rendering system using Django and vanilla JavaScript/HTML: predetermined content blocks and a content schema drive dynamic page output without a component framework dependency, keeping the stack lightweight and portable',
      'Demonstrated a framework-agnostic approach to design systems, proving that a token-based system can power any frontend stack, not just React or Next.js ecosystems',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Syracuse University – Marketing & Communications',
    dates: 'Jan 2020 – 2022',
    bullets: [
      "Initiated and built the University's design system: audited 15+ web properties, defined design tokens and a shared CSS framework, and published distributed NPM component packages for cross-team reuse",
      'Led cross-functional planning with strategy, UX, and dev-ops teams to establish MVP scope, API contracts, and iterative release cadence for new platform initiatives',
      'Developed CMS platforms using Django/Wagtail (Python) and Umbraco (C#); enforced WCAG accessibility compliance across all deployments',
    ],
  },
  {
    title: 'Front End Engineer',
    company: 'TCGplayer.com – Seller Services',
    dates: '2018 – Jan 2020',
    bullets: [
      'Built front-end of e-commerce kiosk and point-of-sale applications using VueJs and Umbraco CMS in an Agile environment',
      'Collaborated with product owners and UX designers on feature requirements, user testing, and release planning',
    ],
  },
  {
    title: 'Front End Developer',
    company: 'TCGplayer.com – Marketing',
    dates: '2013 – 2018',
    bullets: [
      'Built and maintained Umbraco CMS platform powering all marketing content and campaign initiatives; collaborated with creative teams on visual design, branding, and social ad campaigns',
      'Designed and implemented email marketing templates and automated drip campaign workflows',
    ],
  },
]

const skills = [
  { label: 'Design Systems', items: 'Component architecture, design tokens, Storybook, ZeroHeight, Figma, Adobe XD, Artifactory, design system governance' },
  { label: 'Languages & Frameworks', items: 'TypeScript, JavaScript, React, Angular, Next.js, Web Components / StencilJS, VueJs, HTML, CSS/SCSS, Python (Django), C# (Razor)' },
  { label: 'Tooling & Infrastructure', items: 'NPM, Webpack, Vite, monorepo (changesets), CI/CD pipelines, Docker, GitHub/GitLab, Jira/Confluence' },
  { label: 'AI & Emerging', items: 'MCP integrations, AI Design System Assistant, Figma MCP, Claude API, design-to-code tooling' },
  { label: 'Leadership', items: 'Team building, career ladder development, promotion planning, executive stakeholder alignment, design system strategy and roadmap, cross-functional collaboration' },
  { label: 'Practices', items: 'Accessibility (WCAG 2.1), QA testing, wireframing, interactive prototyping, visual design, Agile/Scrum' },
]

const education = [
  { degree: 'Design Studies, Branding & Visual Communications', school: 'Courses audited at Syracuse University' },
  { degree: 'Visual Design & Communications, A.A.S.', school: 'Cazenovia College' },
]

const certifications = [
  { name: 'Smart Interface Design Patterns', detail: 'Smashing Magazine, 2022' },
  { name: 'Umbraco Codegarden', detail: 'Odense, Denmark, 2019' },
  { name: 'Umbraco Certified Developer', detail: '2017' },
]

export default function Resume() {
  return (
    <article className="resume-page" id="resume">
      <div className="resume-container">

        <header className="resume-header">
          <div className="resume-eyebrow">Résumé</div>
          <h1 className="resume-name">Aimee Maroney</h1>
          <p className="resume-contact">
            <a href="mailto:aimee.maroney@gmail.com">aimee.maroney@gmail.com</a>
            <span className="resume-contact-sep" aria-hidden="true">&middot;</span>
            <a href="https://linkedin.com/in/aimeemaroney" target="_blank" rel="noreferrer">linkedin.com/in/aimeemaroney</a>
          </p>
          <p className="resume-summary">{summary}</p>
          <div className="resume-downloads">
            <a
              className="btn-primary"
              href="/resume/AimeeMaroney_Resume_2026.pdf"
              download="AimeeMaroney_Resume_2026.pdf"
            >
              Download PDF
            </a>
            <a
              className="btn-secondary"
              href="/resume/AimeeMaroney_Resume_2026.docx"
              download="AimeeMaroney_Resume_2026.docx"
            >
              Download Word
            </a>
          </div>
        </header>

        <section className="resume-section">
          <h2 className="resume-section-title">Areas of Expertise</h2>
          <div className="resume-tags">
            {expertise.map(tag => <span key={tag} className="resume-tag">{tag}</span>)}
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          <div className="resume-jobs">
            {experience.map(job => (
              <div className="resume-job" key={job.title + job.dates}>
                <div className="resume-job-header">
                  <div>
                    <h3 className="resume-job-title">{job.title}</h3>
                    <div className="resume-job-company">{job.company}</div>
                  </div>
                  <span className="resume-job-dates">{job.dates}</span>
                </div>
                <ul className="resume-bullets">
                  {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <dl className="resume-skills">
            {skills.map(g => (
              <div className="resume-skill-row" key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <ul className="resume-simple-list">
            {education.map(e => (
              <li key={e.degree}>
                <span className="resume-simple-primary">{e.degree}</span>
                <span className="resume-simple-secondary">{e.school}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">Certifications & Professional Development</h2>
          <ul className="resume-simple-list">
            {certifications.map(c => (
              <li key={c.name}>
                <span className="resume-simple-primary">{c.name}</span>
                <span className="resume-simple-secondary">{c.detail}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </article>
  )
}
