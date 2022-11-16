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
      visibleOfSchools: false,
      visibleOfModuleData: false
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
            pageSize: 15,
            total: 0
          }
        }
      },
      moduleData: {
        state: {
          rowKey: 'id',
          search: {},
          loading: false,
          list: [],
          pagination: {
            pageIndex: 0,
            pageSize: 15,
            total: 0
          }
        }
      }
    }
  }), [
    'state.details',
    'state.visibleOfEdit',
    'state.selectedRowKeys',
    'state.selectedRows',
    'state.currentItem',
    'state.pagination'
  ])
