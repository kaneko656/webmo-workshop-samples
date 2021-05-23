import { getMyLocation } from './location.js'
import {
  getTime,
  getPreCallBackTime,
  callbackInterval,
  onTimeChanged,
} from './time.js'
import { getSelectedCelestial, onSelected } from './selectedCelestial.js'
import { getCelestialLocation } from './celestial.js'
import './compass.js'

Webmo.init({ host: 'webmo.local' })

Webmo.motor.stop()

let isSending = false

const update = async (type) => {
  // myLocatoin ex) { latitude: 35.68944, longitude: 139.69167, altitude: 0 }
  const myLocation = getMyLocation()

  // 選択している天体名
  const selectedCelestial = getSelectedCelestial()

  // 指定時刻 Dateオブジェクト
  const time = getTime()

  // myLocationから観た天体位置の計算 ex) { azimuth（方位角）: 270.34, elevation（高度）: 12.8 }
  const location = getCelestialLocation({
    myLocation,
    target: selectedCelestial,
    time,
  })
  console.log(
    `${selectedCelestial} 方位角: ${location.azimuth} 高度: ${location.elevation}`
  )

  // 次の更新時の位置を取得する
  const preTime = getPreCallBackTime()
  const preLocation = getCelestialLocation({
    myLocation,
    target: selectedCelestial,
    time: preTime,
  })

  // 送信中なら命令を送らない
  if (isSending) return
  isSending = true

  // 角度差から速度を決定する
  let speed1 = culculateSpeed(location.azimuth, preLocation.azimuth)
  let speed2 = culculateSpeed(location.elevation, preLocation.elevation)

  // 天体選択時は早めの速度にする
  if (type === 'selected') {
    speed1 = 30
    speed2 = 30
  }

  // Webmoの操作
  await Webmo.motor.rotateTo(
    {
      degree: location.azimuth,
      speed: speed1,
    },
    {
      degree: location.elevation,
      speed: speed2,
    }
  )

  isSending = false
}

const culculateSpeed = (current, next) => {
  // Webmoは1回転戻るので早めの速度にする
  // 360度 -> 0度への変化
  if (current > 300 && next < 100) {
    return Math.ceil(Math.abs(next - current) / callbackInterval)
  }
  // 0度 -> 360度への変化
  if (current < 100 && next > 300) {
    return Math.ceil(Math.abs(next - current) / callbackInterval)
  }
  // それ以外は差分で速度を出す
  return Math.ceil(Math.abs(next - current) / callbackInterval)
}

onTimeChanged(() => update('time-changed'))
onSelected(() => update('selected'))
