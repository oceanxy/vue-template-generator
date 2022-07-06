/**
 * 分页混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:32:23
 */

export default {
  inject: ['moduleName'],
  data() {
    return {
      paginationProps: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
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
  created() {
    this.$watch(
      () => {
        if (this.submoduleName) {
          return this.$store.state[this.moduleName][this.submoduleName].pagination
        } else {
          return this.$store.state[this.moduleName].pagination
        }
      },
      pagination => {
        this.paginationProps.currentPage = pagination.pageIndex + 1
        this.paginationProps.total = pagination.total
        this.paginationProps.pageSize = pagination.pageSize
      })
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
