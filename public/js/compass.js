import { Button } from './components/index.js'
let isAutoCalibration = false

const init = () => {
  const autoButton = Button('auto-calibration')
  const manualButton = Button('manual-calibration')

  autoButton.onClick(startAutoCalibration)
  manualButton.onClick(manualCalibration)

  Webmo.socketClient.events.on('UDP', onSmartPhoneSensor)
}

const onSmartPhoneSensor = async (data) => {
  if (!isAutoCalibration) return
  const compass = data?.sensordata?.compass
  if (!compass) return

  isAutoCalibration = false;

  const value = compass.compass
  await Webmo.motor.resetRotation([{
    offset: Math.round(value),
  }, {
    offset: 0
  }])
  await Webmo.motor1.rotateTo({
    degree: 0,
    speed: 10,
  })
}

export const manualCalibration = async () => {
  await Webmo.motor.resetRotation()
}

export const startAutoCalibration = () => {
  isAutoCalibration = true
}

window.addEventListener('load', init)
