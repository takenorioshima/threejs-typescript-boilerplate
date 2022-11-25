import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Takenori from './Takenori';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffcf00 );

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const stats = Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
scene.add(ambientLight);
scene.add( directionalLight );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.material.wireframe = true;
scene.add(cube);

const takenori = new Takenori();
scene.add(takenori);

camera.position.z = 2;

const tick = (): void => {
    requestAnimationFrame(tick);

    cube.rotation.x += -0.02;
    cube.rotation.y += -0.02;

    renderer.render(scene, camera);
    takenori.rotation.y += -0.01;
    takenori.rotation.z += -0.01;

    stats.update();
    controls.update();
}
tick();

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
