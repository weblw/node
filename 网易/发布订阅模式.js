let houseObj={} // 发布者
let list=[] // 缓存列表


// 添加订阅者
houseObj.lsten=function(key,fn){
	// 订阅消息添加到缓存列表
	if(!this.list[key]){
		this.liset[key]=[]
	}
	this.list[key].push(fn)
	(this.list[key] || (this.list[key]=[]).push(fn))
}
// 发布消息
houseObj.trigger=function(){
	// 取出消息
	if(!fns || fns.length===0){
		
	}
}

