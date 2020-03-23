<template>
  <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
  <div>
    <myhead></myhead>
    <div class="my-content">
      <van-tabs swipeable animated sticky @change="tableChange">
        <van-tab title="首页">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="image in images" :key="image">
              <van-image class="poster" :src="require('../'+ image)" radius="5"></van-image>
            </van-swipe-item>
          </van-swipe>
          <vue-pull-refresh :on-refresh="onRefresh">
            <van-grid :border="false" :column-num="2" :center="false">
              <van-grid-item v-for="(item,index) in article" :key="item.id + '' +index" @click="$router.push('/detail/'+item.id)">
                <div class="item-content">
                  <van-image class="poster" :src="item.poster" radius="5"
                             height="120">
                    <template v-slot:error>加载失败</template>
                  </van-image>
                  <van-divider />
                  <p>{{item.title}}</p>
                </div>

              </van-grid-item>

            </van-grid>
          </vue-pull-refresh>

        </van-tab>

        <van-tab title="推荐">
          <van-grid :border="false" :column-num="2" :center="false">
            <img src="../assets/img.jpg" alt="">

          </van-grid>
        </van-tab>

        <van-tab title="热门">

        </van-tab>
        <van-tab title="关注">

        </van-tab>

        <van-tab title="最新">

        </van-tab>
      </van-tabs>
    </div>

    <myfooter></myfooter>
  </div>
  </v-touch>
</template>

<script>
import myhead from '@/components/Head';
import myfooter from '@/components/Footer';
import VuePullRefresh from 'vue-pull-refresh';
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      article:[],
      images:['assets/img.jpg',
      'assets/img2.jpg']
    }
  },
  methods: {
    swiperleft: function () {

    },
    swiperright: function () {

    },
    tableChange(name,title){
      switch (name) {
        case 0:this.indexList();break;
      }
    },
    onRefresh(){
      this.indexList();
    },
    async indexList() {
      let {data : res} = await this.$http.get('/article/list');
      this.article = res.data.concat(this.article);
      console.log(this.article);
    }
  },
  created: function () {
      this.indexList();

  },
  components:{ myhead,myfooter,'vue-pull-refresh': VuePullRefresh },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    font-size: .3rem;
    text-align: left;
    display: block;
    width: 100%;
    margin: 0;
  }
  .grid_item{
    padding: 0.3125rem 0.5rem;
  }
  .poster > img,.van-image__img {
    border-radius: 0.3125rem;
  }
  .van-grid-item__content{
    padding: 0 0.5rem;
  }
  .drawer-content{
    background-color: #ffffff;
  }
  .content-wrap{
    background-color: #FFFFFF;
  }
  .drawer-contain{
    height: 100%;
    background: #000000;
  }
  .my-content{
    position: relative;
    padding-bottom: 40px;
  }
  .item-content{
    background-color: white;
    border-radius: .2rem;
    padding: .1rem;
  }
  .poster{

  }
  >>> .van-grid-item__content{
    background-color: #eaeaea;
  }
</style>
