1、什么是鉴权？

- 验证用户是否拥有访问系统的权利

- http是一种无状态的协议
- 没有数据持续通路

2、cookie原理

- http协议请求发送携带用户请求信息的cookie
- 服务器通过cookie验证客户权限
- cookie交互过程
  - 浏览器set-cookie发送cookie给浏览器，浏览器保存cookie
  - 下一次请求的时候，请求头会携带cookie，服务器通过cookie验证权限

- http-request
- http-response
- http协议三次握手

```javascript
// cookie/app.js
const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.cookie('licanca',16,{
        maxAge:14*86400*1000, // 过期时间 14天有限期
        httpOnly:true // 通过js脚本无法读取cookie，能有效防止xss脚本攻击        
    })
    res.send('首页')
})

app.listen(3000)
```

- 内存cookie（非持久或者会话cookie）、硬盘cookie（持久cookie）
- cookie一般在客户端浏览器保存
- 浏览器变相记住客户端曾经的行为
- cookie存在问题——不安全、通过浏览器可以随意修改  cookie欺骗
- cookie有大小限制——4kb
- 服务器告诉客户端把你的数据保存下来，下次访问的时候带上cookie

3、session

- 存放在服务器上
- 如果数据很敏感、涉及到安全的数据——放到session中保存
- cookie和session都是会话技术，解决http协议无状态
- session依赖于cookie，用于登录权限验证

```javascript
// session/app.js
const Koa=require('koa')
const Router=require('koa-router')
const session=require('koa-session')
const static=require('koa-static')
const body=require('koa-parse')

const app=new Koa()
// session要使用秘钥，防止session劫持
app.keys=[
    'suijizifuchuan',
    'duozuanquanmiyao'
]
app.use(body())
app.use(session({
    maxAge:20*60*1000, //20分钟
    renew:true
},app))
let router=new Router()

// 登陆
router.post('/login',async ctx=>{
    let {username,password}=ctx.request.body
    // 正常是要到数据库查询验证
    if(username==='admin' && password==='123456'){
        console.log('登录成功')
        ctx.session.user=username
    }else{
        console.log('登陆失败')
    }
    console.log(username,password)
    ctx.body={
        code:200
    }
})
// 用户中心
router.get('profile',async ctx=>{
    if(！ctx.session.user){
        ctx.body=`<a href='/'>请返回登录</a>`
    }else{
        ctx.body='用户中心'
    }
})
// 清空session
router.get('/layout',async ctx=>{
    ctx.session.user=null
    ctx.body='退出成功'
})

app.use(router.routes())
app.use(static(./www))
app.listen(3000)
// touch index.html——创建index.html文件
```

- cookie、session、jwt（jsonWebToken）

- http协议是无状态的
- 所以需要cookie出现
- cookie不安全，需要session
- session依赖于cookie
- session存在于服务器端
- 服务器端架构：集群、分布式
  - 集群：多台同样代码的服务器——前面还有一个负载均衡
  - 分布式：每个服务器存储独立模块——一个模块坏了，整个服务器就瘫痪了
- 单点登录：一次登录多服务器共享登录状态
- token（令牌）jsonWebToken
- jwt认证原理
  - 用户输入登录信息
  - 服务器验证登录信息（数据库查询、登陆信息比对），返回一个token
  - token存储在客户端，localstorage
  - http请求头里面携带token访问服务器
  - 服务器通过token校验访问权限——服务器解码token
  - 前端发送http请求，http-header里面携带token

```javascript
// .http——接口测试工具
// bcrypt——密码加密插件
// token里面不要存敏感信息，能够破解
```





