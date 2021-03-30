import request from '@/utils/request'

export function list1(data) {
  return request({
    url: 'mall/api/yxDistributorRegister/list',
    method: 'get',
    params: data
  })
}
// export function addCache(data) {
//   return request({
//     url: "mall/api/yxStockRecord/addCache",
//     method: "post",
//     data
//   });
// }
export function editJxs(data) {
  return request({
    url: 'mall/api/yxDistributorRegister/edit',
    method: 'put',
    data
  })
}
export function addJxs(data) {
  return request({
    url: 'mall/api/yxDistributorRegister/add',
    method: 'post',
    data
  })
}
export function batchSee(data) {
  return request({
    url: 'mall/api/yxDistribtorDiscount/batchSee',
    method: 'post',
    data
  })
}
export function findDj(data) {
  return request({
    url: 'mall/api/yxDistribtorDiscount/list',
    method: 'get',
    params: data
  })
}
