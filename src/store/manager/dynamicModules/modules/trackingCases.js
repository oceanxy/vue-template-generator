import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    dutyClassTree: {
      loading: false,
      list: []
    },
    dormitories: {
      loading: false,
      list: []
    },
    symptoms: {
      loading: false,
      list: []
    },
    diagnoses: {
      loading: false,
      list: []
    },
    visibilityOfAddTrace: false,
    visibilityOfPotentiallyInfectedStudents: false
  },
  modules: {
    potentiallyInfectedStudents: {
      state: {
        rowKey: 'id',
        search: {},
        list: [],
        loading: false,
        pagination: {
          pageSize: 10,
          pageIndex: 0,
          total: 0
        }
      }
    }
  }
}, [
  'selectedRowKeys',
  'selectedRows'
])
