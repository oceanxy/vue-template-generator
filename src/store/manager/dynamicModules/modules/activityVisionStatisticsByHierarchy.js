import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule => createStoreModule({
  state: {
    activities: {
      list: [],
      loading: false
    },
    listBySchoolId: [],
    listByGradeId: [],
    hierarchy: 'school',
    currentGradeId: '',
    currentSchoolId: ''
  },
  actions: {
    async getList({ state }, {
      moduleName,
      customApiName,
      payload,
      stateName
    }) {
      commitRootInModule('setLoading', {
        value: true,
        moduleName
      })

      const response = await apis[customApiName]({
        activityId: state.search.activityId,
        ...payload
      })

      if (response.status) {
        commitRootInModule('setList', {
          value: response.data,
          moduleName,
          stateName
        })
      }

      commitRootInModule('setLoading', {
        value: false,
        moduleName
      })
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'selectedRowKeys',
  'selectedRows',
  'pagination'
])
