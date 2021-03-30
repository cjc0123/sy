import request from '@/utils/request'

export function find(data) {
  return request({
    url: 'mall/api/yxStockRecord',
    method: 'get',
    params: data
  })
}
export function addCache(data) {
  return request({
    url: 'mall/api/yxStockRecord/addCache',
    method: 'post',
    data
  })
}
export function addBatch(data) {
  return request({
    url: 'mall/api/yxStockRecord/addBatch',
    method: 'post',
    data
  })
}
export function editAddress(data) {
  return request({
    url: 'mall/address/edit',
    method: 'post',
    data
  })
}
export function delAddress(data) {
  return request({
    url: 'mall/address/del',
    method: 'post',
    data
  })
}

export function setAddress(data) {
  return request({
    url: 'mall/address/default/set',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'mall/cart/add',
    method: 'post',
    data
  })
}

//订单确认拿到orderKey
export function orderConfirm(data) {
  return request({
    url:'mall/order/confirm',
    method: 'post',
    data
  })
}

//根据orderKey计算订单金额
export function calculateOrder(data,orderKey) {
  return request({
    url:`mall/order/computed/${orderKey}`,
    method: 'post',
    data
  })
}
//根据orderKey生成点单拿到orderId
export function createOrder(data,orderKey) {
  return request({
    url:`mall/order/create/${orderKey}`,
    method: 'post',
    data
  })
}

//根据orderId获取订单详情
export function getOrderDetail(data,orderId) {
  return request({
    url:`mall/order/detail/${orderId}`,
    method: 'get',
    params: data
  })
}

//获取用户订单列表
export function getOrderList(data){
  return request({
    url:'mall/order/list',
    method: 'get',
    params: data
  })
}

//获取下级订单列表
export function subordinateOrderList(data){
  return request({
    url:'mall/api/yxDistributorRegister/childerDis',
    method: 'get',
    params: data
  })
}

//申请开票
export function applyInvoice(data){
  return request({
    url:'mall/api/yxBillInvoice/add',
    method: 'post',
    data
  })
}
//查询开票信息
export function getInvoice(data){
  return request({
    url:'mall/api/yxBillInvoice/list',
    method: 'get',
    params: data
  })
}

//购物清单
export function shoppingList(data){
  return request({
    url:'mall/downShop',
    method: 'get',
    params: data
  })
}

export function list(data) {
  return request({
    url: 'mall/cart/list',
    method: 'get',
    params: data
  })
}
export function addList(data) {
  return request({
    url: 'mall/address/list',
    method: 'get',
    params: data
  })
}
export function getCache(data) {
  return request({
    url: 'mall/api/yxStockRecord/getCache',
    method: 'get',
    params: data
  })
}
export function detail(data) {
  return request({
    url: `mall/product/detail/${data.id}`,
    method: 'get',
    params: data
  })
}
