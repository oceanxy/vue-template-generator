import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'
import apis from '@/apis'

export default commitRootInModule => omit(createStoreModule(
  {
    state: {
      floors: [],
      visibleOfTerminate: false,
      visibleOfRenew: false,
      visibleOfBills: false,
      visibleOfDetails: false,
      pendingOrderList: {
        loading: false,
        list: []
      },
      details: {
        loading: false,
        data: {}
      }
    },
    mutations: {
      setFloors(state, payload) {
        state.floors = payload
      }
    },
    actions: {
      /**
       * 获取楼层树
       * @param commit
       * @param state
       * @returns {Promise<void>}
       */
      async getFloorsByBuilding({ commit, state }) {
        const response = await apis.getFloorsByBuilding({ buildId: state.search.buildId })

        if (response.status) {
          commit('setFloors', response.data)
        }
      }
    }
  }
), 'state.pagination')
