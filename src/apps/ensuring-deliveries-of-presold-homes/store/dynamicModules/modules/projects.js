import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfDeveloper: false,
    visibilityOfRepayment: false,
    natureOfAssets: {
      list: [],
      loading: false
    },
    enumOfDevelopers: {
      list: [],
      loading: false
    },
    natureOfTheEnterprise: {
      list: [],
      loading: false
    },
    repaymentPlanList: {
      list: [],
      loading: false
    }
  }
}, [
  'treeIdField',
  'sortFieldList'
])
