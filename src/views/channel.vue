<template>
  <div>
    <myhead></myhead>
    <van-grid :gutter="10" :border='false'>
      <van-grid-item
        v-for="(value,index) in myclasses"
        :key="value.name+index" >
            <van-image class="poster" :src="value.image" radius="5">
              <template v-slot:error>加载失败</template>
            </van-image>
            <p style="text-align: center;">{{value.name}}</p>
      </van-grid-item>
    </van-grid>
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
      myclasses:[
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},
        {name:'影响联盟', image:'http://pics.sc.chinaz.com/Files/pic/icons128/5944/lol10.png'},

      ]
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
