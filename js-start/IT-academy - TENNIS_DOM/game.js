"use strict";

class Ball {
    constructor(element, speed) {

        this.ball = element;
        this.diameter = parseInt(element.style.height);
        this.radius = this.diameter / 2;

        this.speedXY = speed;
        this.speedX = Math.floor(Math.random() * 2) ? -speed / 2 : speed / 2;
        this.speedY = Math.floor(Math.random() * 2) ? -speed / 2 : speed / 2;
        this.posX = 0;
        this.posY = 0;

    }

    init(areaWidth, areaHeight) {
        this.posX = areaWidth / 2 - this.radius;
        this.posY = areaHeight / 2 - this.radius;
        this.speedX = Math.floor(Math.random() * 2) ? -this.speedXY / 2 : this.speedXY / 2;
        this.speedY = Math.floor(Math.random() * 2) ? -this.speedXY / 2 : this.speedXY / 2;
    }

    update(areaWidth, areaHeight, racquetLeftPosition, racquetRightPosition, racquetHeight) {
        let ball = this;
        ball.posX += ball.speedX;
        ball.posY += ball.speedY;
        if (ball.posX < 11) {
            //Мяч у левой ракетки
            if (ball.posY + ball.diameter > racquetLeftPosition && ball.posY < racquetLeftPosition + racquetHeight) {
                ball.speedX = -ball.speedX;
                ball.posX = 11;
            }
            //Мяч у левой стены
            if (ball.posX < 0) {
                this.ball.style.left = ball.posX + "px";
                this.ball.style.top = ball.posY + "px";
                return 'right win';
            }
        }
        if (ball.posX + ball.diameter > areaWidth - 11) {
            //Мяч у правой ракетки
            if (ball.posY + ball.diameter > racquetRightPosition && ball.posY < racquetRightPosition + racquetHeight) {
                ball.speedX = -ball.speedX;
                ball.posX = areaWidth - ball.diameter - 11;
            }
            //Мяч у правой стены
            if (ball.posX + ball.diameter > areaWidth) {
                this.ball.style.left = ball.posX + "px";
                this.ball.style.top = ball.posY + "px";
                return 'left win';
            }
        }
        //Мяч у нижней границы
        if (ball.posY + ball.diameter > areaHeight) {
            ball.speedY = -ball.speedY;
            ball.posY = areaHeight - ball.diameter;
        }
        //Мяч у верхней границы
        if (ball.posY < 0) {
            ball.speedY = -ball.speedY;
            ball.posY = 0;
        }
        this.ball.style.left = ball.posX + "px";
        this.ball.style.top = ball.posY + "px";
    }
}

class Racquets {
    constructor(racquetLeft, racquetRight, height, field) {
        this.racquetLeft = racquetLeft;
        this.racquetRight = racquetRight;
        this.racquetHeight = parseInt(field.style.height) * height;

        this.racquetLeftPosition = 0;
        this.racquetRightPosition = 0;
        this.shiftIndex = 0.025;
        this.key = {};

        window.addEventListener('keydown', (e) => {
            this.key[e.keyCode] = true;
            this.key.keyPressed = e.keyCode;
        });

        window.addEventListener('keyup', (e) => {
            this.key[e.keyCode] = false;
            this.key.keyPressed = null;
        });
    }

    init(areaHeight) {
        this.racquetLeftPosition = this.racquetRightPosition = areaHeight / 2 - this.racquetHeight / 2;
    }

    update(areaHeight) {
        if (this.key[65]) //Левая ракетка (вверх)
            if (this.racquetLeftPosition >= areaHeight * this.shiftIndex) {
                this.racquetLeftPosition -= areaHeight * this.shiftIndex;
            }
        if (this.key[90]) //Левая ракетка (вниз)
            if (this.racquetLeftPosition + this.racquetHeight <= areaHeight - areaHeight * this.shiftIndex) {
                this.racquetLeftPosition += areaHeight * this.shiftIndex;
            }
        if (this.key[38]) //Правая ракетка (вверх)
            if (this.racquetRightPosition >= areaHeight * this.shiftIndex) {
                this.racquetRightPosition -= areaHeight * this.shiftIndex;
            }
        if (this.key[40]) //Правая ракетка (вниз)
            if (this.racquetRightPosition + this.racquetHeight <= areaHeight - areaHeight * this.shiftIndex) {
                this.racquetRightPosition += areaHeight * this.shiftIndex;
            }

        this.racquetLeft.style.top = this.racquetLeftPosition + 'px';
        this.racquetRight.style.top = this.racquetRightPosition + 'px';
    }
}

class Score {
    constructor(playerLeftSpan, playerRightSpan) {
        this.playerLeftSpan = playerLeftSpan;
        this.playerRightSpan = playerRightSpan;
        this.scoreLeft = 0;
        this.scoreRight = 0;
    }
    update(state) {
        switch (state) {
            case 'right win':
                this.playerRightSpan.textContent = ++this.scoreRight;
                break;
            case 'left win':
                this.playerLeftSpan.textContent = ++this.scoreLeft;
                break;
        }
    }
}

class Tennis {
    constructor(data) {

        //vars
        let raf = undefined;
        let button = data.startButton;
        const ball = new Ball(data.ball, data.ballSpeed);
        const racquets = new Racquets(data.racquetLeft, data.racquetRight, data.racquetHeight, data.field);
        const score = new Score(data.playerLeftScore, data.playerRightScore);

        const areaWidth = parseInt(data.field.style.width);
        const areaHeight = parseInt(data.field.style.height);

        //init
        ball.init(areaWidth, areaHeight);
        racquets.init(areaHeight);
        ball.update(areaWidth, areaHeight, racquets.racquetLeftPosition, racquets.racquetRightPosition, racquets.racquetHeight);
        racquets.update(areaHeight);

        button.addEventListener('click', () => { start(); });

        function start() {
            ball.init(areaWidth, areaHeight);
            racquets.init(areaHeight);
            button.disabled = true;
            tick();
        }

        function stop() {
            raf = requestAnimationFrame(() => {
                cancelAnimationFrame(raf);
            });
            button.disabled = false;
            button.focus();
        }

        function tick() {
            switch (ball.update(areaWidth, areaHeight, racquets.racquetLeftPosition, racquets.racquetRightPosition, racquets.racquetHeight)) {
                case 'right win':
                    stop();
                    score.update('right win');
                    break;
                case 'left win':
                    stop();
                    score.update('left win');
                    break;
            }
            racquets.update(areaHeight);
            raf = requestAnimationFrame(tick);
        }
    }
}