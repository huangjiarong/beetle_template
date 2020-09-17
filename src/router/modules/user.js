/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/account',
  name: 'User',
  meta: {
    title: '用户管理',
    roles: ['user_manage'],
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
      meta: { title: '角色管理', roles: ['role_manage'] }
    }
  ]
}
export default userRouter
