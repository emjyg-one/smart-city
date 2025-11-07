<template>
  <div class="plot-view">
    <div class="left">
      <CommonCard class="card">
        <template #title>
          <div>武汉各区出行人口统计</div>
        </template>
        <ColumnChart v-bind="travelConfig" />
      </CommonCard>
      <CommonCard class="card">
        <template #title>
          <div>武汉各区公交线路统计</div>
        </template>
        <RoseChart v-bind="busConfig" />
      </CommonCard>
    </div>
    <div class="right">
      <CommonCard class="card">
        <template #title>
          <div>武汉三镇人口统计</div>
        </template>
        <PieChart v-bind="populationConfig" />
      </CommonCard>
      <CommonCard class="card">
        <template #title>
          <div>武汉三甲医院</div>
        </template>
        <!-- 添加默认插槽 -->
        <div class="box">
          <div class="item" v-for="(item, index) in hopital" :key="index">
            <h5>{{ item.title }}</h5>
            <div class="img">
              <img :src="item.src" alt="" :style="`width:${item.size}px;height:${item.size}px`" />
            </div>
          </div>
        </div>
      </CommonCard>
      <CommonCard class="card">
        <template #title>
          <div>武汉高校学生统计</div>
        </template>
        <!-- 添加默认插槽 -->
        <div class="box">
          <div class="item" v-for="(item, index) in school" :key="index">
            <h5>{{ item.title }}</h5>
            <div class="img">
              <img :src="item.src" alt="" :style="`width:${item.size}px;height:${item.size}px`" />
            </div>
          </div>
        </div>
      </CommonCard>
    </div>
  </div>
</template>

<script setup>
import CommonCard from '@/components/CommonCard.vue'
import { ColumnChart, PieChart, RoseChart } from '@opd/g2plot-vue'

const travelConfig = {
  data: [
    { type: '洪山区', value: 41000 },
    { type: '江夏区', value: 36000 },
    { type: '汉阳区', value: 30000 },
    { type: '武昌区', value: 42000 },
    { type: '青山区', value: 38000 },
  ],
  xField: 'type',
  yField: 'value',
  seriesField: 'value',
  color: function ({ value }) {
    if (value > 40000) {
      return 'red'
    } else if (value > 35000) {
      return 'orange'
    } else {
      return 'green'
    }
  },
  label: {
    position: 'top',
    style: {
      fill: '#fff',
      opacity: 0.6,
    },
  },
  height: 200,
  legend: false,
  width: 300,
}
const busConfig = {
  width: 300,
  height: 200,
  data: [
    { type: '洪山区', value: 25 },
    { type: '汉阳区', value: 20 },
    { type: '武昌区', value: 28 },
    { type: '青山区', value: 22 },
    { type: '东西湖', value: 15 },
  ],
  xField: 'type',
  yField: 'value',
  seriesField: 'type',
  radius: 0.9,
  label: {
    offset: -15,
  },
  interactions: [{ type: 'element-active' }],
}
const populationConfig = {
  data: [
    {
      type: '武昌',
      value: 300,
    },
    {
      type: '汉口',
      value: 400,
    },
    {
      type: '汉阳',
      value: 200,
    },
    { type: '其他', value: 400 },
  ],
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  width: 300,
  height: 200,
  appendPadding: 10,
  label: {
    labelHeight: 30,
    content: '{name}',
  },
  legend: {
    position: 'top',
    itemName: {
      style: {
        fill: '#fff',
      },
    },
  },
}
const hopital = [
  {
    title: '医院30家',
    src: '/icons/医院.png',
    size: 65,
  },
  {
    title: '门诊部300个',
    src: '/icons/门诊.png',
    size: 40,
  },
  {
    title: '病床3000张',
    src: '/icons/病床.png',
    size: 50,
  },
]
const school = [
  {
    title: '高校130家',
    src: '/icons/学校.png',
    size: 40,
  },
  {
    title: '在校大学生100万',
    src: '/icons/学生.png',
    size: 40,
  },
]
</script>

<style lang="scss" scoped>
.plot-view {
  .left {
    position: fixed;
    top: 80px;
    left: 80px;
  }
  .right {
    position: fixed;
    top: 80px;
    right: 80px;
  }
  .card {
    margin-bottom: 20px;
  }
  .box {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 20px;
      h5 {
        font-size: smaller;
        font-weight: bolder;
      }
      .img {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
