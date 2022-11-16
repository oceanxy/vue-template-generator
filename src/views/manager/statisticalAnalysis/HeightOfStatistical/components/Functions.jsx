import '../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  props: {
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
      <Button.Group class="tg-function">
        <Button
          onClick={() => this.onExport('体检基础数据', this.exportParams)}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Button.Group>
    )
  }
}
