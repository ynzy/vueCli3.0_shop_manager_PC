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

/**
 * 添加商品分类数据列表
 * @param {不能为空} cat_pid  分类父ID  如果要添加1级分类，则父分类Id应该设置为  0
 * @param {不能为空} cat_name 分类名称
 * @param {不能为空} cat_level 分类层级  0表示一级分类；1表示二级分类；2表示三级分类
 * @returns
 */
export const addCategories = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `categories`,
      method: 'post',
      data
    })
  )
}

/**
 * 获取商品分类信息
 * @param {*} id  分类id
 * @returns
 */
export const getCategoriesInfo = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `categories/${data.id}`,
      method: 'get'
    })
  )
}

/**
 * 编辑商品分类
 * @param {*} id  分类id
 * @returns
 */
export const editCategoriesInfo = ({ ...data }) => {
  let { id, cat_name } = data
  return awaitWrap(
    request({
      url: `categories/${id}`,
      method: 'put',
      data: {
        cat_name
      }
    })
  )
}

/**
 * 删除商品分类
 * @param {*} id  分类id
 * @returns
 */
export const deleteCategoriesInfo = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `categories/${data.id}`,
      method: 'delete'
    })
  )
}

/**
 * 获取参数列表
 * @param {*} id  三级分类id
 * @param {*} sel  [only,many]  静态参数,动态参数
 * @returns
 */
export const getCateAttributes = ({ ...data }) => {
  let { id, sel } = data
  return awaitWrap(
    request({
      url: `categories/${id}/attributes`,
      method: 'get',
      params: { sel }
    })
  )
}

/**
 * 获取分类参数
 * @param {*} id  三级分类id
 * @param {*} attr_name  参数名称
 * @param {*} attr_sel  [only,many]  通过 only 或 many 来获取分类静态参数还是动态参数
 * @param {可选} attr_vals  如果是 many 就需要填写值的选项，以逗号分隔
 * @returns
 */
export const addCateAttributes = ({ ...data }) => {
  let { id, ...newData } = data
  return awaitWrap(
    request({
      url: `categories/${id}/attributes`,
      method: 'post',
      data: newData
    })
  )
}

/**
 * 修改分类参数
 * @param {*} id  分类id
 * @param {*} attrId  属性 ID
 * @param {*} attr_name  新属性的名字
 * @param {*} attr_sel  [only,many]  通过 only 或 many 来获取分类静态参数还是动态参数
 * @param {可选} attr_vals  如果是 many 就需要填写值的选项，以逗号分隔
 * @returns
 */
export const updateCateAttributes = ({ ...data }) => {
  let { id, attrId, ...newData } = data
  return awaitWrap(
    request({
      url: `categories/${id}/attributes/${attrId}`,
      method: 'put',
      data: newData
    })
  )
}

/**
 * 删除分类参数
 * @param {*} id  分类id
 * @param {*} attrId  属性 ID
 * @returns
 */
export const deleteCateAttributes = ({ ...data }) => {
  let { id, attrId } = data
  return awaitWrap(
    request({
      url: `categories/${id}/attributes/${attrId}`,
      method: 'delete'
    })
  )
}

/**
 * 编辑提交参数
 * @param {*} id  分类id
 * @param {*} attrId  属性 ID
 * @param {*} attr_name  新属性的名字
 * @param {*} attr_sel  [only,many]  通过 only 或 many 来获取分类静态参数还是动态参数
 * @param {可选} attr_vals  如果是 many 就需要填写值的选项，以逗号分隔
 * @returns
 */
export const putCateAttributes = ({ ...data }) => {
  let { id, attrId, ...newData } = data
  return awaitWrap(
    request({
      url: `categories/${id}/attributes/${attrId}`,
      method: 'put',
      data: newData
    })
  )
}

/**
 * 获取商品列表数据
 * @param {*} query  查询参数
 * @param {*} pagenum  当前页码
 * @param {*} pagesize  每页显示条数
 * @returns
 */
export const queryGoodsList = ({ ...params }) => {
  return awaitWrap(
    request({
      url: `goods`,
      method: 'get',
      params
    })
  )
}

/**
 * 获取商品列表数据
 * @param {*} id  商品id
 * @returns
 */
export const deleteGoods = ({ ...data }) => {
  return awaitWrap(
    request({
      url: `goods/${data.id}`,
      method: 'delete'
    })
  )
}
