import request from '@/utils/request'

// 查询个人竞赛列表
export function listRegistration(query) {
  return request({
    url: '/contest/registration/list',
    method: 'get',
    params: query
  })
}

// 查询个人竞赛详细
export function getRegistration(id) {
  return request({
    url: '/contest/registration/' + id,
    method: 'get'
  })
}

// 新增个人竞赛
export function addRegistration(data) {
  return request({
    url: '/contest/registration',
    method: 'post',
    data: data
  })
}

// 修改个人竞赛
export function updateRegistration(data) {
  return request({
    url: '/contest/registration',
    method: 'put',
    data: data
  })
}

// 删除个人竞赛
export function delRegistration(id) {
  return request({
    url: '/contest/registration/' + id,
    method: 'delete'
  })
}
