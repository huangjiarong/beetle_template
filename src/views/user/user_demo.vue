<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleMultipleDelete">
        批量删除
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <el-checkbox @change="showIndex(scope.$index)" />
        </template> -->
      </el-table-column>
      <el-table-column label="商品名" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否为新品" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.is_new | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.goods_brief }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品规格" align="center">
        <el-table-column label="规格" width="80px" align="center">
          <template slot-scope="{row}">
            <div v-for="item in row.specifications" :key="item.id">
              <span>{{ item.name }}</span>
              <br>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="80px" align="center">
          <template slot-scope="{row}">
            <div v-for="item in row.specifications" :key="item.id">
              <span>{{ item.price }}</span>
              <br>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="商品封面图" width="100px" align="center">
        <template slot-scope="scope">
          <el-image
            class="table-td-thumb"
            :src="scope.row.cover_img"
            :preview-src-list="[scope.row.cover_img]"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品轮播图" width="180px" align="center">
        <template slot-scope="scope">
          <el-image
            v-for="item in scope.row.slideshow"
            :key="item.id"
            class="table-td-thumb multiple_img"
            :src="item.image"
            :preview-src-list="[item.image]"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品详情图" width="180px" align="center">
        <template slot-scope="scope">
          <el-image
            v-for="item in scope.row.detail_img"
            :key="item.id"
            class="table-td-thumb multiple_img"
            :src="item.image"
            :preview-src-list="[item.image]"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="checkPermission(['admin', 'can_delete'])" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog" :close-on-click-modal="false" :fullscreen="false" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 85%; margin-left:50px;" enctype="multipart/form-data">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类" prop="category">
              <el-select v-model="temp.category" class="filter-item" placeholder="请选择分类">
                <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
            <el-form-item label="商品简短描述" prop="goods_brief" class="goods_brief">
              <el-input v-model="temp.goods_brief" />
            </el-form-item>
            <el-form-item label="新品" prop="is_new">
              <el-switch v-model="temp.is_new" />
            </el-form-item>
            <el-form-item v-if="dialogStatus==='create'" ref="cover" label="封面图" prop="cover_img">
              <el-upload
                ref="upload"
                class="upload-demo"
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUpload"
                :on-remove="onRemove"
                :on-change="onChange"
                :on-exceed="onExceed"
                :limit="1"
                :auto-upload="false"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
            <el-form-item v-else ref="cover" label="封面图" prop="cover_img">
              <el-upload
                ref="upload"
                class="upload-demo"
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUpload"
                :on-remove="onRemove"
                :on-change="onChange"
                :on-exceed="onExceed"
                :limit="1"
                :auto-upload="false"
                :file-list="temp.cover_img"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
            <!-- <el-form-item> -->
            <el-table :data="temp.specifications" class="dialogTable">
              <el-table-column label="商品规格">
                <template slot-scope="{row}">
                  <el-form-item>
                    <el-input v-model="row.name" class="edit-input" size="small" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="商品价格">
                <template slot-scope="scope">
                  <el-form-item :prop="'specifications.'+scope.$index+'.price'" :rules="rulesList(scope.$index)">
                    <el-input v-model="scope.row.price" class="edit-input" size="small" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="删除?">
                <template slot-scope="{row}">
                  <el-switch v-model="row.delete" />
                </template>
              </el-table-column>
            </el-table>
            <!-- </el-form-item> -->
            <el-form-item class="add_new_col">
              <span class="link-type" @click="addNewSpec"> 添加一行 </span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-if="dialogStatus==='create'" ref="slideshow" label="轮播图">
              <el-upload
                ref="uploadSlideshow"
                class="upload-demo"
                multiple
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUploadSlideshow"
                :auto-upload="false"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
            <el-form-item v-else ref="slideshow" label="轮播图">
              <el-upload
                ref="uploadSlideshow"
                class="upload-demo"
                multiple
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUploadSlideshow"
                :on-remove="onRemoveSlideshow"
                :auto-upload="false"
                :file-list="temp.slideshow"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-if="dialogStatus==='create'" ref="detail_img" label="详情图">
              <el-upload
                ref="uploadDetailImg"
                class="upload-demo"
                multiple
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUploadDetailImg"
                :auto-upload="false"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
            <el-form-item v-else ref="detail_img" label="详情图">
              <el-upload
                ref="uploadDetailImg"
                class="upload-demo"
                multiple
                action=""
                accept="image/png, image/jpeg"
                :before-upload="beforeUploadDetailImg"
                :on-remove="onRemoveDetailImg"
                :auto-upload="false"
                :file-list="temp.detail_img"
                list-type="picture"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
        <!-- <el-button @click="dialogFormVisible=false"> -->
        <el-button @click="cancel">
          取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { getAllGoods, getAllCategory, deleteGoods, multipleDeleteGoods, createGoods, updateGoods } from '@/api/goods'
import waves from '@/directive/waves' // waves directive
import checkPermission from '@/utils/permission'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(type) {
      const typeMap = {
        true: '是',
        false: '否'
      }
      return typeMap[type]
    }
  },
  data() {
    // var checkPrice = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('价格不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       callback()
    //     }
    //   }, 1000)
    // }
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      // 该字段用来决定是否进行请求
      toUpload: true,
      uploadForm: new FormData(),
      categoryOptions: [],
      fileList: [],
      temp: {
        name: '',
        category: '',
        goods_brief: '',
        is_new: true,
        specifications: [
          { 'name': '', 'price': '' },
          { 'name': '', 'price': '' }
        ],
        delete_slideshow: []
      },
      originData: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑商品',
        create: '添加新商品'
      },
      dialogPvVisible: false,
      // 表单验证
      rules: {
        category: [{ required: true, message: '分类是必须选择的!', trigger: 'change' }],
        name: [{ required: true, message: '商品名是必须填写的!', trigger: 'blur' }],
        price: [{ type: 'number', message: '必须为数字', trigger: 'blur' }],
        cover_img: [{ required: true, message: '封面图必须选择!', trigger: 'blur' }]
      },
      price_rule1: {
        price: [{ type: 'number', message: '数字!', trigger: 'blur' }]
      },
      price_rule2: {
        price: [{ type: 'number', message: '数字!', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    rulesList: function(index) {
      console.log('ffff   ', index)
      if (this.temp.specifications.index.name) {
        return this.price_rule1
      } else {
        return this.price_rule2
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取table数据
    getList() {
      this.listLoading = true
      getAllGoods(this.listQuery).then(response => {
        this.list = response.results
        this.total = response.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    // 表格多选框的事件
    handleSelectionChange(val) {
      this.selectData = val
    },

    // 批量删除事件
    handleMultipleDelete() {
      var id_lst = []
      this.selectData.forEach(function(element, index, arr) {
        id_lst.push(element.id)
      })
      this.$confirm('此操作将进行批量删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        multipleDeleteGoods(JSON.stringify(id_lst)).then(response => {
          this.list = this.list.filter(t => !this.selectData.some(s => s.id === t.id))
          this.$message({
            type: 'success',
            message: '批量删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消批量删除'
        })
      })
    },

    // 在弹出对话框中添加一行商品规格以供输入
    addNewSpec() {
      this.temp.specifications.push({ 'name': '', 'price': '' })
    },

    // handleFilter() {
    //   this.listQuery.page = 1
    //   this.getList()
    // },

    // sortByID(order) {
    //   if (order === 'ascending') {
    //     this.listQuery.sort = '+id'
    //   } else {
    //     this.listQuery.sort = '-id'
    //   }
    //   this.handleFilter()
    // },

    // 关闭Dialog对话框前的钩子, 清除验证和文件列表
    closeDialog(done) {
      this.$refs.upload.clearFiles()
      this.$refs.uploadSlideshow.clearFiles()
      this.$refs.uploadDetailImg.clearFiles()
      this.$refs['dataForm'].clearValidate()
      done()
    },

    // 对话框中的取消事件, 清除验证和文件列表
    cancel() {
      this.$refs.upload.clearFiles()
      this.$refs.uploadSlideshow.clearFiles()
      this.$refs.uploadDetailImg.clearFiles()
      this.$refs['dataForm'].clearValidate()
      this.dialogFormVisible = false
    },

    // 获取填写的规格信息, 要求2个都不为空
    getSpecifications(specifications) {
      var specList = []
      specifications.forEach(function(element, index, arr) {
        if (element.name && element.price) {
          specList.push(element)
        }
      })
      return specList
    },

    // 打开弹出框时重置表单数据
    resetTemp() {
      this.temp = {
        name: '',
        category: '',
        goods_brief: '',
        is_new: true,
        specifications: [
          { 'name': '', 'price': '', 'delete': false },
          { 'name': '', 'price': '', 'delete': false }
        ]
      }
      this.uploadForm = new FormData()
    },
    // 打开弹出框时重置upload控件的规则
    resetUploadRules() {
      this.rules.cover_img = [{ required: true, message: '封面图必须选择!', trigger: 'blur' }]
    },

    // 添加功能, 弹出添加框
    handleCreate() {
      // 获取可供选择的商品类别
      this.getCategoryOptions()
      this.resetTemp()
      this.resetUploadRules()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 保存新增的数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          this.$refs.uploadSlideshow.submit()
          this.$refs.uploadDetailImg.submit()
          if (!this.toUpload) {
            return false
          }
          if (this.temp.goods_brief) {
            this.uploadForm.append('goods_brief', this.temp.goods_brief)
          }
          this.uploadForm.append('category', this.temp.category)
          this.uploadForm.append('name', this.temp.name)
          this.uploadForm.append('is_new', this.temp.is_new)
          var specList = this.getSpecifications(this.temp.specifications)
          if (specList.length > 0) {
            this.uploadForm.append('specifications', JSON.stringify(specList))
          }
          createGoods(this.uploadForm).then(response => {
            this.list.unshift(response)
            this.uploadForm = new FormData()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 获取弹出框分类选择的数据
    getCategoryOptions() {
      getAllCategory().then(response => {
        this.categoryOptions = response.results
      })
    },
    // 编辑时弹出更新的模态框
    handleUpdate(row) {
      var that = this
      this.temp = JSON.parse(JSON.stringify(row)) // 深拷贝, 不能Object.assign, 因为row是两层
      this.originData = JSON.parse(JSON.stringify(row))
      // 修改下图片数据, 以便upload控件显示
      this.temp.cover_img = [{ 'name': '封面图', 'url': this.originData.cover_img }]
      this.temp.slideshow = []
      this.temp.detail_img = []
      this.temp.delete_slideshow = [] // 保存删除的原有轮播图的id
      this.temp.delete_detailImg = [] // 保存删除的原有详情图的id
      this.originData.slideshow.forEach(function(element, index, arr) {
        that.temp.slideshow.push({ 'name': '轮播图' + (index + 1), 'url': element.image, 'slideshow_id': element.id })
      })
      this.originData.detail_img.forEach(function(element, index, arr) {
        that.temp.detail_img.push({ 'name': '详情图' + (index + 1), 'url': element.image, 'detailImg_id': element.id })
      })

      this.getCategoryOptions()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.rules.cover_img = []
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 两个json有相同的字段, 比较返回旧的json里更新了的数据
    diffTwoDict(old_dict, new_dict) {
      const tmp = {}
      for (var key in new_dict) {
        if (new_dict[key] !== old_dict[key]) {
          tmp[key] = new_dict[key]
        }
      }
      // 不验证以下字段
      delete tmp.cover_img
      delete tmp.slideshow
      delete tmp.detail_img
      delete tmp.specifications
      return tmp
    },
    // 返回两个规格列表中不同的数据
    diffTwoSpec(old_list, new_list) {
      var tmp = []
      const old_length = old_list.length
      const new_length = new_list.length
      if (old_length > new_length) {
        return tmp
      }
      new_list.forEach(function(element, index, arr) {
        if (index + 1 > old_length) {
          tmp.push(element)
        } else {
          if ((element.name !== old_list[index].name) || (element.price !== old_list[index].price) || element.delete) {
            tmp.push(element)
          }
        }
      })
      const specList = this.getSpecifications(tmp)
      return specList
    },
    // 更新
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          this.$refs.uploadSlideshow.submit()
          this.$refs.uploadDetailImg.submit()
          if (!this.toUpload) {
            return false
          }
          const tmp = this.diffTwoDict(this.originData, this.temp)
          for (var key in tmp) {
            this.uploadForm.append(key, tmp[key])
          }
          const specList = this.diffTwoSpec(this.originData.specifications, this.temp.specifications)
          if (specList.length > 0) {
            this.uploadForm.append('specifications', JSON.stringify(specList))
          }
          if (this.temp.delete_slideshow.length > 0) {
            this.uploadForm.append('delete_slideshow', JSON.stringify(this.temp.delete_slideshow))
          }
          if (this.temp.delete_detailImg.length > 0) {
            this.uploadForm.append('delete_detailImg', JSON.stringify(this.temp.delete_detailImg))
          }
          updateGoods(this.temp.id, this.uploadForm).then(response => {
            console.log(response, this.temp)
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, response)
            this.dialogFormVisible = false
            this.uploadForm = new FormData()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 点击删除事件
    handleDelete(row, index) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        const name = row.name
        deleteGoods(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除 ' + name + ' 成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // getSortClass: function(key) {
    //   const sort = this.listQuery.sort
    //   return sort === `+${key}` ? 'ascending' : 'descending'
    // },

    // 封面图文件上传控件, 上传文件前的钩子
    beforeUpload(file) {
      // 判断文件后缀是否为jpg和png, 不是则提示, 且不请求提交表单
      console.log('befor upload cover_img')
      const FileExt = file.name.replace(/.+\./, '')
      if (['jpg', 'png'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'error',
          message: '请上传后缀名为jpg、png的附件！'
        })
        this.toUpload = false
        return false
      }
      // 限制文件上传大小, 大于5M则提示, 且不请求提交表单
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message({
          message: '上传文件大小不能超过5M!',
          type: 'error'
        })
        this.toUpload = false
        return false
      }
      this.uploadForm.append('cover_img', file)
      this.toUpload = true
      return false
    },

    // 封面图文件上传控件, 将文件从列表移除后的钩子
    onRemove(file, fileList) {
      // 当没有选择图片时, 修改验证规则为必须
      if (fileList.length === 0) {
        this.temp.cover_img = []
        this.rules.cover_img = [{ required: true, message: '封面图必须选择!', trigger: 'blur' }]
      }
    },

    // 封面图文件上传控件, 文件状态改变时的钩子
    onChange(file, fileList) {
      // 上传控件有选择时, 修改验证规则为空
      this.rules.cover_img = []
      this.$refs['cover'].clearValidate()
    },

    // 封面图文件上传控件, 文件超出个数限制时的钩子
    onExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // 轮播图文件上传控件, 上传文件前的钩子
    beforeUploadSlideshow(file) {
      // 判断文件后缀是否为jpg和png, 不是则提示, 且不请求提交表单
      const FileExt = file.name.replace(/.+\./, '')
      if (['jpg', 'png'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'error',
          message: '请上传后缀名为jpg、png的附件！'
        })
        this.toUpload = false
        return false
      }
      // 限制文件上传大小, 大于5M则提示, 且不请求提交表单
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message({
          message: '上传文件大小不能超过5M!',
          type: 'error'
        })
        this.toUpload = false
        return false
      }
      this.uploadForm.append('slideshow', file)
      this.toUpload = true
      return false
    },
    // 轮播图上传控件, 将文件从列表移除的钩子
    onRemoveSlideshow(file, fileList) {
      // 原先在图片列表中的图片被删除时, 构造一个列表保存将要删除的图片的id
      if (file.status === 'success') {
        this.temp.delete_slideshow.push(file.slideshow_id)
      }
    },

    // 详情图文件上传控件, 上传文件前的钩子
    beforeUploadDetailImg(file) {
      // 判断文件后缀是否为jpg和png, 不是则提示, 且不请求提交表单
      const FileExt = file.name.replace(/.+\./, '')
      if (['jpg', 'png'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'error',
          message: '请上传后缀名为jpg、png的附件！'
        })
        this.toUpload = false
        return false
      }
      // 限制文件上传大小, 大于5M则提示, 且不请求提交表单
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message({
          message: '上传文件大小不能超过5M!',
          type: 'error'
        })
        this.toUpload = false
        return false
      }
      this.uploadForm.append('detail_img', file)
      this.toUpload = true
      return false
    },
    // 详情图的上传控件中, 将文件从列表移除的钩子
    onRemoveDetailImg(file, fileList) {
      console.log('onremove detail img')
      // 原先在图片列表中的图片被删除时, 构造一个列表保存将要删除的图片的id
      if (file.status === 'success') {
        this.temp.delete_detailImg.push(file.detailImg_id)
      }
    },

    checkPermission
  }
}
</script>

<style>
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.multiple_img {
    float: left;
    margin-right: 10px;
    margin-top: 5px;
}

.goods_brief .el-form-item__label {
    line-height: 20px;
}

.add_new_col .el-form-item__content {
    margin-left: 10px !important;
}

.dialogTable .el-form-item {
  margin-bottom: 0px;
}

.dialogTable .el-form-item .el-form-item__content{
  margin-left: 0px !important;
}

/* .edit-input {
  padding-right: 100px;
} */
</style>
