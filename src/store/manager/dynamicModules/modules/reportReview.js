import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    dutyClassTree: {
      loading: false,
      list: []
    },
    studentsNeedToQuickReview: {
      loading: false,
      pendingGradeList: [],
      reportTimeStr: '',
      reportTimePeriodStr: ''
    },
    symptoms: {
      loading: false,
      list: []
    },
    diagnoses: {
      loading: false,
      list: []
    },
    visibilityOfQuickReview: false,
    visibilityOfReview: false,
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
  'visibilityOfEdit'
])
