import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        {/*<Button*/}
        {/*  type="primary"*/}
        {/*  onClick={() => this.onAuditClick()}*/}
        {/*  icon={'plus'}*/}
        {/*  disabled={this.deleteButtonDisabled}*/}
        {/*>*/}
        {/*  批量开票*/}
        {/*</Button>*/}
        <Button
          onClick={() => this.onExport('发票数据')}
          icon={'export'}
        >
          导出
        </Button>
      </Space>
    )
  }
}
