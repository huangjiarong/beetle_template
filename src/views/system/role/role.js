import { getAllRole, getPermissionTree, createRole, deleteRole, updateRole } from '@/api/role'
// 权限判断指令
import permission from '@/directive/permission/index.js'

const defaultRole = {
  name: '',
  codename: '',
  permissions: []
}

export default {
  directives: { permission },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      rolesList: [],
      dialogVisible: false,
      dialogType: 'create',
      checkStrictly: false,
      // 权限树
      permissionTree: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
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
        this.rolesList = response
      })
      this.getPermissionTree()
    },
    async getPermissionTree() {
      const res = await getPermissionTree()
      this.permissionTree = res
    },

    showCreateDialog() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'create'
      this.dialogVisible = true
    },

    showUpdateDialog(row) {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.originRole = JSON.parse(JSON.stringify(row)) // 深拷贝, 不能Object.assign, 因为row是两层
      this.role = row
      this.dialogType = 'update'
      this.dialogVisible = true
      this.$nextTick(function() {
        row.permissions.forEach(i => {
          const node = this.$refs.tree.getNode(i)
          if (node.isLeaf) {
            this.$refs.tree.setChecked(node, true)
          }
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

    createData() {
      this.$refs['form'].validate((valid) => {
        this.formatData(this.role)
        if (valid) {
          const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
          const checkedKeys = this.$refs.tree.getCheckedKeys()
          this.role.permissions = halfCheckedKeys.concat(checkedKeys)
          createRole(this.role).then(response => {
            this.rolesList.push(response)
            this.dialogVisible = false
            this.$notify({
              title: '成功',
              message: '新建角色成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    deleteData(row, index) {
      console.log(row)
      this.$confirm('确定要删除该角色?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.rolesList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },

    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 只传修改了的字段
          if (this.originRole.name === this.role.name) {
            this.role.name = undefined
          }
          if (this.originRole.codename === this.role.codename) {
            this.role.codename = undefined
          }
          const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
          const checkedKeys = this.$refs.tree.getCheckedKeys()
          this.role.permissions = halfCheckedKeys.concat(checkedKeys)
          var tmp1 = this.role.permissions.sort().toString()
          var tmp2 = this.originRole.permissions.sort().toString()
          if (tmp1 === tmp2) {
            this.role.permissions = []
          }

          updateRole(this.role.id, this.role).then(response => {
            const index = this.rolesList.findIndex(v => v.id === this.role.id)
            this.rolesList.splice(index, 1, response)
            this.dialogVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }

  }
}
