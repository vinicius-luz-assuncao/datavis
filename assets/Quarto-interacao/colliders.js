import * as THREE from 'three';
import { CONFIG } from './config.js';

/* ==========================================================================
   COLISORES LIDOS DO BLENDER — convenção por nome (tudo que começa com o
   prefixo vira colisão; o sufixo é livre, inclusive o ".001" automático):

     Collider_* genérico ... caixa AABB dura, malha OCULTADA (só colisão).
                             Modele a parede visível com outro nome e a caixa
                             de colisão com Collider_* no mesmo lugar.
     Collider_Tabela ....... caixa AABB dura (rebate), malha VISÍVEL.
     Collider_Aro .......... anel amostrado em N esferas (dá para acertar
                             arremessos), malha VISÍVEL.
     Collider_Rede ......... zona de AMORTECIMENTO (freia + puxa para baixo;
                             a bola atravessa devagar e cai), malha VISÍVEL.

   Paredes devem estar alinhadas aos eixos (giros de 90°): a caixa é sempre
   retangular e alinhada, então parede rotacionada em ângulo quebrado gera
   uma caixa "gorda". Transforms (posição/escala) são lidos da matriz final.
   Sem nenhum Collider_* no GLB, vale o fallback (CONFIG.room + diagonal).
   ========================================================================== */

const _box = new THREE.Box3();
const _size = new THREE.Vector3();
const _center = new THREE.Vector3();

// Amostra o aro (toro em qualquer orientação): o plano do anel é formado
// pelos dois eixos de maior extensão da caixa; o menor dá o tubo.
function sampleRim(box, n) {
  box.getSize(_size);
  box.getCenter(_center);
  const axes = ['x', 'y', 'z']
    .map((a) => ({ a, s: _size[a] }))
    .sort((p, q) => q.s - p.s);
  const u = axes[0].a, v = axes[1].a;
  const radius = (_size[u] + _size[v]) / 4;
  const tube = Math.max(0.04, _size[axes[2].a] / 2);
  const points = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const p = _center.clone();
    p[u] += Math.cos(t) * radius;
    p[v] += Math.sin(t) * radius;
    points.push(p);
  }
  return { points, r: tube };
}

export function collectColliders(root, opts = {}) {
  const cfg = Object.assign(
    { prefix: 'Collider_', rimSamples: 12 },
    CONFIG.colliders || {},
    opts
  );
  const walls = [];
  let backboard = null;
  let rim = null;
  let net = null;

  root.updateWorldMatrix(true, true);
  root.traverse((o) => {
    if (!o.name || !o.name.startsWith(cfg.prefix)) return;
    const key = o.name.slice(cfg.prefix.length).toLowerCase();
    _box.setFromObject(o);
    if (_box.isEmpty()) return;
    const box = _box.clone();

    if (key.startsWith('tabela') || key.startsWith('backboard')) {
      backboard = { box }; // malha visível
      return;
    }
    if (key.startsWith('aro') || key.startsWith('rim')) {
      rim = sampleRim(box, cfg.rimSamples); // malha visível
      return;
    }
    if (key.startsWith('rede') || key.startsWith('net')) {
      net = { box }; // malha visível, zona macia
      return;
    }
    walls.push({ box, name: o.name });
    // Colisor genérico = só colisão: oculta a malha, mantém a caixa.
    o.traverse((m) => {
      if (m.isMesh) m.visible = false;
    });
  });

  // Poste automático: coluna do chão até a base da tabela, na mesma linha
  // (segue a tabela se ela for movida no Blender). Desligar: autoPost:false.
  // Se modelar um Collider_Poste próprio, desligue este para não duplicar.
  let autoPost = null;
  if (backboard && (cfg.autoPost !== false)) {
    const th = cfg.postThickness || 0.3;
    const ox = (cfg.postOffset && cfg.postOffset[0]) || 0;
    const oz = (cfg.postOffset && cfg.postOffset[1]) || 0;
    const bc = backboard.box.getCenter(new THREE.Vector3());
    const top = Math.max(0.5, backboard.box.min.y);
    autoPost = {
      name: 'poste-auto',
      box: new THREE.Box3(
        new THREE.Vector3(bc.x + ox - th / 2, 0, bc.z + oz - th / 2),
        new THREE.Vector3(bc.x + ox + th / 2, top, bc.z + oz + th / 2)
      )
    };
    walls.push(autoPost);
  }

  const assist = findAssist(root, (CONFIG.assistPoint && CONFIG.assistPoint.name) || 'ponto_tabela');

  const found = walls.length + (backboard ? 1 : 0) + (rim ? 1 : 0);
  if (found) console.info(`[quarto] colisores do GLB: ${walls.length} parede(s)` +
    (backboard ? ' + tabela' : '') + (rim ? ' + aro' : '') + (net ? ' + rede' : '') +
    (autoPost ? ' + poste-auto' : ''));
  if (assist) console.info('[quarto] ponto assistivo:', assist.point.toArray().map((v) => v.toFixed(2)).join(', '));
  return { walls, backboard, rim, net, assist, active: found > 0 };
}

// Ponto assistivo (ex.: "ponto_tabela"): Empty no centro da boca do cesto.
// A bola solta por perto é atraída de leve até ele e cai (ímã suave).
// Nome exato do config, com fallback sem diferenciar maiúsculas.
function findAssist(root, name) {
  if (!name) return null;
  let found = root.getObjectByName(name) || null;
  if (!found) {
    const lower = name.toLowerCase();
    root.traverse((o) => {
      if (!found && (o.name || '').toLowerCase() === lower) found = o;
    });
  }
  if (!found) return null;
  found.updateWorldMatrix(true, false);
  return { point: new THREE.Vector3().setFromMatrixPosition(found.matrixWorld) };
}

// Centro do aro (alvo do arremesso assistido); null sem aro no GLB.
export function hoopTarget(colliders) {
  if (!colliders || !colliders.rim || !colliders.rim.points.length) return null;
  const c = new THREE.Vector3();
  colliders.rim.points.forEach((p) => c.add(p));
  c.multiplyScalar(1 / colliders.rim.points.length);
  return c;
}

// Retângulo útil = união das caixas das paredes (para arrasto, spawn,
// retorno e tênis seguirem a sala modelada em vez da salinha do fallback).
export function wallsBounds(colliders) {
  if (!colliders || !colliders.walls.length) return null;
  const u = new THREE.Box3();
  colliders.walls.forEach((w, i) => {
    if (i === 0) u.copy(w.box);
    else u.union(w.box);
  });
  if (u.isEmpty()) return null;
  return u;
}

function clampNum(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

// Resolve a bola contra caixas duras + esferas do aro + zona da rede.
// Paredes/tabela: empurra para fora pela face mais próxima e reflete.
export function resolveBallColliders(ball, colliders, dt, onBounce, opts) {
  // rimScale (<1, usado com a bola segurada) estreita só a zona do aro,
  // para dar para centralizar a bola no cesto; paredes/tabela seguem integrais.
  if (!colliders) return;
  const b = CONFIG.ball;
  const rest = (CONFIG.colliders && CONFIG.colliders.restitution) || b.restitutionWall;
  const r = ball.physR ?? b.radius;
  const p = ball.mesh.position;

  const solids = colliders.walls.slice();
  if (colliders.backboard) solids.push(colliders.backboard);

  for (const w of solids) {
    const bx = w.box;
    const cx = clampNum(p.x, bx.min.x, bx.max.x);
    const cy = clampNum(p.y, bx.min.y, bx.max.y);
    const cz = clampNum(p.z, bx.min.z, bx.max.z);
    let dx = p.x - cx, dy = p.y - cy, dz = p.z - cz;
    const d2 = dx * dx + dy * dy + dz * dz;
    if (d2 >= r * r) continue;

    let nx, ny, nz;
    if (d2 > 1e-9) {
      const d = Math.sqrt(d2);
      nx = dx / d; ny = dy / d; nz = dz / d;
      p.x = cx + nx * r; p.y = cy + ny * r; p.z = cz + nz * r;
    } else {
      // Centro dentro da caixa: sai pela face de menor penetração.
      const px = Math.min(p.x - bx.min.x, bx.max.x - p.x);
      const py = Math.min(p.y - bx.min.y, bx.max.y - p.y);
      const pz = Math.min(p.z - bx.min.z, bx.max.z - p.z);
      if (px <= py && px <= pz) {
        nx = p.x - bx.min.x < bx.max.x - p.x ? -1 : 1; ny = 0; nz = 0;
        p.x = nx < 0 ? bx.min.x - r : bx.max.x + r;
      } else if (py <= px && py <= pz) {
        nx = 0; ny = p.y - bx.min.y < bx.max.y - p.y ? -1 : 1; nz = 0;
        p.y = ny < 0 ? bx.min.y - r : bx.max.y + r;
      } else {
        nx = 0; ny = 0; nz = p.z - bx.min.z < bx.max.z - p.z ? -1 : 1;
        p.z = nz < 0 ? bx.min.z - r : bx.max.z + r;
      }
    }
    const vn = ball.vel.x * nx + ball.vel.y * ny + ball.vel.z * nz;
    if (vn < 0) {
      ball.vel.x -= (1 + rest) * vn * nx;
      ball.vel.y -= (1 + rest) * vn * ny;
      ball.vel.z -= (1 + rest) * vn * nz;
      ball.sleeping = false;
      if (onBounce) onBounce();
    }
  }

  // Aro: esferas duras (som de batida no aro).
  if (colliders.rim) {
    const rr = r * ((opts && opts.rimScale) || 1) + colliders.rim.r;
    const rimRest = Math.min(0.9, rest + 0.15);
    for (const c of colliders.rim.points) {
      const dx = p.x - c.x, dy = p.y - c.y, dz = p.z - c.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist >= rr || dist < 1e-6) continue;
      const nx = dx / dist, ny = dy / dist, nz = dz / dist;
      p.x = c.x + nx * rr; p.y = c.y + ny * rr; p.z = c.z + nz * rr;
      const vn = ball.vel.x * nx + ball.vel.y * ny + ball.vel.z * nz;
      if (vn < 0) {
        ball.vel.x -= (1 + rimRest) * vn * nx;
        ball.vel.y -= (1 + rimRest) * vn * ny;
        ball.vel.z -= (1 + rimRest) * vn * nz;
        ball.sleeping = false;
        if (onBounce) onBounce();
      }
    }
  }

  // Rede: zona macia — freia forte e puxa para baixo; a bola atravessa
  // devagar e cai no chão (não rebate, não faz som).
  if (colliders.net && colliders.net.box.containsPoint(p)) {
    const damp = (CONFIG.colliders && CONFIG.colliders.netDamp) || 6;
    const sink = (CONFIG.colliders && CONFIG.colliders.netSink) || 4;
    const f = Math.max(0, 1 - damp * (dt || 0.016));
    ball.vel.x *= f;
    ball.vel.z *= f;
    ball.vel.y = ball.vel.y * f - sink * (dt || 0.016);
    ball.sleeping = false;
  }
}
