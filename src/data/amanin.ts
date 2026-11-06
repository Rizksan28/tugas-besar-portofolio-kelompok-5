// AMANIN case-study content.
// Sources: team presentation "AMANIN (3).pdf" and business plan proposal
// (BPC_HalteTerminalRawamangun_TelkomUniversityJakarta.pdf).
// Financial figures are projections, not realised results. Statistics are
// quoted from the project documents with their stated sources.

const base = "/assets/projects/amanin"

export const amaninAssets = {
  showcase: { src: `${base}/amanin-mobile-showcase.png`, width: 4485, height: 1906 },
  cover: { src: `${base}/amanin-mobile-showcase.png`, width: 4485, height: 1906 },
  team: { src: `${base}/amanin-team.jpg`, width: 1600, height: 900 },
}

export const amaninProject = {
  name: "AMANIN",
  subtitle: "AI Anti-Scam Decision Assistant",
  tagline: "Think Before You Click. Verify Before You Trust.",
  categories: ["AI", "Cybersecurity", "FinTech", "Digital Innovation"],
  team: "Halte Terminal Rawamangun",
  context: "RISE 2026 — Raising Innovation & Student Entrepreneurship",
  contributors: [
    { name: "Rizky Sandi Pratama", role: "CEO" },
    { name: "Vassell Enha Atthayya", role: "CFO" },
    { name: "Evan Octavianus Haryo Handoko", role: "CTO" },
  ],
  status: "Proposed concept with UI mockups — not a production deployment",
}

export const amaninPhilosophy = ["Receive", "Share", "Check", "Decide"] as const

// Figures cited in the team's project documents.
export const amaninStats = [
  {
    value: "668K+",
    label: "Scam reports recorded by IASC through August 2026",
    source: "IASC (Integrated Anti-Scam Centre), as cited in project documents",
  },
  {
    value: "66%",
    label: "of Indonesian adults exposed to scam attempts",
    source: "GASA Global Anti-Scam Alliance report, as cited in project documents",
  },
  {
    value: "14.05%",
    label: "gap between financial inclusion and financial literacy rates",
    source: "Cited in the team's business plan proposal",
  },
]

export const amaninProblems = [
  {
    title: "Scams are evolving",
    copy: "Fraudulent messages, fake QR codes, phishing links, and impersonation attacks grow more sophisticated every year.",
  },
  {
    title: "Victims act too fast",
    copy: "Without a quick verification layer, users transfer money or share credentials before they can pause and assess risk.",
  },
  {
    title: "Low digital literacy",
    copy: "A significant portion of the population lacks the tools or knowledge to identify digital fraud patterns.",
  },
  {
    title: "Fragmented protection",
    copy: "Existing tools address one channel at a time — there is no unified assistant covering messages, QR codes, URLs, and accounts.",
  },
]

export const amaninFeatures = [
  {
    number: "01",
    title: "AI Scam Detection",
    summary: "Analyze suspicious conversations, screenshots, and links.",
    detail: "Multimodal analysis of chat screenshots, SMS text, and URLs surfaces warning signals and provides context for the user's specific situation.",
    icon: "shield-scan",
  },
  {
    number: "02",
    title: "QRIS & Payment Verification",
    summary: "Help users examine suspicious payment information.",
    detail: "Checks QRIS codes and bank account details against reported fraud patterns to flag potential risks before a payment is made.",
    icon: "qr-check",
  },
  {
    number: "03",
    title: "Scam Risk Intelligence",
    summary: "Contextual Scam Risk Score with explained warning signals.",
    detail: "Returns a 0–100 risk score alongside a plain-language explanation of which signals raised concern — not a guarantee of fraud or safety.",
    icon: "risk-score",
  },
  {
    number: "04",
    title: "Smart Recommendation",
    summary: "Recommended next steps tailored to the specific threat.",
    detail: "Suggests concrete actions: pause the payment, verify through an official channel, report the number, or proceed with caution — always leaving the final decision with the user.",
    icon: "recommendation",
  },
]

export const amaninCapabilities = [
  { label: "Chat & SMS Scam Check", icon: "message" },
  { label: "Screenshot Scanner", icon: "scan" },
  { label: "Phishing URL Check", icon: "link" },
  { label: "QRIS Verification", icon: "qr" },
  { label: "Bank Account Check", icon: "bank" },
  { label: "Scam Radar", icon: "radar" },
  { label: "Cybersecurity Education", icon: "book" },
  { label: "Community Scam Reporting", icon: "flag" },
]

export const amaninWorkflow = [
  {
    step: "RECEIVE",
    kanji: "受",
    copy: "A user receives a suspicious message, link, screenshot, or QR code and is unsure whether to trust it.",
  },
  {
    step: "SHARE",
    kanji: "共",
    copy: "The user submits the content — text, image, link, or QR data — directly inside the AMANIN interface.",
  },
  {
    step: "CHECK",
    kanji: "確",
    copy: "AMANIN evaluates possible warning signals across multiple dimensions and produces a contextual risk assessment.",
  },
  {
    step: "DECIDE",
    kanji: "決",
    copy: "The user receives a plain-language explanation and recommended next steps — with the final decision always theirs.",
  },
]

export const amaninShowcaseScreens = [
  { id: "splash", label: "AMANIN Splash Screen", caption: "Brand introduction and secure entry point." },
  { id: "home", label: "Home Dashboard", caption: "Quick-access scan tools and recent activity summary." },
  { id: "radar", label: "Scam Radar", caption: "Live intelligence on trending fraud patterns in Indonesia." },
  { id: "qris", label: "QRIS Verification", caption: "Scan and verify payment codes before transferring." },
  { id: "scanner", label: "Suspicious Activity Scanner", caption: "Upload screenshots or paste content for multimodal analysis." },
]

export const amaninEcosystem = [
  {
    title: "Premium Family Subscription",
    copy: "Individual and family plans offering unlimited scam checks, priority analysis, and monthly safety reports.",
  },
  {
    title: "B2B Scam Intelligence API",
    copy: "Organisations integrate AMANIN's risk engine into their own customer-facing workflows or fraud-prevention pipelines.",
  },
  {
    title: "Enterprise Dashboard",
    copy: "A management layer for financial institutions and telcos to monitor scam activity patterns among their user base.",
  },
  {
    title: "White-label Integration",
    copy: "Banking and fintech partners embed AMANIN's verification layer directly into their own applications.",
  },
]

// Financial figures from the team's presentation. Not realised results.
export const amaninProjections = {
  highlights: [
    { label: "Projected Year 1 revenue", value: "Rp 1.2B" },
    { label: "Projected Year 5 revenue", value: "Rp 8.9B" },
    { label: "Payback period (projected)", value: "2.8 years" },
    { label: "Target registered users, Year 3", value: "500,000+" },
  ],
  revenueMix: [
    { label: "B2B Intelligence API", share: 42 },
    { label: "Premium Subscription", share: 31 },
    { label: "Enterprise Dashboard", share: 17 },
    { label: "White-label", share: 10 },
  ],
}
