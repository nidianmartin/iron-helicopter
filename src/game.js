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
    this._runAnimationLoop()
  }

  _runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._checkCollisions()
      this._clearObstacles()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60)
  }

  _clearObstacles() {
    this.obstacles = this.obstacles.filter(o => o.isVisible())
  }

  _addObstacle() {
    if (this.tick % 100) return

    this.obstacles.push(new Obstacle(this.ctx))
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.helicopter.draw()
    this.obstacles.forEach(o => o.draw())
  }

  _move() {
    this.bg.move()
    this.helicopter.move()
    this.obstacles.forEach(o => o.move())
  }

  _checkCollisions() {
    const col = (
      this.obstacles.some(o => o.collide(this.helicopter)) ||
      this.helicopter.isFloor()
    )

    if (col) {
      this._gameOver()
    }
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