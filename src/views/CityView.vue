<template>
  <div></div>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { CityBuildingLayer, LineLayer, LayerSwitch } from '@antv/l7'
import { getWuhanBuilding, getWuhanRoad } from '@/api'
const { map, scene } = inject('mapScene')
let buildingLayer, roadLayer, layerSwitch
onMounted(async () => {
  map.flyTo({
    center: [114.406325, 30.465113],
    zoom: 15,
    pitch: 45,
  })
  // 加载数据
  const { data: buildingData } = await getWuhanBuilding()
  buildingLayer = new CityBuildingLayer({
    name: '建筑',
  })
  buildingLayer
    .source(buildingData)
    .filter('Elevation', (e) => {
      return e > 50
    })
    .size('Elevation', (e) => {
      return e
    })
    .color('rgba(240,240,240,1)')
    .animate({
      enable: true,
    })
    .active(true)
    .style({
      opacity: 0.7,
      baseColor: 'rgb(16, 16, 16)',
      windowColor: 'rgb(30, 60, 89)',
      brightColor: 'rgb(255, 176, 38)',
      sweep: {
        enable: true,
        sweepRadius: 2,
        sweepColor: '#1990FF',
        sweepSpeed: 0.5,
        sweepCenter: [114.406325, 30.465113],
      },
    })
  scene.addLayer(buildingLayer)
  const { data: roadData } = await getWuhanRoad()
  roadLayer = new LineLayer({
    name: '道路',
  })
  //道路的颜色 需要设置多种(主道路 辅路 人行道...)
  roadLayer
    .source(roadData)
    .shape('line')
    .color('type', (type) => {
      switch (type) {
        case 'motorway':
          return '#F9D371'
        case 'motorway_link':
          return '#3DB2FF'
        case 'trunk':
          return 'green'
        case 'trunk_link':
          return '#6E85B2'
        case 'primary':
          return '#F47340'
        case 'primary_link':
          return '#F6A9A9'
        case 'secondary':
          return '#EF2F88'
        case 'secondary_link':
          return '#5F7A61'
        case 'tertiary':
          return '#1ee3cf'
        case 'tertiary_link':
          return '#C2F784'
        case 'pedestrian':
          return '#FFF89A'
        case 'residential':
          return 'rgba(22, 119, 255, .5)'
        case 'road':
          return '#93FFD8'
        case 'path':
          return '#BAFFB4'
        case 'unclassified':
          return '#D3DEDC'
        case 'service':
          return '#AEFEFF'
        case 'living_street':
          return '#9B0000'
        case 'track':
          return '#F5F5F5'
        case 'highway':
          return 'red'
        case 'rail':
          return '#08ffc8'
        default:
          return '#FFE3E3'
      }
    })
    .active(true)
    .size(1)
    .style({
      opacity: 0.5,
    })
    .animate({
      interval: 1, // 间隔
      duration: 1, // 持续时间，延时
      trailLength: 2, // 流线长度
    })
  scene.addLayer(roadLayer)
  layerSwitch = new LayerSwitch({
    layers: [buildingLayer, roadLayer],
  })
  scene.addControl(layerSwitch)
})
onUnmounted(() => {
  scene.removeLayer(buildingLayer)
  scene.removeLayer(roadLayer)
  scene.removeControl(layerSwitch)
})
</script>
<style lang="scss" scoped></style>
