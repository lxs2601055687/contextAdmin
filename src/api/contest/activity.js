import request from '@/utils/request'

// 查询竞赛管理列表
export function listActivity(query) {
  return request({
    url: '/contest/activity/list',
    method: 'get',
    params: query
  })
}

// 查询竞赛管理详细
export function getActivity(id) {
  return request({
    url: '/contest/activity/' + id,
    method: 'get'
  })
}

// 新增竞赛管理
export function addActivity(data) {
  return request({
    url: '/contest/activity',
    method: 'post',
    data: data
  })
}

// 修改竞赛管理
export function updateActivity(data) {
  return request({
    url: '/contest/activity',
    method: 'put',
    data: data
  })
}

// 删除竞赛管理
export function delActivity(id) {
  return request({
    url: '/contest/activity/' + id,
    method: 'delete'
  })
}

export function addFileUrl(param) {
  return request({
    url: '/contest/activity/fileUrl',
    method: 'post',
    data: param

  })
}
