import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfRooms: false,
      saleItemList: [],
      companyDictionaryList: []
    },
    mutations: {
      set_saleItemList(state, payload) {
        state.saleItemList = payload
      },
      set_visibleOfRooms(state, payload) {
        state.visibleOfRooms = payload
      },
      set_companyDictionaryList(state, payload) {
        state.companyDictionaryList = payload
      }
    },
    actions: {
      async getDetail({ commit }, { id, moduleName }) {
        if (!id) return {}

        const res = await apis.getDetailsOfSystemUser({ id })

        if (res.status) {
          commit('setDetails', {
            value: res.data, moduleName 
          }, { root: true })
        }

        return res
      },
      async getSaleItemList({ state, commit }) {
        if (state.saleItemList.length > 0) return

        const res = await apis.getSaleItemList()

        if (res.status) {
          commit('set_saleItemList', res.data)
        }
      },
      async getCompanyDictionaryList({ state, commit }) {
        if (state.companyDictionaryList.length > 0) return

        const res = await apis.getCompanyDictionaryList()

        if (res.status) {
          commit('set_companyDictionaryList', res.data)
        }
      }
    },

    modules: {}
  })
