import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'
/**
 * 登录
 * @param {*}
 * @returns
 */
export const login = ({ ...data }) => {
  return awaitWrap(
    request({
      url: '/login',
      method: 'POST',
      data: data
    })
  )
}

/**
 * 获取用户数据列表
 * @param {*}
 * @returns
 */
export const userList = ({ ...params }) => {
  return awaitWrap(
    request({
      url: '/users',
      method: 'GET',
      params: params
    })
  )
}

/**
 * 更新用户状态
 * @param {*} id 用户id
 * @param {*} mg_state 用户当前的状态
 * @returns
 */
export const userStateUpdate = ({ ...params }) => {
  return awaitWrap(
    request({
      url: `users/${params.id}/state/${params.mg_state}`,
      method: 'PUT'
    })
  )
}

/**
 * 添加用户
 * @param {*} username 账户名
 * @param {*} password 用户密码
 * @param {*} email 邮箱
 * @param {*} mobile 手机号
 * @returns
 */
export const addUser = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `users`,
      method: 'POST',
      data
    })
  )
}

/**
 * 根据 ID 查询用户信息
 * @param {*} id 用户id
 * @returns
 */
export const getUser = ({ ...params }) => {
  return awaitWrap(
    request({
      url: `users/${params.id}`,
      method: 'GET'
    })
  )
}

/**
 * 编辑用户提交
 * @param {*} id 用户id
 * @returns
 */
export const editUser = ({ ...data }) => {
  let { id, rid, username, ...newData } = data
  return awaitWrap(
    request({
      url: `users/${id}`,
      method: 'PUT',
      data: newData
    })
  )
}

/**
 * 删除单个用户
 * @param {*} id 用户id
 * @returns
 */
export const deleteUser = ({ ...data }) => {
  let { id } = data
  return awaitWrap(
    request({
      url: `users/${id}`,
      method: 'DELETE'
    })
  )
}

/**
 * 分配用户角色
 * @param {*} id 用户id
 * @param {*} rid 角色id
 * @returns
 */
export const updateUserRole = ({ ...data }) => {
  let { id, rid } = data
  return awaitWrap(
    request({
      url: `users/${id}/role`,
      method: 'put',
      data: {
        rid
      }
    })
  )
}
