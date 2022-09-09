import { createStoreModule } from '@/store/template'
import apis from '@/apis'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: { visibleOfChooseVenue: false },
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
          list: []
        }
      },
      fillInformation: {
        state: {
          loading: false,
          search: {},
          // 已选择的孵化场所详细信息集合
          list: [],
          // 孵化场所树
          hatcheryTree: [],
          // 缴费周期数据
          enterprisePaymentCycle: {
            loading: false,
            list: []
          },
          // 应缴费项数据
          feesPayableByCompany: {
            loading: false,
            list: []
          }
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
          visibleOfPreviewContract: false,
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
    'state.list'
  ]
)
