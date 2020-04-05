<template>
  <div>
    <van-row>
      <van-col span="1" class="head-block avatar" >
      </van-col>
      <van-col span="3" class="head-block avatar">
        <van-image round width="1rem" height="1rem"  :src="avatar" @click='show_user_info=true'/>
      </van-col>
      <van-col span="19" class="head-block">
        <van-search placeholder="请输入搜索关键词" v-model="value"  shape="round">
        </van-search>
      </van-col>
      <van-col span="1" class="head-block">
      <van-popup v-model="show_user_info" position="left" :style="{ height: '100%',width:'61.8%' }">
        <div v-if="userinfo">
          <div class="face-head">
              <img :src="userinfo.avatar" alt="" class="box-my-avatar">
              <p class="face-name">{{userinfo.nickname}}</p>
          </div>
          <div class="fans-box">
            <span>
              <p>{{userinfo.befun_count}}</p>
              <p>关注</p>
            </span>
            <span>
              <p>{{userinfo.thing_count}}</p>
              <p>动态</p>
            </span>
            <span>
              <p>{{userinfo.fun_count}}</p>
              <p>粉丝</p>
            </span>
          </div>
          <div class="menu-box">
            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/home.png" alt="">
              </span>
              <p class="menu-item-text">首页</p>
            </div>
            <div class="line"></div>
            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/history.png" alt="">
              </span>
              <p class="menu-item-text">历史记录</p>
            </div>
            <div class="line"></div>

            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/like.png" alt="">
              </span>
              <p class="menu-item-text" @click="$router.push('/collect')">我的收藏</p>
            </div>



            <div class="line"></div>
            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/userinfo.png" alt="">
              </span>
              <p class="menu-item-text" @click="$router.push('/userinfo')">个人中心</p>
            </div>

            <div class="line"></div>
            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/about.png" alt="">
              </span>
              <p class="menu-item-text" @click="$router.push('/about')">关于我</p>
            </div>

            <div class="line"></div>
            <div class="menu-item">
              <span class="menu-icon ">
                <img src="../assets/quit.png" alt="">
              </span>
              <p class="menu-item-text" @click="logout">退出登录</p>
            </div>
          </div>
        </div>
      </van-popup>
      </van-col>
    </van-row>

  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        value: '',
        show_user_info:false,
        userinfo:null,
        avatar:'',
      }
    },
    methods:{
       async getUserInfo() {
         let {data: res} = await this.$http.get('/userinfo');
         this.userinfo = res.data;
         this.avatar = this.userinfo.avatar
       },
      async logout(){
        const {data : res} = await this.$http.post('/auth/logout');
        window.sessionStorage.clear();
        this.$toast.success('退出成功');
        this.$router.push('/login');
      },
    },

    mounted() {
      this.getUserInfo();
    }
  }
</script>

<style>
  .logo {
    width: 1.5rem;
  }
  .fans-box{
    display: block;
    border-bottom: rgba(224,224,224,0.73) solid 0.02rem;
    border-top: rgba(224,224,224,0.73) solid 0.02rem;
    color: #636363;
  }
  .fans-box > span{
    display: inline-block;
    width: 30%;
    margin: 0;
    font-size: .3rem;
    text-align: center;
  }
  .menu-icon{
    width: 1rem;
    height: 1rem;
    display: inline-block;
  }
  .menu-item{
    height: 1rem;
    padding: .2rem 0;
  }
  .menu-icon > img{
    width: .6rem;
    height: .6rem;
    margin: .2rem .2rem .2rem .2rem;
  }
  .fans-box > span >p{
    margin: 0;
  }
  .head-block{
    height: 1.3rem;
    padding: .1rem;
    vertical-align: middle;
  }
  .menu-item-text{
    display: inline-block;
    height: 1rem;
    font-size: .3rem;
    line-height: 1rem;
    margin: 0;
    position: absolute;
    left: 1.5rem;
  }
  .face-head{
    height: 4rem;
    padding: .7rem;
    background: rgba(249,249,249,0.73);
  }
  .line{
    height: .03rem;
    width: 100%;
    background-color: rgba(210, 208, 208, 0.73);
  }
  .menu-box{
    color: #636363;
  }
  .face-name{
    font-size: .5rem;
    margin: 0;
  }
  .box-my-avatar{
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
  }
  .van-search{
    padding: 0;
  }
  .van-icon::before {
      margin-bottom: 5px;
  }
</style>
