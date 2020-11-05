const container = document.getElementById("canvas-container");
const ctx = document.getElementById("canvas").getContext('2d');
setCanvasSize();

let deg2rad1 = Math.PI / 1; // Градусы в радианы
let deg2rad2 = Math.PI / 90; // Градусы в радианы

const depth = 8; // Глубина рекурсии
const step = 10; // Коэффициент масштабирования

let startAngle = 180;

const slopeAngle = 180; // Угол разворота ветвей

// Functions
function drawThree1(x1, y1, angle, depth) {
	ctx.strokeStyle = getRandomColor(depth);

	if (depth) {
		const x2 = x1 + (Math.cos(angle * deg2rad1) * depth * step);
		const y2 = y1 + (Math.sin(angle * deg2rad2) * depth * step);
		drawLine(x1, y1, x2, y2);
		drawThree1(x2, y2, angle + slopeAngle, depth - 1);
		drawThree1(x2, y2, angle - slopeAngle, depth - 1);
	}
}

function drawThree2(x1, y1, angle, depth) {
	ctx.strokeStyle = getRandomColor(depth);

	if (depth) {
		const x2 = x1 + (Math.sin(angle * deg2rad1) * depth * step);
		const y2 = y1 + (Math.cos(angle * deg2rad2) * depth * step);
		drawLine(x1, y1, x2, y2);
		drawThree2(x2, y2, angle + slopeAngle, depth - 1);
		drawThree2(x2, y2, angle - slopeAngle, depth - 1);
	}
}

function drawThree3(x1, y1, angle, depth) {
	ctx.strokeStyle = getRandomColor(depth);

	if (depth) {
		const x2 = x1 - (Math.cos(angle * deg2rad1) * depth * step);
		const y2 = y1 - (Math.sin(angle * deg2rad2) * depth * step);
		drawLine(x1, y1, x2, y2);
		drawThree3(x2, y2, angle + slopeAngle, depth - 1);
		drawThree3(x2, y2, angle - slopeAngle, depth - 1);
	}
}

function drawThree4(x1, y1, angle, depth) {
	ctx.strokeStyle = getRandomColor(depth);

	if (depth) {
		const x2 = x1 - (Math.sin(angle * deg2rad1) * depth * step);
		const y2 = y1 - (Math.cos(angle * deg2rad2) * depth * step);
		drawLine(x1, y1, x2, y2);
		drawThree4(x2, y2, angle + slopeAngle, depth - 1);
		drawThree4(x2, y2, angle - slopeAngle, depth - 1);
	}
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath(); //начать
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath(); //закончить
	ctx.stroke(); //отобразить
}

function getRandomColor(blackness) {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16 / (blackness / 1))];
	}
	return color;
}

function setCanvasSize() {
	ctx.canvas.width = container.offsetWidth;
	ctx.canvas.height = container.offsetHeight;
}

// On resize
window.addEventListener('resize', setCanvasSize);
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// Animate
function animate() {
	drawThree1(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);
	drawThree2(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);
	drawThree3(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);
	drawThree4(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);

	requestAnimationFrame(() => {
		ctx.globalAlpha = 0.1;
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		deg2rad1 -= 0.000025;
		deg2rad2 += 0.000025;

		animate()
	});
}
animate();
