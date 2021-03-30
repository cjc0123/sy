import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'system/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'system/dept',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'system/dept',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'system/dept',
    method: 'put',
    data
  })
}

export default { add, edit, del, getDepts }
