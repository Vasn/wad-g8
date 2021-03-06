import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js";

export var scene5 = new THREE.Scene();
const loader = new GLTFLoader();
var obj;
loader.load("objects/spotifylogo.gltf", function (gltf) {
    obj = gltf.scene;
    var material = new THREE.MeshBasicMaterial( {color: 0x33ff4e} );
    obj = new THREE.Mesh(obj, material);
    scene5.add(gltf.scene);
});
scene5.background = new THREE.Color(0x27E576);

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2, 60, 100);
light.target.position.set(0, 0, 0);
scene5.add(light);
scene5.add(light.target);

export function scaleSpotify(scale) {
    if (scale > 0.75) {
        scene5.scale.set (scale, scale, scale)
    }
}

export function scaleBigSpotify() {
    scene5.scale.x += 0.1
    scene5.scale.y += 0.1
    scene5.scale.z += 0.1
}

export function scaleSmallSpotify() {
    scene5.scale.x -= 0.1
    scene5.scale.y -= 0.1
    scene5.scale.z -= 0.1
}