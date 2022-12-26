import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(createStoreModule({
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
  }), [
    'state.details',
    'state.visibilityOfEdit',
    'state.selectedRowKeys',
    'state.selectedRows',
    'state.currentItem',
    'state.pagination'
  ])
