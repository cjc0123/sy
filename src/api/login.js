import request from '@/utils/request'

const client_id = 'web'
const client_secret = '123456'
const scope = 'server'

export function login(username, password, code, uuid) {
  const grant_type = 'password'
  return request({
    url: 'auth/oauth/token',
    method: 'post',
    params: {
      username,
      password,
      code,
      uuid,
      client_id,
      client_secret,
      grant_type,
      scope
    }
  })
}

export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

//为获取用户余额
export function getUserInfo(uid){
  return request({
    url:`/mall/userinfo?uid=${uid}`,
    method:'get'
  })
}


export function getCodeImg() {
  return request({
    url: '/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
//! 注册
export function register(data) {
  return request({
    url: '/system/user/ris',
    method: 'post',
    data
  })
}
