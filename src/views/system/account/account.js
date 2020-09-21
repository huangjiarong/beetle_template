import { getAccount, createAccount, updateAccount, deleteAccount, setRoles } from '@/api/account'
import { getAllRole } from '@/api/role'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// 权限判断指令
import permission from '@/directive/permission/index.js'

const defaultListQuery = {
  page: 1,
  limit: 10,
  ordering: 'id',
  username: undefined,
  telephone: undefined,
  is_active: undefined,
  realname: undefined,
  roles: undefined
}

const defaultTemp = {
  id: undefined,
  username: '',
  password: '',
  checkPassword: '',
  real_name: undefined,
  email: undefined,
  telephone: undefined,
  is_active: true
}

export default {
  components: { Pagination },
  directives: { permission },
  filters: {
    typeFilter(type) {
      const typeMap = {
        true: '启用',
        false: '冻结'
      }
      return typeMap[type]
    },
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    var validatePassword = (rule, value, callback) => {
      console.log('valid password')
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.temp.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      rolesCheckedList: [],
      // 查询条件
      listQuery: Object.assign({}, defaultListQuery),
      // 账号状态
      statusList: [
        { label: '启用', value: true },
        { label: '冻结', value: false }
      ],
      roleTree: [],
      roleDialog: {
        accountId: undefined,
        visible: false,
        roleTree: []
      },
      temp: Object.assign({}, defaultTemp),
      accountDialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑账号',
        create: '添加账号'
      },
      createDialogRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePassword2, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      updateDialogRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    rulesList: function() {
      if (this.accountDialogStatus === 'create') {
        return this.createDialogRules
      } else {
        return this.updateDialogRules
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getAllRole()
      this.getList()
    },

    getAllRole() {
      getAllRole().then(response => {
        this.roleTree = response
      })
    },

    getList() {
      this.listLoading = true
      getAccount(this.listQuery).then(response => {
        this.list = response.results
        this.total = response.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },

    // 搜索事件
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    // 重置搜索条件
    resetFilter() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },

    // 点击删除事件
    handleDelete(row, index) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        deleteAccount(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除账号 ' + row.username + ' 成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    formatData(data) {
      for (var key in data) {
        if (data[key] === '') {
          data[key] = undefined
        }
      }
    },

    // 点击添加事件
    showCreateDialog() {
      this.temp = Object.assign({}, defaultTemp)
      this.accountDialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },

    // 进行添加
    createData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formatData(this.temp)
          createAccount(this.temp).then(response => {
            this.list.unshift(response)
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

    // 点击修改事件
    showUpdateDialog(row) {
      this.temp = Object.assign({}, defaultTemp)
      this.accountDialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },

    // 进行修改
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formatData(this.temp)
          updateAccount(this.temp.id, this.temp).then(response => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, response)
            this.dialogFormVisible = false
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

    // 点击角色分配
    openRole(row) {
      this.roleDialog.visible = true
      this.roleDialog.accountId = row.id
      this.rolesCheckedList = row.roles
    },

    // 进行角色分配
    setRole() {
      setRoles(this.roleDialog.accountId, this.rolesCheckedList).then(response => {
        const index = this.list.findIndex(v => v.id === this.roleDialog.accountId)
        this.list.splice(index, 1, response)
        this.roleDialog.visible = false
        this.$notify({
          title: '成功',
          message: '成功分配角色',
          type: 'success',
          duration: 2000
        })
      })
    },

    // 导出Excel事件
    downloadExcel() {
      // list保存的是当前页面的数据, 要导出全部数据需要重写条件请求全部数据
      var listQuery = Object.assign({}, this.listQuery)
      listQuery.page = undefined
      listQuery.limit = undefined
      getAccount(listQuery).then(response => {
        const list = response
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['账号', '姓名', '手机号']
          const filterVal = ['username', 'realname', 'telephone']
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '账号表',
            autoWidth: true
          })
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
