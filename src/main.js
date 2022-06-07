import Vue from 'vue'
import App from './App'
import config from './config'
// 引入特定组件
import '@/utils/antvComponents'

Vue.config.productionTip = false

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

function creatVue(r, s) {
  new Vue({
    router: r.default,
    store: s.default,
    render: h => h(App)
  }).$mount('#app')
}

async function creatApp() {
  if (process.env.VUE_APP_PROJECT === 'development-client') {
    creatVue(await import('./router/client'), await import('./store/client'))
  } else {
    creatVue(await import('./router/manager'), await import('./store/manager'))
  }
}

creatApp()
