<template>
  <div></div>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
// import { PointLayer } from '@antv/l7'
import { DrawEvent,DrawPolygon, DrawPolyline, DrawCircle ,DrawRect } from '@antv/l7-draw'
const { map, scene } = inject('mapScene')
let measureLayer
</script>

<style lang="scss" scoped></style>
