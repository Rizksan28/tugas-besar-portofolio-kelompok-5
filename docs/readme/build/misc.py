"""About card, awards, arsenal marquee, built-with lanterns, sitemap, footer skyline."""
import random
from common import *
from kfont import text_path
from cards import wrap

W = 1000


# ------------------------------------------------------------------ ABOUT
def about_card():
    H = 470
    q = "We believe great ideas are built through collaboration, curiosity, and the courage to create."
    lines = wrap(q, "serifi", 38, 840, 0)
    q_svg = "".join(f'<g transform="translate(78 {122 + i * 46})"><path d="{text_path(l, "serifi", 38)[0]}" fill="{WASHI}"/></g>' for i, l in enumerate(lines))
    d_h, _ = text_path("FOUR MINDS. ONE VISION.", "edo", 30, spacing=3)
    d_eb, _ = text_path("OUR BELIEF", "manrope", 11, spacing=4)
    d_cl, _ = text_path("KELOMPOK 5  /  A MULTIDISCIPLINARY CREATIVE TECHNOLOGY COLLECTIVE", "manrope", 10.5, spacing=2.2)
    pr = [("好奇", "Curiosity before convention.", PINK), ("協力", "Collaboration over ego.", CYAN), ("匠", "Craft with intention.", AMBER), ("技", "Technology with purpose.", SHU2)]
    pw = (W - 120 - 3 * 14) / 4
    tiles = ""
    for i, (kj, tx, c) in enumerate(pr):
        x = 60 + i * (pw + 14)
        dk, wk = text_path(kj, "brush", 74 if len(kj) == 1 else 56)
        dn, _ = text_path(f"0{i + 1}", "bebas", 18, spacing=2)
        tl = wrap(tx, "manrope", 13.5, pw - 36, .3)
        ts = "".join(f'<g transform="translate(18 {106 + j * 19})"><path d="{text_path(l, "manrope", 13.5, spacing=.3)[0]}" fill="{WASHI}"/></g>' for j, l in enumerate(tl))
        tiles += f"""<g transform="translate({n(x)} 298)">
 <rect width="{n(pw)}" height="140" fill="{SUMI3}"/><rect width="{n(pw)}" height="140" fill="url(#seigaiha)" opacity=".1"/>
 <rect width="{n(pw)}" height="3" fill="{c}"><animate attributeName="opacity" values="1;.35;1" dur="{n(3 + i * .5)}s" repeatCount="indefinite"/></rect>
 <g transform="translate({n(pw - wk - 10)} 78)"><path d="{dk}" fill="none" stroke="{c}" stroke-width="1.4" opacity=".55"/><path d="{dk}" fill="{c}" opacity=".12"/></g>
 <g transform="translate(18 34)"><path d="{dn}" fill="{c}"/></g>{ts}
 {corner_brackets(0, 0, pw, 140, KIN, 8, 1, .5)}</g>"""
    body = f"""
<rect width="{W}" height="{H}" fill="{SUMI}"/>
<rect width="{W + 60}" height="{H}" fill="url(#seigaihaR)" opacity=".08"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="20s" repeatCount="indefinite"/></rect>
<rect x="60" y="0" width="{W}" height="250" fill="url(#seigaihaR)" opacity=".0"/>
<radialGradient id="abg" cx=".2" cy=".4" r=".8"><stop offset="0" stop-color="{SHU}" stop-opacity=".3"/><stop offset="1" stop-color="{SHU}" stop-opacity="0"/></radialGradient>
<rect width="{W}" height="{H}" fill="url(#abg)"/>
<g transform="translate(34 30)"><text/></g>
<g transform="translate(78 46)"><path d="{d_eb}" fill="{KIN}"/></g>
<rect x="78" y="56" width="46" height="2" fill="{SHU2}"/>
<g font-size="150" transform="translate(30 150)"><g transform="translate(-4 36) scale(.9)"><path d="{text_path('“', 'serifi', 190)[0]}" fill="{SHU}" opacity=".35"/></g></g>
{q_svg}
<g transform="translate(78 {122 + len(lines) * 46 + 36})"><path d="{d_h}" fill="url(#gKin)"/></g>
<g transform="translate(78 {122 + len(lines) * 46 + 66})"><path d="{d_cl}" fill="{MUTED}"/></g>
{tiles}
{embers(14, W, H, 41, size=(.8, 2), dur=(4, 8))}
"""
    return svg(W, H, body, title="About Kelompok 5 — Four minds. One vision.")


# ------------------------------------------------------------------ AWARDS
def awards():
    H = 520
    items = [
        dict(x=0, num="1", rank="1ST PLACE", proj="PHARVIA", comp="Business Model Canvas Competition", ev="USK Pharmacy Fair 2026", org="HIMAFAR · Universitas Syiah Kuala",
             date="October 2026", team="Halte Terminal Corruscant", img="/assets/projects/pharvia/pharvia-award.jpg", c1="#fff3c4", c2=KIN, c3="#8a5a20", glow=AMBER),
        dict(x=1, num="2", rank="2ND PLACE", proj="AMANIN", comp="Business Proposal Competition", ev="RISE 2026", org="UKM HIPMI PT UPN Veteran Jawa Timur",
             date="2026", team="Halte Terminal Rawamangun", img="/assets/projects/amanin/amanin-rise-presentation.png", c1="#ffffff", c2="#c9d2da", c3="#68727c", glow=CYAN),
    ]
    out = ""
    pw = 480
    for k, it in enumerate(items):
        x = 20 + k * (pw + 20)
        img, iw, ih = b64img(it["img"], max_w=520, fmt="JPEG", q=72)
        dn, wn = text_path(it["num"], "edo", 58)
        dr, _ = text_path(it["rank"], "edo", 36, spacing=3)
        dp, _ = text_path(it["proj"], "edo", 28, spacing=4)
        dc = text_path(it["comp"].upper(), "manrope", 11.5, spacing=2)[0]
        de = text_path(it['ev'] if it['date'] in it['ev'] else f"{it['ev']}  ·  {it['date']}", "manrope", 13, spacing=.6)[0]
        dor = text_path(it["org"], "manrope", 11.5, spacing=.4)[0]
        dt = text_path("TEAM " + it["team"].upper(), "manrope", 10.5, spacing=2)[0]
        out += f"""<g transform="translate({x} 10)">
 <defs><linearGradient id="med{k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{it['c1']}"/><stop offset=".5" stop-color="{it['c2']}"/><stop offset="1" stop-color="{it['c3']}"/></linearGradient>
 <clipPath id="ph{k}"><rect x="0" y="0" width="{pw}" height="270"/></clipPath></defs>
 <rect width="{pw}" height="500" fill="{SUMI3}"/><rect width="{pw}" height="500" fill="url(#seigaiha)" opacity=".08"/>
 <g clip-path="url(#ph{k})"><image href="{img}" x="0" y="{n(135 - pw * ih / iw / 2)}" width="{pw}" height="{n(pw * ih / iw)}" preserveAspectRatio="xMidYMid slice"><animate attributeName="opacity" values=".92;1;.92" dur="5s" repeatCount="indefinite"/></image>
  <rect width="{pw}" height="270" fill="url(#shadeP)"/><rect width="{pw}" height="270" fill="{SHU}" opacity=".12"/>
  <g style="mix-blend-mode:screen"><rect x="-120" y="-10" width="80" height="290" fill="url(#gSlash)" transform="skewX(-22)" opacity=".4"><animate attributeName="x" values="-120;{pw + 60};{pw + 60}" keyTimes="0;.3;1" dur="8s" begin="{k * 2}s" repeatCount="indefinite"/></rect></g></g>
 <!-- medal -->
 <g transform="translate(78 270)">
  <path d="M-26 -60 L-34 -10 L0 -26 L34 -10 L26 -60Z" fill="{SHU}"/><path d="M-26 -60 L-12 -60 L-14 -20 L-34 -10Z" fill="{SHU_D}" opacity=".7"/>
  <g filter="url(#glowR)"><circle r="54" fill="url(#med{k})"><animate attributeName="r" values="53;56;53" dur="4s" repeatCount="indefinite"/></circle></g>
  <circle r="54" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="2"/><circle r="45" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>
  <g transform="translate({n(-wn / 2)} 20)"><path d="{dn}" fill="#2a1306" opacity=".9"/></g>
  <circle r="54" fill="url(#gSlash)" opacity="0"><animate attributeName="opacity" values="0;.55;0" keyTimes="0;.1;.4" dur="5s" begin="{k * 1.4}s" repeatCount="indefinite"/></circle>
 </g>
 <g transform="translate(150 316)"><path d="{dr}" fill="url(#med{k})" filter="url(#glowS)"/></g>
 <g transform="translate(150 344)"><path d="{dp}" fill="{WASHI}"/></g>
 <rect x="30" y="368" width="{pw - 60}" height="1" fill="{KIN}" opacity=".45"/>
 <g transform="translate(30 396)"><path d="{dc}" fill="{KIN}"/></g>
 <g transform="translate(30 424)"><path d="{de}" fill="{WASHI}"/></g>
 <g transform="translate(30 446)"><path d="{dor}" fill="{MUTED}"/></g>
 <g transform="translate(30 478)"><path d="{dt}" fill="{it['glow']}" opacity=".9"/></g>
 <rect x="0" y="0" width="{pw}" height="500" fill="none" stroke="{KIN}" stroke-width="1.4" opacity=".8"/>
 {corner_brackets(6, 6, pw - 12, 488, KIN, 14, 1.4, .8)}
</g>"""
    body = f"""<defs><linearGradient id="shadeP" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="{SUMI3}" stop-opacity="0"/><stop offset="1" stop-color="{SUMI3}" stop-opacity=".98"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="{SUMI}"/>{out}{embers(18, W, H, 77, size=(.8, 2), dur=(4, 9))}"""
    return svg(W, H, body, title="1st place PHARVIA (USK Pharmacy Fair 2026) and 2nd place AMANIN (RISE 2026)")


# ------------------------------------------------------------------ ARSENAL (marquee)
TOOLS = ["figma", "canva", "photoshop", "vscode", "laravel", "mysql", "jira", "trello", "microsoft-teams", "sap", "excel", "python"]
NAMES = dict(figma="Figma", canva="Canva", photoshop="Photoshop", vscode="VS Code", laravel="Laravel", mysql="MySQL", jira="Jira", trello="Trello",
             sap="SAP ERP", excel="Excel", python="Python")
NAMES["microsoft-teams"] = "Teams"
CAT = dict(figma="DESIGN", canva="DESIGN", photoshop="DESIGN", vscode="DEV", laravel="DEV", mysql="DEV", jira="PM", trello="PM", sap="BIZ", excel="BIZ", python="BIZ")
CAT["microsoft-teams"] = "PM"


def tile(tid, x, y):
    uri = svg_data_uri(f"/assets/tools/{tid}.svg")
    dn, wn = text_path(NAMES[tid].upper(), "edo", 19, spacing=2)
    dc, wc = text_path(CAT[tid], "manrope", 8.5, spacing=2.4)
    return f"""<g transform="translate({x} {y})">
 <path d="M8 0H148V104L140 112H0V8Z" fill="{SUMI3}" stroke="{KIN}" stroke-width="1.2"/>
 <rect x="8" y="10" width="132" height="64" fill="url(#gWashi)" opacity=".97"/>
 <image href="{uri}" x="{74 - 24}" y="{42 - 24}" width="48" height="48"/>
 <rect x="8" y="74" width="132" height="2" fill="{SHU}"/>
 <g transform="translate({n(74 - wn / 2)} 100)"><path d="{dn}" fill="{WASHI}"/></g>
 <g transform="translate({n(138 - wc)} 22)" opacity="0"><path d="{dc}" fill="{SHU}"/></g></g>"""


def arsenal():
    H = 330
    row1, row2 = TOOLS[:6], TOOLS[6:]
    step = 164

    def row(ids, y, direction):
        rep = "".join(tile(t, i * step + r * step * len(ids), 0) for r in range(3) for i, t in enumerate(ids))
        total = step * len(ids)
        frm, to = (0, -total) if direction < 0 else (-total, 0)
        return f'<g transform="translate(0 {y})"><g><animateTransform attributeName="transform" type="translate" from="{frm} 0" to="{to} 0" dur="34s" repeatCount="indefinite"/>{rep}</g></g>'
    body = f"""
<rect width="{W}" height="{H}" fill="{SUMI}"/>
<rect width="{W}" height="{H}" fill="url(#seigaihaR)" opacity=".1"/>
<rect x="0" y="22" width="{W}" height="2" fill="{SHU}" opacity=".7"/><rect x="0" y="{H - 30}" width="{W}" height="2" fill="{SHU}" opacity=".7"/>
{row(row1, 40, -1)}{row(row2, 176, 1)}
<rect width="{W}" height="{H}" fill="url(#gFadeR)" opacity=".0"/>
<linearGradient id="mqL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{SUMI}"/><stop offset="1" stop-color="{SUMI}" stop-opacity="0"/></linearGradient>
<rect width="90" height="{H}" fill="url(#mqL)"/><rect x="{W - 90}" width="90" height="{H}" fill="url(#mqL)" transform="rotate(180 {W - 45} {H / 2})"/>
<g filter="url(#glowR)"><rect x="0" y="22" width="{W}" height="1.4" fill="{SHU2}"><animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite"/></rect></g>
{embers(14, W, H, 55, size=(.8, 1.8), dur=(4, 8))}
"""
    return svg(W, H, body, title="Tools used by the team: Figma, Canva, Photoshop, VS Code, Laravel, MySQL, Jira, Trello, Teams, SAP ERP, Excel, Python")


# ------------------------------------------------------------------ BUILT WITH (swinging lanterns)
def built_with():
    H = 230
    items = [("React", "19", "反", CYAN), ("Vite", "8", "速", AMBER), ("TypeScript", "5", "型", PINK), ("Tailwind CSS", "4", "風", CYAN), ("Node", "22", "核", AMBER)]
    out = ""
    step = W / len(items)
    for i, (nm, v, kj, c) in enumerate(items):
        cx = step * i + step / 2
        dn, wn = text_path(nm.upper(), "edo", 22 if len(nm) < 9 else 17, spacing=2)
        dv, wv = text_path(v, "edo", 52)
        dk, wk = text_path(kj, "brush", 34)
        sw = 5 + (i % 2)
        out += f"""<g transform="translate({n(cx)} 0)"><g><animateTransform attributeName="transform" type="rotate" values="{-sw};{sw};{-sw}" dur="{n(4.2 + i * .5)}s" begin="{n(-i * .7)}s" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" keyTimes="0;.5;1" repeatCount="indefinite"/>
 <line x1="0" y1="0" x2="0" y2="38" stroke="{KIN}" stroke-width="2"/>
 <rect x="-26" y="36" width="52" height="8" fill="{KIN}"/>
 <path d="M-58 44H58L66 60V176L58 192H-58L-66 176V60Z" fill="#1b0509" stroke="{c}" stroke-width="2" filter="url(#glowS)"/>
 <path d="M-58 44H58L66 60V176L58 192H-58L-66 176V60Z" fill="url(#seigaihaR)" opacity=".28"/>
 <rect x="-66" y="96" width="132" height="1.4" fill="{c}" opacity=".6"/>
 <g transform="translate({n(-wk / 2)} 84)"><path d="{dk}" fill="{c}" opacity=".85"/></g>
 <g transform="translate({n(-wv / 2)} 150)"><path d="{dv}" fill="url(#gWashi)"/></g>
 <g transform="translate({n(-wn / 2)} 178)"><path d="{dn}" fill="{WASHI}"/></g>
 <rect x="-26" y="190" width="52" height="8" fill="{KIN}"/><path d="M-10 198V218M0 198V224M10 198V218" stroke="{SHU2}" stroke-width="2.4"/>
 <circle cx="0" cy="118" r="60" fill="{c}" opacity=".06"><animate attributeName="opacity" values=".04;.14;.04" dur="{n(2.6 + i * .4)}s" repeatCount="indefinite"/></circle>
</g></g>"""
    body = f'<rect width="{W}" height="{H}" fill="{SUMI}"/><rect width="{W}" height="{H}" fill="url(#seigaiha)" opacity=".07"/><rect y="0" width="{W}" height="4" fill="{KIN}" opacity=".6"/>{out}'
    return svg(W, H, body, title="Built with React 19, Vite 8, TypeScript 5, Tailwind CSS 4, Node 22")


# ------------------------------------------------------------------ SITEMAP
def sitemap():
    H = 380
    nodes = {}

    def node(key, x, y, w, label, sub, c=KIN, big=False):
        nodes[key] = (x, y, w)
        dl, wl = text_path(label, "edo", 24 if big else 19, spacing=2)
        ds, ws = text_path(sub, "manrope", 10, spacing=1.2)
        h = 56 if big else 50
        k = len(nodes)
        return f"""<g transform="translate({n(x - w / 2)} {y})">
 <rect width="{w}" height="{h}" fill="{SUMI3}" stroke="{c}" stroke-width="1.6"><animate attributeName="stroke-opacity" values="1;.4;1" dur="{n(3 + k * .23)}s" begin="{n(k * .2)}s" repeatCount="indefinite"/></rect>
 <rect width="4" height="{h}" fill="{c}"/>
 <g transform="translate({n(w / 2 - wl / 2 + 2)} {20 if not big else 24})"><path d="{dl}" fill="{WASHI}"/></g>
 <g transform="translate({n(w / 2 - ws / 2 + 2)} {h - 10})"><path d="{ds}" fill="{MUTED}"/></g></g>"""

    ns = ""
    ns += node("home", 500, 18, 170, "HOME", "/", SHU2, True)
    top = [("projects", 150, "PROJECTS", "/projects", KIN), ("team", 518, "TEAM", "/team", CYAN), ("ach", 760, "ACHIEVEMENTS", "/achievements", AMBER), ("about", 925, "ABOUT", "/about · /contact", PINK)]
    tw = dict(projects=190, team=190, ach=190, about=134)
    for key, x, lb, sb, c in top:
        ns += node(key, x, 138, tw[key], lb, sb, c)
    ns += node("pharvia", 80, 272, 126, "PHARVIA", "/projects/pharvia", KIN)
    ns += node("amanin", 222, 272, 126, "AMANIN", "/projects/amanin", KIN)
    for i, (m, c) in enumerate([("raka", AMBER), ("vassel", CYAN), ("evan", PINK), ("rizky", KIN)]):
        ns += node(m, 350 + i * 112, 272, 104, m.upper(), f"/team/{m}", c)
    lines = ""

    def link(a, b, ya=None, yb=None, c=KIN2, delay=0):
        nonlocal lines
        ax, ay, aw = nodes[a]
        bx, by, bw = nodes[b]
        y1 = ay + (56 if a == "home" else 50)
        y2 = by
        mid = (y1 + y2) / 2
        d = f"M{n(ax)} {y1} C{n(ax)} {n(mid)} {n(bx)} {n(mid)} {n(bx)} {y2}"
        lines += f'<path d="{d}" fill="none" stroke="{SHU}" stroke-width="1.6" opacity=".55"/><path d="{d}" fill="none" stroke="{c}" stroke-width="2.2" stroke-dasharray="6 14" filter="url(#glowS)"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.1s" begin="{delay}s" repeatCount="indefinite"/></path>'

    for key, *_ in top:
        link("home", key)
    link("projects", "pharvia")
    link("projects", "amanin")
    for m in ["raka", "vassel", "evan", "rizky"]:
        link("team", m, c=CYAN)
    cap = text_path("PUSH-STATE ROUTER IN App.tsx  ·  NO ROUTING LIBRARY", "manrope", 10, spacing=2.4)[0]
    body = f"""<rect width="{W}" height="{H}" fill="{SUMI}"/><rect width="{W}" height="{H}" fill="url(#seigaihaR)" opacity=".07"/>
{lines}{ns}
<g transform="translate({W - 30 - 470} {H - 18})"><path d="{cap}" fill="{MUTED}" opacity=".8"/></g>
{embers(12, W, H, 88, size=(.8, 1.8), dur=(5, 9))}{corner_brackets(8, 8, W - 16, H - 16, KIN, 16, 1.4, .5)}"""
    return svg(W, H, body, title="Site map: Home, Projects (Pharvia, Amanin), Team (four member profiles), Achievements, About")


# ------------------------------------------------------------------ FOOTER SKYLINE
def footer():
    H = 420
    r = random.Random(8)
    sky = f'<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0306"/><stop offset=".6" stop-color="#3a0710"/><stop offset="1" stop-color="#7a1018"/></linearGradient>'
    stars = "".join(f'<circle cx="{n(r.uniform(0, W))}" cy="{n(r.uniform(0, 160))}" r="{n(r.uniform(.5, 1.3))}" fill="{KIN2}" opacity=".7"><animate attributeName="opacity" values=".15;.9;.15" dur="{n(r.uniform(2, 6))}s" begin="{n(-r.uniform(0, 5))}s" repeatCount="indefinite"/></circle>' for _ in range(60))
    base = 330

    def layer(seed, hmin, hmax, col, wmin, wmax, win=False, op=1):
        rr = random.Random(seed)
        x, out, wins = -20, "", ""
        while x < W + 20:
            w = rr.uniform(wmin, wmax)
            h = rr.uniform(hmin, hmax)
            out += f'<rect x="{n(x)}" y="{n(base - h)}" width="{n(w)}" height="{n(h + 40)}" fill="{col}"/>'
            if rr.random() < .35:
                out += f'<path d="M{n(x - 4)} {n(base - h)}L{n(x + w / 2)} {n(base - h - 14)}L{n(x + w + 4)} {n(base - h)}Z" fill="{col}"/>'
            if win:
                for wx in range(int(x + 6), int(x + w - 6), 11):
                    for wy in range(int(base - h + 10), int(base - 6), 14):
                        if rr.random() < .3:
                            c = rr.choice((AMBER, KIN2, PINK, CYAN))
                            wins += f'<rect x="{wx}" y="{wy}" width="4" height="6" fill="{c}"><animate attributeName="opacity" values="1;.2;1" dur="{n(rr.uniform(2, 8))}s" begin="{n(-rr.uniform(0, 8))}s" repeatCount="indefinite"/></rect>'
            x += w + rr.uniform(-4, 6)
        return f'<g opacity="{op}">{out}</g>{wins}'

    def sign(x, y, text, c, fam="sign", size=24, vertical=False):
        d, w = text_path(text, fam, size, spacing=2)
        return f"""<g transform="translate({x} {y})" filter="url(#glowR)"><rect x="-8" y="{-size - 4}" width="{n(w + 16)}" height="{size + 14}" fill="#0b0408" stroke="{c}" stroke-width="2"/>
 <path d="{d}" fill="{c}"><animate attributeName="opacity" values="1;1;.25;1;.6;1;1" keyTimes="0;.5;.52;.55;.58;.6;1" dur="{n(5 + (x % 7))}s" repeatCount="indefinite"/></path></g>"""

    d_big, wb = text_path("KELOMPOK 5", "edo", 112, spacing=6)
    d_jp, wj = text_path("第五組", "brush", 56, spacing=8)
    d_sm, ws = text_path("FOUR MINDS  ·  ONE COLLECTIVE  ·  ENDLESS POSSIBILITIES", "manrope", 12.5, spacing=4)
    body = f"""<defs>{sky}<linearGradient id="street" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14070b"/><stop offset="1" stop-color="#050203"/></linearGradient>
<linearGradient id="refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SHU}" stop-opacity=".35"/><stop offset="1" stop-color="{SHU}" stop-opacity="0"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="url(#sky)"/>
{stars}
<circle cx="760" cy="104" r="64" fill="#ff3b3f" opacity=".92"><animate attributeName="opacity" values=".85;1;.85" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="760" cy="104" r="96" fill="{SHU}" opacity=".2" filter="url(#glowL)"/>
<rect width="{W}" height="{base}" fill="url(#seigaiha)" opacity=".05"/>
{layer(3, 80, 170, "#2b0e18", 40, 90, True, .95)}
{layer(5, 50, 120, "#1b0910", 50, 110, True)}
{layer(9, 20, 70, "#0a0407", 60, 130, False)}
{sign(120, 262, "夜", PINK, "sign", 30)}{sign(330, 288, "NIGHT CAFÉ", CYAN, "manrope", 16)}{sign(560, 270, "第五組", AMBER, "sign", 26)}{sign(850, 292, "24H", PINK, "manrope", 18)}
<rect y="{base}" width="{W}" height="{H - base}" fill="url(#street)"/>
<rect y="{base}" width="{W}" height="{H - base}" fill="url(#refl)" opacity=".5"/>
<g opacity=".28" transform="translate(0 {2 * base + 4}) scale(1 -1)">{layer(3, 80, 170, "#7a1018", 40, 90, False, .35)}</g>
<rect y="{base}" width="{W}" height="{H - base}" fill="url(#street)" opacity=".7"/>
<rect y="{base}" width="{W}" height="2" fill="{SHU2}" opacity=".7"/>
{rain(110, W, H, 6, "#c0cbff", .3)}
<g transform="translate({n((W - wb) / 2)} 392)"><path d="{d_big}" fill="#000" transform="translate(5 5)" opacity=".9"/><path d="{d_big}" fill="{SHU}" transform="translate(2.5 2.5)"/><path d="{d_big}" fill="url(#gWashi)"/></g>
<g transform="translate({n((W - ws) / 2)} 412)" opacity="0"><path d="{d_sm}" fill="{KIN}"/></g>
<g transform="translate({W - 60 - wj} 224)" filter="url(#glowR)" opacity=".95"><path d="{d_jp}" fill="none" stroke="{KIN2}" stroke-width="1.6"/></g>
{embers(18, W, H, 99, size=(.8, 2.2), dur=(4, 8))}
<rect y="{H - 8}" width="{W}" height="8" fill="url(#hazard)"><animateTransform attributeName="transform" type="translate" from="0 0" to="-39.6 0" dur="2.2s" repeatCount="indefinite"/></rect>
"""
    return svg(W, H, body, title="Kelompok 5 — night street skyline")


def build(out):
    s = {}
    for fn, f in [("about-card.svg", about_card), ("awards.svg", awards), ("arsenal.svg", arsenal), ("built-with.svg", built_with), ("sitemap.svg", sitemap), ("footer.svg", footer)]:
        s[fn] = write(out, fn, f())
    return s


if __name__ == "__main__":
    import sys
    print(build(sys.argv[1]))
