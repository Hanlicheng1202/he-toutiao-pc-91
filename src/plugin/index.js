import Mianbao from '@/components/mianbao'
import Channel from '@/components/channel'
export default {
  install: (Vue) => {
    Vue.component(Mianbao.name, Mianbao)
    Vue.component(Channel.name, Channel)
  }
}
