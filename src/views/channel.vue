<template>
  <div>
    <myhead></myhead>
    <p>频道</p>
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
