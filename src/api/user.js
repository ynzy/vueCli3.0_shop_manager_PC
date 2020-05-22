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
