// Rizky Sandi Pratama — profile content supplied by Rizky.
// Only include facts he has provided or that are documented (certificates, PHARVIA deck).
// LinkedIn (linkedin.com/in/rizksan) returned HTTP 999 to automated access and was not read.
// Dates are shown only where supplied.
import type { SpecializationIconName } from "../types/expertise"
import type { ProfileData } from "../types/profile"
import { pharviaAssets, pharviaProject } from "./pharvia"
import { rizkyAchievementsSorted } from "./rizkyAchievements"
import { rizkyKoiPortrait } from "./rizkyArtwork"

export const rizkyLinkedIn = "https://www.linkedin.com/in/rizksan/"

export const rizkyProfile = {
  name: "Rizky Sandi Pratama",
  headline: ["Creative Technologist.", "Product Strategist.", "Digital Innovator."],
  tagline: "Designing Ideas. Building Products. Creating Impact.",
  bio: [
    "I'm an Information Systems student at Telkom University Jakarta, passionate about bridging technology, design, and business strategy to create meaningful digital solutions.",
    "My interests span UI/UX design, web development, enterprise systems, digital product innovation, and strategic project management.",
    "Through academic projects, technology initiatives, organizational leadership, and innovation competitions, I continuously explore how ideas can be transformed into impactful digital experiences.",
  ],
}

export const rizkyExpertise: {
  number: string
  title: string
  copy: string
  icon: SpecializationIconName
}[] = [
  {
    number: "01",
    title: "UI/UX & Product Design",
    copy: "User research, wireframing, prototyping, interface design, and user-centered product development.",
    icon: "pen-tool",
  },
  {
    number: "02",
    title: "Web & Application Development",
    copy: "Responsive web development, frontend engineering, and application integration.",
    icon: "code",
  },
  {
    number: "03",
    title: "Business Strategy & Innovation",
    copy: "Business Model Canvas, market analysis, value proposition, product strategy, and digital innovation.",
    icon: "lightbulb",
  },
  {
    number: "04",
    title: "Project Management & Leadership",
    copy: "Project planning, team coordination, stakeholder collaboration, and organizational leadership.",
    icon: "kanban",
  },
  {
    number: "05",
    title: "Enterprise Systems & Business Analysis",
    copy: "Enterprise systems, business process analysis, ERP concepts, and data-driven decision-making.",
    icon: "database",
  },
]

const tool = (id: string, name: string) => ({ id, name, icon: `/assets/tools/${id}.svg` })

// Self-reported toolkit supplied by Rizky.
export const rizkyToolkit = [
  {
    group: "Design & Product",
    tools: [tool("figma", "Figma"), tool("canva", "Canva"), tool("photoshop", "Adobe Photoshop")],
  },
  {
    group: "Development",
    tools: [
      tool("vscode", "Visual Studio Code"),
      tool("react", "React"),
      tool("nextjs", "Next.js"),
      tool("go", "Go"),
      tool("laravel", "Laravel"),
      tool("mysql", "MySQL"),
    ],
  },
  {
    group: "Project Management",
    tools: [tool("jira", "Jira"), tool("trello", "Trello"), tool("microsoft-teams", "Microsoft Teams")],
  },
  {
    group: "Business & Enterprise",
    tools: [tool("sap", "SAP"), tool("excel", "Microsoft Excel"), tool("python", "Python")],
  },
]

export const rizkyExperience: {
  number: string
  role: string
  org: string
  date?: string
  copy: string
}[] = [
  {
    number: "01",
    role: "Chairman, HIMSI",
    org: "Telkom University Jakarta",
    date: "2026",
    copy: "Leading student organization initiatives, collaboration, and academic development.",
  },
  {
    number: "02",
    role: "Head of ERPIFY Laboratory",
    org: "Telkom University Jakarta",
    copy: "Coordinating enterprise systems laboratory activities and assistant teams.",
  },
  {
    number: "03",
    role: "Teaching Assistant",
    org: "Enterprise Systems / ERP",
    copy: "Supporting student learning in enterprise technology and business systems.",
  },
  {
    number: "04",
    role: "Project Manager & Lead Developer",
    org: "Village Website Digitalization Project",
    copy: "Coordinating a collaborative digital development initiative.",
  },
  {
    number: "05",
    role: "IT Development Internship",
    org: "BPJS Ketenagakerjaan",
    copy: "Contributing to the development of an API Developer Portal with React and Go.",
  },
]

const pharviaRole =
  pharviaProject.contributors.find((c) => c.name === rizkyProfile.name)?.role ?? "Project Involvement"

export type RizkyProject = ProfileData["projects"]["items"][number]

// Roles follow the competition records; a project with several competitions lists each role.
export const rizkyProjects: RizkyProject[] = [
  {
    id: "pharvia",
    title: "PHARVIA",
    summary: "Digital Pharmaceutical Take-Back & Traceability Platform · Team Halte Terminal Corruscant",
    role: `${pharviaRole} — as documented in the PHARVIA presentation`,
    achievement: "1st Place — USK Pharmacy Fair 2026",
    caseStudyUrl: "/projects/pharvia",
  },
  {
    id: "pasarakar",
    title: "PasarAkar",
    summary: "Offline-first agritech super-app integrating BUMDes, AI price prediction, and micro-financing for rural farmers.",
    role: "Chief Financial Officer (CFO)",
    achievement: "1st Place + Best Presentation — NACOPS 7.0",
  },
  {
    id: "aether",
    title: "AETHER",
    summary: "Emotion AI smart necklace that releases personalized fragrances based on biometric stress levels.",
    role: "CFO & Business Strategist (DIGITEX 2026) · CTO & Product Development (IBSC 2026)",
    achievement: "Silver Award — DIGITEX 2026 · 3rd Place — IBSC 2026",
  },
  {
    id: "astraloka",
    title: "AstraLoka",
    summary: "AI-driven smart eco-cultural travel planner.",
    role: "Chief Financial Officer (CFO)",
    achievement: "2nd Place — Diponegoro Economics Project 2026",
  },
  {
    id: "sobatambis",
    title: "SobatAmbis",
    summary: "National Business Model Canvas competition entry — “Future-Proof Business.”",
    role: "Team Leader",
    achievement: "1st Place — Semar Entrepreneur 2025",
  },
  {
    id: "kenicare",
    title: "KENICARE",
    summary: "Startup venture recognised at the Klikstart Startup Competition 2025, Bandung Techno Park.",
    achievement: "2nd Place — Klikstart 2025",
  },
  {
    id: "bpjs-api-portal",
    title: "BPJS Ketenagakerjaan API Developer Portal",
    summary: "API service portal development using React and Go.",
    role: "IT Development Intern",
  },
  { id: "smartjel", title: "SMARTJEL", summary: "IoT-enabled used cooking oil collection ecosystem." },
]

export const rizkyPhilosophy = {
  quote: "Great ideas deserve to become meaningful solutions.",
  support:
    "Technology creates possibilities. Design makes them accessible. Strategy turns them into impact.",
}

// ---- Adapter for the shared MemberProfile component ----

export const rizkyProfileData: ProfileData = {
  name: rizkyProfile.name,
  heroKanji: "創",
  headline: rizkyProfile.headline,
  tagline: rizkyProfile.tagline,
  bio: rizkyProfile.bio,
  affiliation: "Telkom University Jakarta",
  cardRole: "Product Strategy · Business Innovation · UI/UX",
  heroArtwork: {
    src: rizkyKoiPortrait,
    alt: "Rizky Sandi Pratama in a formal suit with a dark crimson Japanese koi illustration and antique gold frame.",
  },
  links: [{ label: "LinkedIn", href: rizkyLinkedIn }],
  expertise: { label: "Core Expertise", title: "Where Creativity Meets Strategy.", kanji: "専門", items: rizkyExpertise },
  toolkit: {
    label: "Tools & Technologies",
    title: "The Personal Toolkit.",
    kanji: "道具",
    note: "Tools used across projects, coursework, and internships — a toolkit, not a ranking of proficiency.",
    groups: rizkyToolkit,
  },
  experience: {
    label: "Experience & Leadership",
    title: "Experience That Shapes Ideas.",
    kanji: "経験",
    items: rizkyExperience,
  },
  projects: { label: "Selected Projects", title: "Ideas Brought to Life.", kanji: "作品", items: rizkyProjects },
  showcase: {
    label: "Recognition / 2025—2026",
    title: "Beyond the Competition.",
    subtitle: "Seven Milestones. Countless Lessons. One Journey of Innovation.",
    kanji: "栄誉",
    items: rizkyAchievementsSorted,
  },
  gallery: {
    label: "Achievement Gallery",
    title: "Behind Every Milestone.",
    kanji: "記録",
    items: [
      {
        ...pharviaAssets.award,
        featured: true,
        category: "Achievements",
        caption: "PHARVIA — 1st Place, Business Model Canvas Competition, USK Pharmacy Fair 2026.",
        alt: "Award announcement for the Business Model Canvas competition, Juara 1, beside a photo of the certificate presentation.",
      },
      {
        ...pharviaAssets.team,
        category: "Teamwork",
        caption: "Team Halte Terminal Corruscant with their PHARVIA certificates.",
        alt: "The three PHARVIA team members in maroon Telkom University blazers, two holding 1st-place certificates and one holding a tablet showing PHARVIA.",
      },
      {
        src: pharviaAssets.cover.src,
        width: pharviaAssets.cover.width,
        height: pharviaAssets.cover.height,
        category: "Projects",
        caption: "PHARVIA app mockups — Homepage, Pharvia Scan, and Pharvia Point.",
        alt: "PHARVIA app mockups showing the Homepage, Pharvia Scan, and Pharvia Point screens.",
      },
    ],
  },
  philosophy: { label: "Beyond Ideas", kanji: "志", ...rizkyPhilosophy },
  ravenRoles: { pharvia: `${pharviaRole} — as documented in the PHARVIA presentation` },
}
