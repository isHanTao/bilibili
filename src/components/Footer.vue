<template>
  <div>
    <van-tabbar v-model="active"  active-color="#DE698C">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="bookmark-o" to="channel">频道</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="news">动态</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="shop">会员狗</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default{
    name: 'myfooter',
    data() {
      return {
        active:0
      }
    },
    created() {
        if (this.$route.name == "/") {
          this.active = 0;
        } else if (this.$route.name == "channel") {
          console.log('channle');
          this.active = 1;
        } else if (this.$route.name == "news") {
          this.active = 2;
        }else if (this.$route.name == "shop"){
          this.active = 3;
        }
      }
  };
</script>

<style>
</style>
