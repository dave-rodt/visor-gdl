# Run: python3 tools/make_icons.py logo.jpeg . 0.80 icon && python3 tools/make_icons.py logo.jpeg . 0.60 maskable
# Builds square app icons from logo.jpeg: the artwork cut from the mockup's flat panel,
# on a background made from the panel's own navy (art pixels removed, smoothed, stretched),
# with the art inside the maskable safe zone.
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
src, out, frac, prefix = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]  # frac = share of the height the art takes
im = Image.open(src).convert("RGB")
art = im.crop((705, 292, 1766, 1480)); w, h = art.size      # artwork + lens, clear of the bevel
a = np.asarray(art, dtype=np.float32)
navy = ((a[..., 2] > a[..., 0] + 12) & (a.sum(-1) < 330)).astype(np.float32)  # blue and dark: panel, not gold/white
blur = lambda x: np.asarray(Image.fromarray(x).filter(ImageFilter.GaussianBlur(60)), dtype=np.float32)
m = blur((navy * 255).astype(np.uint8)) / 255 + 1e-3
field = np.stack([blur((a[..., c] * navy).astype(np.uint8)) / m for c in range(3)], -1)
S = int(h / frac)
ox, oy = (S - w) // 2, (S - h) // 2
# Extend the field outward by repeating its edges, so it lines up with the art where they meet.
field = np.pad(field, ((oy, S - h - oy), (ox, S - w - ox), (0, 0)), mode="edge")
bg = Image.fromarray(field.clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(90))
mask = Image.new("L", (w, h), 0)
ImageDraw.Draw(mask).rectangle([30, 30, w - 31, h - 31], fill=255)
bg.paste(art, (ox, oy), mask.filter(ImageFilter.GaussianBlur(14)))
sizes = [(512, "512"), (192, "192")] + ([(180, "apple-touch"), (32, "favicon-32")] if prefix == "icon" else [])
for size, tag in sizes:
    name = f"{prefix}-{tag}.png" if tag[0].isdigit() else f"{tag}{'-icon' if tag == 'apple-touch' else ''}.png"
    bg.resize((size, size), Image.LANCZOS).save(f"{out}/{name}", optimize=True)

if prefix == "icon":  # favicon: just the cathedral and statue, text is unreadable at 32 px
    fav = Image.open(f"{out}/icon-512.png").crop((80, 50, 430, 400))
    fav.resize((32, 32), Image.LANCZOS).save(f"{out}/favicon-32.png", optimize=True)
