<template>
  <div class="search">
    <p class="inp">
      <van-search v-model="message" />
    </p>
    <div class="contents">
      <h3 class="title">电影/电视剧/综艺</h3>
      <div class="cons" v-for="item in movieslist" :key="item .id">
        <div class="img">
          <img :src="item.img | setWH(81.119)" alt />
        </div>
        <div class="con">
          <div class="top">
            <h3>{{item.nm}}</h3>
            <span>{{item.sc}}</span>
          </div>
          <div class="content">{{item.enm}}</div>
          <div class="content">{{item.cat}}</div>
          <div class="content">{{item.pubDesc}}</div>
        </div>
      </div>
      <div class="cin" v-for="item in cinemalist" :key="item .id">
        <div class="top">
          <h3>{{item.nm}}</h3>
          <span>{{item.sellPrice}} 元起</span>
        </div>
        <div class="add">
          <p>
            {{item.addr}}
            <span class="address">{{item.distance}}</span>
          </p>
        </div>
        <div class="content">
          <span class="blue">改签</span>
          <span class="blue">退</span>
          <span class="yellow">折扣卡</span>
          <span class="yellow">小吃</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      id: 1,
      movieslist: [],
      cinemalist: []
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  methods: {},
  watch: {
    message (newval) {
      this.$http(`/api/searchList?cityId=${this.id}&kw=${newval}`).then(res => {
        var msg = res.data.msg
        var movies = res.data.data.movies
        var cinema = res.data.data.cinemas
        if (msg && movies) {
          this.movieslist = res.data.data.movies.list
          console.log(this.movieslist)
        }
        if (msg && cinema) {
          this.cinemalist = res.data.data.cinemas.list
          console.log(this.cinemalist)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .inp {
    margin: 0;
    position: fixed;
    width: 100%;
    .van-search {
      background: rgb(218, 216, 216) !important;
      .van-search__content {
        border-radius: 3px;
      }
    }
  }
  .contents {
    padding-top: 54px;
    .title {
      margin: 0;
      padding: 10px;
      color: #666;
      padding-left: 20px;
      border-bottom: 1px solid #ccc;
    }
    .cons {
      padding: 10px 20px;
      border-bottom: 1px dashed #ccc;
      display: flex;
      justify-content: space-between;
      .img {
        img {
          width: 81px;
          height: 119px;
        }
      }
      .con {
        padding-top: 5px;
        .top {
          display: flex;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
          h3 {
            width: 150px;
            margin: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span {
            color: orange;
          }
        }
        .content {
          width: 240px;
          font-size: 14px;
          overflow-x: hidden;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          .fen {
            color: rgb(255, 217, 0);
          }
        }
      }
      .buy {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 50px;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
          background: red;
          color: #fff;
        }
      }
    }
    .cin {
      border-bottom: 1px solid #ccc;
      padding: 10px 15px;
      .top {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        h3 {
          width: 240px;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          color: orange;
        }
      }
      .add{
        display: flex;
        .address{
          float: right;
        }
      }
      .content{
        .blue{
          color: skyblue;
          padding:3px;
          border: 1px solid skyblue;
          margin-right:3px;
        }
        .yellow{
          color: orange;
          padding:3px;
          border: 1px solid orange;
          margin-right:3px;
        }
      }
    }
  }
}
</style>
