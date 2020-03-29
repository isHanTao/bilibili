<template>
  <van-sticky>
    <div>
      <van-nav-bar
        :title="title"
        left-text="返回"
        @click-left="onClickLeft"
      />
    </div>
  </van-sticky>
</template>

<script>
    export default {
      methods: {
        onClickLeft() {
          this.$router.back()
        }
      },
      props:{
        title:{
          type:String,
          default:''
        }
      }
    }
</script>

<style scoped>

</style>
