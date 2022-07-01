import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule => createStoreModule({
  modules: {
    selectCompany: {
      state: {
        loading: false,
        search: {},
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        },
        list: [],
        enterpriseClassifications: []
      },
      mutations: {
        setEnterpriseClassifications(state, payload) {
          state.enterpriseClassifications = payload
        }
      },
      actions: {
        async getEnterpriseClassifications({ commit }) {
          const response = await apis.getEnterpriseClassifications()

          if (response) {
            commit('setEnterpriseClassifications', response.data.dictionaryList)
          }
        }
      }
    }
  }
})
