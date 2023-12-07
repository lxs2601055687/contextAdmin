import request from '@/utils/request'

// 查询团队管理列表
export function listInfo(query) {
  return request({
    url: '/contest/info/list',
    method: 'get',
    params: query
  })
}

// 查询团队管理详细
export function getInfo(id) {
  return request({
    url: '/contest/info/' + id,
    method: 'get'
  })
}

// 新增团队管理
export function addInfo(data) {
  return request({
    url: '/contest/info',
    method: 'post',
    data: data
  })
}

// 修改团队管理
export function updateInfo(data) {
  return request({
    url: '/contest/info',
    method: 'put',
    data: data
  })
}

// 删除团队管理
export function delInfo(id) {
  return request({
    url: '/contest/info/' + id,
    method: 'delete'
  })
}
