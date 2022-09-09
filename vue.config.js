module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  runtimeCompiler: true,
  devServer: {
    port: '8190',
    open: false,
    proxy: {
      '/mgapi': {
        target: 'http://10.100.1.94:47910',
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: 'http://10.100.1.94:47930',
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
      sass: { sassOptions: { prependData: '@import "@/assets/styles/theme.scss"' } },
      // 启用内联JavaScript。ant-design-vue使用less编写，且使用了内联写法，所以需要开启
      less: { lessOptions: { javascriptEnabled: true } }
    }
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.warnings = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].terserOptions.compress.drop_console = true

        return args
      })
    }
  }
}
