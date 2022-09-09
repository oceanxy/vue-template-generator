import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfRemindersForHandingComplaints: false,
    visibleOfAutoDispatchRules: false,
    remind: {
      loading: false,
      data: { enable: false }
    },
    remindersForHandingComplaints: {
      loading: false,
      data: {
        enable: false,
        manager: ''
      }
    },
    autoDispatchRules: {
      loading: false,
      data: {
        enable: false,
        rules: []
      }
    }
  }
})
