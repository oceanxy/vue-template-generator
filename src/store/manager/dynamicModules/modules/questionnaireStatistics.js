import { createStoreModule } from '@/store/template'
import apis from '@/apis'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      questionnaireId: undefined,
      itemId: undefined,
      itemLoading: false,
      itemOfQuestionnaireTemplate: []
    },
    mutations: {
      setItemLoading(state, payload) {
        state.itemLoading = payload
      },
      setQuestionnaireId(state, payload) {
        state.questionnaireId = payload
      },
      setItemOfQuestionnaireTemplate(state, payload) {
        state.itemOfQuestionnaireTemplate = payload
      },
      setItemId(state, payload) {
        state.itemId = payload
      }
    },
    actions: {
      async setQuestionnaireId({ commit, dispatch }, payload) {
        commit('setQuestionnaireId', payload)
        dispatch('getItemsOfTemplateById')
      },
      async getItemsOfTemplateById({ state, commit }) {
        commit('setItemLoading', true)

        const response = await apis.getItemsOfTemplateById({ reportId: state.questionnaireId })

        if (response.status) {
          commit('setItemOfQuestionnaireTemplate', response.data)
          commit('setItemId', response.data[0].id)
        }

        commit('setItemLoading', false)
      }
    },
    modules: {
      results: {
        state: {
          list: [],
          pagination: {
            pageIndex: 0,
            pageSize: 10,
            total: 0
          },
          loading: false
        }
      }
    }
  }),
  [
    'state.selectedRows',
    'state.selectedRowKeys',
    'state.visibleOfEdit',
    'state.currentItem',
    'state.pagination',
    'state.search',
    'state.list'
  ]
)
