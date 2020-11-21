export function finMinIndex(arr) {
  let min = 0
  for (let i = 1;i < arr.length;i++) {
    if (arr[i] < arr[min]) min = i
  }
  return min
}

export function getDefaultArr(colNum = 1, arr = [], initail = () => 0) {
  if (arr.length < colNum) {
    arr.push(initail())
    return getDefaultArr(colNum, arr, initail)
  }
  return arr
}

export function autoUnit(unit) {
  return /^\d*$/.test(unit) ? `${unit}px` : unit
}