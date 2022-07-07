/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: store helper
 * @Date: 2022-03-10 周四 17:56:58
 */

/**
 * 在模块内触发全局 mutation 的封装
 * @param moduleName {string} 需要修改状态的模块名称
 * @param commit {Function} [moduleName]模块的commit (Vuex.commit)
 * @param mutation {string} Mutation
 * @param payload {*} 触发mutation的值
 */
export function commitRootInModule(moduleName, commit, mutation, payload) {
  commit(mutation, { value: payload, moduleName }, { root: true })
}

/**
 * 封装的全局dispatch
 * 直接在组件内调用自身对应的store module
 * @param moduleName
 * @param action
 * @param [payload]
 * @returns {Promise<any>}
 */
export async function dispatch(moduleName, action, payload) {
  let store

  if (process.env.VUE_APP_PROJECT === 'development-client' || process.env.VUE_APP_PROJECT === 'production-client') {
    store = await import('../store/client')
  } else {
    store = await import('../store/manager')
  }

  return await store.default.dispatch(`${moduleName}/${action}`, payload)
}
/**
 * @description: 返回store模块状态
 * @param {*} keys
 * @param {*} submoduleName 子模块名称
 * @return {object}
 */
export const mapState = (keys, submoduleName) => {
  const result = keys.reduce((modules, item) => {
    modules[item] = function () {
      const moduleNameData = this.$store.state[this.moduleName]
      if (submoduleName) {
        return moduleNameData[submoduleName][item]
      } else {
        return moduleNameData[item]
      }
    }
    return modules
  }, {})
  return result
}
/**
 * @description: 返回store方法
 * @param {Array} actions [string]
 * @return {object} { [key]:function(payload,submoduleName) }
 */
export const mapAction = actions => {
  const result = actions.reduce((modules, item) => {
    modules[item] = function (payload, submoduleName) {
      if (submoduleName) {
        return this.$store.dispatch(`${this.moduleName}/${submoduleName}/${item}`, payload)
      } else {
        return this.$store.dispatch(`${this.moduleName}/${item}`, payload)
      }
    }
    return modules
  }, {})
  return result
}
