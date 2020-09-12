/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      name: 'account',
      path: 'account',
      component: () => import('@/views/user/account'),
      meta: { title: '账号管理' }
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
