import * as THREE from 'three';
import { CONFIG } from './config.js';
export function computeBounds() {
  const { leftX, backZ } = CONFIG.room;
  const r = CONFIG.ball.radius * (CONFIG.ball.scale || 1);
  return {
    minX: leftX + r, maxX: 4, minZ: backZ + r, maxZ: 4,
    corner: new THREE.Vector3(leftX + 1.1, r, backZ + 1.1)
  };
}
export function addLights(scene) {
  const c = CONFIG.colors;
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xfff2df, 1.1);
  key.position.set(3, 5.5, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7; key.shadow.camera.right = 7;
  key.shadow.camera.top = 7; key.shadow.camera.bottom = -7;
  scene.add(key);
  const fill = new THREE.PointLight(c.led, 6, 10);
  fill.position.set(-2.5, 4.4, -2.5);
  scene.add(fill);
}
export function stripLights(root) {
  const found = [];
  root.traverse(o => { if (o.isLight) found.push(o); });
  found.forEach(o => o.parent && o.parent.remove(o));
  return found.length;
}
export function normalizeModelLights(root, div) {
  let n = 0;
  root.traverse(o => {
    if (!o.isLight) return;
    const d = o.isDirectionalLight ? div.directional : o.isPointLight ? div.point : o.isSpotLight ? div.spot : 1;
    if (d && d > 1) o.intensity /= d;
    n++;
  });
  return n;
}
export function createRoom(scene) {
  const { w, d, h, backZ, leftX } = CONFIG.room;
  const c = CONFIG.colors;
  scene.background = new THREE.Color(0x0b0b12);
  addLights(scene);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: c.floor, roughness: 0.9 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.name = 'floor';
  scene.add(floor);
  const mkWall = (ww, hh, color) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(ww, hh),
      new THREE.MeshStandardMaterial({ color, roughness: 0.95 }));
    m.receiveShadow = true;
    return m;
  };
  const wallBack = mkWall(w, h, c.wallBack);
  wallBack.position.set(0, h / 2, backZ);
  scene.add(wallBack);
  const wallLeft = mkWall(d, h, c.wallLeft);
  wallLeft.rotation.y = Math.PI / 2;
  wallLeft.position.set(leftX, h / 2, 0);
  scene.add(wallLeft);
  const baseMat = new THREE.MeshStandardMaterial({ color: c.base, roughness: 0.8 });
  const baseBack = new THREE.Mesh(new THREE.BoxGeometry(w, 0.18, 0.08), baseMat);
  baseBack.position.set(0, 0.09, backZ + 0.05);
  scene.add(baseBack);
  const baseLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, d), baseMat);
  baseLeft.position.set(leftX + 0.05, 0.09, 0);
  scene.add(baseLeft);
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.1),
    new THREE.MeshStandardMaterial({ color: c.poster, roughness: 0.85 }));
  poster.position.set(-1.2, 2.6, backZ + 0.02);
  scene.add(poster);
  const led = new THREE.Mesh(new THREE.BoxGeometry(w, 0.05, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x111111, emissive: c.led, emissiveIntensity: 2 }));
  led.position.set(0, h - 0.3, backZ + 0.06);
  scene.add(led);
  return computeBounds();
}
