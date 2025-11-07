<template>
  <div class="bottom-area">
    <div class="groups">
      <!-- 前面5个可跳转的图标 -->
      <div class="item" v-for="(item, index) in bottomTools" :key="index">
        <router-link :to="item.path">
          <div class="icon">
            <i :class="['iconfont', item.icon]"></i>
          </div>
          <dvi class="text">
            {{ item.text }}
          </dvi>
        </router-link>
      </div>
      <!-- 最后一个带有弹窗的图标 -->
      <div class="item">
        <el-popover placement="top" trigger="hover" popper-style="background-color:transparent;color: #fff;">
          <template #reference>
            <div class="icon">
              <i class="iconfont icon-chizi"></i>
            </div>
          </template>
          <div class="measureIcons" style="display: flex; justify-content: space-around">
            <div class="measureIcon" v-for="(item, index) in measureIcons" :key="index">
              <router-link :to="item.path">
                <i :class="['iconfont', item.icon]"></i>
              </router-link>
            </div>
          </div>
        </el-popover>
        <div style="font-size: 12px">测量距离</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bottomTools = [
  {
    icon: 'icon-ditu_diqiu',
    path: '/rotate',
    text: '自转',
  },
  {
    icon: 'icon-kongzhitai',
    path: '/plot',
    text: '控制台',
  },
  {
    icon: 'icon-feiji',
    path: '/cityview',
    text: '城市视图',
  },
  {
    icon: 'icon-fangdajing',
    path: '/search',
    text: '搜索',
  },
  {
    icon: 'icon-qiaoliang',
    path: '/bridge',
    text: '桥梁',
  },
]
const measureIcons = [
  {
    icon: 'icon--_zhexian',
    path: '/line',
  },
  {
    icon: 'icon-24gl-square',
    path: '/rect',
  },
  {
    icon: 'icon-duobianxing',
    path: '/polygon',
  },
  {
    icon: 'icon-xingzhuang-tuoyuanxing',
    path: '/circle',
  },
]
</script>

<style lang="scss" scoped>
// 去掉a标签默认的样式
a {
  all: unset;
}
.bottom-area {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 900;
  color: #fff;
  width: 100vw;
  height: 70px;
  background-image: url('/bcg-image/xzd-header.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotateZ(180deg);
  .groups {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    transform: rotateZ(180deg);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-left: 5px;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        font-size: 12px;
      }
      .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: rgb(0, 0, 147, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
