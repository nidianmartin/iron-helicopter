class Helicopter {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = 100
    this.y = 0

    this.w = 100
    this.h = 40

    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.ax = 0
    this.g = 0.05

    this.img = new Image()
    this.img.src = "https://2.bp.blogspot.com/-P6ZbLE-rnFM/WPTQh65UtMI/AAAAAAAABF8/9iYl-cIUEtIhj2JDTixyqZNeBn183AdmQCLcB/s1600/helicopter-spritesheet.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.weapon = new Weapon(this)

    this._setListeners()
  }

  draw() {
    // TODO: draw helicopter image
    this.ctx.drawImage(
      this.img,
      0,
      this.img.frameIndex * this.img.height / this.img.frames,
      this.img.width,
      this.img.height / this.img.frames,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.weapon.draw()
  }

  isFloor() {
    // TODO: check if floor
  }

  move() {
    // TODO: move
    this.vy += this.ay;
    this.vy += this.g;
    this.vx += this.ax;

    this.y += this.vy;
    this.x += this.vx;

    if (this.y + this.h >= this.ctx.canvas.height) {
      // this.y = this.ctx.canvas.height - this.h;
    }

    if (this.y <= 0) {
      // this.y = 0;
    }

    if (this.ay) {
      this._animate()
    }
  }

  _animate() {
    if (this.img.frameIndex++ >= 3) {
      this.img.frameIndex = 0
    }
  }

  _setListeners() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === UP) {
        this.ay = -0.2
      } else if (e.keyCode === RIGHT) {
        this.ax = 0.2
      } else if (e.keyCode === LEFT) {
        this.ax = -0.2
      } else if (e.keyCode === SPACE) {
        this.weapon.shoot()
      }
    })

    document.addEventListener('keyup', e => {
      if (e.keyCode === UP) {
        this.ay = 0
      } else if (e.keyCode === RIGHT) {
        this.ax = 0
      } else if (e.keyCode === LEFT) {
        this.ax = 0
      }
    })
  }
}