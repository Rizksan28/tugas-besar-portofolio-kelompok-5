import { useEffect, type MouseEvent } from "react"
import {
  pharviaAssets,
  pharviaChallenges,
  pharviaDeckFigures,
  pharviaEcosystem,
  pharviaFeatures,
  pharviaProject,
  pharviaProjections,
  pharviaShowcase,
} from "../../data/pharvia"
import "./pharvia.css"

type OnLink = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void

const sections = [
  ["overview", "Overview"],
  ["challenge", "Challenge"],
  ["solution", "Solution"],
  ["showcase", "Showcase"],
  ["ecosystem", "Ecosystem"],
  ["recognition", "Recognition"],
  ["team", "Team"],
] as const

function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg
      className="pv-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={back ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionHead({
  index,
  label,
  title,
  kanji,
}: {
  index: string
  label: string
  title: string
  kanji?: string
}) {
  return (
    <header className="pv-head reveal">
      <span className="pv-head__label">
        <b>{index}</b> {label}
      </span>
      <h2>{title}</h2>
      {kanji && (
        <span className="pv-head__kanji" aria-hidden="true">
          {kanji}
        </span>
      )}
    </header>
  )
}

/** Gentle vertical drift for elements marked with data-parallax. Disabled for reduced motion. */
function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      for (const el of elements) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) continue
        const speed = Number(el.dataset.parallax) || 0.06
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed
        el.style.setProperty("--pv-parallax", `${offset.toFixed(1)}px`)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
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

export function PharviaCaseStudy({ onLink }: { onLink: OnLink }) {
  useParallax()
  const p = pharviaProject

  return (
    <div className="pv">
      {/* A — HERO */}
      <section className="pv-hero">
        <span className="pv-hero__kanji" aria-hidden="true">
          薬
        </span>
        <div className="pv-hero__inner">
          <a className="pv-back" href="/projects" onClick={onLink("/projects")}>
            <ArrowIcon back /> Back to Projects
          </a>
          <span className="pv-hero__eyebrow">Case Study / Featured Project</span>
          <h1>{p.name}</h1>
          <p className="pv-hero__subtitle">“{p.tagline}”</p>
          <p className="pv-hero__kind">{p.subtitle}</p>
          <ul className="pv-hero__meta">
            {["Digital Innovation", "HealthTech", "Sustainability", "Business Model Canvas Winner"].map(
              (item) => (
                <li key={item}>{item}</li>
              ),
            )}
          </ul>
        </div>
        <figure className="pv-hero__visual reveal" data-parallax="0.05">
          <img
            src={pharviaAssets.showcase.src}
            width={pharviaAssets.showcase.width}
            height={pharviaAssets.showcase.height}
            alt="PHARVIA mobile app mockups: splash screen, homepage, Pharvia Scan, Pharvia Point, and Smart Collect."
            fetchPriority="high"
          />
        </figure>
        <nav className="pv-index" aria-label="Case study sections">
          {sections.map(([id, label], i) => (
            <a href={`#${id}`} key={id}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {label}
            </a>
          ))}
        </nav>
      </section>

      {/* B — OVERVIEW */}
      <section className="pv-section pv-overview" id="overview">
        <SectionHead
          index="01"
          label="Project Overview"
          title="Reimagining Pharmaceutical Waste Management."
        />
        <div className="pv-overview__grid">
          <div className="pv-overview__copy reveal">
            <p className="pv-lead">
              PHARVIA is a digital pharmaceutical take-back ecosystem designed to
              make unused and expired medicine returns safer, easier, and more
              transparent.
            </p>
            <p>
              The platform connects consumers, pharmacies, pharmaceutical
              companies, and licensed waste management partners through digital
              medicine scanning, collection points, reward incentives, smart
              collection coordination, and end-to-end traceability.
            </p>
            <ol className="pv-chain" aria-label="Who PHARVIA connects">
              {["Consumers", "Pharmacies", "Pharmaceutical companies", "Licensed waste partners"].map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ol>
          </div>
          <dl className="pv-facts reveal">
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
                  <span key={c.name}>
                    {c.name} <em>— {c.role}</em>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Recognition</dt>
              <dd>{p.recognition}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{p.status}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* C — CHALLENGE */}
      <section className="pv-section pv-challenge" id="challenge">
        <SectionHead
          index="02"
          label="The Challenge"
          title="The Problem We Set Out to Solve."
          kanji="課題"
        />
        <ol className="pv-problems">
          {pharviaChallenges.map((item, i) => (
            <li className="reveal" key={item.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ol>
        <figure className="pv-figures reveal">
          <ul>
            {pharviaDeckFigures.map((f) => (
              <li key={f.value}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <figcaption>
            Figures as cited in the team’s PHARVIA competition presentation
            (“Latar Belakang” slide). The presentation does not list their
            primary sources.
          </figcaption>
        </figure>
      </section>

      {/* D — SOLUTION */}
      <section className="pv-section pv-solution" id="solution">
        <SectionHead
          index="03"
          label="Our Solution"
          title="One Connected Ecosystem. Measurable Impact."
        />
        <p className="pv-intro reveal">
          PHARVIA is proposed as an integrated digital ecosystem: one flow that
          takes a medicine from the user’s cabinet to a verified, licensed
          disposal — with every step recorded.
        </p>
        <ul className="pv-features">
          {pharviaFeatures.map((f, i) => (
            <li className="pv-feature reveal" key={f.number} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="pv-feature__screen">
                <img
                  src={f.screen.src}
                  width={f.screen.width}
                  height={f.screen.height}
                  alt={`${f.screen.label} screen mockup`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="pv-feature__number">{f.number}</span>
              <h3>{f.title}</h3>
              <p className="pv-feature__summary">{f.summary}</p>
              <p>{f.detail}</p>
            </li>
          ))}
        </ul>
        <p className="pv-note reveal">
          Proposed features shown as UI mockups from the competition entry — not
          a production deployment.
        </p>
      </section>

      {/* E — SHOWCASE */}
      <section className="pv-section pv-showcase" id="showcase">
        <SectionHead
          index="04"
          label="Product Showcase"
          title="Designed for a More Sustainable Future."
          kanji="循環"
        />
        <div
          className="pv-gallery"
          tabIndex={0}
          role="region"
          aria-label="PHARVIA app screens — scroll horizontally on small screens"
        >
          {pharviaShowcase.map((s, i) => (
            <figure className="pv-gallery__item reveal" key={s.id} style={{ transitionDelay: `${i * 80}ms` }}>
              <img
                src={s.src}
                width={s.width}
                height={s.height}
                alt={`${s.label} screen mockup`}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <strong>{s.label}</strong>
                <span>{s.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* F — BUSINESS MODEL */}
      <section className="pv-section pv-business" id="ecosystem">
        <SectionHead
          index="05"
          label="Business Model & Impact"
          title="Beyond an Application. Building an Ecosystem."
        />
        <div className="pv-business__grid">
          <div className="reveal">
            <p className="pv-intro">
              A proposed <strong>B2B2C</strong> model: businesses fund and host the
              network, while consumers drive participation.
            </p>
            <ol className="pv-pillars">
              {pharviaEcosystem.map((item, i) => (
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
          <aside className="pv-projection reveal" aria-labelledby="pv-projection-title">
            <span className="pv-projection__tag">Projection — not realised results</span>
            <h3 id="pv-projection-title">Five-year financial projection</h3>
            <dl>
              {pharviaProjections.highlights.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
            <h4>Projected revenue mix</h4>
            <div className="pv-mix" aria-hidden="true">
              {pharviaProjections.revenueMix.map((r, i) => (
                <span key={r.label} className={`pv-mix__seg pv-mix__seg--${i}`} style={{ flexBasis: `${r.share}%` }} />
              ))}
            </div>
            <ul className="pv-mix__legend">
              {pharviaProjections.revenueMix.map((r, i) => (
                <li key={r.label}>
                  <i className={`pv-mix__seg--${i}`} aria-hidden="true" />
                  {r.label}
                  <b>{r.share.toFixed(1)}%</b>
                </li>
              ))}
            </ul>
            <p className="pv-projection__source">
              Source: the team’s competition presentation, financial analysis
              slide (projection period 2026–2030). No revenue, users, or
              partnerships have been realised.
            </p>
          </aside>
        </div>
      </section>

      {/* G — ACHIEVEMENT */}
      <section className="pv-section pv-award" id="recognition">
        <span className="pv-award__spot" aria-hidden="true" />
        <SectionHead index="06" label="Recognition" title="An Idea Recognized." kanji="栄誉" />
        <div className="pv-award__grid">
          <div className="pv-award__title reveal">
            <span className="pv-award__seal" aria-hidden="true">
              一位
            </span>
            <strong>1st Place</strong>
            <span>Business Model Canvas Competition</span>
            <em>Universitas Syiah Kuala</em>
          </div>
          <figure className="pv-award__photo">
            <div className="pv-frame reveal pv-mask" data-parallax="0.03">
              <img
                src={pharviaAssets.award.src}
                width={pharviaAssets.award.width}
                height={pharviaAssets.award.height}
                alt="Award announcement: Lomba Business Model Canvas, Juara 1 — Halte Terminal Corrusant, Telkom University, shown beside a photo of the certificate presentation on stage."
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>PHARVIA — 1st Place, Business Model Canvas Competition.</figcaption>
          </figure>
        </div>
      </section>

      {/* H — TEAM */}
      <section className="pv-section pv-team" id="team">
        <SectionHead index="07" label="The People Behind PHARVIA" title="The Minds Behind the Innovation." />
        <div className="pv-team__grid">
          <figure className="pv-team__photo">
            <div className="pv-frame reveal pv-mask">
              <img
                src={pharviaAssets.team.src}
                width={pharviaAssets.team.width}
                height={pharviaAssets.team.height}
                alt="The three PHARVIA team members in maroon Telkom University blazers, two holding 1st-place certificates and one holding a tablet showing PHARVIA."
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
          <div className="pv-team__info reveal">
            <span className="pv-team__label">Project team</span>
            <h3>{p.team}</h3>
            <i className="pv-redline" aria-hidden="true" />
            <ul>
              {p.contributors.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* I — NEXT */}
      <section className="pv-next">
        <span className="pv-head__label">
          <b>終</b> Continue
        </span>
        <h2>Explore More of Our Work.</h2>
        <a className="pv-next__link" href="/projects" onClick={onLink("/projects")}>
          View all projects <ArrowIcon />
        </a>
      </section>
    </div>
  )
}
