import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import store from '@/store'
import Welcome from '@/views/welcome'
import NotFound from '@/views/notfound'
import Setting from '@/views/setting'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 路由规则
    // 登录

    { path: '/login', component: Login },
    // 首页
    { path: '/',

      component: Home,
      children: [
        { path: '/', component: Welcome },
        // 个人设置模块
        { path: '/setting', component: Setting },
        // 内容模块
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 文章模块
        { path: '/publish', component: Publish }
      ]
    },
    // 404
    { path: '*', component: NotFound }

  ]
})
export default router

router.beforeEach((to, from, next) => {
  // console.log(store.get())

  if (to.path !== '/login' && !store.get().token) {
    // 执行return 后面不执行
    next('/login')
  }
  next()
})
