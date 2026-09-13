import * as THREE from 'three';
import { CONFIG } from './config.js';
import { resolveBallColliders } from './colliders.js';
export function wrapBall(mesh) {
  mesh.name = 'ball';
  const s = CONFIG.ball.scale || 1;
  // Preserva a escala vinda do Blender (nó do GLB) e multiplica pelo ajuste:
  // setScalar apagaria a escala do modelo e encolhia a bola.
  mesh.scale.multiplyScalar(s);
  const baseScaleVec = mesh.scale.clone();
  return {
    mesh, physR: CONFIG.ball.radius * s, baseScale: s, baseScaleVec,
    vel: new THREE.Vector3(0, 0, 0),
    sleeping: false, squash: 0, rollingTime: 0,
    state: 'dropping',
    spinAxis: new THREE.Vector3(1, 0, 0), spinSpeed: 0
  };
}
export function createBall(scene) {
  const { radius, color } = CONFIG.ball;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 40, 28),
    new THREE.MeshStandardMaterial({ color, roughness: 0.45 })
  );
  mesh.castShadow = true;
  scene.add(mesh);
  return wrapBall(mesh);
}
export function kickBall(ball, reduced) {
  const b = CONFIG.ball;
  if (!ball.sleeping && ball.state !== 'idle') return false;
  ball.sleeping = false;
  ball.state = 'rolling';
  ball.rollingTime = 0;
  const up = reduced ? b.kickUpReduced : b.kickUp;
  ball.vel.set(
    (Math.random() * 2 - 1) * b.kickSide + b.kickBias,
    up,
    (Math.random() * 2 - 1) * b.kickSide + b.kickBias
  );
  const sp = ball.vel.length();
  if (sp > b.maxSpeed) ball.vel.multiplyScalar(b.maxSpeed / sp);
  ball.squash = 0;
  return true;
}
export function stepBall(ball, bounds, dt, onBounce, colliders) {
  const b = CONFIG.ball;
  const dg = CONFIG.wallDiag;
  const rh = CONFIG.returnHome;
  const p = ball.mesh.position;
  if (ball.held) {
    // Segurada pela mão: sem gravidade nem velocidade, mas respeita os
    // colisores — só reposiciona para fora (sem rebote e sem som), então
    // não atravessa poste, aro, tabela nem paredes. A zona do aro é mais
    // estreita aqui (heldRadiusScale) para dar para centralizar no cesto.
    if (colliders && colliders.active) {
      resolveBallColliders(ball, colliders, dt, null, {
        rimScale: (CONFIG.colliders && CONFIG.colliders.heldRadiusScale) || 0.55
      });
    }
    return;
  }
  if (ball.sleeping) return;
  if (!isFinite(p.x + p.y + p.z) || p.y < -2 || p.y > 12) {
    p.copy(bounds.corner).add(new THREE.Vector3(0, 1.5, 0));
    ball.vel.set(0, 0, 0);
  }
  ball.vel.y += b.gravity * dt;
  const sp0 = ball.vel.length();
  if (sp0 > b.maxSpeed) ball.vel.multiplyScalar(b.maxSpeed / sp0);
  p.addScaledVector(ball.vel, dt);
  const r = ball.physR ?? b.radius;
  if (p.y < r) {
    p.y = r;
    if (Math.abs(ball.vel.y) > 0.6) { ball.squash = 1; onBounce && onBounce(); }
    ball.vel.y *= -b.restitutionFloor;
    if (Math.abs(ball.vel.y) < 0.35) ball.vel.y = 0;
    const f = Math.max(0, 1 - b.friction * dt);
    ball.vel.x *= f; ball.vel.z *= f;
  }
  if (colliders && colliders.active) {
    // Paredes/tabela/aro/rede vêm do Blender; o retângulo fixo e a
    // diagonal ficam desligados para não brigar com a geometria modelada.
    resolveBallColliders(ball, colliders, dt, onBounce);
    // Rede de segurança: se escapar por alguma fresta, volta ao canto.
    if (Math.abs(p.x) > 40 || Math.abs(p.z) > 40) {
      p.copy(bounds.corner).add(new THREE.Vector3(0, 1.5, 0));
      ball.vel.set(0, 0, 0);
    }
  } else {
    if (p.x < bounds.minX) { p.x = bounds.minX; ball.vel.x *= -b.restitutionWall; onBounce && onBounce(); }
    if (p.x > bounds.maxX) { p.x = bounds.maxX; ball.vel.x *= -b.restitutionWall; onBounce && onBounce(); }
    if (p.z < bounds.minZ) { p.z = bounds.minZ; ball.vel.z *= -b.restitutionWall; onBounce && onBounce(); }
    if (p.z > bounds.maxZ) { p.z = bounds.maxZ; ball.vel.z *= -b.restitutionWall; onBounce && onBounce(); }
    const s = p.x + p.z - dg.c;
    if (s > 0) {
      const nx = Math.SQRT1_2, nz = Math.SQRT1_2;
      p.x -= nx * s; p.z -= nz * s;
      const vn = ball.vel.x * nx + ball.vel.z * nz;
      if (vn > 0) {
        ball.vel.x -= (1 + dg.restitution) * vn * nx;
        ball.vel.z -= (1 + dg.restitution) * vn * nz;
        onBounce && onBounce();
      }
    }
  }
  const onFloor = p.y <= r + 0.002;
  if (onFloor) {
    ball.rollingTime += dt;
    if (ball.rollingTime > rh.delay) {
      const dx = rh.target[0] - p.x, dz = rh.target[1] - p.z;
      const dist = Math.hypot(dx, dz);
      if (dist > rh.stopDist) {
        ball.vel.x += (dx / dist) * rh.force * dt;
        ball.vel.z += (dz / dist) * rh.force * dt;
      }
    }
    const hs = Math.hypot(ball.vel.x, ball.vel.z);
    if (hs > 0.01) {
      ball.spinAxis.set(ball.vel.z, 0, -ball.vel.x).normalize();
      ball.spinSpeed = hs / r;
      ball.mesh.rotateOnWorldAxis(ball.spinAxis, Math.min(ball.spinSpeed * dt, 0.4));
    }
  } else {
    ball.mesh.rotation.x += ball.vel.z * dt * 0.5;
    ball.mesh.rotation.z -= ball.vel.x * dt * 0.5;
  }
  if (ball.squash > 0) {
    ball.squash = Math.max(0, ball.squash - dt * 7);
    const q = ball.squash * b.squash;
    const bsv = ball.baseScaleVec;
    if (bsv) ball.mesh.scale.set(bsv.x * (1 + q), bsv.y * (1 - q), bsv.z * (1 + q));
    else {
      const bs = ball.baseScale ?? 1;
      ball.mesh.scale.set(bs * (1 + q), bs * (1 - q), bs * (1 + q));
    }
  } else if (ball.baseScaleVec) ball.mesh.scale.copy(ball.baseScaleVec);
  else ball.mesh.scale.setScalar(ball.baseScale ?? 1);
  const speed = ball.vel.length();
  if (onFloor && speed < b.stopSpeed) {
    ball.vel.set(0, 0, 0);
    ball.sleeping = true;
    ball.state = 'idle';
    if (ball.baseScaleVec) ball.mesh.scale.copy(ball.baseScaleVec);
    else ball.mesh.scale.setScalar(ball.baseScale ?? 1);
  }
}
