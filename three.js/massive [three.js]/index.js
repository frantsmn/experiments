import * as THREE from 'http://three/build/three.module.js';
import { OrbitControls } from 'http://three/jsm/controls/OrbitControls.js';
import { TWEEN } from 'http://three/jsm/libs/tween.module.min.js';

import Timeline from './timeline.js';


new Timeline({
	element: document.getElementById('section-2'),
	throttle: 10,
	onChange: (p) => {
		document.getElementById('section-2').style.transform = `rotateY(${p - 50}deg) rotateX(${-p - 50}deg) translateZ(${-p}px)`;
		document.getElementById('section-2').style.perspective = `${ p-50}px`
	}
});

const container = document.getElementById('canvas-container');
let camera, scene, renderer, controls, raycaster, mouse, intersects;
let tween = new TWEEN.Tween();
let group;
let startCameraPosition = new THREE.Vector3();


let outputX = document.getElementById('info-x');
let outputY = document.getElementById('info-y');
let outputScrollY = document.getElementById('scroll-y');

let scrollHeight = document.body.scrollHeight;
let scrollY = window.scrollY;


function throttle(callback, limit) {
	var waiting = false;                      // Initially, we're not waiting
	return function () {                      // We return a throttled function
		if (!waiting) {                       // If we're not waiting
			callback.apply(this, arguments);  // Execute users function
			waiting = true;                   // Prevent future invocations
			setTimeout(function () {          // After a period of time
				waiting = false;              // And allow future invocations
			}, limit);
		}
	}
}

function onScroll() {
	outputScrollY.value = scrollY = window.scrollY;

	let v3 = new THREE.Vector3();
	v3.y = startCameraPosition.y - scrollY * 0.001;

	new TWEEN.Tween(camera.position)
		.to(v3, 2000)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}
let debouncedOnScroll = throttle(onScroll, 500);

// init();
// animate();

function createCube() {
	const box = new THREE.Mesh(
		new THREE.BoxGeometry(0.2, 0.2, 0.2),
		new THREE.MeshNormalMaterial({ opacity: 0.2, transparent: true })
	);
	return box;
}

function createGroup() {
	let group = new THREE.Group();
	for (let indexZ = -6; indexZ < 7; indexZ++) {
		for (let indexX = -13; indexX < 14; indexX++) {
			let cube = createCube();
			cube.translateX(0.3 * indexX);
			cube.translateZ(0.3 * indexZ);
			group.add(cube);
		}
	}
	return group;
}

function groupLookAt(group, vector3) {
	group.traverse(
		mesh => {
			if (mesh.type === 'Mesh') {
				mesh.lookAt(vector3)
			}
		}

	);

}

function onMouseMove(event) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	outputX.value = mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	outputY.value = mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	const vector3 = new THREE.Vector3(mouse.x * 3, 1, -mouse.y * 3)

	groupLookAt(group, vector3);
}
// window.addEventListener('mousemove', onMouseMove, false);
// window.addEventListener('scroll', debouncedOnScroll, false);


function init() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 20);
	camera.position.y = 5;
	startCameraPosition.clone(camera.position);
	startCameraPosition.y = 5;
	console.log('stp', startCameraPosition);

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColor(0x000000, 1); //Фоновый цвет
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);


	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	//#region HELPERS
	const size = 0.3 * 100;
	const divisions = 100;

	const gridHelper = new THREE.GridHelper(size, divisions, 0x333333, 0x111111);
	scene.add(gridHelper);

	scene.add(new THREE.AxesHelper(5));
	//#endregion


	//#region CONTROLS
	window.controls = controls = new OrbitControls(camera, renderer.domElement);
	// controls.enabled = false;
	//#endregion


	group = createGroup();
	scene.add(group);
}

//#region ON WINDOW RESIZE
// window.addEventListener('resize', () => {
// 	camera.aspect = container.offsetWidth / container.offsetHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(container.offsetWidth, container.offsetHeight);
// }, false);
//#endregion

function animate() {

	requestAnimationFrame(animate);

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	intersects = raycaster.intersectObjects(scene.children);


	TWEEN.update();

	controls.update();
	renderer.render(scene, camera);

}