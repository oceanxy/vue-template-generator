import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfReportItems: false,
    visibleOfReportSwitch: false,
    visibleOfTemplateItems: false,
    templates: {
      list: [],
      loading: false
    },
    targetItems: {
      list: [],
      loading: false
    }
  }
})
