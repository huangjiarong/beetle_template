const account = {
  'total': 2,
  'items': [
    {
      'id': 1,
      'username': 'admin',
      'realname': '小红',
      'roles': '系统管理员, 老师',
      'roles_id': [1, 2],
      'telephone': '13653625721',
      'create_time': '2020-01-01',
      'status': '冻结'
    },
    {
      'id': 2,
      'username': '20154123213',
      'realname': '小明',
      'roles': '学生',
      'roles_id': [3],
      'telephone': '13645274731',
      'create_time': '2020-01-01',
      'status': '启用'
    }
  ]
}

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
