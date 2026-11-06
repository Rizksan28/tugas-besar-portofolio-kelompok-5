// RAVEN collective achievements — two verified competition awards.
// All facts are drawn from supplied documentation and cross-verified with
// Vassell's profile data (vassell.ts). Do not add achievements not documented here.

export type CollectiveAchievement = {
  id: string
  rank: "1st" | "2nd" | "3rd"
  rankLabel: string
  rankDisplay: string
  accentVariant: "gold" | "silver" | "bronze"
  project: string
  projectSlug: string
  competition: string
  event: string
  organizer: string
  /** Display date string — omit when only the year is confirmed. */
  date: string
  description: string
  team: string
  caseStudyUrl: string
  image: { src: string; width: number; height: number; alt: string } | null
  imageCaption: string
}

export const collectiveAchievements: CollectiveAchievement[] = [
  {
    id: "pharvia-bmc-2026",
    rank: "1st",
    rankLabel: "Champion / 1st Place",
    rankDisplay: "1ST PLACE",
    accentVariant: "gold",
    project: "PHARVIA",
    projectSlug: "pharvia",
    competition: "Business Model Canvas Competition",
    event: "USK Pharmacy Fair 2026",
    organizer:
      "Pharmacy Student Association (HIMAFAR), Faculty of Mathematics and Natural Sciences, Universitas Syiah Kuala",
    date: "October 2026",
    description:
      "PHARVIA was awarded 1st Place in the Business Model Canvas Competition at USK Pharmacy Fair 2026. The recognition celebrates PHARVIA, a digital pharmaceutical take-back and traceability ecosystem designed to connect consumers, pharmacy partners, pharmaceutical companies, and licensed waste management providers.",
    team: "Halte Terminal Corruscant",
    caseStudyUrl: "/projects/pharvia",
    image: {
      src: "/assets/projects/pharvia/pharvia-award.jpg",
      width: 1600,
      height: 900,
      alt: "Award ceremony photograph: Lomba Business Model Canvas, Juara 1 — Halte Terminal Corruscant. The winning announcement screen is visible alongside a stage presentation of the certificates.",
    },
    imageCaption: "PHARVIA — 1st Place, Business Model Canvas Competition, USK Pharmacy Fair 2026.",
  },
  {
    id: "amanin-rise-2026",
    rank: "2nd",
    rankLabel: "Runner-Up / 2nd Place",
    rankDisplay: "2ND PLACE",
    accentVariant: "silver",
    project: "AMANIN",
    projectSlug: "amanin",
    competition: "Business Proposal Competition",
    event: "RISE 2026",
    organizer: "UKM HIPMI PT UPN Veteran Jawa Timur",
    // Exact month not supplied — year only to avoid fabricating a date.
    date: "2026",
    description:
      "AMANIN received 2nd Place in the Business Proposal Competition at RISE 2026 (Raising Innovation & Student Entrepreneurship), themed “From Vision to Venture.” The competition recognised innovative and sustainable business proposals emphasising strategic planning, financial feasibility, and entrepreneurial vision. AMANIN is an AI-powered anti-scam decision assistant designed to help users recognise potential digital fraud and make safer digital decisions.",
    team: "Halte Terminal Rawamangun",
    caseStudyUrl: "/projects/amanin",
    // Zoom presentation screenshot from the RISE 2026 competition session,
    // showing team Halte Terminal Rawamangun, Telkom University Jakarta.
    image: {
      src: "/assets/projects/amanin/amanin-rise-presentation.png",
      width: 1388,
      height: 856,
      alt: "RISE 2026 competition session screenshot: slide reading \"Halte Terminal Rawamangun — Telkom University Jakarta\", with Rizky Sandi Pratama visible in the participant panel.",
    },
    imageCaption: "AMANIN team Halte Terminal Rawamangun presenting at RISE 2026, Telkom University Jakarta.",
  },
]

export const achievementSummary = {
  total: collectiveAchievements.length,
  firstPlace: collectiveAchievements.filter((a) => a.rank === "1st").length,
  secondPlace: collectiveAchievements.filter((a) => a.rank === "2nd").length,
}
