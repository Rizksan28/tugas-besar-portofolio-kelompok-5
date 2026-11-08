"""Text -> SVG path outlines, so README art never depends on fonts installed on the viewer's machine.

Title font: Edo SZ if EDO_TTF=/path/to/edosz.ttf is set, otherwise Bebas Neue (Latin) with the
site's brush/sign faces for Japanese. Re-run build_assets.py after dropping in Edo SZ.
"""
import glob, os, re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.abspath(os.path.join(_HERE, "..", "..", ".."))
FONT_DIR = os.environ.get("K5_FONT_DIR", os.path.join(_ROOT, "public", "fonts"))
# Drop edosz.ttf into public/fonts/ (or set EDO_TTF) and every title in the README art switches to Edo SZ.
if not os.environ.get("EDO_TTF") and os.path.exists(os.path.join(FONT_DIR, "edosz.ttf")):
    os.environ["EDO_TTF"] = os.path.join(FONT_DIR, "edosz.ttf")
_cache = {}


def _load(prefix):
    if prefix in _cache:
        return _cache[prefix]
    fonts = []
    for p in sorted(glob.glob(os.path.join(FONT_DIR, prefix + "*.woff2")) + glob.glob(os.path.join(FONT_DIR, prefix + "*.ttf"))):
        try:
            fonts.append(TTFont(p))
        except Exception:
            pass
    _cache[prefix] = fonts
    return fonts


def _single(path):
    key = "single:" + path
    if key not in _cache:
        _cache[key] = [TTFont(path)]
    return _cache[key]


FAMILIES = {
    "bebas": lambda: _load("bebas-neue-latin-400"),
    "marker": lambda: _load("permanent-marker-latin-400"),
    "brush": lambda: _load("yuji-boku-"),
    "sign": lambda: _load("dela-gothic-one-"),
    "mincho": lambda: _load("shippori-mincho-"),
    "serifi": lambda: _load("cormorant-garamond-latin-600-italic"),
    "mincho8": lambda: _load("shippori-mincho-") ,
    "manrope": lambda: _load("manrope-latin-700"),
    "edo": lambda: _single(os.environ["EDO_TTF"]) if os.environ.get("EDO_TTF") else _load("bebas-neue-latin-400"),
}


def _glyph_font(fonts, ch):
    cp = ord(ch)
    for f in fonts:
        cm = f.getBestCmap()
        if cm and cp in cm:
            return f, cm[cp]
    return None, None


def text_path(text, family, size, spacing=0.0, anchor="start", fallbacks=("brush", "sign", "mincho")):
    """Return (path_d, width, ascent_px). Origin = baseline-left (or centred/right by anchor)."""
    fams = [family] + [f for f in fallbacks if f != family]
    x = 0.0
    parts = []
    for ch in text:
        font = gname = None
        for fam in fams:
            font, gname = _glyph_font(FAMILIES[fam](), ch)
            if font:
                break
        if not font:
            x += size * 0.3
            continue
        upm = font["head"].unitsPerEm
        s = size / upm
        gs = font.getGlyphSet()
        pen = SVGPathPen(gs, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
        tp = TransformPen(pen, (s, 0, 0, -s, x, 0))
        gs[gname].draw(tp)
        d = pen.getCommands()
        if d:
            parts.append(d)
        x += gs[gname].width * s + spacing
    width = x - spacing if x else 0
    d = " ".join(parts)
    if anchor != "start":
        off = -width / 2 if anchor == "middle" else -width
        d = shift_path(d, off)
    return d, width


def shift_path(d, dx):
    """Translate an absolute-coordinate path string by dx (SVGPathPen emits absolute M/L/Q/C/Z/H/V)."""
    out = []
    for tok in re.finditer(r"([MLQCHVZmlqchvz])([^MLQCHVZmlqchvz]*)", d):
        cmd, args = tok.group(1), tok.group(2).replace(",", " ").split()
        nums = [float(a) for a in args]
        if cmd == "H":
            nums = [n + dx for n in nums]
        elif cmd in "MLQC":
            nums = [n + dx if i % 2 == 0 else n for i, n in enumerate(nums)]
        out.append(cmd + " ".join(("%.1f" % n).rstrip("0").rstrip(".") for n in nums))
    return "".join(out)


if __name__ == "__main__":
    d, w = text_path("KELOMPOK 5 第五組", "bebas", 80)
    print(len(d), w)
