# node+mongodb

1、前端全栈化

2、数据库

- 存储数据的地方
- 数据库分类
  - 关系型数据库——关系模型组织数据库
    - 由很多互相关联的的二维表组成
    - 字段、元组、主键、外键
    - SQL语句——结构化查询语句
    - select username,password from admin where id=1
    - 库——表——元组
  - 非关系型数据库
    - nosql
    - 基于键值对的数据表
    - 不适用于多表关联数据
    - 基本保存在内存中（redis）
    - 库——集合——文档
- 常见数据库mongodb、mysql、oracle

3、mongodb

- 基本操作（增删改查）
  - 增加一条数据
  - show bds——查询有多少数据库
  - use test——切换、新建数据库
  - db.集合名.insert({name:"user"})——插入数据
  - db.集合名.find()——查询数据
  - _id——自动添加的唯一标识符（主键）
  - db.test.insertOne({name:"admin",password:"123456"})
  - db.test.insertMany([{...},{...},{...}])——一次插入多条数据
  - db.test.find({age:18})——条件查询
  - db.test.find({age:18,name:"张三"})
- 常用操作符
  - < $it   <= $lte   > $gt   >= $gte     !== $ne
  - db.test.find({age:{$it:16}})
  - 逻辑或——bd.test.find({age:{$in:[17,20]}})
    - bd.test.find({$or:[{age:17},{age:20}]})
  - 逻辑非——bd.test.find({age:{$nin:[17,20]}})
  - 正则——db.test.find({name:/^l/})
  - 函数
    - db.test.find({$where:function(){return this.name==='张三'}})
  - 删除 delete
  - db.test.remove({age:{$lte:19}})
  - db.test.drop()——删除集合
  - show tables——查询集合
  - show collections——查询集合
  - 更新 update
  - db.test.update({name:'张三'},{$set:{age:21}})
  - db.test.update({age:16},{$set:{age:19}},{multi:true})——更新多条

4、nodejs

- 可以操作mysql、mongodb
- mongoose——nodejs的对象模型工具
- 连接数据库

```javascript
const mongoose=require('mongoose')
// 协议名+数据库主机名+duankou+数据库名
mongoose.connect('mongodb://localhost:27017/user',{useNewUrlParser:true,useUnifiedTopology:true})
// 监听
mongoose.connection.on('open',(err)=>{
    if(!err){
        // 回调嵌套
        console.log('连接成功')
    }else{
        console.log(err)
    }
})
// Promise
let promise=new Promise((resolve,reject)={
    mongoose.connection.on('open',(err)=>{
        if(!err){
            // 回调嵌套
            resolve()
            console.log('连接成功')
        }else{
            reject()
            console.log(err)
        }
    })
}); // 自执行函数前后必须加分号

let login={
    username：'admin',
    password:123456
}

(async ()=>{
    await promise
    console.log('数据库操作')
    // 写入数据
    let Schema=mongoose.Schema
    // 创建规则
    let userSchema=new Schema{
        username:{
            type:String,
            required:true,
            unique:true——唯一性
        },
        password:{
			type:Schema.Types.Mixed,
            required:true
        }
    }
    // 使用规则
    let userModel=mongoose.model('user',userSchema)
    userModel.create({
        username:'admin'，
        password：123456
    },(err,data)=>{
        if(!err){
            console.log(data)
        }else{
            console.log(err)
        }
    })
    userModel.find({
        username:login.username,
        password:login.password
    },(err,data)=>{
        if(!err){
            if(data.length===1){
                console.log('登录成功')
            }else{
                console.log('登陆失败')
            }
        }else{
            console.log(err)
        }
    })
})()
// ejs模板引擎——页面渲染
```

