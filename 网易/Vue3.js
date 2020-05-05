1、 Virtual DOM 重构

解析工作

<%%> 获取插入内容 解析+字符串拼接

词法分析 token 正则文法（规则） 

AST（抽象语法树）每一个语法的单元

vonde——形成 render 渲染函数 产出

console.log(vm.$options.render)
console.log(document.getElementById('app').outerHTML)

before:
编译的时候标记静态节点
diff Virtual DOM 的时候跳过静态节点
性能损耗与组件大小相关

now：
区块树的方式，默认所有都是静态，找出动态内容
diff Virtual DOM 的时候只比对动态部分
性能损耗只与组件动态部分有关

// test.html
<script src='./compile.js'></script>
<script>
	parseHTML("<div id='#app'>{{msg}}</div>")
</script>

// compile.js

正则文法 定义token规则

let startTagOpen=正则
let startTagClose=正则
let attribute=正则

function parseHTML(html,options){
	var index = 0
	// while(html){// 当html为空的时候结束循环
	var startTamMatch = parseStartTag()
	// }
	function parseStartTag(){
		var start = html.match(startTagOpen) // 正则匹配
		console.log(start) // 匹配到的内容 ['<div','div']
		if(start){
			var match = { // AST雏形
				tagName:start[1],
				attrs:[],
				start:index
			}
			advance(start[0].length)
			var end,attr;
			while(!(end=html.match(startTagClose)) && (attr=html.match(attribute))){
				console.log(attr)
				advance(attr[0].length)
				match.attrs.push(attr)
			}
			console.log(match) 
		}
	}
	function advance(n){ // 切割代码 每解析一块就切割一次
		index += n
		html=html.substr(n)
		console.log(html) // id='#app'>{{msg}}</div>
		console.log(index) // 4
	}
}

代码组织结构复杂 跨平台使用
// 核心方法
parse —— 解析 AST
optimize —— 标记静态节点
generate —— 生成平台所需的代码 
	- 将AST转成render function 字符串
	var fn=new Function('name','alert(name)') —— 渲染函数所需字符串
	fn('test')
// 核心方法的编译方法
parse(template.trim(),options)
// 主要分析的代码
parseHTML(html,options){}
// 编译开始标签
parseStartTag(){}



