import request from '@/utils/request'

// 查询获奖管理列表
export function listAward(query) {
  return request({
    url: '/contest/award/list',
    method: 'get',
    params: query
  })
}

// 查询获奖管理详细
export function getAward(id) {
  return request({
    url: '/contest/award/' + id,
    method: 'get'
  })
}

// 新增获奖管理
export function addAward(data) {
  return request({
    url: '/contest/award',
    method: 'post',
    data: data
  })
}

// 修改获奖管理
export function updateAward(data) {
  return request({
    url: '/contest/award',
    method: 'put',
    data: data
  })
}

// 删除获奖管理
export function delAward(id) {
  return request({
    url: '/contest/award/' + id,
    method: 'delete'
  })
}
