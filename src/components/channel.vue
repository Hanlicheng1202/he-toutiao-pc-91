<template>
  <el-select :value="value" @change="changeChannel" clearable placeholder="请选择">
    <el-option
    v-for="item in channelDatas"
    :key="item.id"
    :label="item.name"
    :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'channel',
  props: ['value'],
  created () {
    this.getChannelData()
  },
  data () {
    return {
      channelDatas: []
    }
  },
  methods: {
    //   获取频道选项
    async    getChannelData () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelDatas = data.channels
    },
    // 频道选择处理函数
    changeChannel (channelId) {
    // if (this.channelId === '') this.channelId = null
    //   alert(111)
      if (channelId === '') channelId = null
      // 把选择的频道传递给父组件  父组件去修改数据
      this.$emit('input', channelId)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
