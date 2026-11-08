"""Self-host fonts: copies only the woff2 files needed and writes src/fonts.css.
   Latin fonts: fixed list. JP fonts: only the unicode-range slices that contain characters used in src/."""
import re, shutil, sys, os, glob
HERE = os.path.dirname(os.path.abspath(__file__)) + "/"
SITE = HERE
# needs: npm i --no-save @fontsource/{bebas-neue,cormorant-garamond,manrope,permanent-marker,yuji-boku,dela-gothic-one,shippori-mincho}
FS = os.environ.get("FONTSOURCE_DIR", HERE + "node_modules/@fontsource/") + ("" if os.environ.get("FONTSOURCE_DIR", "/").endswith("/") else "/")
OUT = SITE + "public/fonts/"
os.makedirs(OUT, exist_ok=True)
css = ["/* Self-hosted fonts (generated). Latin: Bebas Neue, Cormorant Garamond, Manrope, Permanent Marker. JP slices: Yuji Boku, Dela Gothic One, Shippori Mincho. */"]

def latin(pkg, family, weight, style="normal"):
    fn = f"{pkg}-latin-{weight}-{style}.woff2"
    shutil.copy(FS + pkg + "/files/" + fn, OUT + fn)
    css.append(f"@font-face{{font-family:'{family}';font-style:{style};font-weight:{weight};font-display:swap;src:url(/fonts/{fn}) format('woff2');"
               "unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}")

latin("bebas-neue", "Bebas Neue", 400)
for w, s in ((500, "normal"), (600, "normal"), (600, "italic"), (700, "italic"), (700, "normal")):
    latin("cormorant-garamond", "Cormorant Garamond", w, s)
for w in (400, 500, 600, 700, 800):
    latin("manrope", "Manrope", w)
latin("permanent-marker", "Permanent Marker", 400)

# characters used by the site
text = ""
for p in glob.glob(SITE + "src/**/*.ts*", recursive=True) + glob.glob(SITE + "src/**/kamuro.css", recursive=True) + [SITE + "index.html"]:
    text += open(p, encoding="utf-8").read()
cjk = sorted({ord(c) for c in text if ord(c) > 0x2FFF})
print("CJK chars used:", "".join(chr(c) for c in cjk))

def inrange(cp, ranges):
    return any(a <= cp <= b for a, b in ranges)

def parse_ranges(s):
    out = []
    for part in s.split(","):
        part = part.strip().lstrip("U+")
        if "-" in part:
            a, b = part.split("-"); out.append((int(a, 16), int(b, 16)))
        else:
            out.append((int(part, 16), int(part, 16)))
    return out

def jp(pkg, family, weight):
    src = open(f"{FS}{pkg}/{weight}.css", encoding="utf-8").read()
    blocks = re.findall(r"@font-face\s*\{.*?\}", src, re.S)
    n = 0
    for b in blocks:
        ur = re.search(r"unicode-range:\s*([^;]+);", b).group(1)
        rng = parse_ranges(ur)
        if not any(inrange(cp, rng) for cp in cjk):
            continue
        m = re.search(r"url\(\./files/([^)]+\.woff2)\)", b)
        fn = m.group(1)
        shutil.copy(f"{FS}{pkg}/files/{fn}", OUT + fn)
        css.append(f"@font-face{{font-family:'{family}';font-style:normal;font-weight:{weight};font-display:swap;src:url(/fonts/{fn}) format('woff2');unicode-range:{ur};}}")
        n += 1
    print(family, weight, "slices:", n)

jp("yuji-boku", "Yuji Boku", 400)
jp("dela-gothic-one", "Dela Gothic One", 400)
jp("shippori-mincho", "Shippori Mincho", 700)
jp("shippori-mincho", "Shippori Mincho", 800)
open(SITE + "src/fonts.css", "w").write("\n".join(css) + "\n")
tot = sum(os.path.getsize(f) for f in glob.glob(OUT + "*"))
print("font files:", len(glob.glob(OUT + "*")), "total KB:", tot // 1024)
