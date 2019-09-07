<template>
  <div class="now">
    <div class="box" v-for="list in lists" :key="list.id">
      <div class="img">
        <img :src="list.img | setWH(81.119)" alt />
      </div>
      <div class="con">
        <div class="top">
          <h3>{{list.nm}}</h3>
          <span v-show="list.version==''?flag:!flag">
            <i></i>
            {{list.version}}
          </span>
        </div>
        <div class="content">
          观众评分
          <span class="fen">{{list.sc}}</span>
        </div>
        <div class="content">
          主演:
          <span>{{list.star}}</span>
        </div>
        <div class="content">{{list.showInfo}}</div>
      </div>
      <div class="buy">
        <span>预售</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commingsoon',
  data () {
    return {
      id: 1,
      lists: [],
      flag: false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.come()
    console.log(this.id)
  },
  methods: {
    async come () {
      const {
        data: {
          data: { comingList }
        },
        status
      } = await this.$http(`/api/movieComingList?cityId=${this.id}`)
      if (status !== 200) return
      this.lists = comingList
    }
  }
}
</script>

<style lang="less" scoped>
.now {
  padding: 0 10px;
  .box {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
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
          width: 120px;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          width: 56px;
          height: 20px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(63, 43, 5);
          display: inline-block;
          border: 1px solid skyblue;
          border-radius: 3px;
          position: relative;
          top: 3px;
          z-index: -1;
          i {
            position: absolute;
            width: 24px;
            height: 20px;
            color: #fff;
            background: skyblue;
            z-index: -5;
          }
        }
      }
      .content {
        width: 200px;
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
}
</style>
