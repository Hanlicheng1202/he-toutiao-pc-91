<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <mianbao>{{$route.query.id ? '修改' : '发布'}}文章</mianbao>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
           <!-- 封面组件 -->
          <div v-if="articleForm.cover.type===1">
            <myimage v-model="articleForm.cover.images[0]"></myimage>
          </div>
          <div v-if="articleForm.cover.type===3">
            <myimage v-model="articleForm.cover.images[0]"></myimage>
            <myimage v-model="articleForm.cover.images[1]"></myimage>
            <myimage v-model="articleForm.cover.images[2]"></myimage>
          </div>
        </el-form-item>
        <el-form-item label="频道：" >
           <div>
             <!-- 频道组件 -->
              <channel v-model="articleForm.channel_id"></channel>
           </div>
        </el-form-item>
        <el-form-item v-if="this.$route.query.id">

          <el-button type="success" @click="editArticle()">修改</el-button>

        </el-form-item>
        <el-form-item v-else >
          <!-- 绑定 发表按钮  和  存入草稿按钮 的点击事件  指定同一个函数 -->
          <el-button type="primary" @click="addArticle(false)">发表</el-button>
          <el-button @click="addArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import '@/styles/index.less'
// 导入富文本相关资源
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  created () {
    // 组件初始化需要重置，（编辑点击发布文章的时候，切换历史的时候重置）
    this.resetData()
  },
  watch: {
    // 监听到 地址栏ID 数据的变化
    '$route.query.id' () {
      this.resetData()
    }
  },
  data () {
    return {
      // 声明文章所需数据
      articleForm: {
        // 標題內容
        title: null,
        // 封面
        cover: {
          type: 1,
          images: []
        },
        // 频道id
        channel_id: null,
        // 富文本編輯器內容
        content: null
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    async addArticle (draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        this.$message.success(draft ? '存入草稿成功' : '发表成功')
        // 跳转到内容管理
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.$route.query.id}`)
      this.articleForm = data
    },
    // 修改文章
    async editArticle () {
      try {
        await this.$http.put(`articles/${this.$route.query.id}?draft=false`, this.articleForm)
        this.$message.success('修改成功')
        // 跳转到内容管理
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('修改失败')
      }
    },
    // 重置数据 根据是否有ID来给表单赋值
    resetData () {
      if (this.$route.query.id) {
        // 编辑 获取文章数据
        this.getArticle()
      } else {
        // 发布  清空数据
        this.articleForm = {

          // 標題內容
          title: null,
          // 封面
          cover: {
            type: 1,
            images: []
          },
          // 频道id
          channel_id: null,
          // 富文本編輯器內容
          content: null

        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
