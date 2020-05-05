# `github`项目实战

## 项目版本号

![1582802676913](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1582802676913.png)

## 创建next项目

### 手动创建

-  新建文件夹
- `npm init -y`初始化`package.json`
- `cnpm i react react-dom next -S`

- 创建`pages`目录
- 编写`scripts`命令
- 启动项目测试

- 创建`index.js`文件

### `create-next-app`创建

- `npx create-next-app next-cearte`

## `koa`创建服务

- 将`koa`继承到`next`中：

```javascript
const Koa = require('koa')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 等待next将页面内容编译完成
app.prepare().then(() => {
  // 创建，并启动koa服务
  const server = new Koa()
  // 将next服务作为koa中间件
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.response = false
  })
  server.listen(3000, () => {
    console.log('server listening at port 3000!')
  })
})
```

- `koa` 中间件

```javascript
server.use(async (ctx, next) => {
  // 中间件处理逻辑
  await next()
})
```

- `koa-router` 使用

```javascript
const Router = require('koa-router')
const router = new Router()
router.get('/test/:id', ctx => {
  const id = ctx.params.id
  ctx.set('Content-Type', 'application/json')
  ctx.body = {
    success: true
  }
})
```

## `redis`

### 下载地址：

链接: https://pan.baidu.com/s/1MYP4zS52eTGqW4bi5uXxOg 提取码: `rad5`

解压：`redis-server.exe` 启动服务 `redis-cli.exe` 查询客户端

### **加入windows服务**

- 解压到指定目录，如`D:/redis/`

- 首先将`cmd`指定到解压后的目录文件夹下,输入命令：

  `redis-server.exe --service-install redis.windows.conf --loglevel verbose `

  即可安装到Windows服务

- 再输入`redis-server --service-start`启动服务

- 使用`redis-cli`开启`redis`

- 如果想要卸载服务，在`cmd`命令窗口中输入： `redis-server --service-uninstall`

### 使用

- 修改`redis`配置：
  - `redis.windows.conf`中`port`修改端口号`requirepass`修改密码
  - `redis-server.exe redis.windows.conf`启动服务
  - `redis-cli -p 6378`进入服务
  - `auth 123456`输入密码

- 设置过期时间
  - `setex c 10 1`——设置c值为1，过期时间为10秒

- 模块化
  - `set session:sessionId 123`——session模块下设置`sessionId`
- 查找key
  - `get sessiom:sessionId`
- 查找所有key
  - `keys *`

- 删除key
  - `del key`

## `node`集成`redis`

- 安装`ioredis`

```javascript
const Redis = require('ioredis')

const redis = new Redis({
  port: 6378,
  password: '123456'
})

const test = async () => {
  await redis.setex('c', 10, 111)
  const keys = await redis.keys('*')
}
test()
```

## `next`集成`antd`

### 解决`css`引入问题

- `next`默认不支持`import`方式引入`css`

- 安装`@zeit/next-css`

- 根目录创建配置文件`next.config.js`

  ```javascript
  const withCss = require('@zeit/next-css')
  
  if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
  }
  
  module.exports = withCss({})
  ```

### 引入`antd`

- 解决按需加载模块化组件

  - 安装`antd babel-plugin-import`
  - 根目录新建`.babelrc`

  ```json
  {
    "presets": ["next/babel"], // 加载next的默认配置
    "plugins": [
      [
        "import", // 引入import插件
        {
          "libraryName": "antd" // 指定作用对象
        }
      ]
    ]
  }
  ```

  - 引入`import`插件的作用：
  - 将`import {Button} from 'antd' `编译成 `import Button from 'antd/lib/button'`

- 全局引入`antd.css`

  - 在`pages`文件下新建`_app.js`文件

  ```javascript
  import App from 'next/app'
  
  import 'antd/dist/antd.css'
  
  export default App
  ```

## `next`基础知识

### 目录结构

#### `pages`文件夹

- 每个文件对应一个页面
- 新建文件夹实现嵌套路由

#### 常用文件夹

- `components`文件——公共组件

- `lib`文件件——公共工具
- `static`文件夹——静态资源文件

### 页面跳转

```javascript
import Link from 'next/link'
<Link href='/a'>
    <Button type='primary'>按钮</Button>
</Link>
```

- `Link`本身没有任何标签，内部必须指定渲染内容
- 子节点必须有唯一根节点，不能是两个兄弟节点

- `router`模块手动跳转

```javascript
import Router from 'next/router'
Router.push('/a')
```

### 动态路由

- 只能通过`query`传递路由参数

```javascript
<Link href='/a?id=1'></Link>
Router.push({
    pathname:'/a',
    query:{id:1}
})
```

- 获取路由参数

```javascript
import { withRouter } from 'next/router'
const A = ({ router }) => (
  <>
    <h3>{router.query.id}</h3>
  </>
)
export default withRouter(A)
```

### 路由映射

```javascript
<Link href='/a?id=1' as='/a/1'></Link>
Router.push({
    pathname:'/a',
    query:{id:1}
},'/b/2')
```

- 出现刷新页面丢失问题，原因是服务端不知道前端页面的路由映射
- 解决办法，使用`koa`处理路由映射

```javascript
router.get('/a/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
        pathname: '/a',
        query: { id }
    })
    ctx.response = false
})
```

### `Router`的钩子

```javascript
routerChangeStart
routerChangeComplete
routerChangeError
beforeHistoryChange
hashChangeStart
hashChangecomplete
```

### 获取数据

- `getInitialProps()`在页面中获取数据，实现客户端、服务端数据同步
- 只有放在pages目录下面的文件中调用`getInitialProps()`才起作用
- `getInitialProps()`方法返回的内容，会作为页面组件的`props`传入

```javascript
A.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'tom'
      })
    }, 1000)
  })
  return await promise
}
```

### 自定义`App`

- 固定`layout`、保持公用的状态、给页面传入自定义数据、自定义错误处理

```javascript
import App, { Container } from 'next/app'
import Layout from '../components/Layout'

import 'antd/dist/antd.css'

class MyApp extends App {
  // 每次页面切换都会执行 必须有这个方法
  static async getInitialProps ({ Component }) {
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default MyApp
```

### 自定义`document`

- 只有在服务端渲染的时候才会被调用
- 用来修改服务端渲染的文档内容
- 一般用来配合第三方`css-in-js`方案使用

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return {
      ...props
    }
  }
  render () {
    return (
      <Html>
        <Head>
          <title>My App</title>
          <style>{`.test{color:red}`}</style>
        </Head>
        <body className='test'>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

### 自定义样式

```javascript
<style jsx>{`
	color: green;
`}</style>
// 定义全局属性 但是样式必须它所在组件渲染出来的时候才有效
<style jsx global>{`
	color: green;
`}</style>
// 动态属性
<style jsx>{`
	color: ${color};
`}</style>
```

### 使用`styled-components`

- 安装 `styled-components babel-plugin-styled-components`

- 修改`.babelrc`

```javascript
[
    "styled-components",
    {"ssr": true}
]
```

- 在`_document.js`中集成

```javascript
  import { ServerStyleSheet } from 'styled-components'
  static async getInitialProps (ctx) {
    const originalRenderPage = ctx.renderPage
    const sheet = new ServerStyleSheet()
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      const props = await Document.getInitialProps(ctx)
      return {
        ...props,
        styles: (
          <>
            {props.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
```

- 使用`styled-components`

```javascript
import styled from 'styled-components'
const Title = styled.h1`
  color: red;
`
<Title>标题</Title>
```

### `LazyLoading`

- 异步加载模块、异步加载组件

```javascript
A.getInitialProps = async ctx => {
  // 异步加载模块
  const moment = await import('moment')
  moment.default(Date.now() - 60 * 1000).fromNow()
  return ...
}
// 异步加载组件
import dynamic from 'next/dynamic'
const Layout = dynamic(import('../components/Layout'))
```

### `next.config.js`

```javascript
const withCss = require('@zeit/next-css')

const configs = {
  // 编译文件的输出目录
  distDir: 'dest',
  // 是否给每个路由生成Etag
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 页面内容缓存时长（ms）
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLength: 2
  },
  // 在pages目录下那种后缀的文件会被认为是页面
  pageExtensions: ['jsx', 'js'],
  // 配置buildId
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID
    }
    // 返回null使用默认的unique id
    return null
  },
  // 手动修改webpack config
  webpack (config, options) {
    return config
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware: config => {
    return config
  },
  // 可以在页面上通过 process.env.customKey 获取 value
  env: {
    customKey: 'value'
  },
  // 下面两个要通过 `next/config` 模块来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secoundSecret: process.env.ESCOUND_SECRET
  },
  // 服务端渲染和客户端渲染都可以读取
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
}

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withCss({
  distDir: 'dest'
})
```

- 获取 `serverRuntimeConfig publicRuntimeConfig`配置内容

```javascript
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
```

### `ssr`流程

首页请求

- 浏览器发起`/page`请求
- `koa`接收到请求，并调用`nextjs`
- `nextjs`开始渲染
- 调用`app`的`getInitialProps`
- 调用页面的`getInitialProps`
- 渲染出最终`html`
- 返回给浏览器渲染出页面

客户端路由跳转

- 点击跳转按钮
- 异步加载页面的组件`js`
- 调用页面的`getInitialProps`
- 数据返回，路由变化
- 渲染新的页面

## `React Hooks`

让函数组件具有类组件的功能

```javascript
  const [conut, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    // 组件卸载的时候会执行返回的回调函数 
    return () => {
      clearInterval(interval)
    }
  }, [])
```

### `State Hooks`

- `useState useReducer`

```javascript
const [conut, setCount] = useState(0)
setCount(1)
// 闭包陷阱 使用传入回调的方式规避回调陷阱
setCount(c => c + 1)
```

```javascript
function countReducer (state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      state
  }
}
const [count, dispatchCount] = useReducer(countReducer, 0)
dispatchCount({ type: 'add' })
dispatchCount({ type: 'minus' })
```

### `Effect Hooks`

- 不传第二个参数
  - 只要有状态更新，组件就会重新渲染，`effect hook`就会执行
  - 先执行`return`的回调，再执行`effect hook`中内容

- 第二个参数传空数组
  - 只有页面首次进入才会执行`effect hook`
  - 只有页面组件卸载的时候才会执行`return`的回调

- 第二个参数传值
  - 传入的值发生变化，`effect hook`就会执行
  - 也是先执行`return`的回调，再执行`effect hook`中内容

- `useLayoutEffect`
  - 每次都先于`useEffect` 执行
  - `useLayoutEffect`会在任何属性更新之后，虚拟`DOM`节点树还没有更新到真实`DOM`的时候就会执行
  - `useEffect`会等到真实`DOM`更新之后才会执行
  - 所以`useLayoutEffect`的操作可能会影响到页面更新，造成页面卡顿

### `Context Hooks`

```javascript
// 全局定义Context.js
import React from 'react'
export default React.createContext()
// 在_app.js中传入context
import Context from '../lib/Context'
<Context.Provider value='test'>
    <Component {...pageProps} />
</Context.Provider>
// 在后代组件中使用Context
import Context from '../lib/MyContext'
const context = useContext(Context)
<h2>{context}</h2>
```

### `Ref Hooks`

```javascript
const inputRef = useRef()
<input ref={inputRef} />
console.log(inputRef.current)
```

### `Hooks`渲染优化

- `export default memo(Comp)`

```javascript
  // 和useEffect类似，只要依赖的count不发生变化，返回的obj对象就是同一个对象
  // 再使用memo的时候就不会因为其它数据变化重新渲染页面
  const obj=useMemo(()=>{
      count
  },[count])
  // 和useEffect类似，只要依赖的count不发生变化，返回的方法就是同一个
  const buttonClick=useCallback(()=>{
      ...
  },[count])
  // useMemo也可以来记忆方法
  const buttonClick=useMemo(()=>{
      ()=>{...}
  },[])
```

###  闭包陷阱

```javascript
const [conut, setCount] = useState(0)
setTimeout(() => {
    // 由于闭包影响，这里的count是两秒钟之前的count
    // 如果两秒钟内count值发生变化，这里的值就会和实际count值不相同
    console.log(count)
}, 2000)
// 每次返回都是同一个的对象{current:xxx}
// 不会生成新的对象
// 就能够规避闭包的问题，因为我们改的是对象里面的值
const countRef = useRef()
countRef.current = count
setTimeout(() => {
    // 这里闭包的是countRef对象
    // 但是他的属性值是变化了的
    // 所以这里拿到的就是最新的count值
    console.log(countRef.current)
}, 2000)
```

## `Redux`

单向数据流管理工具

### `next HOC`

```javascript
export default Comp => {
  return function HocComp ({ name, ...rest }) {
    const name = name + 'xxx'
    return <Comp {...rest} name={name} />
  }
}
```

- 注意：`netx`中的`HOC`必须处理`getInitialProps`方法

```javascript
export default Comp => {
  function HocComp ({ Component, pageProps, ...rest }) {
    console.log(Component, pageProps)
    if (pageProps) {
      pageProps.test = '123'
    }
    return <Comp {...rest} Component={Component} pageProps={pageProps} />
  }
  HocComp.getInitialProps = Comp.getInitialProps
  return HocComp
}
```

### `next`集成`Redux`

- 服务端如何拿到写入数据的`store`
- 如何同步服务端的数据到客户端

```javascript
// store.js
// 这里不能直接返回store，要返回一个创建store的方法
export default function initiallizeStore (state) {
  const store = createStore(
    allReducers,
    // 初始化状态
    Object.assign({}, state),
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}
// WithRedux.js
import React from 'react'
import createStore from '../store/store'

// 判断是否是服务端环境
const isSercer = typeof window === 'undefined'
const _NEXT_REDUX_STORE = '_NEXT_REDUX_STORE'

function getOrCreateStore (initialState) {
  // 服务端每次都生成新的store
  if (isSercer) {
    return createStore(initialState)
  }
  // 确保在客户端使用的是同一个store
  // 而不是路由跳转就生成新的store
  if (!window[_NEXT_REDUX_STORE]) {
    window[_NEXT_REDUX_STORE] = createStore(initialState)
  }
  return window[_NEXT_REDUX_STORE]
}

export default Comp => {
  class WithRedux extends React.Component {
    constructor (props) {
      super(props)
      // App组件初始化的时候服务端、客户端都会创建store
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    render () {
      const { Component, pageProps, ...rest } = this.props
      // 将store和参数传递给App
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      )
    }
  }
  // getInitialProps无论是在客户端还是在服务端都会执行该方法
  // 所以在这里执行store的初始化非常合适
  WithRedux.getInitialProps = async ctx => {
    const reduxStore = getOrCreateStore()
    ctx.reduxStore = reduxStore
    // 执行child的getInitialProps
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }
    // 将props返回
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }
  return WithRedux
}
```

## `OAuth`第三方授权登录

![1582892925939](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1582892925939.png)

### `koa-session`

- 设置`redis`数据库操作方法

```javascript
function getRedisSessionId (sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor (client) {
    this.client = client
  }
  // 获取redis中存储的数据
  async get (sid) {
    console.log('get session', sid)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.log(err)
    }
  }
  // 存储session数据到redis sess--session ttl--过期时间
  async set (sid, sess, ttl) {
    console.log('set session', sid)
    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // 从redis删除某个session
  async destroy (sid) {
    console.log('del session', sid)
    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore
```

- 使用`redis`

```javascript
const Redis = require('ioredis')
// 创建redis-client
const redis = new Redis({
  port: 6378,
  password: '123456'
})
const server=new Koa()
server.keys = ['Liwei develop Github App']
const SESSION_CONFIG = {
    key: 'gid',
    store: new RedisSesionStore(redis)
}
server.use(session(SESSION_CONFIG, server))
// 设置session
ctx.session.user = {name: 'liwei'}
// 读取session
console.log(ctx.session.user)
// 清空session
ctx.session = null
```

### `Github OAuth` 接入

```javascript
// auth.js
const axios = require('axios')

const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github

module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })
      if (result.status === 200 && result.data && !result.data.error) {
        ctx.session.githubAuth = result.data
        const { access_token, token_type } = result.data
        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
        // 存储用户信息
        ctx.session.userInfo = userInfoResp.data
        ctx.redirect('/')
      } else {
        const errorMessage = result.data && result.data.error
        ctx.body = `request token failed ${errorMessage}`
      }
    } else {
      await next()
    }
  })
}
// server.js
const auth = require('./server/auth')
// 配置处理github auth的登录
auth(server)
```

## 线上部署

`vscode-styled-jsx`——` jsx`内容高亮

![1583057484328](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1583057484328.png)

安装`http-server`能够快速在本地启动一个服务

![1583057823373](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\1583057823373.png)

## 总结

- 同构
- 利用`React`在客户端和服务端渲染

- 数据同步是难点
- `getInitialProps`
- `OAuth`
- `Hooks`





