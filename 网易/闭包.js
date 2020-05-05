1、作用域与作用域链
// 全局变量
var willson='帅哥'
function fn1(){
	console.log(willson)
}
// 函数内部变量，外部无法访问
function fn2(){
	var name='小明'
}
console.log(name)  // error
// 作用域链 由下而上查找 就近原则
function fn3(){
	var name2='小勇'
	function fn4(){
		var name2='小猪'
		console.log(name2)
	}
	fn4()
}
fn3() // 小猪
// 闭包
function outer(){
	var a1=0
	var b1=1 // 没有引用
	return function inner(){
		return a1
	}
}
// scope属性 作用域链 包含其外部所有的引用变量
function fn5(){
	var getInnerData=outer()
	console.dir(getInnerData)
}
fn5()
2、闭包构成与原理
// v8引擎工作原理：
// 语法检查
// 运行——预解析、执行
// VO —— var function 
console.log(this) // window
function fn6(){
	var name='小绿'
	console.log(this)
}
fn6() // window 相当于window.fn6()
// this指向调用者
var _this={
	name:'小明',
	fn:function (){
		console.log(this.name)
	}
}
_this.fn() // 小明

function fn7(){
	var name4='小白'
	function displayName(){
		console.log(name4)
	}
	displayName()
}
fn7() // 小白

function fn8(){
	var name5='小件'
	function displayName(){
		console.log(name5)
	}
	return displayName
}
var myFn8=fn8()
myFn8() // 小件
// 函数工厂
function makeAdder(x){
	return function(y){
		return x+y
	}
}
// 共享相同的函数定义，却保存了不同的词法环境
var add5=makeAdder(5)
var add10=makeAdder(10)
console.log(add5(5)) // 10
console.log(add10(10)) // 20
3、闭包使用场景
// 面向对象编程

// 通常使用闭包在只有一个方法的对象的地方
function makeSize(size){
	return function(){
		document.body.style.fontSize=size+'px'
	}
}
var size12=makeSize(12)
var size14=makeSize(14)
var size16=makeSize(16)
document.getElementById('size-12').onClick=size12
document.getElementById('size-14').onClick=size14
document.getElementById('size-16').onClick=size16

// 事件防抖
function demo2(){
	console.log('ajax请求')
}
function antiShake(fn,wait){
	let timeOut=null
	return args=>{
		if(timeOut) clearTimeout(timeOut)
			timeOut=setTimeout(fn,wait)
	}
}
let telInput=document.querySelector('input')
telInput.addEventListener('input',antiShake(demo2,1000))

// 闭包模拟私有方法
// 1、限制代码访问 提高安全性
// 2、管理全局命名空间
var Counter=(fucntion(){
	// 私有变量
	var privateCounter=0
	// 私有方法
	function changeBy(val){
		privateCounter+=val
	}
	return {
		// 返回的公共函数
		increment:function(){
			changeBy(1)
		},
		// 三个公共函数共享相同词法环境		
		decrement:fucntion(){
			changeBy(-1)
		},
		value:function(){
			return privateCounter
		}
	}
})()
// 只能通过返回的公共方法访问私有属性
console.log(Counter.value()) // 0
Counter.increment()
Counter.increment()
console.log(Counter.value()) // 2
Counter.decrement()
console.log(Counter.value()) // 1

// 闭包是一个带有执行环境的函数

var makeCounter=function(){
	var privateCounter=0
	// 私有方法
	function changeBy(val){
		privateCounter+=val
	}
	return {
		// 返回的公共函数
		increment:function(){
			changeBy(1)
		},
		// 三个公共函数共享相同词法环境		
		decrement:fucntion(){
			changeBy(-1)
		},
		value:function(){
			return privateCounter
		}
	}
}
var Counter1=makeCounter()
var Counter2=makeCounter()
console.log(Counter1.value()) // 0
Counter1.increment()
Counter1.increment()
console.log(Counter1.value()) // 2
Counter1.decrement()
console.log(Counter1.value()) // 1
console.log(Counter2.value()) // 0
// 每个闭包都有自己独立的此法作用域变量
4、性能考量
function test(a,b){
	console.log(b)
	return {
		test:function(c,a){
			return test(c,a)
		}
	}
}

// 错误1 闭包一时爽 性能火葬场
function MyObject(name,message){
	this.name=name.toString()
	this.message=message.toString()
	this.getName=function(){
		return this.name
	}
	this.getMessage=function(){
		return this.message
	}
}
// 错误2 不建议重新定义原型
function MyObject(name,message){
	this.name=name.toString()
	this.message=message.toString()
}
MyObject.prototype={
	getName=function(){
		return this.name
	}
	getMessage=function(){
		return this.message
	}
}
// 方法挂载在原型上
function MyObject(name,message){
	this.name=name.toString()
	this.message=message.toString()
}
MyObject.prototype.getName=function(){
	return this.name
}
MyObject.prototype.getMessage=function(){
	return this.message
}
