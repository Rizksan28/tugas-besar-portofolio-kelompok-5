"""Record hero.gif from the running site.

    npm run build && npm run preview          # serves on http://localhost:8443
    pip install playwright && playwright install chromium
    python docs/readme/build/record_hero.py http://localhost:8443

Needs ffmpeg on PATH. Plays the intro, sweeps the cursor for the slash trail, clicks once, then cuts an ~8 s loop.
"""
import glob, os, shutil, subprocess, sys, tempfile
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8443"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, "..", "hero.gif"))
W, H = 1200, 640
vd = tempfile.mkdtemp(prefix="k5hero-")

with sync_playwright() as p:
    b = p.chromium.launch(args=["--no-sandbox"])
    ctx = b.new_context(viewport={"width": W, "height": H}, record_video_dir=vd, record_video_size={"width": W, "height": H})
    pg = ctx.new_page()
    pg.add_init_script("try{sessionStorage.removeItem('k5-intro-seen')}catch(e){}")
    pg.goto(URL, wait_until="load")
    pg.add_style_tag(content=".fx-grain{display:none!important}")  # film grain would bloat the GIF
    pg.wait_for_timeout(4200)
    for x, y in [(150, 520), (320, 330), (520, 470), (760, 300), (960, 430), (1080, 260)]:
        pg.mouse.move(x, y, steps=14)
    pg.mouse.click(1080, 260)
    pg.wait_for_timeout(1800)
    ctx.close(); b.close()

video = glob.glob(os.path.join(vd, "*.webm"))[0]
vf = ("fps=12,scale=900:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=160:stats_mode=full[p];"
      "[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle")
subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "1.3", "-t", "8.2", "-i", video, "-vf", vf, OUT], check=True)
shutil.rmtree(vd, ignore_errors=True)
print("wrote", OUT, round(os.path.getsize(OUT) / 1e6, 1), "MB")
