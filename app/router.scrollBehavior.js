const needTop = ['/', '/index', '/login', '/forgetPassword', '/register']
export default function (to, from, savedPosition) {
  let y = 0
  if (needTop.includes(to.path)) {
    y = 0
  } else {
    y = document.getElementById('core').offsetTop - 105
  }
  return { x: 0, y }
}