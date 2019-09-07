<template>
  <div class="city">
    <div class="left">
      <div class="hot">
        <p>热门城市</p>
        <span v-for="city in hotcity" :key="city.id" @click="add(city)">{{city.nm}}</span>
      </div>
      <div class="city_sort" ref="city_sort">
        <div class="citys" v-for="items in citylists" :key="items.index">
          <p>{{items.index}}</p>
          <div v-for="item in items.list" :key="item.id" @click="add(item)">{{item.nm}}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rsize"
        v-for="(items,index) in citylists"
        :key="items.index"
        @click="handindex(index)"
      >{{items.index}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      citylists: [],
      hotcity: []
    }
  },
  created () {
    this.now()
  },
  methods: {
    async now () {
      const {
        data: {
          data: { cities }
        },
        status
      } = await this.$http('/api/cityList')
      if (status !== 200) return
      this.listcity(cities)
    },
    listcity (cities) {
      var lists = []
      var hotlist = []
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotlist.push(cities[i])
        }
        var firstletter = cities[i].py.substring(0, 1).toUpperCase()
        if (tocom(firstletter)) {
          lists.push({
            index: firstletter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          })
        } else {
          for (var j = 0; j < lists.length; j++) {
            if (lists[j].index === firstletter) {
              lists[j].list.push({ nm: cities[i].nm, id: cities[i].id })
            }
          }
        }
      }
      lists.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        }
      })
      function tocom (firstletter) {
        for (var i = 0; i < lists.length; i++) {
          if (lists[i].index === firstletter) {
            return false
          }
        }
        return true
      }
      this.citylists = lists
      this.hotcity = hotlist
    },
    add (name) {
      this.$emit('cityname', name)
      this.$router.push({ path: `/movie/nowplaying?id=${name.id}` })
    },
    handindex (index) {
      var p = this.$refs.city_sort.getElementsByTagName('p')
      this.$refs.city_sort.parentNode.scrollTop = p[index].offsetTop
      console.log(this.$refs.city_sort.parentNode.scrollTop, p[index].offsetTop)
    }
  }
}
</script>

<style lang='less' scoped>
.city {
  display: flex;
  justify-content: space-between;
  .left {
    width: 94%;
    background: rgb(248, 221, 226);
    .hot {
      padding: 12px 0;
      p {
        margin: 0;
        height: 30px;
        line-height: 30px;
        background: #ccc;
        padding-left: 8px;
      }
      span {
        display: inline-block;
        width: 30%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin: 15px 0 0 2.4%;
        background: #fff;
      }
    }
    .city_sort {
      .citys {
        p {
          margin: 0;
          height: 30px;
          line-height: 30px;
          background: #ccc;
          padding-left: 10px;
        }
        div {
          line-height: 34px;
          padding-left: 8px;
        }
      }
    }
  }
  .right {
    position: fixed;
    right: 0;
    height: 100%;
    width: 6%;
    padding-top: 10%;
    .rsize {
      height: 3%;
      text-align: center;
    }
  }
}
</style>
