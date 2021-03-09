const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  hasLogin: state => state.user.hasLogin,
  cartList: state => state.cart.cartList
}
export default getters
