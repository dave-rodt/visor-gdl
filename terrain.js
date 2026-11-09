// Ground elevation from the free AWS Terrarium tiles (SRTM-based, open data).
// Each tile is a 256x256 PNG; elevation = R*256 + G + B/256 - 32768 metres.
// Zoom 12 ≈ 38 m per pixel, zoom 10 ≈ 150 m, zoom 8 ≈ 600 m (at Guadalajara's latitude).

const tileUrl = (z, x, y) => `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;
const tiles = new Map(); // numeric key -> Float32Array(65536), or null while loading
const key = (z, x, y) => (z * 4096 + x) * 4096 + y;

function worldPx(lat, lon, z) {
  const n = 256 * 2 ** z, s = Math.sin((lat * Math.PI) / 180);
  return [((lon + 180) / 360) * n, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n];
}

async function loadTile(z, x, y) {
  const k = key(z, x, y);
  if (tiles.has(k)) return;
  tiles.set(k, null);
  try {
    const blob = await (await fetch(tileUrl(z, x, y))).blob();
    // No colour conversion, or the encoded heights get altered.
    const bmp = await createImageBitmap(blob, { colorSpaceConversion: "none", premultiplyAlpha: "none" });
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bmp, 0, 0);
    const d = ctx.getImageData(0, 0, 256, 256).data;
    const e = new Float32Array(65536);
    for (let i = 0; i < 65536; i++) e[i] = d[4 * i] * 256 + d[4 * i + 1] + d[4 * i + 2] / 256 - 32768;
    tiles.set(k, e);
  } catch {
    tiles.delete(k); // allow a retry later
  }
}

// Load every tile at zoom z within radius metres of (lat, lon).
export function loadArea(lat, lon, radius, z) {
  const mPerPx = (156543.03 * Math.cos((lat * Math.PI) / 180)) / 2 ** z;
  const [gx, gy] = worldPx(lat, lon, z), r = radius / mPerPx;
  const jobs = [];
  for (let x = Math.floor((gx - r) / 256); x <= Math.floor((gx + r) / 256); x++)
    for (let y = Math.floor((gy - r) / 256); y <= Math.floor((gy + r) / 256); y++) jobs.push(loadTile(z, x, y));
  return Promise.all(jobs);
}

function px(z, gx, gy) {
  const t = tiles.get(key(z, gx >> 8, gy >> 8));
  return t ? t[(gy & 255) * 256 + (gx & 255)] : NaN;
}

// Bilinear elevation (m) at zoom z, or NaN if that tile is not loaded.
export function elevation(lat, lon, z) {
  const [x, y] = worldPx(lat, lon, z);
  const x0 = Math.floor(x - 0.5), y0 = Math.floor(y - 0.5), fx = x - 0.5 - x0, fy = y - 0.5 - y0;
  const a = px(z, x0, y0), b = px(z, x0 + 1, y0), c = px(z, x0, y0 + 1), d = px(z, x0 + 1, y0 + 1);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}
