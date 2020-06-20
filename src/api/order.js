import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 获取订单列表
 * @param {*} type 查询参数
 * @param {*} pagenum 当前页码
 * @param {*} pagesize 每页显示条数
 * @param {可选} user_id 用户 ID
 * @param {可选} pay_status 支付状态
 * @param {可选} is_send 是否发货
 * @param {可选} order_fapiao_title ['个人','公司']
 * @param {可选} order_fapiao_company 公司名称
 * @param {可选} order_fapiao_content 发票内容
 * @param {可选} consignee_addr 发货地址
 * @returns
 */
export const getOrders = ({ ...params }) => {
  return awaitWrap(
    request({
      url: '/orders',
      method: 'get',
      params
    })
  )
}

/**
 * 查询快递进度
 * @param {*} id 物流单号
 * @returns
 */
export const getKuaidi = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `/kuaidi/${data.id}`,
      method: 'get'
    })
  )
}
