import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    activities: {
      loading: false,
      list: []
    },
    townOrSubDistricts: {
      loading: false,
      list: []
    },
    visibilityOfSchools: false,
    visibilityOfStudents: false
  },
  modules: {
    schools: {
      state: {
        rowKey: 'id',
        search: {},
        loading: false,
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    },
    students: {
      state: {
        rowKey: 'id',
        search: {},
        loading: false,
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'selectedRowKeys',
  'selectedRows',
  'currentItem',
  'pagination'
])
