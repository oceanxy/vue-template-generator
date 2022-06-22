/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格功能按钮
 * @Date: 2022-03-14 周一 15:43:52
 */

import { mapGetters } from 'vuex'
import { message, Modal } from 'ant-design-vue'
import forComponent from '@/mixins/forComponent'

export default {
  mixins: [forComponent],
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      selectedRows: {}
    }
  },
  computed: mapGetters({ getSelectedRows: 'getSelectedRows' }),
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].selectedRows,
      selectedRows => {
        this.editButtonDisabled = selectedRows.length !== 1
        this.deleteButtonDisabled = !selectedRows.length

        if (selectedRows.length === 1) {
          this.selectedRows = selectedRows[0]
        }
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
    async onEditClick() {
      await this._setVisibleOfModal(this.selectedRows)
    },
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
}
