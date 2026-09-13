import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/* ==========================================================================
   PLANETA — canvas pequeno com giro contínuo no eixo.
   Pivô: Empty "centro_do_planeta" (vale com/sem underscore e sem
   maiúsculas) — posição + orientação dele mandam; modelo intacto.
   Sem Empty: centraliza/normaliza a maior malha + tilt do código.
   Arraste controla o giro; ao soltar com "arremesso", gira um pouco na
   direção e retorna suavemente à direção/velocidade original (a velocidade
   extra decai a zero, nunca o giro base). Com reduced-motion: parado,
   arrasto permitido, arremesso morre (sem retomada).
   ========================================================================== */

const _qy = new THREE.Quaternion();
const UP_Y = new THREE.Vector3(0, 1, 0);

function spinBy(group, angle) {
  group.quaternion.multiply(_qy.setFromAxisAngle(UP_Y, angle));
}

function normName(nm) {
  return (nm || '').toLowerCase().replace(/[\s_]+/g, '');
}

export function initPlanet(container, opts = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mode "spin" (padrão): giro contínuo + fling que retorna à base.
  // mode "float": sem giro — flutuação vertical discreta; arrasto gira
  // livre, ao soltar retorna à orientação original.
  const mode = opts.mode || 'spin';
  const BASE_SPEED = reduced || mode !== 'spin' ? 0 : opts.speed ?? 0.35; // rad/s
  const TILT = ((opts.tilt ?? 23.4) * Math.PI) / 180;
  const FLOAT_AMP = opts.floatAmp ?? 0.12;
  const FLOAT_SPEED = opts.floatSpeed ?? 0.8;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xf1e9db, 0x1c2b44, 0.5));

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.6, 4.2);
  camera.lookAt(0, 0, 0);

  // Tilt fixo no grupo externo; giro animado no grupo interno = eixo
  // inclinado sem precessão. Gira SÓ o planeta (luzes/câmera estáticas).
  // Com o Empty de pivô, o tilt do código zera (manda a orientação dele).
  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.z = TILT;
  scene.add(tiltGroup);
  const spinGroup = new THREE.Group();
  tiltGroup.add(spinGroup);
  const anchorName = normName(opts.anchor || 'centro_do_planeta');

  const modelURL = opts.modelURL || 'assets/earth/planet.glb';
  new GLTFLoader().load(
    modelURL,
    (gltf) => {
      // Câmera do arquivo, se houver (aspect segue o container).
      const glbCam =
        gltf.scene.getObjectByProperty('isCamera', true) ||
        (gltf.cameras && gltf.cameras[0]) ||
        null;
      if (glbCam) {
        glbCam.updateWorldMatrix(true, false);
        glbCam.matrixWorld.decompose(camera.position, camera.quaternion, new THREE.Vector3());
        if (glbCam.fov) camera.fov = glbCam.fov;
        camera.updateProjectionMatrix();
      }
      scene.add(gltf.scene);
      // Sol do Blender: direção = −Z local × quaternion do nó (posição na
      // origem degenera a direção). Recoloca a 10 un. com alvo na origem.
      gltf.scene.traverse((o) => {
        if (o.isDirectionalLight) {
          const q = new THREE.Quaternion();
          o.getWorldQuaternion(q);
          const L = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
          o.position.copy(L.multiplyScalar(-10));
          o.target.position.set(0, 0, 0);
          scene.add(o.target);
        }
      });
      // Elege o planeta: malha de maior volume (sem depender de nome).
      let planet = null;
      let planetVol = 0;
      const wb = new THREE.Box3();
      const ws = new THREE.Vector3();
      gltf.scene.updateWorldMatrix(true, true);
      gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        wb.setFromObject(o);
        wb.getSize(ws);
        const vol = ws.x * ws.y * ws.z;
        if (vol > planetVol) {
          planetVol = vol;
          planet = o;
        }
      });
      if (planet) {
        console.info('[planeta] objeto:', planet.name || '(sem nome)');
        // Pivô no Empty (posição + orientação dele; modelo intacto).
        let anchor = null;
        gltf.scene.traverse((o) => {
          if (!anchor && normName(o.name) === anchorName) anchor = o;
        });
        spinGroup.attach(planet);
        if (anchor) {
          // Tilt do código zera primeiro (manda a orientação do Empty);
          // com tiltGroup em identidade, espaço local == mundo.
          tiltGroup.rotation.z = 0;
          tiltGroup.updateWorldMatrix(true, false);
          anchor.updateWorldMatrix(true, false);
          const wp = new THREE.Vector3();
          const wq = new THREE.Quaternion();
          anchor.matrixWorld.decompose(wp, wq, new THREE.Vector3());
          spinGroup.position.copy(wp);
          spinGroup.quaternion.copy(wq);
          homeQuat = spinGroup.quaternion.clone();
          baseY = spinGroup.position.y;
          console.info('[planeta] pivô:', anchor.name);
        } else {
          console.info('[planeta] sem Empty de pivô; fallback com tilt do código.');
          if (!glbCam) {
            // Sem câmera autorada: centraliza/normaliza para a fallback enquadrar.
            wb.setFromObject(planet);
            const center = wb.getCenter(new THREE.Vector3());
            const size = wb.getSize(new THREE.Vector3());
            const local = tiltGroup.worldToLocal(center.clone());
            planet.position.sub(local);
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            planet.scale.multiplyScalar(2 / maxDim);
          }
          // Com câmera do GLB: modelo intacto — o recorte do Blender vale.
        }
        // Fallback (sem Empty): origem atual vira a referência de retorno.
        if (!homeQuat) {
          homeQuat = spinGroup.quaternion.clone();
          baseY = spinGroup.position.y;
        }
      } else {
        console.warn('[planeta] nenhuma malha no GLB; sem giro.');
      }
    },
    undefined,
    () => {}
  );

  // Estado de giro: extra decai a zero (volta ao giro base).
  // No modo float, homeQuat guarda a orientação original de retorno.
  let homeQuat = null;
  let baseY = 0;
  let t0 = performance.now();
  let extra = 0;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let running = true;

  const cvs = renderer.domElement;
  cvs.style.touchAction = 'none';
  cvs.style.cursor = 'grab';

  cvs.addEventListener('pointerdown', (e) => {
    dragging = true;
    extra = 0;
    lastX = e.clientX;
    lastT = performance.now();
    cvs.style.cursor = 'grabbing';
    try {
      cvs.setPointerCapture(e.pointerId);
    } catch (err) {}
  });
  cvs.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max((now - lastT) / 1000, 0.008);
    const dAngle = ((e.clientX - lastX) / cvs.clientWidth) * Math.PI * 1.5;
    spinBy(spinGroup, dAngle);
    const inst = dAngle / dt;
    extra = extra * 0.7 + THREE.MathUtils.clamp(inst, -6, 6) * 0.3;
    lastX = e.clientX;
    lastT = now;
  });
  function endDrag() {
    dragging = false;
    cvs.style.cursor = 'grab';
  }
  cvs.addEventListener('pointerup', endDrag);
  cvs.addEventListener('pointercancel', endDrag);

  function resize() {
    const w = container.clientWidth || 240;
    const h = container.clientHeight || 240;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  // Pausa fora da tela (vários contextos WebGL na página).
  if (typeof IntersectionObserver !== 'undefined') {
    new IntersectionObserver(
      (entries) => {
        running = !!(entries[0] && entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    ).observe(container);
  }

  let last = performance.now();
  renderer.setAnimationLoop((now) => {
    if (!running) {
      last = now;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (mode === 'float') {
      // Flutuação discreta + retorno à orientação original ao soltar.
      if (!reduced) {
        spinGroup.position.y = baseY + Math.sin(((now - t0) / 1000) * FLOAT_SPEED) * FLOAT_AMP;
      }
      if (!dragging && homeQuat) {
        if (reduced) spinGroup.quaternion.copy(homeQuat);
        else spinGroup.quaternion.slerp(homeQuat, Math.min(1, dt * 2.2));
      }
    } else {
      if (!dragging && extra !== 0) {
        extra += (0 - extra) * Math.min(1, dt * 1.8);
        if (Math.abs(extra) < 0.005) extra = 0;
      }
      spinBy(spinGroup, (BASE_SPEED + extra) * dt);
    }
    renderer.render(scene, camera);
  });

  return { spinGroup, camera };
}
