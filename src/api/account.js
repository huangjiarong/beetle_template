import request from '@/utils/request'

export function getAccountCate() {
  return request({
    url: '/vue-admin-template/user/accountCate',
    method: 'get'
  })
}

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
