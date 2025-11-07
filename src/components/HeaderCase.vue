<template>
  <div class="top-area">
    <div class="time">
      <div class="day">{{ day }}</div>
      <div class="min">{{ min }}</div>
    </div>
    <div class="title">智慧城市-武汉</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let day = ref()
let min = ref()
setInterval(() => {
  let date = new Date()
  day.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  min.value = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
}, 1000)
</script>

<style lang="scss" scoped>
.top-area {
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 70px;
  color: #fff;
  padding: 10px;
  display: flex;
  background-image: url('/bcg-image/header.png');
  background-size: cover;
  background-position: center;
  .time {
    position: relative;
    width: 30%;
    top: 10px;
    left: 20px;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
  }
  .title {
    position: relative;
    left: 14%;
    width: 70%;
    font-size: 25px;
    top: 6px;
    margin-top: -6px;
  }
}
</style>
