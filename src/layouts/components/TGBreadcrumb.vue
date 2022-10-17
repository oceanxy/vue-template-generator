<template>
  <a-breadcrumb
    :routes="matchedRoute"
    class="tg-breadcrumb"
    separator=">"
  >
    <template #itemRender="{route, routes}">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ handleBreadcrumbName(route) }}
      </span>
      <router-link
        v-else
        :to="route.path || '/'"
      >
        {{ handleBreadcrumbName(route) }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'

export default {
  name: 'TGBreadcrumb',
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  },
  computed: {
    matchedRoute() {
      const matchedRoute = [...this.$route.matched]

      // 处理进入首页时面包屑显示为“首页 / 首页”的情况
      // 如果 “/” 下的子路由不包含空路由，则不需要此处理
      if (matchedRoute[1].path === '/') {
        matchedRoute.pop()
      }

      // 处理面包屑出现最后两级重名的情况
      // 主要出现在父级菜单设置“hideChildren: true”，不在左侧菜单展示子级，同时子级路由的path字段为空字符串的情况
      const pathOfLastRoute = matchedRoute[matchedRoute.length - 1].path

      if (pathOfLastRoute.substring(pathOfLastRoute.length - 1) === '/') {
        matchedRoute.pop()
      }

      return matchedRoute
    }
  },
  methods: {
    handleBreadcrumbName(route) {
      return route?.meta?.title ?? route.name
    }
  }
}
</script>

<style lang="scss">
.tg-breadcrumb {
  padding: 16px 20px;
}
</style>
