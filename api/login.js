import request from '@/utils/request'

export function login (params) {
  return request({
    url: '/sso/login',
    method: 'post',
    type: 1,
    params
  })
}

export function logout (params) {
  return request({
    url: '/sso/logout',
    method: 'post',
    type: 1,
    params
  })
}

export function getInfo () {
  return request({
    url: '/sso/info',
    method: 'get',
    type: 1
  })
}

export function register (data) {
  return request({
    url: '/sso/register',
    method: 'post',
    type: 1,
    data
  })
}

export function updatePassword (params) {
  return request({
    url: '/sso/updatePassword',
    method: 'post',
    type: 1,
    params
  })
}

export function search (params) {
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}

export function getCode (params) {
  return request({
    url: '/sso/getAuthCode',
    method: 'get',
    type: 1,
    params
  })
}
