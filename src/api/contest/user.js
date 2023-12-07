import request from '@/utils/request'

// 查询学生管理列表
export function listUser(query) {
  return request({
    url: '/contest/user/list',
    method: 'get',
    params: query
  })
}

// 查询学生管理详细
export function getUser(id) {
  return request({
    url: '/contest/user/' + id,
    method: 'get'
  })
}

// 新增学生管理
export function addUser(data) {
  return request({
    url: '/contest/user',
    method: 'post',
    data: data
  })
}

// 修改学生管理
export function updateUser(data) {
  return request({
    url: '/contest/user',
    method: 'put',
    data: data
  })
}

// 删除学生管理
export function delUser(id) {
  return request({
    url: '/contest/user/' + id,
    method: 'delete'
  })
}
export function resetUser(id) {
  return request({
    url: '/contest/user/reset/' + id,
    method: 'get'
  })
}
export function searchTeamMemberInfo(uid) {
  return request({
    url: '/contest/user/info/' + uid,
    method: 'get'
  })
}
export function searchTeamMemberInfo2(teamId) {
  return request({
    url: '/contest/user/info2/' + teamId,
    method: 'get'
  })
}
