export const Text = (target) => {
  const element = document.getElementById(target)
  element.style.transition = '0.4s'
  if (element.textContent === '') element.style.opacity = 0

  const update = ({ text, href }) => {
    if (text === '') element.style.opacity = 0
    else if (text !== undefined) {
      element.textContent = text
      element.style.opacity = 1
    }

    if (href !== undefined) element.href = href
  }

  return { update }
}
