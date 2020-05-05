1、react中样式处理

- 使用css-modules  使用脚手架创建项目默认支持css-modules

  -   https://www.w3cplus.com/react/css-modules-in-react.html	
  -  https://www.jianshu.com/p/0050b3fd7f58

- 使用styled-jsx

  - npm install react-app-rewired styled-jsx customize-cra -S

  - 在 `packages.json` 同级目录下创建 `config-overrides.js` 文件

  - 打开 `package.json` 文件，找到 `scripts` 这个部分，应该是下面这样：

    ```json
     "scripts": {
         "start": "react-scripts start",
         "build": "react-scripts build",
         "test": "react-scripts test --env=jsdom",
         "eject": "react-scripts eject"
       }
    ```

  - `config-overrides.js` 文件，内容如下：

  - ```javascript
    const { override, addBabelPlugin } = require('customize-cra');
    
    module.exports = override(
    	addBabelPlugin('styled-jsx/babel')
    )
    ```

2、react小书

- http://huziketang.mangojuice.top/books/react/lesson2

