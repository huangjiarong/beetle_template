const account = [
  {
    'id': 1,
    'username': 'admin',
    'realname': '小红',
    'role': '系统管理员',
    'state': '启用'
  },
  {
    'id': 2,
    'username': '20154123213',
    'realname': '小明',
    'role': '学生',
    'state': '启用'
  }
]

module.exports = [
  // 获取账号类别
  {
    url: '/vue-admin-template/user/accountCate',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [{
          label: '所有账号'
        }, {
          label: '学生',
          children: [{
            label: '高一'
          }, {
            label: '高二'
          }, {
            label: '高三'
          }]
        }, {
          label: '教师',
          children: [{
            label: '高一'
          }, {
            label: '高二'
          }, {
            label: '高三'
          }]
        }]
      }
    }
  },

  // 获取全部账号
  {
    url: '/vue-admin-template/user/account',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: account
      }
    }
  }

]
