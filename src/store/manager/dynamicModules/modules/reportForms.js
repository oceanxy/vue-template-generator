import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfReportItems: false,
    visibleOfReportSwitch: false,
    visibleOfTemplateItems: false,
    parks: {
      list: [],
      loading: false
    },
    templates: {
      list: [],
      loading: false
    }
  }
})
