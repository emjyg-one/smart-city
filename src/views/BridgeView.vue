<template>
  <div></div>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { LineLayer } from '@antv/l7'
import { getWuhanBridge } from '@/api'
const { map, scene } = inject('mapScene')
let bridgeLayer
let popup
onMounted(async () => {
  map.flyTo({
    center: [114.26, 30.52],
    zoom: 12,
    pitch: 45,
  })
  //加载数据
  const { data: bridgeData } = await getWuhanBridge()
  bridgeLayer = new LineLayer({
    name: '桥梁',
  })
    .source(bridgeData)
    .size(30)
    .shape('arc3d')
    .color('name', ['yellow', 'red', 'blue', 'green'])
    .style({
      opacity: 0.8,
      thetaOffset: 1,
    })
  scene.addLayer(bridgeLayer)
  bridgeLayer.on('click', (e) => {
    const {
      feature: {
        properties: { name, info },
      },
      lnglat,
    } = e
    popup.setLnglat(lnglat)
      .setHTML(`<div style="font-size:12px;color:red">${info}</div>`)
      .setTitle(name)
  })
})
onUnmounted(() => {
  if (bridgeLayer) {
    scene.removeLayer(bridgeLayer)
    bridgeLayer = null
  }
})
</script>

<style lang="scss" scoped></style>
