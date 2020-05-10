<template>
  <div>
    <myhead></myhead>
    <van-tabs v-model="myActive" swipeable sticky>
      <van-tab  title="我的粉丝">
        <div class="peoples" v-if="fans">
          <div class="people" v-for="(item,index) in fans" :key="item.id+Math.random()+''" >
            <div class="people-face" @click="showPeople(item.user.id)">
              <img :src="item.user.avatar" alt="">
            </div>
            <div class="people-content" >
              <div class="people-content-text">
                <p class="people-content-name vip" @click="showPeople(item.user.id)">{{item.user.nickname}}</p>
                <p class="people-content-description" @click="showPeople(item.user.id)">{{item.user.description}}</p>
              </div>
            </div>
            <div class="people-option" >
              <van-tag color="#eaeaea" v-if="item.isIdol" class="guanzhu" @click="unguanzhu(fans[index])" text-color="#a79d9d">取关</van-tag>
              <van-tag color="#ffe1e1" v-if="!item.isIdol" class="guanzhu" @click="guanzhu(item)" text-color="#ad0000">关注</van-tag>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab  title="我的关注">
        <div class="peoples" v-if="idols">
          <div class="people"  v-if="item.idol" v-for="item in idols" :key="item.id+Math.random()+''" @click="showPeople(item.idol.id)">
            <div class="people-face">
              <img :src="item.idol.avatar" alt="">
            </div>
            <div class="people-content">
              <div class="people-content-text">
                <p class="people-content-name vip">{{item.idol.nickname}}</p>
                <p class="people-content-description">{{item.idol.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myhead from '@/components/Head';
import myfooter from '@/components/Footer';
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      myActive:0,
      fans:null,
      idols:null
    }
  },
  mounted() {
    this.getFans();
    this.getIdol();
  },
  methods:{
    async guanzhu(item) {
      item.isIdol = !item.isIdol;
      let {data: res} = await this.$http.post('/fan/'+item.user_id);
      if (res.code == 0){
        this.$toast('关注['+item.user.nickname+']成功QAQ');
        this.getIdol();
      }
      else
        this.$toast('关注['+item.user.nickname+']失败QAQ')
    },
    async unguanzhu(item){
      item.isIdol = !item.isIdol;
      let {data: res} =  await this.$http.delete('/fan/'+item.user_id);
      console.log(item);
      if (res.code == 0){
        this.$toast('取消关注['+item.user.nickname+']成功QAQ');
        this.getIdol();
      }
      else
        this.$toast('取消关注['+item.user.nickname+']失败QAQ')
    },
    showPeople(id){
      this.$router.push('/otherinfo/'+id)
    },
    async getFans() {
      let {data: res} = await this.$http.get('/fan/myfan');
      this.fans = res.data;
    },
    async getIdol() {
      let {data: res} = await this.$http.get('/fan/myuser');
      this.idols = res.data;
    },
  },
  components:{ myhead,myfooter },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid_item{
    padding: 0.3125rem 0.5rem;
  }
  .poster > img,.van-image__img {
    border-radius: 0.3125rem;
  }
  .van-grid-item__content{
    padding: 0 0.5rem;
  }
  .peoples{
    position: relative;
    padding: .3rem .4rem 1rem .4rem;
  }
  .people{
    position: relative;
    width: 100%;
    height: 1rem;
    border-bottom: #0000001f .03rem solid;
    padding-bottom: .4rem;
    margin-bottom: .4rem;
  }
  .people-face{
    position: absolute;
    height: 1rem;
    width: 1rem;

  }
  .people-face > img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .people-content-name{
    position: absolute;
    left: 1.4rem;
    margin: 0;
    font-size: .4rem;
  }
  .people-content-description{
    position: absolute;
    left: 1.4rem;
    top: .5rem;
    font-size: .3rem;
    margin: 0;
  }
  .vip{
    color: red;
  }
  .people-option{
    position: absolute;
    right: 0;
    height: 1rem;
    width: 2rem;
    text-align: center;
  }
  .guanzhu{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

</style>
