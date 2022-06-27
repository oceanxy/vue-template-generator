/**
 * 表格功能按钮混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import { mapGetters } from 'vuex'
import { message, Modal } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'

/**
 * 为表格功能按钮生成 mixin
 * @param [cb] {Function} 用于控制按钮禁用权限的回调函数，默认不传，相当于至少勾选了一行列表即解除禁用
 * @returns {Object}
 */
export default cb => ({
  inject: ['moduleName'],
  mixins: [forIndex],
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      auditButtonDisabled: true,
      editedRow: {},
      ids: ''
    }
  },
  computed: mapGetters({ getSelectedRows: 'getSelectedRows' }),
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].selectedRows,
      selectedRows => {
        this.editButtonDisabled = selectedRows.length !== 1
        this.deleteButtonDisabled = !selectedRows.length
        this.auditButtonDisabled = !selectedRows.length

        if (typeof cb === 'function') {
          Object.entries(cb(selectedRows)).forEach(([key, value]) => {
            this[key] = value
          })
        }

        if (selectedRows.length === 1) {
          this.editedRow = selectedRows[0]
        }

        this.ids = selectedRows.map(item => item.id).join()
      }
    )
  },
  methods: {
    /**
     * 新增
     * @param initialValue {Object} 初始化默认值
     * @returns {Promise<void>}
     */
    async onAddClick(initialValue = {}) {
      await this._setVisibleOfModal({ ...initialValue })
    },
    /**
     * 编辑
     * @returns {Promise<void>}
     */
    async onEditClick() {
      await this._setVisibleOfModal(this.editedRow)
    },
    /**
     * 审核或相关意见填写的批量操作
     * @returns {Promise<void>}
     */
    async onAuditClick() {
      await this._setVisibleOfModal({ ids: this.ids })
    },
    /**
     * 删除
     * @returns {Promise<void>}
     */
    async onDeleteClick() {
      Modal.confirm({
        title: '确认',
        content: '确定要批量删除已选中的数据吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async close => {
          const status = await this.$store.dispatch('delete', {
            moduleName: this.moduleName
          })

          if (status) {
            message.success('删除成功！')
          }

          close()
        }
      })
    }
  }
})
