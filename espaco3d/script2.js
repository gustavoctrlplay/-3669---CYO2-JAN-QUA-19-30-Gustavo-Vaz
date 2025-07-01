import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)


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

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("texturas/earth.png");
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

const galaxyTexture = textureLoader.load("texturas/galaxy.png")
scene.background = galaxyTexture

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

const textureTorus = textureLoader.load("texturas/ring.png")

const geometryTorus = new THREE.TorusGeometry( 20, 3, 2, 200 ); 
const materialTorus = new THREE.MeshBasicMaterial( { map: textureTorus} ); 
const torus = new THREE.Mesh( geometryTorus, materialTorus ); 


torus.position.x = saturno.position.x
torus.rotation.x = 90
scene.add( torus );

camera.position.set(-50, 0, 300);

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
  netuno: 300
}


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
  angulo.marte += velocidades.marte 
  marte.position.x = sol.position.x + Math.cos(angulo.marte) * raios.marte 
  marte.position.z = sol.position.z + Math.sin(angulo.marte) * raios.marte 
  angulo.venus += velocidades.venus 
  venus.position.x = sol.position.x + Math.cos(angulo.venus) * raios.venus 
  venus.position.z = sol.position.z + Math.sin(angulo.venus) * raios.venus 
  angulo.mercurio += velocidades.mercurio 
  mercurio.position.x = sol.position.x + Math.cos(angulo.mercurio) * raios.mercurio 
  mercurio.position.z = sol.position.z + Math.sin(angulo.mercurio) * raios.mercurio 
  angulo.jupiter += velocidades.jupiter 
  jupiter.position.x = sol.position.x + Math.cos(angulo.jupiter) * raios.jupiter 
  jupiter.position.z = sol.position.z + Math.sin(angulo.jupiter) * raios.jupiter 
  angulo.saturno += velocidades.saturno 
  saturno.position.x = sol.position.x + Math.cos(angulo.saturno) * raios.saturno 
  saturno.position.z = sol.position.z + Math.sin(angulo.saturno) * raios.saturno 
  torus.position.x = sol.position.x + Math.cos(angulo.saturno) * raios.saturno 
  torus.position.z = sol.position.z + Math.sin(angulo.saturno) * raios.saturno 
  angulo.urano += velocidades.urano 
  urano.position.x = sol.position.x + Math.cos(angulo.urano) * raios.urano 
  urano.position.z = sol.position.z + Math.sin(angulo.urano) * raios.urano 
  angulo.netuno += velocidades.netuno 
  netuno.position.x = sol.position.x + Math.cos(angulo.netuno) * raios.netuno 
  netuno.position.z = sol.position.z + Math.sin(angulo.netuno) * raios.netuno 


  //controls.update(delta)
  if (crescendo && sol.scale.x < 80 / 30 && !diminuindo) { // 30 era o raio original
    sol.scale.multiplyScalar(1.01);
  } else if (diminuindo && sol.scale.x > 30/30) {
    sol.scale.multiplyScalar(0.99)
  } else {
    crescendo = false 
    diminuindo = false
  }


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
