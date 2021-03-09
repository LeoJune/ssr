import request from '@/utils/request'

export function getProduct (params) { //  获取商品,自由度较高,目前用在搜索
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}

export function getAllCategory () { // 获取所有分类
  return request({
    url: '/productCategory/tree',
    method: 'get'
  })
}

export function getRecomendHomeList () { //  获取首页推荐(那三个)
  return request({
    url: '/product/getRecommendProductList',
    method: 'get'
  })
}

export function getProductInDictionary (params) { // 获取位置在字典中管理的商品需type和recommendStatus(一直传1,表示上线状态)
  return request({
    url: '/home/recommendProduct/listRecommend',
    method: 'get',
    params
  })
}

export function getProductDetail (id, params) { //  商品详情
  return request({
    url: '/product/info/' + id,
    method: 'get',
    params
  })
}

export function productCollect (data) { // 商品收藏合并
  return request({
    url: '/sso/productCollect',
    method: 'post',
    data
  })
}

export function getCollectList (params) { // 收藏列表
  return request({
    url: '/member/productCollection/list',
    method: 'get',
    params
  })
}

export function deleteCollect (params) { // 单删除接口
  return request({
    url: '/sso/deleteCollect/',
    method: 'get',
    params
  })
}
