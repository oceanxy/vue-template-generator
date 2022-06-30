/**
 * 表格混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 16:08:37
 */

import { mapGetters } from 'vuex'
import { message, Modal } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import { omit } from 'lodash'

export default () => ({
  inject: ['moduleName'],
  mixins: [forIndex],
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
    ...mapGetters({
      getLoading: 'getLoading',
      getCurrentItem: 'getCurrentItem'
    })
  },
  async created() {
    // 为 list 创建动态侦听器
    if (!this.submoduleName) {
      this.$watch(
        () => this.$store.state[this.moduleName].list,
        async list => {
          this.tableProps.dataSource = list

          this.resize()
        }
      )

      await this.fetchList()
    } else {
      this.$watch(
        () => this.$store.state[this.moduleName][this.visibleField],
        async visibleField => {
          if (visibleField) {
            await this.fetchList()
          }
        },
        { immediate: true }
      )

      this.$watch(
        () => this.$store.state[this.moduleName][this.submoduleName].list,
        async list => {
          this.tableProps.dataSource = list
        },
        { immediate: true }
      )
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize)
    })
  },
  methods: {
    /**
     * 获取列表数据
     * @returns {Promise<void>}
     */
    async fetchList() {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: {
          ...this.$route.query,
          ...(this.additionalQueryParameters || {}) // 来自于子模块组件的 inject，非混合内的 inject
        }
      })
    },
    /**
     * 行内改变状态
     * @param checked {boolean} 当前状态
     * @param record {Object} 列表数据对象
     * @param [customFieldName] {string} 自定义字段名 默认 status
     * @returns {Promise<void>}
     */
    async onStatusChange(checked, record, customFieldName = 'status') {
      const status = await this.$store.dispatch('updateStatus', {
        moduleName: this.moduleName,
        customFieldName,
        payload: {
          id: record.id,
          [customFieldName]: checked ? 1 : 2
        }
      })

      const index = this.tableProps.dataSource.findIndex(item => item.id === record.id)

      if (status) {
        message.success([<span style={{ color: 'blue' }}>{record.fullName}</span>, ' 的状态已更新！'])

        // 更新当前行受控Switch组件的值
        this.$set(this.tableProps.dataSource[index], customFieldName, checked ? 1 : 2)
      } else {
        // 调用接口失败时，还原值
        this.$set(this.tableProps.dataSource[index], customFieldName, checked ? 2 : 1)
      }
    },
    /**
     * 行内新增
     * @param initialValue {Object} 初始化默认值
     * @param parentId {string} 父级ID
     * @returns {Promise<void>}
     */
    async onAddClick(initialValue, parentId) {
      await this._setVisibleOfModal({ parentId, ...omit(initialValue, 'id') })
    },
    /**
     * 编辑
     * @param record {Object} 列表数据对象
     * @returns {Promise<void>}
     */
    async onEditClick(record) {
      await this._setVisibleOfModal(record)
    },
    /**
     * 审核或相关意见填写
     * @param ids {string}
     * @returns {Promise<void>}
     */
    async onAuditClick(ids) {
      await this._setVisibleOfModal({ ids })
    },
    /**
     * 删除
     * @param record {Object} 列表数据对象
     */
    onDeleteClick(record) {
      Modal.confirm({
        title: '确认',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async close => {
          const status = this.$store.dispatch('delete', {
            ids: [record.id],
            moduleName: this.moduleName
          })

          if (status) {
            message.success([<span style={{ color: 'blue' }}>{record.appName}</span>, ' 已成功删除！'])
          }

          close()
        }
      })
    },
    /**
     * 表格行change事件回调
     * @param selectedRowKeys {string[]} 当前选中行的ID
     * @param selectedRows {Object[]} 当前选中的数据对象
     * @returns {Promise<void>}
     */
    async onRowSelectionChange(selectedRowKeys, selectedRows) {
      await this.$store.dispatch('setRowSelected', {
        moduleName: this.moduleName,
        payload: {
          selectedRowKeys,
          selectedRows
        }
      })
    },
    /**
     * 导出数据
     * @param {Object} payload 自定义参数
     * @param {string} fileName 文件名称
     */
    async downExcel(payload, fileName) {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: payload,
        fileName: fileName
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
})
