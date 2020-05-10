<template>
  <div>
    <MyTitle :title="article.title"></MyTitle>
    <div class="article-detail-box">
      <van-image :src="article.poster"  width="100%">
        <template v-slot:error>加载失败</template>
      </van-image>
      <div class="article-detail" id="my-editor" v-html="article.content">
      </div>
    </div>
    <div class="article-detail-options">
      <van-row>
        <van-col span="6" class="mycol">
          <img src="../assets/zan-shixin.png" v-if="article.iszan === -1||article.iszan === 1" alt="" class="article-detail-option" @click="zan">
          <img src="../assets/zaned.png" alt="" v-if="article.iszan === 0" class="article-detail-option" @click="zaned">
        </van-col>
        <van-col span="6" class="mycol">
          <van-icon name="like-o" v-if="!islike" size=".7rem" @click="like" :badge="article.collect_num" />
          <van-icon v-else name="like" size=".7rem" color="red" :badge="article.collect_num" @click="like"/>
        </van-col>
        <van-col span="6" class="mycol">
          <img src="../assets/zan-shixin.png" alt="" class="article-detail-option" v-if="article.iszan === -1||article.iszan === 0" @click="unzan" style="transform: rotate(180deg)">
          <img src="../assets/zaned.png" alt="" class="article-detail-option" v-if="article.iszan === 1" @click="unzaned" style="transform: rotate(180deg)">
        </van-col>
        <van-col span="6" class="mycol">
          <van-icon name="chat-o" size=".8rem" :badge="article.com_num" @click="comment"/>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="show" round position="bottom" :style="{ height: '90%' }">
       <van-field
         v-model="content"
         center
         clearable
         placeholder="请注意你的语言"
       >
         <template #button>
           <van-icon name="chat-o" size=".7rem" @click="submit"/>
         </template>
       </van-field>
      <div class="message-comment-box">
       <div class="message-comment-item" v-for="(item,index) in comments" :key="item.id">
        <div class="message-comment-avatar">
           <img :src="item.user.avatar"  alt="">
           <span class="message-comment-name">{{item.user.nickname}}</span>
           <span class="time">{{timeago(item.updated_at)}}</span>
           <span class="loucen">#{{index+1}}</span>
        </div>
         <p class="message-message-content">{{item.content}}</p>
<!--         <div class="options">
            <van-icon name="good-job-o" size=".7rem"/>
         </div> -->
       </div>
      </div>
    </van-popup>

    <div class="plus" v-if="article.user"@click="guanzhu">
      <img :src="article.user.avatar" alt="">
    </div>
  </div>
</template>

<script>
import MyTitle from '@/components/MyTitle';
import $ from 'jquery';
import '../assets/prism';
import { ImagePreview } from 'vant';

export default {
  name: 'detail-article',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      article:{},
      islike:true,
      show:false,
      content:'',
      comments:[],
    }
  },
  methods:{
    async getArticle() {
      let {data: res} = await this.$http.get('/article/'+this.$route.params.article_id);
      if(res.code === 1){
        this.$router.push('/404')
      }
      this.article = res.data;
      this.islike = res.data.islike
      $(".article-detail").on("click",'img',function () {
        new ImagePreview([
          $(this).attr('src')
        ])
      });
    },

    async getComment() {
      let {data: res} = await this.$http.get('/article/comment/'+this.$route.params.article_id);
      this.comments = res.data;
      console.log(this.comments)
    },
    zaned(){
      this.$toast('已经赞word 哥');
    },
    unzaned(){
      this.$toast('你可别踩了');
    },
    goToUser(){
      this.$toast('查看用户');
    },
    async zan() {
      this.article.iszan = 0;
      let {data: res} = await this.$http.post('/article/zan',{article_id:this.article.id,type:0});
      if (res.code == 0) {
        this.$toast('点赞成功');
      } else
        this.$toast('点赞失败了QAQ')
    },
    async unzan() {
      this.article.iszan = 1;
      let {data: res} = await this.$http.post('/article/zan', {article_id: this.article.id, type: 1});
      if (res.code == 0) {
        this.$toast('你踩了这篇文章');
      } else
        this.$toast('操作失败了QAQ')
    },
    like(){
      this.collect();
      this.islike = !this.islike;
    },
    comment(){
      this.getComment();
      this.show = true;
    },
    guanzhu() {
      this.$router.push('/otherinfo/'+this.article.user.id)
    },

    async collect() {
      let {data: res} = await this.$http.post('/article/collect/'+this.article.id);
      if (res.code == 0){
        this.$toast('操作成功QAQ');
      }
      else
        this.$toast('操作失败QAQ')
    },
    async submit(){
      let {data: res} = await this.$http.post('/article/comment/'+this.article.id,{content:this.content});
      if (res.code == 0){
        this.getComment();
        this.$toast('评论成功');
      }
      else
        this.$toast('操作失败，请重试')
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
  },
  mounted () {

  },
  created(){
    this.getArticle();
  },
  components:{ MyTitle },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only !-->
<style>
  @import "../assets/common.css";
  @import "../assets/prism.css";

  .article-detail-option{
    display: inline-block;
    color: #636363;
    width: .6rem;
    height: .6rem;
    position: relative;
  }
  .article-detail-options{
    border-bottom: rgba(191, 191, 191, 0.54) .03rem solid;
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #efefef;
  }
  .message-comment-item{
    margin-bottom: 1rem;
  }
  .mycol{
    text-align: center;
  }
  .article-detail-option > img{
    width: 100%;
    position: absolute;
  }
  .article-detail{
    font-size: .4rem;
  }
  .article-detail{
    padding: .05rem;

  }
  .article-detail img{
    max-width: 100% !important;
    height: auto;
  }
  .message-comment-box{
    padding-bottom: 1.3rem;
  }
  .say{
    font-size: .3rem;
    color: #cc99cd;
  }
  .message-comment-avatar{
    height: 1rem;
    display: flex;
  }
  .message-comment-avatar > img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .message-comment-name{
    font-size: .3rem;
    margin: 0;
    display: inline-block;
    font-weight: bold;
    line-height: 1rem;
    text-indent: .5rem;
  }

  .message-message-content{
    text-indent: .4rem;
  }
  .time{
    font-size: .3rem;
    margin: 0;
    display: inline-block;
    color: #CCCCCC;
    line-height: 1rem;
    text-indent: .5rem;
    flex: 1;
    text-align: right;
    margin-right: 1rem;
  }
  .loucen{
    font-size: .3rem;
    margin: 0;
    display: inline-block;
    color: #CCCCCC;
    line-height: 1rem;
    text-align: right;
    margin-right: .1rem;
  }
  p{
    margin: .1rem;
    font-size: .4rem;
  }

  .plus {
    position: fixed;
    right: .5rem;
    bottom: 2rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .van-icon-good-job-o{
    margin-right: 1rem;
  }

  .plus img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .options{
    display: flex;
    justify-content: flex-end;
  }
  .van-popup{
    overflow-x: hidden;
  }

  .article-detail-box {
      padding: .05rem;
      padding-bottom: 1.4rem;
  }

</style>
