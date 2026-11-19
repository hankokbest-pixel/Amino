// 3D-сцена: процедурный архитектурный макет дома.
// Одна сцена умеет быть чертежом (линии сверху), белым макетом, домом на закате и ночью.
import * as THREE from 'three';

const C = (hex) => new THREE.Color(hex);

// ---------- Материалы ----------
function makeMaterials() {
  return {
    clay: new THREE.MeshStandardMaterial({ color: 0xf4f1ec, roughness: 0.85 }),
    stone: new THREE.MeshStandardMaterial({ color: 0xb7b0a6, roughness: 1 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2a2b2d, roughness: 0.6, metalness: 0.2 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x9a7552, roughness: 0.8 }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x9fb3bf, roughness: 0.05, metalness: 0.3,
      transparent: true, opacity: 0.38,
      emissive: C(0xffb36a), emissiveIntensity: 0,
    }),
    water: new THREE.MeshStandardMaterial({
      color: 0x6fb0c4, roughness: 0.08, metalness: 0.35,
      emissive: C(0x2fb6c9), emissiveIntensity: 0,
    }),
    glow: new THREE.MeshBasicMaterial({ color: 0xffc98c, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    tree: new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.95 }),
  };
}

// ---------- Варианты домов (данные) ----------
// box: [w,h,d, x,y,z, material]; gable: span, wall, ridge, length, x,y,z, rotY, material
export const VARIANTS = {
  // Дом с консолью и бассейном — главный герой первого экрана
  cantilever: [
    { t: 'box', a: [28, 0.4, 18, 0, 0.2, 0], m: 'clay' },
    { t: 'box', a: [6, 3, 7, -8.5, 1.9, 0], m: 'clay' },
    { t: 'box', a: [10, 3, 7, -0.5, 1.9, 0], m: 'glass' },
    { t: 'glow', a: [9.6, 2.6, -0.5, 1.9, -3.2, 0] },
    { t: 'box', a: [19, 0.3, 8.6, 2.5, 3.45, -0.5], m: 'dark' },
    { t: 'box', a: [18, 3.1, 8, 3, 5.15, -0.5], m: 'clay' },
    { t: 'box', a: [15, 1.3, 0.12, 4, 5.2, 3.52], m: 'glass' },
    { t: 'glow', a: [14.6, 1.1, 4, 5.2, 3.3, 0] },
    { t: 'box', a: [18.4, 0.25, 8.4, 3, 6.82, -0.5], m: 'clay' },
    { t: 'box', a: [0.8, 7, 15, -12.2, 3.7, -1], m: 'stone' },
    { t: 'box', a: [0.22, 3, 0.22, 11.4, 1.9, 3], m: 'dark' },
    { t: 'box', a: [0.22, 3, 0.22, 11.4, 1.9, -4], m: 'dark' },
    { t: 'box', a: [13, 0.06, 4.6, 3, 0.43, 6.6], m: 'water' },
    { t: 'box', a: [5, 0.12, 2.2, -6, 0.46, 5.6], m: 'wood' },
    { t: 'tree', a: [-17, 8, 1.2] }, { t: 'tree', a: [16, -8, 1.5] },
    { t: 'tree', a: [18, 4, 1] }, { t: 'tree', a: [-18, -9, 1.4] }, { t: 'tree', a: [-15, 12, 0.9] },
  ],
  // Длинный павильон с перголой
  pavilion: [
    { t: 'box', a: [32, 0.4, 16, 0, 0.2, 0], m: 'clay' },
    { t: 'box', a: [22, 3, 6, -1, 1.9, 0], m: 'glass' },
    { t: 'glow', a: [21.5, 2.6, -1, 1.9, -2.7, 0] },
    { t: 'box', a: [4, 3, 6, -14, 1.9, 0], m: 'stone' },
    { t: 'box', a: [26, 0.35, 10, -3, 3.58, 0], m: 'clay' },
    ...Array.from({ length: 7 }, (_, i) => ({ t: 'box', a: [0.16, 3, 0.16, -14 + i * 3.6, 1.9, 4.6], m: 'dark' })),
    ...Array.from({ length: 10 }, (_, i) => ({ t: 'box', a: [0.16, 0.24, 8, 10.4 + i * 0.6, 3.55, 0], m: 'wood' })),
    { t: 'box', a: [0.2, 3.3, 0.2, 15.6, 1.85, 3.8], m: 'dark' },
    { t: 'box', a: [0.2, 3.3, 0.2, 15.6, 1.85, -3.8], m: 'dark' },
    { t: 'box', a: [22, 0.06, 4, -1, 0.43, 6.4], m: 'water' },
    { t: 'tree', a: [-19, 6, 1.3] }, { t: 'tree', a: [19, -6, 1.1] }, { t: 'tree', a: [20, 6, 1.4] },
  ],
  // Дом-амбар с двускатными крышами
  barn: [
    { t: 'box', a: [30, 0.4, 20, 0, 0.2, 0], m: 'clay' },
    { t: 'gable', a: [7, 3.4, 6.6, 16, -3, 0.4, -2, 0], m: 'dark' },
    { t: 'gable', a: [6, 3, 5.6, 9, 8, 0.4, 3, Math.PI / 2], m: 'clay' },
    { t: 'box', a: [0.1, 3, 5.6, 5.02, 1.9, -2], m: 'glass' },
    { t: 'glow', a: [5.4, 2.8, 4.8, 1.9, -2, Math.PI / 2] },
    { t: 'box', a: [8, 0.12, 4, -3, 0.46, 7], m: 'wood' },
    { t: 'tree', a: [16, 8, 1.3] }, { t: 'tree', a: [14, -9, 1.2] }, { t: 'tree', a: [-16, -8, 1.1] },
  ],
  // Ступенчатый дом из трёх смещённых объёмов
  stacked: [
    { t: 'box', a: [28, 0.4, 20, 0, 0.2, 0], m: 'clay' },
    { t: 'box', a: [11, 3.2, 10, 0, 2, 0], m: 'stone' },
    { t: 'box', a: [15, 3.2, 8, 3, 5.2, -1], m: 'clay' },
    { t: 'box', a: [12, 1.4, 0.12, 4, 5.2, 3.02], m: 'glass' },
    { t: 'glow', a: [11.6, 1.2, 4, 5.2, 2.8, 0] },
    { t: 'box', a: [9, 3.2, 8, -2, 8.4, 0.5], m: 'glass' },
    { t: 'glow', a: [8.6, 2.8, -2, 8.4, -3.2, 0] },
    { t: 'box', a: [9.4, 0.25, 8.4, -2, 10.12, 0.5], m: 'clay' },
    { t: 'box', a: [10, 0.06, 4, 2, 0.43, 7.4], m: 'water' },
    { t: 'tree', a: [-16, -8, 1.5] }, { t: 'tree', a: [15, -7, 1.3] }, { t: 'tree', a: [17, 7, 1] },
  ],
};

function gableGeometry(span, wall, ridge, length) {
  const s = new THREE.Shape();
  s.moveTo(-span / 2, 0); s.lineTo(span / 2, 0); s.lineTo(span / 2, wall);
  s.lineTo(0, ridge); s.lineTo(-span / 2, wall); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: length, bevelEnabled: false });
  g.translate(0, 0, -length / 2);
  g.rotateY(Math.PI / 2); // длина вдоль оси X
  return g;
}

function buildHouse(variant, mats, lineMat) {
  const group = new THREE.Group();
  const meshes = [];
  const glows = [];
  for (const p of VARIANTS[variant]) {
    if (p.skip) continue;
    if (p.t === 'box') {
      const [w, h, d, x, y, z] = p.a;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats[p.m]);
      mesh.position.set(x, y, z);
      mesh.castShadow = p.m !== 'glass' && p.m !== 'water';
      mesh.receiveShadow = true;
      group.add(mesh); meshes.push(mesh);
    } else if (p.t === 'gable') {
      const [span, wall, ridge, length, x, y, z, rot] = p.a;
      const mesh = new THREE.Mesh(gableGeometry(span, wall, ridge, length), mats[p.m]);
      mesh.position.set(x, y, z); mesh.rotation.y = rot;
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh); meshes.push(mesh);
    } else if (p.t === 'glow') {
      const [w, h, x, y, z, rot] = p.a;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mats.glow);
      mesh.position.set(x, y, z); mesh.rotation.y = rot;
      group.add(mesh); glows.push(mesh);
    } else if (p.t === 'tree') {
      const [x, z, s] = p.a;
      const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5 * s, 28, 18), mats.tree);
      crown.position.set(x, 4.2 * s, z); crown.castShadow = crown.receiveShadow = true;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.09 * s, 3 * s, 8), mats.dark);
      trunk.position.set(x, 1.5 * s, z); trunk.castShadow = true;
      group.add(crown, trunk); meshes.push(crown, trunk);
      crown.userData.noEdges = trunk.userData.noEdges = true;
    }
  }
  // Линии-рёбра: в режиме чертежа видны только они
  const lines = new THREE.Group();
  for (const m of meshes) {
    if (m.userData.noEdges) continue;
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 20), lineMat);
    e.position.copy(m.position); e.rotation.copy(m.rotation);
    lines.add(e);
  }
  group.add(lines);
  return { group, meshes, glows };
}

// ---------- Сцена ----------
export function createScene(canvas, { variant = 'cantilever', pixelRatio = 1.75 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const bg = C(0x0e1726);
  scene.fog = new THREE.Fog(bg, 70, 190);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.5, 500);

  const mats = makeMaterials();
  const lineMat = new THREE.LineBasicMaterial({ color: 0xa9c4ff, transparent: true, opacity: 1 });
  const house = buildHouse(variant, mats, lineMat);
  scene.add(house.group);

  // Тёплый свет из окон, включается ночью
  const lamps = house.glows.map((g) => {
    const l = new THREE.PointLight(0xffb36b, 0, 16, 1.6);
    const n = new THREE.Vector3(0, 0, 1).applyEuler(g.rotation);
    l.position.copy(g.position).addScaledVector(n, 3.2);
    scene.add(l);
    return l;
  });

  // Земля и сетка чертежа
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xcfcbc3, roughness: 1, transparent: true, opacity: 0 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), groundMat);
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  scene.add(ground);
  const grid = new THREE.GridHelper(120, 60, 0x6f8fd1, 0x2c3f66);
  grid.material.transparent = true; grid.position.y = 0.01;
  scene.add(grid);

  // Свет
  const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x7a6f62, 0.9);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 150 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);

  // Состояние, которое анимирует прокрутка (target), и сглаженное (cur)
  const target = {
    cx: -12, cy: 64, cz: 4.01, tx: -12, ty: 0, tz: 4, fov: 35,
    lines: 1, solid: 0, sunAz: 140, sunEl: 60, warm: 0, night: 0,
    bg: [0.055, 0.09, 0.15], sky: [0.03, 0.05, 0.1],
  };
  const cur = JSON.parse(JSON.stringify(target));
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  const warmSun = C(0xff9a52), whiteSun = C(0xfff6ea), moon = C(0x8fa8ff);
  const tmp = new THREE.Color();

  function apply(s) {
    // фон и туман
    bg.setRGB(s.bg[0], s.bg[1], s.bg[2], THREE.SRGBColorSpace);
    scene.fog.color.copy(bg);
    // камера + лёгкий параллакс от курсора
    const px = pointer.sx * 2.2 * s.solid, py = pointer.sy * 1.2 * s.solid;
    // на узких экранах камера шире и чертёж по центру
    const narrow = camera.aspect < 1;
    const shift = narrow ? 12 * (1 - s.solid) : 0;
    const fovK = narrow ? Math.min(1.85, 0.85 / camera.aspect) : 1;
    camera.position.set(s.cx + px + shift, s.cy + py, s.cz);
    camera.fov = s.fov * fovK; camera.updateProjectionMatrix();
    camera.lookAt(s.tx + shift, s.ty, s.tz);
    // линии и объёмы
    lineMat.opacity = s.lines;
    lineMat.color.lerpColors(C(0xa9c4ff), C(0x46484c), s.solid);
    lineMat.visible = s.lines > 0.01;
    for (const m of house.meshes) {
      const mm = m.material;
      mm.transparent = true;
      const base = mm === mats.glass ? 0.38 : 1;
      mm.opacity = base * s.solid;
      mm.depthWrite = s.solid > 0.6 && mm !== mats.glass;
      m.visible = s.solid > 0.01;
    }
    groundMat.opacity = s.solid;
    ground.visible = s.solid > 0.01;
    grid.material.opacity = (1 - s.solid) * 0.55;
    grid.visible = s.solid < 0.99;
    // солнце
    const az = THREE.MathUtils.degToRad(s.sunAz), el = THREE.MathUtils.degToRad(s.sunEl), R = 60;
    sun.position.set(Math.cos(el) * Math.sin(az) * R, Math.sin(el) * R, Math.cos(el) * Math.cos(az) * R);
    tmp.lerpColors(whiteSun, warmSun, s.warm).lerp(moon, s.night);
    sun.color.copy(tmp);
    sun.intensity = (3.4 - s.night * 2.6) * s.solid + 0.2;
    hemi.intensity = 1.35 - s.night * 0.95;
    hemi.color.lerpColors(C(0xdfe8ff), C(0x2b3a66), s.night);
    groundMat.color.lerpColors(C(0xcfcbc3), C(0x55524d), s.night * 0.7);
    // ночь: свет в окнах и подсветка бассейна
    mats.glow.opacity = s.night * s.solid;
    mats.glass.emissiveIntensity = s.night * 0.7;
    mats.water.emissiveIntensity = s.night * 0.6;
    for (const l of lamps) l.intensity = s.night * s.solid * 14;
    renderer.toneMappingExposure = 1.25;
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function frame(smooth = 0.08) {
    for (const k in target) {
      if (Array.isArray(target[k])) target[k].forEach((v, i) => { cur[k][i] += (v - cur[k][i]) * smooth; });
      else cur[k] += (target[k] - cur[k]) * smooth;
    }
    pointer.sx += (pointer.x - pointer.sx) * 0.05;
    pointer.sy += (pointer.y - pointer.sy) * 0.05;
    apply(cur);
    renderer.render(scene, camera);
  }

  resize();
  return {
    target, cur, pointer, resize, frame,
    // мгновенно применить состояние (для статичных рендеров)
    snap(state) { Object.assign(target, state); Object.assign(cur, JSON.parse(JSON.stringify(target))); frame(1); },
    renderer,
  };
}

// Ключевые кадры истории на первом экране
export const STAGES = [
  // 0 — чертёж: камера смотрит сверху, видны только линии
  { cx: -12, cy: 64, cz: 4.01, tx: -12, ty: 0, tz: 4, fov: 35, lines: 1, solid: 0, sunAz: 140, sunEl: 62, warm: 0, night: 0, bg: [0.055, 0.09, 0.15], sky: [0.03, 0.05, 0.1] },
  // 1 — белый макет при дневном свете
  { cx: -34, cy: 24, cz: 38, tx: 0, ty: 2.5, tz: 0, fov: 32, lines: 0.35, solid: 1, sunAz: 150, sunEl: 55, warm: 0, night: 0, bg: [0.86, 0.85, 0.82], sky: [0.95, 0.95, 0.94] },
  // 2 — закат: тёплое низкое солнце и длинные тени
  { cx: 30, cy: 8, cz: 30, tx: 1, ty: 3.2, tz: 0, fov: 34, lines: 0, solid: 1, sunAz: 255, sunEl: 9, warm: 1, night: 0, bg: [0.96, 0.69, 0.47], sky: [0.33, 0.42, 0.6] },
  // 3 — вечер: в окнах свет, светится бассейн
  { cx: 16, cy: 4.5, cz: 33, tx: 0.5, ty: 3.6, tz: 0, fov: 36, lines: 0, solid: 1, sunAz: 280, sunEl: 14, warm: 0.4, night: 1, bg: [0.09, 0.11, 0.19], sky: [0.01, 0.015, 0.04] },
];
