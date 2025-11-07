<template>
  <div></div>
</template>
<script>
export let rqaId = null
export function spin(map) {
  let center = map.getCenter()
  center.lng += 0.1
  map.setCenter(center)
  rqaId = requestAnimationFrame(() => {
    spin(map)
  })
}
</script>
<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
const { map } = inject('mapScene')
onMounted(() => {
  map.on('load', function () {
    spin(map)
  })
})
let zoom = document.querySelector('.l7-control-zoom')
zoom.onclick = function () {
  cancelAnimationFrame(rqaId)
}
onUnmounted(() => {
  cancelAnimationFrame(rqaId)
})
</script>

<style lang="scss" scoped></style>
