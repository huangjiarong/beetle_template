import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/api/role/',
    method: 'get'
  })
}

export function getPermissionTree() {
  return request({
    url: '/api/permission/',
    method: 'get'
  })
}
