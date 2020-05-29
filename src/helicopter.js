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
    this.g = 0.1

    this.actions = {
      right: false,
      left: false,
      up: false,
      shoot: false
    }

    this.img = new Image()
    this.img.src = "https://2.bp.blogspot.com/-P6ZbLE-rnFM/WPTQh65UtMI/AAAAAAAABF8/9iYl-cIUEtIhj2JDTixyqZNeBn183AdmQCLcB/s1600/helicopter-spritesheet.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.weapon = new Weapon(this)

    this._setListeners()
  }

  draw() {
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
    );

    this.weapon.draw()
  }

  isFloor() {
    return this.y + this.h >= this.ctx.canvas.height * 0.95
  }

  move() {
    this._animate()
    this._applyActions()

    this.vx += this.ax
    this.vy += this.ay
    this.vy += this.g
    this.x += this.vx
    this.y += this.vy

    this.weapon.move()
  }

  _animate() {
    if (this.ay === 0) {
      this.img.frameIndex = 0
      return
    }

    if (this.tick++ >= 5) {
      this.tick = 0
      this.img.frameIndex++
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _setListeners() {
    document.onkeydown = e => this._switchAction(e.keyCode, true)
    document.onkeyup = e => this._switchAction(e.keyCode, false)
  }

  _applyActions() {
    this.ay = this.actions.up ? -0.2 : 0

    if (this.actions.right) {
      this.ax = 0.2
    } else if (this.actions.left) {
      this.ax = -0.2
    } else {
      this.ax = 0
    }

    if (this.actions.shoot) {
      this.weapon.shoot()
    }
  }

  _switchAction(key, apply) {
    switch (key) {
      case LEFT:
        this.actions.left = apply
        break;
      case RIGHT:
        this.actions.right = apply
        break;
      case UP:
        this.actions.up = apply
        break;
      case SPACE:
        this.actions.shoot = apply
        break;
    }
  }
}
