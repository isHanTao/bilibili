<template>
  <div>
    <myhead></myhead>
    <van-tabs swipeable animated sticky>
      <van-tab title="首页">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="image in images">
            <van-image class="poster" :src="image" radius="5" />
          </van-swipe-item>
        </van-swipe>
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="推荐">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="热门">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="追番">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="影视">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="新时代">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="直播">
        <van-grid :border="false" :column-num="2" :center="false">
          <van-grid-item v-for="video in videos">
            <van-image class="poster" :src="video.img_url" radius="5" />
            <p>{{video.text}}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>

    <myfooter></myfooter>
  </div>
</template>

<script>
import myhead from '@/components/Head';
import myfooter from '@/components/Footer';
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      videos:[{
        text:'【英雄联盟】战士 – 2020赛季CG动画',
        img_url:"//i2.hdslb.com/bfs/archive/7eccf6942ea9a9815a9f531d1d8b800b59290e59.jpg@320w_200h.webp"
      },{
        text:'【老番茄】史上最憨训练师(第二集)',
        img_url:"//i1.hdslb.com/bfs/archive/5974de381822b10e733fcb6caf760d066e305ed2.jpg@320w_200h.webp"
      },{
        text:'把火影的忍术翻译成中文谐音之后，简直不要太沙雕。',
        img_url:"//i1.hdslb.com/bfs/archive/436c5a1ed3b3da3ddcb6577ffe1c1604a6b23df6.jpg@320w_200h.webp"
      },{
        text:'符华 · [A]ddiction【次世代卡通渲染】',
        img_url:"//i1.hdslb.com/bfs/archive/e201e57253674f17add823dfbddc89037d3531e4.jpg@320w_200h.webp"
      },{
        text:'当年“血洗”QQ空间的神曲，太羞耻了，满满的都是回忆啊！',
        img_url:"//i0.hdslb.com/bfs/archive/b6cae9f8f55515ba51955df1c8fa150a22feaf91.jpg@320w_200h.webp"
      },{
        text:'当年“血洗”QQ空间的神曲，太羞耻了，满满的都是回忆啊！',
        img_url:"//i0.hdslb.com/bfs/archive/b6cae9f8f55515ba51955df1c8fa150a22feaf91.jpg@320w_200h.webp"
      },{
        text:'当年“血洗”QQ空间的神曲，太羞耻了，满满的都是回忆啊！',
        img_url:"//i0.hdslb.com/bfs/archive/b6cae9f8f55515ba51955df1c8fa150a22feaf91.jpg@320w_200h.webp"
      },{
        text:'当年“血洗”QQ空间的神曲，太羞耻了，满满的都是回忆啊！',
        img_url:"//i0.hdslb.com/bfs/archive/b6cae9f8f55515ba51955df1c8fa150a22feaf91.jpg@320w_200h.webp"
      }],
      images:['//i2.hdslb.com/bfs/archive/2e28781080fd7a6d796fb77bff9c70e4cb792af4.jpg',
      '//i1.hdslb.com/bfs/archive/a8ec43be08a43655fa5bb17d0b5b3ddda40e47c3.jpg']
    }
  },
  components:{ myhead,myfooter },
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
</style>
