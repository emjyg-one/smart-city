<template>
  <div class="common-card">
    <div class="title">
      <slot name="title" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.common-card {
  position: relative;
  .title {
    background-image: url('/bcg-image/chart-item.png');
    background-size: cover;
    background-position: center;
    width: 350px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    margin-bottom: 5px;
    text-align: center;
  }
  .content {
    width: 350px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      to bottom,
      rgba(36, 95, 132, 0.5137254902),
      rgba(27, 35, 106, 0.2901960784)
    );
    &::before {
      display: block;
      content: '';
      width: 110px;
      height: 35px;
      background-image: url('/bcg-image/border.png');
      background-position: center;
      background-size: cover;
      position: absolute;
      left: -3px;
      top: -6px;
      transform: rotateZ(180deg);
    }
    &::after {
      display: block;
      content: '';
      width: 110px;
      height: 35px;
      background-image: url('/bcg-image/border.png');
      background-position: center;
      background-size: cover;
      position: absolute;
      right: -3px;
      bottom: -6px;
    }
  }
}
</style>
