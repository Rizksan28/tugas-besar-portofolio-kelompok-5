import { useEffect, useState, type MouseEvent, type ReactNode } from "react"
import { Specializations } from "./components/expertise/Specializations"
import { ToolsGrid } from "./components/expertise/ToolsGrid"
import { PharviaCaseStudy } from "./components/pharvia/PharviaCaseStudy"
import { AmaninCaseStudy } from "./components/amanin/AmaninCaseStudy"
import { pharviaAssets } from "./data/pharvia"
import { amaninAssets } from "./data/amanin"
import { brand } from "./data/brand"
import { collectiveAchievements, achievementSummary } from "./data/achievements"
import { MemberProfile } from "./components/profile/MemberProfile"
import { rizkyProfileData } from "./data/rizky"
import { vassellProfileData } from "./data/vassell"
import { evanProfileData } from "./data/evan"
import type { ProfileData } from "./types/profile"

/** Members with a full personal profile, keyed by slug. Others use the template page. */
const memberProfiles: Record<string, ProfileData> = {
  rizky: rizkyProfileData,
  vassel: vassellProfileData,
  evan: evanProfileData,
}

type Route = "home" | "projects" | "project" | "pharvia" | "amanin" | "team" | "member" | "achievements" | "about"

type MemberSpirit = {
  name: string
  image: string
  width: number
  height: number
  meaning: string
  /** Approved Japanese character(s) shown on the Team card. */
  kanji: string
}

/**
 * Per-member Team card composition. All values are percentages of the whole card
 * (width for scale/X, height for Y). Portrait values are derived from each PNG's measured head
 * position so every head lands at the same size (26% of card width), height (27%) and centre line.
 */
type TeamCardLayout = {
  portraitScale: number
  portraitOffsetX: number
  portraitOffsetY: number
  artworkScale: number
  artworkOffsetX: number
  artworkOffsetY: number
}

type Member = {
  slug: string
  mark: string
  name: string
  index: string
  portrait: string
  spirit: MemberSpirit
  teamCard: TeamCardLayout
}

// Note: the portrait file names do not match the people shown in them.
// `index` + `portrait` belong to the photo (index drives the .portrait--NN sizing);
// `slug`, `mark` and `name` belong to the person in that photo.
// Spirit illustrations — creative symbolism, not personality assessments.
// Originals: design/spirits/*.png · web copies: public/assets/team/spirits/*.webp
const spirits = {
  rizky: { name: "Koi", image: "/assets/team/spirits/rizky-koi.webp", width: 1145, height: 1374, meaning: "Perseverance & Ambition", kanji: "鯉" },
  vassel: { name: "Kirin", image: "/assets/team/spirits/vassel-kirin.webp", width: 1024, height: 1536, meaning: "Wisdom & Vision", kanji: "麒麟" },
  evan: { name: "Serpent", image: "/assets/team/spirits/evan-serpent.webp", width: 1024, height: 1536, meaning: "Adaptability & Strategy", kanji: "蛇" },
  raka: { name: "Tiger", image: "/assets/team/spirits/raka-tiger.webp", width: 1122, height: 1402, meaning: "Courage & Strength", kanji: "虎" },
} satisfies Record<string, MemberSpirit>

const members: Member[] = [
  {
    slug: "raka",
    spirit: spirits.raka,
    teamCard: { portraitScale: 89.3, portraitOffsetX: 2.6, portraitOffsetY: 25.9, artworkScale: 130, artworkOffsetX: -37.4, artworkOffsetY: -39.2 },
    mark: "RA",
    name: "Raka Rahmatullah",
    index: "03",
    portrait: "/assets/raven/member-03-evan.png",
  },
  {
    slug: "vassel",
    spirit: spirits.vassel,
    teamCard: { portraitScale: 86.1, portraitOffsetX: 13.1, portraitOffsetY: 25.5, artworkScale: 105, artworkOffsetX: -12.0, artworkOffsetY: -1.7 },
    mark: "V",
    name: "Vassell Enha Atthayya",
    index: "04",
    portrait: "/assets/raven/member-04-rizky.png",
  },
  {
    slug: "evan",
    spirit: spirits.evan,
    teamCard: { portraitScale: 85.8, portraitOffsetX: 10.4, portraitOffsetY: 24.8, artworkScale: 100, artworkOffsetX: -7.0, artworkOffsetY: -24.2 },
    mark: "E",
    name: "Evan Octavianus Haryo Handoko",
    index: "01",
    portrait: "/assets/raven/member-01-raka.png",
  },
  {
    slug: "rizky",
    spirit: spirits.rizky,
    teamCard: { portraitScale: 87.0, portraitOffsetX: 10.2, portraitOffsetY: 25.3, artworkScale: 110, artworkOffsetX: -1.8, artworkOffsetY: -2.7 },
    mark: "N",
    name: "Rizky Sandi Pratama",
    index: "02",
    portrait: "/assets/raven/member-02-vassel.png",
  },
]

const projectSlots = [
  {
    number: "01",
    title: "Project Title Pending",
    category: "Web Development",
    year: "20—",
    description:
      "A reserved space for a flagship digital experience. Add the verified brief, contribution, and outcome when ready.",
    contributors: "Contributors to be confirmed",
    tone: "signal",
  },
  {
    number: "02",
    title: "Project Title Pending",
    category: "UI / UX Design",
    year: "20—",
    description:
      "A case study placeholder designed to foreground the product story, process, and team contribution.",
    contributors: "Contributors to be confirmed",
    tone: "grid",
  },
  {
    number: "03",
    title: "Project Title Pending",
    category: "AI & Technology",
    year: "20—",
    description:
      "An editorial canvas for a future technology project, from early research through final delivery.",
    contributors: "Contributors to be confirmed",
    tone: "orb",
  },
]

type ShowcaseProject = {
  id: string
  title: string
  category: string
  filters: string[]
  description: string
  year: string
  tech: string[]
  contributions: string[]
  contributors: string[]
  caseStudyUrl: string
  coverImage: string
  coverAlt?: string
  mockup: string
  featured: boolean
  quote?: string
  achievement?: string
  ctaLabel?: string
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "pharvia",
    title: "PHARVIA",
    category: "Digital Pharmaceutical Take-Back Ecosystem",
    filters: ["UI/UX Design", "Mobile App"],
    description:
      "A digital take-back ecosystem that connects consumers, pharmacies, pharmaceutical companies, and licensed waste partners to return unused medicines safely and traceably.",
    quote:
      "A smarter way to return, track, and responsibly manage unused medicines.",
    year: "Halte Terminal Corruscant",
    tech: [],
    contributions: ["HealthTech", "Sustainability", "Digital Innovation"],
    contributors: [
      "Rizky Sandi Pratama",
      "Vassell Enha Atthayya",
      "Evan Octavianus Haryo Handoko",
    ],
    caseStudyUrl: "/projects/pharvia",
    coverImage: pharviaAssets.cover.src,
    coverAlt:
      "PHARVIA app mockups showing the homepage, Pharvia Scan, and Pharvia Point screens.",
    mockup: "pharvia",
    featured: true,
    achievement: "1st Place — Business Model Canvas",
    ctaLabel: "Explore case study",
  },
  {
    id: "amanin",
    title: "AMANIN",
    category: "AI-Powered Anti-Scam Decision Assistant",
    filters: ["AI & Technology", "Mobile App"],
    description:
      "An AI-powered digital safety platform that helps Indonesian users identify potential scams before making risky decisions — covering suspicious messages, links, QR codes, and payment information.",
    quote:
      "Helping people recognize digital threats before they become victims.",
    year: "Halte Terminal Rawamangun",
    tech: [],
    contributions: ["AI", "Cybersecurity", "FinTech"],
    contributors: [
      "Rizky Sandi Pratama",
      "Vassell Enha Atthayya",
      "Evan Octavianus Haryo Handoko",
    ],
    caseStudyUrl: "/projects/amanin",
    coverImage: amaninAssets.cover.src,
    coverAlt:
      "AMANIN app — five smartphone screens showing the splash screen, home dashboard, Scam Radar, QRIS verification, and suspicious activity scanner.",
    mockup: "amanin",
    featured: true,
    ctaLabel: "Explore case study",
  },
  {
    id: "nomori",
    title: "NOMORI",
    category: "Productivity Web & Mobile Application",
    filters: ["Web Development", "UI/UX Design", "Mobile App"],
    description:
      "A modern productivity platform designed to help users organize tasks, maintain focus, and build better daily habits.",
    year: "Placeholder",
    tech: ["Figma", "React", "Tailwind CSS", "Firebase"],
    contributions: ["UI/UX Design", "Web Development", "Mobile Development"],
    contributors: ["Contributors to be confirmed"],
    caseStudyUrl: "/projects/nomori",
    coverImage: "",
    mockup: "nomori",
    featured: true,
  },
  {
    id: "kurasu",
    title: "KURASU",
    category: "Event & Community Platform",
    filters: ["Web Development", "UI/UX Design", "Mobile App"],
    description:
      "A digital platform for discovering, joining, and managing creative community events.",
    year: "Placeholder",
    tech: ["React", "Node.js", "PostgreSQL"],
    contributions: ["UI/UX Design", "Mobile Development"],
    contributors: ["Contributors to be confirmed"],
    caseStudyUrl: "/projects/kurasu",
    coverImage: "",
    mockup: "kurasu",
    featured: false,
  },
  {
    id: "aozora",
    title: "AOZORA",
    category: "Personal Finance Dashboard",
    filters: ["Web Development", "UI/UX Design"],
    description:
      "An intuitive financial dashboard for tracking expenses, planning budgets, and understanding financial habits.",
    year: "Placeholder",
    tech: ["Figma", "Next.js", "Tailwind CSS"],
    contributions: ["UI/UX Design", "Web Development"],
    contributors: ["Contributors to be confirmed"],
    caseStudyUrl: "/projects/aozora",
    coverImage: "",
    mockup: "aozora",
    featured: false,
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h14m-5-5 5 5-5 5"} />
    </svg>
  )
}

/** Kelompok 5 logo artwork (transparent). Decorative here — the surrounding link/heading carries the label. */
function BrandLogo({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  return (
    <img
      className={`brand-logo brand-logo--${variant}`}
      src={brand.logo.src}
      width={brand.logo.width}
      height={brand.logo.height}
      alt=""
      decoding="async"
    />
  )
}

function pathToRoute(pathname: string): Route {
  if (pathname.replace(/\/$/, "") === "/projects/pharvia") return "pharvia"
  if (pathname.replace(/\/$/, "") === "/projects/amanin") return "amanin"
  if (pathname.startsWith("/projects/")) return "project"
  if (pathname === "/projects") return "projects"
  if (pathname.startsWith("/team/")) return "member"
  if (pathname === "/team") return "team"
  if (pathname === "/achievements") return "achievements"
  if (pathname === "/about" || pathname === "/contact") return "about"
  return "home"
}

function useRouter() {
  const [route, setRoute] = useState<Route>(() =>
    pathToRoute(window.location.pathname),
  )

  useEffect(() => {
    const onPopState = () => setRoute(pathToRoute(window.location.pathname))
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, "", path)
    setRoute(pathToRoute(path))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onLink = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(path)
  }

  return { route, navigate, onLink }
}

function Header({
  route,
  onLink,
}: {
  route: Route
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const [open, setOpen] = useState(false)
  const links = [
    ["Home", "/", "home"],
    ["Projects", "/projects", "projects"],
    ["Team", "/team", "team"],
    ["Achievements", "/achievements", "achievements"],
    ["About", "/about", "about"],
  ]

  return (
    <header className="site-header">
      <a className="brand-link" href="/" onClick={onLink("/")} aria-label={`${brand.name} — Home`}>
        <BrandLogo />
      </a>
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
      </button>
      <nav
        className={open ? "nav nav--open" : "nav"}
        aria-label="Primary navigation"
      >
        {links.map(([label, path, key]) => (
          <a
            key={path}
            className={
              route === key ||
              (key === "projects" &&
                (route === "project" || route === "pharvia" || route === "amanin")) ||
              (key === "team" && route === "member")
                ? "active"
                : ""
            }
            href={path}
            onClick={(event) => {
              setOpen(false)
              onLink(path)(event)
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <a
        className="brush-button header-cta"
        href="/projects"
        onClick={onLink("/projects")}
      >
        Explore projects <Arrow diagonal />
      </a>
    </header>
  )
}

function Footer({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__brand">
          <BrandLogo variant="footer" />
          <span className="sr-only">{brand.displayName}</span>
        </p>
        <p>Four Minds. Endless Possibilities.</p>
      </div>
      <div className="footer__links">
        <div>
          <span className="footer__label">Navigate</span>
          <a href="/projects" onClick={onLink("/projects")}>
            Projects
          </a>
          <a href="/team" onClick={onLink("/team")}>
            Team
          </a>
          <a href="/achievements" onClick={onLink("/achievements")}>
            Achievements
          </a>
          <a href="/about" onClick={onLink("/about")}>
            About / Contact
          </a>
        </div>
        <div>
          <span className="footer__label">Connect</span>
          <a href="#github">GitHub</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="mailto:hello@raven.example">Email</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {brand.displayName}</span>
        <span>JAKARTA · INDONESIA</span>
      </div>
    </footer>
  )
}

function DragonLine() {
  return (
    <svg
      className="dragon-line"
      viewBox="0 0 520 540"
      fill="none"
      aria-hidden="true"
    >
      <path d="M56 488c68-35 127-97 129-171 2-67-61-92-87-45-25 45 24 94 88 76 115-32 81-172 172-216 55-26 122 13 97 73-22 55-99 34-94-24 5-55 74-81 125-59" />
      <path d="M339 114c33-29 67-39 106-24l-19 22 35 12-39 16m-83-26-33-24 9 37-38-2 35 27" />
      <path d="M138 366c-51 30-75 70-77 119m83-129c-66 6-108-9-133-45m190-2c30 12 51 38 63 77m-49-107c46-6 88 8 125 43" />
      <circle cx="408" cy="111" r="4" fill="currentColor" />
    </svg>
  )
}

/** Team page poster card: burgundy ground → spirit → shade → portrait → text. Whole card is the link. */
function TeamMemberCard({
  member,
  role,
  onLink,
}: {
  member: Member
  role?: string
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const href = `/team/${member.slug}`
  const t = member.teamCard
  const vars = {
    "--portrait-w": `${t.portraitScale}%`,
    "--portrait-x": `${t.portraitOffsetX}%`,
    "--portrait-y": `${t.portraitOffsetY}%`,
    "--art-w": `${t.artworkScale}%`,
    "--art-x": `${t.artworkOffsetX}%`,
    "--art-y": `${t.artworkOffsetY}%`,
  } as React.CSSProperties
  return (
    <a className={`team-card team-card--${member.slug}`} href={href} onClick={onLink(href)} style={vars}>
      <SpiritBackdrop spirit={member.spirit} className="team-card__spirit" />
      <span className="team-card__glow" aria-hidden="true" />
      <img
        className="team-card__portrait"
        src={member.portrait}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        decoding="async"
      />
      <span className="team-card__shade" aria-hidden="true" />
      <span className="team-card__info">
        <span className="team-card__headline">
          <span className="team-card__name">{member.name}</span>
          <span className="team-card__kanji" lang="ja" aria-hidden="true">
            {member.spirit.kanji}
          </span>
        </span>
        {role && <span className="team-card__role">{role}</span>}
        <span className="team-card__phrase">{member.spirit.meaning}</span>
        <span className="sr-only">View profile</span>
      </span>
    </a>
  )
}

/** Decorative spirit illustration placed behind a member portrait. */
function SpiritBackdrop({ spirit, className }: { spirit: MemberSpirit; className: string }) {
  return (
    <img
      className={className}
      src={spirit.image}
      width={spirit.width}
      height={spirit.height}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  )
}

/** Small editorial label: "The Koi — Perseverance & Ambition" (creative symbolism). */
function SpiritLabel({ spirit }: { spirit: MemberSpirit }) {
  return (
    <p className="spirit-label">
      <span>The {spirit.name}</span>
      <small>{spirit.meaning}</small>
    </p>
  )
}

function MemberPortrait({ member }: { member: Member }) {
  return (
    <div className={`portrait portrait--${member.index}`}>
      <img
        src={member.portrait}
        alt={`Portrait of ${member.name}`}
        loading={member.index === "01" ? "eager" : "lazy"}
      />
    </div>
  )
}

function TeamLineup({
  onLink,
  condensed = false,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
  condensed?: boolean
}) {
  return (
    <div className={condensed ? "lineup lineup--condensed" : "lineup"}>
      {members.map((member, index) => (
        <a
          href={`/team/${member.slug}`}
          onClick={onLink(`/team/${member.slug}`)}
          className={`member-panel member-panel--${member.slug}`}
          key={member.slug}
          style={{ "--panel-index": index } as React.CSSProperties}
        >
          <div className="member-panel__pattern" />
          {/* Layer 2–3: spirit illustration + crimson blend (decorative) */}
          <img
            className="member-panel__spirit"
            src={member.spirit.image}
            width={member.spirit.width}
            height={member.spirit.height}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <div className="member-panel__blend" aria-hidden="true" />
          <span className="member-panel__name">{member.name}</span>
          <span className="member-panel__view">
            View contributions <Arrow diagonal />
          </span>
          <MemberPortrait member={member} />
        </a>
      ))}
    </div>
  )
}

function SectionIntro({
  label,
  title,
  copy,
}: {
  label: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow">{label}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function ProjectVisual({ tone, label }: { tone: string; label: string }) {
  return (
    <div
      className={`project-visual project-visual--${tone}`}
      aria-label={label}
    >
      <div className="project-visual__frame">
        <span>R / {label}</span>
        <strong>
          CASE
          <br />
          STUDY
        </strong>
        <i />
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  featured = false,
  onLink,
}: {
  project: typeof projectSlots[number]
  featured?: boolean
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <article
      className={
        featured ? "project-card project-card--featured" : "project-card"
      }
    >
      <a
        href="/projects/project-title"
        onClick={onLink("/projects/project-title")}
      >
        <ProjectVisual tone={project.tone} label={project.number} />
      </a>
      <div className="project-card__meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-card__footer">
        <span>{project.contributors}</span>
        <a
          className="text-link"
          href="/projects/project-title"
          onClick={onLink("/projects/project-title")}
        >
          View case study <Arrow diagonal />
        </a>
      </div>
    </article>
  )
}

function EditorialHeading({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <div className="editorial-heading reveal">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  )
}

function ProjectMockup({ kind }: { kind: string }) {
  if (kind === "kurasu") {
    return (
      <div className="cinema-mockup cinema-mockup--kurasu" aria-hidden="true">
        <span className="mockup-sun" />
        <div className="mock-phone mock-phone--left">
          <div className="mock-screen">
            <i />
            <b>KURASU</b>
            <span />
            <span />
          </div>
        </div>
        <div className="mock-phone mock-phone--right">
          <div className="mock-screen">
            <i />
            <b>EVENTS</b>
            <span />
            <span />
          </div>
        </div>
      </div>
    )
  }

  if (kind === "aozora") {
    return (
      <div className="cinema-mockup cinema-mockup--aozora" aria-hidden="true">
        <span className="mockup-sun" />
        <div className="mock-desktop">
          <div className="mock-screen">
            <b>AOZORA / OVERVIEW</b>
            <div className="mock-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cinema-mockup cinema-mockup--nomori" aria-hidden="true">
      <span className="mockup-sun" />
      <div className="mock-laptop">
        <div className="mock-screen">
          <b>NOMORI / TODAY</b>
          <div className="mock-dashboard">
            <i />
            <i />
            <i />
          </div>
          <span />
          <span />
        </div>
      </div>
      <div className="mock-phone">
        <div className="mock-screen">
          <b>FOCUS</b>
          <i />
          <span />
        </div>
      </div>
    </div>
  )
}

function ShowcaseProjectCard({
  project,
  onLink,
  role,
}: {
  project: ShowcaseProject
  onLink: ReturnType<typeof useRouter>["onLink"]
  /** Verified individual role, shown only when provided. */
  role?: string
}) {
  return (
    <article
      className={`showcase-card ${
        project.featured ? "showcase-card--featured" : ""
      } ${project.coverImage ? "showcase-card--cover" : ""}`}
    >
      <a
        className="showcase-card__visual"
        href={project.caseStudyUrl}
        onClick={onLink(project.caseStudyUrl)}
        aria-label={
          project.coverImage
            ? `Explore the ${project.title} case study`
            : `View ${project.title} placeholder case study`
        }
      >
        {project.featured && (
          <span className="showcase-card__featured">Featured project</span>
        )}
        {project.coverImage ? (
          <img
            className="showcase-card__cover"
            src={project.coverImage}
            alt={project.coverAlt ?? ""}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ProjectMockup kind={project.mockup} />
        )}
      </a>
      <div className="showcase-card__content">
        <div className="showcase-card__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        {project.quote && (
          <p className="showcase-card__quote">“{project.quote}”</p>
        )}
        <p>{project.description}</p>
        <div className="showcase-card__tags">
          {project.contributions.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {role && (
          <p className="showcase-card__role">
            <small>Contribution</small>
            {role}
          </p>
        )}
        {project.achievement && (
          <p className="showcase-card__award">{project.achievement}</p>
        )}
        {project.tech.length > 0 && (
          <div className="showcase-card__tech">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
        <a
          className="showcase-card__link"
          href={project.caseStudyUrl}
          onClick={onLink(project.caseStudyUrl)}
        >
          {project.ctaLabel ?? "View case study"} <Arrow diagonal />
        </a>
      </div>
    </article>
  )
}

function HomeProjectsSection({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const categories = [
    "All Projects",
    "Web Development",
    "UI/UX Design",
    "Mobile App",
    "Branding & Identity",
    "AI & Technology",
  ]
  const [activeCategory, setActiveCategory] = useState("All Projects")
  const visibleProjects = showcaseProjects.filter(
    (project) =>
      activeCategory === "All Projects" ||
      project.filters.includes(activeCategory),
  )

  return (
    <section className="section showcase-section" id="selected-work">
      <EditorialHeading
        label="01 / OUR WORK"
        title="SELECTED PROJECTS."
        description="A showcase of ideas, designs, and digital solutions we’ve built as a collective."
      />
      <p className="placeholder-note">
        PHARVIA is a real team project. NOMORI, KURASU, and AOZORA are concept
        placeholders — not verified projects or achievements.
      </p>
      <div className="showcase-filters" aria-label="Filter selected projects">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "active" : ""}
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      {visibleProjects.length > 0 ? (
        <div className="showcase-grid">
          {visibleProjects.map((project) => (
            <ShowcaseProjectCard
              key={project.id}
              project={project}
              onLink={onLink}
            />
          ))}
        </div>
      ) : (
        <div className="showcase-empty">
          No placeholder projects have been assigned to this category yet.
        </div>
      )}
    </section>
  )
}

function ExpertiseSection() {
  return (
    <section className="section expertise-section">
      <EditorialHeading
        label="02 / OUR EXPERTISE"
        title="TOOLS & SPECIALIZATIONS."
        description="The tools we use and the areas we focus on to turn ideas into real digital experiences."
      />
      <div className="expertise-grid">
        <Specializations />
        <ToolsGrid />
      </div>
    </section>
  )
}

function ContactCta({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <section className="contact-cta">
      <span className="contact-cta__seal">
        共創
        <br />
        <small>CREATE TOGETHER</small>
      </span>
      <p className="eyebrow">START A CONVERSATION</p>
      <h2>
        LET’S CREATE
        <br />
        <em>SOMETHING</em> LEGENDARY.
      </h2>
      <p>Have an idea worth building? Let’s make it real.</p>
      <a
        className="brush-button brush-button--light"
        href="/contact"
        onClick={onLink("/contact")}
      >
        Get in touch <Arrow diagonal />
      </a>
    </section>
  )
}

function HomePage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <>
      <section className="hero">
        <div className="hero__title">
          <h1 className="hero__heading">
            <img
              className="hero__logo"
              src={brand.heroGraphic.src}
              width={brand.heroGraphic.width}
              height={brand.heroGraphic.height}
              alt={`Welcome to ${brand.title}`}
              fetchPriority="high"
            />
          </h1>
          <h2>Four Minds. One Collective. Endless Possibilities.</h2>
          <p>
            Meet the creative minds behind Kelompok 5 and explore the ideas,
            innovations, and digital experiences we’ve built together.
          </p>
        </div>
        <div className="hero__team-stage">
          <TeamLineup onLink={onLink} />
          <div className="hero__banner">
            <span>Four individuals, one shared vision.</span>
          </div>
        </div>
        <a href="#selected-work" className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <Arrow />
        </a>
      </section>

      <HomeProjectsSection onLink={onLink} />
      <ExpertiseSection />

      <section className="section statement-section">
        <div className="statement-section__mark">四</div>
        <span className="eyebrow">03 / THE COLLECTIVE</span>
        <blockquote>
          “We don’t just build products. We shape <em>ideas</em> into
          experiences with purpose.”
        </blockquote>
        <a className="text-link" href="/team" onClick={onLink("/team")}>
          Meet the four minds <Arrow diagonal />
        </a>
      </section>

      <section className="section minds-preview">
        <SectionIntro
          label="MEET KELOMPOK 5"
          title="THE MINDS BEHIND KELOMPOK 5."
          copy="Four perspectives, united by curiosity and a shared commitment to thoughtful digital craft."
        />
        <TeamLineup onLink={onLink} condensed />
      </section>

      <ContactCta onLink={onLink} />
    </>
  )
}

function InnerHero({
  index,
  eyebrow,
  title,
  italic,
  copy,
}: {
  index: string
  eyebrow: string
  title: string
  italic?: string
  copy: string
}) {
  return (
    <section className="inner-hero">
      <DragonLine />
      <span className="inner-hero__index">{index}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h1>
        {title}
        {italic && (
          <>
            <br />
            <em>{italic}</em>
          </>
        )}
      </h1>
      <p>{copy}</p>
    </section>
  )
}

function ProjectsPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const categories = [
    "All Projects",
    "Web Development",
    "UI / UX Design",
    "AI & Technology",
    "Startup Innovation",
    "Research",
  ]
  const [active, setActive] = useState(categories[0])
  const pharvia = showcaseProjects[0]
  const amanin = showcaseProjects[1]
  const showPharvia = ["All Projects", "UI / UX Design", "Startup Innovation"].includes(active)
  const showAmanin = ["All Projects", "AI & Technology", "Startup Innovation"].includes(active)
  const slotCount = projectSlots.filter(
    (p) => active === "All Projects" || p.category === active,
  ).length
  const total = slotCount + (showPharvia ? 1 : 0) + (showAmanin ? 1 : 0)
  return (
    <>
      <InnerHero
        index="01"
        eyebrow="PROJECT ARCHIVE"
        title="SELECTED"
        italic="WORKS."
        copy="A curated archive of ideas, systems, and digital experiences. Project details remain editable until verified."
      />
      <main className="section archive">
        <div className="filter-row" aria-label="Project categories">
          {categories.map((category) => (
            <button
              className={active === category ? "active" : ""}
              onClick={() => setActive(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="archive__count">
          <span>Showing</span>
          <strong>{total > 0 ? String(total).padStart(2, "0") : "—"}</strong>
          <span>{active}</span>
        </div>
        {showPharvia && (
          <div className="archive__featured">
            <ShowcaseProjectCard project={pharvia} onLink={onLink} />
          </div>
        )}
        {showAmanin && (
          <div className="archive__featured">
            <ShowcaseProjectCard project={amanin} onLink={onLink} />
          </div>
        )}
        <div className="projects-grid">
          {projectSlots
            .filter(
              (project) =>
                active === "All Projects" || project.category === active,
            )
            .map((project, i) => (
              <ProjectCard
                key={project.number}
                project={project}
                featured={i === 0}
                onLink={onLink}
              />
            ))}
        </div>
        {total === 0 && (
            <div className="empty-state">
              No verified projects have been added to this category yet.
            </div>
          )}
      </main>
      <ContactCta onLink={onLink} />
    </>
  )
}

function CaseStudyPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <>
      <section className="case-hero">
        <div className="case-hero__meta">
          <span>WEB DEVELOPMENT</span>
          <span>20—</span>
        </div>
        <span className="eyebrow">CASE STUDY / 01</span>
        <h1>
          PROJECT
          <br />
          <em>TITLE PENDING.</em>
        </h1>
        <p>
          A cinematic case-study framework ready for the project’s verified
          story, screens, and outcomes.
        </p>
        <ProjectVisual tone="signal" label="01" />
      </section>
      <main className="case-content">
        <aside>
          <span>INDEX</span>
          <a href="#overview">Overview</a>
          <a href="#challenge">The challenge</a>
          <a href="#process">The process</a>
          <a href="#solution">The solution</a>
          <a href="#outcomes">Outcomes</a>
        </aside>
        <div className="case-story">
          <StorySection number="01" title="PROJECT OVERVIEW" id="overview">
            <p>
              Add a concise, verified description of the project, who it serves,
              and why it matters. This space is intentionally left as an
              editable editorial template.
            </p>
            <div className="facts">
              <span>
                <small>YEAR</small>20—
              </span>
              <span>
                <small>CATEGORY</small>To be confirmed
              </span>
              <span>
                <small>CONTRIBUTORS</small>To be confirmed
              </span>
            </div>
          </StorySection>
          <StorySection number="02" title="THE CHALLENGE" id="challenge">
            <p>
              Document the real problem, constraints, and context here. Avoid
              assumptions—replace this copy once the team has approved the final
              project narrative.
            </p>
          </StorySection>
          <div className="case-quote">“Verified insight belongs here.”</div>
          <StorySection number="03" title="THE PROCESS" id="process">
            <div className="process-grid">
              {["Research", "Ideation", "Design", "Development", "Testing"].map(
                (item, index) => (
                  <span key={item}>
                    <b>0{index + 1}</b>
                    {item}
                  </span>
                ),
              )}
            </div>
          </StorySection>
          <StorySection number="04" title="THE SOLUTION" id="solution">
            <p>
              Use this chapter for product screens, feature explanations, and
              design decisions. The frame below is ready for an approved
              interface capture.
            </p>
            <ProjectVisual tone="grid" label="SCREEN PLACEHOLDER" />
          </StorySection>
          <StorySection number="05" title="TECHNOLOGY STACK">
            <div className="stack-list">
              {["Technology", "Framework", "Platform", "Tooling"].map(
                (item) => (
                  <span key={item}>
                    {item}
                    <small>TO BE CONFIRMED</small>
                  </span>
                ),
              )}
            </div>
          </StorySection>
          <StorySection number="06" title="OUTCOMES" id="outcomes">
            <p>
              Verified deliverables, results, and achievements will appear here.
              No performance claims have been invented.
            </p>
          </StorySection>
        </div>
      </main>
      <a
        className="next-project"
        href="/projects/project-title"
        onClick={onLink("/projects/project-title")}
      >
        <span className="eyebrow">NEXT PROJECT / 02</span>
        <strong>CONTINUE THE STORY</strong>
        <Arrow diagonal />
      </a>
    </>
  )
}

function StorySection({
  number,
  title,
  id,
  children,
}: {
  number: string
  title: string
  id?: string
  children: ReactNode
}) {
  return (
    <section className="story-section" id={id}>
      <span>{number}</span>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

function TeamPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <>
      <InnerHero
        index="02"
        eyebrow="MEET THE COLLECTIVE"
        title="FOUR MINDS."
        italic="ONE VISION."
        copy="Different disciplines. Shared curiosity. A collective built around making meaningful digital work together."
      />
      <main className="section team-page team-gallery">
        {/* Decorative layers (original vector artwork) */}
        <img className="team-gallery__temple" src="/assets/team/decorations/japanese-temple.svg" alt="" aria-hidden="true" />
        <img className="team-gallery__sakura team-gallery__sakura--tl" src="/assets/team/decorations/sakura-top-left.svg" alt="" aria-hidden="true" />
        <img className="team-gallery__sakura team-gallery__sakura--br" src="/assets/team/decorations/sakura-bottom-right.svg" alt="" aria-hidden="true" />
        <span className="team-gallery__waves" aria-hidden="true" />

        <header className="team-gallery__head">
          <div className="team-gallery__title">
            <span className="team-gallery__jp" lang="ja">チーム</span>
            <h2>
              Our <em>Team</em>
            </h2>
          </div>
          <p>
            The minds behind Kelompok 5 — four creators uniting strategy, design, and technology to build
            meaningful digital experiences.
          </p>
        </header>
        <ul className="team-cards">
          {members.map((member) => (
            <li key={member.slug}>
              <TeamMemberCard member={member} role={memberProfiles[member.slug]?.cardRole} onLink={onLink} />
            </li>
          ))}
        </ul>
      </main>
      <ContactCta onLink={onLink} />
    </>
  )
}

function MemberPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const slug = window.location.pathname.split("/").pop()
  const member = members.find((item) => item.slug === slug) ?? members[0]

  const profile = memberProfiles[member.slug]
  if (profile) {
    const firstName = profile.name.split(" ")[0]
    const ravenProjects = showcaseProjects.filter((p) =>
      p.contributors.includes(profile.name),
    )
    return (
      <>
        <MemberProfile
          key={member.slug}
          data={profile}
          portrait={member.portrait}
          spirit={member.spirit}
          memberIndex={member.index}
          onLink={onLink}
        />
        <main className="section profile-content rz-work">
          <SectionIntro
            label="SELECTED CONTRIBUTIONS"
            title="WORK WITH KELOMPOK 5."
            copy={`Kelompok 5 projects ${firstName} has contributed to, drawn from the collective's project archive.`}
          />
          {ravenProjects.map((project) => (
            <ShowcaseProjectCard
              key={project.id}
              project={project}
              role={profile.ravenRoles[project.id]}
              onLink={onLink}
            />
          ))}
        </main>
        <ContactCta onLink={onLink} />
      </>
    )
  }

  return (
    <>
      <section className="profile-hero">
        <div className="profile-hero__letter">{member.mark}</div>
        <SpiritBackdrop spirit={member.spirit} className={`profile-hero__spirit profile-hero__spirit--${member.slug}`} />
        <div className="profile-hero__portrait">
          <MemberPortrait member={member} />
        </div>
        <div className="profile-hero__copy">
          <span className="eyebrow">KELOMPOK 5 MEMBER / {member.index}</span>
          <h1>{member.name}</h1>
          <SpiritLabel spirit={member.spirit} />
          <p>Role and expertise to be confirmed</p>
          <div className="profile-social">
            <a href="#github">
              GitHub <Arrow diagonal />
            </a>
            <a href="#linkedin">
              LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>
      <main className="section profile-content">
        <div className="profile-content__intro">
          <span>PROFILE</span>
          <h2>
            A CREATIVE PROFILE
            <br />
            READY FOR <em>THEIR STORY.</em>
          </h2>
          <p>
            This biography space is intentionally held for member-approved copy.
            Add their background, perspective, and creative approach without
            inventing personal details.
          </p>
        </div>
        <div className="profile-details">
          <div>
            <span>EXPERTISE</span>
            <p>
              To be confirmed
              <br />
              To be confirmed
              <br />
              To be confirmed
            </p>
          </div>
          <div>
            <span>CONTRIBUTIONS</span>
            <p>
              Project involvement and specific responsibilities will be listed
              after verification.
            </p>
          </div>
        </div>
        <SectionIntro label="SELECTED CONTRIBUTIONS" title="WORK WITH KELOMPOK 5." />
        <ProjectCard project={projectSlots[0]} featured onLink={onLink} />
      </main>
      <ContactCta onLink={onLink} />
    </>
  )
}

function AchievementCrownIcon({ variant }: { variant: "gold" | "silver" | "bronze" }) {
  const color = variant === "gold" ? "#b58b62" : variant === "silver" ? "#b8b8c5" : "#cd7f32"
  return (
    <svg
      className="ach-entry__crown"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 22 8 10l8 8 8-8 4 12H4z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <path d="M3 24h26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="10" r="2" fill={color} />
      <circle cx="16" cy="18" r="2" fill={color} />
      <circle cx="24" cy="10" r="2" fill={color} />
    </svg>
  )
}

function AchievementsPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  return (
    <>
      <InnerHero
        index="03"
        eyebrow="OUR JOURNEY"
        title="FORGED THROUGH"
        italic="EXPERIENCE."
        copy="The real moments, milestones, and achievements that shaped Kelompok 5."
      />

      {/* Achievement summary ticker */}
      <div className="ach-summary">
        <div className="ach-summary__stat reveal">
          <strong>{String(achievementSummary.total).padStart(2, "0")}</strong>
          <span>Competition Awards</span>
        </div>
        <div className="ach-summary__divider" aria-hidden="true" />
        <div className="ach-summary__stat reveal" style={{ transitionDelay: "80ms" }}>
          <strong>{String(achievementSummary.firstPlace).padStart(2, "0")}</strong>
          <span>First Place</span>
        </div>
        <div className="ach-summary__divider" aria-hidden="true" />
        <div className="ach-summary__stat reveal" style={{ transitionDelay: "160ms" }}>
          <strong>{String(achievementSummary.secondPlace).padStart(2, "0")}</strong>
          <span>Second Place</span>
        </div>
      </div>

      {/* Achievement timeline */}
      <main className="ach-timeline">
        {collectiveAchievements.map((ach, i) => (
          <article
            key={ach.id}
            className={`ach-entry ach-entry--${ach.accentVariant}${i % 2 === 1 ? " ach-entry--flip" : ""}`}
          >
            {/* Text */}
            <div className="ach-entry__text reveal">
              <span className="ach-entry__milestone">
                MILESTONE / {String(i + 1).padStart(2, "0")}
              </span>
              <div className="ach-entry__rank">
                <AchievementCrownIcon variant={ach.accentVariant} />
                <strong>{ach.rankDisplay}</strong>
              </div>
              <h2 className="ach-entry__title">{ach.project}</h2>
              <div className="ach-entry__meta">
                <span>{ach.competition}</span>
                <span>{ach.event}</span>
                <span>{ach.organizer}</span>
                <span>{ach.date}</span>
              </div>
              <p className="ach-entry__desc">{ach.description}</p>
              <p className="ach-entry__team">Team · {ach.team}</p>
              <a
                className="ach-entry__cta"
                href={ach.caseStudyUrl}
                onClick={onLink(ach.caseStudyUrl)}
              >
                Explore {ach.project} <Arrow diagonal />
              </a>
            </div>

            {/* Timeline spine */}
            <div className="ach-spine" aria-hidden="true">
              <span className="ach-spine__dot" />
              <span className="ach-spine__line" />
            </div>

            {/* Photo */}
            <figure className="ach-entry__photo">
              {ach.image ? (
                <div className="ach-frame reveal ach-mask">
                  <img
                    src={ach.image.src}
                    width={ach.image.width}
                    height={ach.image.height}
                    alt={ach.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="ach-fallback reveal">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
                    <path d="M8 36 14 16l10 10 10-10 6 20H8z" />
                    <path d="M6 38h36" />
                    <circle cx="14" cy="16" r="3" fill="currentColor" />
                    <circle cx="24" cy="26" r="3" fill="currentColor" />
                    <circle cx="34" cy="16" r="3" fill="currentColor" />
                  </svg>
                  <p>Award documentation image — place in public/assets/achievements/ when available.</p>
                </div>
              )}
              <figcaption>{ach.imageCaption}</figcaption>
            </figure>
          </article>
        ))}
      </main>

      <ContactCta onLink={onLink} />
    </>
  )
}

function AboutPage({
  onLink,
}: {
  onLink: ReturnType<typeof useRouter>["onLink"]
}) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <InnerHero
        index="04"
        eyebrow="ABOUT KELOMPOK 5"
        title="FOUR MINDS."
        italic="ONE VISION."
        copy="Kelompok 5 is a multidisciplinary creative technology collective built on curiosity, craft, and collaboration."
      />
      <main>
        <section className="section about-statement">
          <DragonLine />
          <span className="eyebrow">OUR BELIEF</span>
          <h2>
            “We believe great ideas are built through <em>collaboration</em>,
            curiosity, and the courage to create.”
          </h2>
          <div>
            <p>
              We bring together different perspectives to make clear,
              meaningful, and memorable digital experiences.
            </p>
            <p>
              Our work spans design and technology, guided by a shared belief
              that the strongest solutions emerge when disciplines meet.
            </p>
          </div>
        </section>
        <section className="section principles">
          {[
            "Curiosity before convention.",
            "Collaboration over ego.",
            "Craft with intention.",
            "Technology with purpose.",
          ].map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
            </div>
          ))}
        </section>
        <section className="section contact-panel" id="contact">
          <div>
            <span className="eyebrow">LET’S TALK</span>
            <h2>
              HAVE AN IDEA
              <br />
              WORTH BUILDING?
            </h2>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <label>
              Name
              <input placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Project type
              <select defaultValue="">
                <option value="" disabled>
                  Select a focus
                </option>
                <option>Web Development</option>
                <option>UI / UX Design</option>
                <option>AI & Technology</option>
                <option>Research</option>
              </select>
            </label>
            <label>
              Tell us about it
              <textarea placeholder="What are you hoping to create?" rows={4} />
            </label>
            <button className="brush-button" type="submit">
              {submitted ? "Inquiry noted" : "Send inquiry"} <Arrow diagonal />
            </button>
            <p className="form-status" aria-live="polite">
              {submitted
                ? "Thank you. This prototype recorded the interaction locally; connect a delivery service before launch."
                : ""}
            </p>
          </form>
        </section>
      </main>
    </>
  )
}

export default function App() {
  const { route, onLink } = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.1 },
    )
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [route])

  const page =
    route === "projects" ? (
      <ProjectsPage onLink={onLink} />
    ) : route === "pharvia" ? (
      <PharviaCaseStudy onLink={onLink} />
    ) : route === "amanin" ? (
      <AmaninCaseStudy onLink={onLink} />
    ) : route === "project" ? (
      <CaseStudyPage onLink={onLink} />
    ) : route === "team" ? (
      <TeamPage onLink={onLink} />
    ) : route === "member" ? (
      <MemberPage onLink={onLink} />
    ) : route === "achievements" ? (
      <AchievementsPage onLink={onLink} />
    ) : route === "about" ? (
      <AboutPage onLink={onLink} />
    ) : (
      <HomePage onLink={onLink} />
    )

  return (
    <div className="app">
      <Header route={route} onLink={onLink} />
      {page}
      <Footer onLink={onLink} />
    </div>
  )
}
