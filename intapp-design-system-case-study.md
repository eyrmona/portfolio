# Design System Case Study
Intapp

## Background
* I was hired in December 2022
* Company's initial goal to improve visual design and user experience of their products. The company was also in the process to rebranding - new logos, colors, typography

## The Problem
* The company is a large corporation that has a large suite of enterprise products - all of which were acquired products
* Each product either retained their previous ownership visual language or had older design decisions
* Each product had it's own separate front end frameworks, such as React, Next,js, Angular, and .Net
* No shared CSS library, no shared icon library, no shared component library
* A UI kit did exist but maintenance and contribution was shared by product design team, but with no governance model or requirements.
* Large products such as DealCloud had large amounts of custom code that was difficult to update or change.
* Products also had redundant code - 15 different button components, a different header component for each page, but all similar visually.

## The Team
The initial team was formed in December 2022
* Senior designer
* Principal designer
* UI Engineer (myself)

## My Initial Role
* As I had a background in design my initial role was to assist with design language creation and provide feedback
* I served as the initial bridge between design and engineering. Helping to gather and translate engineering requirements to the designers
* Audit current product accessibility and advise on accessibility compliance
* Creation of icon library
* Creation of design token architecture and design token management
* Initial creation of CSS framework: base, typography, layout, utilities, components, mixins

## The Stakeholders
* Product design director and product VP
* Product Managers
* Engineering teams


## First steps
* New design system team in-person kickoff meeting and workshop
  * Attended by the design team members, product managers and engineer from largest product DealCloud
  * Whiteboard session identifying pain points, system components, patterns, user experience issues
* Develop a product map
  * What products are there
  * What are the products' tech stacks
  * Who manages those products and the primary stakeholders
  * Who are the engineers on those products
  * Who are the users of those products
* Gather examples of all the product interfaces
* Identify common components, patterns, behaviors between products
* Audit components used and needed
* Identify which components and patterns were too bespoke or specific to any particular product
* Establish list of core components and patterns for initial development

## The Products & Their tech stacks
* DealCloud - React 17, custom CSS
* Time - React 18, Material UI, custom CSS
* Billstream - Angular, Prime NG
* Compliance - Angular, custom CSS, Prime NG
* Termsheet - Angular, Material UI
* Time & DealCloud Mobile, React Native
* Collaboration - React 18, Fluent UI
* Celeste - Next.js, ShadCn, Tailwind
* Admin UI's ( various microservices for all products. Mix of frameworks)

## The Design Language
After first initial steps, it was on to develop design language.
* Gather brand requirements
  * Colors
  * Typography
  * Logos
* Create mood boards
  * Explore with inspiration and gathered images, define how Intapp's brand presence could look as an interface
* Narrowed down design language exlorations into 4 top choices
* Presented choices to design team and stakeholders for final choice
* User tested design language with clients
* Final design dubbed Uniform - for uniformity, consistency, clarity
* Determine colors needed for semantic purposes
  * Success
  * Warning
  * Error
  * Information
  * AI
  * Neutral or pending
  * Time or workflow based indicators
* Generate core color palettes
  * Primary, secondary, tertiary brand colors
  * Neutral colors for UI surfaces
  * Text colors
  * Selection state colors
  * Notification and alert colors
  * AI colors
* Separate color colors into tints and shades

## Design Tokens

After core palette for design language was determinted and initial exploration with design language applied to components, a token architecture was created using Token Studio and Style Dictionary. Tokens were synced to Figma variables as well as code repository.

### Token Architecture

Tokens are managed in Figma by the design team using the Token Studio plugin and synced to a dedicated `design` branch in the IDS repository. The build pipeline has two stages.

**Source structure (three layers)**

```
themes/
├── global.json          # Primitive tokens: color palettes, spacing scale, sizing
├── Theme/
│   └── Uniform.json     # Semantic tokens: component and UI-specific decisions
├── Mode/
│   ├── Light.json       # Light mode color overrides
│   └── Dark.json        # Dark mode color overrides
├── $metadata.json       # Token set ordering
└── $themes.json         # Theme composition config
```

The separation into global, theme, and mode layers was a deliberate architectural decision. Global holds raw values (e.g., a full color palette). Theme/Uniform holds semantic decisions that reference those values (e.g., `color-button-primary-surface-default`). Mode files only contain the overrides needed to switch between light and dark, keeping the diff minimal and preventing duplication.

**Build pipeline**

Stage 1 — Token Transformer: resolves all Token Studio aliases and math operations, outputting flat JSON files Style Dictionary can consume:

```
dist/
├── global.json
├── uniform-light.json
├── uniform-light-react-native.json
├── uniform-dark.json
└── uniform-dark-react-native.json
```

Stage 2 — Style Dictionary (custom `build.cjs` config): converts the JSON into platform-specific variables across four output formats:

```
variables/
├── css/
│   ├── global.scss           # Primitive CSS custom properties
│   ├── uniform.scss          # Combined light + dark (USE THIS)
│   ├── uniform-light.scss
│   └── uniform-dark.scss
├── scss/
│   ├── global.scss
│   ├── uniform-light.scss
│   └── uniform-dark.scss
└── react-native/
    ├── global.js
    ├── uniform-light.js
    └── uniform-dark.js
```

**Dark mode implementation**

Dark mode is opt-in, not automatic. The `uniform.scss` file contains both modes in a single import:

```scss
/* Light mode — default */
:root {
  --color-uniform-ui-surface-primary: #ffffff;
  --color-button-primary-surface-default: #082f5e;
  /* ...1783 tokens */
}

/* Dark mode — activated via attribute */
:root[data-mode='dark'],
[data-mode='dark'] {
  --color-uniform-ui-surface-primary: #25242a;
  --color-button-primary-surface-default: #4c96f0;
  /* ...1783 tokens */
}
```

Products enable dark mode by setting `data-mode="dark"` on the `<html>` element or any scoped container, giving teams full control over rollout. This approach means dark mode required no changes to component code — only the token layer switches.

**Token naming convention**

Tokens follow a semantic naming pattern: `category-component-property-state`. For example: `color-button-primary-surface-default`. This makes tokens self-documenting and allows design and engineering to communicate about decisions using the same vocabulary.

**Pre-commit validation**

A pre-commit hook runs the `UnmatchedTokens` test in the styles package whenever token files change, catching any token renames that would break existing style references before they reach the repository.

## Architectural strategy
Bases on the product landscape at Intapp, it was determined that a framework agnostic approach was the best way to build a design system to meet the needs of all products at Intapp.

### System Architecture

Given the breadth of frameworks in use across Intapp products (React 17, React 18, React 19, Angular, Next.js, React Native, and various .Net admin UIs), the system needed to be framework-agnostic at its core. The solution was to build on the Web Components standard using Stencil as a compiler, then derive framework-specific packages from that single source of truth.

**Monorepo structure**

The entire system lives in a single monorepo (the IDS repo) organized as five independently versioned and published npm packages:

| Package | Description |
|---|---|
| `@ids/tokens` | Design tokens synced from Figma via Token Studio |
| `@ids/styles` | SCSS styles for all components |
| `@ids/web-components` | Web components built with Stencil (the source of truth) |
| `@ids/react` | React 18 components, generated from Stencil via `react-output-target` |
| `@ids/react-next` | React 19 components with SSR support, generated from Stencil |

All packages are published to a private Artifactory registry (`design_system-npm-prod-local`), scoped under `@ids`. Product teams install only the packages they need for their stack.

**Component authoring pipeline**

Components are authored once in Stencil (TypeScript + JSX), prefixed `uds-` (e.g., `uds-button`). The Stencil build then:

1. Compiles to standards-based Web Components (Custom Elements v1)
2. Auto-generates React wrapper components via `react-output-target`
3. Runs a post-build script to reorganize generated files, generate type definitions, apply default prop values, and produce SSR-compatible server/client variants for `@ids/react-next`

This means a component is written and maintained in one place, and consuming teams get it in the format native to their stack with no extra work from the design system team.

**Styling layer**

Component styles live in `@ids/styles` as SCSS modules, separate from the component logic. Styles reference tokens via CSS custom properties (e.g., `var(--color-button-primary-surface-default)`), which means the entire visual layer can be swapped by changing the token output without touching component code. The styles package re-exports the token variables from `@ids/tokens`, so consumers only need to import styles.

**Branching and release strategy**

```
feature branch → develop → main
                    ↓          ↓
                  dev1 CDN   qa1 CDN + Artifactory publish
```

A `beta` branch exists for major version releases (e.g., 2.x to 3.x), publishing packages with a `@beta` dist-tag so product teams can test before stable release. Packages only publish when their `package.json` version is explicitly bumped, giving the team precise control over what ships.

**Quality gates**

Every component build runs:
- PropComments test (all `@Props` must have documented comments and default values)
- Full unit test suite
- End-to-end test suite
- Chromatic visual regression testing (skippable for doc-only changes)

Pre-commit and pre-push hooks enforce CHANGELOG updates and catch token renames that would break the styles package before any code reaches the repository.

### Documentation

The documentation strategy was built around four audiences: designers, engineers consuming the system, engineers contributing to it, and AI agents consuming and surfacing documentation to others. Each needed a different entry point.

**Storybook**

Storybook serves as the live component reference and is the primary engineering documentation surface. The system runs three separate Storybook instances, one per framework package, composed into a single parent Storybook:

| Instance | Package | Port |
|---|---|---|
| Web Components (Stencil) | `@ids/web-components` | 6008 |
| React 18 | `@ids/react` | 6007 |
| React 19 / Next.js | `@ids/react-next` | 6009 |

The parent Storybook aggregates all three and is deployed to CDN environments via the automated pipeline:
- **DEV** (`develop` branch): `dataui.cdn.dev1.intapp.com/ids/storybook/latest`
- **BETA** (`beta` branch): `dataui.cdn.dev1.intapp.com/ids/storybook/beta`
- **PRODUCTION** (`main` branch): `dataui.cdn.qa1.intapp.com/ids/storybook/latest`

Storybook is also used for automated visual regression testing via Chromatic, which runs on every push and compares component renders against approved baselines. This catches unintended visual regressions before they reach production.

**ZeroHeight**

ZeroHeight is the design documentation layer, aimed primarily at designers and product managers. It houses:
- Design guidelines and usage principles for each component
- Interaction patterns and behavioral specifications
- Brand and visual language documentation
- Links to the corresponding live Storybook for each component

ZeroHeight is kept in sync with Storybook so that design guidance and live code references point to the same source of truth. The ZeroHeight API is also integrated as an MCP server in the IDS developer environment, allowing engineers to query design documentation without leaving their IDE.

**Stencil automatic component documentation**

Stencil generates component API documentation automatically from source code, but only if prop comments are present and correctly formatted. This is enforced by a `PropComments` test that runs as the first step of every build. Any `@Prop` without a preceding multi-line comment, or without its default value documented, fails the build. This means documentation can never drift from implementation: the build won't pass if they're out of sync.

The post-build script also generates a `.tsx` file for each component that includes typed prop interfaces with fallback default values, making the component API self-documenting for consuming engineers.

**Claude Code integration**

As the system matured, each `@ids` package began shipping its own Claude Code usage primer: a markdown file that could be added to a project's `CLAUDE.md`, giving AI assistants accurate context about token formats, component APIs, naming conventions, and known gotchas. Engineers could then ask Claude questions like "what token should I use for a surface background color?" and receive accurate, system-specific answers rather than generic advice.

Within the IDS repo itself, a suite of Claude Code skills automates the most repetitive documentation and process tasks:

| Skill | What it automates |
|---|---|
| `/create-component` | Full component creation workflow: plan API, Stencil, SCSS, sandbox, React, tests, stories, CHANGELOG |
| `/audit-component` | Reviews a component against all quality requirements and produces a prioritized gap list |
| `/update-changelogs` | Drafts and inserts CHANGELOG entries for the current branch across all affected packages |
| `/deploy-prep` | Version bumps, CHANGELOG header conversions, and versions.md updates before a release |
| `/create-pr` | Generates PR title and description from commits, assigns reviewers, and runs an automated review |
| `/review-pr` | Reviews the open PR against IDS conventions and posts inline comments to Azure DevOps |

The ZeroHeight, Figma, and Atlassian (Confluence) APIs are all configured as MCP servers in the repo's `.claude/settings.json`, giving Claude Code live access to design documentation, Figma component files, and internal wiki pages during development sessions.

## Challenges, Pivots and setbacks
* Some brand design shifts in early
* Resistence from products
    * Worries about taking time away from features and jeapardizing roadmaps
    * Engineering teams unsure if web components would work with their tech stacks
* Stakeholder and leadership misunderstaning that the design system was just the visual appearance. Did not understand the technical infrastucture underpinning the visual language

## Bottlenecks
* Engineering and designer resources stretched thin with increasing demand for design system assistance

## Adoption Strategy
The overall strategy with adoption approach was to meet teams where they were, such as their roadmaps and the state of their technical stack. We approached our teams as an internal consultation. 

We would review with the engineering teams their code base and their roadmaps and we would develop an adoption and migration plan to suit that product. There was no single solution.

### DealCloud & Mobile adoption
With the new rebranding effort DealCloud needed to update their interface to match the new brand standards and design language. The new brand rollout was to be announced at the annual trade conference, so given the tight time constraint, it was determined the best way to achieve the alignment was through the style and icon libraries.  The DealCloud adopted the CSS styles which in turn consumes the design tokens. The icons could be implemented easily as there would be no conflicting dependencies. 

As the mobile products could not use the component or style libraries, they adopted the design token and icon libraries.

### Time and Billstream adoptions
To gain brand alignment, the Time and Billstream teams reached out to the design system team for assistance. They also had a tight timelines and not enough development resources for implementation, so the design system engineers first embedded in the Time team -- installing the design system icons, mapping their variables to design system tokens and cleaning up redundant or conflicting CSS styles.

The same approach was taken with the Billstream team.

After the visual updates, the design system team worked with both teams to adopt design system components -- component by component.

Overall, we found the best way to gain adoption was to start small with icon adoption, followed by design tokens or CSS styles, and finally by components. Teams gain trust with our willing to help and by the continuing improvements and updates to our packages.

In addition, we also built trust and drove adoption by holding weekly office hour meetings and ran a design system for developers slack channel where we posted weekly package update information, answered questions, and posted videos of new work and initiatives.

### My Growing Role
As design system grew and there was more engineering need, I was tasked with hiring, onboarding and managing two more engineers. While I still worked on the code base and performed daily development tasks, my role shifted to strategy, presenting to leadership, driving design system adoption, and 

## Scaling the team
As more team members were needed, we added a director of design system, 2 other engineers and 1 more designer.
The engineers were organized by skill, one focusing on deployments, architecture and infrasture, AI optimization and emerging technologies. The other tasked with component and pattern building and documentation.


## Scaling the system

### Optimization for AI

As AI coding tools became embedded in engineering workflows across Intapp, a new problem emerged: AI was generating UI without any knowledge of UDS. The results were predictable — components that didn't match Intapp standards, design drift in every sprint, and inconsistencies that surfaced in QA rather than being prevented at the component level. The design system existed, but AI tools couldn't see it.

The response was to treat AI readiness as a first-class system requirement. This meant structuring documentation for machine consumption, not just humans, and building tooling that put UDS directly inside the environments where engineers and AI agents were already working.

**Documentation structured for AI consumption**

Each `@ids` package was updated to ship its own Claude Code usage primer: a markdown file engineers could add to their project's `CLAUDE.md` that gave AI assistants accurate, system-specific context. Rather than an AI guessing which token to use for a button surface color, it could answer correctly from the primer. Primers covered token formats, naming conventions, component APIs, output format selection, and common gotchas like token renames on upgrades.

The IDS repo's `.claude/settings.json` configured three MCP servers that gave AI tools live access to the full documentation stack during development:

| MCP Server | What it provides |
|---|---|
| ZeroHeight | Design guidelines, usage principles, interaction patterns |
| Figma | Live access to UDS component files and design tokens |
| Atlassian (Confluence) | Internal wiki, onboarding docs, architectural decisions |

With these in place, an engineer working in Claude Code or Cursor had the same documentation context available to them that a senior member of the design system team would have.

**Claude Code skills for developer workflows**

A suite of skills was built directly into the IDS repo to automate the most repetitive development and process tasks:

| Skill | What it does |
|---|---|
| `/create-component` | Full workflow: plan API, Stencil, SCSS, sandbox, React, tests, stories, CHANGELOG |
| `/audit-component` | Reviews a component against all quality requirements, produces a prioritized gap list |
| `/update-changelogs` | Drafts and inserts CHANGELOG entries for the current branch across all affected packages |
| `/deploy-prep` | Version bumps, CHANGELOG headers, and versions.md updates before a release |
| `/create-pr` | Generates PR title and description from commits, assigns reviewers, runs automated review |
| `/review-pr` | Reviews an open PR against IDS conventions and posts inline comments to Azure DevOps |

Each of these represented work that previously required a senior engineer's time. The skills reduced that to a guided, reviewable workflow that any engineer on the team could run.

**AI Design System Assistant**

An AI assistant was developed and deployed in Slack and surfaced in ZeroHeight, trained on UDS documentation. Any Maker at Intapp — designer, product manager, or engineer — could ask it questions about which component to use, which token applied to a given situation, or how to implement a pattern, and receive an answer grounded in UDS rather than generic web knowledge. This extended the reach of the design system team's expertise across the organization without requiring proportional headcount growth.

**Figma MCP**

A Figma MCP integration was developed to connect UDS components, tokens, and patterns directly into the Figma design environment. With the integration in place, AI-generated design suggestions in Figma were scoped to UDS, keeping generated designs on-brand automatically. It also meant that what a designer produced in Figma reflected what was actually buildable from the component library, reducing handoff gaps and review cycles.

**create-intapp-app CLI**

A command-line tool was built to solve the blank-repository problem: every new project at Intapp had been starting from scratch, spending the first sprint recreating infrastructure that already existed. The CLI scaffolds a new project with UDS installed and configured from line one:

```bash
npx create-intapp-app my-project
# Choose stack: Vanilla JS, React, or Next.js
# UDS tokens, components, TypeScript config, CI/CD, and linting pre-wired
```

The generated project includes UDS design tokens and theme, the full component library, TypeScript and Prettier configuration, and CI/CD and linting pipelines with accessibility checks built in. Because the project structure is standardized, AI coding tools have immediate context about where everything lives — they are not interpreting an unfamiliar codebase from scratch.

**The framing: UDS as AI-ready infrastructure**

These initiatives were presented to executive leadership not as tooling improvements but as a strategic argument: without shared infrastructure, AI accelerates fragmentation. Every team using AI to generate UI without system context was compounding drift. UDS, positioned as the shared infrastructure that grounded AI agents in Intapp's standards, became the answer to that problem. The pitch reframed the design system from a component library into the foundation that made responsible AI-assisted development possible at scale.

## Impact
* Brand alignment across products
* Increased developer efficiency
    * Developers no longer had to spend lots of time customizing libraries like Material UI
    * Developers can spend more time on features rather than getting component to look or work the way they want
* Closer alignment between Product manager, designer and engineer
* Started breaking down communication silos between product teams

## Risk reduction
* Improved accessibility.
* Improved visual appearance
* Brand alignment giving clients and prospective customers more confidence
