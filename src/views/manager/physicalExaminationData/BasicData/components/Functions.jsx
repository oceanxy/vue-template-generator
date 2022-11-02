import '../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Button.Group class="tg-function">
        <Button
          onClick={() => this.onExport('企业数据')}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
        <Button
          onClick={() => this.onExport('企业数据')}
          icon="delete"
          disabled={this.exportButtonDisabled}
        >
          按时间导出
        </Button>
      </Button.Group>
    )
  }
}
