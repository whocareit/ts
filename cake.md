## umi
1. 介绍： Umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 3000+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户
2. 不适用场景
* 需要支持 IE 8 或更低版本的浏览器
* 需要支持 React 16.8.0 以下的 React
* 需要跑在 Node 10 以下的环境中
* 有很强的 webpack 自定义需求和主观意愿
* 需要选择不同的路由方案
## dva
1. 介绍：首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。
2. 特性：
* 易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
* elm 概念，通过 reducers, effects 和 subscriptions 组织 model
* 插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
* 支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR
3. 一些函数的用法：
* useLocation： 用于去获取到当前页面的url
* useHistory:   获取history对象
* useParams:    获取params对象。params对象为动态路由里的参数键值对
* useRouteMatch： 获取到当前路由的匹配信息
## Prettier
1. 介绍：是一个流行的代码格式化工具的名称，它能够解析代码，使用你自己设定的规则来重新打印出格式规范的代码。
2. 优点：
* 可配置化
* 支持多种语言
* 集成多数的编辑器
* 简洁的配置项
## husky
1. 介绍：对于git操作的保护，对于坏的提交，上传等做一种限制


