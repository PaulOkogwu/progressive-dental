// Procedural molar crown for the "Digital Workflow with 3Shape" demo.
// Built entirely in code (no model files). Four states mirror the workflow:
// 0 scan, 1 design, 2 make, 3 deliver.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const IVORY = new THREE.Color('#f3eee4');
const BLUE = new THREE.Color('#3d6ea8');
const LIGHT_BLUE = new THREE.Color('#8db6e0');
const NAVY = new THREE.Color('#1f2a7a');

const A = 1.05; // mesio-distal half width
const B = 0.94; // bucco-lingual half width
const CUSPS: [number, number][] = [[0.46, 0.4], [-0.44, 0.42], [0.47, -0.38], [-0.45, -0.4]];
const WALL_TOP = 0.4;
const V_SIDE = 0.6;

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** Superellipse direction, so the crown reads as a molar, not a cylinder. */
function dir(theta: number): [number, number] {
  const c = Math.cos(theta), s = Math.sin(theta), n = 2.7;
  return [A * Math.sign(c) * Math.abs(c) ** (2 / n), B * Math.sign(s) * Math.abs(s) ** (2 / n)];
}

function wallRadius(t: number) {
  return 0.8 + 0.2 * Math.sin(Math.PI * 0.5 * Math.min(t / 0.55, 1)) - 0.09 * Math.max(0, (t - 0.55) / 0.45) ** 2.2;
}

/** Surface point plus a 0..1 "contact" weight (cusp tips) for the design heat map. */
function surface(u: number, v: number): [number, number, number, number] {
  const theta = u * Math.PI * 2;
  const [dx, dz] = dir(theta);
  if (v <= V_SIDE) {
    const t = v / V_SIDE;
    const r = wallRadius(t);
    // gentle scallop toward the margin, like a real crown's cervical line
    const y = -0.95 + t * (WALL_TOP + 0.95) + 0.05 * Math.cos(theta * 2) * (1 - t);
    return [dx * r, y, dz * r, 0];
  }
  const q = 1 - (v - V_SIDE) / (1 - V_SIDE); // 1 at the rim, 0 at the centre
  const rTop = wallRadius(1);
  const x = dx * rTop * q, z = dz * rTop * q;
  let y = WALL_TOP + 0.17 * Math.max(0, 1 - q * q) ** 0.6;
  let contact = 0;
  const inner = 1 - q ** 6;
  for (const [cx, cz] of CUSPS) {
    const d2 = (x - cx) ** 2 + (z - cz) ** 2;
    const bump = Math.exp(-d2 / 0.14);
    y += 0.2 * bump * inner;
    contact = Math.max(contact, Math.exp(-d2 / 0.025) * inner);
  }
  y -= 0.12 * Math.exp(-(x * x + z * z) / 0.07) * inner; // central fossa
  y -= 0.075 * Math.exp(-(x * x) / 0.004) * (1 - q ** 4); // mesio-distal groove
  y -= 0.06 * Math.exp(-(z * z) / 0.004) * (1 - q ** 4); // bucco-lingual groove
  return [x, y, z, contact];
}

function crownGeometry(segU: number, segV: number, withColor = false) {
  const pos: number[] = [], col: number[] = [], idx: number[] = [];
  const c = new THREE.Color();
  for (let j = 0; j <= segV; j++) {
    for (let i = 0; i <= segU; i++) {
      const [x, y, z, k] = surface((i % segU) / segU, j / segV);
      pos.push(x, y, z);
      if (withColor) {
        c.copy(IVORY).lerp(LIGHT_BLUE, smooth(0.2, 0.6, k) * 0.85).lerp(BLUE, smooth(0.7, 1, k) * 0.6);
        col.push(c.r, c.g, c.b);
      }
    }
  }
  for (let j = 0; j < segV; j++) {
    for (let i = 0; i < segU; i++) {
      const a = j * (segU + 1) + i, b = a + segU + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (withColor) g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g = mergeVertices(g, 1e-4);
  g.computeVertexNormals();
  return g;
}

export interface CrownOptions {
  mode?: 'demo' | 'hero';
  onReady?: () => void;
}

export function mountCrown(host: HTMLElement, opts: CrownOptions = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.localClippingEnabled = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(4.1, 3.1, 5.1);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8db6e0, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xdbe8f7, 0.9); fill.position.set(-4, 2, -2); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.2); rim.position.set(-1, 3, -5); scene.add(rim);

  const group = new THREE.Group();
  group.position.y = 0.1;
  scene.add(group);

  // scan band, injected into the standard shader
  const uniforms = { uScan: { value: -2 }, uScanAmt: { value: 0 } };
  const addScan = (m: THREE.Material) => {
    m.onBeforeCompile = (s) => {
      s.uniforms.uScan = uniforms.uScan; s.uniforms.uScanAmt = uniforms.uScanAmt;
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying float vY;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvY = position.y;');
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vY;\nuniform float uScan;\nuniform float uScanAmt;')
        .replace('#include <dithering_fragment>', `#include <dithering_fragment>
          float band = smoothstep(0.045, 0.0, abs(vY - uScan));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.24, 0.43, 0.66), band * uScanAmt);`);
    };
  };

  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10);
  const geo = crownGeometry(180, 130, true);
  const solidMat = new THREE.MeshPhysicalMaterial({
    color: IVORY, roughness: 0.34, clearcoat: 0.75, clearcoatRoughness: 0.2, sheen: 0.3, sheenColor: new THREE.Color('#fff8ec'),
    side: THREE.DoubleSide, clippingPlanes: [clip], transparent: true,
  });
  addScan(solidMat);
  const heatMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, side: THREE.DoubleSide });
  addScan(heatMat);
  const solid = new THREE.Mesh(geo, solidMat);
  group.add(solid);

  // CAD-style grid: only the u and v isolines, no triangle diagonals
  const wv: number[] = [];
  const U = 40, V = 22, STEPS = 64;
  for (let i = 0; i < U; i++) for (let j = 0; j < STEPS; j++) {
    const a = surface(i / U, j / STEPS), b = surface(i / U, (j + 1) / STEPS);
    wv.push(a[0], a[1], a[2], b[0], b[1], b[2]);
  }
  for (let j = 1; j < V; j++) for (let i = 0; i < STEPS * 2; i++) {
    const a = surface(i / (STEPS * 2), j / V), b = surface((i + 1) / (STEPS * 2), j / V);
    wv.push(a[0], a[1], a[2], b[0], b[1], b[2]);
  }
  const wireGeo = new THREE.BufferGeometry();
  wireGeo.setAttribute('position', new THREE.Float32BufferAttribute(wv, 3));
  const wireMat = new THREE.LineBasicMaterial({ color: NAVY, transparent: true, opacity: 0 });
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  wire.scale.setScalar(1.004);
  group.add(wire);

  // point cloud for the scan step
  const pts = crownGeometry(110, 80).getAttribute('position');
  const ptsGeo = new THREE.BufferGeometry(); ptsGeo.setAttribute('position', pts);
  const ptsMat = new THREE.PointsMaterial({ color: NAVY, size: 0.022, transparent: true, opacity: 0, depthWrite: false });
  const cloud = new THREE.Points(ptsGeo, ptsMat);
  group.add(cloud);

  // margin line
  const ring: THREE.Vector3[] = [];
  for (let i = 0; i < 128; i++) { const [x, y, z] = surface(i / 128, 0); ring.push(new THREE.Vector3(x * 1.012, y, z * 1.012)); }
  const marginMat = new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0 });
  const margin = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ring, true), 256, 0.009, 8, true), marginMat);
  group.add(margin);

  // milling block for the make step
  const blockGeo = new THREE.BoxGeometry(2.5, 1.95, 2.3);
  blockGeo.translate(0, -0.12, 0);
  const blockMat = new THREE.MeshPhysicalMaterial({ color: '#dfecf8', roughness: 0.6, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, clippingPlanes: [] });
  const block = new THREE.Mesh(blockGeo, blockMat);
  const blockEdges = new THREE.LineSegments(new THREE.EdgesGeometry(blockGeo), new THREE.LineBasicMaterial({ color: NAVY, transparent: true, opacity: 0 }));
  group.add(block, blockEdges);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false; // page scroll stays page scroll; zoom has its own buttons
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.target.set(0, 0, 0);
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = opts.mode === 'hero' ? 0.9 : 0.7;
  let dist = camera.position.length();
  const baseDist = dist;
  controls.addEventListener('start', () => { controls.autoRotate = false; host.classList.add('touched'); });

  let step = opts.mode === 'hero' ? 1 : 0;
  let stepStart = performance.now();
  const target = { solid: 1, wire: 0, pts: 0, margin: 0, block: 0, heat: 0 };
  const cur = { ...target };

  function setStep(n: number) {
    step = n; stepStart = performance.now();
    Object.assign(target, [
      { solid: 1, wire: 0, pts: 0.85, margin: 0, block: 0, heat: 0 },
      { solid: 1, wire: 0.3, pts: 0, margin: 1, block: 0, heat: 1 },
      { solid: 1, wire: 0, pts: 0, margin: 0, block: 0.55, heat: 0 },
      { solid: 1, wire: 0, pts: 0, margin: 0, block: 0, heat: 0 },
    ][n]);
    if (n === 3 && !reduce) controls.autoRotate = true;
  }
  setStep(step);

  function zoom(dir: 1 | -1) { dist = THREE.MathUtils.clamp(dist * (dir > 0 ? 0.85 : 1.18), baseDist * 0.55, baseDist * 1.5); }
  function reset() { dist = baseDist; camera.position.set(4.1, 3.1, 5.1); controls.autoRotate = !reduce; }

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the crown framed on tall phone canvases
    camera.fov = w / h < 0.9 ? 38 : 30;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(host); resize();

  let visible = true, raf = 0, last = performance.now();
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) loop(); });
  io.observe(host);

  function loop() {
    raf = 0;
    if (!visible) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const k = 1 - Math.exp(-dt * 6);
    for (const key of Object.keys(target) as (keyof typeof target)[]) cur[key] += (target[key] - cur[key]) * k;
    const t = (now - stepStart) / 1000;

    // per-step choreography
    let clipY = 10, scanAmt = 0, scanY = -2;
    if (step === 0) {
      const p = reduce ? 1 : (t % 3.6) / 3.0; // sweep bottom to top, hold, repeat
      scanY = -1 + Math.min(p, 1) * 1.9; scanAmt = 1; clipY = scanY;
    } else if (step === 1) {
      scanY = reduce ? -2 : -1 + ((t * 0.35) % 1.4) * 1.5; scanAmt = 0.55;
    } else if (step === 2) {
      const p = reduce ? 1 : Math.min(1, t / 2.6);
      // the crown is already inside the blank; the block is milled away around it
      blockMat.opacity = cur.block * (1 - p * 0.75);
      (blockEdges.material as THREE.LineBasicMaterial).opacity = cur.block * 0.9 * (1 - p * 0.6);
    }
    if (step !== 2) { blockMat.opacity = cur.block; (blockEdges.material as THREE.LineBasicMaterial).opacity = cur.block; }
    clip.constant = clipY;
    uniforms.uScan.value = scanY; uniforms.uScanAmt.value = scanAmt;
    solid.material = cur.heat > 0.5 ? heatMat : solidMat;
    solidMat.opacity = cur.solid;
    wireMat.opacity = cur.wire;
    ptsMat.opacity = cur.pts;
    marginMat.opacity = cur.margin;
    block.visible = blockEdges.visible = cur.block > 0.01;
    cloud.visible = cur.pts > 0.01;

    camera.position.setLength(camera.position.length() + (dist - camera.position.length()) * k);
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }
  loop();
  host.classList.add('ready');
  opts.onReady?.();

  return { setStep, zoom, reset };
}
