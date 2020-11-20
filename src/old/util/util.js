// 节流函数
let startTime = new Date()
export function throttle(fn, time = 100) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入一个函数作为参数')
  }
  const currentTime = new Date()
  if (currentTime - startTime > time) {
    startTime = currentTime
    fn()
  }
}

// 防抖函数
let timer
export function debounce(fn, time = 100) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入一个函数作为参数')
  }
  timer && clearTimeout(timer)

  timer = setTimeout(() => {
    fn()
  }, time)
}
