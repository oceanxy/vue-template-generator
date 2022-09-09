import '../../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import forModuleName from '@/mixins/forModuleName'
import Table from './Table'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'QuestionnaireStatistics-Results',
  mixins: [forModuleName(true)],
  render() {
    return (
      <BNContainer
        class={'main-container'}
        contentClass={'table-content'}
        modalTitle={
          <div class={'table-content-title'}>
            <span>按类型统计</span>
            <Button class={'custom-button'} ghost type={'primary'}>导出结果</Button>
          </div>
        }
        width={'100%'}
        showBoxShadow={false}
      >
        <Table />
        <TGPagination />
      </BNContainer>
    )
  }
}
