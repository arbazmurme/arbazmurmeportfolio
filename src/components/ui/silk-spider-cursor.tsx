"use client"

// Silk Spider Cursor: a 3D jumping spider lives on your page. It follows the
// pointer, walks with a real alternating gait, and lays silk that sticks only
// to the elements you mark.
//
//   enter   it drops in from the top of the page on a drag line, bobs on the
//           silk, looks at you, lands, and bites the line, which springs away.
//   walk    the body eases after the pointer, never glued to it, and turns to
//           face where it is going. Eight legs run 2-bone IK in two groups
//           (L1 R2 L3 R4 / R1 L2 R3 L4). Feet stay planted and step only when
//           they drift too far, so it walks instead of sliding. A foot that
//           lands on silk plucks it.
//   spin    a drag line trails from the spinnerets. Crossing onto a marked
//           element tacks it down there, using the element's live box, so it
//           stays stuck on scroll and resize. Long elements get tacked every
//           few steps, and a new line sometimes bridges to an older one. Over
//           time the lines pull each other into real web shapes. A line that
//           never finds an element is let go.
//   stop    when the pointer rests, it turns to face you, rears its front up
//           so you see the big eyes, waves its palps, and blinks twice.
//   sleep   a few seconds later it settles down, tucks its legs, shuts its
//           eyes and floats "z z z". The next move wakes it with a start.
//   clear   Delete or Backspace cuts every line loose. The silk springs off
//           its anchors, sags, sheds its dew and fades.
//   fly     now and then a fly buzzes in. If it hits silk it sticks and
//           struggles, and when you leave the spider alone it goes and wraps it.
//
// One requestAnimationFrame loop drives two layers: a 2D canvas for the silk
// and a WebGL canvas (three.js) for the spider, rendered inside a scissor box
// around it. DPR is capped, the loop stops while the tab is hidden, and with
// prefers-reduced-motion the spider just sits and breathes, with no webs.

import * as React from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

export interface SilkSpiderCursorProps {
  /** CSS selector for elements the silk may stick to. Never anchors to empty space. */
  anchorSelector?: string
  /** A GLB (URL or data URI) of the spider, Y up and facing +Z. Defaults to the embedded jumping spider. */
  modelSrc?: string
  /** Top-down photo projection for the default model (see README). */
  topTextureSrc?: string
  /** Front (face) photo projection for the default model. */
  faceTextureSrc?: string
  /** Leg span in px. Defaults to a size that scales with the viewport. */
  size?: number
  /** Silk colour. */
  silkColor?: string
  /** The page colour behind the spider, used as bounce light on its belly. */
  bounceColor?: string
  /** Shadow colour cast on the page. */
  shadowColor?: string
  /** Most threads kept at once; the oldest fade out past this. */
  maxThreads?: number
  /** Let a fly wander in now and then. */
  fly?: boolean
  /** Still time before it falls asleep, ms. */
  sleepAfter?: number
  /** Threads already spun across the marked elements when the page opens. */
  seedWebs?: number
  /** Drop in on a thread from the top of the page. */
  enter?: boolean
  /** Keys that clear the webs. */
  clearKeys?: string[]
  /** "fixed" covers the viewport; "absolute" covers the nearest positioned parent. */
  position?: "fixed" | "absolute"
  zIndex?: number
  /** Device-pixel-ratio cap for both canvases. */
  maxDpr?: number
  className?: string
}

// ---------------------------------------------------------------------------
// Silk: one particle pool shared by every thread, so a bridge pulls on the
// lines it hangs from. Verlet integration, distance constraints.
// ---------------------------------------------------------------------------

// #region silk
const MAXP = 9000
const MAXC = 9000

type AnchorRef = { el: Element | null; u: number; v: number; sx: number; sy: number }

type Thread = {
  id: number
  parts: number[]
  cons: number[]
  owned: number[]
  state: number // 0 drag, 1 set, 2 dying
  alpha: number
  born: number
  dieT: number
  dews: number[] // pairs: position along parts (float index), radius
  anchorEl: Element | null
  hostIds: number[]
}

function createSilk() {
  const X = new Float32Array(MAXP)
  const Y = new Float32Array(MAXP)
  const PX = new Float32Array(MAXP)
  const PY = new Float32Array(MAXP)
  const INV = new Float32Array(MAXP)
  const PIN = new Int32Array(MAXP).fill(-1)
  const CA = new Int32Array(MAXC)
  const CB = new Int32Array(MAXC)
  const CR = new Float32Array(MAXC)
  const CON = new Uint8Array(MAXC)
  const freeP = [] as number[]
  const freeC = [] as number[]
  for (let i = MAXP - 1; i >= 0; i--) freeP.push(i)
  for (let i = MAXC - 1; i >= 0; i--) freeC.push(i)
  const anchors = [] as (AnchorRef | null)[]
  const freeA = [] as number[]
  const threads = [] as Thread[]
  let nextId = 1

  const addAnchor = (a: AnchorRef) => {
    const id = freeA.length ? (freeA.pop() as number) : anchors.length
    anchors[id] = a
    return id
  }
  // high-water marks: the solver only walks the part of the pool ever used
  const hw = { p: 0, c: 0 }
  const particle = (x: number, y: number, anchor: number) => {
    const i = freeP.pop()
    if (i === undefined) return -1
    hw.p = Math.max(hw.p, i + 1)
    X[i] = PX[i] = x
    Y[i] = PY[i] = y
    PIN[i] = anchor
    INV[i] = anchor >= 0 ? 0 : 1
    return i
  }
  const constraint = (a: number, b: number, rest: number) => {
    const c = freeC.pop()
    if (c === undefined) return -1
    hw.c = Math.max(hw.c, c + 1)
    CA[c] = a
    CB[c] = b
    CR[c] = rest
    CON[c] = 1
    return c
  }
  const freeThread = (t: Thread) => {
    for (const c of t.cons) {
      CON[c] = 0
      freeC.push(c)
    }
    for (const p of t.owned) {
      const a = PIN[p]
      if (a >= 0) {
        anchors[a] = null
        freeA.push(a)
      }
      PIN[p] = -1
      INV[p] = 0
      freeP.push(p)
    }
    t.cons.length = 0
    t.owned.length = 0
    t.parts.length = 0
  }
  const newThread = (anchorEl: Element | null) => {
    const t: Thread = {
      id: nextId++, parts: [], cons: [], owned: [], state: 0, alpha: 1, born: 0, dieT: 0,
      dews: [], anchorEl, hostIds: [],
    }
    threads.push(t)
    return t
  }
  const length = (t: Thread) => {
    let L = 0
    for (let k = 1; k < t.parts.length; k++) {
      const a = t.parts[k - 1], b = t.parts[k]
      L += Math.hypot(X[b] - X[a], Y[b] - Y[a])
    }
    return L
  }
  const unpin = (p: number) => {
    const a = PIN[p]
    if (a >= 0) {
      anchors[a] = null
      freeA.push(a)
    }
    PIN[p] = -1
    INV[p] = 1
  }
  // Lay `n` free particles in a straight line between two existing ones.
  const span = (t: Thread, a: number, b: number, seg: number, slack: number) => {
    const d = Math.hypot(X[b] - X[a], Y[b] - Y[a])
    const n = Math.max(2, Math.min(36, Math.round(d / seg)))
    const rest = (d * (1 + slack)) / n
    let prev = a
    t.parts.push(a)
    for (let k = 1; k < n; k++) {
      const f = k / n
      const sag = Math.sin(Math.PI * f) * d * slack * 0.9
      const p = particle(X[a] + (X[b] - X[a]) * f, Y[a] + (Y[b] - Y[a]) * f + sag, -1)
      if (p < 0) break
      t.owned.push(p)
      t.parts.push(p)
      t.cons.push(constraint(prev, p, rest))
      prev = p
    }
    t.parts.push(b)
    t.cons.push(constraint(prev, b, rest))
  }
  const sprinkleDew = (t: Thread, rand: () => number, scale: number) => {
    t.dews.length = 0
    const L = length(t)
    const n = Math.floor(L / (24 + rand() * 30))
    for (let k = 0; k < n; k++) {
      const big = rand() < 0.18
      t.dews.push(1 + rand() * (t.parts.length - 3), (big ? 1.5 + rand() * 1.1 : 0.55 + rand() * 0.75) * scale)
    }
  }

  return {
    X, Y, PX, PY, INV, PIN, CA, CB, CR, CON, anchors, threads, hw,
    addAnchor, particle, constraint, freeThread, newThread, length, unpin, span, sprinkleDew,
  }
}
type Silk = ReturnType<typeof createSilk>

// Pins follow their anchor's live box; everything else falls and is held by
// its constraints.
function stepSilk(s: Silk, dt: number, time: number, rects: Map<Element, DOMRect>, iters: number) {
  const { X, Y, PX, PY, INV, PIN, CA, CB, CR, CON, anchors, hw } = s
  const g = 620 * dt * dt
  for (let i = 0; i < hw.p; i++) {
    const a = PIN[i]
    if (a >= 0) {
      const an = anchors[a]
      if (!an) continue
      if (an.el) {
        const r = rects.get(an.el)
        if (r) {
          X[i] = r.left + an.u * r.width
          Y[i] = r.top + an.v * r.height
        }
      } else {
        X[i] = an.sx
        Y[i] = an.sy
      }
      PX[i] = X[i]
      PY[i] = Y[i]
      continue
    }
    if (INV[i] === 0) continue
    const vx = (X[i] - PX[i]) * 0.986
    const vy = (Y[i] - PY[i]) * 0.986
    PX[i] = X[i]
    PY[i] = Y[i]
    const wind = Math.sin(time * 0.9 + X[i] * 0.006 + Y[i] * 0.004) * 9 * dt * dt
    X[i] += vx + wind
    Y[i] += vy + g * INV[i]
  }
  for (let it = 0; it < iters; it++) {
    for (let c = 0; c < hw.c; c++) {
      if (!CON[c]) continue
      const a = CA[c], b = CB[c]
      const wa = INV[a], wb = INV[b]
      const w = wa + wb
      if (w === 0) continue
      const dx = X[b] - X[a], dy = Y[b] - Y[a]
      const d = Math.sqrt(dx * dx + dy * dy) || 1e-6
      // silk is elastic: it gives a little when stretched and never pushes
      if (d <= CR[c]) continue
      const k = ((d - CR[c]) / d / w) * 0.92
      X[a] += dx * k * wa
      Y[a] += dy * k * wa
      X[b] -= dx * k * wb
      Y[b] -= dy * k * wb
    }
  }
}
// #endregion silk

// ---------------------------------------------------------------------------
// Legs: analytic 2-bone IK with the knee lifted up and out.
// ---------------------------------------------------------------------------

// #region ik
function solveKnee(
  hx: number, hy: number, hz: number,
  fx: number, fy: number, fz: number,
  l1: number, l2: number, px0: number, py0: number, pz0: number,
  out: number[],
) {
  let dx = fx - hx, dy = fy - hy, dz = fz - hz
  let d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6
  const maxD = (l1 + l2) * 0.999
  const minD = Math.abs(l1 - l2) * 1.001 + 1e-6
  const dc = Math.min(maxD, Math.max(minD, d))
  dx /= d; dy /= d; dz /= d
  d = dc
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a))
  // pole: the leg's own rest bend, made perpendicular to the hip-foot line
  let px = px0, py = py0, pz = pz0
  const dot = px * dx + py * dy + pz * dz
  px -= dx * dot; py -= dy * dot; pz -= dz * dot
  const pl = Math.sqrt(px * px + py * py + pz * pz) || 1
  out[0] = hx + dx * a + (px / pl) * h
  out[1] = hy + dy * a + (py / pl) * h
  out[2] = hz + dz * a + (pz / pl) * h
  out[3] = hx + dx * d
  out[4] = hy + dy * d
  out[5] = hz + dz * d
  return out
}
// #endregion ik

// Gait groups: L1 R2 L3 R4 step together, then R1 L2 R3 L4. Legs 0-3 are the
// left side front to back, 4-7 the right.
const GROUP = [0, 1, 0, 1, 1, 0, 1, 0]

// ---------------------------------------------------------------------------
// Rig: the model is reoriented (forward +X, left +Y, up +Z), scaled to a leg
// span of 1, and each leg is skinned to two bones found from its geometry.
// ---------------------------------------------------------------------------

type Leg = {
  hip: THREE.Vector3
  knee: THREE.Vector3
  foot: THREE.Vector3
  l1: number
  l2: number
  b1: THREE.Bone
  b2: THREE.Bone
  restN: THREE.Vector3
  rd: THREE.Vector3 // rest hip-to-foot direction
  rp: THREE.Vector3 // rest knee pole, perpendicular to rd
  // gait state (page px, z up)
  fx: number; fy: number; fz: number
  sx: number; sy: number
  t: number
  stepping: boolean
  dur: number
}

type Rig = {
  root: THREE.Group
  legs: Leg[]
  abdomen: THREE.Bone
  uniforms: { uBlink: { value: number } }
  spinneret: THREE.Vector3
  headFront: THREE.Vector3
  bodyLen: number
}

// The embedded model faces +Z with +Y up (glTF convention).
const MODEL_FORWARD = new THREE.Vector3(0, 0, 1)
const MODEL_UP = new THREE.Vector3(0, 1, 0)

// Two photo projections baked from the full-detail scan, in model space:
// top view over x,z in [-0.98, 0.98], front view over x in [-0.48, 0.48], y in [-0.4, 0.4].
// Each vertex carries how much of each it may use (_w); the rest is its own colour.
const SKIN_VERT = `
attribute vec3 mpos;
attribute vec2 _w;
varying vec3 vMpos;
varying vec2 vW;
`
const SKIN_FRAG = `
uniform sampler2D uTop;
uniform sampler2D uFront;
uniform float uBlink;
uniform vec4 uEye;
uniform float uProj;
varying vec3 vMpos;
varying vec2 vW;
`
const SKIN_COLOR = `
vec4 diffuseColor = vec4( diffuse, opacity );
vec3 base = vColor.rgb;
float rough = vColor.a;
if (uProj > 0.5) {
  vec2 ut = vec2(vMpos.x / 0.98 * 0.5 + 0.5, 0.5 - vMpos.z / 0.98 * 0.5);
  vec2 uf = vec2(vMpos.x / 0.48 * 0.5 + 0.5, vMpos.y / 0.4 * 0.5 + 0.5);
  vec3 ct = texture2D(uTop, ut).rgb;
  vec3 cf = texture2D(uFront, uf).rgb;
  base = base * max(0.0, 1.0 - vW.x - vW.y) + ct * vW.x + cf * vW.y;
  // eyelids: fur from just above the eyes slides down over them
  float inEye = step(uEye.x, vMpos.y) * step(vMpos.y, uEye.y) * step(abs(vMpos.x), uEye.z) * step(uEye.w, vMpos.z);
  float lidLine = mix(uEye.y + 0.01, uEye.x - 0.01, uBlink);
  if (inEye > 0.5 && vMpos.y > lidLine) {
    vec3 lid = texture2D(uFront, vec2(uf.x, (uEye.y + 0.035) / 0.4 * 0.5 + 0.5)).rgb;
    float shade = 0.75 + 0.25 * smoothstep(lidLine, lidLine + 0.04, vMpos.y);
    base = lid * shade;
    rough = 0.9;
  }
}
diffuseColor.rgb = base;
`

// Attributes may be quantized (KHR_mesh_quantization); IK math wants floats.
const toFloat = (a: THREE.BufferAttribute | THREE.InterleavedBufferAttribute) => {
  const out = new Float32Array(a.count * a.itemSize)
  for (let i = 0; i < a.count; i++) for (let k = 0; k < a.itemSize; k++) out[i * a.itemSize + k] = a.getComponent(i, k)
  return new THREE.BufferAttribute(out, a.itemSize)
}

const segQ = new THREE.Vector3()
const segDist = (p: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3) => {
  const ab = segQ.copy(b).sub(a)
  const t = Math.min(1, Math.max(0, (ab.x * (p.x - a.x) + ab.y * (p.y - a.y) + ab.z * (p.z - a.z)) / (ab.lengthSq() || 1)))
  const dx = a.x + ab.x * t - p.x, dy = a.y + ab.y * t - p.y, dz = a.z + ab.z * t - p.z
  return { d: Math.sqrt(dx * dx + dy * dy + dz * dz), t }
}

function buildRig(scene: THREE.Object3D, top: THREE.Texture | null, front: THREE.Texture | null, knownTips: number[] | null): Rig {
  scene.updateMatrixWorld(true)
  // canonical frame: forward -> +X, left -> +Y, up -> +Z
  const fwd = MODEL_FORWARD.clone().normalize()
  const up = MODEL_UP.clone().normalize()
  const left = new THREE.Vector3().crossVectors(up, fwd).normalize()
  const basis = new THREE.Matrix4().makeBasis(fwd, left, up).invert()

  const meshes = [] as THREE.Mesh[]
  scene.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh)
  })
  const geos = meshes.map((m) => {
    const src = m.geometry
    const g = new THREE.BufferGeometry()
    for (const name of Object.keys(src.attributes)) g.setAttribute(name, toFloat(src.attributes[name]))
    if (src.index) g.setIndex(src.index.clone())
    g.applyMatrix4(m.matrixWorld)
    g.setAttribute("mpos", (g.attributes.position as THREE.BufferAttribute).clone())
    g.applyMatrix4(basis)
    return g
  })
  const box = new THREE.Box3()
  for (const g of geos) {
    g.computeBoundingBox()
    box.union(g.boundingBox as THREE.Box3)
  }
  const span = Math.max(box.max.x - box.min.x, box.max.y - box.min.y)
  const center = new THREE.Vector3((box.min.x + box.max.x) / 2, (box.min.y + box.max.y) / 2, box.min.z)
  const norm = new THREE.Matrix4().makeScale(1 / span, 1 / span, 1 / span).multiply(new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z))
  for (const g of geos) g.applyMatrix4(norm)

  // Everything below is in normalised units: span 1, lowest point at z 0.
  const all = [] as number[]
  const rough = [] as number[]
  for (const g of geos) {
    const p = g.attributes.position
    const c = g.attributes.color
    for (let i = 0; i < p.count; i++) {
      all.push(p.getX(i), p.getY(i), p.getZ(i))
      rough.push(c && c.itemSize === 4 ? c.getW(i) : 1)
    }
  }
  // body axis: the strip along x near y 0, above the leg tips
  let bx0 = Infinity, bx1 = -Infinity, topZ = 0
  for (let i = 0; i < all.length; i += 3) {
    if (Math.abs(all[i + 1]) < 0.03) {
      bx0 = Math.min(bx0, all[i])
      bx1 = Math.max(bx1, all[i])
      topZ = Math.max(topZ, all[i + 2])
    }
  }
  const bodyLen = bx1 - bx0
  // the waist (pedicel) is the narrowest point of the body strip between the thirds
  let waistX = bx0 + bodyLen * 0.5, narrow = Infinity
  for (let f = 0.3; f <= 0.7; f += 0.02) {
    const x = bx0 + bodyLen * f
    let w = 0
    for (let i = 0; i < all.length; i += 3) if (Math.abs(all[i] - x) < 0.008 && all[i + 2] > topZ * 0.35) w = Math.max(w, Math.abs(all[i + 1]))
    if (w > 0 && w < narrow) { narrow = w; waistX = x }
  }
  // carapace centre: halfway between the waist and the front. Knees ride as
  // high as the abdomen, so the carapace is measured from its very top only.
  const cx = (waistX + bx1) / 2
  let bodyR = 0
  for (let i = 0; i < all.length; i += 3) {
    if (Math.abs(all[i] - cx) < 0.03 && all[i + 2] > topZ * 0.8) bodyR = Math.max(bodyR, Math.abs(all[i + 1]))
  }
  bodyR = Math.max(bodyR, 0.05)
  // abdomen: an ellipse behind the waist
  const ax = (bx0 + waistX) / 2, ahl = (waistX - bx0) / 2, ahw = ahl * 0.92
  const inAbdomen = (x: number, y: number) => ((x - ax) / (ahl * 1.08)) ** 2 + (y / (ahw * 1.08)) ** 2 < 1
  // the abdomen's own skin is narrower: leg IV femurs lie right beside it
  const onAbdomen = (x: number, y: number) => ((x - ax) / (ahl * 1.05)) ** 2 + (y / (ahl * 0.6)) ** 2 < 1
  // Leg tips: the farthest points from the carapace centre in angular sectors,
  // the eight longest reaches (palps are short and drop out).
  const sectors = [] as { a: number; best: number; p: THREE.Vector3 }[]
  for (let i = 0; i < all.length; i += 3) {
    const dx = all[i] - cx, dy = all[i + 1]
    const r = Math.hypot(dx, dy)
    if (r < bodyR * 1.5) continue
    if (inAbdomen(all[i], dy)) continue
    // feet are low; a high point out there is a knee, not a tip
    if (all[i + 2] > topZ * 0.38) continue
    const ang = Math.atan2(dy, dx)
    let s = sectors.find((q) => Math.abs(Math.atan2(Math.sin(q.a - ang), Math.cos(q.a - ang))) < 0.22)
    if (!s) {
      s = { a: ang, best: 0, p: new THREE.Vector3() }
      sectors.push(s)
    }
    if (r > s.best) {
      s.best = r
      s.a = ang
      s.p.set(all[i], all[i + 1], all[i + 2])
    }
  }
  sectors.sort((a, b) => b.best - a.best)
  const legSectors = sectors.slice(0, 8)
  const L = legSectors.filter((s) => s.a > 0).sort((a, b) => a.a - b.a)
  const R = legSectors.filter((s) => s.a <= 0).sort((a, b) => b.a - a.a)
  const tips = knownTips
    ? Array.from({ length: 8 }, (_, k) => new THREE.Vector3(knownTips[k * 3], knownTips[k * 3 + 1], knownTips[k * 3 + 2]))
    : [...L, ...R].map((s) => s.p.clone())

  const legs = [] as Leg[]
  const bones = [] as THREE.Bone[]
  const rootBone = new THREE.Bone()
  bones.push(rootBone)
  const abdomen = new THREE.Bone()
  abdomen.position.set(waistX, 0, topZ * 0.5)
  rootBone.add(abdomen)
  bones.push(abdomen)

  const legAng = tips.map((t) => Math.atan2(t.y, t.x - cx))
  const tmp = new THREE.Vector3()
  for (let k = 0; k < tips.length; k++) {
    const tip = tips[k]
    const ang = legAng[k]
    const findKnee = (hip: THREE.Vector3) => {
      const nx = -(tip.y - hip.y), ny = tip.x - hip.x
      const nl = Math.hypot(nx, ny) || 1
      const L0 = Math.hypot(tip.x - hip.x, tip.y - hip.y)
      let knee = hip.clone().lerp(tip, 0.45).setZ(topZ * 0.8)
      let best = -Infinity
      for (let i = 0; i < all.length; i += 3) {
        const px = all[i] - hip.x, py = all[i + 1] - hip.y
        if (Math.abs((px * nx + py * ny) / nl) > 0.025) continue
        const along = (px * (tip.x - hip.x) + py * (tip.y - hip.y)) / L0
        if (along < L0 * 0.18 || along > L0 * 0.75) continue
        if (all[i + 2] > best) { best = all[i + 2]; knee = new THREE.Vector3(all[i], all[i + 1], all[i + 2]) }
      }
      return knee
    }
    // the hip sits on the carapace rim, aimed at the knee (legs I and II
    // reach forward but leave the body from its sides)
    const hipAt = (a: number) => new THREE.Vector3(cx + Math.cos(a) * bodyR * 0.92, Math.sin(a) * bodyR * 0.92, topZ * 0.42)
    let hip = hipAt(ang)
    let knee = findKnee(hip)
    hip = hipAt(Math.atan2(knee.y, knee.x - cx))
    knee = findKnee(hip)
    const foot = tip.clone()
    const b1 = new THREE.Bone()
    b1.position.copy(hip)
    const b2 = new THREE.Bone()
    b2.position.copy(knee).sub(hip)
    b1.add(b2)
    rootBone.add(b1)
    bones.push(b1, b2)
    const d1 = knee.clone().sub(hip), d2 = foot.clone().sub(knee)
    const restN = new THREE.Vector3().crossVectors(d1, d2)
    if (restN.lengthSq() < 1e-10) restN.set(-Math.sin(ang), Math.cos(ang), 0).cross(new THREE.Vector3(0, 0, 1))
    legs.push({
      hip, knee, foot, l1: d1.length(), l2: d2.length(), b1, b2, restN: restN.normalize(),
      rd: foot.clone().sub(hip).normalize(),
      rp: (() => {
        const rd = foot.clone().sub(hip).normalize()
        const v = knee.clone().sub(hip)
        return v.sub(rd.multiplyScalar(v.dot(rd))).normalize()
      })(),
      fx: 0, fy: 0, fz: 0, sx: 0, sy: 0, t: 0, stepping: false, dur: 0.14,
    })
  }

  // Skin: legs by sector and by where the vertex falls along hip-knee-foot,
  // the abdomen behind the waist, everything else to the root.
  const root = new THREE.Group()
  const uniforms = { uBlink: { value: 0 } }
  // eyes: glossy vertices on the front of the carapace (model space)
  const eye = new THREE.Vector4(1, -1, 0, 1)
  geos.forEach((g, gi) => {
    const pos = g.attributes.position
    const mp = g.attributes.mpos
    const n = pos.count
    const si = new Uint16Array(n * 4)
    const sw = new Float32Array(n * 4)
    const p = new THREE.Vector3()
    const c = g.attributes.color
    for (let i = 0; i < n; i++) {
      p.set(pos.getX(i), pos.getY(i), pos.getZ(i))
      if (c && c.itemSize === 4 && c.getW(i) < 0.3 && p.x > waistX && Math.hypot(p.x - cx, p.y) < bodyR * 1.2 && p.z > topZ * 0.45) {
        eye.x = Math.min(eye.x, mp.getY(i))
        eye.y = Math.max(eye.y, mp.getY(i))
        eye.z = Math.max(eye.z, Math.abs(mp.getX(i)))
        eye.w = Math.min(eye.w, mp.getZ(i))
      }
      const r = Math.hypot(p.x - cx, p.y)
      let done = false
      // chelicerae and palps hang in front of the face: they stay with the body
      const face = p.x > cx && Math.abs(p.y) < bodyR * 0.62
      if (r > bodyR * 0.7 && !face && !onAbdomen(p.x, p.y)) {
        // nearest leg by distance to its hip-knee-foot polyline
        let best = -1, bd = 0.07, bt = 0
        for (let k = 0; k < legs.length; k++) {
          const lg = legs[k]
          const d1 = segDist(p, lg.hip, lg.knee)
          const d2 = segDist(p, lg.knee, lg.foot)
          if (d1.d < bd) { bd = d1.d; best = k; bt = d1.t * 0.5 }
          if (d2.d < bd) { bd = d2.d; best = k; bt = 0.5 + d2.t * 0.5 }
        }
        if (best >= 0) {
          const bi = 2 + best * 2
          // blend across the knee (bt 0.5), and into the body at the hip
          const w2 = Math.min(1, Math.max(0, (bt - 0.44) / 0.12))
          const w0 = Math.min(1, Math.max(0, (0.08 - bt) / 0.08)) * (1 - w2)
          si[i * 4] = bi
          si[i * 4 + 1] = bi + 1
          si[i * 4 + 2] = 0
          sw[i * 4] = (1 - w2) * (1 - w0)
          sw[i * 4 + 1] = w2
          sw[i * 4 + 2] = w0
          done = true
        }
      }
      if (!done) {
        si[i * 4] = onAbdomen(p.x, p.y) ? 1 : 0
        sw[i * 4] = 1
      }
    }
    g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(si, 4))
    g.setAttribute("skinWeight", new THREE.Float32BufferAttribute(sw, 4))
    if (!g.attributes._w) g.setAttribute("_w", new THREE.BufferAttribute(new Float32Array(n * 2), 2))
    const srcMat = meshes[gi].material as THREE.MeshStandardMaterial
    const hasColor = !!c && c.itemSize === 4
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: hasColor,
      map: hasColor ? null : srcMat.map ?? null,
      roughness: 1,
      metalness: 0,
      envMapIntensity: 1,
    })
    const proj = hasColor && top && front ? 1 : 0
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTop = { value: top }
      sh.uniforms.uFront = { value: front }
      sh.uniforms.uBlink = uniforms.uBlink
      sh.uniforms.uEye = { value: eye }
      sh.uniforms.uProj = { value: proj }
      sh.vertexShader = SKIN_VERT + sh.vertexShader.replace("#include <begin_vertex>", `#include <begin_vertex>\nvMpos = mpos;\nvW = _w;`)
      sh.fragmentShader = SKIN_FRAG + sh.fragmentShader
        .replace("vec4 diffuseColor = vec4( diffuse, opacity );", hasColor ? SKIN_COLOR : "vec4 diffuseColor = vec4( diffuse, opacity );")
        .replace("#include <color_fragment>", "")
        .replace("#include <roughnessmap_fragment>", hasColor ? "float roughnessFactor = clamp(mix(0.08, 0.92, rough), 0.06, 1.0);" : "#include <roughnessmap_fragment>")
    }
    const sm = new THREE.SkinnedMesh(g, mat)
    sm.castShadow = true
    sm.frustumCulled = false
    root.add(sm)
  })
  // bones at rest must have identity skinning: inverses from the rest pose
  const first = root.children[0] as THREE.SkinnedMesh
  first.add(rootBone)
  root.updateMatrixWorld(true)
  const skeleton = new THREE.Skeleton(bones)
  for (const sm of root.children) (sm as THREE.SkinnedMesh).bind(skeleton, new THREE.Matrix4())
  eye.x += (eye.y - eye.x) * 0.02

  return {
    root, legs, abdomen, uniforms,
    spinneret: new THREE.Vector3(bx0 + 0.01, 0, topZ * 0.4),
    headFront: new THREE.Vector3(bx1, 0, topZ * 0.7),
    bodyLen,
  }
}

// ---------------------------------------------------------------------------


const isTyping = (el: Element | null) =>
  !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable)

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const angDiff = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a))
const damp = (k: number, dt: number) => 1 - Math.exp(-k * dt)
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export default function SilkSpiderCursor({
  anchorSelector = "[data-silk-anchor]",
  modelSrc = DEFAULT_MODEL,
  topTextureSrc,
  faceTextureSrc,
  size,
  silkColor = "#ffffff",
  bounceColor = "#1530e6",
  shadowColor = "#000a3a",
  maxThreads = 120,
  fly = true,
  sleepAfter = 4500,
  enter = true,
  seedWebs = 0,
  clearKeys = ["Delete", "Backspace"],
  position = "fixed",
  zIndex = 50,
  maxDpr = 2,
  className,
}: SilkSpiderCursorProps) {
  const wrapRef = React.useRef(null as HTMLDivElement | null)
  const silkRef = React.useRef(null as HTMLCanvasElement | null)
  const glRef = React.useRef(null as HTMLCanvasElement | null)
  const opts = React.useRef({ anchorSelector, size, silkColor, maxThreads, fly, sleepAfter, enter, clearKeys })
  opts.current = { anchorSelector, size, silkColor, maxThreads, fly, sleepAfter, enter, clearKeys }

  React.useEffect(() => {
    const wrap = wrapRef.current
    const silkCanvas = silkRef.current
    const glCanvas = glRef.current
    if (!wrap || !silkCanvas || !glCanvas) return
    const ctx = silkCanvas.getContext("2d")
    if (!ctx) return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const rand = mulberry(0x5eed)

    // ---------------- renderer ----------------
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas: glCanvas, alpha: true, antialias: true, powerPreference: "high-performance" })
    } catch {
      return
    }
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.92
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex
    scene.environmentIntensity = 0.35
    const hemi = new THREE.HemisphereLight(0xfff6ec, new THREE.Color(bounceColor), 0.45)
    hemi.position.set(0, 0, 1)
    scene.add(hemi)
    const key = new THREE.DirectionalLight(0xfff1de, 1.9)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.radius = 5
    key.shadow.bias = -0.0008
    key.shadow.normalBias = 0.6
    scene.add(key, key.target)
    const rim = new THREE.DirectionalLight(0xbcd0ff, 0.7)
    scene.add(rim, rim.target)
    const camera = new THREE.PerspectiveCamera(20, 1, 1, 20000)
    // shadow catcher on the page plane, moved with the spider
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShadowMaterial({ color: new THREE.Color(shadowColor), opacity: 0.42 }),
    )
    catcher.receiveShadow = true
    scene.add(catcher)
    // contact shade under the body: a soft radial blob
    const blobCanvas = document.createElement("canvas")
    blobCanvas.width = blobCanvas.height = 64
    const bctx = blobCanvas.getContext("2d") as CanvasRenderingContext2D
    const bg = bctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    bg.addColorStop(0, "rgba(0,0,0,0.55)")
    bg.addColorStop(0.55, "rgba(0,0,0,0.18)")
    bg.addColorStop(1, "rgba(0,0,0,0)")
    bctx.fillStyle = bg
    bctx.fillRect(0, 0, 64, 64)
    const blob = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(blobCanvas), transparent: true, depthWrite: false, color: new THREE.Color(shadowColor) }),
    )
    blob.position.z = 0.2
    scene.add(blob)

    const body = new THREE.Group() // page position + yaw/pitch/roll
    scene.add(body)
    let rig: Rig | null = null

    // ---------------- sizing ----------------
    let W = 0, H = 0, dpr = 1, S = 220
    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      dpr = Math.min(maxDpr, window.devicePixelRatio || 1)
      silkCanvas.width = Math.round(W * dpr)
      silkCanvas.height = Math.round(H * dpr)
      renderer.setPixelRatio(dpr)
      renderer.setSize(W, H, false)
      const fov = camera.fov * (Math.PI / 180)
      const dist = H / 2 / Math.tan(fov / 2)
      camera.aspect = W / H
      camera.position.set(W / 2, -H / 2, dist)
      camera.near = dist * 0.5
      camera.far = dist * 1.6
      camera.lookAt(W / 2, -H / 2, 0)
      camera.updateProjectionMatrix()
      S = opts.current.size ?? clamp(Math.min(W, H * 1.4) * 0.22, 150, 300)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // ---------------- spider state (page px, y down) ----------------
    const sp = {
      x: W * 0.5, y: -S, vx: 0, vy: 0, th: Math.PI / 2, pitch: 0, roll: 0, z: 0, vz: 0,
      mode: reduced ? "idle" : opts.current.enter ? "enter" : "idle",
      t: 0, idleT: 0, blink: 0, sleep: 0, eyesClosed: 0, wake: 0, preferGroup: 0, ik: 0,
      enterX: W * 0.5, enterY: H * 0.34, landed: false,
    }
    if (sp.mode !== "enter") {
      sp.x = reduced ? W * 0.6 : W * 0.5
      sp.y = reduced ? H * 0.2 : H * 0.4
      sp.landed = true
    }
    const ptr = { x: sp.x, y: sp.y, has: false, lastMove: -1e9, ix: 0, iy: 0 }

    // ---------------- silk state ----------------
    const silk = createSilk()
    let drag: Thread | null = null
    let dragEl: Element | null = null
    let tackX = 0, tackY = 0
    let dropLine: Thread | null = null
    let anchorEls = [] as Element[]
    let anchorScan = 0
    const rects = new Map() as Map<Element, DOMRect>

    const scanAnchors = () => {
      const root = position === "fixed" ? document : wrap.parentElement ?? document
      anchorEls = Array.from(root.querySelectorAll(opts.current.anchorSelector))
    }
    scanAnchors()

    // world helpers
    const v3 = new THREE.Vector3()
    const m4 = new THREE.Matrix4()
    const toPage = (local: THREE.Vector3, out: THREE.Vector3) => {
      out.copy(local).applyMatrix4(rig ? rig.root.matrixWorld : body.matrixWorld)
      out.y = -out.y
      return out
    }
    const spinPage = new THREE.Vector3()
    const headPage = new THREE.Vector3()

    const anchorAt = (x: number, y: number, el: Element | null) => {
      if (!el) return silk.addAnchor({ el: null, u: 0, v: 0, sx: x, sy: y })
      const r = rects.get(el) as DOMRect
      return silk.addAnchor({ el, u: (x - r.left) / Math.max(1, r.width), v: (y - r.top) / Math.max(1, r.height), sx: x, sy: y })
    }

    const startDrag = (x: number, y: number, el: Element) => {
      const t = silk.newThread(el)
      const a = silk.particle(x, y, anchorAt(x, y, el))
      const s = silk.particle(x, y, silk.addAnchor({ el: null, u: 0, v: 0, sx: x, sy: y }))
      if (a < 0 || s < 0) return null
      t.owned.push(a, s)
      t.parts.push(a, s)
      t.cons.push(silk.constraint(a, s, 0.5))
      t.born = sp.t
      drag = t
      dragEl = el
      tackX = x
      tackY = y
      return t
    }

    const dragSpinner = (t: Thread) => t.parts[t.parts.length - 1]

    // Grow the drag line: when the spinneret pulls away, the pinned end becomes
    // a free bead and a new pinned end takes its place.
    const feedDrag = (x: number, y: number) => {
      if (!drag) return
      const s = dragSpinner(drag)
      const an = silk.anchors[silk.PIN[s]]
      if (an) {
        an.sx = x
        an.sy = y
      }
      const prev = drag.parts[drag.parts.length - 2]
      const seg = Math.max(10, S * 0.07)
      const d = Math.hypot(x - silk.X[prev], y - silk.Y[prev])
      if (d > seg && drag.parts.length < 60) {
        silk.unpin(s)
        silk.X[s] = silk.PX[s] = x
        silk.Y[s] = silk.PY[s] = y
        const c = drag.cons[drag.cons.length - 1]
        silk.CR[c] = d
        const ns = silk.particle(x, y, silk.addAnchor({ el: null, u: 0, v: 0, sx: x, sy: y }))
        if (ns < 0) return
        drag.owned.push(ns)
        drag.parts.push(ns)
        drag.cons.push(silk.constraint(s, ns, 0.5))
      } else {
        silk.CR[drag.cons[drag.cons.length - 1]] = Math.max(0.5, d)
      }
    }

    const setThreads = () => silk.threads.filter((t) => t.state === 1)

    // a line between two particles, laid with a sag, and maybe a bridge from it
    const lay = (a: number, b: number, el: Element | null) => {
      const t = silk.newThread(el)
      silk.span(t, a, b, Math.max(12, S * 0.08), 0.02 + rand() * 0.05)
      t.state = 1
      t.born = -10
      silk.sprinkleDew(t, rand, Math.sqrt(S / 220))
      return t
    }
    const bridgeFrom = (t: Thread) => {
      const mid = t.parts[Math.floor(t.parts.length / 2)]
      let best = -1, bd = S * 1.1, host: Thread | null = null
      for (const o of setThreads()) {
        if (o === t || o.parts.length < 4) continue
        for (let k = 1; k < o.parts.length - 1; k++) {
          const p = o.parts[k]
          const d = Math.hypot(silk.X[p] - silk.X[mid], silk.Y[p] - silk.Y[mid])
          if (d < bd && d > S * 0.18) { bd = d; best = p; host = o }
        }
      }
      if (best < 0 || !host) return
      const b = lay(mid, best, null)
      b.born = sp.t
      b.hostIds.push(t.id, host.id)
    }

    // The web it spun before you arrived: lines between nearby marked elements
    // in view, then bridges between them.
    const seed = (n: number) => {
      const els = anchorEls.filter((e) => {
        const r = rects.get(e)
        return !!r && r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < H
      })
      if (els.length < 2) return
      const pt = (el: Element) => {
        const r = rects.get(el) as DOMRect
        return [r.left + r.width * (0.15 + rand() * 0.7), r.top + r.height * (0.08 + rand() * 0.45)]
      }
      const made = [] as Thread[]
      for (let k = 0, tries = 0; k < n && tries < n * 12; tries++) {
        const A = els[Math.floor(rand() * els.length)]
        const ra = rects.get(A) as DOMRect
        const near = els.filter((e) => {
          if (e === A) return false
          const r = rects.get(e) as DOMRect
          const d = Math.hypot(r.left + r.width / 2 - ra.left - ra.width / 2, r.top + r.height / 2 - ra.top - ra.height / 2)
          return d > S * 0.4 && d < Math.min(W, H) * 0.6
        })
        if (!near.length) continue
        const B = near[Math.floor(rand() * near.length)]
        const [ax, ay] = pt(A), [bx, by] = pt(B)
        const pa = silk.particle(ax, ay, anchorAt(ax, ay, A))
        const pb = silk.particle(bx, by, anchorAt(bx, by, B))
        if (pa < 0 || pb < 0) break
        const t = lay(pa, pb, A)
        t.owned.push(pa, pb)
        made.push(t)
        k++
      }
      for (const t of made) if (rand() < 0.6) bridgeFrom(t)
    }
    let seeded = reduced || seedWebs <= 0

    // Tack the drag line down at (x, y) on el: it tightens to a gentle sag and
    // sometimes throws a bridge to a nearby line.
    const attach = (x: number, y: number, el: Element) => {
      if (!drag) return
      const t = drag
      const s = dragSpinner(t)
      const a0 = t.parts[0]
      const straight = Math.hypot(silk.X[a0] - x, silk.Y[a0] - y)
      if (straight < S * 0.1) {
        // too short to be worth a line: just move the start here
        silk.freeThread(t)
        silk.threads.splice(silk.threads.indexOf(t), 1)
        drag = null
        startDrag(x, y, el)
        return
      }
      const an = silk.anchors[silk.PIN[s]]
      if (an) {
        const r = rects.get(el) as DOMRect
        an.el = el
        an.u = (x - r.left) / Math.max(1, r.width)
        an.v = (y - r.top) / Math.max(1, r.height)
      }
      // re-lay as a straight line with a little slack: it twangs into a catenary
      const parts = t.parts
      const n = parts.length
      for (let k = 1; k < n - 1; k++) {
        const p = parts[k]
        const f = k / (n - 1)
        silk.X[p] = silk.X[a0] + (x - silk.X[a0]) * f + (rand() - 0.5) * 3
        silk.Y[p] = silk.Y[a0] + (y - silk.Y[a0]) * f
        silk.PX[p] = silk.X[p] + (rand() - 0.5) * 2
        silk.PY[p] = silk.Y[p] - 4 * Math.sin(Math.PI * f)
      }
      const slack = 0.015 + rand() * 0.05
      const rest = (straight * (1 + slack)) / (n - 1)
      for (const c of t.cons) silk.CR[c] = rest
      t.state = 1
      t.born = sp.t
      silk.sprinkleDew(t, rand, Math.sqrt(S / 220))
      drag = null

      // bridges: tie the middle of this line to a nearby older line
      if (rand() < 0.75) bridgeFrom(t)
      // too many lines: the oldest begin to fade
      const live = setThreads()
      const over = live.length - opts.current.maxThreads
      for (let k = 0; k < over; k++) kill(live[k], false)
      startDrag(x, y, el)
    }

    const kill = (t: Thread, burst: boolean) => {
      if (t.state === 2) return
      t.state = 2
      t.dieT = 0
      // threads hanging from this one go with it
      for (const o of silk.threads) if (o.hostIds.includes(t.id)) kill(o, burst)
      for (const p of t.parts) {
        silk.unpin(p)
        if (burst) {
          silk.PX[p] = silk.X[p] - (rand() - 0.5) * 6
          silk.PY[p] = silk.Y[p] + 1 + rand() * 3
        }
      }
    }

    const clearAll = () => {
      for (const t of silk.threads) kill(t, true)
      drag = null
      dragEl = null
      if (sp.mode === "sleep") wake()
      sp.vz += S * 0.9
    }

    // ---------------- fly ----------------
    const flyS = { on: false, x: 0, y: 0, vx: 0, vy: 0, t: 0, caught: -1, wrapped: 0, next: 9 + rand() * 6, seed: 0, done: false, cx: 0, cy: 0 }
    const cocoons = [] as { p: number; t: number; th: number }[]

    // ---------------- input ----------------
    const onMove = (x: number, y: number) => {
      const r = wrap.getBoundingClientRect()
      const nx = x - r.left, ny = y - r.top
      if (!ptr.has || Math.hypot(nx - ptr.x, ny - ptr.y) > 0.5) ptr.lastMove = sp.t
      ptr.x = nx
      ptr.y = ny
      ptr.has = true
    }
    const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY)
    const tm = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) onMove(t.clientX, t.clientY)
    }
    const kd = (e: KeyboardEvent) => {
      if (!opts.current.clearKeys.includes(e.key)) return
      if (isTyping(document.activeElement)) return
      if (!silk.threads.length) return
      clearAll()
    }
    window.addEventListener("pointermove", pm, { passive: true })
    window.addEventListener("pointerdown", pm, { passive: true })
    window.addEventListener("touchstart", tm, { passive: true })
    window.addEventListener("touchmove", tm, { passive: true })
    window.addEventListener("keydown", kd)

    const wake = () => {
      sp.mode = "walk"
      sp.idleT = 0
      sp.wake = 1
      sp.vz += S * 0.7
    }

    // ---------------- model ----------------
    let disposed = false
    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)
    const placeFeet = () => {
      if (!rig) return
      const c = Math.cos(sp.th), s = Math.sin(sp.th)
      for (const lg of rig.legs) {
        const lx = lg.foot.x * S, ly = -lg.foot.y * S
        lg.fx = sp.x + lx * c - ly * s
        lg.fy = sp.y + lx * s + ly * c
        lg.fz = 0
      }
    }
    // The spider: a skinned model plus its two photo projections. Textures
    // load first so the first frame it appears in is already fully dressed.
    const texLoader = new THREE.TextureLoader()
    const loadTex = (src: string) =>
      new Promise((done: (t: THREE.Texture | null) => void) => {
        if (!src) return done(null)
        texLoader.load(src, (t) => {
          t.colorSpace = THREE.SRGBColorSpace
          t.anisotropy = 4
          done(t)
        }, undefined, () => done(null))
      })
    const own = modelSrc === DEFAULT_MODEL
    Promise.all([loadTex(own ? topTextureSrc ?? DEFAULT_TOP : topTextureSrc ?? ""), loadTex(own ? faceTextureSrc ?? DEFAULT_FACE : faceTextureSrc ?? "")]).then(([top, front]) => {
      if (disposed || !modelSrc) return
      loader.load(
        modelSrc,
        (gltf) => {
          if (disposed) return
          rig = buildRig(gltf.scene, top, front, own ? DEFAULT_TIPS : null)
          body.add(rig.root)
          placeFeet()
        },
        undefined,
        () => {},
      )
    })

    // ---------------- per-frame ----------------
    const knee = [0, 0, 0, 0, 0, 0]
    const qA = new THREE.Quaternion()
    const qB = new THREE.Quaternion()
    const mA = new THREE.Matrix4()
    const mB = new THREE.Matrix4()
    const inv = new THREE.Matrix4()
    const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vN = new THREE.Vector3(), vC = new THREE.Vector3()
    const nd1 = new THREE.Vector3(), nd2 = new THREE.Vector3(), fb2 = new THREE.Vector3()
    const qS = new THREE.Quaternion(), qT = new THREE.Quaternion()

    // rotation that carries the rest frame (d, n) onto (d2, n2)
    const frameRot = (d: THREE.Vector3, n: THREE.Vector3, d2: THREE.Vector3, n2: THREE.Vector3, out: THREE.Quaternion) => {
      const b1 = vC.crossVectors(n, d).normalize()
      mA.makeBasis(d, n, b1)
      const b2 = fb2.crossVectors(n2, d2).normalize()
      mB.makeBasis(d2, n2, b2)
      mA.transpose()
      mB.multiply(mA)
      return out.setFromRotationMatrix(mB)
    }

    const updateLegs = (dt: number) => {
      if (!rig) return
      const c = Math.cos(sp.th), s = Math.sin(sp.th)
      const speed = Math.hypot(sp.vx, sp.vy)
      const walking = sp.mode === "walk" || sp.mode === "hunt"
      const tuck = sp.sleep
      const dur = clamp(0.19 - (speed / S) * 0.03, 0.085, 0.19)
      const lead = dur * 0.95
      const thresh = (walking ? 0.1 : 0.045) * S
      const hang = sp.mode === "enter" && !sp.landed
      const errs = [] as number[]
      const homes = [] as number[]
      for (let i = 0; i < rig.legs.length; i++) {
        const lg = rig.legs[i]
        const k = 1 - tuck * 0.22
        let lx = lg.foot.x * S * k, ly = -lg.foot.y * S * k
        const hx = sp.x + lx * c - ly * s + sp.vx * lead
        const hy = sp.y + lx * s + ly * c + sp.vy * lead
        homes.push(hx, hy)
        errs.push(Math.hypot(lg.fx - hx, lg.fy - hy))
        // a foot left far behind (pointer jumped) is put back at once
        if (errs[i] > S * 0.6) {
          lg.fx = hx
          lg.fy = hy
          lg.stepping = false
          errs[i] = 0
        }
      }
      if (!hang) {
        const stepping = [false, false]
        for (let i = 0; i < 8; i++) if (rig.legs[i].stepping) stepping[GROUP[i]] = true
        for (const g of [sp.preferGroup, 1 - sp.preferGroup]) {
          if (stepping[0] || stepping[1]) break
          let worst = 0
          for (let i = 0; i < 8; i++) if (GROUP[i] === g) worst = Math.max(worst, errs[i])
          if (worst > thresh) {
            for (let i = 0; i < 8; i++) {
              if (GROUP[i] !== g || errs[i] < thresh * 0.3) continue
              const lg = rig.legs[i]
              lg.stepping = true
              lg.t = 0
              lg.dur = dur * (0.9 + rand() * 0.2)
              lg.sx = lg.fx
              lg.sy = lg.fy
            }
            sp.preferGroup = 1 - g
            stepping[g] = true
          }
        }
      }
      for (let i = 0; i < rig.legs.length; i++) {
        const lg = rig.legs[i]
        if (hang) {
          // dangling on the line: feet drawn in under the body, paddling
          const k = 0.62
          const lx = lg.foot.x * S * k, ly = -lg.foot.y * S * k
          lg.fx = sp.x + lx * c - ly * s
          lg.fy = sp.y + lx * s + ly * c
          lg.fz = S * (0.05 + 0.025 * Math.sin(sp.t * 5 + i * 1.7))
          continue
        }
        if (lg.stepping) {
          lg.t += dt / lg.dur
          const f = Math.min(1, lg.t)
          const e = f * f * (3 - 2 * f)
          lg.fx = lg.sx + (homes[i * 2] - lg.sx) * e
          lg.fy = lg.sy + (homes[i * 2 + 1] - lg.sy) * e
          lg.fz = Math.sin(Math.PI * f) * S * (0.05 + Math.min(0.04, (speed / S) * 0.01))
          if (f >= 1) {
            lg.stepping = false
            lg.fz = 0
            pluck(lg.fx, lg.fy)
          }
        } else {
          lg.fz += (0 - lg.fz) * damp(20, dt)
        }
      }
      // Legs follow IK while it walks; resting, facing you, asleep or hanging,
      // they ease back to the sculpted pose and the feet re-home under it.
      const facing = sp.mode === "idle" && Math.abs(angDiff(sp.th, Math.PI / 2)) < 0.3
      const ikTo = hang || sp.mode === "sleep" || facing ? 0 : 1
      sp.ik += (ikTo - sp.ik) * damp(ikTo ? 10 : 5, dt)
      if (sp.ik < 0.5) {
        for (let i = 0; i < rig.legs.length; i++) {
          const lg = rig.legs[i]
          lg.fx = homes[i * 2] - sp.vx * lead
          lg.fy = homes[i * 2 + 1] - sp.vy * lead
          lg.fz = 0
          lg.stepping = false
        }
      }

      // pose the bones. The pole swings with the leg from its rest bend, so a
      // foot at its rest place gives the sculpted leg back untouched.
      rig.root.updateMatrixWorld(true)
      inv.copy(rig.root.matrixWorld).invert()
      const w = sp.ik
      for (let i = 0; i < rig.legs.length; i++) {
        const lg = rig.legs[i]
        if (w < 0.001) {
          lg.b1.quaternion.identity()
          lg.b2.quaternion.identity()
        } else {
          vA.set(lg.fx, -lg.fy, lg.fz).applyMatrix4(inv)
          vC.copy(vA).sub(lg.hip).normalize()
          qS.setFromUnitVectors(lg.rd, vC)
          vB.copy(lg.rp).applyQuaternion(qS)
          solveKnee(lg.hip.x, lg.hip.y, lg.hip.z, vA.x, vA.y, vA.z, lg.l1, lg.l2, vB.x, vB.y, vB.z, knee)
          const d1 = vA.set(lg.knee.x - lg.hip.x, lg.knee.y - lg.hip.y, lg.knee.z - lg.hip.z).normalize()
          const d2 = vB.set(lg.foot.x - lg.knee.x, lg.foot.y - lg.knee.y, lg.foot.z - lg.knee.z).normalize()
          nd1.set(knee[0] - lg.hip.x, knee[1] - lg.hip.y, knee[2] - lg.hip.z).normalize()
          nd2.set(knee[3] - knee[0], knee[4] - knee[1], knee[5] - knee[2]).normalize()
          const nn = vN.crossVectors(nd1, nd2)
          if (nn.lengthSq() < 1e-8) nn.copy(lg.restN)
          nn.normalize()
          frameRot(d1, lg.restN, nd1, nn, qA)
          frameRot(d2, lg.restN, nd2, nn, qB)
          qB.premultiply(qT.copy(qA).invert())
          lg.b1.quaternion.identity().slerp(qA, w)
          lg.b2.quaternion.identity().slerp(qB, w)
        }
        if (hang) {
          // dangling on the line: the legs paddle a little around their rest pose
          qT.setFromAxisAngle(lg.restN, Math.sin(sp.t * 5 + i * 1.7) * 0.14)
          lg.b1.quaternion.multiply(qT)
          qT.setFromAxisAngle(lg.restN, Math.sin(sp.t * 5 + i * 1.7 + 0.8) * 0.2)
          lg.b2.quaternion.multiply(qT)
        }
      }
    }

    const pluck = (x: number, y: number) => {
      const r = S * 0.08
      for (const t of silk.threads) {
        if (t.state !== 1) continue
        for (const p of t.parts) {
          if (silk.INV[p] === 0) continue
          const d = Math.hypot(silk.X[p] - x, silk.Y[p] - y)
          if (d < r) silk.PY[p] -= 2.2 * (1 - d / r)
        }
      }
    }

    const updateSpider = (dt: number) => {
      sp.t += dt
      const o = opts.current
      if (sp.mode === "enter") {
        const t = sp.t
        const dropT = 1.9
        const p = Math.min(1, t / dropT)
        const ease = 1 - Math.pow(1 - p, 3)
        sp.x = sp.enterX + Math.sin(t * 2.1) * S * 0.04 * Math.exp(-t * 0.5)
        sp.y = -S * 0.7 + (sp.enterY + S * 0.7) * ease
        if (t > dropT) sp.y += Math.sin((t - dropT) * 9) * S * 0.07 * Math.exp(-(t - dropT) * 3)
        sp.th = Math.PI / 2 + Math.sin(t * 1.3) * 0.22 * Math.exp(-t * 0.4)
        sp.pitch += (0.55 - sp.pitch) * damp(3, dt)
        if (!dropLine) {
          const tl = silk.newThread(null)
          const a = silk.particle(sp.enterX, -2, silk.addAnchor({ el: null, u: 0, v: 0, sx: sp.enterX, sy: -2 }))
          const b = silk.particle(sp.enterX, -1, silk.addAnchor({ el: null, u: 0, v: 0, sx: sp.enterX, sy: -1 }))
          tl.owned.push(a, b)
          tl.parts.push(a, b)
          tl.cons.push(silk.constraint(a, b, 1))
          tl.state = 1
          dropLine = tl
        }
        if (t > 2.7 && !sp.landed) {
          sp.landed = true
          // bite the line: it springs up and away
          if (dropLine) {
            const end = dropLine.parts[dropLine.parts.length - 1]
            silk.unpin(end)
            silk.PY[end] = silk.Y[end] + 14
            const tl = dropLine
            setTimeout(() => kill(tl, false), 650)
          }
          sp.mode = "idle"
          sp.idleT = 0.4
          sp.vx = sp.vy = 0
          placeFeet()
          ptr.x = sp.x
          ptr.y = sp.y
        }
        return
      }

      const moved = ptr.has && sp.t - ptr.lastMove < 0.25
      // a caught fly is worth a walk when you leave the spider alone
      const huntFly = !reduced && flyS.on && flyS.caught >= 0 && !moved && sp.t - ptr.lastMove > 1.2
      let tx = ptr.x, ty = ptr.y
      if (huntFly) {
        tx = silk.X[flyS.caught]
        ty = silk.Y[flyS.caught]
      }
      if (reduced) {
        tx = sp.x
        ty = sp.y
      }
      const dx = tx - sp.x, dy = ty - sp.y
      const dist = Math.hypot(dx, dy)

      if (sp.mode === "sleep") {
        // the pointer, or a fly struggling in the silk, wakes it
        if ((moved && Math.hypot(ptr.x - ptr.ix, ptr.y - ptr.iy) > 4) || (huntFly && flyS.t > 1.5)) wake()
      } else if (moved || huntFly || dist > S * 0.12) {
        if (sp.mode !== "walk" && sp.mode !== "hunt") {
          sp.mode = "walk"
          sp.idleT = 0
        }
        if (huntFly) sp.mode = "hunt"
        else if (sp.mode === "hunt") sp.mode = "walk"
      }

      if (sp.mode === "walk" || sp.mode === "hunt") {
        const maxV = S * 2.7
        const stop = sp.mode === "hunt" ? S * 0.32 : 4
        let want = Math.min(maxV, Math.max(0, dist - stop) * 3.2)
        const head = Math.atan2(dy, dx)
        const err = Math.abs(angDiff(sp.th, head))
        // big turns are made mostly on the spot
        want *= clamp(Math.cos(err) * 1.2, 0.18, 1)
        const ux = dist > 0.001 ? dx / dist : 0, uy = dist > 0.001 ? dy / dist : 0
        sp.vx += (ux * want - sp.vx) * damp(6.5, dt)
        sp.vy += (uy * want - sp.vy) * damp(6.5, dt)
        const speed = Math.hypot(sp.vx, sp.vy)
        if (dist > 6) {
          const turn = angDiff(sp.th, head)
          sp.th += clamp(turn, -8 * dt, 8 * dt) * Math.min(1, 0.25 + speed / (S * 0.3))
        }
        sp.x += sp.vx * dt
        sp.y += sp.vy * dt
        sp.pitch += (0 - sp.pitch) * damp(9, dt)
        if (!moved && dist <= stop + 6 && speed < S * 0.06) {
          if (sp.mode === "hunt") {
            flyS.wrapped += dt
          } else {
            sp.mode = "idle"
            sp.idleT = 0
            ptr.ix = ptr.x
            ptr.iy = ptr.y
          }
        }
      } else {
        sp.vx += (0 - sp.vx) * damp(10, dt)
        sp.vy += (0 - sp.vy) * damp(10, dt)
        sp.x += sp.vx * dt
        sp.y += sp.vy * dt
      }

      if (sp.mode === "idle") {
        sp.idleT += dt
        // turn to face you (screen-down), then rear up so the eyes show
        const face = Math.PI / 2
        if (sp.idleT > 0.15) sp.th += clamp(angDiff(sp.th, face), -4 * dt, 4 * dt)
        const facing = Math.abs(angDiff(sp.th, face)) < 0.3
        const rearTo = facing ? (reduced ? 0.6 : 0.85) : 0
        sp.pitch += (rearTo - sp.pitch) * damp(4, dt)
        // two blinks shortly after it settles
        const bt = sp.idleT - 1.0
        sp.blink = bt > 0 && bt < 0.18 ? Math.sin((bt / 0.18) * Math.PI) : bt > 0.34 && bt < 0.52 ? Math.sin(((bt - 0.34) / 0.18) * Math.PI) : 0
        if (reduced) sp.blink = Math.max(0, Math.sin(sp.t * 0.9) * 40 - 39)
        if (!reduced && sp.idleT * 1000 > o.sleepAfter) {
          sp.mode = "sleep"
          ptr.ix = ptr.x
          ptr.iy = ptr.y
        }
      }
      const sleeping = sp.mode === "sleep"
      sp.sleep += ((sleeping ? 1 : 0) - sp.sleep) * damp(sleeping ? 1.4 : 7, dt)
      if (sleeping) sp.pitch += (0 - sp.pitch) * damp(2.5, dt)
      sp.eyesClosed = Math.max(sp.blink, sp.sleep)
      sp.wake = Math.max(0, sp.wake - dt * 2)

      // body bounce: a spring on height, kicked by wake-ups and clears
      sp.vz += (-sp.z * 160 - sp.vz * 14) * dt
      sp.z += sp.vz * dt
      // lean into acceleration
      const lat = -Math.sin(sp.th) * sp.vx + Math.cos(sp.th) * sp.vy
      sp.roll += (clamp(-lat / (S * 30), -0.12, 0.12) - sp.roll) * damp(6, dt)
    }

    const placeBody = () => {
      const breathe = Math.sin(sp.t * (sp.sleep > 0.5 ? 1.6 : 2.6)) * 0.004
      body.position.set(sp.x, -sp.y, sp.z - sp.sleep * S * 0.025)
      body.rotation.set(0, 0, 0)
      body.rotation.order = "ZYX"
      body.rotation.z = -sp.th
      body.rotation.y = -sp.pitch * 0.85
      body.rotation.x = sp.roll
      if (rig) {
        rig.root.scale.setScalar(S)
        // rear up around the back feet, so they stay on the page
        const th = sp.pitch * 0.85
        const px = (rig.legs[3].foot.x + rig.legs[7].foot.x) * 0.5 * S
        rig.root.position.set(px * (Math.cos(th) - 1), 0, -px * Math.sin(th))
        rig.abdomen.rotation.y = sp.pitch * 0.5 + Math.sin(sp.t * 7) * 0.01 * Math.min(1, Math.hypot(sp.vx, sp.vy) / S)
        rig.abdomen.scale.setScalar(1 + breathe)
        rig.uniforms.uBlink.value = sp.eyesClosed
      }
      body.updateMatrixWorld(true)
      if (rig) {
        toPage(rig.spinneret, spinPage)
        toPage(rig.headFront, headPage)
      } else {
        spinPage.set(sp.x - Math.cos(sp.th) * S * 0.2, sp.y - Math.sin(sp.th) * S * 0.2, 0)
        headPage.set(sp.x + Math.cos(sp.th) * S * 0.15, sp.y + Math.sin(sp.th) * S * 0.15, 0)
      }
    }

    const updateWebs = () => {
      if (reduced) return
      if (dropLine && !sp.landed) {
        const end = dropLine.parts[dropLine.parts.length - 1]
        const an = silk.anchors[silk.PIN[end]]
        if (an) {
          an.sx = spinPage.x
          an.sy = spinPage.y
        }
        const a = dropLine.parts[0]
        silk.CR[dropLine.cons[0]] = Math.max(1, Math.hypot(spinPage.x - silk.X[a], spinPage.y - silk.Y[a]))
        return
      }
      if (!sp.landed) return
      const x = spinPage.x, y = spinPage.y
      // the most specific marked element under the spinnerets
      let el: Element | null = null
      let area = Infinity
      for (const e of anchorEls) {
        const r = rects.get(e)
        if (!r || x < r.left || x > r.right || y < r.top || y > r.bottom) continue
        const a = r.width * r.height
        if (a < area) { area = a; el = e }
      }
      const walking = Math.hypot(sp.vx, sp.vy) > S * 0.1
      if (!drag) {
        if (el && walking) startDrag(x, y, el)
        return
      }
      feedDrag(x, y)
      if (el && walking) {
        const r = rects.get(el) as DOMRect
        const big = Math.max(r.width, r.height) > S * 1.3
        if (el !== dragEl) attach(x, y, el)
        else if (big && Math.hypot(x - tackX, y - tackY) > S * 0.42) attach(x, y, el)
      }
      // a line that never finds an element is let go
      if (drag && silk.length(drag) > Math.hypot(W, H) * 0.9) {
        const t = drag
        drag = null
        dragEl = null
        kill(t, false)
      }
    }

    const updateFly = (dt: number) => {
      if (reduced || !opts.current.fly) return
      const f = flyS
      if (!f.on) {
        f.next -= dt
        if (f.next <= 0 && setThreads().length >= 3) {
          f.on = true
          f.cx = 0
          f.t = 0
          f.caught = -1
          f.wrapped = 0
          f.seed = rand() * 100
          const side = rand() < 0.5 ? -1 : 1
          f.x = side < 0 ? -20 : W + 20
          f.y = H * (0.15 + rand() * 0.6)
          f.vx = -side * 90
          f.vy = 0
        }
        return
      }
      f.t += dt
      if (f.caught < 0) {
        const n = f.seed
        const ax = Math.sin(f.t * 1.7 + n) * 260 + Math.sin(f.t * 4.3 + n * 2) * 140
        const ay = Math.cos(f.t * 1.3 + n * 3) * 220 + Math.sin(f.t * 5.1 + n) * 120
        // flies are drawn to the web: drift toward a bead of silk
        if (f.cx === 0 || rand() < dt * 0.4) {
          const live = setThreads()
          const t = live[Math.floor(rand() * live.length)]
          if (t) {
            const p = t.parts[Math.floor(t.parts.length / 2)]
            f.cx = silk.X[p]
            f.cy = silk.Y[p]
          }
        }
        const gx = f.cx || W * 0.5, gy = f.cy || H * 0.45
        f.vx += (ax + (gx - f.x) * 0.9) * dt
        f.vy += (ay + (gy - f.y) * 0.9) * dt
        const v = Math.hypot(f.vx, f.vy)
        const maxV = 230
        if (v > maxV) { f.vx *= maxV / v; f.vy *= maxV / v }
        f.x += f.vx * dt
        f.y += f.vy * dt
        // caught when it crosses a set line
        if (f.t > 1.2) {
          for (const t of silk.threads) {
            if (t.state !== 1) continue
            for (let k = 1; k < t.parts.length - 1; k++) {
              const p = t.parts[k]
              const q = t.parts[k + 1]
              // near the segment p-q
              const ex = silk.X[q] - silk.X[p], ey = silk.Y[q] - silk.Y[p]
              const u = clamp(((f.x - silk.X[p]) * ex + (f.y - silk.Y[p]) * ey) / (ex * ex + ey * ey || 1), 0, 1)
              if (Math.hypot(silk.X[p] + ex * u - f.x, silk.Y[p] + ey * u - f.y) < 6 && silk.INV[p] > 0) {
                f.caught = p
                silk.PY[p] -= 6
                break
              }
            }
            if (f.caught >= 0) break
          }
        }
        if (f.t > 16 || f.x < -60 || f.x > W + 60 || f.y < -60 || f.y > H + 60) {
          if (f.t > 3) {
            f.on = false
            f.next = 14 + rand() * 10
          }
        }
      } else {
        f.x = silk.X[f.caught]
        f.y = silk.Y[f.caught]
        if (silk.INV[f.caught] > 0 && f.wrapped < 0.01 && rand() < 0.12) {
          silk.PX[f.caught] += (rand() - 0.5) * 3
          silk.PY[f.caught] += (rand() - 0.5) * 3
        }
        const hostAlive = silk.threads.some((t) => t.state === 1 && t.parts.includes(f.caught))
        if (!hostAlive) {
          f.on = false
          f.next = 12 + rand() * 10
        } else if (f.wrapped > 1.6) {
          cocoons.push({ p: f.caught, t: 0, th: rand() * Math.PI })
          f.on = false
          f.next = 16 + rand() * 12
          if (sp.mode === "hunt") {
            sp.mode = "idle"
            sp.idleT = 0
            ptr.x = sp.x
            ptr.y = sp.y
            ptr.ix = sp.x
            ptr.iy = sp.y
          }
        }
      }
    }

    // ---------------- drawing (silk layer) ----------------
    const dew = document.createElement("canvas")
    dew.width = dew.height = 32
    {
      const d = dew.getContext("2d") as CanvasRenderingContext2D
      const g = d.createRadialGradient(16, 16, 2, 16, 16, 15)
      g.addColorStop(0, "rgba(255,255,255,0.12)")
      g.addColorStop(0.7, "rgba(255,255,255,0.28)")
      g.addColorStop(0.92, "rgba(255,255,255,0.75)")
      g.addColorStop(1, "rgba(255,255,255,0)")
      d.fillStyle = g
      d.beginPath()
      d.arc(16, 16, 15, 0, Math.PI * 2)
      d.fill()
      d.fillStyle = "rgba(255,255,255,0.95)"
      d.beginPath()
      d.ellipse(11.5, 11, 3.2, 2.4, -0.6, 0, Math.PI * 2)
      d.fill()
      d.fillStyle = "rgba(10,20,80,0.25)"
      d.beginPath()
      d.ellipse(17, 23, 7, 3, 0, 0, Math.PI)
      d.fill()
    }

    const pathThread = (t: Thread) => {
      const { X, Y } = silk
      const P = t.parts
      ctx.moveTo(X[P[0]], Y[P[0]])
      for (let k = 1; k < P.length - 1; k++) {
        const a = P[k], b = P[k + 1]
        ctx.quadraticCurveTo(X[a], Y[a], (X[a] + X[b]) / 2, (Y[a] + Y[b]) / 2)
      }
      const last = P[P.length - 1]
      ctx.lineTo(X[last], Y[last])
    }

    const drawSilk = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      const col = opts.current.silkColor
      ctx.strokeStyle = col
      // Settled lines share one path per pass; fading-in, dying and drag
      // lines keep their own alpha.
      const solid = [] as Thread[]
      for (const t of silk.threads) {
        if (t.parts.length < 2 || t.alpha <= 0.01) continue
        const a = t.alpha * (t.state === 0 ? 0.75 : Math.min(1, 0.55 + (time - t.born) * 2))
        if (a >= 0.999) {
          solid.push(t)
          continue
        }
        ctx.beginPath()
        pathThread(t)
        ctx.globalAlpha = a * 0.13
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.globalAlpha = a * 0.88
        ctx.lineWidth = 0.95
        ctx.stroke()
      }
      if (solid.length) {
        ctx.beginPath()
        for (const t of solid) pathThread(t)
        ctx.globalAlpha = 0.13
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.globalAlpha = 0.88
        ctx.lineWidth = 0.95
        ctx.stroke()
      }
      // micro-fibres: a second hair-thin strand that wanders off the first
      ctx.beginPath()
      for (const t of solid) {
        if (t.parts.length < 4) continue
        const { X, Y } = silk
        const P = t.parts
        for (let k = 0; k < P.length; k++) {
          const o = Math.sin(k * 1.9 + t.id) * 0.9
          if (k === 0) ctx.moveTo(X[P[k]], Y[P[k]] + o)
          else ctx.lineTo(X[P[k]], Y[P[k]] + o)
        }
      }
      ctx.globalAlpha = 0.3
      ctx.lineWidth = 0.5
      ctx.stroke()
      // dew
      for (const t of silk.threads) {
        if (!t.dews.length || t.alpha <= 0.02) continue
        const { X, Y } = silk
        const P = t.parts
        for (let k = 0; k < t.dews.length; k += 2) {
          const f = t.dews[k]
          const i = Math.min(P.length - 2, Math.floor(f))
          const fr = f - i
          const a = P[i], b = P[i + 1]
          let x = X[a] + (X[b] - X[a]) * fr
          let y = Y[a] + (Y[b] - Y[a]) * fr
          let r = t.dews[k + 1]
          if (t.state === 2) {
            y += t.dieT * t.dieT * 260 * (0.6 + (k % 5) * 0.12)
            r *= 1 + t.dieT * 0.4
          }
          const tw = 0.75 + 0.25 * Math.sin(time * 2.2 + k * 3.7 + t.id)
          ctx.globalAlpha = t.alpha * tw
          const R = r * 2.1
          ctx.drawImage(dew, x - R, y - R + r * 0.6, R * 2, R * 2)
        }
      }
      ctx.globalAlpha = 1
      // cocoons
      for (const c of cocoons) {
        const alive = silk.threads.some((t) => t.state !== 2 && t.parts.includes(c.p))
        if (!alive) c.t = -1
        if (c.t < 0) continue
        ctx.save()
        ctx.translate(silk.X[c.p], silk.Y[c.p] + 5)
        ctx.rotate(c.th * 0.3)
        ctx.drawImage(cocoonSprite, -8, -11, 16, 22)
        ctx.restore()
      }
      for (let k = cocoons.length - 1; k >= 0; k--) if (cocoons[k].t < 0) cocoons.splice(k, 1)
      drawFly(time)
      drawZ(time)
    }

    // The fly and the cocoon are painted once into sprites: drawing gradients
    // under a rotation for the first time mid-animation stalls some GPUs.
    const sprite = (w: number, h: number, paint: (d: CanvasRenderingContext2D) => void) => {
      const c = document.createElement("canvas")
      c.width = w * 4
      c.height = h * 4
      const d = c.getContext("2d") as CanvasRenderingContext2D
      d.scale(4, 4)
      d.translate(w / 2, h / 2)
      paint(d)
      return c
    }
    const flyBody = sprite(24, 14, (d) => {
      const g = d.createLinearGradient(0, -4, 0, 4)
      g.addColorStop(0, "#5b5f66")
      g.addColorStop(0.5, "#1d1f24")
      g.addColorStop(1, "#0c0d10")
      d.fillStyle = g
      d.beginPath()
      d.ellipse(-4.5, 0, 6, 3.6, 0, 0, Math.PI * 2)
      d.fill()
      d.beginPath()
      d.ellipse(1.8, 0, 3.6, 3.2, 0, 0, Math.PI * 2)
      d.fill()
      d.fillStyle = "rgba(255,255,255,0.18)"
      for (let k = 0; k < 3; k++) d.fillRect(-8 + k * 2.6, -2.8, 1.1, 5.6)
      d.fillStyle = "#8c1a12"
      for (const side of [-1, 1]) {
        d.beginPath()
        d.ellipse(5.2, side * 1.9, 1.9, 1.7, 0, 0, Math.PI * 2)
        d.fill()
      }
      d.fillStyle = "rgba(255,220,210,0.7)"
      d.fillRect(5.4, -2.6, 0.7, 0.7)
    })
    const flyWing = sprite(20, 10, (d) => {
      const g = d.createLinearGradient(6, 0, -6, 0)
      g.addColorStop(0, "rgba(235,240,255,0.65)")
      g.addColorStop(1, "rgba(190,205,255,0.18)")
      d.fillStyle = g
      d.beginPath()
      d.ellipse(0, 0, 8.5, 3.6, 0, 0, Math.PI * 2)
      d.fill()
      d.strokeStyle = "rgba(40,40,60,0.35)"
      d.lineWidth = 0.35
      d.stroke()
    })
    const flyWrap = sprite(26, 14, (d) => {
      d.fillStyle = "rgba(250,252,255,0.92)"
      d.beginPath()
      d.ellipse(0, 0, 11, 5.5, 0, 0, Math.PI * 2)
      d.fill()
      d.strokeStyle = "rgba(255,255,255,0.9)"
      d.lineWidth = 0.5
      for (let k = 0; k < 6; k++) {
        d.beginPath()
        d.ellipse(0, 0, 11.2, 1.2, k * 0.5, 0, Math.PI * 2)
        d.stroke()
      }
    })
    const cocoonSprite = sprite(16, 22, (d) => {
      const g = d.createRadialGradient(-2, -3, 1, 0, 0, 9)
      g.addColorStop(0, "rgba(255,255,255,0.98)")
      g.addColorStop(1, "rgba(220,228,255,0.75)")
      d.fillStyle = g
      d.beginPath()
      d.ellipse(0, 0, 5.5, 8.5, 0, 0, Math.PI * 2)
      d.fill()
      d.strokeStyle = "rgba(255,255,255,0.8)"
      d.lineWidth = 0.5
      for (let k = -3; k <= 3; k++) {
        d.beginPath()
        d.ellipse(0, k * 2.1, 5.6 - Math.abs(k) * 0.6, 1.2, 0.25, 0, Math.PI * 2)
        d.stroke()
      }
    })

    // upload the sprites now, not on the frame a fly first appears
    ctx.globalAlpha = 0.004
    for (const c of [dew, flyBody, flyWing, flyWrap, cocoonSprite]) {
      ctx.drawImage(c, 0, 0, 2, 2)
      ctx.save()
      ctx.translate(4, 4)
      ctx.rotate(0.7)
      ctx.scale(0.9, 0.9)
      ctx.drawImage(c, 0, 0, 3, 3)
      ctx.restore()
    }
    ctx.globalAlpha = 1

    const drawFly = (time: number) => {
      const f = flyS
      if (!f.on) return
      const caught = f.caught >= 0
      const wrap01 = Math.min(1, f.wrapped / 1.6)
      const ang = caught ? Math.sin(time * 23) * 0.3 * (1 - wrap01) : Math.atan2(f.vy, f.vx)
      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.rotate(ang)
      const s = clamp(S / 220, 0.7, 1.2)
      ctx.scale(s, s)
      // shadow
      ctx.globalAlpha = 0.22
      ctx.drawImage(flyBody, -7, 3, 24, 14)
      ctx.globalAlpha = 1
      // wings: a blur of beats while flying, slow twitches once stuck
      const beat = caught ? Math.sin(time * 18) * 0.25 * (1 - wrap01) : Math.sin(time * 90)
      for (const side of [-1, 1]) {
        ctx.save()
        ctx.rotate(side * (0.5 + beat * 0.35))
        ctx.drawImage(flyWing, -16, side * 4.2 - 5, 20, 10)
        ctx.restore()
      }
      ctx.drawImage(flyBody, -12, -7, 24, 14)
      if (wrap01 > 0) {
        ctx.globalAlpha = wrap01
        ctx.drawImage(flyWrap, -14.5, -7, 26, 14)
        ctx.globalAlpha = 1
      }
      ctx.restore()
    }

    const drawZ = (time: number) => {
      if (sp.sleep < 0.4) return
      const a = (sp.sleep - 0.4) / 0.6
      const base = clamp(S / 220, 0.7, 1.3)
      ctx.fillStyle = "#ffffff"
      ctx.textBaseline = "middle"
      for (let k = 0; k < 3; k++) {
        const ph = ((time * 0.45 + k / 3) % 1)
        const x = headPage.x + S * 0.12 + ph * S * 0.16 + Math.sin(time * 1.4 + k * 2) * 4
        const y = headPage.y - S * 0.12 - ph * S * 0.42
        ctx.globalAlpha = a * Math.sin(ph * Math.PI)
        ctx.font = "italic 700 " + Math.round((14 + ph * 12) * base) + "px ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
        ctx.fillText("z", x, y)
      }
      ctx.globalAlpha = 1
    }

    // ---------------- loop ----------------
    let raf = 0
    let last = 0
    let acc = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const t = now / 1000
      let dt = last ? t - last : 1 / 60
      last = t
      dt = Math.min(dt, 1 / 20)

      anchorScan -= dt
      if (anchorScan <= 0) {
        scanAnchors()
        anchorScan = 1
      }
      const wr = wrap.getBoundingClientRect()
      rects.clear()
      for (const e of anchorEls) {
        const r = e.getBoundingClientRect()
        rects.set(e, new DOMRect(r.left - wr.left, r.top - wr.top, r.width, r.height))
      }

      if (!seeded) {
        seeded = true
        seed(seedWebs)
      }
      updateSpider(dt)
      placeBody()
      updateLegs(dt)
      updateWebs()
      updateFly(dt)

      // fixed 120 Hz silk steps
      acc += dt
      let steps = 0
      while (acc >= 1 / 120 && steps < 4) {
        stepSilk(silk, 1 / 120, sp.t, rects, 4)
        acc -= 1 / 120
        steps++
      }
      if (steps === 4) acc = 0
      for (let k = silk.threads.length - 1; k >= 0; k--) {
        const th = silk.threads[k]
        if (th.state === 2) {
          th.dieT += dt
          th.alpha = Math.max(0, 1 - th.dieT / 0.85)
          if (th.dieT > 0.9) {
            silk.freeThread(th)
            silk.threads.splice(k, 1)
            if (th === dropLine) dropLine = null
          }
        }
      }
      drawSilk(sp.t)

      // spider: shadow rig follows it, render only around it
      const span = S * 1.25
      key.position.set(sp.x - S * 0.9, -sp.y + S * 1.3, S * 3.2)
      key.target.position.set(sp.x, -sp.y, 0)
      const sc = key.shadow.camera as THREE.OrthographicCamera
      sc.left = -span; sc.right = span; sc.top = span; sc.bottom = -span
      sc.near = 1; sc.far = S * 8
      sc.updateProjectionMatrix()
      rim.position.set(sp.x + S, -sp.y - S * 1.5, S)
      rim.target.position.set(sp.x, -sp.y, 0)
      catcher.position.set(sp.x, -sp.y, 0)
      catcher.scale.set(span * 2.4, span * 2.4, 1)
      const blobS = S * (0.42 - sp.pitch * 0.05)
      blob.position.set(sp.x + Math.cos(sp.th) * S * 0.02 + S * 0.02, -sp.y - S * 0.03, 0.2)
      blob.rotation.z = -sp.th
      blob.scale.set(blobS * 1.25, blobS * 0.8, 1)
      ;(blob.material as THREE.MeshBasicMaterial).opacity = 0.75 - sp.z / (S * 0.5)

      if (rig) {
        const pad = S * 0.95
        const x0 = clamp(sp.x - pad, 0, W), x1 = clamp(sp.x + pad, 0, W)
        const y0 = clamp(sp.y - pad, 0, H), y1 = clamp(sp.y + pad, 0, H)
        renderer.setScissorTest(true)
        renderer.setScissor(x0, H - y1, x1 - x0, y1 - y0)
        renderer.render(scene, camera)
      }
    }
    const start = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const vis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", vis)
    start()

    return () => {
      disposed = true
      stop()
      ro.disconnect()
      document.removeEventListener("visibilitychange", vis)
      window.removeEventListener("pointermove", pm)
      window.removeEventListener("pointerdown", pm)
      window.removeEventListener("touchstart", tm)
      window.removeEventListener("touchmove", tm)
      window.removeEventListener("keydown", kd)
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [modelSrc, topTextureSrc, faceTextureSrc, position, maxDpr, bounceColor, shadowColor, seedWebs])

  const layer = { position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", pointerEvents: "none" } as React.CSSProperties
  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={className}
      style={{ position, inset: 0, width: "100%", height: position === "fixed" ? "100svh" : undefined, pointerEvents: "none", zIndex, overflow: "hidden" }}
    >
      <canvas ref={silkRef} style={layer} />
      <canvas ref={glRef} style={layer} />
    </div>
  )
}

// The default spider: "Prismatic Jumping Spider 3D Model Free" by iRahulRajput
// (sketchfab.com/rt699448), CC BY 4.0. Reduced to 7k triangles; its colour is
// baked into the vertices plus a top and a front photo projection.
// Foot tips of the default model in the rig frame (L1-L4, R1-R4): its front
// legs lie side by side and one is raised, so they are given, not searched.
const DEFAULT_TIPS = [0.5, 0.16, 0.03, 0.4, 0.23, 0.11, 0.02, 0.42, 0.04, -0.44, 0.31, 0.01, 0.5, -0.15, 0.03, 0.5, -0.24, 0.02, 0.32, -0.42, 0.02, -0.44, -0.34, 0.01]
const DEFAULT_MODEL = "data:model/gltf-binary;base64,Z2xURgIAAABI2AAAhAkAAEpTT057ImFzc2V0Ijp7ImdlbmVyYXRvciI6ImdsVEYtVHJhbnNmb3JtIHY0LjIuMSIsInZlcnNpb24iOiIyLjAifSwiYWNjZXNzb3JzIjpbeyJ0eXBlIjoiU0NBTEFSIiwiY29tcG9uZW50VHlwZSI6NTEyMywiY291bnQiOjIwODM1LCJub3JtYWxpemVkIjpmYWxzZSwiYnl0ZU9mZnNldCI6MCwiYnVmZmVyVmlldyI6MH0seyJ0eXBlIjoiVkVDNCIsImNvbXBvbmVudFR5cGUiOjUxMjEsImNvdW50IjozNTI3LCJub3JtYWxpemVkIjp0cnVlLCJieXRlT2Zmc2V0IjowLCJidWZmZXJWaWV3IjoxfSx7InR5cGUiOiJWRUMzIiwiY29tcG9uZW50VHlwZSI6NTEyMCwiY291bnQiOjM1MjcsIm5vcm1hbGl6ZWQiOnRydWUsImJ5dGVPZmZzZXQiOjAsImJ1ZmZlclZpZXciOjJ9LHsidHlwZSI6IlZFQzIiLCJjb21wb25lbnRUeXBlIjo1MTIxLCJjb3VudCI6MzUyNywibm9ybWFsaXplZCI6dHJ1ZSwiYnl0ZU9mZnNldCI6MCwiYnVmZmVyVmlldyI6M30seyJ0eXBlIjoiVkVDMyIsImNvbXBvbmVudFR5cGUiOjUxMjIsImNvdW50IjozNTI3LCJtYXgiOlsyNzkwMSwxMjI2MSwzMjc2N10sIm1pbiI6Wy0yNzkwMSwtMTIyNjEsLTMyNzY3XSwibm9ybWFsaXplZCI6dHJ1ZSwiYnl0ZU9mZnNldCI6MCwiYnVmZmVyVmlldyI6NH1dLCJidWZmZXJWaWV3cyI6W3siYnVmZmVyIjoxLCJieXRlT2Zmc2V0IjowLCJieXRlTGVuZ3RoIjo0MTY3MCwidGFyZ2V0IjozNDk2MywiZXh0ZW5zaW9ucyI6eyJFWFRfbWVzaG9wdF9jb21wcmVzc2lvbiI6eyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjg0MTEsIm1vZGUiOiJUUklBTkdMRVMiLCJieXRlU3RyaWRlIjoyLCJjb3VudCI6MjA4MzV9fX0seyJidWZmZXIiOjEsImJ5dGVPZmZzZXQiOjQxNjcyLCJieXRlTGVuZ3RoIjoxNDEwOCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6NCwiZXh0ZW5zaW9ucyI6eyJFWFRfbWVzaG9wdF9jb21wcmVzc2lvbiI6eyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjg0MTIsImJ5dGVMZW5ndGgiOjEzMzUyLCJtb2RlIjoiQVRUUklCVVRFUyIsImJ5dGVTdHJpZGUiOjQsImNvdW50IjozNTI3fX19LHsiYnVmZmVyIjoxLCJieXRlT2Zmc2V0Ijo1NTc4MCwiYnl0ZUxlbmd0aCI6MTQxMDgsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjQsImV4dGVuc2lvbnMiOnsiRVhUX21lc2hvcHRfY29tcHJlc3Npb24iOnsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoyMTc2NCwiYnl0ZUxlbmd0aCI6MTA3ODIsIm1vZGUiOiJBVFRSSUJVVEVTIiwiYnl0ZVN0cmlkZSI6NCwiY291bnQiOjM1Mjd9fX0seyJidWZmZXIiOjEsImJ5dGVPZmZzZXQiOjY5ODg4LCJieXRlTGVuZ3RoIjoxNDEwOCwidGFyZ2V0IjozNDk2MiwiYnl0ZVN0cmlkZSI6NCwiZXh0ZW5zaW9ucyI6eyJFWFRfbWVzaG9wdF9jb21wcmVzc2lvbiI6eyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjMyNTQ4LCJieXRlTGVuZ3RoIjozMDcyLCJtb2RlIjoiQVRUUklCVVRFUyIsImJ5dGVTdHJpZGUiOjQsImNvdW50IjozNTI3fX19LHsiYnVmZmVyIjoxLCJieXRlT2Zmc2V0Ijo4Mzk5NiwiYnl0ZUxlbmd0aCI6MjgyMTYsInRhcmdldCI6MzQ5NjIsImJ5dGVTdHJpZGUiOjgsImV4dGVuc2lvbnMiOnsiRVhUX21lc2hvcHRfY29tcHJlc3Npb24iOnsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjozNTYyMCwiYnl0ZUxlbmd0aCI6MTcyODIsIm1vZGUiOiJBVFRSSUJVVEVTIiwiYnl0ZVN0cmlkZSI6OCwiY291bnQiOjM1Mjd9fX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo1MjkwNH0seyJieXRlTGVuZ3RoIjoxMTIyMTIsImV4dGVu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"
const DEFAULT_TOP = "data:image/webp;base64,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"
const DEFAULT_FACE = "data:image/webp;base64,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"


export { SilkSpiderCursor };
