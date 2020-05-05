- cnpm i typescript -D ——推荐本地安装

```javascript
// index.ts

// npx tsc --init 初始化
let fn=(age:number)=>{
    console.log('年龄：'+age)
}
fn(16)

// npx tsc 编译
let age:number=16
let age1:numeber='1' // error

// ts里面有数据类型 
// ts支持js相同的数据类型，7种数据类型
let name:string='lincancan' // 会报错（变量重复）
// 加上下面的就不会报错了——封装到模块里面了
// 在ts中只要文件存在import或者export，他都会被认为是module
export ={}

// let 变量名：数据类型=数据值
// ts编译时报错，js运行时才报错

// ts中的数组
let arr:number[] =[1,2,3,4,5]
console.log(arr)

// 数组泛型
let strArr:Array<string> =['1','2']
console.log(strArr)

// ts中数组只能放相同类型

// 元组——混合数据类型
let tuple:[string,number,boolean,string]
tuple=['lin',16,true,'love']
console.log(tuple[0])

// 枚举，枚举的是数字类型
enum Lcc{
    name, // 0
    age // 1
}
console.log(Lcc.name)
console.log(Lcc.age)

// any 专门用来处理不确定数据类型
let name:any // name与dom中的name重复了，会报错
name='lin'
name=12
console.log(name)
export={}

// void意思就是没有类型
// 函数
function hell():void{
    console.log('没有返回类型')
}
hello()
// 有返回类型
function add(a:number,b:number):number{
    return a+b
}
console.log(1,2)
// 箭头函数
let hello=():void=>{
    console.log('没有返回类型')
}
hello()

let fruit=(arg1:string,arg2:string):string=>{
    return `${arg1} and ${arg2}`
}
fruit('香蕉','苹果') // 参数必须一一对应
// ?可选参数
let fruit=(arg1:string,arg2?:string):string=>{
    if(arg2){
        return return `${arg1}`
    }else {
		return `${arg1} and ${arg2}`
	}    
}
// 默认值
let fruit=(arg1:string,arg2?:string='草莓'):string=>{
    if(arg2){
        return return `${arg1}`
    }else {
		return `${arg1} and ${arg2}`
	}    
}

// never 永远不存在值得类型
let err=function(msg:string):never{
    throw new Error(msg)
}

err('遇到未知错误')

// 类型断言(判断类型）
let assert:any='lin'
console.log(assert.substr(0,3))
// 告诉编译器obj是string
console.log((<string>assert）.substr(0,3))

// 接口
interface Xianv{
     name:string,
     age:number,
     gender:string,
     say():void
}

let lincancan:Xiannv={
    name:'林灿灿',
    age:16,
    gender:'女',
    say:():void=>{
    	consoe.log('我会说话')
	}
}
console.log(lincancan.name)
lincancan.say()
```

- ts封装ajax的get请求
- 定义规范，团队开发法很有用

```javascript
// app.js
// static——静态资源文件夹
// js——存放编译后的js文件

// npx tsc --init
// 修改 outDir 编译出口 removeComment 删掉注释

// app.js
const Koa=require('koa')
const static=require('koa-static')
const Router=require('koa-router')

const app=new Koa()
const router=new Router()

router.get('/test',ctx=>{
    ctx.body={
        code:200,
        message:'请求成功'
    }
})

app.use(static(__dirname+'static'))
app.use(router.routes())

app.listen(3000,()=>{
    console.log('Runing at port 3000...')
})
```



 ```javascript
// ajax.js
interface Config{
    url:string,
    method:string,
    data?:string
}
    
let ajax=function (config:Config):void {
    let xhr=new XMLHttpRequest()
    xhr.open(config.method,config.url,true)
    xhr.send(config.data)
    xhr.onreadystatechange=functioin(){
        if(xhr.status===200 && xhr.readyState===4){
           console.log(xhr.responseText)
        }
    }
}
// 在index.html中调用
ajax({
    method:'get',
    url:'http://localhost:3000/test'
})
 ```

- 静态类型检查
- 静态类型更有利于构建大型应用





















