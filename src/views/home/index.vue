<template>
  <el-container class="container-home">
    <el-aside :width = "iszhankai ? '200px':'64px'" >
        <div class="logo" :class="{ minlogo: !iszhankai}"></div>
        <!-- <div class="logo" :class="{minLogo: !iszhankai}"></div> -->
        <!-- 导航菜单 -->
        <el-menu
      :default-active="$route.path"
      background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="nav"
        :collapse="!iszhankai"
        :collapse-transition="false"
        router
      >
       <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>

      </el-menu-item>

    </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleAaide"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img :src="photo" alt class="user-icon" />
            <span class="user-name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <!-- 二级路由显示 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      iszhankai: true,
      dialogVisible: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // console.log(store.get())

    this.name = store.get().name
    this.photo = store.get().photo
    this.$http({
      url: 'user/profile',
      method: 'get'
    })
  },

  methods: {
    // 导航栏折叠

    toggleAaide () {
      this.iszhankai = !this.iszhankai
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.del()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.container-home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .el-aside {
    background-color: #002033;
    color: #333;
    text-align: center;
    line-height: 200px;
    .logo{
        height: 60px;
        width: 100%;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;

    }
    // 将来覆盖logo的样式  一定要写在logo的下面才能覆盖logo
   .minlogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu{
      border-right: none;
    }
    .nav {
        text-align: center;
    }
  }
  .el-header {
    background-color: #b3c0d1;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      margin: 0 15px 0 20px;
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      font-size: 16px;
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      margin-right: 10px;
      .user-icon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name {
        color: #333;
        font-weight: bold;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }

}
</style>
