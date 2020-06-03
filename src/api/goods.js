import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 商品分类数据列表
 * @param {可选} type [1,2,3] 值：1，2，3 分别表示显示一层二层三层分类列表
 * @param {可选} pagenum 当前页码值 不传，默认获取所有分类
 * @param {可选} pagesize 每页显示多少条数据 不传，默认获取所有分类
 * @returns
 */
export const getCategories = ({ ...params }) => {
  return awaitWrap(
    request({
      url: `categories`,
      method: 'get',
      params
    })
  )
}
