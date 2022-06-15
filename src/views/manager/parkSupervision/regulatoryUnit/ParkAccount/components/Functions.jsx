import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction],
  render() {
    return (
      <Space class='tg-function'>
        <Button
          type="primary"
          onClick={this.onAddClick}
          icon="plus"
        >
          申请开通账号
        </Button>
      </Space>
    )
  }
}
