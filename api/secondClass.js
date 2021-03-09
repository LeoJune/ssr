import request from '@/utils/request'

export function getBrother (id) {
  return request({
    url: '/productCategory/brotherList/' + id,
    method: 'get'
  })
}

export function getChild (id, params) {
  return request({
    url: 'productCategory/childListSelfPage/' + id,
    method: 'get',
    params
  })
}

export function getProductByCategory (params) {
  return request({
    url: 'product/list',
    method: 'get',
    params
  })
}
