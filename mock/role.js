const role = [
  {
    'id': 1,
    'name': '教师',
    'codename': 'teacher',
    'desc': '可管理本班情况'
  },
  {
    'id': 2,
    'name': '学生',
    'codename': 'student',
    'desc': '可查看自己的成绩'
  }
]

module.exports = [
  // 获取全部角色
  {
    url: '/vue-admin-template/user/role',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: role
      }
    }
  }

]
