import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        // 二维码弹窗
        visibleOfCode: false,
        visibleOfImport: false,
        gradeList: {
          loading: false,
          list: []
        },
        schoolAllList: {
          loading: false,
          list: []
        },
        streetList: {
          loading: false,
          list: []
        },
        codeBatchUrl: {
          loading: false,
          list: null
        },
        grade: [],
        classNumber: ''
      }
    })
  )
