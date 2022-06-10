import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import tableButtons from '@/mixins/tableButtons'

export default {
  mixins: [tableButtons],
  render() {
    return (
      <Space class='tg-function'>
        <Button
          type="primary"
          onClick={this.onAddClick}
          icon="plus"
        >
          添加成员
        </Button>
      </Space>
    )
  }
}
