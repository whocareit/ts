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
```
export default {
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/user', component: 'user' },
  ],
}
```
* 页面跳转
    * 引入history，使用history.push()跳转到指定的路由当中，history.goBack();返回到上一个路由当中
* Link组件
    * 使用<Link to="url" />到指定的地址当中
* 路由组件参数：可以通过props获取到下面的这些属性
    * match，当前路由和url match后的对象，包含params path url isExact属性
    * location，表示当前应用是哪个位置，包含pathname search query等属性
    * history，同之前的history一样
    * route,当前路由配置，包含path exact component routes等
    * routes，全部路由信息
* 传递参数给子路由：通过cloneElement
```
import React from 'react';

export default function Layout(props) {
    return React.Children.map(props.children, child => {
        return React.cloneElement(child, {foo: 'bar'})
    })
}
```
#### 约定式路由
* 含义：约定式路由也叫文件路由，不需要手写配置文件，文件系统即路由，通过目录和文件及其命名分析出路由配置
* 如果没有routes配置，Umi会进入约定式路由模式，然后分析src/pages目录拿到路由配置
* 注意，满足以下任意规则的文件不会被注册为路由
    * 以.或者_开头的文件或目录
    * 以d.td结尾的类型定义文件
    * 以test.ts spec.ts e2e.ts结尾的测试文件
    * component和components目录
    * utils和util目录
    * 不是.js .jsx ts或.tsx文件
    * 文件内容不包含JSX元素
##### 动态路由
1. 含义：约定[]包裹的文件或文件夹为动态路由，如：
```
//文件结构如下：
.
  └── pages
    └── [post]
      ├── index.tsx
      └── comments.tsx
    └── users
      └── [id].tsx
    └── index.tsx

//生成路由配置如下：
[
  { exact: true, path: '/', component: '@/pages/index' },
  { exact: true, path: '/users/:id', component: '@/pages/users/[id]' },
  { exact: true, path: '/:post/', component: '@/pages/[post]/index' },
  {
    exact: true,
    path: '/:post/comments',
    component: '@/pages/[post]/comments',
  },
];
```
##### 动态可选路由
* 约定以[ $]包裹的文件或文件夹为动态可选路由
```
//目录结构
.
  └── pages
    └── [post$]
      └── comments.tsx
    └── users
      └── [id$].tsx
    └── index.tsx
//会生成的路由配置
[
  { exact: true, path: '/', component: '@/pages/index' },
  { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
  {
    exact: true,
    path: '/:post?/comments',
    component: '@/pages/[post$]/comments',
  },
];
```
##### 嵌套路由
* 在umi中规定目录下有_layout.tsx时，会生成嵌套路由，以_layout.tsx为该目录下的layout。此时layout文件需要返回一个react组件，并通过props.children渲染子组件
```
//目录结构
.
└── pages
    └── users
        ├── _layout.tsx
        ├── index.tsx
        └── list.tsx

//生成的路由结构
[
  { exact: false, path: '/users', component: '@/pages/users/_layout',
    routes: [
      { exact: true, path: '/users', component: '@/pages/users/index' },
      { exact: true, path: '/users/list', component: '@/pages/users/list' },
    ]
  }
]
```
#### 全局layout
* 约定src/layouts/index.tsx为全局路由。返回一个React组件，并通过props.children渲染子组件
```
//目录结构
.
└── src
    ├── layouts
    │   └── index.tsx
    └── pages
        ├── index.tsx
        └── users.tsx

//生成的路由
[
  { exact: false, path: '/', component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', component: '@/pages/index' },
      { exact: true, path: '/users', component: '@/pages/users' },
    ],
  },
]
```
##### 不同的全局 layout
* 针对不同路由输出不同的全局 layout，Umi 不支持这样的配置，但你仍可以在 src/layouts/index.tsx 中对 location.path 做区分，渲染不同的 layout 
```
//针对 /login 输出简单布局
export default function(props) {
  if (props.location.pathname === '/login') {
    return <SimpleLayout>{ props.children }</SimpleLayout>
  }

  return (
    <>
      <Header />
      { props.children }
      <Footer />
    </>
  );
}

```
##### 404路由
* 约定 src/pages/404.tsx 为 404 页面，需返回 React 组件。
```
//目录结构
.
└── pages
    ├── 404.tsx
    ├── index.tsx
    └── users.tsx

//生成的路由
[
  { exact: true, path: '/', component: '@/pages/index' },
  { exact: true, path: '/users', component: '@/pages/users' },
  { component: '@/pages/404' },
]
访问 /foo，/ 和 /users 都不能匹配，会 fallback 到 404 路由，通过 src/pages/404.tsx 进行渲染
```
##### 权限路由
* 通过高阶组件wrappers达成效果
```
//在src/pages/user
import React from 'react'
function User() {
  return <>user profile</>
}
User.wrappers = ['@/wrappers/auth']
export default User
//在 src/wrappers/auth 中
import { Redirect } from 'umi'

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
```
##### 扩展路由属性
* 支持在代码层通过导出静态属性的方式扩展路由。
```
function HomePage() {
  return <h1>Home Page</h1>;
}

HomePage.title = 'Home Page';

export default HomePage;
//会使得titlt会附加到路由配置中
```
#### 插件
##### 插件的id和key
* 每个插件都会对应一个 id 和一个 key，**id 是路径的简写，key 是进一步简化后用于配置的唯一值**
* 如：插件 /node_modules/@umijs/plugin-foo/index.js，通常来说，其 id 为 @umijs/plugin-foo，key 为 foo
##### 启用组件的方式
* 通过package.json依赖，Umi 会自动检测 dependencies 和 devDependencies 里的 umi 插件，比如：
```
{
  "dependencies": {
    "@umijs/preset-react": "1"
  }
}
//@umijs/preset-react 会自动被注册，无需在配置里重复声明
```
* 通过配置，可在presets和plugins配置插件，比如：
```
export default {
  presets: ['./preset', 'foo/presets'],
  plugins: ['./plugin'],
}
```
1. 通常用于几种情况：
    * 项目相对路径的插件
    * 非npm包入口文件的插件
2. 注意：不能配置npm包的插件，否则会报重复注册的错误
* 环境变量，通过环境变量UMI\_PRESETS 和 UMI\_PLUGINS 注册额外插件
如
```
$ UMI_PRESETS=/a/b/preset.js umi dev
//注意：在项目中不建议使用，通常是用于给予umi框架二次封装
```
##### 检查插件注册情况
* 通过命令行，umi plugin list 或者是 umi plugin list --key
* 在插件里感知，可通过 api.hasPlugins(pluginId[]) 和 api.hasPresets(pluginId[]) 的方式感知其他插件
##### 禁用插件
* 配置 key 为 false
```
export default {
  mock: false,
}
//会禁用umi内置的mock插件及其功能
```
* 在插件中禁用，通过 api.skipPlugins(pluginId[]) 的方式禁用
#### 环境变量
##### 设置环境变量
* 执行命令时去添加
* 在.env文件中定义，umi中约定根目录下的.env为环境变量配置文件
```
//首先
PORT=3000
BABEL_CACHE=none

//然后执行 umi dev
```
##### 环境变量列表
* APP_ROOT ，指定项目的根目录，需要**注意的是该属性不能配置在.env中**，只能在命令行里添加
* ANALYZE, 用于分析bundle构成，默认关闭
```
$ ANALYZE=1 umi dev
# 或者
$ ANALYZE=1 umi build
```
* ANALYZE_SSR, 对服务端包的大小分析，默认是关闭
* BABEL_CACHE,默认开启babel编译缓存，值为none时禁用缓存
* BABEL_PLOYFILE,默认会根据targets配置打目标浏览器的全部补丁，设置none禁用内置的补丁方案
*  COMPRESS 默认压缩css和js，值为none时，表示不压缩，build时有效
* FORK_TS_CHECKER 默认不开启Typescript类型检查，值为1时启用，如
```
$ FORK_TS_CHECKER=1 umi dev
```
* FRINEDLY_ERROR, 设置nono时禁用，有些场景下friendly-errors-webpack-plugin会把错误给吞了
```
$ FRIENDLY_ERROR=none umi dev
```
* HTTPS,localhost开启
```
$ HTTPS=1 umi dev
同时可以使用配置https：{key: '/path/key.pem', cert: '/path/cert.pem'}自定义证书
```
* HMR，设置none时，禁用代码的热更新
* HTML,设置为none时不输出HTML，umi build有效
* HOST，默认是0.0.0.0
* PORT,指定端口号，默认是8000
* PROGRESS,设为none时禁用进度条，如
```
$ PROGRESS=none umi dev
```
* SOCKET_SERVER
指定用于HMR的socket服务器，如：
```
$ SOCKET_SERVER=https://localhost:7001/ umi dev
```
* SPEED_MEASURE,分析webpack编译时间，支持CONSOLE和JSON两种格式，默认是JSON
```
$ SPEED_MEASURE=CONSOLE umi dev
```
* TERSER_CACHE,默认开启Terser压缩缓存，值为none时禁用缓存
* UMI_ENV，指定不同环境各自的配置文件
* WATCH，设为nono时，不监听文件变更
```
$ WATCH=none umi dev
```
* WATCH_IGNORED，默认不监听node_modules下的文件修改，如果需要，可以通过环境变量进行设置
```
# 整个 node_modules 都监听，会慢点
WATCH_IGNORED=none umi dev

# node_modules 下除 lodash 和 umi 监听，其他忽略
WATCH_IGNORED=node_modules/(?!(lodash|umi)) umi dev
```
* WEBPACK_PROFILE，生成 umi 构建性能分析文件 dist/stats.json，结合 Webpack Xray 或 Webapck Analyse ，WEBPACK_PROFILE 值有 verbose、normal、minimal
* RM_SERVER_FILE，预渲染下，默认会默认删除服务端渲染文件 umi.server.js，如果希望保留，使用 RM_SERVER_FILE=none




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
* base，type：string，设置路由前缀，通常用于部署到非根目录
* chainWebpack,通过webpack-chain的api修改webpack的配置
* nodeModulesTransform,type：object。设置nod_modules目录下依赖文件的编译方式。
    1. 子配置项包含：
        * type，类型，可选all和none
        * exclude，忽略的依赖库，包名，暂不支持绝对路径
    2. 两种编译模式：
        * 默认all，全部编译，可以通过exclude忽略不需要编译的依赖库
        * none，默认值编译es5-imcompatible-version里声明的依赖，可以通过exclude配置添加额外需要编译的
* hash，配置是否让生成的文件包含hash后缀，通常用于增量发布和避免浏览器加载缓存
* target，type：object，default：{ }。配置需要兼容的浏览器最低版本，会自动引入polyfill和做语法转化
* routes，type：Array(route),配置路由。**注意components的值如果是相对路径，会以src/pages为基础路径开始解析，如果配置了routes,则优先使用配置式路由，且约定式路由会不生效**
* devServer，type: object, Default: {},配置开发服务器
    1. 包含的子配置项
    * port，端口号，默认8000
    * host，默认0.0.0.0
    * https，是否启用https server，同时也会开启http/2
    * writeToDisk,生成assets到文件系统
* dynamicImport,type:object,Default: false,是否启用按需加载，即把构建产物进行拆分，在需要饿的时候下载额外的js再执行
* publicPath,type: publicPath,Default: /,配置webpack的publicPath。当打包时，webpack会在静态文件路径添加publicPath的值，当需要修改静态文件地址时，比如CDN部署，把publicPath的值设为CND的值就可以

### 零碎知识点总结：
1. ReturnType,表示返回当前的mapToProps属性
```
type CProps = ConnectDefaultProps & ReturnType<typeof mapToProps>
```
2. 对象的解构赋值,在本项目中所使用到的结构赋值过程，用于去结构到当前需要的类型
```
const mapToProps = ( { common }: ConnectReduxType ) => {
    isLogin: common.isLogin,
    loading: common.loading,
    checkedLogin: common.checkedLogin
}
```
3. Patial(可选)，把接口的所有属性变成可选
```
const BASE_UPLOAD_CONFIG: Partial<UploadProps> = {
  action: '/api/v1/open/upload',
  name: 'file',
  showUploadList: false,
  headers: {
    USER_ACCESS_TOKEN: window.localStorage.getItem('user_token'),
  },
  multiple: true,
}
```
4. Readonly，把接口的属性都变为可选
5. SFC：stateless function components(无状态组件声明)
    * 作用： 避免重复定义children propTypes contextTypes defaults displayName类型
6. Document.queryCommandSupported(value)方法，确定浏览器是否具有支持指定的编辑命令。value的值可以为以下的值
    * backColor,修改文档背景色
    * bold，开启或关闭选中文字或插入点的粗体效果
    * copy，拷贝内容到剪切板
    * cut，剪贴当前选中的文字并复制到剪贴板
    * contentReadOnly, 通过传入一个布尔类型的参数来使得文档内容具有可编辑性
### 量产后台拖拽上传功能实现
* 包含两部分：文件拖拽上传，以及使用表格展示上传文件的信息
1. 文件拖拽上传：使用Upload组件中Drgger组件用于拖拽或者是点击上传文件
    * Dragger组件中，使用{...this.uplaodConfig}去增加文件的配置，
    * uploadConfig中基础配置
        * action：'url',文件上传的地址
        * name: string,文件名称
        * showUploadList: boolean,是否展示上传列表
        * headers: object ,如对象中可以传入用户的token
        * multiple： boolean，是否可以传入多个文件
    * uplaodConfig中的高级配置，onChange方法，形式： onChange(info: 文件类型) => {}
        * info中含有file等内容，file中包含了所要上传的文件、状态等信息，file.status文件上传状态，file.response.data文件返回则是上传文件信息
        * 在这当中设置了fileList去表示文件上传的个数，也方便了其在表格中渲染数据。当上传文件成功时，将这个文件列表更新到当前组件的state中设置的fileList当中
    * 因此在清空文件列表时，只需要重新设置fileList数组中的内容为空即可
    * 文件复制到剪切版
    ```
    export function copyClipboard(text: string, callback?: (resulut: boolean) => void): void {
    let doc: Document = document,
        isSupported: boolean = doc.queryCommandSupported('copy'),
        { isIos, isMobile } = UA,
        uesrCallback = callback ? callback : function() {}

    if (isSupported) {
        let input: HTMLInputElement = doc.createElement('input'),
        styles: Partial<CSSStyleDeclaration> = {
            fontSize: '12pt',
            border: null,
            padding: null,
            margin: null,
            position: 'absolute',
            left: '-9999px',
        }

        input.setAttribute('value', text)
        input.setAttribute('readonly', 'readonly')
        Object.assign(input.style, styles)
        doc.body.appendChild(input)
        // divide useragent
        if (isIos && isMobile) {
        input.setSelectionRange(0, 9999)
        } else {
        input.select()
        }
        doc.execCommand('copy')
        doc.body.removeChild(input)
        return uesrCallback(true)
    }
    uesrCallback(false)
}
    ```
2. 列表渲染部分，通过使用antd的table组件，dataSource数据源为fileList，rowKey表示表格行的取值
