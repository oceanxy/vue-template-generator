<template>
  <a-layout-header
    class="tg-layout-header"
    :style="showBreadcrumb ? 'height: 118px;' : ''"
  >
    <div class="tg-header">
      <a-icon
        type="user"
        class="tg-logo"
        @click="handleClick"
      />
      <span class="tg-title">{{ title }}</span>

      <a-badge class="tg-badge" dot>
        <a-avatar icon="user" shape="square" />
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
          <a-icon type="down" />
        </a>
        <template #overlay>
          <a-menu>
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
import config from '@/config'
import { Avatar, Badge, Dropdown, Layout, Menu, Tag } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

const { mapState, mapActions } = createNamespacedHelpers('login')

export default {
  name: 'TGHeader',
  model: {
    event: 'change',
    prop: 'collapsed'
  },
  props: {
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
  computed: mapState({ userInfo: 'userInfo' }),
  data: () => ({
    innerCollapsed: false,
    title: config.systemName
  }),
  watch: {
    collapsed(value) {
      this.innerCollapsed = value
    }
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
    handleClick() {
      this.innerCollapsed = !this.innerCollapsed
      this.$emit('update:collapsed', this.innerCollapsed)
    },
    handleLogOutClick() {
      this.logout()
    }
  }
}
</script>

<style lang="scss">
.tg-layout-header {
  padding: 0;
  background: #0f2135;
  line-height: unset;

  .tg-header {
    display: flex;
    align-items: center;

    .tg-logo {
      background: #ffffff;
      padding: 20px;
      border-radius: 32px;
      margin: 0 20px 0 40px;
    }

    .tg-title {
      font-size: 18px;
      font-family: PingFang SC, serif;
      font-weight: 700;
      color: #ffffff;
      line-height: 64px;
    }

    .tg-badge {
      margin-left: auto;
    }

    .tg-divider {
      margin: 0 12px;
    }

    .tg-user-info {
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      align-items: center;

      .tg-user-name {
        font-size: 16px;
        font-family: PingFang SC, serif;
        color: #ffffff;
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

  .corporate-services {
    font-size: 15px;
    font-family: PingFang SC, serif;
    font-weight: 500;
    color: #1f1f1f;
    line-height: 22px;
  }

  .ant-tag {
    border: none;
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
</style>
