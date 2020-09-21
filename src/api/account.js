import request from '@/utils/request'

export function getAccount(query) {
  return request({
    url: '/api/account/',
    method: 'get',
    params: query
  })
}

export function createAccount(data) {
  return request({
    url: '/api/account/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function updateAccount(id, data) {
  return request({
    url: '/api/account/' + id + '/',
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function deleteAccount(id) {
  return request({
    url: '/api/account/' + id + '/',
    method: 'delete'
  })
}

export function setRoles(id, roles) {
  return request({
    url: '/api/account/' + id + '/set_roles/',
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },
    data: roles
  })
}

