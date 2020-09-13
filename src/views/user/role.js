import { getAllRole } from '@/api/role'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getAllRole().then(response => {
        this.rolesList = response.data
      })
    },
    handleAddRole() {
      this.dialogType = 'new'
      this.dialogVisible = true
    }
  }
}
