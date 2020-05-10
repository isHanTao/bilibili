<template>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-grid :border="false" :column-num="2" :center="false">
        <van-grid-item v-for="(item,index) in article" :key="item.id + ''+ Math.random(index)" @click="$router.push('/detail/'+item.id)">
          <div class="item-content">
            <div class="item-content-img">
              <van-image class="poster" :src="item.poster" radius="5" height="120">
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
              <p class="van-multi-ellipsis--l2">{{ item.title.substring(0,23)}}</p>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-pull-refresh>
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
          'assets/img2.jpg'
        ],
        list: [],
        loading: false,
        new_loading: false,
      }
    },
    methods: {
      onRefresh() {
        setTimeout(()=>{
          this.indexList();
        },500)
      },
      async indexList() {
        let {
          data: res
        } = await this.$http.get('/article/list?limit=8');
        this.article = res.data.concat(this.article);
        this.loading = false;
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
      this.indexList();
      this.loading = false;
    },
    components: {
      myhead,
      myfooter
    },
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

  .poster {
    height: 6rem;
  }
  .detail-text {
    height: 1rem;
    overflow: no-display;
  }
  >>>.van-grid-item__content{
    padding: .2rem .1rem !important;
  }

</style>
