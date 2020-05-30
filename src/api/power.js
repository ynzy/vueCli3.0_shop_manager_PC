import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 获取所有权限列表
 * @param {*} type list 列表显示权限, tree 树状显示权限
 * @returns
 */
export const getRights = ({ ...data }) => {
  let { type } = data
  return awaitWrap(
    request({
      url: `rights/${type}`,
      method: 'get'
    })
  )
}

/**
 * 获取角色列表
 * @returns
 */
export const getRoles = () => {
  return awaitWrap(
    request({
      url: `roles`,
      method: 'get'
    })
  )
}

/**
 * 删除角色指定权限
 * @returns
 */
export const deleteRolesRights = ({ roleId, rightId }) => {
  return awaitWrap(
    request({
      url: `roles/${roleId}/rights/${rightId}`,
      method: 'delete'
    })
  )
}

/**
 * 分配权限
 * @returns
 */
export const allotRights = ({ roleId, rids }) => {
  return awaitWrap(
    request({
      url: `roles/${roleId}/rights`,
      method: 'post',
      data: { rids }
    })
  )
}
