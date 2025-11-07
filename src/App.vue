<template>
  <div>
    <HeaderCase />
    <div id="map"></div>
    <router-view />
    <BottomArea />
    <div class="btn">
      <button @click="handleClick">导航</button>
    </div>
  </div>
</template>
<script setup>
import HeaderCase from './components/HeaderCase.vue'
import BottomArea from './components/BottomArea.vue'
import { onMounted, provide, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import useControls from './hooks/useControls'
import { rqaId, spin } from './views/RotateView.vue'

mapboxgl.accessToken =
  'pk.eyJ1IjoieHpkbWFwZ2lzIiwiYSI6ImNtOWtxbXU3eTBwcGEya3BvYW9ubWZ6bWwifQ.bn8nv2PPHfWDeDWExmQamQ'
let map, scene
let isDirection = ref(false)
let direction = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
})

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [114.29, 30.59],
    zoom: 1,
    projection: 'globe',
  })
  scene = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: map,
    }),
    logoVisible: false,
  })
  provide('mapScene', {
    map,
    scene,
  })
  function fog() {
    let center = map.getCenter()
    let lng = center.lng
    map.setFog({
      color: `hsl(0,0%,${Math.abs(lng / 180)})`,
      'high-color': `hsl(0,0%,${Math.abs(lng / 180)})`,
    })
  }
  map.on('move', fog)
  //添加l7控件
  useControls(scene, map)
  //切换主题 重新运行spin
  let mapThemeItems = document.querySelectorAll('.l7-select-control-item')
  mapThemeItems.forEach((item) => {
    item.onclick = function () {
      map.on('style.load', function () {
        cancelAnimationFrame(rqaId)
        spin(map)
      })
    }
  })
})

function handleClick() {
  isDirection.value = !isDirection.value
  if (!isDirection.value) {
    map.addControl(direction, 'top-left')
  } else {
    map.removeControl(direction)
  }
}
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}
.btn {
  position: fixed;
  top: 200px;
  left: 10px;
  button {
    padding: 10px 20px;
  }
}
</style>
