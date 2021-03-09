import request from '@/utils/request'

export function getProductInCart () {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}

export function deleteProductInCart (params) {
  return request({
    url: '/cart/delete',
    method: 'post',
    params
  })
}

export function deleteProduct (params) {
  return request({
    url: '/cart/delete',
    method: 'post',
    params
  })
}

export function addProduct (data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data
  })
}

export function updateProductNum (params) {
  return request({
    url: '/cart/update/quantity',
    method: 'get',
    params
  })
}

export function getOrder (data) {
  return request({
    url: '/product/order',
    method: 'post',
    data
  })
}
