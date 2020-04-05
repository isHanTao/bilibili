<template>
  <div>
    <MyTitle :title="article.title"></MyTitle>
    <div class="article-detail-box">
      <div class="article-detail" id="my-editor" v-html="article.content">
      </div>
    </div>
<!--    <div class="message-comment-box">-->
<!--      <div class="message-comment-item" v-for="i in 3" :key="i">-->
<!--        &lt;!&ndash;                <div class="message-comment-avatar">&ndash;&gt;-->
<!--        &lt;!&ndash;                  <img src="../assets/like.png"  alt="">&ndash;&gt;-->
<!--        &lt;!&ndash;                </div>&ndash;&gt;-->
<!--        &lt;!&ndash;                <p class="message-comment-name">今日的风儿</p>&ndash;&gt;-->
<!--        &lt;!&ndash;                <span class="time">{{item.time}}</span>&ndash;&gt;-->
<!--        <p class="message-message-content">真的好看</p>-->
<!--        <van-divider content-position="right"><p @click="goToUser" class="say">今日的风儿 | 1 小时前</p></van-divider>-->
<!--      </div>-->
<!--    </div>-->

    <div class="article-detail-options">
      <van-row>
        <van-col span="6" class="mycol">
          <img src="../assets/zan-shixin.png" v-if="article.iszan === -1||article.iszan === 1" alt="" class="article-detail-option" @click="zan">
          <img src="../assets/zaned.png" alt="" v-if="article.iszan === 0" class="article-detail-option" @click="zaned">
        </van-col>
        <van-col span="6" class="mycol">
          <img src="../assets/heart-null.png" v-if="islike" alt="" class="article-detail-option" @click="like">
          <img src="../assets/heart-red.png" alt="" v-if="!islike" class="article-detail-option" @click="like">
        </van-col>
        <van-col span="6" class="mycol">
          <img src="../assets/zan-shixin.png" alt="" class="article-detail-option" v-if="article.iszan === -1||article.iszan === 0" @click="unzan" style="transform: rotate(180deg)">
          <img src="../assets/zaned.png" alt="" class="article-detail-option" v-if="article.iszan === 1" @click="unzaned" style="transform: rotate(180deg)">
        </van-col>
        <van-col span="6" class="mycol">
          <img src="../assets/comment.png" alt="" class="article-detail-option" @click="comment">
        </van-col>
      </van-row>
    </div>
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
    }
  },
  methods:{
    async getArticle() {
      let {data: res} = await this.$http.get('/article/'+this.$route.params.article_id);
      this.article = res.data;
      $(".article-detail").on("click",'img',function () {
        new ImagePreview([
          $(this).attr('src')
        ])
      });
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
      this.$toast('评论成功');
    },
    async guanzhu() {
      let user = this.article.user;
      let {data: res} = await this.$http.post('/fan/'+user.id);
      if (res.code == 0){
        this.$toast('关注['+user.nickname+']成功QAQ');
      }
      else
        this.$toast('关注['+user.nickname+']失败QAQ'+ res.msg)
    },

    async collect() {
      let {data: res} = await this.$http.post('/article/collect/'+this.article.id);
      if (res.code == 0){
        this.$toast('收藏成功QAQ');
      }
      else
        this.$toast('收藏失败QAQ')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .article-detail-box{
    padding: .05rem;
  }
  .article-detail{
    padding: .05rem;

  }
  .article-detail img{
    max-width: 100% !important;
    height: auto;
  }
  .message-comment-box{
    background-color: #00000008;
    padding-bottom: 1.3rem;
  }
  .say{
    font-size: .3rem;
    color: #cc99cd;
  }

  .message-message-content{
    font-size: .3rem;
    margin: 0;
    text-indent: .5rem;
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

  .plus img {
    width: 100%;
  }

</style>
