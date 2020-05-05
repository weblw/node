// vue 订阅器模型 拉模型:按需取数据
let Dep={
	list:{},
	listen:fucntion(key,fn){
		(this.list[key] || (this.list[key]=[])).push(fn)
	},
	trigger:fucntion(){
		// 取出消息类型名称
		let key=Array.prototype.shft.call(arguments)		
		// 对应的回调函数
		let fns=this.list[key]
		if(!fns || fns.length===0){
			return 
		}
		for(let i=0,fn;fn=fns[i++]){
			fn.apply(this,arguments)
		}
	}
}
// 劫持方法
let dataHiJack=function ({data,tag,datakey,selector}){
	let value=''
	el=document.querySelector(selector)
	// 劫持数据
	Object.defineProperty(data,datakey,{
		get:function(){
			console.log('尤大神')
			return value
		},
		set:fucntion(newValue){
			console.log('数据修改了')
			value=newValue
			Dep.trigger(tag,newValue)
		}
	})
	// 绑定观察者
	Dep.listen(tag,fcuntion(text){
		el.innerHTML=text
	})
}

// 使用
<span class='view-1'></span>
<span class='view-2'></span>
let dataObj={} // vue data
dataHiJack({
	data:dataObj,// vue data
	tag:'view-1',// 元素
	datakey:'one',// key
	selector:'.box-1'// class
})
dataHiJack({
	data:dataObj,// vue data
	tag:'view-2',// 元素
	datakey:'two',// key
	selector:'.box-2'// class
})
// 初始化
dataObj.one='one'
dataObj.two='two'

dataObj.one  触发get

dataObj.one='new' 触发set

// v-5
let Event=(fucntion(){
	let list={}
	listen,
	trigger,
	remove;
	listen=fucntion(key,fn){
		(list[key] || (list[key]=[])).push(fn)
	};
	trigger=fucntion(){
		// 取出消息类型名称
		let key=Array.prototype.shft.call(arguments)		
		// 对应的回调函数
		let fns=list[key]
		if(!fns || fns.length===0){
			return 
		}
		for(let i=0,fn;fn=fns[i++]){
			fn.apply(this,arguments)
		}
	};
	remove=fucntion(key,fn){
		let fns=list[key]
		if(!fns){
			return fasle
		}
		// 清空
		if(!fn){
			fn && (fns.length=0)
		}else{
			for(let i=fns.lenght-1;i>=0;i--){
				let _fn=fns[i]
				_fn===fn && (fn.splice(i,1)) // 删除订阅者对应的函数
			}
		}
	};
	return {
		listen:listen,
		triger:triger,
		remove:remove
	};
})()

Event.listen('big',fucntion(size){
	console.log('大小'+size)
})
Event.trigger('big',100)

// 应用场景举例
$.ajax('xxx',fucntion(data){
	initData(data)
	animate(data)
})

$.ajax('xxx',fucntion(data){
	obj.trigger('success',data)
})
boj.listen('sucess',fucntion(data){
	...
})

// v-4
let event={
	list:{},
	listen:fucntion(key,fn){
		(this.list[key] || (this.list[key]=[])).push(fn)
	},
	trigger:fucntion(){
		// 取出消息类型名称
		let key=Array.prototype.shft.call(arguments)		
		// 对应的回调函数
		let fns=this.list[key]
		if(!fns || fns.length===0){
			return 
		}
		for(let i=0,fn;fn=fns[i++]){
			fn.apply(this,arguments)
		}
	}
}
event.remove=fucntion(key,fn){
	let fns=this.list[key]
	if(!fns){
		return fasle
	}
	// 清空
	if(!fn){
		fn && (fns.length=0)
	}else{
		for(let i=fns.lenght-1;i>=0;i--){
			let _fn=fns[i]
			_fn===fn && (fn.splice(i,1)) // 删除订阅者对应的函数
		}
	}
}
// 为对象添加发布订阅功能
let initEvent=function(obj){
	for(let i in event){
		obj[i]=event[i]
	}
}


let houseObj={}
initEvent(houseObj)

houseObj.listen('big',fn1=fucntion(){
	console.log('买500的')
})
houseObj.listen('big',fn2=fucntion(){
	console.log('买300的')
})
house.remove('big',fn2)
house.trigger('big',100)








