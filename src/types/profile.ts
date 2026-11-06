import type { SpecializationIconName } from "./expertise"

export type ProfileImage = { src: string; width: number; height: number; alt: string }

export type MediaType = "team" | "award" | "announcement" | "certificate" | "individual" | "material"

/** An image in a documentation set or gallery. */
export type CaptionedImage = ProfileImage & {
  caption: string
  category?: string
  /** Documentation type; certificates are always shown uncropped. */
  type?: MediaType
}

/** A verified competition achievement with its own team, role and documentation. */
export type Achievement = {
  id: string
  /** Headline award(s), e.g. ["1st Place Winner", "Best Presentation"]. */
  awards: string[]
  competition: string
  organizer: string
  /** Display date, e.g. "October 2026". */
  date: string
  /** Sortable YYYY-MM-DD (day defaults to 01 when only the month is known). */
  sortDate: string
  project: string
  /** Verified individual role for this competition; omitted when not stated. */
  role?: string
  team?: string
  description: string
  images: CaptionedImage[]
  sourceUrl?: string
  relatedProjectUrl?: string
  featured?: boolean
}

export type AchievementShowcase = ProfileSectionHead & {
  subtitle: string
  items: Achievement[]
}

export type ProfileSectionHead = { label: string; title: string; kanji?: string }

export type ProfileData = {
  name: string
  /** Decorative kanji behind the hero. */
  heroKanji: string
  headline: string[]
  tagline?: string
  /** Short supporting statement under the tagline. */
  statement?: string
  bio: string[]
  /** Short line under the portrait, e.g. the university. */
  affiliation: string
  /** Short verified role line for the Team page card. Omit to show no role. */
  cardRole?: string
  /**
   * Finished hero artwork (a complete composition with its own frame) shown in place of the
   * cut-out portrait. `src` is undefined until the asset exists, which keeps the portrait.
   */
  heroArtwork?: { src?: string; alt: string }
  /** External links that are verified to exist. */
  links?: { label: string; href: string }[]

  expertise: ProfileSectionHead & {
    items: {
      number: string
      title: string
      copy: string
      icon: SpecializationIconName
      /** Where this expertise is evidenced, when documented. */
      evidence?: string
    }[]
  }

  toolkit?: ProfileSectionHead & {
    note: string
    /** `icon` omitted → text mark (no reliable official logo available). */
    groups: { group: string; tools: { id: string; name: string; icon?: string }[] }[]
  }

  experience: ProfileSectionHead & {
    items: {
      number: string
      role: string
      org: string
      date?: string
      /** Extra verified facts, e.g. duration, work arrangement, location. */
      meta?: string[]
      copy: string
      /** Supporting project or media reference, when documented. */
      related?: string
    }[]
    /** Optional side panel, e.g. education and credentials. */
    aside?: { title: string; items: { title: string; detail?: string }[] }[]
  }

  projects: ProfileSectionHead & {
    items: {
      id: string
      title: string
      summary: string
      /** Verified individual role; omitted when not verified. */
      role?: string
      achievement?: string
      /** Internal case-study route — only when it exists. */
      caseStudyUrl?: string
      /** Verified external link (e.g. live prototype). */
      externalUrl?: { label: string; href: string }
    }[]
  }

  /** Rich achievement showcase (featured cards + timeline + documentation viewer). */
  showcase?: AchievementShowcase

  /** Simple achievement cards; used when no showcase is provided. */
  achievements?: ProfileSectionHead & {
    items: {
      rank: string
      title: string
      event?: string
      project: string
      note?: string
      image?: ProfileImage
      caseStudyUrl?: string
    }[]
  }

  gallery?: ProfileSectionHead & {
    items: (ProfileImage & { caption: string; category: string; featured?: boolean })[]
  }

  philosophy?: { label: string; quote: string; support: string; kanji: string }

  /** Verified roles keyed by RAVEN project id, used by "Work with RAVEN". */
  ravenRoles: Record<string, string>
}
