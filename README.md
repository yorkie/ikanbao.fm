ikanbao.fm
==========

电子报在线阅读第三方平台 based on Express.js

特性(Features)
==========

  - 响应式Web设计，有效支持各种网络终端设备
  - 部分SPA(Single Page Application)——单页面App
  - 设计风格：小清新
  - 使用[oocss](https://github.com/stubbornella/oocss)框架
  - 使用[Seajs](http://seajs.org)：模块化Javascript，降低前端代码冗余，分离视图与逻辑
  - 视图引擎[Jade](https://github.com/visionmedia/jade)，为了更好的使用express框架的优势，使用Jade作为主要视图引擎
  - MySQL & NoSQL：各展所长
  - 与业务代码分离，并基于MIT开放源代码

文件结构(Layout)
=================

    \-{your_project:root}               // 根目录
    +-.gitignore                        // git文件
    +-package.json
    +-app.js                            // 启动服务器
    +-\assets                           // 静态资源 img,scripts,styles...
      +-\scripts
        +-index.js
        +-\lib                          // Js引用库
          +-sea.js
          +-jquery.min.js
          +-{other js libraries}
      +-css/
      +-images/
    +-\lib/                             // 服务器端逻辑库
    +-\node_modules                     // 引用的Node库
      +-express/
      +-jade/
      +-mysql/
      +-mongodb/
    +-\routes/                          // 路由
    +-\views/                           // 视图，不区分front end还是back end
    +-\models/													// 数据模型
    
如何启动服务器(How to do a Startup)
=====================
你只需像启动Express一样使用下面的代码即可：

    node app
    
不同的是我对服务器端的commandLine做了后续的命令载入，方便管理员启动/关闭服务器进程


拓展阅读
=============

  1. seajs: http://seajs.org
  2. express: http://expressjs.com
  3. oocss: https://github.com/stubbornella/oocss
  4. jade: https://github.com/visionmedia/jade
