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
    <keep-alive>
      <router-view @cityname='cityname'></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'movie',
  data () {
    return {
      name: '北京',
      id: 1,
      active: 1
    }
  },
  created () {
    this.newid = this.$route.query.id
  },
  methods: {
    cityname (data) {
      this.name = data.nm
      this.id = data.id
    }
  }
}
</script>

<style scoped>
.content{
  padding-top:50px;
  font-size: 16px;
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
</style>
