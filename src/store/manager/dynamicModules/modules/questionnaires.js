import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfQuestionnaireSwitch: false,
    templates: {
      list: [],
      loading: false
    }
  }
})
