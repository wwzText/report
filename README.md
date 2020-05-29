# 项目说明

## 项目描述
> 雪花crm系统*报表*H5 入口是pages/entry
> 雪花工作圈拜访分享 *分享*H5 入口是pages/workCirclevisit

## 构建工具
> vue脚手架3.+，ui框架使用vant

#### 启动方式
```
yarn serve
```

#### 打包
```
yarn build
```

## 项目结构说明(src文件夹)
* assets(静态资源文件夹)
    * css (公用css文件)
    * iconfont（字体图标）
    * less（公用less文件）
* components（公用组件）
    * common（通用组件）
    * 其他文件夹对应不同页面所单独需要使用的组件
* module
    * common（通用模块，一般用于存放user信息）
    * 其他文件对应不同页面使用到的module
* pages
    * 存放页面文件，每个文件夹对应一个页面，html和less文件分开写，使用@import()引入
* router
    * routes文件存放页面引用
    * index将routes文件引入并注入到Vue
* store



