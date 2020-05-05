# 制作一个`vue`插件    脱离业务走向高薪



主要知识点：

- `vue.use`
- `vue.mixin`
- 动态加载

需求：若果`vuex`体积过于庞大，引起打包后的文件过大怎么办？

`vue.use`：

- 添加插件，添加组件
- `axios`二次封装，注册全局组件，注册全局工具库

- 使用：
  - 接收方法——执行传入方法，第一个参数会是`vue`类
  - 传入对象——执行对象的`install`方法，第一个参数也是`vue`类
  - 源码：判断注入的插件是否已经存在，存在不会重复注册
    - 如果是一个方法，直接执行这个方法`fn.apply(this)`
    - 若果是一个对象，拿出install，然后执行它
    - 注重源码的学习，提升自己
  - 一般方法形式传入适用于比较简单的业务
  - 复杂的适合用对象形式传入

`vue.mixin`：

- 注意：模块化规范（`ES6`、`commonJS`），引入导出方式及区别

- 扩展`vue`实例，将`vue.mixin`传入的对象混入到`vue`实例中
- 混入之后，每个组件都可以访问混入的对象
- 用于扩展公共方法、公共属性

动态引入：

- 解决方法：使用到的组件再动态加载组件对应的`vuex`
- 路由模块太过复杂、`actions`太过复杂...
- 要多接触最佳实践，提升自己的知识层次

- 同步`import`和r`equire`引入文件会在`webpack`打包的时候，打包到一起
- 采用动态引入的方式，会在组件加载的时候，只加载对应资源

- `import(/*webpackChunkName:'mode'*/'./module1.js').then((res)=>{获取加载的模块导出的内容})`
- 注释部分，指定`webpack`打包的文件名字
- 需要配置babel编译

- `require.ensure([],fuction(){require('./module1.js')})`

- 参数：数组——写入前置依赖，回调执行之前要引入的内容

- 动态加载需要依赖`webpack`环境

开始解决需求：

```javascript
vue.mixin({
    created(){
        if（this.$options.isVue）{
            // var path 变量缓存，再引入是不行的，webpack的bug
            // 动态引入，必须给定字符串，不能是变量
            import('../store/modules'+this.$options.name).then(res=>{
                console.log(res) // 拿到的是一个对象
                this.$store.registerModule(this.$options.name,res.default) // 注入内容到vuex                
            })
        }
    },
    methods:{
        commonfn(){
            console.log('我是一个公共方法')
        }
    }
})

// this.$store.state.helloword.message
```

总结：

- `vuex`模块化，最后打包的时候还是会打包到一起
- 利用动态引入解决问题：
  - 打包出来的文件体积过大——动态引入
  - 插件、组件懒加载——`vue.components`
  - `vue`实际上也是就是一个对象——采用动态加载动态方式引入
- 注重最佳实践的学习，拓宽视野
- 见过的最佳实践多了，遇到问题自然就能想到问题解决方案

```javascript
/** jQuery中混合参数方法：
 * 参数只有一个，混入jQuery实例中
 * 有两个参数，将两个参数混合
 */
$.extends({a:1})
$.extends({a:2},{b:3}) // {a:2,b:3}
// jQuery源码实现：
function extends(){
    var targets=arguments[0]
    var i=0
    if(arguments.length>1){
        
    }else{
        targets=$
        i=0
    }
    for(var item in arguments[i]){
        targets[item]=arguments[i][item]
    }
}
```

- 注意提升自己代码质量，提升思维
- 使用node实现有用的工具
- 使用node实现中间层
- 架构思想、组件库、工具库实现

- 加油学习，朝着架构师努力！！！