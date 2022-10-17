import '../assets/styles/index.scss'
import { Space } from 'ant-design-vue'
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
        {/*<Button*/}
        {/*  // onClick={() => this._setVisibleOfModal({}, 'visibleOfQuestionnaireSwitch')}*/}
        {/*  icon="export"*/}
        {/*>*/}
        {/*  导出*/}
        {/*</Button>*/}
      </Space>
    )
  }
}
