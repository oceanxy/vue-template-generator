<template>
  <a-layout-header
    class="tg-layout-header"
    :style="showBreadcrumb ? 'height: 118px;' : ''"
  >
    <div
      class="tg-header"
      :class="{ manager: manager }"
    >
      <!--<div-->
      <!--  class="tg-logo"-->
      <!--  @click="goBackHome()"-->
      <!--/>-->
      <a-icon
        :component="logo"
        class="tg-logo"
        @click="goBackHome()"
      />
      <div
        class="tg-login-info"
        v-if="isLogin"
      >
        <a-dropdown class="tg-switch-ent">
          <div>
            <span style="margin-right: 10px">{{ currentName }}</span>
            <a-icon type="down" />
          </div>
          <template v-slot:overlay>
            <a-menu class="header-ent-menu">
              <template v-if="layout === 'client'">
                <a-menu-item
                  v-for="item in companyList"
                  :key="item.id"
                  class="item"
                  :class="[item.id === userInfo.companyId ? 'disable' : null]"
                  @click="switchEnt(item.id)"
                >
                  <span>{{ item.companyName }}</span>
                </a-menu-item>
              </template>
              <template v-else>
                <a-menu-item
                  v-for="item in parkList"
                  :key="item.id"
                  class="item"
                  :class="{ disable: item.id === userInfo.parkId }"
                  :disabled="item.id === userInfo.parkId"
                  @click="switchEnt({ id: item.id, fullName: item.fullName })"
                >
                  <span>{{ item.fullName }}</span>
                </a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-dropdown>
        <a-badge
          class="tg-badge"
          dot
        >
          <a-avatar
            icon="user"
            shape="circle"
            class="tg-avatar"
          />
        </a-badge>
        <a-dropdown class="tg-user-info">
          <a @click="e => e.preventDefault()">
            <div>
              <span class="tg-user-name">{{ userInfo.nickName || userInfo.fullName }}</span>
              <div class="tg-user-tags">
                <a-tag
                  v-if="userInfo.isContract === 1"
                  color="cyan"
                >
                  已签约
                </a-tag>
                <a-tag
                  v-if="userInfo.isOwe === 1"
                  color="red"
                >
                  已欠费
                </a-tag>
              </div>
            </div>
            <a-icon type="caret-down" />
          </a>
          <template #overlay>
            <a-menu class="header-menu">
              <a-menu-item class="tg-menu-user">
                <a-avatar>
                  {{ avatar }}
                </a-avatar>
                <div class="corporate-services">{{ userInfo.nickName || userInfo.fullName }}</div>
                <div>
                  <a-tag
                    v-if="userInfo.isContract === 1"
                    color="cyan"
                  >
                    已签约
                  </a-tag>
                  <a-tag
                    v-if="userInfo.isOwe === 1"
                    color="red"
                  >
                    已欠费
                  </a-tag>
                </div>
              </a-menu-item>
              <!--<a-menu-item class="my-news">-->
              <!--  我的消息-->
              <!--  <a-tag class="news-number">{{ userInfo.messageNum || 0 }}</a-tag>-->
              <!--  <a-icon type="right" />-->
              <!--</a-menu-item>-->
              <a-menu-item @click="handleLogOutClick">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <t-g-breadcrumb v-if="showBreadcrumb" />
  </a-layout-header>
</template>
<script>
import { Avatar, Badge, Dropdown, Icon, Layout, Menu, Tag } from 'ant-design-vue'
import { mapActions, mapGetters } from 'vuex'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'
import utilityFunction from '@/utils/utilityFunction'
import Logo from './images/logo.svg'

export default {
  name: 'TGHeader',
  props: {
    layout: {
      // 'manager' || 'client'
      type: String,
      default: 'client'
    },
    showBreadcrumb: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TGBreadcrumb,
    [Layout.Header.name]: Layout.Header,
    [Badge.name]: Badge,
    [Avatar.name]: Avatar,
    [Icon.name]: Icon,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Dropdown.name]: Dropdown,
    [Tag.name]: Tag
  },
  data() {
    return { logo: Logo }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    ...mapGetters('login', { companyList: 'getCompanyList' }),
    userInfo() {
      return this.getState('userInfo', 'login')
    },
    manager() {
      return this.layout !== 'client'
    },
    isLogin() {
      return !!window.sessionStorage.getItem('token')
    },
    avatar() {
      if (this.userInfo.fullName) {
        return utilityFunction.firstLetterToUppercase(this.userInfo.fullName.substring(0, 1))
      }

      return ''
    },
    // 当前全局控制下拉列表的显示名称
    currentName() {
      if (this.layout !== 'client') {
        return this.userInfo.parkName
      }

      return this.userInfo.companyName
    },
    parkList() {
      return this.getState('parkList', 'login')
    }
  },
  methods: {
    ...mapActions('login', {
      logout: 'logout',
      switchEnt: 'switchEnt'
    }),
    async handleLogOutClick() {
      await this.logout()
    },
    goBackHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">
.tg-layout-header {
  padding: 0;
  background: #ffffff;
  line-height: unset;

  .tg-header {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.manager {
      width: 100%;
      padding: 0 14px;
      background: url(./images/header-bg-left.png) no-repeat left center / auto 100%,
      url(./images/header-bg-right.png) no-repeat right 320px center / auto 100%,
      linear-gradient(to right, #e9f2ff, #d3e5ff);
    }

    .tg-logo {
      width: 256px;
      height: 40px;
      //background: url(./images/logo.svg) no-repeat center / 100% 100%;
      cursor: pointer;
      transition: all 0.3s;

      svg {
        width: 100%;
        height: 100%;
      }

      &:hover {
        transform: rotate3d(-4, 5, -1, -10deg) scale(1.04);
      }
    }

    .tg-login-info {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .tg-switch-ent {
        padding: 0 20px;
        cursor: pointer;
        margin-right: 40px;
      }

      .tg-badge {
        .tg-avatar {
          font-size: 14px;
          background: linear-gradient(to bottom, #007aff, #0066ff);
        }
      }

      .tg-user-info {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        align-items: center;
        color: #434343;

        .tg-user-name {
          font-size: 16px;
          padding-right: 24px;
        }

        .tg-user-tags {
          display: flex;

          .ant-tag {
            padding: 0 4px;
            line-height: 20px;
            border: none;
          }
        }
      }
    }
  }
}

.header-menu {
  min-width: 200px;

  &.ant-dropdown-menu {
    .tg-menu-user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 30px;
      gap: 10px;

      .ant-avatar {
        width: 60px;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(to bottom, #2f9bff, #0078e8);
      }

      .ant-tag {
        border: none;
      }

      .corporate-services {
        font-size: 20px;
        font-weight: 700;
        color: #000000;
        line-height: 40px;
      }
    }

    .my-news {
      display: flex;
      align-items: center;

      .news-number {
        background: #f5222d;
        color: #ffffff;
        border-radius: 10px;
        margin-left: 8px;
      }

      .anticon {
        margin-left: auto;
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }

  .ant-dropdown-menu-item:not(:first-child) {
    line-height: 54px;
    font-size: 15px;
    color: #1f1f1f;
    padding: 0 20px;
  }

  .ant-dropdown-menu-item:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
}

.header-ent-menu {
  .ant-dropdown-menu-item {
    line-height: 54px;
    font-size: 15px;
    color: #1f1f1f;
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .disable {
    color: #cdcaca;
    cursor: default;
  }
}
</style>
