/**
 * 处理await成功失败信息
 * @param {*} promise 
 */
const awaitWrap = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null])
}

/**
 * 处理空的参数
 * @param obj 
 * @returns
 */
function cleanParams(obj) {
  return Object.keys(obj).map(key => (obj[key] = ""));;
}

export {
  awaitWrap,
  cleanParams
}