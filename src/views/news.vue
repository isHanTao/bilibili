<template>
  <div>
    <myhead></myhead>
    <van-tabs v-model="active" swipeable animated sticky>
      <keep-alive>
      <van-tab :title="'动态'">
        <div class="message-boxes">
          <van-pull-refresh v-model="refreshing_my" @refresh="onRefreshmy">
          <van-list
            v-model="list_loading"
            :finished="list_finished"
            finished-text="没有更多了"
            @load="list_onLoad"
          >
            <div class="message-box" v-if="data.length > 0" v-for="(item,index) in data" :key="index">
              <div class="message-head" @click="$router.push('otherinfo/'+ item.user.id)">
                <div class="message-head-avatar">
                  <img :src="item.user.avatar" alt="">
                </div>
                <p class="message-box-title">{{item.user.nickname}}</p>
                <span class="time">{{timeago(item.created_at) }}</span>
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
          </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      </keep-alive>
      <keep-alive>
        <van-tab :title="'广场'">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="right-message">
            <div class="message-box" v-for="(item,index) in randdata" :key="index">
              <div class="message-head" @click="$router.push('otherinfo/'+ item.user.id)">
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
          </van-pull-refresh>
        </van-tab>
      </keep-alive>
    </van-tabs>
    <div class="plus" @click="$router.push('/index/news/write')">
      <img src="../assets/plus.png" alt="">
    </div>
    <myfooter :my_active="2"></myfooter>
  </div>
</template>

<script>
  import myhead from '@/components/Head';
  import myfooter from '@/components/Footer';
  import {ImagePreview} from 'vant';

  export default {
    name: 'news',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        list_loading: false,
        refreshing: false,
        refreshing_my:false,
        list_finished: false,
        pageNum: 1,
        count:0,
        active: 0,
        data: [],
        randdata: [],
      }
    },
    methods: {
      clickgrid(data) {
        new ImagePreview([
          data.toElement.src
        ]);
      },
      async list_onLoad() {
        await this.getThingsList();
        if (this.count < (this.pageNum) * 4) {
          this.list_finished = true;
        }
        this.pageNum++;
      },
      getThingsList: async function () {
        this.list_loading = true;
        let {data: res} = await this.$http.get('/thing/list', {params: {page: this.pageNum, limit: 4}});
        if (res.code === 0) {
          this.data = this.data.concat(res.data);
          this.count = res.count;
          this.refreshing_my = false;
          this.list_loading = false;
        }
      },
      getThingsRandList: async function () {
        let {data: res} = await this.$http.get('/thing/list/rand');
        if (res.code === 0) {
          if (this.randdata.length> 20){
            this.randdata = this.randdata.slice(6,this.randdata.length-1)
          }
          this.randdata = res.data.concat(this.randdata);
          this.refreshing = false;
        }
      },
      onRefreshmy() {
        this.pageNum = 1;
        this.data = [];
        this.getThingsList();
      },
      onRefresh() {
        this.getThingsRandList();
      },
      goToUser() {
        this.$toast('查看用户');
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
    created() {
      this.getThingsRandList()
    },
    components: {myhead, myfooter},
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
