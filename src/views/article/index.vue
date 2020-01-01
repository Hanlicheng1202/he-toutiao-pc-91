<template>
  <div class="container-article">
    <!-- 筛选条件区域 -->
    <el-card class="box-card">
      <!-- 头部区域 面包屑  -->
      <div slot="header">
        <!-- 使用面包屑插件 -->
        <mianbao>内容管理</mianbao>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <el-select v-model="filterParams.channel_id" placeholder="请选择"  @change="changeChannel"   clearable>
            <el-option
              v-for="item in channelDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id"

            ></el-option>
          </el-select>-->
           <!-- 使用自己定义的组件 -->
          <channel :value="filterParams.channel_id" @input="filterParams.channel_id=$event"> </channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 使用表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
            <template slot-scope="scope">
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
              <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button  type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
            <el-button   type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page='filterParams.page'
        :page-size='filterParams.per_page'
        @current-change="fenye"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        // 如果不传当值为null  默认查询全部状态
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      // 文章列表
      articles: [],

      // 日期选择后的数组[起始日期,结束日期]
      dateArr: [],
      // 总条数
      total: 0

    }
  },
  created () {
    // this.getChannelData()
    this.getArticleList()
  },
  methods: {
    //   获取频道选项
    // async    getChannelData () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelDatas = data.channels
    // },
    async getArticleList () {
      const { data: { data } } = await this.$http.get('articles', { params: this.filterParams })
      this.articles = data.results
      // 总文章数
      this.total = data.total_count
      // 测试把axios默认的转json对象的方式改成 json-bigint 的方式
      // console.log(this.articles[0].id.toString())
    },
    fenye (newPage) {
      this.filterParams.page = newPage
      this.getArticleList()
    },
    search () {
      // 每次搜索的时候 页码变为1
      this.filterParams.page = 1
      // 加载数据
      this.getArticleList()
    },
    changeDate (value) {
      // value 和this.dateArr的值一致
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    },
    // 频道选择处理函数
    // changeChannel () {
    //   if (this.filterParams.channel_id === '') {
    //     this.filterParams.channel_id = null
    //   }
    // },
    // 编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    async del (articleId) {
      try {
        await this.$http.delete(`articles/${articleId}`)
        this.$message.success('删除成功')
        //  删除成功后重新获取
        this.getArticleList()
      } catch (e) {
        console.log(e)
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin-bottom: 20px;
}
</style>
