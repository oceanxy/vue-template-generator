import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule => createStoreModule({
  state: { listOfAccountApplicationRecord: [] },
  mutations: {
    setListOfAccountApplicationRecord(state, payload) {
      state.listOfAccountApplicationRecord = payload
    }
  },
  actions: {
    async addAccountOpening({ commit }, payload) {
      const response = await apis.addAccountOpening(payload)

      return response.status
    },
    async getListOfAccountApplicationRecord({ commit }) {
      commit('setLoading', { value: true, moduleName: 'accountOpening' }, { root: true })

      const response = await apis.getListOfAccountApplicationRecord()

      if (response.status) {
        commit('setListOfAccountApplicationRecord', response.data)
      }

      commit('setLoading', { value: false, moduleName: 'accountOpening' }, { root: true })
    }
  }
})
