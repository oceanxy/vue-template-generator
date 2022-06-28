import { createStoreModule } from '@/store/template'
import apis from '@/apis'
export default commitRootInModule =>
  createStoreModule({
    state: {
      businessDetails: []
    },
    mutations: {
      setBusinessDetails(state, payload) {
        state.businessDetails = payload
      }
    },
    actions: {
      async getContractDetail({ commit }, { id }) {
        const res = await apis.getDetailsOfBusinessDetails({ id })
        if (res.status) {
          commit('setBusinessDetails', res.data)
        }
      }
    }
  })
