let module = function () {

    tippy(document.getElementById("game"));


    function tippy(element) {
        let ball = document.getElementById("ball");
        let skew;

        setInterval(() => {
            checkBall();
        }, 30);

        start();

        function start() {
            element.style.transition = `.5s ease-out transform`;
            interval = setInterval(() => element.style.transform = `perspective(${skew.size}px) rotate3d(${skew.y},${skew.x},0,${skew.gipoten}deg)`, 30);
        }

        function checkBall() {
            let pos = {
                x: ball.offsetLeft + 20 - element.offsetWidth / 2,
                y: ball.offsetTop + 20 - element.offsetHeight / 2
            }

            skew = {
                size: 1000,
                x: (-pos.x / element.offsetWidth * 10) | 0,
                y: (pos.y / element.offsetHeight * 10) | 0,
                gipoten: (Math.sqrt(pos.x * pos.x + pos.y * pos.y) / 10 / 1.5) | 0
            }
        }
    }
}();


