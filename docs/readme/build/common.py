"""Shared bits for the Kelompok 5 README art: palette, defs, ambient FX, image embedding."""
import base64, io, os, random
from PIL import Image

SUMI = "#060507"
SUMI2 = "#0d0709"
SUMI3 = "#170a0e"
SHU = "#e4262c"
SHU2 = "#ff4a4f"
SHU_D = "#6d0710"
KIN = "#e0b25a"
KIN2 = "#ffe3a0"
WASHI = "#f4ead8"
PINK = "#ff3d7f"
CYAN = "#35f0ff"
AMBER = "#ffb43a"
MUTED = "#b79a8c"

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.environ.get("K5_SITE", os.path.abspath(os.path.join(HERE, "..", "..", "..")))
PUB = os.path.join(SITE, "public")


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def n(x, nd=1):
    s = f"{x:.{nd}f}".rstrip("0").rstrip(".")
    return s if s not in ("", "-0") else "0"


_img_cache = {}


def b64img(path, max_w=None, max_h=None, fmt="WEBP", q=80, keep_alpha=True):
    """Embed an image as a data URI (resized). Returns (uri, w, h)."""
    key = (path, max_w, max_h, fmt, q)
    if key in _img_cache:
        return _img_cache[key]
    full = path if os.path.exists(path) else os.path.join(PUB, path.lstrip("/"))
    im = Image.open(full)
    im.load()
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() or im.mode == "P" else "RGB")
    if max_w or max_h:
        im.thumbnail((max_w or 10**6, max_h or 10**6), Image.LANCZOS)
    if fmt == "JPEG":
        im = im.convert("RGB")
    buf = io.BytesIO()
    im.save(buf, fmt, quality=q, method=6) if fmt == "WEBP" else im.save(buf, fmt, quality=q, optimize=True)
    mime = {"WEBP": "image/webp", "JPEG": "image/jpeg", "PNG": "image/png"}[fmt]
    uri = f"data:{mime};base64,{base64.b64encode(buf.getvalue()).decode()}"
    _img_cache[key] = (uri, im.width, im.height)
    return _img_cache[key]


def svg_data_uri(path):
    full = os.path.join(PUB, path.lstrip("/"))
    raw = open(full, "rb").read()
    return "data:image/svg+xml;base64," + base64.b64encode(raw).decode()


def defs_common():
    # seigaiha tile (60x30), glows, brush-edge filter, hazard stripes
    arcs = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r}"/>' for cx, cy in ((30, 30), (0, 15), (60, 15)) for r in (28, 21, 14, 7))
    return f"""
<pattern id="seigaiha" width="60" height="30" patternUnits="userSpaceOnUse"><g fill="none" stroke="{KIN}" stroke-width="1" opacity=".5">{arcs}</g></pattern>
<pattern id="seigaihaR" width="60" height="30" patternUnits="userSpaceOnUse"><g fill="none" stroke="{SHU}" stroke-width="1.2" opacity=".55">{arcs}</g></pattern>
<pattern id="hazard" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="14" height="28" fill="{AMBER}"/><rect x="14" width="14" height="28" fill="#120708"/></pattern>
<filter id="glowR" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="glowS" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="glowL" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<linearGradient id="gKin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3d6"/><stop offset=".55" stop-color="{KIN}"/><stop offset="1" stop-color="#8a5a20"/></linearGradient>
<linearGradient id="gShu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SHU2}"/><stop offset="1" stop-color="{SHU_D}"/></linearGradient>
<linearGradient id="gWashi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6d3b0"/></linearGradient>
<linearGradient id="gFadeR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{SUMI}" stop-opacity="0"/><stop offset="1" stop-color="{SUMI}" stop-opacity=".92"/></linearGradient>
<linearGradient id="gFadeL" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="{SUMI}" stop-opacity="0"/><stop offset="1" stop-color="{SUMI}" stop-opacity=".92"/></linearGradient>
<linearGradient id="gSlash" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<path id="petal" d="M0 -7 C4.5 -6.5 6.5 -1 3.2 4 C1.8 6.2 .6 6.6 0 5 C-.6 6.6 -1.8 6.2 -3.2 4 C-6.5 -1 -4.5 -6.5 0 -7Z"/>
"""


def svg(w, h, body, title="", defs="", bg=None):
    t = f"<title>{esc(title)}</title>" if title else ""
    bgr = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}" role="img">{t}<defs>{defs_common()}{defs}</defs>{bgr}{body}</svg>\n')


def embers(count, w, h, seed, y_from=None, rise=None, colors=(SHU2, AMBER, KIN2), size=(1, 2.8), dur=(4, 9), x_range=None):
    """Rising embers (SMIL)."""
    r = random.Random(seed)
    out = []
    yf = y_from if y_from is not None else h + 10
    rs = rise if rise is not None else h + 40
    xr = x_range or (0, w)
    for _ in range(count):
        x = r.uniform(*xr)
        d = r.uniform(*dur)
        b = -r.uniform(0, d)
        dx = r.uniform(-40, 40)
        s = r.uniform(*size)
        c = r.choice(colors)
        out.append(
            f'<circle r="{n(s)}" fill="{c}" opacity="0"><animate attributeName="cy" from="{n(yf)}" to="{n(yf - rs)}" dur="{n(d)}s" begin="{n(b)}s" repeatCount="indefinite"/>'
            f'<animate attributeName="cx" values="{n(x)};{n(x + dx)};{n(x - dx * .5)}" dur="{n(d)}s" begin="{n(b)}s" repeatCount="indefinite"/>'
            f'<animate attributeName="opacity" values="0;.95;.8;0" keyTimes="0;.15;.7;1" dur="{n(d)}s" begin="{n(b)}s" repeatCount="indefinite"/></circle>')
    return f'<g filter="url(#glowS)">{"".join(out)}</g>'


def petals(count, w, h, seed, dur=(7, 13), size=(.7, 1.5), colors=("#7d0f1c", "#b3172a", "#e4262c", "#ff6a7a"), op=(.5, 1)):
    r = random.Random(seed)
    out = []
    for _ in range(count):
        x = r.uniform(-20, w)
        s = r.uniform(*size)
        d = r.uniform(*dur)
        b = -r.uniform(0, d)
        dx = r.uniform(-120, 160)
        sp = r.uniform(3.5, 9)
        sg = r.choice((-1, 1))
        c = r.choice(colors)
        o = r.uniform(*op)
        out.append(
            f'<g opacity="{n(o, 2)}"><g><animateTransform attributeName="transform" type="translate" values="{n(x)} -20;{n(x + dx * .5)} {n(h * .5)};{n(x + dx)} {n(h + 30)}" dur="{n(d)}s" begin="{n(b)}s" repeatCount="indefinite"/>'
            f'<g transform="scale({n(s, 2)})"><use href="#petal" fill="{c}"><animateTransform attributeName="transform" type="rotate" values="0;{sg * 360}" dur="{n(sp)}s" repeatCount="indefinite"/></use></g></g></g>')
    return "".join(out)


def rain(count, w, h, seed, color="#9fb8ff", op=.28):
    r = random.Random(seed)
    out = []
    for _ in range(count):
        x = r.uniform(0, w)
        d = r.uniform(.6, 1.2)
        b = -r.uniform(0, d)
        ln = r.uniform(10, 26)
        out.append(f'<line x1="0" y1="0" x2="-3" y2="{n(ln)}" stroke="{color}" stroke-width=".8" opacity="{op}"><animateTransform attributeName="transform" type="translate" from="{n(x)} -30" to="{n(x - 40)} {h + 30}" dur="{n(d, 2)}s" begin="{n(b, 2)}s" repeatCount="indefinite"/></line>')
    return "".join(out)


def corner_brackets(x, y, w, h, color=KIN, s=18, sw=2, op=.9):
    return (f'<g fill="none" stroke="{color}" stroke-width="{sw}" opacity="{op}" stroke-linecap="square">'
            f'<path d="M{x} {y + s}V{y}H{x + s}"/><path d="M{x + w - s} {y}H{x + w}V{y + s}"/>'
            f'<path d="M{x} {y + h - s}V{y + h}H{x + s}"/><path d="M{x + w - s} {y + h}H{x + w}V{y + h - s}"/></g>')


def write(out_dir, name, content):
    os.makedirs(out_dir, exist_ok=True)
    p = os.path.join(out_dir, name)
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(content)
    return len(content.encode("utf-8"))
