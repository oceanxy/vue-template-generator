/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 分页
 * @Date: 2022-03-10 周四 16:32:23
 */

export default {
  inject: ['moduleName'],
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      on: {
        change: this.onPaginationChange,
        showSizeChange: this.onSizeChange
      }
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].pagination,
      pagination => {
        this.currentPage = pagination.pageIndex + 1
        this.total = pagination.total
        this.pageSize = pagination.pageSize
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
        additionalQueryParameters: {
          pageIndex: 0,
          pageSize: size
        }
      })
    }
  }
}
