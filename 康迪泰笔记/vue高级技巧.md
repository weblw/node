1、 全局组件注册

```javascript
// global.js  在mian.js中全局引入
import Vue from 'vue'
function changeStr(str){
    // charAt 取字符的第一个字节转大写 abc=>Abc
    return str.charAt(0).toUppereCase()+str.slice(1)
}
const requireComponent=require.context('.',false,/\.vue$/)
console.log(requireComponent.keys())
requireComponent.keys().forEach(fillName=>{
    // 第i个
    // ./child1.vue
    const config=requireComponent(filllName)
    console.log(config)
    const componentName=changeStr(
        fileName.replace(/^\.\//,'').replace(/\.\w+$/,'')
    )
    console.log(componentName)
    Vue.component(componentName,config.default || config)
})
```

```javascript
// 主路由动态引入
// router文件夹 index.routes.js login.routes.js
export default{
    path:'/index',
    name:'index',
    component:()=>import('../views/index.vue'),  // chunk
    children:[...]
}

export default{
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue'),  // chunk
    children:[...]
}
// 在router.js文件中引入
import Login from './router/login.routes.js'
export default new Router({
    routes:[Login,...]
})
// router.js优化
const routerList=[]
function importAll(r){
    r.keys().forEach((key)=>(
    	routerList.push(r(key).default)
    ))
}
importAll(require.context('./router',true,'/\.routes\.js/'))
export default new Router({
    routes:[...routerList]
})
```

2、拯救烦乱的template——render函数

- 一值多判断
- http://baijiahao.baidu.com/s?id=1603797081408586727&wfr=spider&for=pc render函数详解

```javascript
<template>
    <button v-if=‘value===1’>按钮1</buttom>
	<button v-else-if=‘value===2’>按钮2</buttom>
	<button v-else>按钮3</buttom>
</template>
// button.vue
<script>
export default{
	props:{
    	type:{
        	type:string,
        	default:'normal'
    	},
    	text:{
       		type:string,
       		default:'normal'
    	}
	},
    render(h){
        return h('button',{
            // v-bind:class
            class:{
                btn:true,
                'btn-success':this.type==='success',
                'btn-danger':this.type==='danger',
                'btn-waring':this.type==='wraing',
            },
            // dom属性
            domProps:{
                innerText:this.text || '默认'
            },
            // 事件
            on:{
                click:this.handleClick
            }
        })
    },
	methods:{
    	handleClick(){
        	this.$emit('myEvent')
    	}
	}
}
</script>
<style>
.btn{
    width:100px;
    height:40px;
    line-height:40px;
    color:#fff;
} 
.btn-success{
    background:green;
}
.btn-danger{
    background:red;
}
.btn-wraning{
    background:orange;
}
 </style>
// 在组件中引入使用
import Button from './button.vue'
components:{
    Button
},
data(){
    return {
        type:'danger',
        text:'警告'
    }
},
methods:{
   parDemo:fucntion(){
      console.log(111)
   }
}

<Button :type='type' :text='text' @myEvent='parDemo'/>
```

3、高精度全局权限控制

- v-show非常不安全，很轻易可以更改

```javascript
<button v-if=’power===1‘>权限1</button>
```

```javascript
// array.js
export fucntion checkArray(key){
    // 权限数组
    let arr=['1','2','3','4','5']
    let index=arr.indexOf(key)
    if(index>-1){
        // 有权限
        return true
    }else{
        // 没有权限
        return false
    }
}
// 引入使用 在main.js全局引入
import {checkArray} from './array.js'
Vue.directive('displayKey',{
    insertd(el,binding){
        let displayKey=binding.value
        if(displayKey){
            let hasPermisson=checkArray(displayKey)
            // 如果没有权限，删除dom节点
            if(!hasPermisson){
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else {
            throw new Error('需要传key')
        }        
    }
})
// 在组件中使用
<Button v-display-key="'10'"></Button>
<Button v-display-key="'4'"></Button>
```



















