import { Tile } from './component/index.js'

let selectedCelestial = 'sun'
let selectedCallback = () => {}

export const getSelectedCelestial = () => selectedCelestial

export const onSelected = (callback) => {
  selectedCallback = callback
}

const init = () => {
  Tile({
    targets: '.celestial-image',
    addClass: 'checked-image',
    onClick: (data) => {
        selectedCelestial = data.id
        selectedCallback()
    },
  })
}

window.addEventListener('load', init)
