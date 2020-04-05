<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(window.location.hash)
  }
}
</script>

<style>

</style>
