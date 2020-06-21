const express = require('express')
const compression = require('compression')
const https = require('https')
const fs = require('fs')

const app = express()
//创建配置对象设置公钥和私钥
const options = {
    cert:fs.readFileSync('./full_chain.pem'),
    key:fs.readFileSync('./private.key')
}

// 一定要把这一行代码，写到静态资源托管之前
app.use(compression())
app.use(express.static('./dist'))

/* app.listen(8998,()=>{
    console.log("server running at http://127.0.0.1:8998")
}) */

//启动https服务 443默认http运行在80端口，https是运行在443端口
https.createServer(options,app).listen(443)