import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    dutyClassTree: {
      loading: false,
      list: []
    }
  }
}, [
  'selectedRowKeys',
  'selectedRows',
  'details'
])
