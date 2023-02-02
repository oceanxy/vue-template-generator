import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfDetails: false,
    activities: {
      list: [],
      loading: false
    },
    organizations: {
      list: [],
      loading: false
    },
    conclusionGrades: {
      list: [],
      loading: false
    },
    heightAndWeightData: {
      loading: false,
      list: []
    }
  },
  modules: {
    checkedItems: {
      state: {
        loading: false,
        rowKey: 'id'
      }
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'selectedRowKeys',
  'selectedRows'
])
