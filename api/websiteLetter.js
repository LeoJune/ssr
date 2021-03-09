import request from '@/utils/request'

export function searchLetter (params) {
  return request({
    url: '/message/search',
    method: 'get',
    type: 1,
    params
  })
}

export function getLetterById (id) {
  return request({
    url: '/message/detail/' + id,
    method: 'get',
    type: 1
  })
}

export function deleteLetter (id) {
  return request({
    url: '/message/delete/' + id,
    method: 'get',
    type: 1
  })
}
