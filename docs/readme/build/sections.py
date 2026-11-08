"""Section headers, dividers, nav buttons."""
from common import *
from kfont import text_path

W = 1000


def section_header(num, en, jp, sub, ghost, seed):
    H = 170
    d_en, w_en = text_path(en, "edo", 84, spacing=3)
    d_jp, w_jp = text_path(jp, "brush", 40, spacing=6)
    d_gh, w_gh = text_path(ghost, "brush", 250)
    d_num, _ = text_path(num, "bebas", 30, spacing=6)
    d_sub, w_sub = text_path(sub.upper(), "manrope", 12.5, spacing=3.4)
    tx = 62
    body = f"""
<rect width="{W}" height="{H}" fill="{SUMI}"/>
<rect width="{W}" height="{H}" fill="url(#seigaiha)" opacity=".16"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="14s" repeatCount="indefinite"/></rect>
<rect x="-60" width="{W + 120}" height="{H}" fill="url(#seigaiha)" opacity=".16"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="14s" repeatCount="indefinite"/></rect>
<rect width="{W}" height="{H}" fill="url(#gFadeR)"/>
<radialGradient id="glow{seed}" cx=".15" cy=".5" r=".7"><stop offset="0" stop-color="{SHU}" stop-opacity=".38"/><stop offset="1" stop-color="{SHU}" stop-opacity="0"/></radialGradient>
<rect width="{W}" height="{H}" fill="url(#glow{seed})"/>
<!-- ghost kanji -->
<g transform="translate({W - 40 - w_gh} 205)"><path d="{d_gh}" fill="none" stroke="{SHU}" stroke-width="1.6" opacity=".5"/>
<path d="{d_gh}" fill="{SHU}" opacity=".09"><animate attributeName="opacity" values=".06;.17;.06" dur="5s" repeatCount="indefinite"/></path></g>
<!-- ink-red sun -->
<circle cx="{W - 120}" cy="70" r="46" fill="{SHU}" opacity=".18"/>
<!-- left spine -->
<rect x="0" y="0" width="10" height="{H}" fill="url(#gShu)"/>
<rect x="10" y="0" width="2" height="{H}" fill="{KIN}" opacity=".8"/>
<g fill="{KIN}" opacity=".9">{''.join(f'<circle cx="5" cy="{y}" r="1.6" fill="{SUMI}"/>' for y in range(12, H, 24))}</g>
<!-- numeral -->
<g transform="translate({tx} 40)"><path d="{d_num}" fill="{KIN}"/></g>
<rect x="{tx + 62}" y="30" width="{n(w_sub + 20)}" height="1.2" fill="{KIN}" opacity=".5"/>
<g transform="translate({tx + 62} 52)"><path d="{d_sub}" fill="{MUTED}"/></g>
<!-- title: hard shadow + neon -->
<g transform="translate({tx} 128)">
 <path d="{d_en}" fill="#000" transform="translate(5 5)" opacity=".85"/>
 <path d="{d_en}" fill="{SHU}" transform="translate(2.5 2.5)" opacity=".9"><animate attributeName="opacity" values=".9;.55;.9;.95;.6;.9" dur="4.2s" repeatCount="indefinite"/></path>
 <path d="{d_en}" fill="url(#gWashi)"/>
</g>
<!-- jp subtitle -->
<g transform="translate({W - 62 - w_jp} 148)"><path d="{d_jp}" fill="{KIN}" opacity=".95"/></g>
<!-- neon underline -->
<g filter="url(#glowR)"><rect x="{tx}" y="146" width="{n(min(w_en, 640))}" height="3" fill="{SHU2}"><animate attributeName="opacity" values="1;.55;1;.8;1" dur="3.1s" repeatCount="indefinite"/></rect></g>
<rect x="{tx}" y="152" width="{n(min(w_en, 640) * .55)}" height="1" fill="{KIN}" opacity=".7"/>
<!-- katana slash sweep -->
<g style="mix-blend-mode:screen"><rect x="-260" y="-20" width="130" height="{H + 40}" fill="url(#gSlash)" transform="skewX(-24)" opacity=".5"><animate attributeName="x" values="-260;{W + 160};{W + 160}" keyTimes="0;.28;1" dur="7s" repeatCount="indefinite"/></rect></g>
{embers(26, W, H, seed, size=(.8, 2.2), dur=(3, 7))}
{corner_brackets(18, 12, W - 36, H - 24, KIN, 14, 1.6, .55)}
"""
    return svg(W, H, body, title=f"{num} / {en}")


def divider(seed=3):
    H = 64
    body = f"""
<rect width="{W}" height="{H}" fill="{SUMI}"/>
<g><rect x="0" y="6" width="{W + 120}" height="52" fill="url(#seigaihaR)" opacity=".75"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="5s" repeatCount="indefinite"/></rect></g>
<rect width="{W}" height="{H}" fill="url(#gFadeL)" opacity=".7"/><rect width="{W}" height="{H}" fill="url(#gFadeR)" opacity=".7"/>
<g filter="url(#glowR)"><rect x="0" y="30" width="{W}" height="2.4" fill="{SHU2}" opacity=".9"/></g>
<rect x="0" y="33" width="{W}" height="1" fill="{KIN}" opacity=".5"/>
<!-- centre kamon -->
<g transform="translate({W / 2} 32)">
 <circle r="22" fill="{SUMI}" stroke="{KIN}" stroke-width="1.6"/>
 <circle r="17" fill="none" stroke="{SHU}" stroke-width="1"/>
 <g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite"/>
 {''.join(f'<use href="#petal" fill="{SHU2}" transform="rotate({k * 72}) translate(0 -9) scale(1.1)"/>' for k in range(5))}</g>
 <circle r="3.2" fill="{KIN}"/>
</g>
<g transform="translate({W / 2 - 150} 32)"><path d="M0 0 L-6 -5 L-12 0 L-6 5Z M-22 0 L-28 -5 L-34 0 L-28 5Z" fill="{KIN}" opacity=".8"/></g>
<g transform="translate({W / 2 + 150} 32)"><path d="M0 0 L6 -5 L12 0 L6 5Z M22 0 L28 -5 L34 0 L28 5Z" fill="{KIN}" opacity=".8"/></g>
{embers(14, W, H, seed, y_from=H, rise=H + 20, size=(.8, 1.8), dur=(2.5, 5))}
"""
    return svg(W, H, body, title="")


NAV = [("01", "ABOUT", "概要"), ("02", "TEAM", "人"), ("03", "WORK", "作品"), ("04", "AWARDS", "栄"), ("05", "STACK", "道具"), ("06", "RUN", "始")]


def nav_button(num, label, jp):
    w, h = 150, 52
    d_l, wl = text_path(label, "edo", 22, spacing=2.4)
    d_n, _ = text_path(num, "bebas", 13, spacing=1)
    d_j, wj = text_path(jp, "brush", 22)
    body = f"""
<defs><clipPath id="c"><path d="M10 0H{w}V{h - 10}L{w - 10} {h}H0V10Z"/></clipPath></defs>
<path d="M10 0H{w}V{h - 10}L{w - 10} {h}H0V10Z" fill="{SUMI3}"/>
<g clip-path="url(#c)">
 <rect width="{w}" height="{h}" fill="url(#seigaihaR)" opacity=".35"/>
 <rect x="-60" y="-10" width="40" height="{h + 20}" fill="url(#gSlash)" transform="skewX(-22)" opacity=".55"><animate attributeName="x" values="-60;{w + 40};{w + 40}" keyTimes="0;.35;1" dur="4.5s" repeatCount="indefinite"/></rect>
 <rect width="5" height="{h}" fill="url(#gShu)"/>
</g>
<path d="M10 .8H{w - .8}V{h - 10}L{w - 10} {h - .8}H.8V10Z" fill="none" stroke="{KIN}" stroke-width="1.4"/>
<g transform="translate(18 20)"><path d="{d_n}" fill="{KIN}"/></g>
<g transform="translate(18 42)"><path d="{d_l}" fill="{WASHI}"/></g>
<g transform="translate({w - 16 - wj} 42)" opacity=".55"><path d="{d_j}" fill="{SHU2}"/></g>
"""
    return svg(w, h, body, title=label)


def build(out):
    sizes = {}
    heads = [
        ("section-01.svg", "01", "ABOUT", "概要", "who we are", "組", 11),
        ("section-02.svg", "02", "THE FOUR", "四人", "meet the team", "人", 12),
        ("section-03.svg", "03", "SELECTED WORK", "作品", "case studies", "作", 13),
        ("section-04.svg", "04", "HONOURS", "栄誉", "competition results", "栄", 14),
        ("section-05.svg", "05", "ARSENAL", "道具", "tools & stack", "道", 15),
        ("section-06.svg", "06", "ENTER THE STREET", "始動", "run it locally", "始", 16),
    ]
    for fn, num, en, jp, sub, ghost, seed in heads:
        sizes[fn] = write(out, fn, section_header(num, en, jp, sub, ghost, seed))
    sizes["divider-wave.svg"] = write(out, "divider-wave.svg", divider())
    for i, (nm, lb, jp) in enumerate(NAV):
        fn = f"nav-{i + 1}.svg"
        sizes[fn] = write(out, fn, nav_button(nm, lb, jp))
    return sizes


if __name__ == "__main__":
    import sys
    print(build(sys.argv[1]))
