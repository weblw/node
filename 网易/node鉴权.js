1、 cookie session token
cookie 存放在客户端浏览器 
	不安全 cookie欺骗 
	cookie有大小限制 cookie跨域
session 存放在服务器 安全 session依赖cookie
	访问增多 session会占用服务器性能 只存放重要信息 登录信息
	扩展性 分布式上受限
	集群——>负载均衡
	分布式——>不同模块放在不同服务器上
	sso单点登录 session共享redias
2、 jwt 
json web token 鉴权
	认证原理：
	用户输入登陆信息
	服务器验证信息是否正确
	正确返回签名token（令牌）
	token存在客户端localStorage中
	http请求都将token添加到请求头
	服务器解码token，token有效，接受请求
	token是无状态的，后端服务器不保存
	
token 头部 载荷 签名
头部：类型
载荷：主体内容
签名：加密hash
	



























