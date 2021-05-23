import { Button } from './components/index.js'

// Webmoの設定を特にいじっていない場合はこれだけで接続できます
Webmo.init()

// mDNS名もしくはIPアドレスを指定することで特定のWebmoに接続できます
//   Webmo本体のディスプレイで確認できます（Information -> Network）
// 例
//   Webmo.init({ host: 'my-webmo.local' })
//   Webmo.init({ host: '192.168.11.40' })

/**
 *  Step2. 角度の絶対値指定を学ぶ
 **/

const init = () => {
  const button = Button('return-button')

  // 現在の位置を角度0とする
  Webmo.motor.resetRotation()

  // 回転を始める
  Webmo.motor.rotate({ speed: 20 }, {speed: -20 })

  // ボタンを押されたら、角度0の場所まで戻る
  button.onClick(() => {
    Webmo.motor.rotateTo({ degree: 0, speed: 90 })
  })
}

window.addEventListener('load', init)
