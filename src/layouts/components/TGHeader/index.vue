<template>
  <a-layout-header
    class="tg-layout-header"
    :style="showBreadcrumb ? 'height: 118px;' : ''"
  >
    <div class="tg-header" :class="{'manager': manager}">
      <div class="tg-logo" />
      <a-badge class="tg-badge" dot>
        <a-avatar icon="user" shape="circle" class="tg-avatar" />
      </a-badge>
      <a-dropdown class="tg-user-info">
        <a @click="e => e.preventDefault()">
          <div>
            <span class="tg-user-name">{{ userInfo.fullName }}</span>
            <div class="tg-user-tags">
              <a-tag color="blue">已入驻</a-tag>
              <a-tag color="cyan">已签约</a-tag>
              <a-tag color="red">已欠费</a-tag>
            </div>
          </div>
          <a-icon type="caret-down" />
        </a>
        <template #overlay>
          <a-menu class="header-menu">
            <a-menu-item class="tg-menu-user">
              <a-avatar>重</a-avatar>
              <div class="corporate-services">重庆誉存科技有限公司</div>
              <div>
                <a-tag color="blue">已入驻</a-tag>
                <a-tag color="cyan">已签约</a-tag>
                <a-tag color="red">已欠费</a-tag>
              </div>
            </a-menu-item>
            <a-menu-item class="my-news">
              我的消息
              <a-tag class="news-number">99+</a-tag>
              <a-icon type="right" />
            </a-menu-item>
            <a-menu-item>
              <span @click="handleLogOutClick">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <t-g-breadcrumb v-if="showBreadcrumb" />
  </a-layout-header>
</template>

<script>
import { Avatar, Badge, Dropdown, Layout, Menu, Tag } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

const { mapState, mapActions } = createNamespacedHelpers('login')

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
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Dropdown.name]: Dropdown,
    [Tag.name]: Tag
  },
  computed: {
    ...mapState({ userInfo: 'userInfo' }),
    manager() {
      return this.layout !== 'client'
    }
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
    handleLogOutClick() {
      this.logout()
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
    justify-content: center;

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
      background: url(./images/logo.png) no-repeat center / 100% 100%;
    }

    .tg-badge {
      margin-left: auto;

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

.header-menu {
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
        font-family: PingFang SC, serif;
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
    font-family: PingFang SC, serif;
    color: #1f1f1f;
    padding: 0 20px;
  }

  .ant-dropdown-menu-item:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
}
</style>
