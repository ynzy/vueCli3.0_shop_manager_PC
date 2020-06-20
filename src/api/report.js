import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 获取数据报表
 * @returns
 */
export const getReport = () => {
  return awaitWrap(
    request({
      url: `/reports/type/1`,
      method: 'get'
    })
  )
}
