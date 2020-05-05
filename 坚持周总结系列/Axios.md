# `Axios`

## axios简介

- axios是基于promise的HTTP库，可以运行在浏览器和node环境。
- 特性
  - 可以在浏览器中创建XMLHttpRequests
  - 可以在node中穿件http请求
  - 支持promise
  - 可以拦截请求和响应数据
  - 可以取消请求
  - 自动转换json数据
  - 客户端支持防御XSRF

## axios请求

- GET请求

```javascript
axios.get('/user?ID=123').then().catch()
// 也可以换一种方式
axios.get('/user',{params:{ID:123}}).then().catch()
```

- POST请求

```javascript
axios.post('/user',{name:'li'}).then().catch()
```

- 执行对个并发请求

```javascript
function getUser(){
    return axios.get('/user/123')
}
function getUserPermission(){
    return axios.get('/user/123/permission')
}
axios.all([getUser(),getUserPermission()]).then(axios.spread(user,perms){
     // 两个请求都完成了
     // user 是第一个请求结果，perms 是第二个请求结果
})
```

## axios API

- axios（config）

```javascript
// 发送post请求
axios({
    method:'post',
    url:'/user/123',
    data:{
        name:'li'
    }
})
// 获取远端图片
axios({
    method:'get',
    url:'http://bit.ly/2mTM3nY',
    responseType:'stream'
}).then(res=>{
    res.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
```

- 处理并发请求的助手函数

```javascript
axios.all(iterable)
axios.spread(callback)
```

## 创建axios实例

- 自定义配置axios实例

```javascript
const instance=axios.create({
    baseURL:'https://some-domain.com/api/',
    timeout:5000,
    headers:{'X-Custom-Header': 'foobar'}
})
```

- 拦截器

```javascript
// 添加请求拦截器
axios.interceptors.request.use(config=>{
    // 在发送请求之前做些什么
    return config
},err=>{
    // 对请求错误进行处理
    return Promise.reject(err)
})
// 添加响应拦截器
axios.interceptors.response.use(res=>{
    // 处理响应数据
    return res
},err=>{
    // 处理响应错误
    return Promise.reject(err)
})
```

- 项目中实际使用

```javascript
import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true, // 跨域发送cookies
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, err => {
  // 请求错误处理
  return Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use(response => {
  const res = response.data
  // code不为1则判定为一个错误
  if (res.code !== 1) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // 假设 1008-非法令牌 10012-其他客户端已登录 10014-令牌过期
    if (res.code === 1008 || res.code === 10012 || res.code === 10014) {
      // 重新登陆
      MessageBox.confirm('登录状态异常，请重新登陆', '确认登录信息', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, err => {
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(err)
})

export default service
```

## 项目api管理

- 封装axios

```javascript
// request/service.js
import axios from 'axios'

const service=axios.create({
    baseURL:'xxx',
    timeout:5000
})

service.interceptors.request.use(config=>{
    ...
    return config
},err=>{
    return Promise.reject(err)
})
service.interceptors.response.use(response=>{
    ...
    return response
},err=>{
    return Promise.reject(err)
})

export default service
```

- 定义接口的统一出口

```javascript
// request/api.js 
import article from './article.js'

export default{
    article
}
```

- 接口域名管理

```javascript
// request/base.js
const base={
    sq: 'https://xxxx111111.com/api/v1',
    bd: 'http://xxxxx22222.com/api'
}
export default base
```

- 模块接口定义

```javascript
// request/article.js
import axios from './service.js'
import base from './base.js'
import qs from 'qs'// 将请求对象形式参数序列化成url形式

const article={
    // 新闻列表
    articleList(){
        return axios.get(`${base.sq}/topics`)
    },
    // 新闻详情
    articleDetail (id, params) {        
        return axios.get(`${base.sq}/topic/${id}`, {            
            params: params        
        });    
    },
    // post提交    
    login (params) {        
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    }
}
```

- proxy请求代理

```javascript
module.exports={
    devServer:{
        proxy:{
            '/apply':{
                target:'http://api/zouzhengming.com/api/v1', //需要代理的服务器
                ws:true, // webSocket前后台形成通道实时更新 如果false每次请求之后会断开
                changeOrigin:true,
                pathRewite:{
                    '/apply':'/'
                }
            }
        }
    }
}
```

- 组件中使用

```javascript
import api from '../request/api.js'

methods:{
    async login(){
        let params={
            username:'admin',
            password:'123456'
        }
        try{
          let loginData=await api.article.login(params)
       	  console.log(loginData)  
        }catch(error){
            console.log(error)
        }        
    }
}
```

