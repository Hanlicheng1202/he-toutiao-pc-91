<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <mianbao>个人设置</mianbao>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号:">{{user.id}}</el-form-item>
            <el-form-item label="手机号码:">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="user.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱账号:">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updateUserPhoto"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
export default {
  data () {
    return {
      // 提交的用户信息
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取个人信息 渲染表单 显示头像
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      // console.log(data)

      this.user = data
    },
    // 点击保存 修改用户信息
    async updateUserInfo () {
      try {
      // 后台接口只接收3个数据  所以只需要提交3个数据
        const { name, intro, email } = this.user
        await this.$http.patch('user/profile', { name, intro, email })
        this.$message.success('保存成功')
        // 更新home组件的用户名称
        eventBus.$emit('updateUserName', name)
      } catch (e) {
        this.$message.error('保存个人信息失败')
      }
    },
    // 自定义上传图片方法   选择图片后触发
    async updateUserPhoto ({ file }) {
      try {
        const formdata = new FormData()
        // 追加文件对象  'user'
        formdata.append('photo', file)
        // 通过axios提交数据
        const { data: { data } } = await this.$http.patch('user/photo', formdata)
        this.$message.success('修改头像成功')
        // 预览
        console.log(data)

        this.user.photo = data.photo
        // 把头像地址传递到home组件
        eventBus.$emit('updateUserPhoto', data.photo)
      } catch (e) {
        this.$message.error('修改失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
</style>
