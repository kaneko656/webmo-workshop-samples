import { Text, Button } from './component/index.js'

const myLocation = {
  latitude: 35.68944,
  longitude: 139.69167,
  altitude: 0,
}

export const getMyLocation = () => myLocation

const init = () => {
  const myLocationDetail = Text('my-location-detail')
  const myLocationGoogleMap = Text('my-location-googlemap')
  const button = Button('get-location')
  const status = Text('my-location-status')

  const updateLocationText = () => {
    myLocationDetail.update({
      text: `緯度: ${myLocation.latitude}, 経度: ${myLocation.longitude}`,
    })
    myLocationGoogleMap.update({
      href: `https://www.google.com/maps/search/?api=1&query=${myLocation.latitude},${myLocation.longitude}`,
    })
  }

  const success = (position) => {
    myLocation.latitude = position.coords.latitude
    myLocation.longitude = position.coords.longitude
    status.update({ text: '' })
    updateLocationText()
  }

  const error = () => {
    status.update({
      text: 'エラーが発生しました。',
    })
  }

  button.onClick(() => {
    if (navigator.geolocation) {
      status.update({
        text: '取得中...',
      })
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      status.update({
        text: 'お使いのブラウザでサポートされていません',
      })
    }
  })

  updateLocationText()
}

window.addEventListener('load', init)

export default {}
