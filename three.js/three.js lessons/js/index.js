window.onload = function () {

	let width = window.innerWidth;
	let height = window.innerHeight;
	let canvas = document.getElementById('canvas');


	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	const ball = {
		rotationY: 0
	}

	const gui = new dat.GUI();
	gui.add(ball, 'rotationY').min(-0.2).max(0.2).step(0.001);

	const renderer = new THREE.WebGLRenderer({ canvas: canvas });
	renderer.setClearColor(0x000000);

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(0, 0, 1000);

	const light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

	const geometry = new THREE.SphereGeometry(300, 50, 50);
	// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

	for (let i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	function animate() {
		mesh.rotation.y += ball.rotationY;

		renderer.render(scene, camera);
		requestAnimationFrame(animate)
	}
	animate();

}