import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfDetails: false,
    chartYear: undefined,
    years: {
      loading: false,
      list: []
    },
    chartData: {
      loading: false,
      list: []
    },
    details: {
      loading: false,
      list: []
    }
  }
})
