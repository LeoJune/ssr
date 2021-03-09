import request from '@/utils/request'

export function getAllMessage () {
  return request({
    url: '/product/incart',
    method: 'get',
    type: 1
  })
}

export function searchMessage (params) {
  return request({
    url: '/feedback/search',
    method: 'get',
    type: 1,
    params
  })
}

export function sendMessage (data) {
  return request({
    url: '/feedback/feedback',
    method: 'post',
    type: 1,
    data
  })
}

export function getMessageById (id) {
  return request({
    url: '/feedback/detail/' + id,
    method: 'get',
    type: 1
  })
}
