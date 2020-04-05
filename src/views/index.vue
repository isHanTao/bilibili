<template>
  <div>
    <myhead></myhead>
    <div class="my-content">
      <van-tabs swipeable animated sticky @change="tableChange">
        <van-tab title="首页">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="image in images" :key="image">
              <van-image class="poster" :src="require('../'+ image)" radius="5"></van-image>
            </van-swipe-item>
          </van-swipe>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-grid :border="false" :column-num="2" :center="false">
              <van-grid-item v-for="(item,index) in article" :key="item.id + ''+ Math.random(index)"
                             @click="$router.push('/detail/'+item.id)">
                <div class="item-content">
                  <div class="item-content-img">
                    <van-image class="poster" :src="item.poster" radius="5"
                               height="120">
                      <template v-slot:error>加载失败</template>
                    </van-image>
                    <div class="icons">
                      <span class="item-content-item">
                        <img src="../assets/hot.png" alt="">{{tranNumber(item.hot_num,1)}}
                      </span>
                      <span class="item-content-item">
                        <img src="../assets/zan.png" alt="">{{tranNumber(item.zan,1)}}
                      </span>
                    </div>
                  </div>
                  <div class="detail-text">
                    <p class="van-multi-ellipsis--l2">{{item.title}}</p>
                  </div>
                </div>

              </van-grid-item>

            </van-grid>
          </van-pull-refresh>

        </van-tab>

        <van-tab title="推荐">
          <van-list
            v-model="tuijian_loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div style="width: 100%; padding: .3rem  .1rem">
              <div class="list-item" v-for="item in recommend" :key="item.id+Math.random()+''"
                   @click="$router.push('/detail/'+item.id)">
                <img :src="item.poster" alt="">
                <div class="list-item-text">
                  <p class="list-item-text-title van-ellipsis">{{item.title}}</p>
                  <span class="list-item-text-icon">{{tranNumber(item.zan,1)}}点赞</span>
                  <span class="list-item-text-icon list-item-text-icon-red">{{tranNumber(item.hot_num,1) }}热度</span>
                  <p class="list-item-text-detail">
                    <span>{{timeago(item.created_at)}}</span>
                  </p>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>

        <van-tab title="热门">
          <div style="width: 100%; padding: .3rem  .1rem">
            <div class="list-item" v-for="item in hot" :key="item.id+Math.random()+''"
                 @click="$router.push('/detail/'+item.id)">
              <img :src="item.poster" alt="">
              <div class="list-item-text">
                <p class="list-item-text-title van-ellipsis">{{item.title}}</p>
                <span class="list-item-text-icon">{{tranNumber(item.zan,1)}}点赞</span>
                <span class="list-item-text-icon list-item-text-icon-red">{{tranNumber(item.hot_num,1) }}热度</span>
                <p class="list-item-text-detail">
                  <span>{{timeago(item.created_at)}}</span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="关注">
          <p>功能还在开发中QAQ</p>
        </van-tab>

        <van-tab title="最新">
          <van-list
            v-model="new_loading"
            :finished="new_finished"
            finished-text="没有更多了"
            @load="newOnLoad"
          >
            <div style="width: 100%; padding: .3rem  .1rem">
              <div class="list-item" v-for="item in newest" :key="item.id+Math.random()+''"
                   @click="$router.push('/detail/'+item.id)">
                <img :src="item.poster" alt="">
                <div class="list-item-text">
                  <p class="list-item-text-title van-ellipsis">{{item.title}}</p>
                  <span class="list-item-text-icon">{{tranNumber(item.zan,1)}}点赞</span>
                  <span class="list-item-text-icon list-item-text-icon-red">{{tranNumber(item.hot_num,1) }}热度</span>
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

    <myfooter></myfooter>
  </div>
</template>

<script>
  import myhead from '@/components/Head';
  import myfooter from '@/components/Footer';

  export default {
    name: 'index',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        article: [],
        images: ['assets/img.jpg',
          'assets/img2.jpg'],
        list: [],
        loading: false,
        tuijian_loading: false,
        new_loading: false,
        new_finished: false,
        finished: false,
        newest: [],
        newCount:0,
        newPage: 0,
        recommend: [],
        recommendCount: 0,
        recommendPage: 0,
        hot: [],
      }
    },
    methods: {
      tableChange(name, title) {
        switch (name) {
          case 0:
            break;
          case 1:
            this.onLoad();
            break;
          case 2:
            this.indexListHot();
            break;
          case 4:
            this.newOnLoad();
            break;
        }
      },
      async onLoad() {
        // 异步更新数据
        // 加载状态结束
        if (this.recommendPage + 1 <= this.recommendCount / 10 + 1) {
          this.recommendPage++;
          await this.indexListRecommend();
        }
      },
      async newOnLoad() {
        // 异步更新数据
        // 加载状态结束
        if (this.newPage + 1 <= this.newCount / 10 + 1) {
          this.newPage++;
          await this.indexListNewest();
        }
      },
      onRefresh() {
        this.indexList();
      },
      async indexList() {
        let {data: res} = await this.$http.get('/article/list');
        this.article = res.data.concat(this.article);
        this.loading = false;
      },
      async indexListRecommend() {
        let {data: res} = await this.$http.get('/article/list/recommend?limit=10&page=' + this.recommendPage);
        this.recommend = this.recommend.concat(res.data);
        if (this.recommendCount <= this.recommend.length) {
          this.finished = true;
        }
      },
      async indexListHot() {
        let {data: res} = await this.$http.get('/article/list/hot');
        this.hot = res.data;
      },
      async indexListNewest() {
        let {data: res} = await this.$http.get('/article/list/newest?limit=10&page=' + this.newPage);
        this.newest =  this.newest.concat(res.data);
        if (this.newCount <= this.newest.length) {
          this.new_finished = true;
        }
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
    created: async function () {
      this.indexList();
      this.loading = false;
      let {data: res} = await this.$http.get('/article/list/recommend');
      this.recommendCount = res.count;
      let {data: res2} = await this.$http.get('/article/list/newest');
      this.newCount = res2.count;
    },

    components: {myhead, myfooter},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    font-size: .3rem;
    text-align: left;
    display: block;
    width: 100%;
    margin: 0;
  }

  .item-content-img {
    position: relative;

  }

  .item-content-item {
    display: inline-block;
    font-size: .3rem;
    color: white;
    line-height: .3rem;
  }

  .icons {
    display: inline-block;
    position: absolute;
    left: .1rem;
    bottom: .1rem;
  }

  .item-content-item > img {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    padding: .02rem .05rem;
    border-radius: .09rem;
    border: #ffffff73 .02rem solid;
  }

  .grid_item {
    padding: 0.3125rem 0.5rem;
  }

  .list-item-text-title {
    display: block;
    position: absolute;
    font-size: .3rem;
    top: 0;
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

  .poster > img, .van-image__img {
    border-radius: 0.3125rem;
  }

  .van-grid-item__content {
    padding: 0 0.5rem;
  }

  .drawer-content {
    background-color: #ffffff;
  }

  .content-wrap {
    background-color: #FFFFFF;
  }

  .drawer-contain {
    height: 100%;
    background: #000000;
  }

  .my-content {
    position: relative;
    padding-bottom: 40px;
  }

  .item-content {
    background-color: white;
    border-radius: .2rem;
    padding: .1rem;
    position: relative;
  }

  .poster {
    height: 4.5rem;
  }

  .detail-text {
    height: 1rem;
    overflow: no-display;
  }

  >>> .van-grid-item__content {
    background-color: #eaeaea;
  }
</style>
