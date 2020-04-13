<template>
  <div>
    <MyTitle :title="'个人中心'"></MyTitle>
    <div>
      <div>
        <div style="text-align: center;padding-top: .5rem">
          <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead"/>
        </div>
        <van-form validate-first>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field
            v-model="user.username"
            placeholder="登录账号"
            label="登录账号"
            disabled
          />
          <van-field
            v-model="user.nickname"
            placeholder="昵称"
            label="昵称"
          />
          <van-field
            v-model="user.description"
            placeholder="骚话"
            label="骚话"
          />
<!--          <van-field-->
<!--            v-model="user.password"-->
<!--            placeholder="密码不输入，就不该"-->
<!--            type="password"-->
<!--            label="密码"-->
<!--          />-->
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="user.gender" direction="horizontal">
                <van-radio name="0">保密</van-radio>
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="user.birth"
            label="出生日期"
            placeholder="点击选择"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="area"
            :value="user.address"
            label="所在城市"
            placeholder="点击选择"
            @click="showArea = true"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onConfirmArea"
              @cancel="showArea = false"
            />
          </van-popup>

          <div style="margin: 16px;">
            <van-button round block type="info" @click="submit">
              保存
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  import MyTitle from '@/components/MyTitle';
  import list from '../assets/area';
  export default {
    name: "userinfo",
    components: {MyTitle},
    data() {
      return {
        user: {},
        fileList: [],
        areaList: list,
        showPicker: false,
        showArea: false,
        minDate: new Date(1980, 0, 1),
        maxDate: new Date(),
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo() {
        let {data: res} = await this.$http.get('/userinfo');
        this.user = res.data;
        this.user.gender = this.user.gender + '';
        this.fileList.push({url: this.user.avatar})
      },
      async afterRead(file) {
        let data = new FormData();
        data.append('id',this.user.id);
        data.append('avatar',file.file);
        let {data: res} = await this.$http.post('/useravatar',data);
        if (res.code===0){
          this.$toast('上传成功')
        }else {
          this.$toast('上传失败')
        }
      },
      onConfirm(time) {
        this.user.birth = this.dateFormat('Y-m-d',time);
        this.showPicker = false;
      },
      onConfirmArea(values) {
        this.user.address = values.map(item => item.name).join('/');
        this.showArea = false;
      },
      async submit() {
        let {data: res} = await this.$http.put('/user', this.user);
        if (res.code === 0) {
          this.$toast('更新成功')
        } else {
          this.$toast('更新失败')
        }
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          }
        }
        return fmt;
      }
    }
  }
</script>

<style scoped>

</style>
