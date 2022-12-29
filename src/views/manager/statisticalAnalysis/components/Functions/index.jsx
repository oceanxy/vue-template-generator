import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  props: {
    /**
     * 导出文件名
     */
    fileName: {
      type: String,
      required: true
    },
    /**
     * 用于导出的其他额外参数（纯为了配合后端）
     */
    exportParams: {
      type: Object,
      required: true
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onExport(this.fileName, this.exportParams)}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Space>
    )
  }
}
