export default ({ app: { $request } }, inject) => {
  inject('api', {
    // 字典商品
    /**
     * 字典商品
     * @param {string} password - 密码
     * @param {string} phoneNumber - 手机号码
     */
    getProductInDictionary (params) { // 获取位置在字典中管理的商品需type和recommendStatus(一直传1,表示上线状态)
      return $request({
        url: '/home/recommendProduct/listRecommend',
        method: 'get',
        params
      })
    },
    getAdInDictionary (params) { // 获取位置在字典中管理的商品需type和status(一直传1,表示上线状态) 1 PC端首页 2 合作厂家 3 友情链接 4 移动端首页
      return $request({
        url: '/home/advertise/listValid',
        method: 'get',
        params
      })
    },
    // -----------------------------------
    // 布局header接口
    // banner图
    getBrandList (params) {
      return $request({
        url: '/dictionary/list',
        method: 'get',
        params
      })
    },
    // 所有分类
    getAllCategory () {
      return $request({
        url: '/productCategory/tree',
        method: 'get'
      })
    },
    // 推荐商品
    getRecommdNavAndHome (params) {
      return $request({
        url: '/productCategory/list/recommdNavAndHome',
        method: 'get',
        params
      })
    },
    // 联想查询
    search (params) {
      return $request({
        url: '/product/list',
        method: 'get',
        params
      })
    },
    // -----------------------------------
    // 布局footer接口
    getRecomendHomeList () {
      return $request({
        url: '/product/getRecommendProductList',
        method: 'get'
      })
    },
    // -----------------------------------
    // 登录相关
    // 登录
    login (params) {
      return $request({
        url: '/sso/login',
        method: 'post',
        type: 1,
        params
      })
    },
    // 登出
    logout (params) {
      return $request({
        url: '/sso/logout',
        method: 'post',
        type: 1,
        params
      })
    },
    // 获取用户信息
    getInfo () {
      return $request({
        url: '/sso/info',
        method: 'get',
        type: 1
      })
    },
    // 注册
    register (data) {
      return $request({
        url: '/sso/register',
        method: 'post',
        type: 1,
        data
      })
    },
    // 更新密码
    updatePassword (params) {
      return $request({
        url: '/sso/updatePassword',
        method: 'post',
        type: 1,
        params
      })
    },
    // 获取验证码
    getCode (params) {
      return $request({
        url: '/sso/getAuthCode',
        method: 'get',
        type: 1,
        params
      })
    },
    // -----------------------------------
    // 购物车
    // 购物车物品
    getProductInCart () {
      return $request({
        url: '/cart/list',
        method: 'get'
      })
    },
    // 删除购物车物品
    deleteProductInCart (params) {
      return $request({
        url: '/cart/delete',
        method: 'post',
        params
      })
    },
    // 添加购物车物品
    addProduct (data) {
      return $request({
        url: '/cart/add',
        method: 'post',
        data
      })
    },
    // 更新购物车物品
    updateProductNum (params) {
      return $request({
        url: '/cart/update/quantity',
        method: 'get',
        params
      })
    },
    // -----------------------------------
    // 商品相关
    // id查商品详情
    getProductDetail ({ id, params }) {
      return $request({
        url: '/product/info/' + id,
        method: 'get',
        params
      })
    },
    // 商品收藏
    productCollect (data) {
      return $request({
        url: '/sso/productCollect',
        method: 'post',
        data
      })
    },
    // 收藏列表
    getCollectList (params) {
      return $request({
        url: '/member/productCollection/list',
        method: 'get',
        params
      })
    },
    // 删除收藏 单
    deleteCollect (params) {
      return $request({
        url: '/sso/deleteCollect/',
        method: 'get',
        params
      })
    },
    // 布局footer接口
    getRecomendHomeListlinshi () {
      return $request({
        url: '/product/getRecommendProductList',
        method: 'get'
      })
    }
  })
}
