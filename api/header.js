import request from '@/utils/request'

export function getBrandList (params) {
  return request({
    url: '/dictionary/list',
    method: 'get',
    params
  })
}

export function getAllCategory () {
  return request({
    url: '/productCategory/tree',
    method: 'get'
  })
}

export function getRecommdNavAndHome (params) {
  return request({
    url: '/productCategory/list/recommdNavAndHome',
    method: 'get',
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
