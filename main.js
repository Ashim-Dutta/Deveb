import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragments.glsl';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setSize(window.innerWidth - 5, window.innerHeight - 5);

// Create icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(1.2,50,50);

// Create shader material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 }
  }
});





// Create mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.y=-2;
// Position camera
camera.position.z =3;

var tl=gsap.timeline({
  scrollTrigger:{
    trigger:".landing-page",
    start:"top top",
    end:"bottom center",
    scrub:2,
  }
});

tl.to(mesh.position,{
    y:0,
    Z:-2,
    ease:"power2.inOut",
  },
  "a").to(
    material.uniforms.uColorChange,
    {
      value:1,
      ease:"power2.inOut",
    },
    "a"
  
).to(".landing-page h1",{
  opacity:0,
},"a").to(".landing-page p",{
  opacity:1,
  
});



// Animation loop
const clock = new THREE.Clock();

function animate() {
 requestAnimationFrame(animate);
 material.uniforms.uTime.value=clock.getElapsedTime();
 renderer.render(scene,camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
