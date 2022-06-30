import './index.scss'
import { Button, Form } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'
import BNContainer from '@/components/BNContainer'
import Table from './Table'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({
      getCurrentItem: 'getCurrentItem'
    }),
    currentItem() {
      return this.getCurrentItem(this.moduleName)
    }
  },
  render() {
    return (
      <div class={'bnm-contract-confirmation-container'}>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          contentClass={'bnm-contract-confirmation-table-wrapper'}
          modalTitle={
            <div class={'bnm-contract-confirmation-title'}>
              费用核算清单
              <span>中心名称/楼栋名称/8701</span>
            </div>
          }
        >
          <Table class={'bnm-contract-confirmation-table'} />
        </BNContainer>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          modalTitle={
            <div>合同模版</div>
          }
        >
          合同模版：<Button ghost type={'primary'}>选择</Button>
        </BNContainer>
        <div class={'bnm-contract-confirmation-btns'}>
          <Button type={'primary'}>上一步</Button>
        </div>
      </div>
    )
  }
})
