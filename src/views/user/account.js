import { getAccountCate, getAccount } from '@/api/account'
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
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      // 账号状态
      statusList: [
        { label: '启用', value: '1' },
        { label: '冻结', value: '2' }
      ],
      // 账号分类
      accountCate: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getAccountCate().then(response => {
        this.accountCate = response.data
      })
      this.getList()
    },
    getList() {
      this.listLoading = true
      getAccount(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 左侧账号分类点击事件
    handleNodeClick(data) {
      console.log(data)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    getAllRoles() {
      this.roleDialog.visible = true
    },
    // 单个账号分配角色
    openRoleItem(row) {
      console.log(row)
    }
  }
}
