import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

/**
 * 控制按钮权限
 * @param selectedRows {Object[]} 当前选中行数组
 * @returns {{auditButtonDisabled: boolean}} 返回一个对象。
 * 该对象的 key 对应 mixin forIndex 中的按钮权限控制字段的名称，
 * 该对象的 value 为 boolean 类型，即按钮是否禁用
 */
function controlButtonPermissions(selectedRows) {
  let isDisabled = false

  for (const item of selectedRows) {
    if (+item.auditStatus !== 2) {
      isDisabled = true
      break
    }
  }

  return {auditButtonDisabled: !selectedRows.length || isDisabled}
}

export default {
  mixins: [forFunction(controlButtonPermissions)],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          icon="plus"
          onClick={() => this.onAuditClick()}
          disabled={this.auditButtonDisabled}
        >
          审核
        </Button>
      </Space>
    )
  }
}
