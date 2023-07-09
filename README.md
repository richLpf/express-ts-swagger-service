## 项目说明

很多小伙伴看了这篇文章[从0开始Typescript + Express + Sequelize + Swagger + PM2 + Docker 搭建部署后端服务](https://juejin.cn/post/7120074311926284296)，想要源码。

所以应多位小伙伴请求，把该项目的代码开源出来，不过该项目还有很多改进的空间

- 部署方式支持Docker和PM2，选择一个就好
- 接口支持的`Action`风格，如果需要支持`Restful`风格需要简单改造一下
- 项目返回值处理的并不好，太独立，可以进一步封装
- TS声明不太严格
- Swagger注视和文档写的并不规范
- 数据库选择了Mysql，目前安装比较费劲，安装不了，可以使用MariaDB，驱动也要更新下
- 没有MQ和Redis等接入

上面功能可以提Merge或者@我，来处理，也欢迎给Star，给我点更新的动力，🙏。

TODO: 鉴于Demo项目都比较难入门，打算增加一个`Docker-compose`的启动方式，支持后期只需要本地支持`Docker compose`就可以一行命令启动：
- 自动安装Mysql
- 启动项目
- 同步数据库
- 同时启动一个前端项目

### 技术栈和项目环境

项目技术栈：
- Express
- Mysql
- Swagger
- PM2
- TS
- Sequelize
- Docker
- ESLint

我本地启动项目的环境为如下：
- OS: m1、
- node: 17.9
- Docker Image: node:18-alpine
- 部署环境：centos

### 项目启动

准备工作：本地安装mysql，创建对应的数据库，具体配置可以在`.env.development`

1、本地启动mysql

修改.env.development文件配置

2、启动项目

```
yarn start
```
### 实现能力
- 登录注册
- 项目介绍的增删改差

### 三、预发或生产环境部署

1、更新ecosystem.config.js生产环境数据库地址

2、部署
- 方式一：Docker
- 方式二：PM2

```
yarn build
yarn deploy:prod
```