<template>
    <div class="login-content">
      <div class="title">
        Blessed
      </div>
      <div class="inputs">
        <input type="text" class="my-inputs" v-model="username" placeholder="USERNAME">
        <input type="password" class="my-inputs" v-model="password" placeholder="PASSWORD">
        <button class="my-button" @click="login">登   录</button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "login",
      data(){
        return{
          username:'',
          password:'',
        }
      },
      methods:{
        async login() {
          if (this.username === '') {
            return this.$toast('请输入用户名')
          }
          if (this.password === '') {
            return this.$toast('请输入密码')
          }
          const {data: res} = await this.$http.post('/auth/login', {
            identifier: this.username,
            credential: this.password
          });
          if (!res.access_token){
            return this.$toast('账号或密码错误')
          }
          window.localStorage.setItem('token', 'Bearer ' + res.access_token);
          this.$toast('登录成功');
          this.$router.push('/');
        },
      }
    }
</script>

<style scoped>
  .login-content{
    background-image: url("../assets/background.png");
    height: 100%;
    background-size: 100% 100%;
    background-position: left top;
  }
  .title{
    text-align: center;
    color: #e8e6e1;
    padding-top: 5rem;
  }
  .inputs{
    padding: .5rem;
    position: absolute;
    top: 50%;
    font-size: .5rem;
    transform: translateY(-50%);
  }
  input::-webkit-input-placeholder{
    color: #ccc;
    font-size: .5rem;
  }
  .my-inputs{
    width: 100%;
    margin-bottom: 1rem;
    background: none;
    border: none;
    color: #484848;
    border-bottom: .05rem #6ab6b7 solid;
  }
  .my-button{
    width: 100%;
    border: none;
    font-size: .5rem;
    line-height: 1rem;
    background: #d0e7d3;
    color: #277387;
    text-space: .5rem;
  }
</style>
