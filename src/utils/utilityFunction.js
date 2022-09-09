export default {
  generateRoute(menu) {
    const route = {
      meta: {},
      children: []
    }
    const {
      url,
      name,
      icon,
      children,
      obj: {
        name: routeName,
        redirect,
        extend2,
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

    if (component) {
      // route.component = resolve => require(['@/' + component.slice(2)], resolve)
      route.component = () => import('@/' + component.slice(2))
    } else {
      route.component = () => import('@/layouts/components/TGRouterView')
    }

    if (icon) {
      route.meta.icon = () => import('@/layouts/components/TGMenu/assets/images/' + icon)
    }

    if (redirect) {
      route.redirect = { name: extend2 }
    }

    if (children?.length) {
      children.forEach(child => {
        route.children.push(this.generateRoute(child))
      })
    }

    return route
  },
  /**
   * 连字符转驼峰
   * 例如：my-profile -> myProfile
   * @param name
   * @returns {*}
   */
  toHump(name) {
    return name.replace(/-(\w)/g, (all, letter) => {
      return letter.toUpperCase()
    })
  },
  /**
   * 驼峰转连字符
   * 例如：myProfile -> my-profile
   * @param field
   * @returns {*}
   */
  toLowerCase(field) {
    return field.replace(/([A-Z])/g, '-$1').toLowerCase()
  },
  /**
   * 图片转base64
   * @param file
   * @returns {Promise<unknown>}
   */
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  },
  /**
   * 首字母大写
   * @param str {string}
   * @returns {string}
   */
  firstLetterToUppercase(str) {
    return str.replace(/^\S/, s => s.toUpperCase())
  },
  /**
   * 下载文件
   * @param {*} blob
   * @param {*} fileName
   */
  downFile(blob, fileName) {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName)
    } else {
      const tmpa = document.createElement('a')

      tmpa.download = fileName
      const urlObj = URL.createObjectURL(blob)

      tmpa.href = urlObj
      tmpa.click() // 模拟点击实现下载
      setTimeout(function() {
        // 延时释放
        URL.revokeObjectURL(urlObj)
      }, 1000)
    }
  }
}
