<template>
  <div class="search-view">
    <div class="search-btn">
      <el-button @click="search">拉框搜索</el-button>
    </div>
    <div class="search-table" v-show="tableData.length > 0">
      <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
        <el-table-column prop="event_num" label="事件编号" />
        <el-table-column prop="level" label="事故级别" />
        <el-table-column prop="area" label="事故区域" />
        <el-table-column prop="name" label="事故类型" />
        <el-table-column prop="car_num" label="车牌号码" />
        <el-table-column prop="phone" label="联系方式" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { getWuhanEvents } from '@/api'
import { inject, onMounted,onUnmounted, ref } from 'vue'
import * as turf from '@turf/turf'
import { DrawRect, DrawEvent } from '@antv/l7-draw'
import { PointLayer } from '@antv/l7'
const { map, scene } = inject('mapScene')

let tableData = ref([])
let totalData = ref([])
let pointLayer
let draw
onMounted(async () => {
  //飞到研究区域
  map.flyTo({
    center: [114.42, 30.46],
    zoom: 15,
    pitch: 45,
  })
  //获取数据
  const { data } = await getWuhanEvents()
  totalData.value = data
})
//开启拉框搜素
function search() {
  if (draw) {
    draw.clear()
    draw.destory()
    draw = null
  }
  if (pointLayer) {
    scene.removeLayer(pointLayer)
    pointLayer = null
  }
  draw = new DrawRect(scene, {})
  draw.enable()
  draw.on(DrawEvent.Add, (e) => {
    pointLayer = new PointLayer({
      name: '点',
    })
    let result = turf.pointsWithinPolygon(totalData.value, e)
    pointLayer.source(result).shape('circle').size(30).color('pink').active(true).animate(true)
    scene.addLayer(pointLayer)
    tableData.value = result.features.map((item) => ({
      ...item.properties,
      center: item.geometry.coordinates,
    }))
  })
}
function handleRowClick(row) {
  tableData.value = []
  if (draw) {
    draw.clear()
    draw.destroy()
    draw = null
  }
  let center = row.center
  map.flyTo({
    center,
    zoom: 12,
    pitch: 0,
  })
}

onUnmounted(() => {
  if (pointLayer) {
    scene.removeLayer(pointLayer)
  }
  if (draw) {
    draw.clear()
    draw.destroy()
    draw = null
  }
})

</script>

<style lang="scss" scoped>
.search-view {
  .search-btn {
    position: fixed;
    top: 200px;
    right: 60px;
  }
  .search-table {
    position: fixed;
    width: 60%;
    bottom: 100px;
    left: 20%;
    z-index: 1000;
    .el-table {
      max-height: 300px;
      overflow-y: scroll;
      :deep(.el-table__cell) {
        background-color: #ccc;
      }
    }
  }
}
</style>
