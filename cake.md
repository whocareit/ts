## umi
1. 介绍： Umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 3000+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户
2. 不适用场景
* 需要支持 IE 8 或更低版本的浏览器
* 需要支持 React 16.8.0 以下的 React
* 需要跑在 Node 10 以下的环境中
* 有很强的 webpack 自定义需求和主观意愿
* 需要选择不同的路由方案
### umi基础
#### 配置
* umi在.umirc.ts或config/config.ts中配置项目和插件，支持es6
* 配置文件，如果项目的配置不复杂，推荐在.umirc.ts中写配置；如果项目的配置比较复杂，可以将配置写在config/config.ts中，并把配置的一部分拆出去，比如路由配置也可以拆成单独的config/routes.ts。
* 优先级，.umirc.ts的优先级更高
* ts提示，如果想在写配置时也有提示，可以通过defineConfig方法定义配置
```
import { defineConfig } from 'umi';

export default defineConfig( {
    //配置项。。。。
})
```
* 本地临时配置，可以新建.umirc.local.ts,这份配置会和.umirc.ts做deep merge后形成最终的配置。如：
```
//umirc.ts,
export default { a: 1, b: 2}
//umirc.local.ts
export default { c: 'local'}
//最终生成的配置
{
    a: 1,
    b: 2,
    c: 'local'
}
```
1. 注意：
    * config/config.ts对应的是config/config.local.ts
    * .local.ts是本地验证使用的临时配置，**需要将其添加到.gitignore,不能提交到git仓库中**
    * .local.ts配置的优先级最高，比UMI_ENV指定的配置更高
#### 运行时配置
* 运行时配置和配置的区别是在他运行时配置在浏览器中运行，在这里写函数、jsx、import浏览器端依赖等等，**注意不要引入node依赖**
* 配置方式，约定是以src/app.tsx为运行时配置
* modifyClientRenderOpts(fn),修改clientRender参数
* patchRoutes({ routes }),修改路由
* render(oldRender: Function),覆写render
* onRouteChange({routes, matchedRoutes,location,action}),在初始加载和路由切换时，做一些事情
* rootContainer(LastRootContainer, args),修改交给react-dom渲染时的根组件
    1. args包含
        * routes，全量路由配置
        * plugin，运行时插件机制
        * history，history实例
#### 路由
* 配置路由，在配置文件中通过Routes进行配置，格式为路由信息的数组
    * path，type值为string(匹配路径)
    * component,type为string(具体组件的路径，与路由相对应)
    * exact,type值为boolean，表示是否严格匹配，即location是否和path完全给匹配上
    * routes，配置子路由，通常在需要为多个路径增加layout组件时使用
    * redirect，重定向
    * wrappers，type: string[],配置路由的高阶组件封装。如，路由级别的权限校验
    * title，type: string 配置路由的标题
* 页面跳转
如
```
export default {
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/user', component: 'user' },
  ],
}
```

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


# 量产后台
## umi只中常用文件配置
### .umirc.ts中的defineConfig对象中的配置项
* routes，该类型需要为IRoute[]类型,通常在定义时，需要重新定义配置项，然后再放在配置项中
```
const routes: IRoute[] = [{
    path: '/',
    component: '', //首次渲染页面，
    routes: [
        {path: '/',components: '', exact: true},
        ......
    ]
}]
```


