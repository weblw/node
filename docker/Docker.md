# `Docker`

1、申请阿里云主机

`Ubantu` 18.04 64位

```javascript
# apt升级
sudo apt-get update
# 添加相关软件包
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
# 下载软件包的合法性，需要添加软件源的 GPG 秘钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
# source.list 中添加 Docker 软件源
sudo add-apt-repository \
  "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
  $(lsb_release -cs) \
  stable"
# 安装 Docker CE
sudo apt-get update
sudo apt-get install docker-ce
# 启动 Docker CE
sudo systemctl enable docker
sudo systemctl start docker
# 建立 docker 用户组（附加）
sudo groupadd docker
sudo usermod -aG docker $USER

# Helloworld测试
docker run hello-world
```

2、镜像加速

```javascript
# /etc/docker/daemon.json
{
    "registry-mirrors":[
        "https://dockerhub.azk8s.cn",
        "https://reg-mirror.qiniu.com"
    ]
}

# vi 打开配置文件编辑
# :wq 退出编辑

sudo systemctl daemon-reload
sudo systemctl restart docker

docker pull nginx
```

3、简单Nginx服务

```javascript
# 拉取镜像 
docker pull nginx
# 查看镜像
docker images nginx
# 新建www文件
mkdir www
# 写入index.html文件
echo 'hello docker !!!' >> www/index.html
# 查看www/index/html文件
cat www/index.html
# 运行
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx
# 查看进程
docker ps
# 停止服务
docker stop c99（uuid前三位）
# 重新启动
docker start c99
# 进入伪终端
docker exec -it c99 /bin/bash
# 查看放入文件
cd /usr/share/nginx/html
# 退出伪终端
exit
# 删除服务
docker rm c99
```



远程密码：**325776**

4、定制镜像服务

```  
cd  /source/docker
mkdir nginx

vi Dockerfile

FROM nginx:latest
RUN echo '<h1>Hello Kaikeba !!!</h1>' > /usr/share/nginx/html/index.html

mv Dockerfile nginx

docker build -t mynginx .

docker run -p 8000:80 nginx:kaikeba
```

5、定制node镜像

```
apt install npm

npm inti -y

npm i koa -S

vi app.js

const Koa=require('koa')

const app=new Koa()

app.use(ctx=>{

​	ctx.body='Hello NodeJS !!!'

})

app.listen(3000,()=>{

​	console.log('app started at 3000')

})

vi Dockerfile 

FROM node:10-alpine

ADD . /app/

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]

esc  :wq

docker build -t  mynode .

docker run -p 3000:3000 -d mynode
```

[服务器无法访问](https://jingyan.baidu.com/article/fa4125ac0f162e28ac70922a.html)

6、定制pm2服务

`cp -R node pm2`——复制文件夹

`vi process.yml`

[删除image](https://www.jianshu.com/p/b06878ed3d48)

```shell
# 删掉容器
docker stop $(docker ps -qa)
docker rm $(docker ps -qa)
# 删除镜像
docker rmi --force $(docker images -q)
```

7、docker compose

apt install docker-compose

mkdir helloworld

docker-compose.yml

version: '3.1' 

services:  nginx:    

image: nginx:kaikeba    

ports:      

- 80:80

8、docker-compose

cd source

mkdir mongo

vi docker-compose.yml

docker-compose up



version: '3.1'
services:
        nginx:
                image: mynginx
                ports:

                - 80:80







const mongoose = require("mongoose");
// 1.连接
mongoose.connect("mongodb://mongo:27017/test", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));



const mongoose = require('mongoose'); mongoose.connect('mongodb://mongo:27017/test', {useNewUrlParser: true}); const Cat = mongoose.model('Cat', { name: String }); Cat.deleteMany({}) const kitty = new Cat({ name: 'Zildjian' }); kitty.save().then(() => console.log('meow'));

app.use(async ctx => {        ctx.body = await Cat.find()     })



$ docker ps // 查看所有正在运行容器
$ docker stop containerId // containerId 是容器的ID

$ docker ps -a // 查看所有容器
$ docker ps -a -q // 查看所有容器ID

$ docker stop $(docker ps -a -q) //  stop停止所有容器
$ docker  rm $(docker ps -a -q) //   remove删除所有容器



服务器IP 121.40.242.237



- docker删除 镜像

https://www.jianshu.com/p/b06878ed3d48