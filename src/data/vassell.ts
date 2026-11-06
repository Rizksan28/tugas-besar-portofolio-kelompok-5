// Vassell Enha Atthayya — verified profile content.
//
// Sources (LinkedIn returned HTTP 999 to automated access, so it was not read directly):
//  [B] The user's brief (from Vassell's LinkedIn/CV): positions, periods, descriptions, tools.
//  [P] Vassell's "Profil Profesional Digital" document (their own LinkedIn About draft,
//      lab assistant role, credentials, AMANIN portfolio entry).
//  [R] RISE 2026 evidence: Juara 2 certificate (17 Sep – 11 Oct 2026) + AMANIN pitch-deck cover
//      listing Vassell as CFO of team Halte Terminal Rawamangun.
//  [U] USK Pharmacy Fair 2026 evidence + certificate (1st Place, Business Model Canvas, PHARVIA).
//  [D] PHARVIA competition deck (lists Vassell as CFO of Halte Terminal Corruscant).
// Anything not in these sources is intentionally left out — see `vassellUnverified`.
import type { ProfileData } from "../types/profile"
import { pharviaAssets, pharviaProject } from "./pharvia"

const tool = (id: string, name: string, icon = true) => ({
  id,
  name,
  icon: icon ? `/assets/tools/${id}.svg` : undefined,
})

const media = "/assets/team/vassell"

const pharviaRole =
  pharviaProject.contributors.find((c) => c.name === "Vassell Enha Atthayya")?.role ?? ""

export const vassellLinkedIn = "https://www.linkedin.com/in/vassell-enha-atthayya-182661323/"

export const vassellProfileData: ProfileData = {
  name: "Vassell Enha Atthayya",
  heroKanji: "築",
  // Editorial positioning [B] — not official employment titles.
  headline: ["Fullstack Developer.", "Cloud Engineer.", "UI/UX Designer."],
  tagline: "Building Systems. Designing Experiences. Delivering Solutions.",
  statement:
    "Bridging software engineering, cloud infrastructure, and user-centered design to build practical digital solutions.",
  // Draft [B], refined with [P] (Telkom University; Enterprise Helpdesk 2.0) and the HIMSI roles [B].
  bio: [
    "I'm an Information Systems student at Telkom University with a strong interest in fullstack development, system analysis, and user experience design.",
    "My experience spans enterprise application development — building Enterprise Helpdesk 2.0 at PT Adhi Karya (Persero) Tbk — organizational website projects with HIMSI, business process modeling, and collaborative digital initiatives.",
    "I enjoy transforming complex requirements into structured, functional, and user-friendly systems while continuously exploring new technologies and creative approaches.",
  ],
  affiliation: "Telkom University",
  // Team-card role follows the profile headline, so edits there carry over automatically.
  get cardRole() {
    return this.headline.map((h) => h.replace(/\.$/, "")).join(" · ")
  },
  links: [{ label: "LinkedIn", href: vassellLinkedIn }],

  expertise: {
    label: "Technical Expertise",
    title: "Engineering Ideas Into Systems.",
    kanji: "技術",
    items: [
      {
        number: "01",
        title: "Fullstack Web Development",
        copy: "React.js, Laravel, JavaScript, PHP, MySQL, HTML, CSS, and Tailwind CSS.",
        icon: "code",
        evidence: "Enterprise Helpdesk 2.0 · PT Adhi Karya",
      },
      {
        number: "02",
        title: "System Analysis & Business Process Modeling",
        copy: "System analysis, BPMN, UML diagrams, DFD, ERD, and business process documentation.",
        icon: "kanban",
        evidence: "IBM System Analyst certificate",
      },
      {
        number: "03",
        title: "UI/UX Design & Prototyping",
        copy: "User flows, wireframing, prototyping, interface design, and usability testing.",
        icon: "pen-tool",
        evidence: "AMANIN web interface · RISE 2026",
      },
      {
        number: "04",
        title: "Database & Application Architecture",
        copy: "Relational database design, SQL, MySQL, and application data structures.",
        icon: "database",
        evidence: "Enterprise Helpdesk 2.0 (MySQL)",
      },
      {
        number: "05",
        title: "Creative Documentation & Digital Media",
        copy: "Photography, graphic design, content creation, and digital publication.",
        icon: "camera",
        evidence: "Lead Photographer · WebVenture & Ramadhan Berbagi",
      },
    ],
  },

  toolkit: {
    label: "Tools & Technologies",
    title: "Built With.",
    kanji: "道具",
    note: "Tools named in Vassell's CV and project documentation — not a ranking of proficiency. Tools without a reliable official logo are shown as text.",
    groups: [
      {
        group: "Development",
        tools: [
          tool("vscode", "Visual Studio Code"),
          tool("react", "React"),
          tool("laravel", "Laravel"),
          tool("javascript", "JavaScript"),
          tool("php", "PHP"),
          tool("tailwindcss", "Tailwind CSS"),
          tool("mysql", "MySQL"),
          tool("git", "Git"),
          tool("github", "GitHub"),
          tool("sourcetree", "Sourcetree"),
          // Kept from the earlier verified profile (AMANIN deployment).
          tool("vercel", "Vercel"),
        ],
      },
      {
        group: "Design & Prototyping",
        tools: [tool("figma", "Figma"), tool("sketch", "Sketch"), tool("canva", "Canva")],
      },
      {
        group: "System Analysis",
        tools: [tool("drawio", "Draw.io"), tool("visual-paradigm", "Visual Paradigm")],
      },
      {
        group: "Project Collaboration",
        tools: [tool("jira", "Jira"), tool("slack", "Slack"), tool("google-workspace", "Google Workspace", false)],
      },
      { group: "Enterprise", tools: [tool("sap", "SAP")] },
    ],
  },

  experience: {
    label: "Experience",
    title: "Built Through Experience.",
    kanji: "経験",
    // Ordered by end date, newest first. Overlapping periods are intentional [B].
    items: [
      {
        number: "01",
        role: "Fullstack Developer Intern",
        org: "PT Adhi Karya (Persero) Tbk.",
        date: "Jun 2026 – Sep 2026",
        meta: ["4 months", "Hybrid", "Jakarta Metropolitan Area"],
        copy: "Developed Enterprise Helpdesk 2.0, an internal ticket management platform using React.js, Laravel, and MySQL — covering enterprise ticket management, role-based workflows, service catalog functionality, and approval processes.",
        related: "Project · Enterprise Helpdesk 2.0",
      },
      {
        number: "02",
        role: "Lead Photographer — WebVenture",
        org: "Himpunan Mahasiswa Sistem Informasi Jakarta",
        date: "Apr 2025 – Oct 2025",
        copy: "Led the Publication, Documentation, and Design activities for WebVenture, coordinating visual content production, event documentation, and digital publication materials.",
      },
      {
        number: "03",
        role: "Research and Development Staff",
        org: "Himpunan Mahasiswa Sistem Informasi Jakarta",
        date: "Jan 2024 – Oct 2025",
        copy: "Contributed to the development of the organization's website to improve information accessibility and digital engagement for students.",
        related: "Project · HIMSI Web Platform",
      },
      {
        number: "04",
        role: "Lead Photographer — Ramadhan Berbagi",
        org: "Himpunan Mahasiswa Sistem Informasi Jakarta",
        date: "Mar 2024 – Apr 2024",
        copy: "Coordinated event photography, shot planning, and documentation of the Ramadhan Berbagi community activity.",
      },
      {
        number: "05",
        role: "Enterprise System Laboratory Assistant",
        org: "Telkom University",
        copy: "Supporting practicum sessions, providing technical guidance, and helping students understand and implement enterprise systems.",
      },
      {
        number: "06",
        role: "Web Developer, Innovation Competitions",
        org: "National & international competitions",
        copy: "Building innovative applications and websites, focusing on interface development, feature implementation, and deployment.",
      },
      {
        number: "07",
        role: "Web Development & Cloud Computing",
        org: "Academic projects",
        copy: "Developing web applications, integrating systems, and applying cloud deployment and cloud-based application management.",
      },
    ],
    aside: [
      {
        title: "Education",
        items: [{ title: "Information Systems (Undergraduate)", detail: "Telkom University" }],
      },
      {
        title: "Credentials",
        items: [
          { title: "Internship Certificate", detail: "PT Adhi Karya (Persero) Tbk" },
          { title: "Enterprise System Laboratory Assistant Certificate" },
          { title: "System Analyst", detail: "IBM" },
          { title: "Project, Stakeholder, and Requirements" },
        ],
      },
    ],
  },

  projects: {
    label: "Project Contributions",
    title: "Projects & Contributions.",
    kanji: "作品",
    items: [
      {
        id: "helpdesk",
        title: "Enterprise Helpdesk 2.0",
        summary:
          "Enterprise Web Application · PT Adhi Karya (Persero) Tbk. Internal ticket management system with role-based workflows, service catalog, and approval functionality — React.js, Laravel, MySQL.",
        role: "Fullstack Developer Intern",
      },
      {
        id: "pharvia",
        title: "PHARVIA",
        summary:
          "HealthTech / Sustainability · Digital pharmaceutical take-back and traceability ecosystem · Team Halte Terminal Corruscant.",
        role: `${pharviaRole} — as documented in the PHARVIA presentation`,
        achievement: "1st Place — USK Pharmacy Fair 2026",
        caseStudyUrl: "/projects/pharvia",
      },
      {
        id: "amanin",
        title: "AMANIN",
        summary:
          "AI-powered anti-scam decision assistant · Team Halte Terminal Rawamangun · RISE 2026 Business Proposal Competition.",
        role: "CFO (pitch deck) · Web Developer — UI design, feature implementation, Vercel deployment",
        achievement: "2nd Place — RISE 2026",
        externalUrl: { label: "Live prototype", href: "https://mobile-webpage-amanin.vercel.app/" },
      },
      {
        id: "himsi-web",
        title: "HIMSI Web Platform",
        summary:
          "Web Development / Organizational Digitalization · Website supporting student organizational information, activities, and digital engagement.",
        role: "Research and Development Staff",
      },
    ],
  },

  showcase: {
    label: "Achievements & Awards",
    title: "Recognised on Stage.",
    subtitle: "Two competitions, two podium finishes — each with its original team.",
    kanji: "栄誉",
    items: [
      {
        id: "pharvia-usk-2026",
        awards: ["1st Place"],
        competition: "Business Model Canvas Competition — USK Pharmacy Fair 2026",
        organizer: "Universitas Syiah Kuala",
        date: "October 2026",
        sortDate: "2026-10-06",
        project: "PHARVIA",
        role: "Chief Financial Officer (CFO)",
        team: "Halte Terminal Corruscant",
        description:
          "Contributed to the PHARVIA business model and financial strategy as part of Halte Terminal Corruscant.",
        images: [
          {
            ...pharviaAssets.team,
            type: "team",
            category: "Team",
            alt: "The three PHARVIA team members in maroon Telkom University blazers, two holding 1st-place certificates and one holding a tablet showing PHARVIA.",
            caption: "PHARVIA team — Halte Terminal Corruscant with their certificates.",
          },
          {
            ...pharviaAssets.award,
            type: "announcement",
            category: "Winner Announcement",
            alt: "Award announcement for the Business Model Canvas competition, Juara 1 — Halte Terminal Corrusant, Telkom University, beside a photo of the certificate presentation.",
            caption: "Winner announcement — Lomba Business Model Canvas, Juara 1.",
          },
          {
            src: `${media}/achievements/pharvia-certificate.webp`,
            width: 1600,
            height: 1131,
            type: "certificate",
            category: "Certificate",
            alt: "Certificate awarded to Vassell Enha Atthayya: Juara 1 Lomba Business Model Canvas, USK Pharmacy Fair 2026, HIMAFAR FMIPA Universitas Syiah Kuala, 06–08 October 2026.",
            caption: "Certificate — Juara 1, Business Model Canvas, USK Pharmacy Fair 2026.",
          },
        ],
        relatedProjectUrl: "/projects/pharvia",
        featured: true,
      },
      {
        id: "amanin-rise-2026",
        awards: ["2nd Place"],
        competition: "Business Proposal Competition — RISE 2026",
        // Certificate: UKM HIPMI PT UPN "Veteran" Jawa Timur, 17 September – 11 October 2026.
        organizer: "HIPMI PT UPN “Veteran” Jawa Timur",
        date: "September 2026",
        sortDate: "2026-09-17",
        // Project and role verified from the RISE evidence (AMANIN pitch-deck cover) and [P].
        project: "AMANIN",
        role: "CFO (pitch deck) · Web Developer",
        team: "Halte Terminal Rawamangun",
        description:
          "Second place in the national Business Proposal Competition themed “From Vision to Venture,” with AMANIN — an AI-powered anti-scam decision assistant.",
        images: [
          {
            src: `${media}/achievements/rise-certificate.webp`,
            width: 1055,
            height: 747,
            type: "certificate",
            category: "Certificate",
            alt: "Certificate awarded to Vassell Enha Atthayya: Juara 2, Business Proposal Competition RISE 2026, held by UKM HIPMI PT UPN Veteran Jawa Timur, 17 September – 11 October 2026.",
            caption: "RISE 2026 Business Proposal Competition certificate — Juara 2.",
          },
        ],
        featured: true,
      },
    ],
  },

  gallery: {
    label: "Behind the Work",
    title: "Behind the Work.",
    kanji: "記録",
    // Only authentic media currently available. Development (Helpdesk) and Organizations
    // (WebVenture, Ramadhan Berbagi, HIMSI web) media were not located — categories hidden.
    items: [
      {
        ...pharviaAssets.team,
        featured: true,
        category: "Achievements",
        caption: "Team Halte Terminal Corruscant with their PHARVIA certificates.",
        alt: "The three PHARVIA team members in maroon Telkom University blazers holding certificates and a tablet showing PHARVIA.",
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

  ravenRoles: { pharvia: pharviaRole },
}

/** Kept out of the page until confirmed — listed here for maintainers. */
export const vassellUnverified = [
  "Live LinkedIn content (blocked to automated access)",
  "Full LinkedIn description for the Adhi Karya internship",
  "Media: Enterprise Helpdesk presentation imagery, WebVenture team documentation, HIMSI Web Platform screenshots, Ramadhan Berbagi photographs",
  "Date for the Enterprise System Laboratory Assistant role",
]
