import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        {/*<Button*/}
        {/*  // onClick={() => this.onAddClick()}*/}
        {/*  icon="import"*/}
        {/*>*/}
        {/*  导入*/}
        {/*</Button>*/}
        <Button
          onClick={() => this.onExport('企业数据')}
          icon="export"
        >
          导出
        </Button>
      </Space>
    )
  }
}
