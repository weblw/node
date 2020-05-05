1、axios对比分析

- ajax、axios、fetch
- ajax——XMLHttpRequest（XHR）
  - Jquery封装，使用方便
  - 支持Jsonp、局部无刷新
  - 但是不符合MVVM浪潮、XHR架构不清晰、ajax要引入jquery
- fetch——基于promise设计
- axios——基于promise的Http库
  - 客户端支持防御XSRF

2、在main.js直接导入（不推荐）

```javascript
import axios from 'axios'
Vue.prototype.$axios=axios
// 不建议添加到原型中
```

3、封住axios请求

```javascript
// request/service.js
import axios from 'axios'

// 获取token
function getTokenByLocal(){
    let token=sessionStorage.getItem('token')||''
    return token
}
const serive=axios,create({
    baseUrl:'apply',
    timeout:5000
})

console.dir(serive)

// request 请求拦截器
serive.interceptors.request.use(
	config=>{
        if(getTokenByLocal()){
            config.headers['token']=getTokenByLocal()
        	config.headers['ContentType']='application/json;charset=uft-8'
        }
       return config
    },
    error=>{
        Promise.reject(error)
    }
)

// response 响应拦截器
serive.interceptors.response.use(
	response=>{
        let res=response.data
        if(res.code=='400'){
            //do something
        }else if(){
            ...
        }
        return Promise.resolve(response.data)
    },
    error=>{
        Promise.reject(error)
    }
)

export default serive
```

```javascript
// request/common.js 定义接口传参方式
import service from './serive.js'

// 耦合度低
export default function requestOfPost(url,data){
    return serive.post(url,data)
}
```

```javascript
// request/apiUrl.js
const url={
    // 登录
    loginUrl:'/login'
}
export default url
```

```javascript
// api/api.js 总控制器
import requestOfPost from '../request/common.js'
// 细分解耦 高度封装 统一管理
export function postRequest(url,data){
    return new Promise((resolve,reject)=>{
        requestOfPost(url,data)
            .then(res=>resolve(res))
        	.catch(error=>reject(error))
    })
}
```

```javascript
// api/login.js
import {postRequest} from './api.js'

export function loginApi(params,callback){
    postRequest('/apply/login',callback)
}
```

```javascript
// vue.config.js
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

```javascript
// 组件中使用
import url from '../request/apiUrl.js'
import {postRequest} from '../api/api.js'

methods:{
    async login(){
        let params={
            username:'admin',
            password:'123456'
        }
        try{
          let loginData=await postRequest(url.loginUrl,params)
       	  console.log(loginData)  
        }catch(error){
            console.log(error)
        }        
    }
}
```

4、架构设计

- 需求层、设计层、技术层
- 技术层
  - 架构选型
  - 编码规范
  - 工程化——自主搭建
  - 基础搭建——业务分包、组件封装、组件化、路由、仓库git、mock、单元集成测试



















