// Webmoの設定を特にいじっていない場合はこれだけで接続できます
Webmo.init()

// mDNS名もしくはIPアドレスを指定することで特定のWebmoに接続できます
//   Webmo本体のディスプレイで確認できます（Information -> Network）
// 例
//   Webmo.init({ host: 'my-webmo.local' })
//   Webmo.init({ host: '192.168.11.40' })

// 回転する
Webmo.motor.rotate({ speed: 40 })

// 3秒後に止める
setTimeout(() => {
  Webmo.motor.stop()
}, 3000)


// そのほかのWebmo関数で遊んでみましょう

// 一定速度で回転する（マイナスの値で逆回転）
// Webmo.motor.rotate({ speed: -90 })

// 停止する
// Webmo.motor.stop()

// 180度回転する
// Webmo.motor.rotateBy({ degree: 180, speed: 90 })

// モータ1だけ動かす（Webmo.motor1）
// Webmo.motor1.rotate({ speed: 40 })
// Webmo.motor1.rotateBy({ degree: 180, speed: 90 })
// Webmo.motor1.stop()

// モータ2だけ動かす（Webmo.motor2）
// Webmo.motor2.rotate({ speed: 40 })
// Webmo.motor2.rotateBy({ degree: 180, speed: 90 })
// Webmo.motor2.stop()
