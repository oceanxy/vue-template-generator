module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  runtimeCompiler: true,
  devServer: {
    port: '8090',
    open: false,
    proxy: {
      '/api': {
        target: 'http://10.100.1.60:35920',
        changeOrigin: true,
        secure: false
      },
      '/mgapi': {
        target: 'http://10.100.1.94:46300',
        changeOrigin: true,
        secure: false
      }
    }
  },
  css: {
    // css样式与html代码分离
    requireModuleExtension: true,
    loaderOptions: {
      // 引入sass全局变量文件
      sass: {
        sassOptions: {
          prependData: '@import "@/assets/styles/theme.scss"'
        }
      },
      // 启用内联JavaScript。ant-design-vue使用less编写，且使用了内联写法，所以需要开启
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV !== 'production'
}
