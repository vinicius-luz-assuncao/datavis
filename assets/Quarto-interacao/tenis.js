import * as THREE from 'three';
import { CONFIG } from './config.js';
const _spinAxis = new THREE.Vector3();
export function wrapTenis(group) {
  group.name = 'tenis';
  const s = CONFIG.tenis.scale || 1;
  group.scale.multiplyScalar(s);
  const baseRot = group.rotation.clone();
  group.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(group);
  const sph = box.getBoundingSphere(new THREE.Sphere());
  const autoR = THREE.MathUtils.clamp(sph.radius, 0.1, 0.5);
  const top = box.max.y - group.position.y;
  return {
    group, home: group.position.clone(),
    offset: new THREE.Vector3(), offsetVel: new THREE.Vector3(),
    tilt: new THREE.Vector3(), yaw: 0, yawVel: 0,
    radius: Number.isFinite(autoR) ? autoR : (CONFIG.tenis.radius ?? 0.5),
    top: Number.isFinite(top) ? top : 0.4,
    nudge(dir) {
      this.offsetVel.addScaledVector(dir, CONFIG.tenis.kick);
      const l = this.offsetVel.length();
      if (l > 3.0) this.offsetVel.multiplyScalar(3.0 / l);
      this.tilt.x += (Math.random() - 0.1) * 2 * CONFIG.tenis.tilt;
      this.tilt.z += (Math.random() - 0.1) * 2 * CONFIG.tenis.tilt;
      this.yawVel += (Math.random() - 0.1) * 2 * CONFIG.tenis.yaw;
      const yw = 3.5;
      if (this.yawVel > yw) this.yawVel = yw;
      if (this.yawVel < -yw) this.yawVel = -yw;
    },
    update(dt, bounds) {
      const k = CONFIG.tenis.spring, d = CONFIG.tenis.damping;
      this.offsetVel.x += (-this.offsetVel.x * d) * dt;
      this.offsetVel.z += (-this.offsetVel.z * d) * dt;
      this.offset.addScaledVector(this.offsetVel, dt);
      if (this.offsetVel.lengthSq() < 0.0004) {
        this.home.add(this.offset);
        this.offset.set(0, 0, 0);
        this.offsetVel.set(0, 0, 0);
      }
      const max = CONFIG.tenis.maxNudge;
      if (this.offset.length() > max) {
        this.offset.setLength(max);
        this.offsetVel.multiplyScalar(0.5);
      }
      this.yawVel += (-this.yaw * k * 0.6 - this.yawVel * d * 0.7) * dt;
      this.yaw += this.yawVel * dt;
      const tw = 0.6;
      if (this.yaw > tw) { this.yaw = tw; this.yawVel *= -0.3; }
      if (this.yaw < -tw) { this.yaw = -tw; this.yawVel *= -0.3; }
      this.tilt.multiplyScalar(Math.max(0, 1 - 3 * dt));
      const tc = 0.45;
      this.tilt.x = THREE.MathUtils.clamp(this.tilt.x, -tc, tc);
      this.tilt.z = THREE.MathUtils.clamp(this.tilt.z, -tc, tc);
      const p = this.home.clone().add(this.offset);
      if (bounds) {
        p.x = THREE.MathUtils.clamp(p.x, bounds.minX + 0.3, bounds.maxX - 0.3);
        p.z = THREE.MathUtils.clamp(p.z, bounds.minZ + 0.3, bounds.maxZ - 0.3);
        const dg = CONFIG.wallDiag;
        const s = p.x + p.z - dg.c;
        if (s > -0.4) { p.x += -Math.SQRT1_2 * (s + 0.4); p.z += -Math.SQRT1_2 * (s + 0.4); }
      }
      this.group.position.copy(p);
      this.group.rotation.set(baseRot.x + this.tilt.x, baseRot.y + this.yaw, baseRot.z + this.tilt.z);
    }
  };
}
export function collideBallTenis(ball, tenis, dt, onHit) {
  const bp = ball.mesh.position;
  const tp = tenis.group.position;
  const physR = ball.physR ?? CONFIG.ball.radius;
  const dx = bp.x - tp.x, dz = bp.z - tp.z;
  const dist = Math.hypot(dx, dz);
  const minD = physR + tenis.radius * (CONFIG.tenis.contact ?? 1);
  const topY = tp.y + (tenis.top ?? 0.4);
  const bottom = bp.y - physR;
  if (dist < minD && bottom < topY && bottom > topY - 0.35 && ball.vel.y < 0) {
    bp.y = topY + physR;
    const impact = -ball.vel.y;
    const rest = CONFIG.tenis.topBounce ?? 0.45;
    ball.vel.y *= -rest;
    if (Math.abs(ball.vel.y) < 0.35) ball.vel.y = 0;
    const hs = Math.hypot(ball.vel.x, ball.vel.z);
    if (impact > 1.2 && hs > 0.05) {
      tenis.nudge(new THREE.Vector3(ball.vel.x / hs, 0, ball.vel.z / hs).multiplyScalar(Math.min(1, impact * 0.15)));
    }
    ball.sleeping = false;
    if (impact > 0.8) onHit && onHit();
    const slide = CONFIG.tenis.topSlide ?? 3.0;
    let sx = dx, sz = dz;
    let sd = Math.hypot(sx, sz);
    if (sd < 0.05) { sx = 0.4; sz = 0.25; sd = Math.hypot(sx, sz); }
    sx /= sd; sz /= sd;
    ball.vel.x += sx * slide * (dt || 0.016);
    ball.vel.z += sz * slide * (dt || 0.016);
    const spd = Math.hypot(ball.vel.x, ball.vel.z);
    if (spd > 0.01) {
      _spinAxis.set(ball.vel.z, 0, -ball.vel.x).normalize();
      ball.mesh.rotateOnWorldAxis(_spinAxis, Math.min(spd / physR * (dt || 0.016), 0.3));
    }
    return;
  }
  if (dist < minD && bp.y < 0.7 && dist > 0.0001) {
    const nx = dx / dist, nz = dz / dist;
    bp.x = tp.x + nx * minD;
    bp.z = tp.z + nz * minD;
    const vn = ball.vel.x * nx + ball.vel.z * nz;
    if (vn < 0) {
      ball.vel.x -= 1.7 * vn * nx;
      ball.vel.z -= 1.7 * vn * nz;
      ball.vel.multiplyScalar(0.55);
      ball.sleeping = false;
      tenis.nudge(new THREE.Vector3(nx, 0, nz).multiplyScalar(Math.min(1.5, -vn * 0.5)));
      onHit && onHit();
    }
  }
}
