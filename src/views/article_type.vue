<template>
  <div class="content">
    <MyTitle :title="'分类详情'"></MyTitle>

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <p v-if="article.length===0" style="text-align: center;color: #636363">没有内容QAQ</p>
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
  </div>
</template>

<script>
  import MyTitle from '@/components/MyTitle';

  export default {
        data(){
          return{
            loading:false,
            article:[],
          }
        },
    mounted() {
      this.onRefresh()
    },
    methods:{
        onRefresh() {
          this.indexList();
        },
        async indexList() {
          let {data: res} = await this.$http.get('/article/list?type='+this.$route.params.type_id);
          this.article =this.article.concat(res.data);
          this.loading = false;
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
      components:{MyTitle}
    }
</script>

<style scoped>
  .content{
    position: relative;
    height: 10rem;
  }
  .item-content-img {
    position: relative;

  }
  .detail-text {
    height: 1rem;
    overflow: no-display;
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
  .item-content {
    background-color: white;
    border-radius: .2rem;
    padding: .1rem;
    position: relative;
  }
  p {
    font-size: .3rem;
    text-align: left;
    display: block;
    width: 100%;
    margin: 0;
  }
</style>
