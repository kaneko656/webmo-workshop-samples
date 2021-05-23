import { Button } from './components/index.js'
import { Orb } from './lib/orb.v2.js'

Webmo.init()

Webmo.motor.stop()

const init = () => {
  const calibrationButton = Button('manual-calibration')
  const pointerButton = Button('pointer-button')

  // 調整ボタンが押されたときのポジションを北向き・水平とする
  calibrationButton.onClick(() => {
    Webmo.motor.resetRotation()
    console.log('reset')
  })

  pointerButton.onClick(() => {
    // 現在地の緯度経度と高度
    const myLocation = {
      latitude: 35.68944,
      longitude: 139.69167,
      altitude: 0,
    }

    // 指定時刻（現在の時刻）
    const time = new Date()

    // myLocationから観た天体位置の計算 ex) { azimuth（方位角）: 270.34, elevation（高度）: 12.8 }
    const location = new Orb.Observation({
      observer: myLocation,
      target: new Orb.Sun(),
    }).azel(time)

    console.log(
      `方位角: ${location.azimuth} 高度: ${location.elevation}`
    )

    // 天体の位置にポインターを向ける
    Webmo.motor.rotateTo(
      {
        degree: location.azimuth,
        speed: 30,
      },
      {
        degree: location.elevation,
        speed: 30,
      }
    )
  })
}

window.addEventListener('load', init)
