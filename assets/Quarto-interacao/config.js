export const CONFIG = {
  room: { w: 12, d: 12, h: 6, backZ: -4, leftX: -4 },
  ball: {
    radius: 0.584, color: 0xe2483d, restitutionFloor: 0.42, restitutionWall: 0.55,
    gravity: -14, friction: 2.2, stopSpeed: 0.25, maxSpeed: 7,
    kickUp: 4.2, kickUpReduced: 2.0, kickSide: 2.0, kickBias: 0.3, squash: 0.045, scale: 1.0,
    grabHeight: 9, throwBoost: 1.4
  },
  wallDiag: { c: -0.6, restitution: 0.55 },
  returnHome: { target: [-1.9, -2.6], force: 1.6, delay: 1.0, stopDist: 0.25 },
  tenis: { home: [-1.4, 0, -2.3], maxNudge: 0.8, spring: 11, damping: 6.5, kick: 0.7, tilt: 0.1, yaw: 0, radius: 0.55, contact: 1.0, topBounce: 0.45, topSlide: 3.0, scale: 1.0, modelURL: null },
  model: 'quadra.glb',
  roles: { ball: 'ball', tenis: 'tenis' },
  // Colisores por nome: tudo que começa com o prefixo vira colisão.
  // Tabela/aro/rede mantêm a malha visível; Collider_* genérico é ocultado.
  colliders: { prefix: 'Collider_', rimSamples: 12, netDamp: 6, netSink: 4, heldRadiusScale: 0.55, autoPost: true, postThickness: 0.3, postOffset: [0, 0] },
  // Arremesso assistido: chance por arremesso de a bola receber a velocidade
  // balística exata até o aro (novo sorteio a cada arremesso, sem memória).
  assistShot: { chance: 1 / 6, minUp: 1.0, maxShotSpeed: 9 },
  // Ímã do ponto assistivo (Empty "ponto_tabela" na boca do cesto): dentro
  // do raio e acima do ponto, puxa proporcional à distância (zero no centro
  // = chegada suave, sem solavanco). A gravidade faz o resto (cai na rede).
  assistPoint: { name: 'ponto_tabela', radius: 6.25, pull: 10, handPull: 0.44, brake: 0.8 },
  useModelLights: true,
  modelLightDiv: { directional: 400, point: 120, spot: 120 },
  camera: { pos: [2.35, 3.6, 3.1], look: [-1.7, 0.85, -2.5], fov: 42 },
  colors: { floor: 0x8a6f55, wallBack: 0x4a5a7a, wallLeft: 0x42506e, base: 0x1c1c22, poster: 0xd9556b, led: 0x00e5ff }
};
