import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          icon="plus"
          // onClick={() => this._setVisibleOfModal({}, 'visibleOfContractReview')}
        >
          导出
        </Button>
        <Button
          type="primary"
          icon="plus"
          // onClick={() => this._setVisibleOfModal({}, 'visibleOfContractReview')}
        >
          历史数据导入
        </Button>
      </Space>
    )
  }
}
