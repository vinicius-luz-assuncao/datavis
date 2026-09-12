import * as THREE from 'three';
import { CONFIG } from './config.js';
import { createRoom, computeBounds, addLights, stripLights, normalizeModelLights } from './scene.js';
import { createBall, wrapBall, kickBall, stepBall } from './ball.js';
import { wrapTenis, collideBallTenis } from './tenis.js';
import { collectColliders } from './colliders.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
function thud() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    thud.ctx = thud.ctx || new Ctx();
    const ctx = thud.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    g.gain.setValueAtTime(0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.15);
  } catch (e) {}
}
function spawnBall(ball, bounds, keepPos) {
  if (keepPos) {
    ball.mesh.position.y = (ball.physR ?? CONFIG.ball.radius);
  } else {
    ball.mesh.position.set(bounds.corner.x + 0.3, (ball.physR ?? CONFIG.ball.radius), bounds.corner.z + 2.2);
  }
  const t = CONFIG.returnHome.target;
  const dx = t[0] - ball.mesh.position.x, dz = t[1] - ball.mesh.position.z;
  const d = Math.hypot(dx, dz) || 1;
  const sp = keepPos ? 1.4 : 1.9;
  ball.vel.set(dx / d * sp, 0, dz / d * sp);
  ball.state = 'rolling';
  ball.sleeping = false;
  ball.rollingTime = -0.6;
}
export function initQuarto(container, opts = {}) {
  const section = container.closest('.quarto-section') || container;
  // Fundo transparente: a página (papel) aparece atrás da cena.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  // Sem scene.background: o canvas é transparente (fundo infinito).
  const bounds = computeBounds();
  bounds.maxX = Math.min(bounds.maxX, 1.4);
  bounds.maxZ = Math.min(bounds.maxZ, 1.4);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, 1, 0.1, 100);
  camera.position.fromArray(opts.cameraPos || CONFIG.camera.pos);
  camera.lookAt(...(opts.cameraLook || CONFIG.camera.look));
  // Quaternion-base do parallax de mouse; atualizado se o GLB trouxer câmera.
  let baseQuat = camera.quaternion.clone();
  const par = { x: 0, y: 0, tx: 0, ty: 0 };
  const _eul = new THREE.Euler(), _q = new THREE.Quaternion();
  if (!reduced) {
    section.addEventListener('pointermove', e => {
      if (grab.active) return;
      const r = container.getBoundingClientRect();
      par.tx = (((e.clientX - r.left) / r.width) * 2 - 1);
      par.ty = (((e.clientY - r.top) / r.height) * 2 - 1);
    });
    section.addEventListener('pointerleave', () => { par.tx = 0; par.ty = 0; });
  }
  const quarto = { scene, camera, ball: null, tenis: null, bounds, ready: false, usingModel: false, colliders: null };
  let stage = null;
  function setStage(g) {
    if (stage) scene.remove(stage);
    stage = g;
    if (g) scene.add(g);
  }
  function start(ball, tenis, keepPos) {
    quarto.ball = ball;
    quarto.tenis = tenis;
    quarto.spawnKeepPos = !!keepPos;
    spawnBall(ball, bounds, !!keepPos);
    quarto.ready = true;
  }
  function setupProcedural() {
    const g = new THREE.Group();
    g.name = 'stage-procedural';
    createRoom(g);
    const ball = createBall(g);
    setStage(g);
    quarto.usingModel = false;
    start(ball, null, false);
  }
  const modelURL = opts.modelURL || CONFIG.model;
  if (modelURL) {
    new GLTFLoader().load(modelURL, gltf => {
      gltf.scene.name = 'stage-glb';
      if (CONFIG.useModelLights) {
        const n = normalizeModelLights(gltf.scene, CONFIG.modelLightDiv);
        if (n) console.info(`[quarto] ${n} luz(es) do modelo normalizadas`);
        gltf.scene.traverse(o => {
          if (o.isDirectionalLight && !o.castShadow) {
            o.castShadow = true;
            o.shadow.mapSize.set(1024, 1024);
            o.shadow.camera.left = -7; o.shadow.camera.right = 7;
            o.shadow.camera.top = 7; o.shadow.camera.bottom = -7;
          }
        });
      } else {
        const n = stripLights(gltf.scene);
        if (n) console.info(`[quarto] ${n} luz(es) do GLB ignoradas, usando rig próprio`);
        addLights(scene);
      }
      gltf.scene.traverse(o => { if (o.isMesh) o.receiveShadow = true; });
      console.info('[quarto] nós do GLB:', gltf.scene.children.map(o => o.name || o.type));
      const roles = CONFIG.roles || {};
      const _wp = new THREE.Vector3();
      function findTenisRoot() {
        const hv = CONFIG.tenis.home;
        const cands = [];
        gltf.scene.children.forEach(ch => {
          if (ch.name === roles.ball) return;
          let hasMesh = false;
          ch.traverse(o => { if (o.isMesh) hasMesh = true; });
          if (!hasMesh) return;
          ch.getWorldPosition(_wp);
          const d = Math.hypot(_wp.x - hv[0], _wp.z - hv[2]);
          if (d < 1.2) cands.push({ ch, d });
        });
        cands.sort((a, b) => a.d - b.d);
        return cands.length ? cands[0].ch : null;
      }
      let ballMesh = roles.ball && gltf.scene.getObjectByName(roles.ball);
      let tg = roles.tenis && gltf.scene.getObjectByName(roles.tenis);
      let tgHow = tg ? 'nome' : null;
      if (!tg) { tg = findTenisRoot(); if (tg) tgHow = 'posição'; }
      if (!tg) {
        const shoe = gltf.scene.getObjectByName('Stylized Corinthians sneakers.001');
        if (shoe && shoe.parent && shoe.parent.parent) { tg = shoe.parent.parent; tgHow = 'legado'; }
      }
      console.info('[quarto] tenis:', tg ? `${tg.name} via ${tgHow}` : 'NÃO ACHADO; raiz=' + gltf.scene.children.map(o => o.name || o.type).join(','));
      let ball, tenis, keepPos = false;
      if (ballMesh) { ballMesh.castShadow = true; ball = wrapBall(ballMesh); keepPos = true; }
      else ball = createBall(gltf.scene);
      if (tg) { tg.traverse(o => { if (o.isMesh) o.castShadow = true; }); tenis = wrapTenis(tg); }
      else tenis = null;
      setStage(gltf.scene);
      // Colisores modelados no Blender (Collider_*, tabela, aro, rede).
      quarto.colliders = collectColliders(gltf.scene);
      // Adota a câmera embutida no GLB (cópia exata: posição, rotação e fov
      // em graus). O aspect segue dinâmico do container (resize).
      const glbCam =
        gltf.scene.getObjectByProperty('isCamera', true) ||
        (gltf.cameras && gltf.cameras[0]) || null;
      if (glbCam) {
        glbCam.updateWorldMatrix(true, false);
        glbCam.matrixWorld.decompose(camera.position, camera.quaternion, new THREE.Vector3());
        if (glbCam.fov) camera.fov = glbCam.fov;
        camera.updateProjectionMatrix();
        baseQuat.copy(camera.quaternion);
        console.info('[quarto] câmera do GLB adotada:', glbCam.name || '(sem nome)', 'fov=' + camera.fov.toFixed(2));
      } else {
        console.info('[quarto] GLB sem câmera; mantida a câmera do código');
      }
      quarto.usingModel = true;
      start(ball, tenis, keepPos);
    }, undefined, err => {
      console.warn('[quarto] falha ao carregar GLB, usando cena procedural:', err);
      setupProcedural();
    });
  } else setupProcedural();
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  const setPtr = e => {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const dragPlane = new THREE.Plane();
  const _camDir = new THREE.Vector3();
  const dragHit = new THREE.Vector3();
  const _axis = new THREE.Vector3();
  const grab = { active: false, moved: false, t0: 0, x0: 0, y0: 0, wasIdle: false, sleep0: false, vel0: new THREE.Vector3(), trail: [] };
  function clampToRoom(x, z) {
    x = THREE.MathUtils.clamp(x, bounds.minX, bounds.maxX);
    z = THREE.MathUtils.clamp(z, bounds.minZ, bounds.maxZ);
    const dg = CONFIG.wallDiag;
    const s = x + z - dg.c;
    if (s > 0) { x -= Math.SQRT1_2 * s; z -= Math.SQRT1_2 * s; }
    return [x, z];
  }
  function pushOutTenis(p, ball) {
    const tn = quarto.tenis;
    if (!tn) return;
    const tp = tn.group.position;
    const dx = p.x - tp.x, dz = p.z - tp.z;
    const dist = Math.hypot(dx, dz);
    const minD = (ball.physR ?? CONFIG.ball.radius) + (tn.radius || 0.5) * (CONFIG.tenis.contact ?? 1);
    if (dist < minD && dist > 0.0001) { p.x = tp.x + dx / dist * minD; p.z = tp.z + dz / dist * minD; }
  }
  function ballHit(e) {
    const ball = quarto.ball;
    if (!ball) return null;
    setPtr(e);
    ray.setFromCamera(ptr, camera);
    return ray.intersectObject(ball.mesh, true).length ? ball : null;
  }
  renderer.domElement.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const ball = ballHit(e);
    if (!ball) return;
    grab.active = true; grab.moved = false;
    grab.t0 = performance.now(); grab.x0 = e.clientX; grab.y0 = e.clientY;
    grab.wasIdle = ball.sleeping || ball.state === 'idle';
    grab.sleep0 = ball.sleeping;
    grab.vel0.copy(ball.vel);
    grab.trail.length = 0;
    ball.held = true; ball.sleeping = true;
    ball.vel.set(0, 0, 0);
    camera.getWorldDirection(_camDir);
    dragPlane.setFromNormalAndCoplanarPoint(_camDir, ball.mesh.position);
    try { renderer.domElement.setPointerCapture(e.pointerId); } catch (err) {}
    section.classList.add('ball-held');
  });
  renderer.domElement.addEventListener('pointermove', e => {
    const ball = quarto.ball;
    if (grab.active && ball && ball.held) {
      setPtr(e);
      ray.setFromCamera(ptr, camera);
      if (ray.ray.intersectPlane(dragPlane, dragHit)) {
        const [cx, cz] = clampToRoom(dragHit.x, dragHit.z);
        const cy = THREE.MathUtils.clamp(dragHit.y, (ball.physR ?? CONFIG.ball.radius), 3.2);
        const p = ball.mesh.position;
        const dx = cx - p.x, dz = cz - p.z;
        if (Math.hypot(e.clientX - grab.x0, e.clientY - grab.y0) > 6) grab.moved = true;
        p.x = cx; p.z = cz; p.y = cy;
        if (p.y < 0.7) pushOutTenis(p, ball);
        const hs = Math.hypot(dx, dz);
        if (hs > 0.0005) {
          _axis.set(dz, 0, -dx).normalize();
          ball.mesh.rotateOnWorldAxis(_axis, Math.min(hs / (ball.physR ?? CONFIG.ball.radius), 0.5));
        }
        const now = performance.now();
        grab.trail.push({ x: p.x, y: p.y, z: p.z, t: now });
        while (grab.trail.length > 6) grab.trail.shift();
      }
      return;
    }
    if (!ball) return;
    setPtr(e);
    ray.setFromCamera(ptr, camera);
    section.classList.toggle('ball-hover',
      ray.intersectObject(ball.mesh, true).length > 0 && (ball.sleeping || ball.state === 'idle'));
  });
  function endGrab() {
    const ball = quarto.ball;
    if (!grab.active) return;
    grab.active = false;
    if (!ball) return;
    ball.held = false;
    section.classList.remove('ball-held');
    const quick = performance.now() - grab.t0 < 250;
    if (!grab.moved && quick && !grab.wasIdle) {
      ball.vel.copy(grab.vel0);
      ball.sleeping = grab.sleep0;
      return;
    }
    if (!grab.moved && quick && grab.wasIdle) {
      ball.sleeping = true;
      if (kickBall(ball, reduced)) { thud(); return; }
    }
    const tr = grab.trail;
    if (grab.moved && tr.length >= 2) {
      const a = tr[0], b = tr[tr.length - 1];
      const dt = Math.max((b.t - a.t) / 1000, 0.016);
      ball.vel.set(
        THREE.MathUtils.clamp((b.x - a.x) / dt, -CONFIG.ball.maxSpeed, CONFIG.ball.maxSpeed),
        THREE.MathUtils.clamp((b.y - a.y) / dt, -CONFIG.ball.maxSpeed, CONFIG.ball.maxSpeed),
        THREE.MathUtils.clamp((b.z - a.z) / dt, -CONFIG.ball.maxSpeed, CONFIG.ball.maxSpeed)
      );
      const sp = ball.vel.length();
      if (sp > CONFIG.ball.maxSpeed) ball.vel.multiplyScalar(CONFIG.ball.maxSpeed / sp);
      thud();
    } else {
      ball.vel.set(0, 0, 0);
    }
    ball.sleeping = false;
    ball.state = 'rolling';
    ball.rollingTime = 0;
    ball.squash = 0;
  }
  renderer.domElement.addEventListener('pointerup', endGrab);
  renderer.domElement.addEventListener('pointercancel', endGrab);
  function resize() {
    const w = container.clientWidth || 800, h = container.clientHeight || 500;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();
  let last = performance.now();
  renderer.setAnimationLoop(now => {
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;
    if (quarto.ball) {
      stepBall(quarto.ball, bounds, dt, thud, quarto.colliders);
      if (quarto.tenis) {
        collideBallTenis(quarto.ball, quarto.tenis, dt, thud);
        quarto.tenis.update(dt, bounds);
      }
    }
    if (!reduced && !grab.active) {
      const k = Math.min(1, dt * 3);
      par.x += (par.tx - par.x) * k;
      par.y += (par.ty - par.y) * k;
      _eul.set(-par.y * 0.035, -par.x * 0.05, 0);
      _q.setFromEuler(_eul);
      camera.quaternion.copy(baseQuat).multiply(_q);
    }
    renderer.render(scene, camera);
  });
  return quarto;
}
const container = document.getElementById('quarto-container');
let quarto = null;
if (container) quarto = initQuarto(container);
