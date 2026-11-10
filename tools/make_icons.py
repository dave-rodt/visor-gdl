# Run: python3 tools/make_icons.py "Visor GDL v4.jpeg" .
# Builds the app icons from a square logo with a flat background that fills the canvas.
# maskable-*: logo shrunk to 76% on its own background colour, so Android's round mask
# (safe zone = central circle, 80% wide) doesn't clip the viewfinder corners.
import sys
from PIL import Image, ImageStat
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
assert im.width == im.height, "logo must be square"
bg = tuple(round(c) for c in ImageStat.Stat(im.crop((0, 0, 40, 40))).mean)
S = im.width
pad = Image.new("RGB", (S, S), bg)
small = im.resize((round(S * 0.76),) * 2, Image.LANCZOS)
pad.paste(small, ((S - small.width) // 2,) * 2)
for img, sizes in [(im, [(512, "icon-512"), (192, "icon-192"), (180, "apple-touch-icon"), (32, "favicon-32")]),
                   (pad, [(512, "maskable-512"), (192, "maskable-192")])]:
    for s, name in sizes:
        img.resize((s, s), Image.LANCZOS).save(f"{out}/{name}.png", optimize=True)
print("background", bg)
