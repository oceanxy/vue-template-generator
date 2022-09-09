import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfAssign: false,
      visibleOfProcess: false,
      personnelForSelect: {
        loading: false,
        list: []
      },
      companyList: {
        loading: false,
        list: []
      },
      complaintRecords: {
        loading: false,
        list: []
      }
    }
  }),
  [
    'visibleOfEdit'
  ]
)
