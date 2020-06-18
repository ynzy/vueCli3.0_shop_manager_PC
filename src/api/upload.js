import request from '@/utils/http'
import { awaitWrap } from '@/utils/util'

/**
 * 图片上传
 * @param {*} file 上传的文件
 * @param {contentType} 'form-data'
 * @returns
 * tmp_path: 临时路径
 * url: 图片地址
 */
export const uploadImg = formData => {
  return awaitWrap(
    request({
      url: '/upload',
      method: 'POST',
      data: formData,
      contentType: 'multipart/form-data'
    })
  )
}
