<template>
  <div class="error-content">
    <div class="my-error-text">
      发生错误了呢，你可以尝试一下操作
    </div>
	<van-empty image="network" description="系统出现了错误QAQ" />
    <p @click="$router.push('/')" class="my-p">回到主页</p>
    <p @click="$router.push('/login')" class="my-p">回到登录页</p>
  </div>

</template>

<script>

</script>

<style>
  .error-content{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .my-p{
    font-size: .4rem;
    position: relative;
    top: 50%;
    color: #DD4A68;
    display: block;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
  }
  .my-error-text{
    font-size: .4rem;
    position: relative;
    top: 50%;
    color: #DD4A68;
    display: block;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
  }
</style>
