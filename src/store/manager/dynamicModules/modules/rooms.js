import { omit } from 'lodash'
import { createStoreModule } from '@/store/template'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibilityOfStudentInfo: false,
    schoolTree: {
      list: [],
      loading: false
    },
    floorTree: {
      list: [],
      loading: false
    },
    floorTreeInModal: {
      list: [],
      loading: false
    }
  },
  modules: {
    studentInfo: {
      state: {
        rowKey: 'id',
        loading: false,
        list: []
      }
    }
  }
}), ['state.details'])
