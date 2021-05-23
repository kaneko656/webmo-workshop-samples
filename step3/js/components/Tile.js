export const Tile = ({ targets, addClass, onClick }) => {
  const elements = document.querySelectorAll(targets)

  elements.forEach((element) => {
    element.addEventListener('touchend', (e) => {
      e.preventDefault()
      elements.forEach((element) => element.classList.remove(addClass))
      e.target.classList.add(addClass)
      onClick(e.target.dataset)
    })
    element.addEventListener('mouseup', (e) => {
      e.preventDefault()
      elements.forEach((element) => element.classList.remove(addClass))
      e.target.classList.add(addClass)
      onClick(e.target.dataset)
    })
  })
}
