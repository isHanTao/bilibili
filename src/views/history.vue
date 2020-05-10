<template>
   <keep-alive>
<div>
      <MyTitle :title="'历史记录'"></MyTitle>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div style="width: 100%;">
          <div class="list-item" v-if="item.article" v-for="item in articles" :key="item.id+Math.random()+''" @click="$router.push('/detail/'+item.id)">
            <img :src="item.article.poster" alt="">
            <div class="list-item-text">
              <p class="list-item-text-title van-ellipsis">{{item.article.title}}</p>
              <van-tag round type="danger">{{tranNumber(item.article.hot_num,1)}}热度</van-tag>
              <p class="list-item-text-detail">
                <span>{{timeago(item.created_at)}}</span>
              </p>
            </div>
          </div>
          <div v-else></div>
        </div>
      </van-list>
      </div>
    </keep-alive>
</template>

<script>
  import MyTitle from '@/components/MyTitle';
  export default {
    name: 'index',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        loading: true,
        finished: false,
        articles: [],
        articlecount: 0,
        page: 1,

      }
    },
    methods: {
      async onLoad() {
        if (this.page + 1 <= this.articlecount / 10 + 1) {
          this.page++;
          await this.getList();
        }
      },
      onRefresh() {
        this.getList();
      },
      async getList() {
        this.loading = true;
        let {
          data: res
        } = await this.$http.get('/article/history?limit=10&page=' + this.page);
        this.articles = this.articles.concat(res.data);
        this.loading = false;
        this.articlecount = res.count;
        console.log(this.articlecount)
        if (this.articlecount <= this.articles.length) {
          this.finished = true;
        }
      },
      timeago(timestr) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        timestr = timestr.replace(/-/g, '/');
        var time = new Date(timestr);
        let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime(); //获取当前时间毫秒
        let diffValue = now - time; //时间差
        if (diffValue < 0) {
          return;
        }
        let minC = diffValue / minute; //计算时间差的分，时，天，周，月
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
    async created() {
      this.getList();
      this.loading = false;
    },
    components:{
      MyTitle
    }
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

  .item-content-item>img {
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
    color: #ccc;
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
    border-radius: .2rem;
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

  .list-item>img {
    width: 30%;
    height: 100%;
    border: #e0e0e0 solid .03rem;
    border-radius: 10%;
  }

  .poster>img,
  .van-image__img {
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
    height: 6rem;
  }

  .detail-text {
    height: 1rem;
    overflow: no-display;
  }

  >>>.van-grid-item__content {
    background-color: #eaeaea;
  }
</style>
