"""Team cards."""
from common import *
from kfont import text_path

CW, CH = 300, 472

MEMBERS = [
    dict(slug="raka", idx="01", name="Raka Rahmatullah", role="", spirit="Tiger", jp="虎", meaning="Courage & Strength",
         portrait="/assets/raven/member-03-evan.png", art="/assets/team/spirits/raka-tiger.webp", accent=AMBER, mark="RA"),
    dict(slug="vassell", idx="02", name="Vassell Enha Atthayya", role="Fullstack Developer · Cloud Engineer · UI/UX Designer", spirit="Kirin", jp="麒麟", meaning="Wisdom & Vision",
         portrait="/assets/raven/member-04-rizky.png", art="/assets/team/spirits/vassel-kirin.webp", accent=CYAN, mark="V"),
    dict(slug="evan", idx="03", name="Evan Octavianus Haryo Handoko", role="Web Developer · UI/UX Enthusiast · Digital Innovator", spirit="Serpent", jp="蛇", meaning="Adaptability & Strategy",
         portrait="/assets/raven/member-01-raka.png", art="/assets/team/spirits/evan-serpent.webp", accent=PINK, mark="E"),
    dict(slug="rizky", idx="04", name="Rizky Sandi Pratama", role="Product Strategy · Business Innovation · UI/UX", spirit="Koi", jp="鯉", meaning="Perseverance & Ambition",
         portrait="/assets/raven/member-02-vassel.png", art="/assets/team/spirits/rizky-koi.webp", accent=KIN, mark="N"),
]


def wrap(text, family, size, maxw, spacing=0.0):
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        _, tw = text_path(t, family, size, spacing)
        if tw <= maxw or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def card(m, k):
    art, _, _ = b64img(m["art"], max_w=340, fmt="JPEG", q=68)
    por, pw, ph = b64img(m["portrait"], max_w=300, fmt="WEBP", q=82)
    acc = m["accent"]
    d_idx, _ = text_path(m["idx"], "bebas", 22, spacing=3)
    d_jp, wj = text_path(m["jp"], "brush", 150 if len(m["jp"]) == 1 else 96)
    top = CH - 168
    d_sp, wsp = text_path(f"THE {m['spirit'].upper()}", "edo", 18, spacing=3)
    d_me, _ = text_path(m["meaning"].upper(), "manrope", 9, spacing=2.2)
    name_lines = wrap(m["name"], "manrope", 19, CW - 56, 0.4)
    name_svg = ""
    y = top + 52
    for i, ln in enumerate(name_lines):
        d, _ = text_path(ln, "manrope", 19, spacing=0.4)
        name_svg += f'<g transform="translate(28 {y + i * 23})"><path d="{d}" fill="{WASHI}"/></g>'
    y += (len(name_lines) - 1) * 23 + 10
    role_svg = ""
    if m["role"]:
        rl = wrap(m["role"].upper().replace(" · ", "  /  "), "manrope", 9.2, CW - 56, 1.5)[:2]
        for i, ln in enumerate(rl):
            d, _ = text_path(ln, "manrope", 9.2, spacing=1.5)
            role_svg += f'<g transform="translate(28 {y + 14 + i * 13})"><path d="{d}" fill="{MUTED}"/></g>'
    d_mark, wm = text_path(m["mark"], "bebas", 15, spacing=1)
    body = f"""
<defs>
 <clipPath id="cl{k}"><path d="M14 0H{CW}V{CH - 14}L{CW - 14} {CH}H0V14Z"/></clipPath>
 <linearGradient id="shade{k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SUMI}" stop-opacity="0"/><stop offset=".42" stop-color="{SUMI}" stop-opacity=".0"/><stop offset=".64" stop-color="{SUMI}" stop-opacity=".78"/><stop offset="1" stop-color="{SUMI}" stop-opacity=".97"/></linearGradient>
 <linearGradient id="tint{k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a0e18" stop-opacity=".78"/><stop offset="1" stop-color="#2a0509" stop-opacity=".9"/></linearGradient>
 <linearGradient id="edge{k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{acc}"/><stop offset=".5" stop-color="{KIN}"/><stop offset="1" stop-color="{SHU}"/></linearGradient>
</defs>
<path d="M14 0H{CW}V{CH - 14}L{CW - 14} {CH}H0V14Z" fill="{SUMI}"/>
<g clip-path="url(#cl{k})">
 <rect width="{CW}" height="{CH}" fill="url(#tint{k})"/>
 <rect width="{CW}" height="{CH}" fill="url(#seigaiha)" opacity=".18"/>
 <!-- spirit art, slow breathing zoom, blended into the crimson ground -->
 <g style="mix-blend-mode:screen" opacity=".92"><g><animateTransform attributeName="transform" type="translate" values="0 0;-6 -8;0 0" dur="9s" repeatCount="indefinite"/>
  <image href="{art}" x="-10" y="-16" width="{CW + 20}" height="{n((CW + 20) * 1.5)}" preserveAspectRatio="xMidYMin slice" opacity=".78"><animate attributeName="opacity" values=".62;.9;.62" dur="6s" repeatCount="indefinite"/></image></g></g>
 <!-- ghost kanji -->
 <g transform="translate({CW - wj - 14} {170 if len(m['jp']) == 1 else 130})"><path d="{d_jp}" fill="none" stroke="{WASHI}" stroke-width="1.4" opacity=".28"/></g>
 <!-- portrait -->
 <image href="{por}" x="{n((CW - 262) / 2)}" y="{n(CH - 262 * ph / pw - 150)}" width="262" height="{n(262 * ph / pw)}"/>
 <rect width="{CW}" height="{CH}" fill="url(#shade{k})"/>
 <!-- neon glint sweep -->
 <g style="mix-blend-mode:screen"><rect x="-120" y="-20" width="60" height="{CH + 40}" fill="url(#gSlash)" transform="skewX(-20)" opacity=".4"><animate attributeName="x" values="-120;{CW + 80};{CW + 80}" keyTimes="0;.3;1" dur="{n(6 + k * .7)}s" begin="{n(k * .9)}s" repeatCount="indefinite"/></rect></g>
 {embers(10, CW, CH, 30 + k, size=(.8, 1.8), dur=(3, 6), colors=(acc, SHU2, KIN2))}
 <!-- plate -->
 <rect x="28" y="{top - 6}" width="{CW - 56}" height="1" fill="{KIN}" opacity=".4"/>
 <g transform="translate(28 {top + 16})"><path d="{d_sp}" fill="{acc}" filter="url(#glowS)"/></g>
 <g transform="translate({CW - 28 - 100} {top + 16})" opacity="0"></g>
 <g transform="translate(28 {top + 30})"><path d="{d_me}" fill="{MUTED}"/></g>
 {name_svg}{role_svg}
 <!-- index tab -->
 <path d="M0 0H62V34L52 44H0Z" fill="{SHU}"/><path d="M0 0H62V34L52 44H0Z" fill="url(#seigaiha)" opacity=".4"/>
 <g transform="translate(14 30)"><path d="{d_idx}" fill="{WASHI}"/></g>
 <rect x="{CW - 40}" y="14" width="26" height="26" fill="{SHU}" transform="rotate(8 {CW - 27} 27)"/>
 <g transform="translate({CW - 27 - wm / 2} 32)"><path d="{d_mark}" fill="{WASHI}"/></g>
</g>
<path d="M14 .8H{CW - .8}V{CH - 14}L{CW - 14} {CH - .8}H.8V14Z" fill="none" stroke="url(#edge{k})" stroke-width="2"><animate attributeName="stroke-opacity" values="1;.55;1" dur="3.4s" begin="{n(k * .5)}s" repeatCount="indefinite"/></path>
{corner_brackets(8, 8, CW - 16, CH - 16, KIN, 12, 1.2, .6)}
"""
    return svg(CW, CH, body, title=f"{m['name']} — {m['spirit']} spirit")


def build(out):
    sizes = {}
    for k, m in enumerate(MEMBERS):
        fn = f"member-{m['slug']}.svg"
        sizes[fn] = write(out, fn, card(m, k))
    return sizes


if __name__ == "__main__":
    import sys
    print(build(sys.argv[1]))
