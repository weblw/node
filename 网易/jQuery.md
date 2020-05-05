# jQuery

1、匿名自执行函数

```javascript
(function(window,undefined){
	window.$=jQuery=function(nodeSelector){
        let nodes={}
        if(typeof nodeSelector==='string'){
            let temp=document.querySelectorAll(nodeSelector)
            for(var i=0;i<temp.length;i++){
                nodes[i]=temp[i]
            }
            nodes.length=temp.length
        }else{
             throw new Error('必须输入字符串')
        }
        // 添加class
        nodes.addClass=fucntion(classes){
            let clsssName=classes.split(' ')
            className.forEach(value=>{
                for(var i=0;i<nodes.length;i++){
                    nodes[i].classList.add(value)
                }
            })
        }
        // 修改text
        nodes.setText=function(text){
            for(var i=0;i<nodes.length;i++){
                nodes[i].textContent=text
            }
        }
        // 移出dom
        nodes.remove=function(){
            // 获取当前dom
            let el
            for(var i=0;i<nodes.length;i++){
                el=nodes[i]
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
        return nodes
    }
})(window)
```

```html
<style>
    .blue{
        color:blue;
    }
</style>
<body>
    <div id='title'></div>
    <div class='p-con'>
    	<p>111</p>
    	<p>222</p>
    	<p>333</p>
    	<p>444</p>
    </div>    
</body>
<script src='./jquery.js'></script>
<script>
	let title=$('#title')
    title.addClass('blue')
    title.setText('改变内容')
    title.remove()
    // 终极封装测试
    let pCon=$('.p-con')
    pCon.find('p').eq(1).remove()    
    let fn=function a(){}
    let val=$.isFunction(fn)
    console.log(val)
</script>
```

```javascript
// 封装
let $=jQuery=(function(window,undefined){
    let jquery=function(nodeSelector){
        this.nodes=document.querySelectorAll(nodeSelector)
    }
    jquery.prototype={
        each:fucntion(callback){
        	for(var i=0;i<this.nodes.length;i++){
                // call jquery函数
                callback.call(this,i,this.nodes[i])
            }
    	},
        // 添加class
    	addClass:function(classes){
            let clsssName=classes.split(' ')
        	className.forEach(value=>{
            this.each(fucntion(index,el){
                el.classList.add(value)
            })
        },
        // 替换content
        setText:function(text){
            this.each(fucntion(index,el){
                el.textContent=text
            })
        },
        // 删除dom
       remove:function(){
           this.each(fucntion(index,el){
                el.parentNode && el.parentNode.removeChild(el)
            })
       }     
    }
    return function(nodeSelector){
        return new jquery(nodeSelector)
    }
})(window)
```

```javascript
// 终极封装
var $=jQuery=(function(window,undefined){
    // 对dom对象进行存储
    fucntion Query(dom,selector){
        let i,len=dom ? dom.length : 0
        for(i=0;i<len;i++) this[i]=dom[i]
        this.length=len
        this.selector=selector || ''
        return this
    }
    // 生成jquery对象
    fucntion Z(elements,selector){
        return Qurey.call(this,elements,selector)
    }
    // dom查找
    function qsa(elements,selector){
        // 暂时不考虑其他选择器 string
        return elements.querySelectorAll('selector')
    }
    Z.prototype={
        each(callback){
            // this Z实例 this[i]
            [].every.call(this,function(el,index){
                return callback.call(el,index,el)!==false
            })
        },
        find(selector){
            let doms=[]
            this.each(function(index,el){
                let childs=this.querySelectorAll(selector)
                doms.push(...childs)
            })
            return new Z(doms,selector)
        },
        eq(i){
            let doms=[]
            this.each(function(index,el){
                if(i===index){
                    doms.push(this)
                }
            })
            return new Z(doms,this.selector)
        },
        remove(){
            this.each(function(index,el){
                this.remove()
            })
        }
    }
    // 添加全局方法
    function isFunction(value){
        return typeof value=='fucntion'
    }
    $.isFunction=isFunction
    fucntion $(nodeSelector){
        let doms=qsa(document,nodeSelector)
        return new Z(doms,selector)
    }
    return $
})(window)
```



















