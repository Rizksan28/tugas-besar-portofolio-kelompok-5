import { useEffect, type MouseEvent } from "react"
import {
  amaninAssets,
  amaninCapabilities,
  amaninEcosystem,
  amaninFeatures,
  amaninPhilosophy,
  amaninProblems,
  amaninProject,
  amaninProjections,
  amaninShowcaseScreens,
  amaninStats,
  amaninWorkflow,
} from "../../data/amanin"
import "./amanin.css"

type OnLink = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void

const sections = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["showcase", "Showcase"],
  ["workflow", "How It Works"],
  ["capabilities", "Capabilities"],
  ["business", "Business"],
  ["team", "Team"],
] as const

function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg
      className="am-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHead({ index, label, title, kanji }: { index: string; label: string; title: string; kanji?: string }) {
  return (
    <header className="am-head reveal">
      <span className="am-head__label">
        <b>{index}</b> {label}
      </span>
      <h2>{title}</h2>
      {kanji && <span className="am-head__kanji" aria-hidden="true">{kanji}</span>}
    </header>
  )
}

function CapabilityIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    scan: "M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2M3 17v2a2 2 0 0 0 2 2h2m10 0h2a2 2 0 0 0 2-2v-2M9 9h1v6H9zm5 0h1v6h-1z",
    link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zm14 0h1v1h-1zm0 3h1v1h-1zm0 3h1v1h-1zm-3-6h1v1h-1zm0 3h1v1h-1zm3-3h1v1h-1zm-3 3h4v1h-4zm0 3h4v-1h-4z",
    bank: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
    radar: "M22 12h-4m-5.27-6.73L10 8m-5.73 9.27L7 15m-4-3H.5M12 2v3M12 19v3m7.07-13.07L17 10M5.63 13.37 4 15M12 12m0 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 0a9 9 0 1 0-9-9",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
    flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  }
  const d = paths[icon] ?? paths.shield
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function FeatureIcon({ icon }: { icon: string }) {
  const defs: Record<string, string> = {
    "shield-scan": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
    "qr-check": "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zm14 7-2-2 4-4m-2 6a5 5 0 1 1 0-10 5 5 0 0 1 0 10z",
    "risk-score": "M3 3v18h18M9 17V9m4 8V5m4 12v-6",
    recommendation: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  }
  const d = defs[icon] ?? defs["shield-scan"]
  return (
    <div className="am-feature__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </div>
  )
}

function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-am-parallax]"))
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      for (const el of elements) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) continue
        const speed = Number(el.dataset.amParallax) || 0.06
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed
        el.style.setProperty("--am-parallax", `${offset.toFixed(1)}px`)
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
}

export function AmaninCaseStudy({ onLink }: { onLink: OnLink }) {
  useParallax()
  const p = amaninProject

  return (
    <div className="am">
      {/* A — HERO */}
      <section className="am-hero">
        <div className="am-hero__scan" aria-hidden="true" />
        <div className="am-hero__inner">
          <a className="am-back" href="/projects" onClick={onLink("/projects")}>
            <ArrowIcon back /> Back to Projects
          </a>
          <span className="am-hero__eyebrow">Project 02 / AI Cybersecurity</span>
          <h1>{p.name}</h1>
          <p className="am-hero__subtitle">"{p.tagline}"</p>
          <p className="am-hero__kind">{p.subtitle}</p>
          <ul className="am-hero__meta">
            {p.categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <figure className="am-hero__visual reveal" data-am-parallax="0.05">
          <img
            src={amaninAssets.showcase.src}
            width={amaninAssets.showcase.width}
            height={amaninAssets.showcase.height}
            alt="AMANIN mobile app — five smartphone screens showing the splash screen, home dashboard, Scam Radar, QRIS verification, and suspicious activity scanner."
            fetchPriority="high"
          />
        </figure>
        <nav className="am-index" aria-label="Case study sections">
          {sections.map(([id, label], i) => (
            <a href={`#${id}`} key={id}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {label}
            </a>
          ))}
        </nav>
      </section>

      {/* B — OVERVIEW */}
      <section className="am-section am-overview" id="overview">
        <SectionHead index="01" label="Project Overview" title="Building Trust in a World of Digital Threats." />
        <div className="am-overview__grid">
          <div className="am-overview__copy reveal">
            <p className="am-lead">
              AMANIN is a preventive AI-powered decision-support platform designed to help Indonesian users identify potential scams before making risky decisions.
            </p>
            <p>
              The platform combines multimodal content analysis, contextual risk assessment, verification tools, actionable safety recommendations, and digital cybersecurity education — all within a single, accessible interface.
            </p>
            <p>
              Developed under the RISE 2026 programme (Raising Innovation & Student Entrepreneurship), AMANIN targets the gap between Indonesia's high financial-inclusion rate and its comparatively lower digital-literacy and financial-literacy rates.
            </p>
            <ul className="am-philosophy" aria-label="Core product philosophy">
              {amaninPhilosophy.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <dl className="am-facts reveal">
            <div>
              <dt>Project</dt>
              <dd>
                {p.name}
                <small>{p.subtitle}</small>
              </dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{p.categories.join(" · ")}</dd>
            </div>
            <div>
              <dt>Project team</dt>
              <dd>{p.team}</dd>
            </div>
            <div>
              <dt>Contributors</dt>
              <dd>
                {p.contributors.map((c) => (
                  <span key={c.name}>{c.name} <em>— {c.role}</em></span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{p.context}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{p.status}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* C — PROBLEM */}
      <section className="am-section am-problem" id="problem">
        <SectionHead index="02" label="The Challenge" title="Digital Fraud Is Evolving. Protection Must Evolve Faster." kanji="詐欺" />
        <ul className="am-stats" aria-label="Key statistics from project documents">
          {amaninStats.map((s) => (
            <li className="reveal" key={s.value}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <cite>{s.source}</cite>
            </li>
          ))}
        </ul>
        <ul className="am-problems">
          {amaninProblems.map((item, i) => (
            <li className="reveal" key={item.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* D — SOLUTION */}
      <section className="am-section am-solution" id="solution">
        <SectionHead index="03" label="Our Solution" title="One Intelligent Assistant. Multiple Layers of Protection." />
        <p className="am-intro reveal">
          AMANIN is proposed as a <strong>multimodal AI analysis platform</strong>: one interface for evaluating suspicious messages, links, payment codes, and screenshots — with contextual explanations and recommended next steps.
        </p>
        <ul className="am-features">
          {amaninFeatures.map((f, i) => (
            <li className="am-feature reveal" key={f.number} style={{ transitionDelay: `${i * 90}ms` }}>
              <FeatureIcon icon={f.icon} />
              <span className="am-feature__number">{f.number}</span>
              <h3>{f.title}</h3>
              <p className="am-feature__summary">{f.summary}</p>
              <p>{f.detail}</p>
            </li>
          ))}
        </ul>
        <p className="am-note reveal">
          Proposed features shown as UI mockups from the competition entry — not a production deployment or validated AI system.
        </p>
      </section>

      {/* E — SHOWCASE */}
      <section className="am-section am-showcase" id="showcase">
        <SectionHead index="04" label="Product Showcase" title="Designed to Make Digital Safety Accessible." kanji="安全" />
        <div className="am-showcase__visual reveal" data-am-parallax="0.04">
          <img
            src={amaninAssets.showcase.src}
            width={amaninAssets.showcase.width}
            height={amaninAssets.showcase.height}
            alt="AMANIN five-screen showcase: splash, home, scam radar, QRIS verification, and scanner."
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul className="am-screen-labels" aria-label="Screen descriptions">
          {amaninShowcaseScreens.map((s, i) => (
            <li key={s.id}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <strong>{s.label}</strong>
              <span>{s.caption}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* F — WORKFLOW */}
      <section className="am-section am-workflow" id="workflow">
        <SectionHead index="05" label="How AMANIN Works" title="From Suspicion to Safer Decisions." kanji="流れ" />
        <p className="am-intro reveal">
          A simple four-step flow designed to fit seamlessly into how people already behave when they receive a suspicious message or request.
        </p>
        <ul className="am-flow">
          {amaninWorkflow.map((w, i) => (
            <li className="reveal" key={w.step} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="am-flow__kanji" aria-hidden="true">{w.kanji}</div>
              <h3>{w.step}</h3>
              <p>{w.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* G — CAPABILITIES */}
      <section className="am-section am-capabilities" id="capabilities">
        <SectionHead index="06" label="Product Capabilities" title="Protection Across Everyday Digital Interactions." />
        <ul className="am-cap-grid">
          {amaninCapabilities.map((cap, i) => (
            <li className="reveal" key={cap.label} style={{ transitionDelay: `${i * 60}ms` }}>
              <CapabilityIcon icon={cap.icon} />
              <span>{cap.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* H — BUSINESS */}
      <section className="am-section am-business" id="business">
        <SectionHead index="07" label="Market & Business Innovation" title="Building a Scalable Digital Trust Ecosystem." />
        <div className="am-business__grid">
          <div className="reveal">
            <p className="am-intro">
              A proposed <strong>B2C and B2B model</strong>: individuals access core protection tools directly, while organisations integrate AMANIN's intelligence layer into their own workflows.
            </p>
            <ol className="am-pillars">
              {amaninEcosystem.map((item, i) => (
                <li key={item.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="am-projection reveal" aria-labelledby="am-projection-title">
            <span className="am-projection__tag">Projection — not realised results</span>
            <h3 id="am-projection-title">Five-year financial projection</h3>
            <dl>
              {amaninProjections.highlights.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
            <h4>Projected revenue mix</h4>
            <div className="am-mix" aria-hidden="true">
              {amaninProjections.revenueMix.map((r, i) => (
                <span key={r.label} className={`am-mix__seg--${i}`} style={{ flexBasis: `${r.share}%` }} />
              ))}
            </div>
            <ul className="am-mix__legend">
              {amaninProjections.revenueMix.map((r, i) => (
                <li key={r.label}>
                  <i className={`am-mix__seg--${i}`} aria-hidden="true" />
                  {r.label}
                  <b>{r.share}%</b>
                </li>
              ))}
            </ul>
            <p className="am-projection__source">
              Source: the team's RISE 2026 presentation and business plan proposal. No revenue, users, or institutional partnerships have been realised.
            </p>
          </aside>
        </div>
      </section>

      {/* I — TEAM */}
      <section className="am-section am-team" id="team">
        <SectionHead index="08" label="The People Behind AMANIN" title="The Minds Behind Digital Trust." />
        <div className="am-team__grid">
          <figure className="am-team__photo">
            <div className="am-team__placeholder reveal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <p>Team photograph — place <code>amanin-team.jpg</code> in <code>public/assets/projects/amanin/</code> to display the AMANIN team photo here.</p>
              </div>
          </figure>
          <div className="am-team__info reveal">
            <span className="am-team__label">Project team</span>
            <h3>{p.team}</h3>
            <i className="am-cyanline" aria-hidden="true" />
            <ul>
              {p.contributors.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </li>
              ))}
            </ul>
            <p className="am-team__slot">
              RISE 2026 · Raising Innovation & Student Entrepreneurship
            </p>
          </div>
        </div>
      </section>

      {/* J — NEXT */}
      <section className="am-next">
        <span className="am-head__label">
          <b>終</b> Continue
        </span>
        <h2>Explore More of Our Work.</h2>
        <div className="am-next__links">
          <a className="am-next__link am-next__link--primary" href="/projects/pharvia" onClick={onLink("/projects/pharvia")}>
            View PHARVIA <ArrowIcon />
          </a>
          <a className="am-next__link" href="/projects" onClick={onLink("/projects")}>
            All Projects <ArrowIcon />
          </a>
        </div>
      </section>
    </div>
  )
}
