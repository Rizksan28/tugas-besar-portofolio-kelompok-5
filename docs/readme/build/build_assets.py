"""Regenerate every SVG in docs/readme/ (text is converted to outlines, nothing depends on installed fonts).

    pip install fonttools brotli pillow
    python docs/readme/build/build_assets.py

Titles use Edo SZ when public/fonts/edosz.ttf exists (or EDO_TTF=/path/to/edosz.ttf), Bebas Neue otherwise.
hero.gif is a screen recording of the running site: see record_hero.py.
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import sections, cards, projects, misc

OUT = os.path.abspath(os.path.join(HERE, ".."))
total = {}
for mod in (sections, cards, projects, misc):
    total.update(mod.build(OUT))
for name, size in sorted(total.items()):
    print(f"{name:24s}{size / 1024:8.1f} KB")
print(f"{'TOTAL':24s}{sum(total.values()) / 1024:8.1f} KB")
