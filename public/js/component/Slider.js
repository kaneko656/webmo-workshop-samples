export const Slider = ({ target, isSeamless }) => {
  const sliderInput = document.getElementById(target)
  const data = {
    value: sliderInput.value
  }

  const handle = (handler) => {
    sliderInput.addEventListener(isSeamless ? 'input' : 'change', (e) => {
      data.value = e.target.value
      handler(speedValidator(e.target.value))
    })
  }

  const update = (updateValue) => {
    sliderInput.value = updateValue
    data.value = updateValue
  }

  return {
    update,
    handle,
    data,
  }
}

const speedValidator = (speed) => {
  return Number(speed)
}