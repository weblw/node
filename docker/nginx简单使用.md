# nginx简单使用

- 在/etc/nginx/conf.d/目录下创建test-first-8080.conf

```
server {
  listen 80;
  location / {
    root /var/www/html;
    index index.html index.htm;
  }

  location ~ \.(gif|jpg|png)$ {
    root /static;
    index index.html index.htm;
  }
}
```

启动nginx服务：

- service nginx restart 启动nginx服务
- nginx -t 测试nginx配置

# 配置端口代理

- 在/etc/nginx/sites-enabled/目录下创建docker文件

```
server {
  listen  80;
  server_name 192.168.1.3;
  location / {
    proxy_pass  http://localhost:8080;
    proxy_redirect  off;
    proxy_set_header  Host  $host;
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```

- 实现请求192.168.1.3的时候代理到服务器8080端口

# deploy代码提交

```json
"deploy": {
        "packages": [
            {
                "name": "Version 2.3.4",
                "files": [
                    "**/**",
                    "**/*.*",
                    "Makefile"
                ],
                "exclude": [
                    ".vscode/**",
                    "logs/**",
                    "data/**"
                ],
                "deployOnSave": false
            }
        ],
        "targets": [
            {
                "type": "sftp",
                "name": "nginx SFTP folder",
                "dir": "/root/docker_ci",
                "host": "192.168.1.3",
                "port": 22,
                "user": "root",
                "password": "111111"
            }
        ],
        "showPopupOnSuccess": false,
        "showDeployResultInStatusBar": true,
        "displayLoadedPlugins": false,
        "displayNetworkInfo": false
    }
```

