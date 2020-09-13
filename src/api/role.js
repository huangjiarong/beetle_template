import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/vue-admin-template/user/role',
    method: 'get'
  })
}
