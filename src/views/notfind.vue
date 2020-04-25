<template>
  <p @click="$router.push('/')" class="my-p">回到主页</p>
</template>

<script>

</script>

<style>
  .my-p{
    font-size: .4rem;
    position: absolute;
    top: 50%;
    color: #DD4A68;
    display: block;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
  }
</style>
