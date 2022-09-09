/**
 * 分页混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:32:23
 */

import { mapGetters } from 'vuex'

export default {
  inject: {
    moduleName: { default: undefined },
    submoduleName: { default: undefined }
  },
  data() {
    return {
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },
      paginationOn: {
        change: this.onPaginationChange,
        showSizeChange: this.onSizeChange
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    pagination() {
      let pagination = this.getState('pagination', this.moduleName, this.submoduleName)

      pagination = {
        ...pagination,
        current: pagination.pageIndex + 1
      }

      return pagination
    }
  },
  methods: {
    /**
     * 翻页触发
     * @param page {number}
     * @param pageSize {number}
     */
    async onPaginationChange(page, pageSize) {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: {
          pageIndex: page - 1,
          pageSize
        }
      })
    },
    /**
     * 每页显示条数改变后触发
     * @param currentPage {number}
     * @param size {number}
     */
    async onSizeChange(currentPage, size) {
      // 改变每页显示条数后，回到第一页
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: {
          pageIndex: 0,
          pageSize: size
        }
      })
    }
  }
}
