// Rizky Sandi Pratama — seven competition achievements.
// Source of truth: the records Rizky supplied, cross-checked against his certificates.
// Where a certificate's wording differs from the supplied record, the certificate is
// followed and the difference is noted inline.
//
// Media inventory and sources: docs/rizky-achievement-media-audit.md
// Every path below exists in public/; files were verified visually before inclusion.
import type { Achievement, CaptionedImage, MediaType } from "../types/profile"
import { pharviaAssets } from "./pharvia"

const dir = "/assets/team/rizky/achievements"

const label: Record<MediaType, string> = {
  team: "Team",
  award: "Award",
  announcement: "Winner Announcement",
  certificate: "Certificate",
  individual: "Individual",
  material: "Competition Material",
}

const media = (
  type: MediaType,
  file: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
): CaptionedImage => ({ src: `${dir}/${file}`, width, height, alt, caption, type, category: label[type] })

export const rizkyAchievementRecords: Achievement[] = [
  {
    id: "pharvia-usk-2026",
    awards: ["1st Place Winner"],
    competition: "Business Model Canvas Competition — USK Pharmacy Fair 2026",
    // Certificate: HIMAFAR, FMIPA, Universitas Syiah Kuala; 06–08 October 2026.
    organizer: "HIMAFAR FMIPA, Universitas Syiah Kuala",
    date: "October 2026",
    sortDate: "2026-10-06",
    project: "PHARVIA",
    role: "Chief Executive Officer (CEO)",
    team: "Halte Terminal Corruscant",
    description:
      "Led the business strategy, value proposition development, and overall business model design for PHARVIA, a digital healthcare ecosystem focused on pharmaceutical waste management, medication verification, and unused medicine disposal.",
    images: [
      {
        ...pharviaAssets.team,
        type: "team",
        category: label.team,
        alt: "The three PHARVIA team members in maroon Telkom University blazers, two holding 1st-place certificates and one holding a tablet showing PHARVIA.",
        caption: "PHARVIA team — Halte Terminal Corruscant with their certificates.",
      },
      {
        ...pharviaAssets.award,
        type: "announcement",
        category: label.announcement,
        alt: "Award announcement for the Business Model Canvas competition, Juara 1 — Halte Terminal Corrusant, Telkom University, beside a photo of the certificate presentation.",
        caption: "Winner announcement — Lomba Business Model Canvas, Juara 1.",
      },
      media("certificate", "pharvia/certificate.webp", 1600, 1131,
        "Certificate awarded to Rizky Sandi Pratama: Juara 1 Lomba Business Model Canvas, USK Pharmacy Fair 2026, HIMAFAR FMIPA Universitas Syiah Kuala, 06–08 October 2026.",
        "Competition certificate — Juara 1, Business Model Canvas, USK Pharmacy Fair 2026."),
    ],
    relatedProjectUrl: "/projects/pharvia",
    featured: true,
  },
  {
    id: "astraloka-undip-2026",
    awards: ["2nd Place Winner"],
    competition: "Business Model Canvas National Competition 2026 — Diponegoro Economics Project",
    organizer: "Diponegoro Economics Student Community (DESC), Universitas Diponegoro",
    date: "August 2026",
    sortDate: "2026-08-01",
    project: "AstraLoka",
    role: "Chief Financial Officer (CFO)",
    description:
      "Contributed to financial modeling, hybrid monetization architecture, and five-year unit economics for AstraLoka, an AI-driven smart eco-cultural travel planner.",
    // Team and individual photographs not located — see the media audit.
    images: [
      media("certificate", "astraloka/certificate.webp", 1600, 1132,
        "Piagam Penghargaan awarded to Rizky Sandi Pratama as Juara 2 in the national Business Model Canvas competition held by DESC, Faculty of Economics and Business, Universitas Diponegoro.",
        "Sertifikat Undip — Juara 2, Business Model Canvas, Diponegoro Economics Project 2026."),
    ],
  },
  {
    id: "pasarakar-nacops-2026",
    awards: ["1st Place Winner", "Best Presentation"],
    competition: "NACOPS 7.0 National Business Plan Competition 2026",
    // Certificates read "Pertemanan Sejiwa" (supplied record: "Berteman Sejiwa"); dated 28 June 2026.
    organizer: "Pertemanan Sejiwa",
    date: "June 2026",
    sortDate: "2026-06-28",
    project: "PasarAkar",
    role: "Chief Financial Officer (CFO)",
    team: "Kami Akan Menang",
    description:
      "Led financial feasibility modeling, valuation, and unit economics for PasarAkar, an offline-first agritech super-app integrating BUMDes, AI price prediction, and micro-financing to empower rural farmers.",
    images: [
      media("award", "pasarakar/award.webp", 1600, 900,
        "Rizky Sandi Pratama in a maroon Telkom University blazer holding a trophy, wearing a gold medal, and holding the NACOPS 7.0 Juara 1 and Presentasi Terbaik certificates.",
        "Foto penghargaan — trophy, medal, and both NACOPS 7.0 certificates."),
      media("team", "pasarakar/team-celebration.webp", 1200, 1600,
        "Three team members celebrating indoors with a trophy and gold NACOPS medals.",
        "Team celebration with the NACOPS 7.0 trophy and medals."),
      media("certificate", "pasarakar/certificate-1st-place.webp", 1600, 1132,
        "Certificate awarded to Rizky Sandi Pratama with team Kami Akan Menang: Juara 1, NACOPS 7.0 National Business Plan Competition 2026, 28 June 2026.",
        "Sertifikat Juara 1 — NACOPS 7.0 National Business Plan Competition 2026."),
      media("certificate", "pasarakar/certificate-best-presentation.webp", 1600, 1132,
        "Certificate awarded to Rizky Sandi Pratama with team Kami Akan Menang: Presentasi Terbaik (Best Presentation), NACOPS 7.0, 28 June 2026.",
        "Sertifikat Presentasi Terbaik — NACOPS 7.0."),
    ],
    featured: true,
  },
  {
    id: "aether-digitex-2026",
    // Certificate wording: "Silver Award".
    awards: ["Silver Award"],
    competition: "Digital Innovation & Technology Exhibition (DIGITEX) 2026",
    organizer: "Universiti Teknologi Malaysia (UTM), Johor Bahru",
    date: "June 2026",
    sortDate: "2026-06-15",
    project: "AETHER",
    role: "CFO & Business Strategist",
    description:
      "Developed structured financial plans, market viability analysis, and project evaluation for AETHER, an Emotion AI smart necklace that releases personalized fragrances based on biometric stress levels.",
    images: [
      media("team", "aether-digitex/team.webp", 1086, 1448,
        "The AETHER team holding the Indonesian flag in front of the DIGITEX 2026 Digital Innovation & Technology Exhibition backdrop at UTM.",
        "Foto team — AETHER at DIGITEX 2026, Universiti Teknologi Malaysia."),
      media("award", "aether-digitex/award.webp", 960, 1280,
        "Rizky Sandi Pratama holding the Indonesian flag and an award in front of the DIGITEX 2026 backdrop.",
        "Award moment at DIGITEX 2026."),
      media("certificate", "aether-digitex/certificate.webp", 1100, 1556,
        "UTM Certificate of Award: Silver Award in DIGITEX 2026, Digital Innovation & Technology Exhibition, for the innovation AETHER, held on 15 June 2026 at Universiti Teknologi Malaysia, Johor Bahru.",
        "Certificate of Award — Silver Award, DIGITEX 2026, for AETHER."),
    ],
    featured: true,
  },
  {
    id: "aether-unj-2026",
    awards: ["3rd Place Winner"],
    competition: "International Business Strategy Competition 2026",
    organizer: "Universitas Negeri Jakarta (UNJ)",
    date: "May 2026",
    sortDate: "2026-05-01",
    project: "AETHER",
    role: "Chief Technology Officer (CTO) & Product Development",
    description:
      "Contributed to technology strategy and product development for AETHER. The team advanced to the grand final after being selected among eight finalist teams.",
    // "Aether Team" photograph not located — see the media audit.
    images: [
      media("award", "aether-unj/award.webp", 1200, 1600,
        "Rizky Sandi Pratama holding the 3rd Place award board in front of the International Business Strategy Competition banner.",
        "Award photo — 3rd Place, International Business Strategy Competition 2026."),
      media("certificate", "aether-unj/certificate.webp", 1026, 720,
        "Certificate of Achievement awarded to Rizky Sandi Pratama: Third Place Winner, International Business Strategy Competition, themed Empowering Future Entrepreneurs: Digital for Sustainable Innovation.",
        "Sertifikat juara 3 UNJ — Third Place Winner, IBSC 2026."),
      media("material", "aether-unj/business-model-canvas.webp", 2000, 1478,
        "AETHER business model canvas poster created by the DARNST team, describing an adaptive luxury jewelry ecosystem with biometric sensors.",
        "AETHER Business Model Canvas — DARNST team, IBSC 2026."),
    ],
  },
  {
    id: "sobatambis-semar-2025",
    awards: ["1st Place Winner"],
    competition: "Semar Entrepreneur 2025 — Business Model Canvas Competition",
    // Certificate: organised by BEM UNS, Surakarta, 6 September 2025.
    organizer: "BEM Universitas Sebelas Maret (UNS)",
    date: "September 2025",
    sortDate: "2025-09-06",
    project: "SobatAmbis",
    role: "Team Leader",
    description:
      "Led the SobatAmbis team in the national Business Model Canvas competition themed “Future-Proof Business: Creating Innovative Solutions Amid Global Economic Turbulence.”",
    images: [
      media("team", "sobatambis/team.webp", 725, 1280,
        "The SobatAmbis team in maroon Telkom University blazers holding the Juara 1 Business Model Canvas Semar Entrepreneur board, a certificate, and a trophy.",
        "Foto tim UNS — SobatAmbis with the Juara 1 board and trophy."),
      media("certificate", "sobatambis/certificate.webp", 1600, 1131,
        "Certificate awarded to Rizky Sandi Pratama, Telkom University: Juara 1 Business Model Canvas Competition, Semar Entrepreneur, BEM UNS, Surakarta, 6 September 2025.",
        "Sertifikat UNS — Juara 1, Business Model Canvas Competition, Semar Entrepreneur 2025."),
    ],
  },
  {
    id: "kenicare-klikstart-2025",
    awards: ["2nd Place Winner"],
    competition: "Klikstart Startup Competition 2025",
    organizer: "Bandung Techno Park",
    date: "September 2025",
    sortDate: "2025-09-16",
    project: "KENICARE",
    // No individual role stated in the supplied source.
    description:
      "Received second place recognition for KENICARE in a startup competition focused on business incubation and startup acceleration — 2nd Winner in the Academic Staff & Alumnus Category.",
    images: [
      media("award", "kenicare/award.webp", 1280, 720,
        "KENICARE team members on stage at the Business Festival receiving the Klikstart 2025 2nd Winner, Academic Staff & Alumnus Category award board.",
        "Kenicare award — 2nd Winner board presented on stage."),
      media("team", "kenicare/team-bandung-techno-park.webp", 900, 1600,
        "KENICARE team members at Bandung Techno Park holding the Klikstart 2025 Business Idea Competition 2nd Winner award board.",
        "Team at Bandung Techno Park with the Klikstart 2025 award."),
      media("certificate", "kenicare/certificate.webp", 1600, 1132,
        "Bandung Techno Park Certificate of Achievement presented to KENICARE: 2nd Winner in the Academic Staff & Alumnus Category of the Klikstart Startup Competition 2025, Bandung, 16 September 2025.",
        "Sertifikat Kenicare — 2nd Winner, Klikstart Startup Competition 2025."),
    ],
  },
]

/** Newest first. */
export const rizkyAchievementsSorted = [...rizkyAchievementRecords].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
)
