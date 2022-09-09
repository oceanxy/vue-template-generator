/**
 * 表格功能按钮混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forIndex from '@/mixins/forIndex'
import Message from '@/utils/message'
import { mapGetters } from 'vuex'

/**
 * 为表格功能按钮生成 mixin
 * @param [cb] {function} 用于控制按钮禁用权限的回调函数，接收一个参数：当前选中行数组。返回一个对象，对象的键为控制禁用权限的字段名，对象的值为布尔值。
 * 默认不传，相当于至少勾选了一行列表即解除禁用
 * @returns {Object}
 */
export default cb => ({
  inject: ['moduleName'],
  mixins: [forIndex],
  props: {
    search: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      auditButtonDisabled: true,
      editedRow: {},
      ids: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName)
    },
    selectedRows() {
      return this.getState('selectedRows', this.moduleName)
    }
  },
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
     * @param [initialValue] {Object} 初始化默认值
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
      await Message.verificationDialog(async () => {
        return await this.$store.dispatch('delete', { moduleName: this.moduleName })
      }, '确定要批量删除已选中的数据吗？')
    },
    /**
     * 批量操作之前的询问，并验证是否勾选了表格数据
     * @param visibleField {string}
     * @param [params] {Object}
     */
    async onBulkOperations(visibleField, params) {
      await Message.verifySelected(this.selectedRowKeys, () => {
        this._setVisibleOfModal(
          {
            ids: this.selectedRowKeys,
            ...params
          },
          visibleField
        )
      })
    },
    /**
     * 导出功能
     * @param fileName
     * @returns {Promise<void>}
     */
    async onExport(fileName) {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        queryParameters: {
          ...this.$route.query,
          ...this.search
        },
        fileName
      })
    }
  }
})
