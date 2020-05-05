# `vue-router`

1、`vue-router`工作流程

- `url`改变
- 触发监听事件
- 改变`vue-router`里的`current`变量
- 监视`current`变量的监视者
- 获取新的组件
- `render`新组建

2、`hash`与`history`

- #后面就是`hash`内容
- 可以通过`location.hash`获取
- 没有#的时候`location.hash`拿到的是空字符转
- `onhashchange`监听`hash`变化
- `location.pathname`拿到`history`路径
- `onPopstate`监听`history`变化

3、`vue`插件知识

- `vue.use`去使用一个插件，并且会执行`install`方法
- `vue.mixin`往`vue`的全局混入自定义操作
- `this.$options`拿到`new vue`时的参数

4、实现`router`

```javascript
// myrouter/index.js
class HistoryRouter{
    constructor(){
        this.current=null
    }
}
class VueRouter{
    constructor(options){
        this.history=new HistoryRouter()
        this.mode=options.mode||'hash'
        this.routes=options.routes||[]
        // {'/a':A}
        this.routesMap=this.createMap(this.routes)
        this.init()
    }
    init(){
        if(this.mode==='hash'){
            // 自动加上#
            location.hash ? '' : location.hash='/'
            // 监听hash变化
            window.addeventListener('load',()=>{
                // slice去掉#
                this.history.current=location.hash.slice(1)
            })
            window.addeventListener('hashchange',()=>{
                this.history.current=location.hash.slice(1)
            })
        }else{
            location.pathname ? '' : location.pathname='/'
            window.addeventListener('load',()=>{
                this.history.current=location.pathname
            })
            window.addeventListener('popstate',()=>{
                this.history.current=location.pathname
            })
        }
    }
    createMap(routes){
        return routes.reduce((memo,current)=>{
            memo[current.path]=current.component
            return memo
        })
    }
}
VueRouter.install=function(Vue){
    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.router){
                // 把当前实例挂载在_root上
                // 这里的this指向当前组件实例
                this._root=this
                this._router=this.$options.router
                Vue.util.defineReactive(this,'current',this._router.history)
            }
            // 设置一个只读引用，只提供get方法，不能够修改
            Object.defineProperty(this,'$router',{
                get(){
                    return this._root._router
                }
            })
            Object.defineProperty(this,'$route',{
                get(){
                    return this._root._router.history.current
                }
            })
        }
    })
    Vue.component('router-view',{
        render(r){
            // this指向的是proxy对象 
            // 拿到当前是那个路径
            let current=this._self._root._router.history.current
            // 拿到路由组件映射
            let routeMap=this._self._root._router.routesMap
            return r(routeMap[current])
        }
    })
}
module.exports=VueRouter
```

5、源码阅读顺序

- `package.json`
  - `mian-index.js`
    - `module.exports`

















