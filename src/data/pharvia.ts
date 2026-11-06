// PHARVIA case-study content.
// Sources: the team's competition deck ("PPT Pharvia_Halte Terminal Corusscant.pdf")
// and the supplied award and team photographs. Figures below are quoted from
// the deck as written; financial values are the deck's projections, not results.

const base = "/assets/projects/pharvia"

export type PharviaScreen = {
  id: string
  label: string
  caption: string
  src: string
  width: number
  height: number
}

export type PharviaFeature = {
  number: string
  title: string
  summary: string
  detail: string
  screen: PharviaScreen
}

export const pharviaAssets = {
  award: { src: `${base}/pharvia-award.jpg`, width: 1600, height: 900 },
  team: { src: `${base}/pharvia-team.jpg`, width: 1600, height: 962 },
  showcase: { src: `${base}/pharvia-mobile-showcase.webp`, width: 2471, height: 986 },
  cover: { src: `${base}/pharvia-cover.webp`, width: 1425, height: 906 },
}

const screen = (
  id: string,
  label: string,
  caption: string,
  width = 424,
  height = 904,
): PharviaScreen => ({
  id,
  label,
  caption,
  src: `${base}/pharvia-screen-${id}.webp`,
  width,
  height,
})

export const pharviaScreens = {
  home: screen("home", "Homepage", "Personal dashboard with active returns and quick access."),
  scan: screen("scan", "Pharvia Scan", "Medicine detection with expiry and packaging checks."),
  point: screen("point", "Pharvia Point", "Map of nearby collection points and drop-box capacity."),
  ecopoint: screen("ecopoint", "EcoPoint", "Points, impact summary, and reward catalogue.", 328, 687),
  collect: screen("collect", "Smart Collect", "Return summary listing each medicine before hand-off."),
}

export const pharviaProject = {
  name: "PHARVIA",
  subtitle: "Digital Pharmaceutical Take-Back & Traceability Platform",
  tagline: "Turning Unused Medicines into Traceable Impact.",
  categories: ["HealthTech", "Sustainability", "Digital Innovation", "Product Design"],
  team: "Halte Terminal Corruscant",
  contributors: [
    { name: "Rizky Sandi Pratama", role: "CEO" },
    { name: "Vassell Enha Atthayya", role: "CFO" },
    { name: "Evan Octavianus Haryo Handoko", role: "CTO" },
  ],
  recognition: "1st Place — Business Model Canvas Competition, Universitas Syiah Kuala",
  status: "Proposed concept with UI mockups",
}

export const pharviaChallenges = [
  {
    title: "Improper disposal",
    copy: "Leftover household medicines still end up in ordinary household waste.",
  },
  {
    title: "Environmental contamination",
    copy: "Drug residues can enter soil and water, increasing ecological risk.",
  },
  {
    title: "Limited return channels",
    copy: "Convenient, trusted places to hand back unused medicines are hard to find.",
  },
  {
    title: "No post-consumer traceability",
    copy: "Once medicines leave the pharmacy, their end-of-life journey is difficult to track.",
  },
  {
    title: "Low awareness",
    copy: "Many people are unaware of how to dispose of medicines responsibly — or why it matters.",
  },
]

// Quoted from slide 2 ("Latar Belakang") of the team's deck. The deck does not list primary sources.
export const pharviaDeckFigures = [
  { value: "86.7%", label: "of leftover household medicines are still thrown into household waste" },
  { value: "64.9%", label: "of pharmacists are willing to accept unused or expired medicines" },
  { value: "<2%", label: "of medicines return through official channels" },
  { value: "30,527", label: "pharmacies in Indonesia could become PHARVIA collection points" },
]

export const pharviaFeatures: PharviaFeature[] = [
  {
    number: "01",
    title: "Pharvia Scan",
    summary: "Medicine scanning and return guidance.",
    detail: "Scan a medicine, check its expiry date, and receive guidance on how to return it.",
    screen: pharviaScreens.scan,
  },
  {
    number: "02",
    title: "Pharvia Point",
    summary: "Nearby pharmacy and healthcare collection points.",
    detail: "Connects users with the nearest pharmacies and healthcare facilities acting as return points.",
    screen: pharviaScreens.point,
  },
  {
    number: "03",
    title: "EcoPoint",
    summary: "Reward incentives for responsible medicine returns.",
    detail: "Rewards users who return medicines safely and responsibly, encouraging repeat participation.",
    screen: pharviaScreens.ecopoint,
  },
  {
    number: "04",
    title: "Smart Collect & Traceability",
    summary: "Collection coordination and pharmaceutical waste tracking.",
    detail: "Records each return digitally, optimises pickup schedules and routes, and tracks medicines through to disposal.",
    screen: pharviaScreens.collect,
  },
]

export const pharviaShowcase: PharviaScreen[] = [
  pharviaScreens.home,
  pharviaScreens.scan,
  pharviaScreens.point,
  pharviaScreens.ecopoint,
  pharviaScreens.collect,
]

export const pharviaEcosystem = [
  {
    title: "Pharmaceutical take-back partnerships",
    copy: "Corporate take-back programmes give pharmaceutical companies a structured channel for their products' end of life.",
  },
  {
    title: "Pharmacy collection networks",
    copy: "Pharmacies host drop boxes and QR returns prepared by PHARVIA, gaining foot traffic and customer loyalty in return.",
  },
  {
    title: "Sustainability reporting",
    copy: "An ESG & Impact Dashboard turns return data into measurable sustainability reporting for partners.",
  },
  {
    title: "End-to-end traceability",
    copy: "Every stage is recorded, and disposal is handled only by licensed waste-management partners.",
  },
  {
    title: "Reward-driven participation",
    copy: "EcoPoint incentives, personal reminders, and education help turn responsible disposal into a habit.",
  },
]

// Slide 13 ("Analisis Keuangan") — five-year projection, 2026–2030.
export const pharviaProjections = {
  highlights: [
    { label: "Initial funding requirement", value: "Rp 1.00 billion" },
    { label: "Projected revenue, year 1", value: "Rp 790 million" },
    { label: "Projected revenue, year 5", value: "Rp 6.50 billion" },
    { label: "Projected payback period", value: "3.2 years" },
  ],
  revenueMix: [
    { label: "Corporate Take-Back Program", share: 55.3 },
    { label: "ESG & Impact Dashboard", share: 16.9 },
    { label: "Sponsored Campaign", share: 16.6 },
    { label: "White-label & Integration", share: 11.2 },
  ],
}
