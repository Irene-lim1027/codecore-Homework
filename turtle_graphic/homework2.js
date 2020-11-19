class Turtle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.maxX = 0
      this.maxY = 0
      this.direction = 'South'
      this.steps = []
    }
    forward(steps) {
      const dir = this.direction
      for (let i = 0; i < steps; i++) {
        if (dir === 'North') {
          this.x--
        } else if (dir === 'South') {
          this.x++
        } else if (dir === 'East') {
          this.y++
        } else if (dir === 'West') {
          this.y--
        }
        this.maxX = Math.max(Math.abs(this.x), this.maxX)
        this.maxY = Math.max(Math.abs(this.y), this.maxY)
        this.steps.push([this.x, this.y])
      }
      this.maxX++
      this.maxY++
      return this
    }
    right() {
      const dir = this.direction
      if (dir === 'South') {
        this.direction = 'West'
      } else if (dir === 'North') {
        this.direction = 'East'
      } else if (dir === 'East') {
        this.direction = 'South'
      } else if (dir === 'West') {
        this.direction = 'North'
      }
      return this
    }
    left() {
      const dir = this.direction
      if (dir === 'South') {
        this.direction = 'East'
      } else if (dir === 'North') {
        this.direction = 'West'
      } else if (dir === 'East') {
        this.direction = 'North'
      } else if (dir === 'West') {
        this.direction = 'South'
      }
      return this
    }
    print() {
      let output = []
      let string = ''
      const thisArr = (arr, item) => {
        const item_as_string = JSON.stringify(item)
        const inside = arr.some(function (element) {
          return JSON.stringify(element) === item_as_string
        })
        return inside
      }
      for (let j = -this.maxX; j < this.maxX; j++) {
        for (let i = -this.maxY; i < this.maxY; i++) {
          if (thisArr(this.steps, [j, i])) {
            string += '■'
          } else if (thisArr([[0, 0]], [j, i])) {
            string += '\u253C'
          } else if (thisArr([[0, i]], [j, i])) {
            string += '\u2500'
          } else if (thisArr([[j, 0]], [j, i])) {
            string += '\u2502'
          } else {
            string += ' '
          }
        }
        string += '\n'
      }
      console.log(string)
      return string
    }
  }
  const t = new Turtle(0, 0)
  t.forward(4).left().forward(4).left().forward(7).left().forward(20).print()