<template>
  <div class="container-login">
    login
    <el-card class="mycard" shadow="hover">
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop='mobile'>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:20px"></el-input>
          <el-button>发送短信</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="flag" @click="flag=!flag">我已经阅读和同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// 引入store
import store from '@/store'
export default {

  mounted () {
    console.log(this.$refs)
  },

  data () {
    // 校验手机号的函数

    const checkMobile = (rule, value, callback) => {
      // 校验逻辑：1开头  第二位 3-9 之间  最后 9个数学结尾
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],

        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6', trigger: 'blur' }
        ]
      },

      flag: false
    }
  },
  methods: {
    login () {
      // 先整体表单校验
      this.$refs.loginForm.validate((valid) => {
        // valid 判断是否校验成功
        if (valid) {
          // 进行登录
          // console.log(this.loginForm)
          // 存储用户信息

          this.$http({
            method: 'post',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            data: this.loginForm
          })
            .then(res => {
              console.log(res)

              store.set(res.data.data)
              this.$router.push('/home')
            }).catch(e => {
            // 登录失败
              this.$message.error('手机号或验证码错误')
            })
        }
      })
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
