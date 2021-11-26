// 数组乱序函数 Fisher–Yates shuffle 经典洗牌算法
function shuffle(arr) {
  let _arr = arr.slice(0)
  let i = _arr.length

  while (--i) {
    let j = Math.floor(Math.random() * i)
    ;[_arr[j], _arr[i]] = [_arr[i], _arr[j]]
  }

  return _arr
}

class Timer {
  constructor(ele) {
    this.ele = ele
    this.seconds = 0
    this.id = null
    this.ele.innerHTML = this.seconds
  }

  count() {
    this.seconds += 1
    this.ele.innerHTML = this.seconds
  }

  start() {
    this.count()
    this.id = setInterval(this.count.bind(this), 1000)
  }

  stop() {
    clearInterval(this.id)
  }

  reset() {
    this.id && clearInterval(this.id)
    this.seconds = 0
    this.ele.innerHTML = this.seconds
  }
}

class Table {
  constructor(nums, size, ele, timer) {
    this.nums = nums
    this.ele = ele
    this.size = size
    this.timer = timer
    this.currentNumber = 1
    this.bindblockClickHandler = this.blockClickHandler.bind(this)
  }

  blockClickHandler(e) {
    const targetEle = e.target

    let current = Number(targetEle.dataset.number)

    if (this.currentNumber === 1) {
      this.timer.start()
    }

    if (this.currentNumber === current) {
      targetEle.style.backgroundColor = 'green'
      this.currentNumber += 1

      if (current >= this.size * this.size) {
        this.timer.stop()
        alert(`恭喜，你完成了测试，你的成绩是${this.timer.seconds}秒`)
      }
    } else {
      console.log('出错了')
    }
  }

  draw() {
    const { top } = this.ele.getClientRects()[0]
    const broswerHeight = window.innerHeight
    const tableHeight = broswerHeight - top - 20
    const blockHeight = Math.floor(tableHeight / this.size)

    const frag = document.createDocumentFragment()
    this.nums.forEach(num => {
      const divEle = document.createElement('div')
      divEle.style.width = `${blockHeight}px`
      divEle.style.height = `${blockHeight}px`
      divEle.style.display = 'flex'
      divEle.style.alignItems = 'center'
      divEle.style.justifyContent = 'center'
      divEle.style.fontSize = `${Math.floor(blockHeight / 2)}px`
      divEle.style.border = '1px solid #333'
      divEle.style.cursor = 'pointer'
      divEle.setAttribute('data-number', num)

      divEle.innerHTML = `${num}`
      frag.appendChild(divEle)
    })

    this.ele.style.width = `${tableHeight}px`
    this.ele.addEventListener('click', this.bindblockClickHandler)
    this.ele.appendChild(frag)
  }

  clearDraw() {
    // 清理
    this.ele.innerHTML = ''
    this.ele.removeEventListener('click', this.bindblockClickHandler)
    this.currentNumber = 1
    this.timer.reset()
  }
}

window.onload = function () {
  const genBtnEle = document.getElementById('gen_btn')
  const sizeInputEle = document.getElementById('size_input')
  const tableELe = document.getElementById('table')
  const timerEle = document.getElementById('timer')

  const timer = new Timer(timerEle)
  let table = null

  genBtnEle.addEventListener('click', () => {
    table && table.clearDraw()
    let size = Number(sizeInputEle.value)
    let len = size * size
    let nums = []

    for (let i = 1; i <= len; i++) {
      nums.push(i)
    }

    table = new Table(shuffle(nums), size, tableELe, timer)
    table.draw()
  })
}
