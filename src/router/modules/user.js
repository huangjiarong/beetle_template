/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const UserRouter = {
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
      path: 'user',
      component: () => import('@/views/users/index'),
      name: '帐号管理',
      meta: { title: '分类' }
    },
    {
      path: 'goods',
      component: () => import('@/views/goods/goods'),
      name: '商品',
      meta: { title: '商品' }
    }
  ]
}
export default GoodsRouter
