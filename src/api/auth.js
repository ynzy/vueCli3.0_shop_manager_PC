import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 获取左侧菜单
 * @returns
 */
export const getMenus = () => {
  return awaitWrap(
    request({
      url: '/menus',
      method: 'get'
    })
  )
}

export const login = ({ ...data }) => {
  return awaitWrap(
    request({
      url: '/login',
      method: 'POST',
      data: data
    })
  )
}
