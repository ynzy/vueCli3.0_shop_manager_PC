import request from '@/utils/http'

/**
 * 获取左侧菜单
 * @returns
 */
export const getMenus = () => {
  return request({
    url: '/menus',
    method: 'get'
  })
}
