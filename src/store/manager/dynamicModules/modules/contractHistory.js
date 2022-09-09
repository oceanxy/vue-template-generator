import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfContractReview: false,
    signingStatusEnum: {
      1: '签约中',
      2: '待审核',
      3: '已签约',
      4: '审核驳回'
    }
  }
})
