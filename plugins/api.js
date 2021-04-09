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
    // seo信息获取 就是后台系统设置的接口
    getDefaultSeo () {
      return $request({
        url: '/systemsetting/getSysConf',
        method: 'get'
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
    // 商品分类
    // 获取分类商品
    getProductByCategory (params) {
      return $request({
        url: 'product/list',
        method: 'get',
        params
      })
    },
    // 获取分类seo信息
    getCategorySeo (id) {
      return $request({
        url: '/productCategory/getCategoryById/' + id,
        method: 'get'
      })
    },
    // 获取同级分类
    getBrother (id) {
      return $request({
        url: '/productCategory/brotherList/' + id,
        method: 'get'
      })
    },
    // 获取下级分类
    getChild (id, params) {
      return $request({
        url: 'productCategory/childListSelfPage/' + id,
        method: 'get',
        params
      })
    },
    // 通过关键词搜索商品
    getProduct (params) { // 获取商品,自由度较高,目前用在搜索
      return $request({
        url: '/product/list',
        method: 'get',
        params
      })
    },
    // -----------------------------------
    // 商品相关/商品详情
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
    // 删除收藏 (单个)
    deleteCollect (params) {
      return $request({
        url: '/sso/deleteCollect/',
        method: 'get',
        params
      })
    },
    // -----------------------------------
    // 购物车相关
    // 获取所有存储地址
    getAllAddress () {
      return $request({
        url: '/member/address/list',
        method: 'get'
      })
    },
    getAddressById (id) {
      return $request({
        url: '/member/address/' + id,
        method: 'get'
      })
    },
    // 添加地址
    addAddress (data) {
      return $request({
        url: '/member/address/add',
        method: 'post',
        data
      })
    },
    // 更新地址
    updateAddress (id, data) {
      return $request({
        url: '/member/address/update/' + id,
        method: 'post',
        data
      })
    },
    // 删除地址
    deleteAddress (id) {
      return $request({
        url: '/member/address/delete/' + id,
        method: 'post'
      })
    },
    getProvince () {
      return $request({
        url: '/region/privce',
        method: 'get'
      })
    },
    getCity (id) {
      return $request({
        url: '/region/city/' + id,
        method: 'get'
      })
    },
    getArea (id) {
      return $request({
        url: '/region/area/' + id,
        method: 'get'
      })
    },
    // -----------------------------------
    // 订单相关
    // 生成订单
    generateOrder (data) {
      return $request({
        url: '/order/generateOrder',
        method: 'post',
        data
      })
    },
    // 订单详情
    getOrderDetail (id) {
      return $request({
        url: '/order/detail/' + id,
        method: 'get'
      })
    },
    // 用户支付方式选择
    orderPayWay (id, params) {
      return $request({
        url: '/order/pay/' + id,
        method: 'post',
        params // type
      })
    },
    // 轮询支付结果
    payResult (id) {
      return $request({
        url: '/order/isPaySuccess/' + id,
        method: 'get'
      })
    },
    // 订单列表
    getOrderList (params) {
      return $request({
        url: '/order/list',
        method: 'get',
        params
      })
    },
    // 取消订单
    cancelOrder (params) {
      return $request({
        url: '/order/cancelUserOrder',
        method: 'post',
        params // orderId
      })
    },
    // 确认收货
    confirmReceive (params) {
      return $request({
        url: '/order/confirmReceiveOrder',
        method: 'post',
        params // orderId
      })
    },
    // 删除订单
    deleteOrder (params) {
      return $request({
        url: '/order/deleteOrder',
        method: 'post',
        params // orderId
      })
    },
    // 订单支付超时时间
    getOrderPayTime () {
      return $request({
        url: '/systemsetting/getOrderPayTime',
        method: 'get'
      })
    },
    // 再次购买
    buyAgain (id) {
      return $request({
        url: '/order/buyAgain/' + id,
        method: 'post'
      })
    },
    // -----------------------------------
    // 个人中心相关
    // oss
    policy () {
      return $request({
        url: '/aliyun/oss/policy',
        method: 'get'
      })
    },
    updateAvatar (data) {
      return $request({
        url: '/sso/updateIcon',
        method: 'post',
        data
      })
    },
    // 站内信
    searchLetter (params) {
      return $request({
        url: '/message/search',
        method: 'get',
        type: 1,
        params
      })
    },
    getLetterById (id) {
      return $request({
        url: '/message/detail/' + id,
        method: 'get',
        type: 1
      })
    },
    deleteLetter (id) {
      return $request({
        url: '/message/delete/' + id,
        method: 'get',
        type: 1
      })
    },
    // 在线反馈
    getAllMessage () {
      return $request({
        url: '/product/incart',
        method: 'get',
        type: 1
      })
    },
    searchMessage (params) {
      return $request({
        url: '/feedback/search',
        method: 'get',
        type: 1,
        params
      })
    },
    sendMessage (data) {
      return $request({
        url: '/feedback/feedback',
        method: 'post',
        type: 1,
        data
      })
    },
    getMessageById (id) {
      return $request({
        url: '/feedback/detail/' + id,
        method: 'get',
        type: 1
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
