// Evan Octavianus Haryo Handoko — profile content supplied by Evan.
// Source: "evan data.txt" provided by the user.
// AMANIN 2nd Place (RISE 2026) is cross-verified in Vassell's profile documentation
// (same team, Halte Terminal Rawamangun). All other facts are from the supplied text.
// Do not add experience dates, certifications, or achievements not present in the source.
import type { ProfileData } from "../types/profile"
import { pharviaProject } from "./pharvia"

const tool = (id: string, name: string, icon = true) => ({
  id,
  name,
  icon: icon ? `/assets/tools/${id}.svg` : undefined,
})

const pharviaRole =
  pharviaProject.contributors.find((c) => c.name === "Evan Octavianus Haryo Handoko")?.role ??
  "Project Involvement"

export const evanLinkedIn = "https://www.linkedin.com/in/evan-handoko-49670b314/"

export const evanProfileData: ProfileData = {
  name: "Evan Octavianus Haryo Handoko",
  heroKanji: "匠",
  headline: ["Web Developer.", "UI/UX Enthusiast.", "Digital Innovator."],
  tagline: "Designing Experiences. Developing Solutions. Building Impact.",
  bio: [
    "I'm an Information Systems student at Telkom University Jakarta with a background in Software Engineering, passionate about combining technology, design, and business to build meaningful digital solutions.",
    "My interests include web development, UI/UX design, enterprise systems, and digital product innovation, with a focus on creating user-centered experiences and practical technology solutions.",
    "Through academic projects, organizational experiences, and professional internship experience, I've developed skills in web development, project coordination, problem-solving, and teamwork.",
  ],
  affiliation: "Telkom University Jakarta",
  cardRole: "Web Development · UI/UX · Digital Innovation",
  links: [{ label: "LinkedIn", href: evanLinkedIn }],

  expertise: {
    label: "Core Expertise",
    title: "What I Bring to the Table.",
    kanji: "専門",
    items: [
      {
        number: "01",
        title: "UI/UX & Digital Design",
        copy: "Visual design, user interface design, prototyping, and creative content development focused on creating engaging digital experiences.",
        icon: "pen-tool",
      },
      {
        number: "02",
        title: "Web & Application Development",
        copy: "Web development, frontend implementation, backend development, database management, and API integration for web-based applications.",
        icon: "code",
      },
      {
        number: "03",
        title: "Data Analytics & Business Intelligence",
        copy: "Data processing, data visualization, business reporting, and analytical approaches to support better business insights and decision-making.",
        icon: "database",
      },
      {
        number: "04",
        title: "Project Management & Collaboration",
        copy: "Project planning, task management, team coordination, timeline monitoring, and collaborative workflows to support successful project delivery.",
        icon: "kanban",
      },
      {
        number: "05",
        title: "Enterprise Systems & Business Analysis",
        copy: "Understanding enterprise systems, business processes, system integration, and technology-driven approaches to improve organizational operations.",
        icon: "lightbulb",
      },
    ],
  },

  toolkit: {
    label: "Tools & Technologies",
    title: "The Personal Toolkit.",
    kanji: "道具",
    note: "Tools used across projects, coursework, and internships — a toolkit, not a ranking of proficiency. Tools without a reliable official logo are shown as text.",
    groups: [
      {
        group: "Design & Product",
        tools: [
          tool("figma", "Figma"),
          tool("canva", "Canva"),
          tool("photoshop", "Adobe Photoshop"),
          // No official Illustrator SVG available in project assets
          tool("illustrator", "Adobe Illustrator", false),
        ],
      },
      {
        group: "Development",
        tools: [
          tool("vscode", "Visual Studio Code"),
          // NetBeans: no SVG available, shown as text
          tool("netbeans", "NetBeans", false),
          tool("laravel", "Laravel"),
          // CodeIgniter: no SVG available, shown as text
          tool("codeigniter", "CodeIgniter", false),
          tool("mysql", "MySQL"),
        ],
      },
      {
        group: "Project Management",
        tools: [
          tool("jira", "Jira"),
          tool("microsoft-teams", "Microsoft Teams"),
        ],
      },
      {
        group: "Business & Enterprise",
        tools: [
          tool("sap", "SAP"),
          tool("python", "Python"),
          // Power BI: no SVG available, shown as text
          tool("power-bi", "Power BI", false),
          tool("excel", "Microsoft Excel"),
        ],
      },
    ],
  },

  experience: {
    label: "Experience",
    title: "Experience That Shapes the Work.",
    kanji: "経験",
    items: [
      {
        number: "01",
        role: "Web Development Intern",
        org: "PT Lintas Media Danawa",
        date: "2022",
        copy: "Developed an E-Recruitment web application and coordinated a small development team, ensuring project progress and delivery aligned with company requirements.",
      },
      {
        number: "02",
        role: "Team Captain — PAW & IAE",
        org: "Telkom University Jakarta",
        copy: "Led a team in developing web-based academic projects (Website Application Development and Enterprise Application Integration), coordinating task distribution, monitoring progress, and supporting application development and system integration.",
      },
      {
        number: "03",
        role: "Cybersecurity & Governance Intern",
        org: "PT Pertamina International Shipping",
        date: "2026",
        copy: "Assisted in preparing Risk Register (RR) documentation, developing a network node monitoring dashboard using Power BI, and compiling IKAS (IT-related) reports to support IT monitoring and governance activities.",
      },
    ],
  },

  projects: {
    label: "Selected Projects",
    title: "Ideas Brought to Life.",
    kanji: "作品",
    items: [
      {
        id: "pharvia",
        title: "PHARVIA",
        summary:
          "Digital Pharmaceutical Take-Back & Traceability Platform · Team Halte Terminal Corruscant. A digital ecosystem to facilitate the safe return, verification, and management of unused or expired household medicines.",
        role: `${pharviaRole} — as documented in the PHARVIA presentation`,
        // 1st Place verified in Vassell's data (same team) and in the PHARVIA case study.
        achievement: "1st Place — BMC Competition, Universitas Syiah Kuala",
        caseStudyUrl: "/projects/pharvia",
      },
      {
        id: "amanin",
        title: "AMANIN",
        summary:
          "AI-Powered Anti-Scam Decision Assistant · Team Halte Terminal Rawamangun · RISE 2026. Detects potential digital fraud, analyzes risk, and provides security recommendations through multimodal analysis and contextual cyber education.",
        role: "CTO",
        // 2nd Place cross-verified in Vassell's profile documentation (same team, same event).
        achievement: "2nd Place — BMC Competition, RISE UPN Veteran Jawa Timur",
        caseStudyUrl: "/projects/amanin",
      },
      {
        id: "foodease-easepay",
        title: "FOODEASE & EASEPAY",
        summary:
          "Enterprise Application Integration (IAE) · Telkom University Jakarta. An integrated food ordering and payment ecosystem featuring nutritional tracking and a microservice-based payment platform, connected through API integration.",
        role: "Team Captain",
      },
      {
        id: "campus-event",
        title: "Campus Event Management",
        summary:
          "Website Application Development (PAW) · Telkom University Jakarta. A web-based campus event management system designed to streamline event organization, administration, and information management.",
        role: "Team Captain",
      },
    ],
  },

  philosophy: {
    label: "Beyond the Code",
    kanji: "志",
    quote: "Great technology is only as good as the experience it creates.",
    support:
      "Design makes technology accessible. Development makes it real. Collaboration makes it meaningful.",
  },

  ravenRoles: {
    pharvia: `${pharviaRole} — as documented in the PHARVIA presentation`,
    amanin: "CTO",
  },
}
