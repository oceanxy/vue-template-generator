import { createStoreModule } from '@/store/template'
import apis from '@/apis'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
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
      },
      fillInformation: {
        state: {
          loading: false,
          search: {},
          visibleOfChooseVenue: false,
          list: [], // 已选择的孵化场所详细信息集合
          hatcheryTree: [] // 孵化场所树
        },
        mutations: {
          setHatcheryTree(state, payload) {
            state.hatcheryTree = payload
          }
        },
        actions: {
          async getHatcheryTree({ commit }, payload) {
            const response = await apis.getHatcheryTree(payload)

            if (response) {
              commit('setHatcheryTree', response.data)
            }
          }
        }
      },
      contract: {
        state: {
          loading: false,
          data: {},
          visibleOfChooseContractTemplate: false,
          selectedRows: [],
          selectedRowKeys: []
        }
      }
    }
  }),
  [
    'state.search',
    'state.pagination',
    'state.visibleOfEdit',
    'state.selectedRowKeys',
    'state.selectedRows',
    'state.currentItem',
    'state.list'
  ]
)
