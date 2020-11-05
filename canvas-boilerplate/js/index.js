const container = document.getElementById("canvas-container");
const ctx = document.getElementById("canvas").getContext('2d');
setCanvasSize();


// Functions
function getRandomColor(blackness) {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16 / (blackness / 5))];
	}
	return color;
}

function setCanvasSize() {
	ctx.canvas.width = container.offsetWidth;
	ctx.canvas.height = container.offsetHeight;
}

// On resize
window.addEventListener('resize', setCanvasSize);

// Animate
function animate() {
	drawThree(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);
	drawThree(ctx.canvas.width / 2, ctx.canvas.height / 2, startAngle, depth);

	requestAnimationFrame(animate);
}
animate();
