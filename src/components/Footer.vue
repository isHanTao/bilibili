<template>
  <div>
    <van-tabbar v-model="my_active"  active-color="#DE698C">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="bookmark-o" to="/index/channel">分类</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/index/news">动态</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/index/mine">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default{
    name: 'myfooter',
    data() {
      return {
        my_active:0
      }
    },
    created() {
      console.log(this.$route.path)
        if (this.$route.path == "/index/main") {
          this.my_active = 0;
        } else if (this.$route.path == "/index/channel") {
          this.my_active = 1;
        } else if (this.$route.path == "/index/news") {
          this.my_active = 2;
        }else if (this.$route.path == "/index/mine"){
          this.my_active = 3;
        }else{
          this.my_active = 0;
        }
      },
      methods:{

      },
      activated(){
        if (this.$route.path == "/index/main") {
          this.my_active = 0;
        } else if (this.$route.path == "/index/channel") {
          this.my_active = 1;
        } else if (this.$route.path == "/index/news") {
          this.my_active = 2;
        }else if (this.$route.path == "/index/mine"){
          this.my_active = 3;
        }else{
          this.my_active = 0;
        }
      }
  };
</script>

<style>
</style>
