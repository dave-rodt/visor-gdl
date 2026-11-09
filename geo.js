// Pure math: distances, angles, phone orientation, and projection onto the screen.
// World frame is east/north/up (x, y, z) in metres or unit vectors.

const R_EARTH = 6371000;
const REFRACTION = 0.13; // standard atmospheric refraction coefficient
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// Great-circle distance (m) and initial bearing (deg from true north, 0..360).
export function distBearing(lat1, lon1, lat2, lon2) {
  const p1 = rad(lat1), p2 = rad(lat2), dl = rad(lon2 - lon1);
  const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  const dist = 2 * R_EARTH * Math.asin(Math.sqrt(a));
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return { dist, bearing: (deg(Math.atan2(y, x)) + 360) % 360 };
}

// Angle above the horizon (deg) to a point at altitude h1, seen from altitude h0, at distance d.
// Subtracts the Earth's curve, reduced by refraction.
export function elevAngle(h0, h1, d) {
  const drop = ((d * d) / (2 * R_EARTH)) * (1 - REFRACTION);
  return deg(Math.atan2(h1 - h0 - drop, d));
}

// Unit vector for an azimuth (deg clockwise from north) and elevation (deg).
export function dirVector(az, el) {
  const a = rad(az), e = rad(el);
  return [Math.sin(a) * Math.cos(e), Math.cos(a) * Math.cos(e), Math.sin(e)];
}

// W3C DeviceOrientation (alpha, beta, gamma) -> screen right, screen up, and camera forward
// in the world frame. R = Rz(alpha) * Rx(beta) * Ry(gamma). Back camera looks along device -z.
// Portrait only.
export function cameraBasis(alpha, beta, gamma) {
  const a = rad(alpha), b = rad(beta), g = rad(gamma);
  const cA = Math.cos(a), sA = Math.sin(a), cB = Math.cos(b), sB = Math.sin(b), cG = Math.cos(g), sG = Math.sin(g);
  const right = [cA * cG - sA * sB * sG, sA * cG + cA * sB * sG, -cB * sG];
  const up = [-sA * cB, cA * cB, sB];
  const fwd = [-(cA * sG + sA * sB * cG), -(sA * sG - cA * sB * cG), -(cB * cG)];
  return { right, up, fwd };
}

// Compass heading (deg) and tilt above horizon (deg) of the camera.
export function headingPitch({ fwd }) {
  return {
    heading: (deg(Math.atan2(fwd[0], fwd[1])) + 360) % 360,
    pitch: deg(Math.asin(Math.max(-1, Math.min(1, fwd[2])))),
  };
}

const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

// Pinhole projection. f = focal length in CSS pixels. Returns null if behind the camera.
export function project(dir, basis, f, cx, cy) {
  const z = dot(dir, basis.fwd);
  if (z <= 0.01) return null;
  return { x: cx + (dot(dir, basis.right) / z) * f, y: cy - (dot(dir, basis.up) / z) * f };
}

// Point reached from (lat, lon) going `dist` metres along `bearing` (deg).
export function destination(lat, lon, bearing, dist) {
  const p1 = rad(lat), l1 = rad(lon), b = rad(bearing), d = dist / R_EARTH;
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(b));
  const l2 = l1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  return { lat: deg(p2), lon: deg(l2) };
}

// Highest terrain angle seen along one azimuth between `from` and `to` metres.
// sample(lat, lon, dist) returns ground elevation in metres (NaN where unknown).
// Steps grow with distance: ~150 m near, 0.5% of the distance far away.
export function rayMax(sample, lat, lon, h0, az, from, to) {
  let angle = -90, dist = 0;
  for (let d = from; d <= to; d += Math.max(150, d * 0.005)) {
    const p = destination(lat, lon, az, d);
    const a = elevAngle(h0, sample(p.lat, p.lon, d), d);
    if (a > angle) { angle = a; dist = d; }
  }
  return { angle, dist };
}

// Blend two bases to smooth sensor jitter (k = weight of the new sample), then renormalise.
export function smoothBasis(prev, next, k) {
  if (!prev) return next;
  const mix = (p, n) => {
    const v = p.map((x, i) => x + (n[i] - x) * k);
    const len = Math.hypot(...v) || 1;
    return v.map((x) => x / len);
  };
  return { right: mix(prev.right, next.right), up: mix(prev.up, next.up), fwd: mix(prev.fwd, next.fwd) };
}
