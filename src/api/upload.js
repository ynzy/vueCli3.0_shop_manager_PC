import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 图片上传
 * @param {*} file 上传的文件
 * @returns
 */
export const uploadImg = ({ ...data }) => {
  return awaitWrap(
    request({
      url: '/upload',
      method: 'POST',
      data: data
    })
  )
}
