import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let { BASE_URL } = import.meta.env
if (BASE_URL === '/') {
    BASE_URL = window.location.origin
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio || 1);

// controls
const  controls = new OrbitControls( camera, renderer.domElement );

const pointLight = new THREE.PointLight( 0xffffff, 200 );
scene.add( pointLight );

document.body.appendChild( renderer.domElement );

const resizeView = () => {
    const { innerHeight, innerWidth } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
};


// Immediate resize makes stuff laggy.
// Add debouncing to improve the UX
let resizeTimeout = null;
const RESIZE_DEBOUNCE_DELAY_MS = 50;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeView, RESIZE_DEBOUNCE_DELAY_MS);
});

// const background = new THREE.TextureLoader().load(`${BASE_URL}/space.jpeg`, function() {
//     background.wrapS = THREE.RepeatWrapping;
//     background.wrapT = THREE.RepeatWrapping;
//     background.repeat.set( 1, 1 );

//     scene.background = background;
// });

// const refractionCube = new THREE.CubeTextureLoader().load( [
//     `${BASE_URL}/bkg/blue/bkg1_front.png`,
//     `${BASE_URL}/bkg/blue/bkg1_back.png`,
    
//     `${BASE_URL}/bkg/blue/bkg1_top.png`,
//     `${BASE_URL}/bkg/blue/bkg1_bot.png`,
    
//     `${BASE_URL}/bkg/blue/bkg1_left.png`,
//     `${BASE_URL}/bkg/blue/bkg1_right.png`,
// ] , function() {
//     console.log(`asd`)
//     refractionCube.mapping = THREE.CubeRefractionMapping;
//     scene.background = refractionCube;
// });

const refractionCube = new THREE.CubeTextureLoader().load( [
    `${BASE_URL}/skybox/front.png`,
    `${BASE_URL}/skybox/back.png`,

    `${BASE_URL}/skybox/top.png`,
    `${BASE_URL}/skybox/bottom.png`,

    `${BASE_URL}/skybox/left.png`,
    `${BASE_URL}/skybox/right.png`,
    
] , function() {
    console.log(`asd`)
    refractionCube.mapping = THREE.CubeRefractionMapping;
    scene.background = refractionCube;
});

// load a texture, set wrap mode to repeat
const texture = new THREE.TextureLoader().load( `${BASE_URL}/texture.jpeg` , function() {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    const geometry = new THREE.SphereGeometry( 2, 64, 16 );
    geometry.computeVertexNormals(true);
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    const moonGeometry = new THREE.SphereGeometry( 0.5, 64, 16 );
    geometry.computeVertexNormals(true);
    const moon = new THREE.Mesh( moonGeometry, material );
    scene.add( moon );

    camera.position.z = 10;

    function animate(msTime) {
        const time = msTime/1000;

        // sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.005;

        moon.position.x = Math.cos( time ) * 5;
		moon.position.y = Math.sin( time ) * 5;
		moon.position.z = Math.sin( time ) * 5;
        moon.rotation.y -= 0.01;

        renderer.render( scene, camera );
    }

    renderer.setAnimationLoop(animate)
});

