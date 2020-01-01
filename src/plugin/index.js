import Mianbao from '@/components/mianbao'
import Channel from '@/components/channel'
import Image from '@/components/image'
export default {
  install: (Vue) => {
    Vue.component(Mianbao.name, Mianbao)
    Vue.component(Channel.name, Channel)
    Vue.component(Image.name, Image)
  }
}
