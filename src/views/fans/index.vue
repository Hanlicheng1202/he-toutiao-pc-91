<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <mianbao>粉丝管理</mianbao>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin-top:20px"
            background
            layout="prev,pager,next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="picture">
          <div ref="dom" style="width:600px; height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  created () {
    this.getFansList()
  },
  mounted () {
    // 初始化
    const myChart = echarts.init(this.$refs.dom)
    // 准备一个配置对象 (约定图表怎么绘制)
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]

    }
    // 使用配置
    myChart.setOption(option)
  },
  data () {
    return {
      // 激活卡
      activeName: 'list',
      defaultImage:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      // 粉丝列表
      fansList: [],
      // 请求参数
      reqParams: {
        page: 1,
        per_page: 21
      },
      // 总条数
      total: 0
    }
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<style lang="less" scoped>
.fans_item {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding: 10px 0;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 15px;
  p {
    font-size: 12px;
    padding: 5px 0;
  }
}
</style>
