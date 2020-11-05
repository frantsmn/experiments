document.querySelectorAll("div.tippy").forEach((element) => {
    tippy(element);
});

function tippy(element) {
    let skew;
    let interval;

    element.addEventListener('mouseover', start);
    element.addEventListener('mousemove', checkCursor);

    function start() {

        element.style.transition = `.3s ease-out transform`
        let startDelay = setTimeout(() => {
            interval = setInterval(() =>
                element.style.transform = `perspective(${skew.size}px) rotate3d(${skew.y},${skew.x},0,${skew.gipoten}deg)`
                , 50);
        }, 50);
        element.addEventListener('mouseout', () => {
            element.style.transition = `.5s ease-in transform`;
            element.style.transform = `perspective(0) rotate3d(0,0,0,0deg)`;
            clearInterval(interval);
            clearTimeout(startDelay);
        });
    }

    function checkCursor(e) {
        let pos = {
            x: (e.pageX - this.offsetLeft) - this.offsetWidth / 2,
            y: (e.pageY - this.offsetTop) - this.offsetHeight / 2
        }

        skew = {
            size: this.offsetWidth + this.offsetHeight,
            x: (pos.x / this.offsetWidth * 10) | 0,
            y: (-pos.y / this.offsetHeight * 10) | 0,
            gipoten: (Math.sqrt(pos.x * pos.x + pos.y * pos.y) / 10 / 1.2) | 0
        }
    }
}
