// 节流函数
export function throttle(fn, time = 300) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入一个函数作为参数')
  }

  let startTime = new Date()

  return () => {
    const currentTime = new Date()
    if (currentTime - startTime > time) {
      startTime = currentTime
      fn()
    }
  }
}

// 防抖函数
export function debounce(fn, time = 300) {
  if (typeof fn !== 'function') {
    throw new Error('必须传入一个函数作为参数')
  }

  let timer

  return () => {
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      fn()
    }, time)
  }
}
