export const Button = (target) => {
  const element = document.getElementById(target)

  const onClick = (handler) => {
    element.addEventListener('touchend', (e) => {
      e.preventDefault()
      handler(e)
    })
    element.addEventListener('mouseup', (e) => {
      e.preventDefault()
      handler(e)
    })
  }

  return {
    onClick,
  }
}
