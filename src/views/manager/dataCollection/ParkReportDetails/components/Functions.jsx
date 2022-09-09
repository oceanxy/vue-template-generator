import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import Message from '@/utils/message'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        {/*<Button*/}
        {/*  // onClick={() => this.onAddClick({ templateType: 1 })}*/}
        {/*  icon="export"*/}
        {/*>*/}
        {/*  导出*/}
        {/*</Button>*/}
      </Space>
    )
  }
}
