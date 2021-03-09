export function isvalidUsername (str) {
  // const valid_map = ['admin', 'test']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length >= 3
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function checkTime (rule, value, callback) {
  const intValue = parseInt(value)
  if (!Number.isInteger(intValue)) {
    return callback(new Error('请输入数字值'))
  }
  callback()
}

export function notStraightCity (city) {
  const list = ['上海', '北京', '天津', '重庆']
  for (const i in list) {
    if (city === i) {
      return false
    }
  }
  return true
}

export const isPhone = (rule, str, callback) => {
  const reg = /^1[34578][0-9]\d{8}$/
  if (!reg.test(str)) {
    return callback(new Error('请输入正确的手机号'))
  }
  callback()
}

export const utils = {
  isPhone: function (str) {
    const reg = /^1[34578][0-9]\d{8}$/
    return reg.test(str)
  },
  // isIDCard: function (str) {
  //     const reg = new RegExp("/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/")
  //     return reg.test(str)
  // },
  isName: function (str) {
    const reg = /^[\u4E00-\u9FA5]{2,6}$/
    return reg.test(str)
  }
}

export function formatArrToFitCarousel (arr) {
  if (!arr || arr.length === 0) {
    console.log('return kong')
    return []
  }
  const formatArr = []
  let temp = []
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    temp.push(arr[i])
    count++
    if (count === 3) {
      formatArr.push(temp)
      count = 0
      temp = []
    } else if (i === arr.length - 1) {
      formatArr.push(temp)
    }
  }
  return formatArr
}
