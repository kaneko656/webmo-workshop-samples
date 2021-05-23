import { Slider, Text, Button } from './component/index.js'

export const timeInterval = 0.1 // 単位: 秒
export const callbackInterval = 3 // 単位: 秒
let date = new Date()
let isStart = false
let speed = 1
let timeChangedCallback = () => {}


export const getTime = () => date

export const getNextTime = () => new Date(date.getTime() + speed * timeInterval * 1000)
export const getPreCallBackTime = () => new Date(date.getTime() - speed * callbackInterval * 1000)

export const onTimeChanged = (callback) => {
  timeChangedCallback = callback
}

const init = () => {
  const timeLabel = Text('time-label')
  const speedLabel = Text('speed-label')
  const toCurrentTimeButton = Button('to-current-time')
  const startButton = Button('start')
  const stopButton = Button('stop')
  const slider = Slider({
    target: 'speed-slider',
    isSeamless: true,
  })

  const speedUpdate = (speed) => {
    speedLabel.update({
      text: toSpeedText(speed),
    })
  }

  const timeUpdate = (date) => {
    timeLabel.update({
      text: `${date.toLocaleString()}`,
    })
  }

  slider.handle((value) => {
    speed = value
    speedUpdate(speed)
  })

  toCurrentTimeButton.onClick(() => {
    date = new Date()
    timeUpdate(date)
  })

  startButton.onClick(() => (isStart = true))
  stopButton.onClick(() => (isStart = false))

  setInterval(() => {
    if (!isStart) return
    date = getNextTime()
    timeUpdate(date)
  }, timeInterval * 1000)

  setInterval(() => {
    if (!isStart) return
    timeChangedCallback()
  }, callbackInterval * 1000)

  // 初期値
  timeUpdate(date)
  speedUpdate(speed)
}

const toSpeedText = (speed) => {
  if (speed === 60 * 60 * 24) return '× 1日'
  if (speed < 60) return `× ${speed}秒`
  if (speed < 60 * 60) return `× ${(speed / 60).toFixed(1)}分`
  if (speed < 60 * 60 * 24) return `× ${(speed / 60 / 60).toFixed(1)}時間`
  if (speed < 60 * 60 * 24 * 365)
    return `× ${(speed / 60 / 60 / 24).toFixed(1)}日`
  if (speed >= 60 * 60 * 24 * 365)
    return `× ${(speed / 60 / 60 / 24 / 365).toFixed(1)}年`
}

window.addEventListener('load', init)
