/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/account',
  name: 'System',
  meta: {
    title: '系统管理',
    roles: ['system_manage'],
    icon: 'table'
  },
  children: [
    {
      name: 'Account',
      path: 'account',
      component: () => import('@/views/system/account/account.vue'),
      meta: {
        title: '账号管理',
        roles: ['account_manage']
      }
    },
    {
      name: 'Role',
      path: 'role',
      component: () => import('@/views/system/role/role.vue'),
      meta: {
        title: '角色管理',
        roles: ['role_manage']
      }
    }
  ]
}
export default userRouter
