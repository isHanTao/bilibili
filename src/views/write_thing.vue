<template>
  <div class="write_thing">
    <MyTitle title="添加动态"></MyTitle>
    <div class="my-inputs">
      <van-field
        v-model="content"
        rows="10"
        autosize
        type="textarea"
        placeholder="请输入内容"
      >
      </van-field>
      <div class="my-imgs">
        <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="afterRead" :max-count="9"/>
      </div>
    </div>
    <div class="my-push" @click="publish()">发布</div>
  </div>
</template>

<script>
  import MyTitle from '@/components/MyTitle';

  export default {
    name: "write_thing",
    components: {MyTitle},
    data() {
      return {
        content: '',
        fileList: [],
        fileUploadList:[]
      }
    },
    methods: {
      async afterRead(file) {
        let data = new FormData();
        data.append('file', file.file);
        let {data: res} = await this.$http.post('/thing/uploadimg', data);
        if (res.code === 0) {
          this.fileUploadList.push(res.data)
        }
      },
      async publish() {
        if (this.content ===""){
          return this.$toast('请输入内容');
        }
        let {data: res} = await this.$http.post('/thing', {content:this.content,imgs:this.fileUploadList});
        if (res.code === 0) {
          this.$toast('发布成功');
        }
      },
      // 返回布尔值
      beforeRead(file) {
        if (file.type !== 'image/jpeg'&&file.type !== 'image/png') {
          this.$toast('请上传 jpg 格式图片');
          return false;
        }
        return true;
      },

    }
  }
</script>

<style scoped>
  .write_thing {
    min-height: 100%;
    background-color: rgba(185, 185, 185, 0.29);
  }
  .my-push{
    background-color: #f734346b;
    text-align: center;
    font-size: .5rem;
    font-weight: bold;
    color: white;
    line-height: 1rem;
    box-shadow: #878787 .1rem .1rem .1rem;
  }

  .my-inputs {
    background-color: white;
  }

  >>> .van-uploader__wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 100%;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: center !important;
  }
  .van-uploader {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .my-imgs {
    width: 80%;
    margin: auto;
  }
</style>
