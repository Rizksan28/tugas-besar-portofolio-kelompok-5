import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import { AchievementShowcase } from "./AchievementShowcase"
import { Lightbox, useLightbox } from "./Lightbox"
import { ToolCard } from "../expertise/ToolCard"
import { SpecializationIcon } from "../expertise/SpecializationCard"
import type { ProfileData, ProfileImage, ProfileSectionHead } from "../../types/profile"
import "./profile.css"

type OnLink = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void

/** Reveal-on-scroll scoped to this page (App's observer only re-runs on route changes). */
function useReveal(key: string) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll(".rz-reveal:not(.is-visible)")
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [key])
  return ref
}

function Head({ index, head, children }: { index: number; head: ProfileSectionHead; children?: ReactNode }) {
  return (
    <header className="rz-head rz-reveal">
      <span className="rz-label">
        <b>{String(index).padStart(2, "0")}</b> {head.label}
      </span>
      <h2>{head.title}</h2>
      {children}
      {head.kanji && (
        <span className="rz-head__kanji" aria-hidden="true">
          {head.kanji}
        </span>
      )}
    </header>
  )
}

function Arrow() {
  return (
    <svg className="rz-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children} <Arrow />
      <span className="rz-sr">(opens in a new tab)</span>
    </a>
  )
}

type GalleryItem = ProfileImage & { caption: string; category: string; featured?: boolean }

/** Editorial gallery; opens the shared Lightbox. Asymmetric when an item is featured. */
function Gallery({ title, items }: { title: string; items: GalleryItem[] }) {
  const lb = useLightbox()
  const categories = Array.from(new Set(items.map((i) => i.category)))
  const [filter, setFilter] = useState("All")
  const visible = items.filter((i) => filter === "All" || i.category === filter)
  const asymmetric = filter === "All" && visible.some((i) => i.featured)

  return (
    <>
      {categories.length > 1 && (
        <div className="rz-gallery__filters" role="group" aria-label="Filter gallery">
          {["All", ...categories].map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <ul
        className={asymmetric ? "rz-gallery rz-gallery--feature" : "rz-gallery"}
        style={asymmetric ? undefined : { columnCount: Math.min(3, Math.max(1, visible.length)) }}
      >
        {visible.map((item, i) => (
          <li
            className={`rz-gallery__item rz-reveal is-visible ${asymmetric && item.featured ? "rz-gallery__item--featured" : ""}`}
            key={item.src + item.category}
          >
            <button type="button" onClick={() => lb.open(title, visible, i)} aria-label={`View larger: ${item.caption}`}>
              <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />
            </button>
            <p>
              <small>{item.category}</small>
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
      <Lightbox state={lb.state} onClose={lb.close} onIndex={lb.setIndex} />
    </>
  )
}

export function MemberProfile({
  data,
  portrait,
  spirit,
  memberIndex,
  onLink,
}: {
  data: ProfileData
  portrait: string
  /** Decorative spirit illustration shown behind the portrait (creative symbolism). */
  spirit?: { name: string; image: string; width: number; height: number; meaning: string }
  memberIndex: string
  onLink: OnLink
}) {
  const ref = useReveal(data.name)
  const [artworkFailed, setArtworkFailed] = useState(false)
  const [first, ...rest] = data.name.split(" ")
  let section = 0
  const next = () => ++section

  return (
    <div className="rz" ref={ref}>
      {/* HERO */}
      <section className="rz-hero">
        <span className="rz-hero__kanji" aria-hidden="true">
          {data.heroKanji}
        </span>
        <div className="rz-hero__grid">
          {data.heroArtwork?.src && !artworkFailed ? (
            // Complete artwork with its own gold frame: shown whole (no crop, no extra frame).
            <figure className="rz-hero__artwork rz-reveal">
              <img
                src={data.heroArtwork.src}
                alt={data.heroArtwork.alt}
                fetchPriority="high"
                decoding="async"
                onError={() => setArtworkFailed(true)}
              />
            </figure>
          ) : (
            <figure className={`rz-hero__portrait rz-reveal ${spirit ? "has-spirit" : ""}`}>
              {spirit ? (
                <img
                  className="rz-hero__spirit"
                  src={spirit.image}
                  width={spirit.width}
                  height={spirit.height}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                />
              ) : (
                <span className="rz-hero__sun" aria-hidden="true" />
              )}
              <img src={portrait} alt={`Portrait of ${data.name}`} width={608} height={768} />
              <figcaption>
                <span>Kelompok 5 Member / {memberIndex}</span>
                <span>{data.affiliation}</span>
              </figcaption>
            </figure>
          )}
          <div className="rz-hero__copy">
            <span className="rz-label rz-reveal">Personal Profile</span>
            {spirit && (
              <p className="spirit-label rz-reveal">
                <span>The {spirit.name}</span>
                <small>{spirit.meaning}</small>
              </p>
            )}
            <h1 className="rz-reveal">
              {first}
              <br />
              <span>{rest.join(" ")}</span>
            </h1>
            <p className="rz-hero__headline rz-reveal">
              {data.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            {data.tagline && <p className="rz-hero__tagline rz-reveal">{data.tagline}</p>}
            {data.statement && <p className="rz-hero__statement rz-reveal">{data.statement}</p>}
            <div className="rz-hero__bio rz-reveal">
              {data.bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
            {data.links && data.links.length > 0 && (
              <div className="rz-hero__links rz-reveal">
                {data.links.map((l) => (
                  <ExternalLink key={l.href} href={l.href}>
                    {l.label}
                  </ExternalLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="rz-section rz-expertise">
        <Head index={next()} head={data.expertise} />
        <ul className={`rz-cards rz-cards--${data.expertise.items.length}`}>
          {data.expertise.items.map((item, i) => (
            <li className="rz-card rz-reveal" key={item.number} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="rz-card__top">
                <span className="rz-card__icon">
                  <SpecializationIcon name={item.icon} />
                </span>
                <span className="rz-card__num">{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.evidence && <p className="rz-card__evidence">{item.evidence}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* TOOLKIT */}
      {data.toolkit && (
        <section className="rz-section rz-tools">
          <Head index={next()} head={data.toolkit}>
            <p className="rz-head__note">{data.toolkit.note}</p>
          </Head>
          <div className="rz-toolgroups">
            {data.toolkit.groups.map((g) => (
              <section
                className="rz-toolgroup rz-reveal"
                key={g.group}
                aria-label={g.group}
                // Width scales with tool count so large groups get room and small ones stay compact.
                style={{ flexGrow: g.tools.length, flexBasis: `${Math.min(g.tools.length, 6) * 108 + 44}px` }}
              >
                <h3>{g.group}</h3>
                <ul>
                  {g.tools.map((t) => (
                    <ToolCard tool={t} key={t.id} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      <section className="rz-section rz-experience">
        <Head index={next()} head={data.experience} />
        <div className={data.experience.aside ? "rz-experience__grid" : undefined}>
          <ol className="rz-timeline">
            {data.experience.items.map((e) => (
              <li className="rz-reveal" key={e.number}>
                <div className="rz-timeline__marker">
                  <b>{e.number}</b>
                  {e.date && (
                    <time>
                      {e.date.split(" – ").map((part, i, all) => (
                        <span key={part}>
                          {part}
                          {i < all.length - 1 && " –"}
                        </span>
                      ))}
                    </time>
                  )}
                </div>
                <div className="rz-timeline__body">
                  <h3>{e.role}</h3>
                  <span>{e.org}</span>
                  {e.meta && e.meta.length > 0 && (
                    <ul className="rz-timeline__meta">
                      {e.meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  )}
                  <p>{e.copy}</p>
                  {e.related && <p className="rz-timeline__related">{e.related}</p>}
                </div>
              </li>
            ))}
          </ol>
          {data.experience.aside && (
            <aside className="rz-aside rz-reveal">
              {data.experience.aside.map((block) => (
                <section key={block.title}>
                  <h3>{block.title}</h3>
                  <ul>
                    {block.items.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        {item.detail && <span>{item.detail}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </aside>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="rz-section rz-projects">
        <Head index={next()} head={data.projects} />
        <ol className="rz-projectlist">
          {data.projects.items.map((proj, i) => (
            <li className="rz-reveal" key={proj.id}>
              <span className="rz-projectlist__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="rz-projectlist__main">
                <h3>{proj.title}</h3>
                <p>{proj.summary}</p>
                {proj.achievement && <span className="rz-projectlist__award">{proj.achievement}</span>}
              </div>
              <div className="rz-projectlist__role">
                {proj.role ? (
                  <>
                    <small>Role</small>
                    <span>{proj.role}</span>
                  </>
                ) : (
                  <small>Project Involvement</small>
                )}
              </div>
              <div className="rz-projectlist__link">
                {proj.caseStudyUrl && (
                  <a href={proj.caseStudyUrl} onClick={onLink(proj.caseStudyUrl)}>
                    Case study <Arrow />
                  </a>
                )}
                {proj.externalUrl && (
                  <ExternalLink href={proj.externalUrl.href}>{proj.externalUrl.label}</ExternalLink>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ACHIEVEMENTS — showcase */}
      {data.showcase && (
        <section className="rz-section rz-achievements">
          <Head index={next()} head={data.showcase}>
            <p className="rz-head__subtitle">{data.showcase.subtitle}</p>
          </Head>
          <AchievementShowcase items={data.showcase.items} onLink={onLink} />
        </section>
      )}

      {/* ACHIEVEMENTS — simple cards */}
      {!data.showcase && data.achievements && (
      <section className="rz-section rz-achievements">
        <Head index={next()} head={data.achievements!} />
        <ul className={`rz-awards rz-awards--${data.achievements!.items.length}`}>
          {data.achievements!.items.map((a, i) => (
            <li
              className={`rz-award rz-reveal ${a.image ? "rz-award--photo" : ""}`}
              key={a.title}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {a.image ? (
                <div className="rz-award__media">
                  <img src={a.image.src} width={a.image.width} height={a.image.height} alt={a.image.alt} loading="lazy" decoding="async" />
                </div>
              ) : (
                <div
                  className={`rz-award__emblem ${a.rank.startsWith("1st") ? "" : "rz-award__emblem--silver"}`}
                  aria-hidden="true"
                >
                  <span>{a.rank.split(" ")[0]}</span>
                </div>
              )}
              <div className="rz-award__body">
                <strong>{a.rank}</strong>
                <h3>{a.title}</h3>
                {a.event && <span className="rz-award__event">{a.event}</span>}
                <span className="rz-award__project">
                  Project · {a.project}
                  {a.note && ` · ${a.note}`}
                </span>
                {a.caseStudyUrl && (
                  <a href={a.caseStudyUrl} onClick={onLink(a.caseStudyUrl)}>
                    View {a.project} case study <Arrow />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* GALLERY */}
      {data.gallery && data.gallery.items.length > 0 && (
        <section className="rz-section rz-gallery-section">
          <Head index={next()} head={data.gallery} />
          <Gallery title={data.gallery.title} items={data.gallery.items} />
        </section>
      )}

      {/* PHILOSOPHY */}
      {data.philosophy && (
        <section className="rz-philosophy">
          <span className="rz-philosophy__brush" aria-hidden="true" />
          <span className="rz-philosophy__kanji" aria-hidden="true">
            {data.philosophy.kanji}
          </span>
          <span className="rz-label rz-reveal">
            <b>{String(next()).padStart(2, "0")}</b> {data.philosophy.label}
          </span>
          <blockquote className="rz-reveal">
            <p>“{data.philosophy.quote}”</p>
          </blockquote>
          <p className="rz-philosophy__support rz-reveal">{data.philosophy.support}</p>
        </section>
      )}
    </div>
  )
}
