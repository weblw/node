// node接口实现
服务端JS

restful
URL风格、路由风格——函数
hhtp请求——对应处理函数——路由
URL风格（路由风格）
/news/id/1(利于SEO，静态的)
/news/？id=1(不利于SEO，动态获取数据)
	
传统Url
http://127.0.0.1/user/query/1——根据id查询用户数据
http://127.0.0.1/user/save——新增用户
http://127.0.0.1/user/update——更新用户
http://127.0.0.1/user/delete——删除用户
	
web开发基础——http协议
请求接口做描述——没有必要
get请求——查询
post请求——新增

URL路由风格
对于同一个资源，在同一个url下进行，通过对http请求类型不同，来决定不同的事情

user
http://127.0.0.1/user/1 get 查询用户数据
http://127.0.0.1/user post 新增用户
http://127.0.0.1/user/1 put 修改用户
http://127.0.0.1/user/1 delete 删除用户

顶层路由模式——我们的路由不一定有对应的页面文件

restful 同一个URL下有不同的请求方式

业务无关的中间件
业务代码

高级或者全栈至少要懂一门数据库

前端——跨站脚本攻击

user 拿到数据库去查询
找到数据库user 比对密码

// app.js
const express=require('express')

let app=express()

app.get('/cailaoshi',(req,res,next)=>{
	res.send('信息')
})

app.listen(3000,()=>{console.log('runing...')})

// app.js
const http=require('htttp')

let app=http.createServer((req,res)=>{
	if(req.method==='POST'){
		if(req.url==='/user'){
			res.end(JSON.stringify({'messgae':'POST'}))
		}
	}esle if(req.method==='GET'){
		if(req.url==='/user'){
			res.end(JSON.stringify({'messgae':'GET'}))
		}
	}
})

app.listen(3000)

// app.js  cnpm i body-parser md5-node express mysql co-mysql
const express=require('express') 
const body=require('body-parser') // 解析post请求
const md5=require('md5-node') // md5
const mysql=require('mysql') // 连接数据库
const co=require('co-mysql') // 以同步方式写异步操作

let app=express()

app.use(body.urlencoded({
	extended:true
}))
// 解析json数据
pp.use(body.json())
// 连接数据库
let db=mysql.createPool({
	connectionLimit:10,
	host:'localhost',
	user:'root',
	password:'123456',
	database:'user'
})

let coon=co(db)

app.post('/user',async (req,res)=>{
	let {username,password}=req.body
	cosole.log(username,password)
	// 注册流程：1、检查用户是否存在
	let sql=`SELECT user FROM admin WHERE user='${username}'`
	let data=await coon.query(sql)
	if(data.length>=1){
		res,end(JSON.stringify({
			'status':200,
			'message':'用户名已经存在'
		}))
	}else{
		// 写入数据库
		password=md5(password)
		console.log(password)
		let sql=`INSERT INTO admin (user,password) VALUES ('${username}','${password}')`		
		let info=await coon.query(sql)
		res.send(JSON.stringify({
			'status':200,
			'message':'注册成功'
		}))
	}
})

app.get('/user/:id',async (req,res)=>{
	let id=req.params.id
	let sql=`SELECT user FROM admin WHERE id='${id}'`
	let data=await coon.query(sql)
	if(data.length===1){
		res.send(JSON.stringify({
			'status':200,
			'message':'查询成功'
		}))
	}else{
		res.send(JSON.stringify({
			'status':200,
			'message':'查询失败'
		}))
	}
})

app.listen(3000,()=>{console.log('runing at 3000...')})


























