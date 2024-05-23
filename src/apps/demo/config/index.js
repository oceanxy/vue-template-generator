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
