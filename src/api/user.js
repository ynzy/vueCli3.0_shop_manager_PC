import request from '@/utils/http'

/**
 * 登录
 * @param {*}
 * @returns
 */
export const login = ({ ...data }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: data
  })
}
