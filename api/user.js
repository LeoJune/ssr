import request from '@/utils/request'

export function getProvince () {
  return request({
    url: '/region/privce',
    method: 'get'
  })
}

export function getCity (id) {
  return request({
    url: '/region/city/' + id,
    method: 'get'
  })
}

export function getArea (id) {
  return request({
    url: '/region/area/' + id,
    method: 'get'
  })
}

export function getAllAddress () {
  return request({
    url: '/member/address/list',
    method: 'get'
  })
}

export function addAddress (data) {
  return request({
    url: '/member/address/add',
    method: 'post',
    data
  })
}

export function updateAddress (id, data) {
  return request({
    url: '/member/address/update/' + id,
    method: 'post',
    data
  })
}

export function deleteAddress (id) {
  return request({
    url: '/member/address/delete/' + id,
    method: 'post'
  })
}

export function getAddressById (id) {
  return request({
    url: '/member/address/' + id,
    method: 'get'
  })
}

// userInfo
export function updateAvatar (data) {
  return request({
    url: '/sso/updateIcon',
    method: 'post',
    data
  })
}
