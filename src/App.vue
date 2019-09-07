<template>
  <div id="app">
    <van-nav-bar title="喵 喵 电 影" />
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="video-o" to="/movie">电影</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/cinema">影院</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang='less' scoped>
#app {
  padding:46px 0 50px 0;
  // overflow-x: hidden;
  .van-nav-bar {
    background: red;
    width:100%;
    position: fixed;
    top:0;
    .van-nav-bar__title {
      color: rgba(255, 255, 255, 0.938);
      font-size: 18px;
      font-weight: bold;
    }
  }
  .van-tabbar{
    border-top:.5px solid #ccc;
    background: #f0f0f0;
  }
}
</style>
