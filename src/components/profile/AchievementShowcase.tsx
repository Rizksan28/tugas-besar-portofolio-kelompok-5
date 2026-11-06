import type { MouseEvent } from "react"
import type { Achievement } from "../../types/profile"
import { Lightbox, useLightbox } from "./Lightbox"

type OnLink = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void

function Badge({ awards }: { awards: string[] }) {
  return (
    <ul className="rz-badges" aria-label="Awards">
      {awards.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  )
}

function Meta({ a }: { a: Achievement }) {
  return (
    <dl className="rz-ach__meta">
      <div>
        <dt>Project</dt>
        <dd>{a.project}</dd>
      </div>
      <div>
        <dt>Date</dt>
        <dd>
          <time dateTime={a.sortDate.slice(0, 7)}>{a.date}</time>
        </dd>
      </div>
      <div>
        <dt>Role</dt>
        <dd>{a.role ?? "Not specified"}</dd>
      </div>
      {a.team && (
        <div>
          <dt>Team</dt>
          <dd>{a.team}</dd>
        </div>
      )}
    </dl>
  )
}

export function AchievementShowcase({
  items,
  onLink,
}: {
  items: Achievement[]
  onLink: OnLink
}) {
  const lb = useLightbox()
  const featured = items.filter((a) => a.featured)
  const rest = items.filter((a) => !a.featured)

  const title = (a: Achievement) => `${a.project} — ${a.competition}`
  const countLabel = (n: number) => `${n} ${n === 1 ? "photo" : "photos"}`

  const docsButton = (a: Achievement) =>
    a.images.length > 0 && (
      <button type="button" className="rz-ach__docs" onClick={() => lb.open(title(a), a.images)}>
        View documentation — {countLabel(a.images.length)}
      </button>
    )

  /** Clickable thumbnails; each opens the viewer at that image. */
  const thumbs = (a: Achievement, skipFirst = false) => {
    const list = a.images.map((img, index) => ({ img, index })).slice(skipFirst ? 1 : 0)
    if (!list.length) return null
    return (
      <ul className="rz-ach__thumbs" aria-label={`${a.project} documentation`}>
        {list.map(({ img, index }) => (
          <li key={img.src}>
            <button
              type="button"
              className={img.type === "certificate" ? "is-doc" : undefined}
              onClick={() => lb.open(title(a), a.images, index)}
              aria-label={`Open ${img.caption}`}
            >
              <img src={img.src} width={img.width} height={img.height} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const caseLink = (a: Achievement) =>
    a.relatedProjectUrl && (
      <a className="rz-ach__case" href={a.relatedProjectUrl} onClick={onLink(a.relatedProjectUrl)}>
        {a.project} case study
      </a>
    )

  return (
    <>
      <ul className={`rz-ach-featured rz-ach-featured--${featured.length}`}>
        {featured.map((a, i) => {
          const cover = a.images[0]
          return (
            <li className="rz-ach-card rz-reveal" key={a.id} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className={`rz-ach-card__media ${cover && cover.height > cover.width ? "is-portrait" : ""}`}>
                {cover && (
                  <button type="button" className="rz-ach-card__cover" onClick={() => lb.open(title(a), a.images, 0)} aria-label={`Open ${cover.caption}`}>
                    <img src={cover.src} width={cover.width} height={cover.height} alt={cover.alt} loading="lazy" decoding="async" />
                  </button>
                )}
                <Badge awards={a.awards} />
              </div>
              <div className="rz-ach-card__body">
                <span className="rz-ach__org">{a.organizer}</span>
                <h3>{a.competition}</h3>
                <Meta a={a} />
                <p>{a.description}</p>
                {thumbs(a, true)}
                <div className="rz-ach__actions">
                  {docsButton(a)}
                  {caseLink(a)}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {rest.length > 0 && (
        <ol className="rz-ach-timeline">
          {rest.map((a) => (
            <li className="rz-reveal" key={a.id}>
              <div className="rz-ach-timeline__date">
                <time dateTime={a.sortDate.slice(0, 7)}>{a.date}</time>
              </div>
              <div className="rz-ach-timeline__body">
                <Badge awards={a.awards} />
                <h3>
                  {a.project}
                  <span> — {a.competition}</span>
                </h3>
                <span className="rz-ach__org">{a.organizer}</span>
                <p className="rz-ach-timeline__role">
                  <small>Role</small>
                  {a.role ?? "Not specified in the source"}
                </p>
                <p>{a.description}</p>
                {thumbs(a)}
                <div className="rz-ach__actions">
                  {docsButton(a)}
                  {caseLink(a)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="rz-ach__note rz-reveal">
        Individual achievements with their original competition teams — not awards of the Kelompok 5 collective.
      </p>

      <Lightbox state={lb.state} onClose={lb.close} onIndex={lb.setIndex} />
    </>
  )
}
