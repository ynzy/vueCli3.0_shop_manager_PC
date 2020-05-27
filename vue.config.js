const path = require('path') // 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
  lintOnSave: false, // 是否开启eslint
  outputDir: process.env.outputDir, // build输出目录
  chainWebpack: config => {
    config.resolve.alias
      // set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
    // 注意 store 和 router 没必要配置
  },
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    // host: 'localhost',
    port: '9090',
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    proxy: null
  }
}
