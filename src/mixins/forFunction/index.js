/**
 * 表格功能按钮混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forIndex from '@/mixins/forIndex'
import { verificationDialog, verifySelected } from '@/utils/message'
import { message, Space } from 'ant-design-vue'
import moment from 'moment'
import TGPermissionsButton from '@/components/TGPermissionsButton'

/**
 * 基本按钮枚举
 * @global
 * @readonly
 * @enum {'ADD'|'EDIT'|'DELETE'}
 */
export const controlBarBaseButtons = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
}

/**
 * 为表格功能按钮生成 mixin
 *
 * @param [controlButtonPermissions] {(selectedRows:Object[]) => ({[fieldName]: boolean})} 用于控制按钮禁用权限的回调函数，
 *  仅当selectedRows发生改变时调用。
 *  接收一个参数 selectedRows。当前选中行数组。
 *  返回一个对象，对象的键（fieldName）为控制禁用权限的字段名（如： 'editButtonDisabled'），对象的值为布尔值。
 *  默认不传，相当于至少勾选了一行列表即解除禁用。
 * @param [overrideDefaultButtons] {boolean} 混入组件内 forRender 函数的返回值是否覆盖本混合内 render 函数的内容。默认 false。
 * @param [baseOperationButtons=[controlBarBaseButtons.ADD]] {controlBarBaseButtons[]} 要显示的按钮。
 *  默认[controlBarBaseButtons.ADD]，当 overrideDefaultButtons 为 true 时该参数无效。
 * @returns {Object}
 */
export default ({
  controlButtonPermissions,
  overrideDefaultButtons,
  baseOperationButtons = [controlBarBaseButtons.ADD]
} = {}) => ({
  inject: {
    moduleName: { default: null },
    /**
     * 判断本页面是否存在侧边树组件
     * 来自于 @/src/components/TGContainerWithTreeSider 组件
     */
    inTree: { default: false },
    /**
     * 刷新侧边树的数据
     * 来自于 @/src/components/TGContainerWithTreeSider 组件
     */
    refreshTree: { default: null }
  },
  mixins: [forIndex],
  props: {
    /**
     * 水平对齐方式
     */
    align: {
      type: String, // 支持 'left','center','right'
      default: 'right'
    }
  },
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      auditButtonDisabled: true,
      exportButtonDisabled: false,
      editedRow: {},
      ids: ''
    }
  },
  computed: {
    selectedRowKeys() {
      return this.$store.state[this.moduleName]?.selectedRowKeys ?? []
    },
    selectedRows() {
      return this.$store.state[this.moduleName]?.selectedRows ?? []
    }
  },
  watch: {
    selectedRows(value) {
      this.editButtonDisabled = value.length !== 1
      this.deleteButtonDisabled = !value.length
      this.auditButtonDisabled = !value.length

      if (typeof controlButtonPermissions === 'function') {
        Object.entries(controlButtonPermissions(value)).forEach(([key, value]) => {
          this[key] = value
        })
      }

      if (value.length === 1) {
        this.editedRow = value[0]
      } else {
        this.editedRow = {}
      }

      this.ids = value.map(item => item.id).join()
    }
  },
  methods: {
    /**
     * 新增
     * @param [initialValue] {Object} 初始化默认值
     * @returns {Promise<void>}
     */
    async onCustomAddClick(initialValue = {}) {
      await this._setVisibilityOfModal({ ...initialValue })
    },
    /**
     * 编辑
     * @returns {Promise<void>}
     */
    async onCustomEditClick() {
      await this._setVisibilityOfModal({ ...this.editedRow, _isBulkOperations: true })
    },
    /**
     * 审核或相关意见填写的批量操作
     * @param [visibilityFieldName] {string} 弹窗控制字段 默认 visibilityOfEdit
     * @returns {Promise<void>}
     */
    async onCustomAuditClick(visibilityFieldName) {
      await this._setVisibilityOfModal({ ids: this.ids }, visibilityFieldName)
    },
    /**
     * 删除
     * @param [done] {() => void} 成功执行删除的回调
     * @returns {Promise<void>}
     */
    async onCustomDeleteClick(done) {
      await verificationDialog(
        async () => {
          const status = await this.$store.dispatch('delete', { moduleName: this.moduleName })

          if (status && this.inTree) {
            await this.refreshTree()
          }

          if (status && typeof done === 'function') {
            done()
          }

          return Promise.resolve(status)
        },
        <div>
          <div>确定要批量删除已选中的数据吗？</div>
          <div style={{ color: '#b9b9b9' }}>
            当前已勾选的序号为：
            {
              this.selectedRows
                .map(item => item._sn)
                .sort((a, b) => a - b)
                .join('，')
            }
          </div>
        </div>
      )
    },
    /**
     * 批量操作之前的询问，并验证是否勾选了表格数据
     * @param visibilityFieldName {string}
     * @param [params] {Object}
     */
    async onBulkOperations(visibilityFieldName, params) {
      await verifySelected(this.selectedRowKeys, () => {
        this._setVisibilityOfModal(
          {
            ids: this.selectedRowKeys,
            ...params
          },
          visibilityFieldName
        )
      })
    },
    /**
     * 导出功能
     * @param [fileName] {string} 导出文件名 默认为本页面的 title
     * @param [payload] {Object} 自定义导出参数，会联合该模块的 store.state.search 一起传递给接口
     * @param [customApiName] {string} 自定义导出接口名
     * @param [isTimeName] {boolean} 默认false，开启之后filename后添加时间格式命名
     * @returns {Promise<void>}
     */
    async onCustomExport(fileName, payload, customApiName, isTimeName = false) {
      message.loading({
        content: '正在导出，请稍候...',
        duration: 0
      })

      // 获取当前日期
      const date = moment(new Date()).format('YYYYMMDDHHmmss')

      this.exportButtonDisabled = true

      await this.$store.dispatch('export', {
        moduleName: this.moduleName,
        additionalQueryParameters: this.$route.query,
        fileName: `${fileName || this.$route.meta.title}${isTimeName ? date : ''}`,
        payload,
        customApiName
      })

      this.exportButtonDisabled = false
      message.destroy()
    }
  },
  render() {
    return (
      <Space class={`tg-function${this.align ? ` ${this.align}` : ''}`}>
        {
          !overrideDefaultButtons
            ? [
              baseOperationButtons.includes(controlBarBaseButtons.ADD)
                ? (
                  <TGPermissionsButton
                    type="primary"
                    identification={'ADD'}
                    onClick={() => this.onCustomAddClick()}
                    icon="plus"
                  >
                    新增
                  </TGPermissionsButton>
                )
                : null,
              baseOperationButtons.includes(controlBarBaseButtons.DELETE)
                ? (
                  <TGPermissionsButton
                    type="danger"
                    identification={'DELETE'}
                    disabled={this.deleteButtonDisabled}
                    onClick={() => this.onCustomDeleteClick()}
                    icon="delete"
                  >
                    删除
                  </TGPermissionsButton>
                )
                : null,
              baseOperationButtons.includes(controlBarBaseButtons.EDIT)
                ? (
                  <TGPermissionsButton
                    identification={'UPDATE'}
                    disabled={this.editButtonDisabled}
                    onClick={() => this.onCustomEditClick()}
                    icon="edit"
                  >
                    修改
                  </TGPermissionsButton>
                )
                : null
            ]
            : null
        }
        {this.forRender}
      </Space>
    )
  }
})
