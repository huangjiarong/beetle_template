/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/account',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      name: 'Account',
      path: 'account',
      component: () => import('@/views/user/account.vue'),
      meta: { title: '账号管理' }
    },
    {
      name: 'Role',
      path: 'role',
      component: () => import('@/views/user/role.vue'),
      meta: { title: '角色管理' }
    },
    {
      name: 'student',
      path: 'student',
      component: () => import('@/views/user/student'),
      meta: { title: '学生管理' }
    },
    {
      name: 'teacher',
      path: 'teacher',
      component: () => import('@/views/user/teacher'),
      meta: { title: '教师管理' }
    }
  ]
}
export default userRouter
