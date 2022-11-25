import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Takenori from './Takenori';

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffcf00);

// Create camera.
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

// Initialize renderer.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Show FPS stats, add orbit control.
const stats = Stats();
document.body.appendChild(stats.dom);
const controls = new OrbitControls(camera, renderer.domElement);

// Add lights.
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(ambientLight);
scene.add(directionalLight);

// Add cube to scene.
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.material.wireframe = true;
scene.add(cube);

// Add glb model to scene.
const takenori = new Takenori();
scene.add(takenori);

// Request animation frame.
const tick = (): void => {
  requestAnimationFrame(tick);

  cube.rotation.x += -0.02;
  cube.rotation.y += -0.02;

  renderer.render(scene, camera);
  takenori.rotation.y += -0.01;
  takenori.rotation.z += -0.01;

  stats.update();
  controls.update();
};
tick();

// Add window resize event.
const windowResizeHanlder = (): void => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
