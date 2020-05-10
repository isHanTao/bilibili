<template>
  <div>
    <div class="header">
      <img :src="avatar" alt="">
    </div>
    <div v-if="userinfo">
      <div class="my-info">
        <div class="myname">
          <img :src="avatar" alt="">
          <p>{{userinfo.nickname}}</p>
        </div>
        <span class="description">
          {{userinfo.description?userinfo.description:'他什么也没有留下'}}
        </span>
        <span v-if="!isguanzhu" @click="guanzhu" class="guanzhu">
          关注
        </span>
        <span v-else @click="buguanzhu" class="guanzhu unguanzhu">
          取消关注
        </span>
        <div class="fans-box">
          <span @click="$toast('哈哈就这么多')">
            <p>{{userinfo.befun_count ? userinfo.befun_count:'还没有人'}}</p>
            <p>关注</p>
          </span>
          <span @click="$toast('哈哈就这么多')">
            <p>{{userinfo.thing_count ?userinfo.thing_count: '我很高冷，不发动态'}}</p>
            <p>动态</p>
          </span>
          <span @click="$toast('哈哈就这么多')">
            <p>{{userinfo.fun_count ?userinfo.fun_count:'成为我第一个粉丝吧'}}</p>
            <p>粉丝</p>
          </span>
        </div>
      </div>
      <van-tabs v-model="myActive" swipeable sticky>
      <van-tab  title="动态">
        <div class="message-box" v-for="(item,index) in things" :key="index">
          <div class="message-head">
            <div class="message-head-avatar">
              <img :src="item.user.avatar" alt="">
            </div>
            <p class="message-box-title">{{item.user.nickname}}</p>
            <span class="time">{{timeago(item.created_at)}}</span>
          </div>
          <div class="message-body">
            <p class="message-body-text">{{item.content}}</p>
            <div class="message-body-img-box">
              <van-grid :border="false" :column-num="3" square clickable>
                <van-grid-item v-for="i in item.imgs" :key="i.url" @click="clickgrid">
                  <img :src="i.url" alt="" class="message-body-img-item">
                </van-grid-item>
              </van-grid>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab  title="收藏">
        <van-list
          v-model="loading"
          :finished="collects_finished"
          finished-text="没有更多了"
          @load="collectOnLoad"
        >
          <div style="width: 100%; padding: .3rem  .1rem">
            <div class="list-item" v-for="item in collects" :key="item.id+Math.random()+''"
                 @click="$router.push('/detail/'+item.id)">
              <img :src="item.poster" alt="">
              <div class="list-item-text">
                <p class="list-item-text-title van-ellipsis">{{item.title}}</p>
                <van-tag round type="warning">{{tranNumber(item.zan,1)}}点赞</van-tag>
                <van-tag round type="danger">{{tranNumber(item.hot_num,1) }}热度</van-tag>
                <p class="list-item-text-detail">
                  <span>{{timeago(item.created_at)}}</span>
                </p>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="投稿">
        <van-list
          v-model="loading"
          :finished="collects_finished"
          finished-text="没有更多了"
          @load="collectOnLoad"
        >
          <div style="width: 100%; padding: .3rem  .1rem">
            <div class="list-item" v-for="item in myarticles" :key="item.id+Math.random()+''"
                 @click="$router.push('/detail/'+item.id)">
              <img :src="item.poster" alt="">
              <div class="list-item-text">
                <p class="list-item-text-title van-ellipsis">{{item.title}}</p>
                <van-tag round type="warning">{{tranNumber(item.zan,1)}}点赞</van-tag>
                <van-tag round type="danger">{{tranNumber(item.hot_num,1) }}热度</van-tag>
                <p class="list-item-text-detail">
                  <span>{{timeago(item.created_at)}}</span>
                </p>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
  </div>
</template>

<script>
import myhead from '@/components/Head';
import myfooter from '@/components/Footer';
import {ImagePreview} from 'vant';
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isguanzhu:true,
      myActive:0,
      fans:null,
      idols:null,
      avatar:'',
      userinfo:null,
      things:[],
      thingspageNum:1,
      thingscount:0,
      collects:[],
      loading:false,
      collects_finished:false,
      page:1,
      count:0,
      mypage:1,
      mycount:0,
      myarticles:[],
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods:{
    async getFans() {
      let {data: res} = await this.$http.get('/fan/myfan');
      this.fans = res.data;
    },
    async getIdol() {
      let {data: res} = await this.$http.get('/fan/myuser');
      this.idols = res.data;
    },
    async getUserInfo() {
      let {data: res} = await this.$http.get('/userinfo/'+this.$route.params.id);
      if(res.code ===0){
        this.userinfo = res.data;
        this.avatar = this.userinfo.avatar;
        this.isguanzhu = this.userinfo.isguanzhu;
        this.getMyArticleList()
        this.getThingsList()
        this.getCollectList()
      }else{
        this.$router.push('/404')
        this.$toast('获取用户信息失败')
      }
    },
    async getThingsList() {
      this.list_loading = true;
      let {data: res} = await this.$http.get('/thing/list/'+this.$route.params.id, {params: {page: this.thingspageNum, limit: 10}});
      if (res.code === 0) {
        this.things = this.things.concat(res.data);
        this.thingscount = res.count;
      }
    },
    async getMyArticleList() {
      console.log('执行')
      this.list_loading = true;
      let {data: res} = await this.$http.get('/article/list/'+this.$route.params.id, {params: {page: this.mypage, limit: 10}});
      if (res.code === 0) {
        this.myarticles = this.myarticles.concat(res.data);
        this.mycount = res.count;
      }
    },
    async collectOnLoad() {
      if (this.page + 1 <= this.count / 10 + 1) {
        this.page++;
        await this.getCollectList();
      }
    },
    async getCollectList() {
      let {data: res} = await this.$http.get('/article/collect/list/'+this.$route.params.id+'?limit=10&page=' + this.page);
      this.collects = this.collects.concat(res.data);
      if (this.count <= this.collects.length) {
        this.collects_finished = true;
      }
    },
    async guanzhu(){
      let user = this.userinfo;
      let {data: res} = await this.$http.post('/fan/'+user.id);
      if (res.code == 0){
        this.isguanzhu = !this.isguanzhu;
        this.$toast('关注['+user.nickname+']成功QAQ');
      }
      else
        this.$toast('关注['+user.nickname+']失败QAQ'+ res.msg)
    },

    async buguanzhu(){
      let {data: res} =  await this.$http.delete('/fan/'+this.userinfo.id);
      if (res.code == 0){
        this.isguanzhu = !this.isguanzhu;
        this.$toast('取消关注['+this.userinfo.nickname+']成功QAQ');
      }
      else
        this.$toast('取消关注['+this.userinfo.nickname+']失败QAQ')
    },
    clickgrid(data) {
      new ImagePreview([
        data.toElement.src
      ]);
    },
    timeago(timestr) {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      timestr = timestr.replace(/-/g, '/');
      var time = new Date(timestr);
      let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
      let hour = minute * 60;
      let day = hour * 24;
      let week = day * 7;
      let halfamonth = day * 15;
      let month = day * 30;
      let now = new Date().getTime();   //获取当前时间毫秒
      let diffValue = now - time;//时间差
      if (diffValue < 0) {
        return;
      }
      let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
      let hourC = diffValue / hour;
      let dayC = diffValue / day;
      let weekC = diffValue / week;
      let monthC = diffValue / month;
      let result;
      if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
      } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
      } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
      } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
      } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
      } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
      } else {
        let datetime = new Date();
        datetime.setTime(time);
        let Nyear = datetime.getFullYear();
        let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
    },
    tranNumber(num, point) {
      let numStr = num.toString()
      // 十万以内直接返回
      if (numStr.length < 6) {
        return numStr;
      }
      //大于8位数是亿
      else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + 'Y';
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 5) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + 'W';
      }
    },
  },
  components:{ },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    width: 100%;
  }
  .header > img{
    width: 100%;
    height: 100%;
  }
  .myname{
    display: inline-block;
    text-align: center;
  }
  .my-info{
    position: relative;
  }
  .myname > p{
    font-size: .4rem;
    margin: 0;
  }
  .myname > img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .description{
    font-size: .3rem;
    display: inline-block;
    line-height: 1rem;
    position: absolute;
    right: .5rem;
    top: .5rem;
    color: #CCCCCC;
  }
  .fans-box{
    display: inline-block;
    width: 100%;
    height: 1rem;
    border: none;
  }
  .fans-box > span{
    display: inline-block;
    width: 30%;
    margin: 0;
    font-size: .3rem;
    text-align: center;
  }
  .message-comment-name {
    display: inline-block;
    font-size: .4rem;
    line-height: .7rem;
    margin: 0;
    font-weight: bold;
    position: absolute;
    left: 1.5rem;
  }
  .right-message{
    padding-bottom: 2rem;
  }

  .message-comment-box {
    background-color: #00000008;
  }

  .say {
    font-size: .3rem;
    color: #cc99cd;
  }

  .message-message-content {
    font-size: .3rem;
    margin: 0;
    text-indent: .5rem;
  }

  .message-comment-item {
    position: relative;
    padding-top: .2rem;
  }

  .message-comment-avatar {
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    display: inline-block;
  }

  .message-comment-avatar > img {
    width: .7rem;
    height: .7rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
  }

  .grid_item {
    padding: 0.3125rem 0.5rem;
  }

  .poster > img, .van-image__img {
    border-radius: 0.3125rem;
  }

  .van-grid-item__content {
    padding: 0 0.5rem;
  }

  .message-body-img-item {
    max-width: 100%;
    max-height: 100%;
  }

  .message-head {
    height: 1rem;
  }

  .message-boxes {
    background-color: rgba(171, 171, 171, 0.25);
    margin-top: .5rem;
    padding-bottom: 2rem;
  }

  .message-box {
    position: relative;
    padding: .3rem;
    background-color: white;
    margin-top: .5rem;

  }

  .message-head-avatar {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: inline-block;
  }

  .message-head-avatar > img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .message-box-title {
    display: inline-block;
    margin: 0;
    line-height: 1rem;
    height: 1rem;
    font-size: .4rem;
    position: absolute;
    font-weight: bold;
    left: 1.5rem;
  }

  .message-body-text {
    font-size: .3rem;
    font-weight: 400;
    text-indent: .5rem;
    line-height: .5rem;
  }

  .time {
    display: inline-block;
    height: 1rem;
    line-height: 1rem;
    color: #636363;
    font-size: .3rem;
    font-weight: 400;
    float: right;
  }

  .plus {
    position: fixed;
    right: .5rem;
    bottom: 2rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  .plus img {
    width: 100%;
  }


  .collect_content{
    width: 98%;
    height: 100%;
  }
  .list-item-text-title {
    display: block;
    position: absolute;
    font-size: .3rem;
    top: 0;
  }

  .real-content{
    width: 100%;
  }

  .list-item-text-detail {
    position: absolute;
    font-size: .2rem;
    bottom: 5%;
    color: #636363;
  }

  .list-item {
    height: 2rem;
    width: 100%;
    position: relative;
    margin: 0.5rem 0;
    padding-top: .3rem;
    border-top: #e0e0e0 solid .03rem;
    overflow: hidden;
  }

  .list-item-text-icon {
    display: inline-block;
    padding: .06rem;
    font-size: .1rem;
    position: relative;
    top: 0;
    color: white;
    background-color: rgba(224, 110, 23, 0.67);
    border-radius: 15%;
  }

  .list-item-text-icon-red {
    background-color: #ff6f6f;
  }

  .list-item-text {
    display: inline-block;
    width: 66%;
    position: absolute;
    left: 34%;
    height: 2rem;
  }

  .list-item > img {
    width: 30%;
    height: 100%;
    border: #e0e0e0 solid .03rem;
    border-radius: 10%;
  }
  .van-tab__pane{
    overflow-x: hidden;
  }
  .list-item-text-title{
    margin: 0;
  }

  .poster > img, .van-image__img {
    border-radius: 0.3125rem;
  }
  .guanzhu{
    height: .7rem;
    font-size: .3rem;
    display: inline-block;
    width: 1.5rem;
    position: absolute;
    left: 3rem;
    top: .5rem;
    line-height: .7rem;
    text-align: center;
    color: white;
    background: #eca3b2;
  }
  .unguanzhu{
    background: #e6e6e6;
    color: #888787;
  }
</style>
