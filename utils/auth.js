import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function getSessionToken () {
  return sessionStorage.getItem(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function sessionToken (token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeSessionToken () {
  return sessionStorage.removeItem(TokenKey)
}
