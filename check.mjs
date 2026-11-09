// Run: node check.mjs   (fails loudly if the geometry breaks)
import assert from "node:assert/strict";
import { distBearing, elevAngle, dirVector, cameraBasis, headingPitch, project, destination, rayMax, tiltBasis, solveCalibration } from "./geo.js";
import { LANDMARKS, PERFILES } from "./landmarks.js";

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

// 1 degree of latitude is ~111.2 km, due north.
let r = distBearing(20, -103, 21, -103);
near(r.dist, 111195, 50, "dist 1° lat"); near(r.bearing, 0, 1e-6, "bearing north");
r = distBearing(20.677133, -103.34696, 20.674405, -103.38733); // Catedral -> Minerva
near(r.dist, 4210, 60, "Catedral-Minerva dist"); near(r.bearing, 266, 2, "Catedral-Minerva bearing");

// Curvature: at 100 km a point at the same height sits ~0.39° below the horizon.
near(elevAngle(1600, 1600, 100000), -0.39, 0.02, "curvature drop");
near(elevAngle(0, 100, 100), 45, 1e-3, "45° up");

// Phone upright, facing north / east / tilted up 10°.
for (const [a, b, g, h, p] of [[0, 90, 0, 0, 0], [-90, 90, 0, 90, 0], [-200, 100, 0, 200, 10], [30, 80, 0, 330, -10]]) {
  const hp = headingPitch(cameraBasis(a, b, g));
  near((hp.heading - h + 540) % 360 - 180, 0, 1e-6, `heading ${h}`); near(hp.pitch, p, 1e-6, `pitch ${p}`);
}

// Projection: straight ahead lands on the centre; 10° right lands at f*tan(10°); behind is null.
const basis = cameraBasis(-45, 90, 0); // facing NE, level
let pt = project(dirVector(45, 0), basis, 1000, 200, 400);
near(pt.x, 200, 1e-6, "centre x"); near(pt.y, 400, 1e-6, "centre y");
pt = project(dirVector(55, 0), basis, 1000, 200, 400);
near(pt.x, 200 + 1000 * Math.tan((10 * Math.PI) / 180), 1e-6, "10° right");
pt = project(dirVector(45, 5), basis, 1000, 200, 400);
assert.ok(pt.y < 400, "higher point draws higher on screen");
assert.equal(project(dirVector(225, 0), basis, 1000, 200, 400), null, "behind camera");

// Rolling the phone (gamma) must not move a target dead ahead.
pt = project(dirVector(0, 0), cameraBasis(0, 90, 0), 1000, 200, 400);
near(pt.x, 200, 1e-6, "roll-free centre");

// Terrain: a cone 1000 m high, 5 km radius, centred 20 km due north of the viewer, flat ground elsewhere.
const peak = destination(20, -103, 0, 20000);
near(distBearing(20, -103, peak.lat, peak.lon).dist, 20000, 1, "destination dist");
const cone = (lat, lon) => Math.max(0, 1000 * (1 - distBearing(peak.lat, peak.lon, lat, lon).dist / 5000));
let ray = rayMax(cone, 20, -103, 0, 0, 500, 60000);
near(ray.angle, elevAngle(0, 1000, 20000), 0.05, "ray finds cone top");
near(ray.dist, 20000, 300, "ray cone distance");
ray = rayMax(cone, 20, -103, 0, 90, 500, 60000);
assert.ok(ray.angle < 0.01 && ray.dist < 1000, "flat ground east stays at horizon");
// A 500 m point 40 km north sits behind the cone; a 3000 m one shows above it.
assert.ok(rayMax(cone, 20, -103, 0, 0, 500, 38000).angle > elevAngle(0, 500, 40000), "hidden behind cone");
assert.ok(rayMax(cone, 20, -103, 0, 0, 500, 38000).angle < elevAngle(0, 3000, 40000), "visible above cone");

// Calibration: fake taps from a known truth (corr 7°, tilt 1.5°, f 800) must recover it.
{
  const truth = { corr: 7, pitch: 1.5, f: 800 };
  const tap = (alpha, beta, bearing, el) => {
    const basis = cameraBasis(alpha, beta, 0);
    const b = tiltBasis(basis, truth.pitch);
    const d = dirVector(bearing - truth.corr, el);
    const z = d[0] * b.fwd[0] + d[1] * b.fwd[1] + d[2] * b.fwd[2];
    const u = (truth.f * (d[0] * b.right[0] + d[1] * b.right[1] + d[2] * b.right[2])) / z;
    const v = (truth.f * (d[0] * b.up[0] + d[1] * b.up[1] + d[2] * b.up[2])) / z;
    return { basis, u, v, bearing, el };
  };
  const p1 = tap(-90, 90, 100, 1), p2 = tap(-95, 91, 120, 3);
  let s = solveCalibration([p1], { corr: 0, pitch: 0, f: 800 }, false);
  near(s.corr, 7, 1e-3, "1-tap corr"); near(s.pitch, 1.5, 1e-3, "1-tap pitch");
  s = solveCalibration([p1, p2], { corr: 0, pitch: 0, f: 600 }, true);
  near(s.corr, 7, 1e-2, "2-tap corr"); near(s.pitch, 1.5, 1e-2, "2-tap pitch"); near(s.f, 800, 1, "2-tap focal");
}

// Full skyline (720 rays to 135 km) must stay fast enough to run on a phone.
const t0 = performance.now();
for (let az = 0; az < 360; az += 0.5) rayMax(() => 1500, 20.68, -103.39, 1690, az, 500, 135000);
const ms = performance.now() - t0;
assert.ok(ms < 1000, `skyline too slow: ${ms.toFixed(0)} ms`);

// Landmark data sanity: inside a box around Jalisco, plausible heights.
for (const l of LANDMARKS) {
  if (l.tipo !== "z") assert.ok(l.lat > 19 && l.lat < 21.5 && l.lon > -105.8 && l.lon < -101.5, `${l.nombre} coords`);
  assert.ok(l.tipo === "z" || (l.alt > 1400 && l.alt < 4500), `${l.nombre} alt`);
  if (l.tipo === "e") assert.ok(PERFILES[l.perfil], `${l.nombre} perfil`);
  if (l.tipo === "e") assert.ok(l.h > 0 && l.h < 300 && l.w > 0 && l.w < 400, `${l.nombre} h/w`);
}

console.log(`ok (skyline ${ms.toFixed(0)} ms)`);
