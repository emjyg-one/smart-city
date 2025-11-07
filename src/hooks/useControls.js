import { Zoom, Fullscreen, MouseLocation, Scale, MapTheme, Logo } from '@antv/l7'
export default function useControls(scene, map) {
  //具体添加l7控件的逻辑
  const controls = {}
  controls.zoom = new Zoom({
    position: 'topleft',
  })
  controls.fullscreen = new Fullscreen()
  controls.mouseLocation = new MouseLocation({
    position: 'bottomright',
  })
  controls.scale = new Scale({
    position: 'bottomright',
  })
  controls.mapTheme = new MapTheme({
    options: [
      {
        text: '白天导航地图',
        value: 'mapbox://styles/mapbox/navigation-day-v1',
      },
      {
        text: '夜间导航地图',
        value: 'mapbox://styles/mapbox/navigation-night-v1',
      },
      {
        text: '标记卫星图',
        value: 'mapbox://styles/mapbox/satellite-streets-v12',
      },
      {
        text: '普通卫星图',
        value: 'mapbox://styles/mapbox/satellite-v9',
      },
    ],
  })
  controls.logo = new Logo({
    img: 'http://www.x-zd.com/themes/simpleboot3_web/public/web/images/image/logo_03.png',
    href: 'http://www.x-zd.com/',
  })
  for (let key in controls) {
    scene.addControl(controls[key])
  }
  //默认情况下隐藏scale
  controls.scale.hide()
  map.on('zoom', () => {
    if (map.getZoom() > 5) {
      controls.scale.show()
    } else {
      controls.scale.hide()
    }
  })
}
