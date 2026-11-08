"""Project case-study cards (data from src/data/pharvia.ts and amanin.ts)."""
from common import *
from kfont import text_path
from cards import wrap

W, H = 1000, 676

PROJECTS = [
    dict(fn="project-pharvia.svg", name="PHARVIA", sub="Digital Pharmaceutical Take-Back & Traceability Platform",
         tagline="Turning Unused Medicines into Traceable Impact.", img="/assets/projects/pharvia/pharvia-mobile-showcase.webp",
         tags=["HEALTHTECH", "SUSTAINABILITY", "DIGITAL INNOVATION", "PRODUCT DESIGN"],
         badge="1ST PLACE", badge2="Business Model Canvas · USK Pharmacy Fair 2026", accent=AMBER, jp="薬", seed=21,
         stats=[("86.7%", "of leftover household medicines still end up in household waste"),
                ("<2%", "of medicines return through official channels"),
                ("30,527", "pharmacies in Indonesia could become collection points")],
         foot="Team Halte Terminal Corruscant   ·   Status: proposed concept with UI mockups"),
    dict(fn="project-amanin.svg", name="AMANIN", sub="AI Anti-Scam Decision Assistant",
         tagline="Think Before You Click. Verify Before You Trust.", img="/assets/projects/amanin/amanin-mobile-showcase.png",
         tags=["AI", "CYBERSECURITY", "FINTECH", "DIGITAL INNOVATION"],
         badge="2ND PLACE", badge2="Business Proposal · RISE 2026", accent=CYAN, jp="守", seed=22,
         stats=[("668K+", "scam reports recorded by IASC through August 2026"),
                ("66%", "of Indonesian adults exposed to scam attempts (GASA)"),
                ("14.05%", "gap between financial inclusion and financial literacy")],
         foot="Team Halte Terminal Rawamangun   ·   Status: proposed concept with UI mockups"),
]


def card(p):
    img, iw, ih = b64img(p["img"], max_w=1000, fmt="WEBP", q=80)
    acc = p["accent"]
    d_name, wn = text_path(p["name"], "edo", 118, spacing=4)
    d_sub, _ = text_path(p["sub"].upper(), "manrope", 12, spacing=2.6)
    d_tag, _ = text_path(p["tagline"], "serifi", 27)
    d_jp, wj = text_path(p["jp"], "brush", 300)
    d_badge, wb = text_path(p["badge"], "edo", 30, spacing=3)
    d_b2, wb2 = text_path(p["badge2"].upper(), "manrope", 10.5, spacing=2)
    bw = max(wb, wb2) + 44
    band = 360
    stat_svg = ""
    cw = (W - 120) / 3
    for i, (v, lb) in enumerate(p["stats"]):
        x = 60 + i * cw
        dv, wv = text_path(v, "edo", 58, spacing=2)
        lines = wrap(lb, "manrope", 12, cw - 44, 0.2)[:3]
        ls = "".join(f'<g transform="translate(0 {i2 * 17})"><path d="{text_path(l, "manrope", 12, spacing=0.2)[0]}" fill="{MUTED}"/></g>' for i2, l in enumerate(lines))
        stat_svg += f"""<g transform="translate({n(x)} {band + 68})">
 <rect x="-14" y="-12" width="{n(cw - 12)}" height="150" fill="{SUMI3}" opacity=".85"/>
 <rect x="-14" y="-12" width="3" height="150" fill="{acc}"><animate attributeName="opacity" values="1;.4;1" dur="{n(3 + i * .6)}s" repeatCount="indefinite"/></rect>
 <g transform="translate(6 62)"><path d="{dv}" fill="url(#gKin)"/></g>
 <g transform="translate(6 92)">{ls}</g></g>"""
    tags_svg, tx = "", 60
    for t in p["tags"]:
        d, tw = text_path(t, "manrope", 10.5, spacing=2)
        tags_svg += f'<g transform="translate({n(tx)} {H - 74})"><rect x="0" y="-15" width="{n(tw + 28)}" height="26" fill="none" stroke="{KIN}" stroke-width="1" opacity=".75"/><g transform="translate(14 0)"><path d="{d}" fill="{WASHI}"/></g></g>'
        tx += tw + 40
    d_foot, _ = text_path(p["foot"].upper(), "manrope", 10, spacing=2)
    body = f"""
<defs><clipPath id="band"><rect x="0" y="0" width="{W}" height="{band}"/></clipPath>
<linearGradient id="bandFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SUMI}" stop-opacity=".25"/><stop offset=".55" stop-color="{SUMI}" stop-opacity=".1"/><stop offset="1" stop-color="{SUMI}" stop-opacity="1"/></linearGradient>
<linearGradient id="bandSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{SUMI}" stop-opacity=".92"/><stop offset=".5" stop-color="{SUMI}" stop-opacity=".25"/><stop offset="1" stop-color="{SUMI}" stop-opacity="0"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="{SUMI}"/>
<g clip-path="url(#band)">
 <rect width="{W}" height="{band}" fill="#3a070d"/>
 <rect width="{W}" height="{band}" fill="url(#seigaiha)" opacity=".22"/>
 <circle cx="{W - 230}" cy="150" r="130" fill="{SHU}" opacity=".5"><animate attributeName="r" values="126;136;126" dur="6s" repeatCount="indefinite"/></circle>
 <g transform="translate({W - 80 - wj} 330)" opacity=".18"><path d="{d_jp}" fill="none" stroke="{WASHI}" stroke-width="2"/></g>
 <image href="{img}" x="{W - 740 - 24}" y="{n(band / 2 - 740 * ih / iw / 2 - 30)}" width="740" height="{n(740 * ih / iw)}"><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="7s" repeatCount="indefinite"/></image>
 <rect width="{W}" height="{band}" fill="url(#bandSide)"/>
 <rect width="{W}" height="{band}" fill="url(#bandFade)"/>
 <g style="mix-blend-mode:screen"><rect x="-200" y="-10" width="120" height="{band + 20}" fill="url(#gSlash)" transform="skewX(-24)" opacity=".28"><animate attributeName="x" values="-200;{W + 100};{W + 100}" keyTimes="0;.32;1" dur="9s" repeatCount="indefinite"/></rect></g>
 {petals(9, W, band, p['seed'], size=(.6, 1.1))}
</g>
<!-- title block -->
<g transform="translate(46 {band - 118})"><path d="{d_sub}" fill="{KIN}"/></g>
<g transform="translate(46 {band - 20})"><path d="{d_name}" fill="#000" transform="translate(6 6)" opacity=".8"/><path d="{d_name}" fill="{SHU}" transform="translate(3 3)"/><path d="{d_name}" fill="url(#gWashi)"/></g>
<g transform="translate({46 + min(wn, 560) + 28} {band - 30})"><path d="{d_tag}" fill="{WASHI}" opacity=".0"/></g>
<!-- rank badge -->
<g transform="translate({W - 40 - bw} 30)">
 <path d="M0 0H{n(bw)}V58L{n(bw - 14)} 70H0Z" fill="url(#gShu)"/><path d="M0 0H{n(bw)}V58L{n(bw - 14)} 70H0Z" fill="url(#seigaiha)" opacity=".35"/>
 <path d="M3 3H{n(bw - 3)}V56L{n(bw - 16)} 67H3Z" fill="none" stroke="{KIN}" stroke-width="1.4"/>
 <g transform="translate(22 35)"><path d="{d_badge}" fill="{WASHI}"/></g>
 <g transform="translate(22 54)"><path d="{d_b2}" fill="{KIN2}"/></g>
</g>
<!-- tagline under band -->
<g transform="translate(60 {band + 42})"><path d="{d_tag}" fill="{KIN2}"/></g>
<rect x="0" y="{band - 1}" width="{W}" height="3" fill="{SHU}"/><rect x="0" y="{band + 2}" width="{W}" height="1" fill="{KIN}" opacity=".7"/>
{stat_svg}
{tags_svg}
<g transform="translate(60 {H - 28})"><path d="{d_foot}" fill="{MUTED}" opacity=".85"/></g>
<rect x="0" y="{H - 8}" width="{W}" height="8" fill="url(#hazard)" opacity=".9"><animateTransform attributeName="transform" type="translate" from="0 0" to="-39.6 0" dur="2.2s" repeatCount="indefinite"/></rect>
{embers(16, W, H, p['seed'] + 5, size=(.8, 2), dur=(4, 8))}
{corner_brackets(8, 8, W - 16, H - 16, KIN, 20, 1.6, .6)}
"""
    return svg(W, H, body, title=f"{p['name']} — {p['sub']}")


def build(out):
    return {p["fn"]: write(out, p["fn"], card(p)) for p in PROJECTS}


if __name__ == "__main__":
    import sys
    print(build(sys.argv[1]))
