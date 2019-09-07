<template>
  <div class="movie">
    <div class="content">
      <router-link tag="ul" to class="top" v-model="active">
        <router-link tag="li" to="/movie/city" class="list">{{name}}</router-link>
        <router-link tag="li" :to="{name:'nowplaying',params:{id:id}}" class="list">正在热映</router-link>
        <router-link tag="li" :to="`/movie/commingsoon?id=${id}`" class="list">即将上映</router-link>
        <router-link tag="li" :to="`/movie/search?id=${id}`" class="list">
          <van-icon name="search" />
        </router-link>
      </router-link>
    </div>
    <div class="refreshMoudle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
      <header class="pull-refresh">
        <div>
          <div class="down-tip" v-if="dropDownState==1">
            <!-- <img v-if="dropDownStateText.downImg" class="down-tip-img" src="../../assets/logo.png"> -->
            <span class="down-tip-text">{{dropDownStateText.downTxt}}</span>
          </div>
          <div class="up-tip" v-if="dropDownState==2">
            <img v-if="dropDownStateText.upImg" class="up-tip-img" src="../../assets/logo.png">
            <span class="up-tip-text">{{dropDownStateText.upTxt}}</span>
          </div>
          <div class="refresh-tip" v-if="dropDownState==3">
            <img v-if="dropDownStateText.refreshImg" class="refresh-tip-img" src="../../assets/logo.png">
            <span class="refresh-tip-text">{{dropDownStateText.refreshTxt}}</span>
          </div>
        </div>
      </header>
    <keep-alive>
      <router-view @cityname='cityname'></router-view>
    </keep-alive>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'movie',
  data () {
    return {
      name: '北京',
      id: 1,
      active: 1,
      defaultOffset: 100, // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: false, // 是否下拉
      isRefreshing: false, // 是否正在刷新
      dropDownState: 1, // 显示1:下拉刷新, 2:松开刷新, 3:刷新中……
      dropDownStateText: {
        downTxt: '下拉刷新',
        downImg: '',
        upTxt: '松开刷新',
        upImg: 'release.png',
        refreshTxt: '刷新中...',
        refreshImg: 'refresh.gif'
      }
    }
  },
  created () {
    this.newid = this.$route.query.id
  },
  methods: {
    cityname (data) {
      this.name = data.nm
      this.id = data.id
    },
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
    },
    touchMove (e) {
      this.scrollIsToTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // safari 获取scrollTop用window.pageYOffset
      if (e.targetTouches[0].pageY > this.startY) { // 下拉
        this.isDropDown = true
        if (this.scrollIsToTop === 0 && !this.isRefreshing) {
          // 拉动的距离
          let diff = e.targetTouches[0].pageY - this.startY - this.scrollIsToTop
          this.top = Math.pow(diff, 0.8) + (this.dropDownState === 3 ? this.defaultOffset : 0)
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2
            e.preventDefault()
          } else {
            this.dropDownState = 1
            e.preventDefault()
          }
        }
      } else {
        this.isDropDown = false
        this.dropDownState = 1
      }
    },
    touchEnd (e) {
      if (this.isDropDown && !this.isRefreshing) {
        if (this.top >= this.defaultOffset) { // do refresh
          this.refresh()
          this.isRefreshing = true
          console.log(`do refresh`)
        } else { // cancel refresh
          this.isRefreshing = false
          this.isDropDown = false
          this.dropDownState = 1
          this.top = 0
        }
      }
    },
    refresh () {
      this.dropDownState = 3
      this.top = this.defaultOffset
      setTimeout(() => {
        this.onRefresh(this.refreshDone())
      }, 600)
    },
    onRefresh (a) {
      return a
    },
    refreshDone () {
      this.isRefreshing = false
      this.isDropDown = false
      this.dropDownState = 1
      this.top = 0
    }
  }
}
</script>

<style scoped>
.content{
  padding-top:50px;
}
.top {
  display: flex;
  justify-content: space-around;
  height: 50px;
  line-height: 50px;
  position: fixed;
  width:100%;
  top:46px;
  background: #eeecec;
  z-index:10;
}
.top .list {
  width: 25%;
  text-align: center;
}
.top .list .van-icon-search {
  font-size: 20px;
  padding-top: 15px;
  color: red;
  font-weight: bold;
}
.top .list.active {
  color: red;
  border-bottom: 3px solid red;
}
.top .router-link-active {
  color: red;
  border-bottom: 3px solid red;
}
.refreshMoudle {
  width: 100%;
  margin-top: -100px;
  -webkit-overflow-scrolling: touch; /* ios5+ */
}
.pull-refresh {
  width: 100%;
  color: #999;
  transition-duration: 200ms;
}
.refreshMoudle .down-tip,
.up-tip,
.refresh-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.refreshMoudle .down-tip-img,
.up-tip-img,
.refresh-tip-img {
  width: 35px;
  height: 35px;
  margin-right: 5px;
}
</style>
