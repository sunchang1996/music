# music

> vue 开发一款音乐播放器的webApp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## webpack 配置文件的别名
```
  在build 文件夹中的 webpack.base.conf.js 中配置别名
```
## 额外的安装依赖
- babel-runtime 辅助ES6的一个编译的操作
- fastclick   解决移动端300毫秒延迟的问题

- babel-polyfill 对ES6 的API进行转义