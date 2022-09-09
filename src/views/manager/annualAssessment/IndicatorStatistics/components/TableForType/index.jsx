import '../../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import TGPagination from '@/components/TGPagination'

export default {
  render() {
    return (
      <BNContainer
        class={'main-container'}
        contentClass={'table-content'}
        modalTitle={
          <div class={'table-content-title'}>
            <span>考核指标明细</span>
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
