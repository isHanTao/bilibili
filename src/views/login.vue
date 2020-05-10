<template>
  <div class="login-content">
    <div class="content">
      <div class="title">
        Blessed Started
      </div>
      <div class="inputs">
        <div class="input-item">
          <van-field v-model="username" label="用户名称" />
        </div>
        <div class="input-item">
          <van-field v-model="password" type="password" label="密码"/>
        </div>
        <button class="my-button" @click="login">登 录</button>
        <p class="my-tips">登录就表示你同意 <span>用户协议</span> ，和<span>隐私策略</span> </p>
        <button class="my-button my-button-register" @click="toRegister">马上注册</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        if (this.username === '') {
          return this.$toast('请输入用户名')
        }
        if (this.password === '') {
          return this.$toast('请输入密码')
        }
        const {
          data: res
        } = await this.$http.post('/auth/login', {
          identifier: this.username,
          credential: this.password,
        });
        if (res.code === 1) {
          return this.$toast(res.msg)
        }
        window.localStorage.setItem('token', 'Bearer ' + res.data.access_token);
        this.$toast('登录成功');
        this.$router.push('/index/main');
      },
      toRegister(){
        this.$router.push('/regieter')
      }
    }
  }
</script>

<style scoped>
  .login-content {
    height: 100%;
    background-color: #ecececb5;
  }

  .my-line {
    display: block;
    height: .06rem;
    width: 0%;
    transition: all .7s;
    background-color: #DD4A68;
  }

  .title {
    text-align: center;
    color: #DD4A68;
  }

  .my-inputs:focus+.my-line {
    width: 100%;
  }

  .my-tips {
    color: #000;
    font-size: .2rem;
    text-align: center;
  }

  .my-tips>span {
    color: #DD4A68;
  }
  .content{
    min-height: 40%;
  }
  .inputs {
    padding: .5rem;
    position: absolute;
    top: 40%;
    left: 50%;
    width: 80%;
    font-size: .5rem;
    transform: translateY(-50%) translateX(-50%);
  }

  .input-item {
    margin-top: .5rem;
    margin-bottom: .5rem;
  }

  input::-webkit-input-placeholder {
    color: #000;
    font-size: .3rem;
  }

  .my-inputs {
    width: 100%;
    background: none;
    border: none;
    color: #484848;

  }

  .my-button {
    width: 100%;
    border: none;
    font-size: .5rem;
    line-height: 1rem;
    background: #ffb1c1;
    color: white;
  }
  .my-button-register{
    width: 50%;
    background: ##9fc171;
    float: right;
  }
</style>
