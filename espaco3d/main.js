import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

const btnAgora = document.getElementById('agora')
const btnFuturo = document.getElementById('futuro')

let crescendo = false;
let diminuindo = false;

btnFuturo.addEventListener("click", () => {
  crescendo = true;
  const novaTextura = textureLoader.load("texturas/solVermelho.png")
  sol.material.map = novaTextura 
  sol.material.needsUpdate = true
});
btnAgora.addEventListener("click", () => {
  diminuindo = true;
  const novaTextura = textureLoader.load("texturas/sun.png")
  sol.material.map = novaTextura 
  sol.material.needsUpdate = true
});

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("texturas/earth.png");
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

const geometry1 = new THREE.SphereGeometry(5);
const sphere1 = new THREE.Mesh(geometry1, earthMaterial);
sphere1.position.x = 10;
scene.add(sphere1);

const fabricaDePlanetas = (tamanho, textura, posicaoX) => {
  const geometry = new THREE.SphereGeometry(tamanho);
  const texture = textureLoader.load(textura);
  const material = new THREE.MeshBasicMaterial({ map : texture });

  const planeta = new THREE.Mesh(geometry, material);
  planeta.position.x = posicaoX;
  return planeta;
}
const marte = fabricaDePlanetas(4, "texturas/mars.png", 30);
const venus = fabricaDePlanetas(4, "texturas/venus.png", -10);
const mercurio = fabricaDePlanetas(3, "texturas/mercury.png", -20);
const jupiter = fabricaDePlanetas(15, "texturas/jupiter.png", 60);
const saturno = fabricaDePlanetas(13, "texturas/saturn.png", 130);
const urano = fabricaDePlanetas(10, "texturas/uranus.png", 200);
const netuno = fabricaDePlanetas(10, "texturas/neptune.png", 240);
const sol = fabricaDePlanetas(30, "texturas/sun.png", -60);
scene.add(marte, venus, mercurio, jupiter, saturno, urano, netuno, sol);



camera.position.set(-50, 0, 100);

let angulo = {
  terra: 0,
  marte: 0,
  venus: 0,
  mercurio: 0,
  jupiter: 0,
  saturno: 0,
  urano: 0,
  netuno: 0,
}

const velocidades = {
  terra: 0.01,
  marte: 0.008,
  venus: 0.015,
  mercurio: 0.02,
  jupiter: 0.005,
  saturno: 0.003,
  urano: 0.002,
  netuno: 0.0015
}

const raios = {
  terra: 70, 
  marte: 100,
  venus: 50, 
  mercurio: 35,
  jupiter: 150,
  saturno: 200,
  urano: 250,
  neturno: 300
}

const galaxyTexture = textureLoader.load("texturas/fundoGalaxia.png")
scene.background = galaxyTexture

const controls = new FirstPersonControls(camera, renderer.domElement)
controls.lookSpeed = 0.1
controls.movementSpeed = 20 
controls.lookVertical = true 

let clock = new THREE.Clock()


function animate() {
  const delta = clock.getDelta()

  angulo.terra += velocidades.terra 
  sphere1.position.x = sol.position.x + Math.cos(angulo.terra) * raios.terra 
  sphere1.position.z = sol.position.z + Math.sin(angulo.terra) * raios.terra 


  //controls.update(delta)



  sphere1.rotation.y += 0.01;
  marte.rotation.y += 0.01;
  venus.rotation.y += 0.01
  mercurio.rotation.y += 0.01
  jupiter.rotation.y += 0.01
  saturno.rotation.y += 0.01
  urano.rotation.y += 0.01
  sol.rotation.y += 0.01
  netuno.rotation.y += 0.01
  renderer.render(scene, camera);
}
