module.exports = {
  /** 请不要提交此两行代码（推荐使用 .gitattributes 忽略此两行的更改）**/
  account: 'admin', // 开发环境默认本地登录账号
  password: '123456', // 开发环境默认本地登录密码
  /************************************************************/

  // 前端端口地址
  port: '8081',
  // 是否自动在浏览器中打开系统
  open: false,
  // 接口代理
  proxy: {
    '/api': {
      // 接口代理地址
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false
    }
  }
}
