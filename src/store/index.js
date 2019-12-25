const Key = 'hm-toutiao-pc-91-user'
export default {
//   存储用户信息
  set (user) {
    window.sessionStorage.setItem(Key, JSON.stringify(user))
  },
  //   获取用户信息
  get () {
    return JSON.parse(sessionStorage.getItem(Key) || '{}')
  },
  // 删除信息
  del () {
    window.sessionStorage.removeItem(Key)
  }
}
