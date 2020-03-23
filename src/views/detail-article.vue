<template>
  <div>
    <myhead></myhead>
    <div class="article-detail" v-html="article.content">

    </div>
    <div v-if="img_url && show" class="pop-img">
      <img :src="img_url" alt="">
    </div>
  </div>
</template>

<script>
import myhead from '@/components/Head';
import $ from 'jquery';
import E from 'wangeditor'
export default {
  name: 'detail-article',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      article:{},
      show:false,
      img_url:'',
    }
  },
  methods:{
    async getArticle() {
      let {data: res} = await this.$http.get('/article/'+this.$route.params.article_id);
      this.article = res.data;
    }
  },
  created:function(){
    this.getArticle();
    $(".article-detail").bind("click","img",(dom)=>{
      dom.stopPropagation();
      console.log(1);
      this.show = true;
      this.img_url = $(dom.target).attr('src');
    })
  },
  components:{ myhead },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "../../node_modules/wangeditor/release/wangEditor.min.css";
  .article-detail{
    font-size: .45rem;
  }
  .pop-img{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
  }
  .pop-img > img{
    margin: auto auto;
    width: 100%;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .article-detail img{
    max-width: 100% !important;
    height: auto;
  }
</style>
