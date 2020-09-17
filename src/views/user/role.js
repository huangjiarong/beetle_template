import { getAllRole, getPermissionTree } from '@/api/role'

const defaultRole = {
  name: '',
  codename: '',
  permissions: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      // 权限树
      permissionTree: [],
      defaultProps: {
        children: 'child',
        label: 'name'
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
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      console.log(this.checkedPermissionKeys)
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.$nextTick(function() {
        this.$refs.tree.setCheckedKeys(scope.row.permissions)
      })
    }
  }
}
