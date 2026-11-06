// Current site branding. Change the name or artwork here — header, footer and hero read from it.
// Source artwork (unmodified) lives in design/branding/; web copies in public/assets/branding/.
export const brand = {
  name: "Kelompok 5",
  displayName: "KELOMPOK 5",
  title: "KELOMPOK 5 Portfolio",
  /** Navbar/footer logo. Transparent derivative of the supplied logo (its original had a black background). */
  logo: { src: "/assets/branding/kelompok5-logo.webp", width: 1779, height: 656 },
  /** "Welcome to KELOMPOK 5 Portfolio" hero graphic (supplied with a transparent background). */
  heroGraphic: { src: "/assets/branding/kelompok5-welcome.webp", width: 2009, height: 783 },
} as const
