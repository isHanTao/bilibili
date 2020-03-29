<template>
  <div>
    <myhead></myhead>
    <div class="message-boxes">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="list_loading"
          :finished="list_finished"
          finished-text="没有更多了"
          @load="list_onLoad"
        >
          <div class="message-box" v-for="(item,index) in data" :key="index">
            <div class="message-head">
              <div class="message-head-avatar">
                <img src="../assets/like.png"  alt="">
              </div>
              <p class="message-box-title">{{item.title}}</p>
              <span class="time">{{item.time}}</span>
            </div>
            <div class="message-body">
              <p class="message-body-text">{{item.content}}</p>
              <div class="message-body-img-box">
                <van-grid :border="true" :column-num="3" square clickable >
                  <van-grid-item v-for="i in 9" :key="i" @click="clickgrid">
                    <img src="../assets/img.jpg" alt="" class="message-body-img-item">
                  </van-grid-item>
                </van-grid>
              </div>
            </div>
            <div class="message-comment-box">
              <div class="message-comment-item" v-for="i in 3" :key="i">
                <!--                <div class="message-comment-avatar">-->
                <!--                  <img src="../assets/like.png"  alt="">-->
                <!--                </div>-->
                <!--                <p class="message-comment-name">今日的风儿</p>-->
                <!--                <span class="time">{{item.time}}</span>-->
                <p class="message-message-content">真的好看</p>
                <van-divider content-position="right"><p @click="goToUser" class="say">今日的风儿 | 1 小时前</p></van-divider>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <myfooter></myfooter>
  </div>
</template>

<script>
import myhead from '@/components/Head';
import myfooter from '@/components/Footer';
import { ImagePreview } from 'vant';
export default {
  name: 'news',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list_loading:false,
      refreshing:false,
      list_finished:false,
      data:[{
        title:'12312',
        content:'属性设置成false表示内容加载完成，此时会隐藏占位图，并显示Skeleton的子组件段落占位图宽度' +
          '可传数组来设置每一行的宽度段落占位图行数头像占位图大小通过title属性显示标题占位图，通过row属性配置占位段落行数',
        time:'1分钟前'
      }]
    }
  },
  methods:{
    clickgrid(data){
      new ImagePreview([
        data.toElement.src
      ]);
    },
    list_onLoad(){
      setTimeout(()=>{
        this.refreshing = false;
        this.$toast('刷新成功');
        this.data.push({
          title:'我是提缪阿瓦达',
          content:'属性设置成false表示内容加载完成，此时会隐藏占位图，并显示Skeleton的子组件段落占位图宽度' +
            '可传数组来设置每一行的宽度段落占位图行数头像占位图大小通过title属性显示标题占位图，通过row属性配置占位段落行数',
          time:'1分钟前'
        });
        this.data.push({
          title:'我是提缪阿瓦达',
          content:'属性设置成false表示内容加载完成，此时会隐藏占位图，并显示Skeleton的子组件段落占位图宽度' +
            '可传数组来设置每一行的宽度段落占位图行数头像占位图大小通过title属性显示标题占位图，通过row属性配置占位段落行数',
          time:'1分钟前'
        });
        this.data.push({
          title:'我是提缪阿瓦达',
          content:'属性设置成false表示内容加载完成，此时会隐藏占位图，并显示Skeleton的子组件段落占位图宽度' +
            '可传数组来设置每一行的宽度段落占位图行数头像占位图大小通过title属性显示标题占位图，通过row属性配置占位段落行数',
          time:'1分钟前'
        });
        this.list_finished = true;
      },1000)
    },
    onRefresh(){
      setTimeout(()=>{
        this.refreshing = false;
        this.$toast('刷新成功');
      },1000)
    },
    goToUser(){
      this.$toast('查看用户');
    }
  },
  components:{ myhead,myfooter },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .message-comment-name{
    display: inline-block;
    font-size: .4rem;
    line-height: .7rem;
    margin: 0;
    font-weight: bold;
    position: absolute;
    left: 1.5rem;
  }
  .message-comment-box{
    background-color: #00000008;
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
  .message-comment-item{
    position: relative;
    padding-top: .2rem;
  }
  .message-comment-avatar{
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    display: inline-block;
  }
  .message-comment-avatar > img{
    width: .7rem;
    height: .7rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
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
  .message-body-img-item{
    max-width: 100%;
  }
  .message-head{
    height: 1rem;
  }
  .message-boxes{
    background-color: rgba(171, 171, 171, 0.25);
    margin-top: .5rem;
    padding-bottom: 2rem;
  }
  .message-box{
    position: relative;
    padding: .3rem;
    background-color: white;
    margin-top: .5rem;

  }
  .message-head-avatar{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: inline-block;
  }
  .message-head-avatar > img{
    width: 1rem;
    height: 1rem;
  }
  .message-box-title{
    display: inline-block;
    margin: 0;
    line-height: 1rem;
    height: 1rem;
    font-size: .4rem;
    position: absolute;
    font-weight: bold;
    left: 1.5rem;
  }
  .message-body-text{
    font-size: .3rem;
    font-weight: 400;
    text-indent: .5rem;
    line-height: .5rem;
  }
  .time{
    display: inline-block;
    height: 1rem;
    line-height: 1rem;
    color: #636363;
    font-size: .3rem;
    font-weight: 400;
    float: right;
  }
</style>
