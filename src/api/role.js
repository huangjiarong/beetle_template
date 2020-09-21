import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/api/role/',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/api/role/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/api/role/' + id + '/',
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/role/' + id + '/',
    method: 'delete'
  })
}

export function getPermissionTree() {
  return request({
    url: '/api/permission/',
    method: 'get'
  })
}
