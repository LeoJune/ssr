import request from '@/utils/request'

export function getProductInDictionary (params) { // 获取位置在字典中管理的商品需type和recommendStatus(一直传1,表示上线状态) 0 最新上架 1 热卖产品 2 推荐产品
  return request({
    url: '/home/recommendProduct/listRecommend',
    method: 'get',
    params
  })
}

export function getAdInDictionary (params) { // 获取位置在字典中管理的商品需type和status(一直传1,表示上线状态) 1 PC端首页 2 合作厂家 3 友情链接 4 移动端首页
  return request({
    url: '/home/advertise/listValid',
    method: 'get',
    params
  })
}
