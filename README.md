# vue-template-generator

## Project setup

```
npm run install
yarn install
```

## 运行和打包

### Compiles and hot-reloads for development

```
yarn dev-?
npm run dev-?
```

- dev-? 中的“?”为要启动项目的简称，一般为 src/apps 目录下的文件夹名称的每个单词首字母的组合
- 具体命令见 package.json，详情可阅读 build/index.js 的注释

### Compiles and minifies for production

```
yarn build --app-proj [appName] --app-env [appEnv]
npm run build -- --app-proj [appName] --app-env [appEnv]
```

- 注意使用npm命令时“--”不能省，否则打包会失败
- appName 为 src/apps 目录下的文件夹名称
- appEnv 为生产环境的部署环境，默认“production”
- 更多信息可阅读 build/index.js 的注释

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 结构

- mock：模拟数据
- build：编译/打包/资源预加载等相关webpack工程代码
  - env.production.plugin.js 生产环境变量插件
  - zip.js 生产环境打包后自动压缩打包文件
  - webpackConfigs：根据环境生成对应的webpack配置
  - 处理 CLI 命令
- public：编译打包静态资源
- src
  - apis：API定义
  - apps：存放子项目的目录
  - assets：静态资源（如图片、视频、第三方库等）
    - fonts：内置的字体
    - images：全局图片资源
    - styles：通用全局样式
      - theme.scss 主题样式及颜色定义
  - components：通用组件（自定义组件、高阶组件等）
  - config：全局配置
  - extend：扩展
  - mixins：混合
  - layouts：布局组件
  - router：路由
  - store：vuex 全局状态
  - utils：工具包（工具函数、高阶函数、混合、注入等辅助型功能）
    - antvComponents：ant design vue 常用全局组件按需注册，非常用的组件请在需要用到时按需引入
    - cookie：cookie简易封装
    - detectZoom：windows系统屏幕缩放调整
    - env：环境变量相关方法封装
    - message：全局消息相关方法封装
    - request：axios简易封装，HTTP请求等相关功能
    - store：vuex相关功能封装
    - useOss：阿里云OSS相关功能封装
    - utilityFunction：全局公用函数
    - validators：全局表单验证函数封装
  - views：页面及其附属组件
  - App.jsx：Vue入口组件
  - main.js：项目入口

## 主要功能介绍

### JSX

1. 支持**JSX**，基于**vue 2.x**

### UI组件及样式

1. 为**Vue**引入优秀的**ant design**设计
2. 同时支持**sass**、**less**预编译

### 多端/多布局

1. 多端适配，灵活配置布局文件

### 脱离后端

1. **mockjs**支撑，开发模式下无需后端服务即可调试项目
2. 开发模式下自动绕开前端权限验证模块
3. mock接口**支持传参**，并可在控制台打印**request**和**response**

### 自动化模块

1. **/mock**、**/src/apis**、**/src/store**下的模块自动引入，无需**import**
2. 所有**API**自动注入**axios**，无需**import**

### 持久化

1. 刷新不丢失全局状态
2. 刷新不丢失菜单选中状态和打开状态
3. 刷新不丢失路由

### 无感化

1. **面包屑**：动态路由监听，自动生成页面的面包屑，只需在需要的页面引入面包屑组件即可
2. **菜单**：结合路由及权限验证模块，自动生成菜单，并注入选中状态和打开状态
3. **菜单折叠**：自动根据路由打开已激活菜单，自动折叠未激活菜单
4. **变更浏览器地址**：菜单自动导向到新页面，并自动展开到页面所在层级

### 按需引入

按需引入**ant design vue**组件

### 更多功能加入中...

### 本项目开发过程中遇到的挑战点

#### 在父组件中获取子孙组件（不限层级）的方法。

除了递归遍历，例如`this.$children.xxx.$children.$refs[xxx]`的形式，可以借鉴`React`的`ref`，采用`callback`的形式。

结合`vue`的`provided`和`inject`实现。具体例子见 */src/components/TGContainerWithSider* 组件与 */src/mixins/forTable* 的交互。

## 使用模板快速创建一个无后台服务的新项目步骤：

### 在模板工程目录src/apps下新建项目目录：demo-project

  ```shell
  cd ~/vue-template-generator/src/apps
  mkdir "demo-project"
  ```

### 创建入口文件：App.jsx。默认代码结构如下：

  ```jsx
  import forApp from '@/mixins/forApp'

export default {
  name: 'DemoProjectApp',
  mixins: [forApp]
}

  ```

### 创建项目配置文件：config/index.js。必要配置项如下：

  ```js
  module.exports = {
    // 所属项目组名称
    appPrefix: 'demo',
    // 项目前期一般没有后台服务（接口）的支持，所以可以开启该模式，以模拟数据。
    mock: true,
    // 项目名称
    systemName: '演示项目',
    // 默认跳转的页面路由名称（route.name）
    defaultRouteName: 'console',

    // 以下配置为非必须的，具体见：src/config 注释
    header: {
      buttons: {
        theme: {
          availableThemes: [
            { name: '科技蓝', fileName: 'tech-blue' },
            { name: '党政红', fileName: 'party-red' }
          ]
        }
      }
    },
    enableTabPage: true,
    hideBreadCrumb: true,
    enableLoginVerification: false,
    activeSuffixForMenuIcon: '{themeName}-active'
  }
  ```

### 创建项目本地服务文件：config/devServer.js。代码如下：

  ```js
  module.exports = {
    // 开发环境默认本地登录账号
    account: 'tgadmin',
    // 开发环境默认本地登录密码
    password: '123456',
    // 前端端口地址
    // 是否自动在浏览器中打开系统
    open: false,
    // 接口代理
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
  ```

### 在工程根目录创建存放页面组件的文件夹：views

### 在views中创建控制台（首页）页面文件：views/Console/index.jsx。代码如下:

  ```js
  export default {
    name: 'Console',
    render() {
      return (
        <div
          style={{
            lineHeight: '100px',
            textAlign: 'center',
            fontSize: '1.3rem'
          }}
        >
          控制台
        </div>
      )
    }
  }
  ```

### 在工程根目录创建项目路由配置文件：router/routes.js。基础代码如下：

  ```js
  export default [{
    path: 'console',
      name: 'console',
      component: resolve => require.ensure(
        [],
          () => resolve(require('@/apps/demo-project/views/Console')),
          'chunk-console'
      ),
      meta: {
          title: '控制台',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-sjkb'
      }
  }]
  ```

### 启动项目

进入到工程根目录启动命令行工具，输入以下命令即可：

  ```shell
  cd ~/vue-template-generator
  vue-cli-service serve --app-proj demo-project
  ```

> 该功能后续会加入到 CLI 命令中自动化生成，届时只需输入一条命令即可创建全新的子项目，敬请期待~~<br>
> vue-template-generator 正在向着智能、便捷、快速等方向发展...
