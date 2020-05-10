<template>
  <div>
    <myhead></myhead>
      <div class="my-content">
        <van-tabs swipeable animated sticky v-model="active" @change="change">
          <van-tab title="首页" name="/index/main">
            <keep-alive>
              <router-view v-if="$route.path==='/index/main'"></router-view>
            </keep-alive>
          </van-tab>
          <van-tab title="推荐" name="/index/tuijian">
            <keep-alive>
              <router-view v-if="$route.path==='/index/tuijian'"></router-view>
            </keep-alive>
          </van-tab>
          <van-tab title="热门" name="/index/hot">
            <keep-alive>
              <router-view v-if="$route.path==='/index/hot'"></router-view>
            </keep-alive>
          </van-tab>
          <van-tab title="关注" name="/index/guanzhu">
            <keep-alive>
              <router-view v-if="$route.path==='/index/guanzhu'"></router-view>
            </keep-alive>
          </van-tab>

          <van-tab title="最新" name="/index/zuixin">
            <keep-alive>
              <router-view v-if="$route.path==='/index/zuixin'"></router-view>
            </keep-alive>
          </van-tab>
        </van-tabs>
      </div>
    <myfooter></myfooter>
  </div>
</template>
<script>
  import myhead from '@/components/Head';
  import myfooter from '@/components/Footer';

  export default {
    name: 'index',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        active: '/index/main',
      }
    },
    activated() {
      if (this.$route.path == "/index/main") {
        this.active = '/index/main';
      } else if (this.$route.path == "/index/tuijian") {
        this.active = '/index/tuijian';
      } else if (this.$route.path == "/index/hot") {
        this.active = '/index/hot';
      } else if (this.$route.path == "/index/guanzhu") {
        this.active = '/index/guanzhu';
      } else if (this.$route.path == "/index/zuixin") {
        this.active = '/index/zuixin';
      }
    },
    methods: {
      change(name) {
        if (name === '/index/main') {
          this.$router.push('/index/main')
        }
        if (name === '/index/tuijian') {
          this.$router.push('/index/tuijian')
        }
        if (name === '/index/hot') {
          this.$router.push('/index/hot')
        }
        if (name === '/index/guanzhu') {
          this.$router.push('/index/guanzhu')
        }
        if (name === '/index/zuixin') {
          this.$router.push('/index/zuixin')
        }
      }
    },
    components: {
      myhead,
      myfooter
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-content{
    padding-bottom: 1.5rem;
  }
</style>
