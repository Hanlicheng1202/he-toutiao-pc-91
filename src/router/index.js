import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 路由规则
    // 登录
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
export default router

router.beforeEach((to, from, next) => {
  console.log(store.get())

  if (to.path !== '/login' && !store.get().token) {
    next('/login')
  }
  next()
})
