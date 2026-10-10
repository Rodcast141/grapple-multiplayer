import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/webxr/XRControllerModelFactory.js';

// Game State
const gameState = {
  coins: 1000,
  selectedSkin: 'classic',
  selectedHook: 'standard',
  ownedItems: ['classic', 'standard'],
  currentScreen: 'menu',
  gameStarted: false,
  gameTime: 0,
  playerSpeed: 0,
  playerCoins: 0,
  leaderboard: [
    { rank: 1, name: 'SwiftGrappler', time: '42.3s', coins: 850 },
    { rank: 2, name: 'SkyHunter', time: '44.1s', coins: 720 },
    { rank: 3, name: 'VoidDancer', time: '45.8s', coins: 680 },
    { rank: 4, name: 'EchoStrike', time: '48.2s', coins: 600 },
    { rank: 5, name: 'NeonPulse', time: '51.5s', coins: 520 }
  ]
};

const skins = [
  { id: 'classic', name: 'Classic', emoji: '🧑', price: 0 },
  { id: 'neon', name: 'Neon Genesis', emoji: '🤖', price: 150 },
  { id: 'cyber', name: 'Cyber Ninja', emoji: '🥷', price: 200 },
  { id: 'ghost', name: 'Ghost Specter', emoji: '👻', price: 180 },
  { id: 'void', name: 'Void Walker', emoji: '🌑', price: 250 }
];

const hooks = [
  { id: 'standard', name: 'Standard', emoji: '🪝', price: 0 },
  { id: 'plasma', name: 'Plasma', emoji: '⚡', price: 100 },
  { id: 'ice', name: 'Frost', emoji: '❄️', price: 120 },
  { id: 'fire', name: 'Inferno', emoji: '🔥', price: 150 },
  { id: 'shadow', name: 'Shadow', emoji: '🌑', price: 200 }
];

const shopItems = [
  { id: 'starter-pack', name: '100 Coins', emoji: '💰', type: 'currency', price: 100, amount: 100 },
  { id: 'pro-pack', name: '500 Coins', emoji: '💰💰', type: 'currency', price: 500, amount: 500 },
  { id: 'vip-pack', name: '1000 Coins', emoji: '💰💰💰', type: 'currency', price: 1000, amount: 1000 }
];

function startGame() {
  hideAllMenus();
  gameState.currentScreen = 'game';
  gameState.gameStarted = true;
  gameState.gameTime = 0;
  gameState.playerCoins = 0;
  document.getElementById('gameHUD').classList.remove('hidden');
  document.getElementById('finishScreen').classList.add('hidden');
  initGame();
}

function openShop() {
  hideAllMenus();
  renderShop();
  document.getElementById('shopMenu').classList.add('active');
}

function openCustomization() {
  hideAllMenus();
  renderCustomization();
  document.getElementById('customizationMenu').classList.add('active');
}

function openLeaderboard() {
  hideAllMenus();
  renderLeaderboard();
  document.getElementById('leaderboardMenu').classList.add('active');
}

function backToMenu() {
  hideAllMenus();
  document.getElementById('mainMenu').classList.add('active');
}

function returnToMenu() {
  if (renderer && renderer.xr && renderer.xr.isPresenting) {
    renderer.xr.getSession().end();
  }
  backToMenu();
}

function hideAllMenus() {
  document.querySelectorAll('.menu-screen').forEach(m => m.classList.remove('active'));
  document.getElementById('gameHUD').classList.add('hidden');
}

function renderShop() {
  const shopGrid = document.getElementById('shopGrid');
  shopGrid.innerHTML = '';

  shopItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.onclick = () => purchaseItem(item);
    div.innerHTML = `
      <div class="shop-item-emoji">${item.emoji}</div>
      <div class="shop-item-name">${item.name}</div>
      <div class="shop-item-price">💰 ${item.price}</div>
      <button class="shop-item-btn">BUY</button>
    `;
    shopGrid.appendChild(div);
  });

  document.getElementById('coinCount').textContent = gameState.coins;
}

function renderCustomization() {
  const skinGrid = document.getElementById('skinGrid');
  const hookGrid = document.getElementById('hookGrid');

  skinGrid.innerHTML = '';
  skins.forEach(skin => {
    const div = document.createElement('div');
    div.className = `skin-item ${gameState.selectedSkin === skin.id ? 'selected' : ''}`;
    div.onclick = () => selectSkin(skin);
    div.innerHTML = `
      <div>${skin.emoji}</div>
      <div class="skin-name">${skin.name}</div>
    `;
    skinGrid.appendChild(div);
  });

  hookGrid.innerHTML = '';
  hooks.forEach(hook => {
    const div = document.createElement('div');
    div.className = `hook-item ${gameState.selectedHook === hook.id ? 'selected' : ''}`;
    div.onclick = () => selectHook(hook);
    div.innerHTML = `
      <div>${hook.emoji}</div>
      <div class="hook-name">${hook.name}</div>
    `;
    hookGrid.appendChild(div);
  });
}

function renderLeaderboard() {
  const content = document.getElementById('leaderboardContent');
  content.innerHTML = '';

  gameState.leaderboard.forEach((entry, idx) => {
    const div = document.createElement('div');
    div.className = 'leaderboard-row';

    let rankClass = '';
    if (idx === 0) rankClass = 'gold';
    else if (idx === 1) rankClass = 'silver';
    else if (idx === 2) rankClass = 'bronze';

    div.innerHTML = `
      <div class="rank-badge ${rankClass}">#${entry.rank}</div>
      <div class="player-name">${entry.name}</div>
      <div class="player-time">${entry.time}</div>
      <div class="player-coins">💰 ${entry.coins}</div>
    `;
    content.appendChild(div);
  });
}

function selectSkin(skin) {
  if (!gameState.ownedItems.includes(skin.id)) {
    if (gameState.coins >= skin.price) {
      gameState.coins -= skin.price;
      gameState.ownedItems.push(skin.id);
    } else {
      alert('Not enough coins!');
      return;
    }
  }
  gameState.selectedSkin = skin.id;
  renderCustomization();
}

function selectHook(hook) {
  if (!gameState.ownedItems.includes(hook.id)) {
    if (gameState.coins >= hook.price) {
      gameState.coins -= hook.price;
      gameState.ownedItems.push(hook.id);
    } else {
      alert('Not enough coins!');
      return;
    }
  }
  gameState.selectedHook = hook.id;
  renderCustomization();
}

function purchaseItem(item) {
  if (gameState.coins >= item.price) {
    gameState.coins += item.amount - item.price;
    document.getElementById('coinCount').textContent = gameState.coins;
    renderShop();
  } else {
    alert('Not enough coins!');
  }
}

function purchaseOGBundle() {
  if (gameState.coins >= 250) {
    gameState.coins -= 250;
    gameState.coins += 500;
    gameState.ownedItems.push('neon', 'plasma');
    gameState.selectedSkin = 'neon';
    gameState.selectedHook = 'plasma';
    alert('OG Bundle purchased! 🎉');
    renderShop();
  } else {
    alert('Not enough coins! Need 250 coins.');
  }
}

function exitGame() {
  if (renderer && renderer.xr && renderer.xr.isPresenting) {
    renderer.xr.getSession().end();
  }
  returnToMenu();
}

function toggleMap() {
  console.log('Map toggled');
}

function retryLevel() {
  startGame();
}

let scene, camera, renderer;
let player, grappleHook, grappleTarget;
let isGrappling = false;

function initGame() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e27);
  scene.fog = new THREE.Fog(0x0a0e27, 100, 200);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  player = new THREE.Group();
  player.position.set(0, 2, 0);
  player.add(camera);
  scene.add(player);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.xr.enabled = true;

  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';
  gameContainer.appendChild(renderer.domElement);

  document.body.appendChild(VRButton.createButton(renderer));

  const ambientLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 1.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  createLevel();
  createGrappleHook();
  setupVRControllers();
  renderer.setAnimationLoop(animate);
}

function createGrappleHook() {
  const hookGroup = new THREE.Group();

  const hookGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.1);
  const hookMaterial = new THREE.MeshStandardMaterial({
    color: 0xff006e,
    emissive: 0x8338ec,
    emissiveIntensity: 0.5,
    metalness: 0.7,
    roughness: 0.2
  });
  const hookMesh = new THREE.Mesh(hookGeometry, hookMaterial);
  hookMesh.castShadow = true;
  hookGroup.add(hookMesh);

  const glowGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.2
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  hookGroup.add(glow);

  player.add(hookGroup);
  hookGroup.position.set(0.5, -0.3, -1);
  grappleHook = hookGroup;
}

function createLevel() {
  const groundGeometry = new THREE.PlaneGeometry(500, 500);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1f3a,
    roughness: 0.8
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.position.y = -5;
  scene.add(ground);

  const platformPositions = [
    { x: 0, y: 0, z: 20 },
    { x: 15, y: 5, z: 40 },
    { x: -15, y: 8, z: 60 },
    { x: 0, y: 10, z: 80 },
    { x: 20, y: 12, z: 100 },
    { x: -20, y: 10, z: 120 },
    { x: 0, y: 15, z: 140 }
  ];

  platformPositions.forEach((pos) => {
    createPlatform(pos.x, pos.y, pos.z, 3, 0.5, 3);
    createGrapplePoint(pos.x, pos.y + 2, pos.z);
  });

  const finishGeometry = new THREE.BoxGeometry(8, 1, 3);
  const finishMaterial = new THREE.MeshStandardMaterial({
    color: 0x4ade80,
    emissive: 0x4ade80,
    emissiveIntensity: 0.6
  });
  const finishLine = new THREE.Mesh(finishGeometry, finishMaterial);
  finishLine.position.set(0, 17, 160);
  finishLine.castShadow = true;
  finishLine.receiveShadow = true;
  scene.add(finishLine);
}

function createPlatform(x, y, z, w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.7,
    metalness: 0.3
  });
  const platform = new THREE.Mesh(geometry, material);
  platform.position.set(x, y, z);
  platform.castShadow = true;
  platform.receiveShadow = true;
  scene.add(platform);
}

function createGrapplePoint(x, y, z) {
  const geometry = new THREE.SphereGeometry(0.4, 8, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00d9ff,
    emissive: 0x00d9ff,
    emissiveIntensity: 1.0,
    metalness: 0.8
  });
  const point = new THREE.Mesh(geometry, material);
  point.position.set(x, y, z);
  point.castShadow = true;
  scene.add(point);
}

function setupVRControllers() {
  const controllerModelFactory = new XRControllerModelFactory();

  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i);
    controller.addEventListener('selectstart', onControllerSelectStart);
    controller.addEventListener('selectend', onControllerSelectEnd);
    scene.add(controller);

    const grip = renderer.xr.getControllerGrip(i);
    const model = controllerModelFactory.createControllerModel(grip);
    grip.add(model);
    scene.add(grip);
  }
}

function onControllerSelectStart(event) {
  isGrappling = true;
  const controller = event.target;
  const position = new THREE.Vector3();
  controller.getWorldPosition(position);
}

function onControllerSelectEnd() {
  isGrappling = false;
}

function updatePlayerMovement() {
  player.velocity = player.velocity || new THREE.Vector3();
  player.velocity.y -= 0.02;
  player.position.add(player.velocity);

  if (player.position.y < 0) {
    player.position.y = 0;
    player.velocity.y = 0;
  }
}

function updateHUD() {
  gameState.gameTime += 1 / 60;
  const minutes = Math.floor(gameState.gameTime / 60);
  const seconds = Math.floor(gameState.gameTime % 60);
  document.getElementById('hudTime').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById('hudSpeed').textContent = Math.round(gameState.playerSpeed * 10);
  document.getElementById('hudCoins').textContent = gameState.playerCoins;
}

function checkFinishLine() {
  const finishPos = new THREE.Vector3(0, 17, 160);
  const distance = player.position.distanceTo(finishPos);
  if (distance < 6) {
    finishLevel();
  }
}

function finishLevel() {
  if (!gameState.gameStarted) return;
  gameState.gameStarted = false;

  const earnedCoins = Math.floor(1000 / (gameState.gameTime + 1));
  gameState.coins += earnedCoins;
  gameState.playerCoins = earnedCoins;

  document.getElementById('finishTime').textContent = `${Math.floor(gameState.gameTime / 60)}:${Math.floor(gameState.gameTime % 60).toString().padStart(2, '0')}`;
  document.getElementById('finishCoins').textContent = earnedCoins;
  document.getElementById('finishRank').textContent = '#1';

  document.getElementById('gameHUD').classList.add('hidden');
  document.getElementById('finishScreen').classList.remove('hidden');
}

function animate() {
  if (gameState.gameStarted) {
    updatePlayerMovement();
    updateHUD();
    checkFinishLine();
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    exitGame();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainMenu = document.getElementById('mainMenu');
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (mainMenu) mainMenu.classList.add('active');
  }, 1500);
});

window.startGame = startGame;
window.openShop = openShop;
window.openCustomization = openCustomization;
window.openLeaderboard = openLeaderboard;
window.backToMenu = backToMenu;
window.returnToMenu = returnToMenu;
window.exitGame = exitGame;
window.toggleMap = toggleMap;
window.retryLevel = retryLevel;
window.purchaseItem = purchaseItem;
window.purchaseOGBundle = purchaseOGBundle;
