# vue插件

1、vue.use

- 接收一个对象或方法
  - 传入的是方法——执行这个方法
  - 传入的是对象，里面有install方法——执行install方法

2、vue.mixin

- 搭配vue.use使用，扩展vue实例
- 接收对象做参数
- 给vue实例混入data、生命周期、methods等

3、动态加载

- 业务代码
- import（/\*name\*/path）——异步加载
- 同步的import和require会在webpack之中打包到一起
- require.ensure([],function(){ require( path ) })

4、实例

- 插件实现动态加载vuex

```javascript
// myplugins/index.js
module.exports={
    install:function(Vue){        
        Vue.mixin({
            created(){
                this._root——根实例
                // 挂载router对象
                this.$options.router={}
                console.log(this.$options.isVuex)
                if(this.$options.isVuex){
                   // import不能接收变量，只能接收字符串
                   import('../store/modules'+this.$options.name).then(res=>{
                       console.log(res)
                       this.$store.registerModule(this.$options.name,res.default)
                   })
                }
            }
        })
    }
}

// 使用 main.js
import plugins from './myplugins'
Vue.use(plugins)

import HelloWord from '@/components/HelloWorld'
const Con=Vue.extends(HelloWord)
console.log(new Con().$el) //组件DOM
```

















