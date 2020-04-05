<template>
  <div class="collect_content">
    <MyTitle :title="'我的收藏'"></MyTitle>
    <div class="real-content">
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
              <span class="list-item-text-icon">{{tranNumber(item.zan,1)}}点赞</span>
              <span class="list-item-text-icon list-item-text-icon-red">{{tranNumber(item.hot_num,1) }}热度</span>
              <p class="list-item-text-detail">
                <span>{{timeago(item.created_at)}}</span>
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import MyTitle from '@/components/MyTitle';

  export default {
    name: "collect",
    components:{MyTitle},
    data(){
      return {
        collects:[],
        loading:false,
        collects_finished:false,
        page:1,
        count:0,
      }
    },
    created() {
      this.getCollectList()
    },
    methods:{
      async collectOnLoad() {
        if (this.page + 1 <= this.count / 10 + 1) {
          this.page++;
          await this.getCollectList();
        }
      },
      async getCollectList() {
        let {data: res} = await this.$http.get('/article/collect/list?limit=10&page=' + this.page);
        this.collects = this.collects.concat(res.data);
        if (this.count <= this.collects.length) {
          this.collects_finished = true;
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
    }
  }
</script>

<style scoped>
  .collect_content{
    width: 98%;
    height: 100%;
  }
  p {
    font-size: .3rem;
    text-align: left;
    display: block;
    width: 100%;
    margin: 0;
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

  .poster > img, .van-image__img {
    border-radius: 0.3125rem;
  }
</style>
