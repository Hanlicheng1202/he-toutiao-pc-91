<template>
  <div class="container-login">
    login
    <el-card class="mycard">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="yanzhengma" placeholder="请输入验证码" style="width:240px;margin-right:20px"></el-input>
          <el-button>发送短信</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="flag" @click="flag=!flag">我已经阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {},
      tel: '',
      yanzhengma: '',
      flag: false
    }
  }
}
</script>
<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center/cover;
  .mycard {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    display: block;
    margin: 0 auto 30px;
    height: 50px;
  }
}
</style>
