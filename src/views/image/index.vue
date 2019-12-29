<template>
  <div>
    <el-card>
        <div slot="header">
           <mianbao>素材管理</mianbao>
        </div>
            <!-- 按钮区域 -->
      <div class="btn_box">
        <el-radio-group v-model="filterParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="openDialog()">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!filterParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleStatus(item)"></span>
            <span class="el-icon-delete" @click="del(item.id)"></span>
          </div>
        </div>
      </div>
       <!-- 分页区域 -->
      <el-pagination
       background
       layout="prev, pager, next"
        :total="total"
        :current-page="filterParams.page"
        :page-size='filterParams.per_page'
        @current-change="changePager">
        </el-pagination>

    </el-card>
      <!-- 对话框 -->
    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"

        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  created () {
    this.getImages()
  },
  data () {
    return {
      // 筛选参数
      filterParams: {
        // 值是false时是 全部 值是true时 是收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 图片总数量
      total: 0,
      dialogVisible: false,
      // 预览图
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.get().token}`
      }
    }
  },
  methods: {
    async getImages () {
      const { data: { data: res } } = await this.$http.get('user/images', { params: this.filterParams })
      // 将获取的值赋值给images
      // console.log(res)

      this.images = res.results
      this.total = res.total_count
    },
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    // 处理切换 全部与收藏
    changeCollect () {
      this.filterParams.page = 1
      this.getImages()
    },
    async toggleStatus (item) {
      try {
        const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
        // 提示信息
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星样式  修改当前图片的数据 is_collected值改成后台返回的值即可
        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    async del (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        // 提示信息
        this.$message.success('删除图片成功')
        //  删除成功 重新加载
        this.getImages()
      } catch (e) {
        this.$message.error('删除失败')
      }
    },
    // 打开上传对话框
    openDialog () {
      this.dialogVisible = true
    },
    // 上传成功的回调函数
    uploadSuccess (res) {
      console.log(res)
      // 预览图片
      this.imageUrl = res.data.url

      // 成功的提示
      this.$message.success('上传成功')
      // 2s关闭对话框 更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.getImages()
        // 重新给imageUrl赋值
        this.imageUrl = null
      }, 2000)
    }
  }

}
</script>

<style lang="less" scoped>
.btn_box{
  margin-bottom: 20px;
}
.img_list {
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 0 30px 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
      }
      .red{
        color: red;
      }
    }
  }
}

</style>
