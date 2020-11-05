function Snake(obj) {
  var area = document.getElementById(obj.containerId);
  var feildSize = obj.feildSize;
  var feild = createFeild(feildSize);
  var speed = obj.speed;
  var winscore = obj.winScore;
  var score = new Score();

  var tickInterval;
  var keyQueue = [];
  var lastKey = "ArrowUp";
  var gamePaused = true;
  var gameStarted = false;

  area.addEventListener('keydown', function(e) {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
      case "ArrowDown":
      case "ArrowRight":
        if (keyQueue.length < 3 && e.key != lastKey && !gamePaused) {
          keyQueue.push(e.key);
          lastKey = e.key;
        }
        break;
      case "Enter":
        if (gamePaused)
          newGame();
        break;
      default:
        if (gameStarted)
          pauseGame();
    }
  });

  area.addEventListener('focusout', function() {
    pauseGame(true, area.dataset.instruction_text);
  });

  function createFeild(size) {
    var f = document.createElement('div');
    f.classList.add('feild');

    for (var i = 0; i < size; i++) {
      var row = document.createElement('div');
      row.classList.add("row");
      for (var j = 0; j < size; j++) {
        var cell = document.createElement('div');
        cell.classList.add("cell");
        cell.innerHTML = "<span></span>";
        row.appendChild(cell);
      }

      area.dataset.welcome_text = "Snake";
      area.dataset.instruction_text = "Enter: New game\n\nSpace: Play/Pause\n\nArrow keys: Control";
      area.setAttribute("tabindex", "-1");
      area.classList.add('game-snake', 'paused');

      f.appendChild(row);
    }

    area.appendChild(f);
    return f;
  }

  function pauseGame(bool, instruction_text) {
    if (bool) {
      clearInterval(tickInterval);
      area.classList.add("paused");
      area.dataset.instruction_text = instruction_text;
      gamePaused = true;
      keyQueue.length = 0;
    } else {
      if (!gamePaused) {
        clearInterval(tickInterval);
        area.classList.add("paused");
        area.dataset.instruction_text = "[Pause]\n\nEnter: New game\n\nSpace: Play/Pause";
      }
      if (gamePaused) {
        tickInterval = setInterval(tick, speed);
        area.classList.remove("paused");
        keyQueue.length = 0;
      }
      gamePaused = !gamePaused;
    }
  }

  function newGame() {
    gamePaused = false;
    gameStarted = true;
    area.classList.remove("paused");
    for (var i = 0; i < feild.getElementsByClassName("cell").length; i++)
      feild.getElementsByClassName("cell")[i].classList.remove("apple", "snake", "head", "tail", "boom");
    keyQueue.length = 0;
    lastKey = "ArrowUp";
    apple = new Apple();
    snake = new Snake();
    apple.draw();
    snake.draw(lastKey);
    score.reset();
    clearInterval(tickInterval);
    tickInterval = setInterval(tick, speed);
  }

  function tick() {
    var key = keyQueue.length != 0 ? keyQueue.shift() : lastKey;
    if (winscore === score.val)
    {
      clearInterval(tickInterval);
      gameStarted = false;
      gamePaused = true;
      area.dataset.instruction_text = "[You win!]\n\nYour score: " + score.val + "\n\nEnter: Start new game";
      area.classList.add("paused");
    }
    else
    if (snake.move(key) != "gameover") {
      snake.draw(lastKey);
    } else {
      //GameOver
      clearInterval(tickInterval);
      gameStarted = false;
      gamePaused = true;
      area.dataset.instruction_text = "[Game Over]\n\nYour score: " + score.val + "\n\nEnter: Start new game";
      area.classList.add("paused");
    }
  }

  function Score() {
    this.el = document.createElement('div');
    this.el.classList.add('score');
    area.insertBefore(this.el, feild);

    this.reset = function() {
      this.el.innerHTML = this.val = 0;
    }
    this.add = function() {
      this.el.innerHTML = ++this.val;
    }
  }

  function Apple() {
    this.draw = function() {
      this.row = Math.floor(Math.random() * feildSize);
      this.col = Math.floor(Math.random() * feildSize);
      var cell = feild.getElementsByClassName("row")[this.row]
        .getElementsByClassName("cell")[this.col];

      if (cell.classList.contains('snake') || cell.classList.contains('apple')) {
        //console.log("Apple was spawned under snake/apple!");
        apple.draw();
      } else {
        if (feild.querySelector('.apple') !== null)
          feild.getElementsByClassName("apple")[0].classList.remove("apple");
        feild.getElementsByClassName("row")[this.row]
          .getElementsByClassName("cell")[this.col]
          .classList.add("apple");
        return;
      }
    }
  }

  function Snake() {
    this.coords = [{
      row: Math.floor(feildSize / 2) + 1,
      col: Math.floor(feildSize / 2)
    }, {
      row: Math.floor(feildSize / 2) + 2,
      col: Math.floor(feildSize / 2)
    }];

    this.last_direction = "ArrowUp";

    this.draw = function(key) {

      if (feild.querySelector('.snake') == null) {
        for (var i = 0; i < this.coords.length; i++) {
          feild.getElementsByClassName("row")[this.coords[i].row]
            .getElementsByClassName("cell")[this.coords[i].col]
            .classList.add("snake");
          if (i === 0) {
            feild.getElementsByClassName("row")[this.coords[i].row]
              .getElementsByClassName("cell")[this.coords[i].col]
              .classList.add("head");
          }
          if (i === this.coords.length - 1) {
            feild.getElementsByClassName("row")[this.coords[i].row]
              .getElementsByClassName("cell")[this.coords[i].col]
              .classList.add("tail");
          }
        }
      } else {
        feild.getElementsByClassName("head")[0].classList.remove("head");
        feild.getElementsByClassName("row")[this.coords[0].row]
          .getElementsByClassName("cell")[this.coords[0].col]
          .classList.add("head", "snake");

        feild.getElementsByClassName("tail")[0].classList.remove("tail", "snake");
        feild.getElementsByClassName("row")[this.coords[this.coords.length - 1].row]
          .getElementsByClassName("cell")[this.coords[this.coords.length - 1].col]
          .classList.add("tail");
      }
    }

    this.move = function(key) {
      //Preventing backward movings
      if (snake.last_direction === "ArrowLeft" & key === "ArrowRight" || snake.last_direction === "ArrowRight" & key === "ArrowLeft" || snake.last_direction === "ArrowUp" & key === "ArrowDown" || snake.last_direction === "ArrowDown" & key === "ArrowUp") {
        key = snake.last_direction;
      }

      var row = this.coords[0].row;
      var col = this.coords[0].col;

      switch (key) {
        case "ArrowUp":
          switch (this.check_cell(row - 1, col)) {
            case "apple":
              this.coords.unshift({
                row: row - 1,
                col: col
              });
              apple.draw();
              score.add();
              break;
            case "snake":
              feild.getElementsByClassName("row")[row - 1]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            case "wall":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            default:
              this.coords.unshift({
                row: row - 1,
                col: col
              });
              this.coords.pop();
          }
          break;

        case "ArrowDown":
          switch (this.check_cell(row + 1, col)) {
            case "apple":
              this.coords.unshift({
                row: row + 1,
                col: col
              });
              apple.draw();
              score.add();
              break;
            case "snake":
              feild.getElementsByClassName("row")[row + 1]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            case "wall":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            default:
              this.coords.unshift({
                row: row + 1,
                col: col
              });
              this.coords.pop();
          }
          break;

        case "ArrowLeft":
          switch (this.check_cell(row, col - 1)) {
            case "apple":
              this.coords.unshift({
                row: row,
                col: col - 1
              });
              apple.draw();
              score.add();
              break;
            case "snake":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col - 1]
                .classList.add("boom");
              return "gameover";
            case "wall":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            default:
              this.coords.unshift({
                row: row,
                col: col - 1
              });
              this.coords.pop();
          }
          break;

        case "ArrowRight":
          switch (this.check_cell(row, col + 1)) {
            case "apple":
              this.coords.unshift({
                row: row,
                col: col + 1
              });
              apple.draw();
              score.add();
              break;
            case "snake":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col + 1]
                .classList.add("boom");
              return "gameover";
            case "wall":
              feild.getElementsByClassName("row")[row]
                .getElementsByClassName("cell")[col]
                .classList.add("boom");
              return "gameover";
            default:
              this.coords.unshift({
                row: row,
                col: col + 1
              });
              this.coords.pop();
          }
          break;
      }
      snake.last_direction = key;
    }

    this.check_cell = function(row, col) {
      //apple
      if (row === apple.row && col === apple.col)
        return "apple";
      //wall
      if (row < 0 || row > feildSize - 1 || col < 0 || col > feildSize - 1)
        return "wall";
      //snake
      if (feild.getElementsByClassName("row")[row]
        .getElementsByClassName("cell")[col]
        .classList.contains('snake'))
        return "snake";
    }
  }
}
