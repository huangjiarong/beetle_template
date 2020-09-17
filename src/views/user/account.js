import { getAccount, createAccount } from '@/api/account'
import { getAllRole } from '@/api/role'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Account',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10
      },
      // 账号状态
      statusList: [
        { label: '启用', value: '1' },
        { label: '冻结', value: '2' }
      ],
      roleTree: [],
      roleDialog: {
        visible: false,
        roleTree: []
      },
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      temp: {
        id: undefined,
        username: undefined,
        password: undefined,
        re_password: undefined,
        real_name: '',
        email: '',
        telephone: '',
        is_active: true
      },
      accountDialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑账号',
        create: '添加账号'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入重复密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getAllRole().then(response => {
        this.roleTree = response
      })
      this.getList()
    },
    getList() {
      this.listLoading = true
      getAccount(this.listQuery).then(response => {
        this.list = response.results
        this.total = response.count
        console.log(this.list)

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 左侧角色分类点击事件
    handleNodeClick(data) {
      console.log(data)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        username: undefined,
        password: undefined,
        re_password: undefined,
        real_name: '',
        email: '',
        telephone: '',
        is_active: true
      }
    },
    // 单个账号分配角色
    openRole(scope) {
      this.roleDialog.visible = true
      this.$nextTick(function() {
        this.$refs.roleTree.setCheckedKeys(scope.row.roles)
      })
    },

    showCreateDialog() {
      this.resetTemp()
      this.accountDialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },

    showUpdateDialog(row) {
      this.resetTemp()
      this.accountDialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = row
      console.log(row)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },

    validPasswd() {
      if (this.accountDialogStatus !== 'create') {
        return true
      }

      if (this.temp.password !== this.temp.rePassword) {
        this.$message({
          message: '前后密码不一致',
          type: 'error'
        })
        return false
      }
      if (this.temp.password === '' || this.temp.rePassword === '') {
        this.$message({
          message: '密码不能为空',
          type: 'error'
        })
        return false
      }
      return true
    },

    createData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.validPasswd()) {
            console.log(this.temp)
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
            // createGoods(this.uploadForm).then(response => {
            //   this.list.unshift(response)
            //   this.uploadForm = new FormData()
            //   this.dialogFormVisible = false
            //   this.$notify({
            //     title: '成功',
            //     message: '新建成功',
            //     type: 'success',
            //     duration: 2000
            //   })
            // })
          }
        }
      })
    },

    updateData() {
      console.log('2')
    }
  }
}
