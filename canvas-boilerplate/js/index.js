const GUI = new dat.GUI();
const options = GUI.addFolder('Options');
options.open();

let params = {
	multiplier: 0.8,
	step: 0
};
options.add(params, 'multiplier', 0, 1, 0.1);
options.add(params, 'step', -3, 3, 1);


const container = document.getElementById("canvas-container");
const ctx = document.getElementById("canvas").getContext('2d');
setCanvasSize();

// Functions
function setCanvasSize() {
	ctx.canvas.width = container.offsetWidth;
	ctx.canvas.height = container.offsetHeight;
}

function getRandomColor() {
	var letters = '56789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function drawSin(x1, x2, y1) {
	ctx.beginPath();

	while (x1 < x2) {
		ctx.strokeStyle = getRandomColor();

		x1 += 0.06; //Плотность рисунка (!!!)
		y1 += Math.cos(x1 * params.multiplier * Math.sin(mov)); //Высота основной синусоиды
		ctx.lineTo(x1, y1);

		x1 += Math.sin(y1 * mov);
		y1 += Math.sin(x1);
		ctx.lineTo(x1, y1);
	}

	ctx.stroke();
	ctx.closePath();
}

// On resize
window.addEventListener('resize', setCanvasSize);

// Animate
let mov = 10;
function animate() {
	
	mov += 0.01;
	console.log(mov);
	
	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.putImageData(imageData, 0, 1 + params.step);
	
	drawSin(0, ctx.canvas.width, ctx.canvas.height / 2);
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// ctx.globalAlpha = 0.05;
	ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

	requestAnimationFrame(animate);
}
animate();
