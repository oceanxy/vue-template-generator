/**
 * 总路由器
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-22 周三 18:21:06
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import getBaseRoutes from './routes'
import config from '@/config'
import { message } from 'ant-design-vue'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import { getCookie } from '@/utils/cookie'
import TGRouterView from '@/components/TGRouterView'

const appName = getFirstLetterOfEachWordOfAppName()

const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to, null, () => {/**/})
}

VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to, null, () => {/**/})
}

Vue.use(VueRouter)

/**
 * 根据后台数据生成路由
 * @param {Array} [menus] 用来生成菜单的数据
 * @param {(path:string, target:string) => void} [redirectCallback] - 外部跳转自定义回调，
 * 默认使用以下代码跳转：
 *
 * `window.open(menu.obj.component, '_blank')`
 *
 * @returns {Object[]}
 */
function initializeDynamicRoutes(menus, redirectCallback) {
  return menus?.map(menu => {
    const route = {meta: {}, children: []}
    const {
      name,
      icon,
      children,
      obj: {
        name: routeName,
        menuUrl: url,
        redirect,
        redirectRouteName,
        component,
        keepAlive,
        requiresAuth,
        hideBreadCrumb,
        hideChildren,
        hide
      }
    } = menu

    route.path = url || ''
    route.meta.title = name
    route.meta.keepAlive = !!keepAlive
    route.meta.requiresAuth = !!requiresAuth
    route.meta.hideBreadCrumb = !!hideBreadCrumb
    route.meta.hideChildren = !!hideChildren
    route.meta.hide = !!hide

    if (name) {
      route.name = routeName
    }

    if (!component || component === '@/components/TGRouterView') {
      // route.component = resolve => require.ensure(
      //   [],
      //   () => resolve(require('@/components/TGRouterView')),
      //   'chunk-router-view'
      // )
      route.component = TGRouterView
    } else {
      // 项目内部页面组件跳转
      if (component.includes('@/')) {
        if (component.includes('layouts')) {
          route.component = resolve => require.ensure(
            [],
            () => resolve(require('@/layouts/' + component.slice(10))),
            'chunk-layouts'
          )
        } else if (component.includes('apps')) {
          route.component = resolve => require.ensure(
            [],
            () => resolve(require('@/apps/' + component.slice(7)))
          )
        } else {
          route.component = resolve => require.ensure(
            [],
            () => resolve(require('@/views/' + component.slice(8)))
          )
        }
      }/** 外部链接跳转 */ else {
        route.component = () => {
          let target = '_blank'
          const defaultRoute = localStorage.getItem(`${appName}-defaultRoute`) || config.defaultRouteName

          // 检测系统的默认首页是否是需要通过 window.open 跳转，并且是否是从登录页直接跳转的，
          // 如果以上条件成立，则采用 “_self” 模式，否则采用 “_blank” 模式
          if (router.history.current.name === 'login' && defaultRoute === route.name) {
            target = '_self'
          }

          if (typeof redirectCallback === 'function') {
            redirectCallback(component, target)
          } else {
            window.open(component, target)
          }
        }
      }
    }

    if (icon && /\.(svg|png|jpg|jpeg)$/.test(icon)) {
      route.meta.icon = () => import(`@/assets/images/${icon}`)
    } else {
      route.meta.icon = icon
    }

    if (redirect) {
      route.redirect = {name: redirectRouteName}
    }

    if (children?.length) {
      route.children = initializeDynamicRoutes(children, redirectCallback)
    }

    return route
  }) ?? []
}

/**
 * 从用户信息映射文件选取菜单数据
 * @param menus ｛VueRoute[]｝ - 从用户信息映射来的菜单数据，数据类型为vue-router的路由格式
 * @param routes ｛VueRoute[]｝ - 本项目的路由文件
 * @return {*[]}
 */
function selectDynamicRoutes(menus, routes) {
  if (routes.length) {
    const _routes = []

    routes?.forEach(route => {
      const _menu = menus.find(menu => menu.meta.title === route.meta.title && menu.path?.trim() === route.path)

      if (_menu) {
        if (_menu?.children?.length && route?.children?.length) {
          route.children = selectDynamicRoutes(_menu.children, route.children)
        }

        if (!_menu?.children?.length && route?.children?.length) {
          route.children = []
        }

        if (_menu?.children?.length && !route?.children?.length) {
          console.warn(`未找到ID为${_menu.id}的菜单数据，请确认后台返回的菜单数据与前端路由文件是否匹配！`)
        }

        _routes.push(route)
      }
    })

    return _routes
  } else {
    message.error('未获取到动态菜单数据，请重新登录以完成菜单初始化')
    throw new Error('未获取到动态菜单数据，请重新登录以完成菜单初始化')
  }
}

/**
 * 立即创建一个路由器
 * @param [rootRoute] {Route} 根路由
 * @returns {VueRouter}
 */
function createRouter(rootRoute) {
  return new VueRouter({
    routes: rootRoute || getRoutes(APP_ROUTES.open),
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: config.routeMode === 'history' ? 'history' : 'hash'
  })
}

/**
 * 获取当前项目下所有可用的子项目的路由表
 * @returns {VueRouter.route[]}
 */
/**
 * 获取路由
 * @param {(path:string, target:string) => void} [redirectCallback] - 外部跳转自定义回调，
 * 默认使用以下代码跳转：
 *
 * `window.open(menu.obj.component, '_blank')`
 * @return {VueRouter.Route[]|*}
 */
function getRoutes(redirectCallback) {
  const {NODE_ENV, VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS} = process.env

  if (
    // 本地开发环境跳过权限直接获取本地路由
    (NODE_ENV === 'development' && VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS === 'on') ||
    // 或启用本地路由
    !config.dynamicRouting
  ) {
    return getBaseRoutes(APP_ROUTES.default || [])
  }

  const token = localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)
  const menu = JSON.parse(localStorage.getItem(`${appName}-menu`))

  if (menu && token) {
    if (USER_INFO_MAPPINGS) {
      return getBaseRoutes(selectDynamicRoutes(menu, APP_ROUTES?.default || []))
    }

    return getBaseRoutes(initializeDynamicRoutes(menu, redirectCallback))
  }

  return getBaseRoutes()
}

/**
 * 重置路由
 */
function resetRoutes() {
  const menus = getRoutes(APP_ROUTES.open)

  router.matcher = createRouter(menus).matcher
  router.options.routes = menus
}

// 创建路由器
const router = createRouter()

/**
 * 解决生产环境 chunk 包一定概率会加载失败的问题，
 * 导致该问题的根本原因暂时未知，全网也没有明确的答案，
 * 可能是 webpack 打包的 bug，
 * 也可能是 vue 预加载插件 prefetch 导致的。
 * 如果问题特别严重，可以尝试禁用 vue-cli 内置的插件 prefetch，
 * 也可用结合以下错误监听做一些处理，
 * 总之，目前导致该问题的根本原因未明，
 * 通过监听错误事件基本可以解决该问题。
 */
router.onError(async error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending?.fullPath

  if (isChunkLoadFailed) {
    await router.replace(targetPath)
  }
})

router.beforeEach((to, from, next) => {
  if (to.query.title) {
    to.meta.title = decodeURIComponent(to.query.title)
  }

  let title = to.meta.title || ''

  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  // 从search中获取token
  const searchToken = new URL(window.location.href).searchParams.get(config.tokenConfig.fieldName)
  // 通过地址栏传递 token 的情况，优先使用地址栏的 token。因为本地存储的 token 可能已过期（上一次页面关闭时未清空）
  const token = searchToken || to.query[config.tokenConfig.fieldName]
  // 获取存储在localStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const localToken = localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)
  // 某些第三方不通过地址栏传递 token，而通过 cookie 的方式传递 token
  const cookieToken = getCookie(config.tokenConfig.fieldName)

  if (
    to.meta.requiresAuth &&
    // 生产环境开启跳过权限验证
    !(
      process.env.NODE_ENV === 'development' &&
      process.env.VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS === 'on'
    )
  ) {
    if (
      !localToken ||
      // 如果地址栏带了 token，且与本地存储的 token 不一致，强制重定向到登录页鉴权
      (token && token !== localToken) ||
      // 处理某些第三方不通过地址栏传递 token，而通过 cookie 的方式传递 token 的情况
      (cookieToken && cookieToken !== localToken)
    ) {
      next({
        ...to,
        name: 'login',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }

    // 如果地址栏带了 token，且新旧 token 一致，则删除地址栏中的 token，路由正常跳转
    if (token === localToken) {
      // 如果 search 中存在 token，则删除之
      if (searchToken) {
        window.history.replaceState(null, null, window.location.pathname)
      }

      // 如果 hash 中存在 token，则删除之
      next({
        ...to,
        query: {
          ...to.query,
          [config.tokenConfig.fieldName]: undefined
        }
      })
    }

    next()
  } else {
    if (to.name === 'login' && localToken) {
      if (
        // 地址栏传递了新 token，以新 token 为准
        (token && token === localToken) ||
        // 处理某些第三方不通过地址栏传递 token，而通过 cookie 的方式传递 token 的情况
        (cookieToken && cookieToken === localToken)
      ) {
        if (searchToken) {
          window.history.replaceState(null, null, window.location.pathname)
        }

        if (to.query.redirect) {
          next({
            ...to,
            path: to.query.redirect,
            query: {
              ...to.query,
              redirect: undefined,
              [config.tokenConfig.fieldName]: undefined
            }
          })
        } else {
          next({
            ...to,
            name: 'home',
            query: {
              ...to.query,
              redirect: undefined,
              [config.tokenConfig.fieldName]: undefined
            }
          })
        }
      }
    }

    next()
  }
})

router.resetRoutes = resetRoutes

export { resetRoutes }

export default router
