import request from '@/utils/request'

// 查询公告管理列表
export function listLog(query) {
  return request({
    url: '/contest/log/list',
    method: 'get',
    params: query
  })
}

// 查询公告管理详细
export function getLog(id) {
  return request({
    url: '/contest/log/' + id,
    method: 'get'
  })
}

// 新增公告管理
export function addLog(data) {
  return request({
    url: '/contest/log',
    method: 'post',
    data: data
  })
}

// 修改公告管理
export function updateLog(data) {
  return request({
    url: '/contest/log',
    method: 'put',
    data: data
  })
}

// 删除公告管理
export function delLog(id) {
  return request({
    url: '/contest/log/' + id,
    method: 'delete'
  })
}
