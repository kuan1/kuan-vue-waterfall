function preload(img) {
  if (img.complete) return Promise.resolve(true)
  return new Promise(resolve => {
    img.onload = resolve
    img.onerror = resolve
  })
}

export default (images) => {
  return Promise.all(
    [...images].map(img => preload(img))
  )
}