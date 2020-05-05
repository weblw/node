1、约定大于配置
vue init webpack project
vue create project

vue-cli  git上拿项目

npm init -y 初始化package.json
cnpm i vue -D  下载vue
cnpm i webpack webpack-cli -D  下载webpack

创建 src 目录新建component.js 入口文件

创建webpack.config.js 添加配置

webpack-dev-server 热更新
html-webpack-plugin 打包html

package.json中sprits 创建 dev 快捷命令
npx webpack-dev-server --env.development
npx webpack --env.production

// webpack.config.js
module.exports=env=>{
	// 防止为空
	env=env || {}
	return {
		entry:'./src/index.js',
		...env.development ? 
			require('./config/webpack.development.js') :
			require('./config/webpack.production.js')
	}
}

// webpack.development.js
const path=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
	mode:development,
	output:{
		filename:'bundle.js'
	},
	plugins:[
		new htmlWebpackPlugin({
			template:'index.html'
		})
	]
}
// webpack.production.js
const path=require('path')

module.exports={
	mode:production,
	output:{
		path:path.resolve(__dirname,'../build')
		filename:'bundle.js'
	}
}


实现vue 2.0
mkdir components
touch home.vue

css-loader 
vue-html-loader 
vue-style-loader 
vue-loader
vue-template-compiler

module.exports=env=>{
	// 防止为空
	env=env || {}
	return {
		entry:'./src/components.js',		
		module:{
			rules:[
				{test:/\.css$/,use:['vue-style-loader ','css-loader']},
				{test:/\.vue$/,use:['vue-loader']}
			]
		},
		// 起了个别名 import Vue from 'vue'
		resolve:{
			alias:{
				'vue':'vue/dist/vue.esm'
			},
			extensions:['.js','.json','.vue'] // 省略后缀
		},
		// 对象扩展符 取出参数中的环境变量 
		...env.development ? 
			require('./config/webpack.development.js') :
			require('./config/webpack.production.js')
	}
}




