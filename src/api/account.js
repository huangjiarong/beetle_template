import request from '@/utils/request'

export function getAccountCate() {
  return request({
    url: '/vue-admin-template/user/accountCate',
    method: 'get'
  })
}

export function getAccount(query) {
  return request({
    url: '/vue-admin-template/user/account',
    method: 'get',
    params: query
  })
}
