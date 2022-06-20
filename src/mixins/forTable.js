/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格
 * @Date: 2022-03-14 周一 16:08:37
 */

import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'
import { message, Modal } from 'ant-design-vue'
import forComponent from '@/mixins/forComponent'

export default {
  mixins: [forComponent],
  inject: ['moduleName'],
  data() {
    return {
      tableProps: {
        columns: [],
        rowSelection: {
          selections: true,
          // fixed: true,
          columnWidth: 50,
          onChange: this.onRowSelectionChange
        },
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'small'
      }
    }
  },
  computed: {
    ...mapGetters({ getLoading: 'getLoading' })
  },
  async created() {
    // 为 list 创建动态侦听器
    this.$watch(
      () => this.$store.state[this.moduleName].list,
      async list => {
        this.tableProps.dataSource = list

        this.resize()
      }
    )

    await this.fetchList()
  },
  mounted() {
    window.addEventListener('resize', this.resize)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize)
    })
  },
  methods: {
    async fetchList() {
      await this.$store.dispatch('getList', {
        api: 'getSiteApps',
        moduleName: this.moduleName
      })
    },
    async onStatusChange(checked, record) {
      const status = await dispatch(this.moduleName, 'updateStatus', {
        id: record.id,
        status: checked ? 1 : 2
      })

      const index = this.tableProps.dataSource.findIndex(item => item.id === record.id)

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 的状态已更新！'
        ])

        // 更新当前行受控Switch组件的值
        this.$set(this.tableProps.dataSource[index], 'status', checked ? 1 : 2)
      } else {
        // 调用接口失败时，还原值
        this.$set(this.tableProps.dataSource[index], 'status', checked ? 2 : 1)
      }
    },
    async onAddClick(record) {
      await this._setVisibleOfModal({ parentId: record.id })
    },
    async onEditClick(record) {
      await this._setVisibleOfModal(record)
    },
    onDeleteClick(record) {
      Modal.confirm({
        title: '确认',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async close => {
          const status = await dispatch(this.moduleName, 'delete', [record.id])

          if (status) {
            message.success([
              <span style={{ color: 'blue' }}>{record.appName}</span>,
              ' 已成功删除！'
            ])
          }

          close()
        }
      })
    },
    async onRowSelectionChange(selectedRowKeys, selectedRows) {
      await dispatch(this.moduleName, 'setRowSelected', {
        selectedRowKeys,
        selectedRows
      })
    },
    resize() {
      if (this.$refs[`${this.moduleName}Table`]) {
        this.$nextTick(() => {

          let footerHeight = 0
          const table = this.$refs[`${this.moduleName}Table`].$el
          const footer = table.querySelector('.ant-table-footer')

          if (footer) {
            footerHeight = footer.clientHeight
          }

          this.tableProps.scroll = {
            // 固定列时，需要设置x
            // x: this.$refs[`${this.moduleName}Table`].$el.clientWidth - 17,
            // x: this.$refs[`${this.moduleName}Table`].$el.clientWidth,
            y: this.$refs[`${this.moduleName}Table`].$el.clientHeight - footerHeight - 46, // 46：表格header高度
            scrollToFirstRowOnChange: true
          }
        })
      }
    }
  }
}
