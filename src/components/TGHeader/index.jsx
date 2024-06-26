import './index.scss'
// eslint-disable-next-line max-len
import { Avatar, Badge, Button, Divider, Dropdown, Icon, Layout, Menu, Popover, Select, Space, Spin, Tag } from 'ant-design-vue'
import Logo from '@/components/Logo'
import { mapActions, mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'
import { getFirstLetterOfEachWordOfAppName, showAppLoading } from '@/utils/utilityFunction'
import moment from 'moment'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

export default {
  name: 'TGHeader',
  mixins: [forIndex],
  props: {
    page: {
      // 'normal' || 'not-found'
      type: String,
      default: 'normal'
    }
  },
  data: () => ({ activeKey: 1 }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    show() {
      return this.getState('showMenu', 'common')
    },
    loading() {
      return this.getState('loading', 'login')
    },
    userInfo() {
      return this.getState('userInfo', 'login')
    },
    lastLoginTime() {
      return this.getState('lastLoginTime', 'login')
    },
    lastLoginToken() {
      return this.getState('lastLoginToken', 'login')
    },
    isLogin() {
      return !!window.localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)
    },
    news() {
      return this.getState('news', 'common')
    },
    organListForHeader() {
      return this.getState('organListForHeader', 'common')
    },
    headerId: {
      get() {
        return this.getState('headerId', 'common') || localStorage.getItem(`${appName}-headerId`)
      },
      set(value) {
        localStorage.setItem(`${appName}-headerId`, value)
        this.$store.commit('setState', {
          value,
          moduleName: 'common',
          stateName: 'headerId'
        })
      }
    },
    avatarForLetter() {
      const name = this.userInfo.nickName || this.userInfo.fullName

      return name ? name.at(-1).toUpperCase() : ''
    },
    theme() {
      return (
        localStorage.getItem(`${appName}-theme`) ||
        this.$store.state?.login?.userInfo?.themeFileName ||
        this.$config.header?.buttons?.theme.default
      )
    }
  },
  provide: { moduleName: 'login' },
  watch: {
    userInfo: {
      immediate: true,
      async handler(value) {
        if (!this.loading) {
          const token = localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)
          const loginTimeDiff = moment().diff(moment(this.lastLoginTime), 'seconds')
          const {
            NODE_ENV,
            VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS
          } = process.env.NODE_ENV !== 'production'

          if (
            (
              // 验证token是否存在
              token ||
              // 验证开发环境是否开启跳过权限
              (NODE_ENV === 'development' && VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS === 'on')
            ) &&
            (
              token !== this.lastLoginToken || // 兼容第三方携带token登录的方式
              loginTimeDiff >= 3600 || // 与上一次登录时间间隔大于1小时之后刷新一下用户信息
              !Object.keys(value).length
            )
          ) {
            await this.getUserInfo({ token })
          }
        }
      }
    },
    headerId() {
      if (document.querySelector('#tg-responsive-layout')) {
        document.querySelector('#tg-responsive-layout').style.display = 'none'
      }

      window.location.reload()
    }
  },
  async created() {
    if (this.$config.header.buttons.news?.show) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'common',
        stateName: 'news',
        customApiName: 'getNews'
      })
    }

    if (this.$config.header?.params?.show && !this.organListForHeader.list.length) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'common',
        stateName: 'organListForHeader',
        customApiName: 'getSitesOfStaff'
      })
    }
  },
  methods: {
    ...mapActions('login', { logout: 'logout', getUserInfo: 'getUserInfo' }),
    async resetPwd() {
      await this._setVisibilityOfModal(
        '',
        'visibilityOfResetPwd',
        null,
        `${getFirstLetterOfEachWordOfAppName()}/common`
      )
    },
    async onLogOut() {
      const response = await this.logout()

      if (response.status) {
        await this.$router.replace({
          name: 'login',
          // 提供给子项目的登录页面处理注销后的逻辑
          params: { logout: '1' }
        })
      }
    },
    onMenuFold() {
      this.$store.commit('setState', {
        value: !this.collapsed,
        moduleName: 'common',
        stateName: 'collapsed'
      })
    },
    onChange(activeKey) {
      this.activeKey = activeKey
    },
    async onClick({ id, targetAddress }) {
      if (targetAddress) {
        const split = targetAddress.split('?')
        const path = this.$router.resolve({ name: split[0] }).href
        const paramArr = split[1].split('&')

        const query = paramArr.reduce((params, str) => {
          const p = str.split('=')

          return { ...params, [p[0]]: p[1] }
        }, {})

        await this.$store.dispatch('custom', {
          payload: { ids: id },
          customApiName: 'setMessageToRead'
        })

        await this.$router.push({ path, query })
      }
    },
    async switchThemes(themeFileName) {
      await showAppLoading(false, async () => {
        await this.$store.dispatch('custom', {
          customApiName: 'setThemeFileName',
          payload: { themeFileName }
        })

        this.$store.commit('setState', {
          stateName: 'userInfo',
          value: { themeFileName },
          moduleName: 'login',
          merge: true
        })

        localStorage.setItem(`${appName}-theme`, themeFileName)

        return Promise.resolve()
      })

      // 采用注释的方式会到导致某些已经渲染的组件无法更新主题色
      // if (process.env.NODE_ENV === 'production') {
      //   fetchProdEnvTheme()
      // }
      // 所以采用重新载入的方式刷新主题
      window.location.reload()
    },
    toLogin() {
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.path }
      })
    }
  },
  render() {
    return (
      <Layout.Header class={'tg-layout-header'}>
        <Logo />
        <Space class={'tg-layout-header-content'}>
          {
            this.page === 'normal' && this.show
              ? (
                <IconFont
                  type={'icon-global-sq'}
                  class={`tg-layout-header-menu-btn menu-btn-fold${this.collapsed ? ' reverse' : ''}`}
                  onClick={this.onMenuFold}
                  title={!this.collapsed ? '折叠菜单' : '展开菜单'}
                />
              )
              : null
          }
          {/* <div class={'tg-layout-header-search'}> */}
          {/*   <Input placeholder={'搜功能'} class={'search-input'}> */}
          {/*     <IconFont type={'icon-global-search'} slot={'addonAfter'} /> */}
          {/*   </Input> */}
          {/* </div> */}
          <div class={'tg-header-info'}>
            {
              this.isLogin
                ? [
                  this.$config.header?.params?.show
                    ? [
                      <Select
                        vModel={this.headerId}
                        placeholder={this.$config.header?.params?.placeholder ?? '请选择'}
                        class={'tg-header-params'}
                        suffixIcon={<IconFont type={'icon-global-down'} />}
                      >
                        {
                          this.organListForHeader.list.map(item => (
                            <Select.Option value={item.id}>{item.organName}</Select.Option>
                          ))
                        }
                      </Select>,
                      <Divider type={'vertical'} class={'tg-header-divider'} />
                    ]
                    : null,
                  <Dropdown overlayClassName={'tg-header-user-overlay'}>
                    <Spin
                      spinning={this.loading}
                      class={`tg-header-user-content${this.loading ? ' blur' : ''}`}
                    >
                      <Avatar class={'tg-avatar'} shape={'circle'}>
                        {this.avatarForLetter}
                      </Avatar>
                      <div class={'tg-user-info'}>
                        <div class={'tg-header-username'}>
                          {this.userInfo.nickName || this.userInfo.fullName || '暂无用户名'}
                        </div>
                        <div class={'tg-header-tel'}>
                          {this.userInfo.loginName}
                        </div>
                      </div>
                      <IconFont type={'icon-global-down'} style={'color: #ffffff'} />
                    </Spin>
                    {
                      this.loading
                        ? null
                        : (
                          <Menu slot={'overlay'}>
                            {
                              this.$config.header?.buttons?.resetPwd?.show
                                ? (
                                  <Menu.Item onClick={this.resetPwd}>
                                    {this.$config.header?.buttons?.resetPwd?.text}
                                  </Menu.Item>
                                )
                                : null
                            }
                            {
                              this.$config.header?.buttons?.logout?.show
                                ? (
                                  <Menu.Item onClick={this.onLogOut}>
                                    {this.$config.header?.buttons?.logout?.text}
                                  </Menu.Item>
                                )
                                : null
                            }
                          </Menu>
                        )
                    }
                  </Dropdown>,
                  <Divider type={'vertical'} class={'tg-header-divider'} />,
                  this.$config.header.buttons.news?.show
                    ? (
                      <Popover overlayClassName={'tg-header-news-overlay'}>
                        <Badge
                          count={this.news.total}
                          offset={[-12, 4]}
                          numberStyle={{
                            width: '18px',
                            height: '18px',
                            fontSize: '12px',
                            lineHeight: '18px',
                            padding: '0'
                          }}
                        >
                          <Button
                            title={this.$config.header.buttons.news?.text}
                            shape="circle"
                            type={'link'}
                            class={'tg-header-icon'}
                          >
                            <IconFont type={'icon-global-tz'} />
                          </Button>
                        </Badge>
                        <Menu slot={'content'} class={'tg-header-news'}>
                          {
                            this.news.userRefundMessageList.map(item => (
                              <Menu.Item onClick={() => this.onClick(item)}>
                                <div>
                                  <Tag>{item.messageTypeStr}</Tag>
                                  {item.noticeTitle}
                                </div>
                                <div>{item.createTimeStr}</div>
                              </Menu.Item>
                            ))
                          }
                        </Menu>
                      </Popover>
                    )
                    : null,
                  this.$config.header?.buttons?.theme?.show
                    ? (
                      <Dropdown
                        class={'tg-header-themes'}
                        overlayClassName={'tg-header-themes-overlay'}
                      >
                        <Button
                          title={this.$config.header?.buttons?.theme?.text}
                          shape="circle"
                          type={'link'}
                          class={'tg-header-icon'}
                        >
                          <IconFont type={'icon-global-hf'} />
                        </Button>
                        <Menu slot={'overlay'}>
                          {
                            this.$config.header?.buttons?.theme?.availableThemes.map(item => (
                              <Menu.Item
                                disabled={this.theme === item.fileName}
                                onClick={() => this.switchThemes(item.fileName)}
                              >
                                {item.name}
                              </Menu.Item>
                            ))
                          }
                        </Menu>
                      </Dropdown>
                    )
                    : null,
                  this.$config.header?.buttons?.guide?.show
                    ? (
                      <Button
                        title={this.$config.header?.buttons?.guide?.text}
                        shape="circle"
                        type={'link'}
                        class={'tg-header-icon'}
                        onClick={() => {/**/}}
                      >
                        <IconFont type={'icon-global-help'} />
                      </Button>
                    )
                    : null,
                  this.$config.header.buttons.extraButtons?.map(button => (
                    <Button
                      shape="circle"
                      type={'link'}
                      title={button.text}
                      class={'tg-header-icon'}
                      onClick={e => {EVENT_MAPPINGS?.[button.event]?.call(this, e)}}
                    >
                      {
                        button.iconType === 'antd'
                          ? <Icon style={{ fontSize: '0.84em' }} type={button.icon} />
                          : <IconFont type={button.icon} />
                      }
                    </Button>
                  ))
                ]
                : (
                  <Dropdown
                    class={'tg-header-user'}
                    overlayClassName={'tg-header-user-overlay'}
                  >
                    <Spin
                      spinning={this.loading}
                      class={`tg-header-user-content${this.loading ? ' blur' : ''}`}
                    >
                      <Avatar class={'tg-avatar'} shape={'circle'}>
                        <Icon type={'user'} />
                      </Avatar>
                      <div class={'tg-user-info'}>
                        <Button
                          type={'link'}
                          class={'tg-header-username'}
                          onClick={this.toLogin}
                        >
                          去登录
                        </Button>
                      </div>
                    </Spin>
                  </Dropdown>
                )
            }
          </div>
        </Space>
      </Layout.Header>
    )
  }
}
