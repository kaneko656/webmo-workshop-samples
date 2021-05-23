import { Text } from './components/index.js'

Webmo.init()

const init = () => {
  const dataViewer = Text('data')

  Webmo.socketClient.events.on('UDP', (data) => {
    console.log(data)
    dataViewer.update({
      text: JSON.stringify(data, null, '　').replace(/\n/g, '<br />'),
    })
  })
}

window.addEventListener('load', init)
