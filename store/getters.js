const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  hasLogin: state => state.user.hasLogin,
  cartList: state => state.cart.cartList,
  bannerList: state => state.common.bannerList,
  brandList: state => state.common.brandList,
  navList: state => state.common.navList,
  tipList: state => state.common.tipList,
  friendLinkList: state => state.common.friendLinkList
}
export default getters
