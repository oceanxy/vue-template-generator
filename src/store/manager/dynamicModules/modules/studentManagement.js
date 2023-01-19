import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        // 二维码弹窗
        visibilityOfCode: false,
        visibilityOfImport: false,
        // 设置学生宿舍
        visibilityOfSetRooms: false,
        schoolListByThisUser: {
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
