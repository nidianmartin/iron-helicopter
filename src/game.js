class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = []
  }

  start() {
    // TODO: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._clearObstacles()
      this._checkCollisions()
    }, 1000 / 60)
  }

  _clearObstacles() {
    // TODO: filter only visible obstacles (call o.isVisible())
    this.obstacles = this.obstacles.filter((obst) => obst.isVisible())
  }

  _addObstacle() {
    // TODO: add new Obstacle every 100 ticks
    if (this.tick++ === 100) {
      this.tick = 0
      this.obstacles.push(new Obstacle(ctx))
    }
    
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.helicopter.draw()
    this.obstacles.forEach((obs) => {
      obs.draw()
    })
  }

  _move() {
    this.bg.move()
    this.helicopter.move()
    this.obstacles.forEach((obs) => {
      obs.move()
    })
  }

  _checkCollisions() {
    // TODO: check helicopter on floor?
    if (this.helicopter.isFloor()) {
      this._gameOver()
    }
    // TODO: iterate obstacles. check colX and colY
 

  }

  _gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}