// Rizky's koi portrait artwork (a finished composition supplied by Rizky — used as-is, never redrawn).
//
// Drop the file at:  src/assets/team/rizky/rizky-koi-portrait.(webp|png|jpg|jpeg)
// Vite bundles and fingerprints it automatically. If the file is absent, the glob is empty,
// `rizkyKoiPortrait` is undefined, and the profile keeps the existing cut-out portrait —
// no network request and no broken image.
const found = import.meta.glob<string>("../assets/team/rizky/rizky-koi-portrait.{webp,png,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
})

// Prefer WebP when more than one format is present.
const order = ["webp", "png", "jpg", "jpeg"]
export const rizkyKoiPortrait: string | undefined = Object.entries(found)
  .sort(([a], [b]) => order.indexOf(a.split(".").pop()!) - order.indexOf(b.split(".").pop()!))
  .map(([, url]) => url)[0]
