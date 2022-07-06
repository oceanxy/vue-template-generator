import { createStoreModule } from '@/store/template'
import apis from '@/apis'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      templateId: '',
      itemId: '',
      itemLoading: false,
      itemOfQuestionnaireTemplate: []
    },
    mutations: {
      setItemLoading(state, payload) {
        state.itemLoading = payload
      },
      setTemplateId(state, payload) {
        state.templateId = payload
      },
      setItemOfQuestionnaireTemplate(state, payload) {
        state.itemOfQuestionnaireTemplate = payload
      },
      setItemId(state, payload) {
        state.itemId = payload
      }
    },
    actions: {
      async setTemplateId({ commit, dispatch }, payload) {
        commit('setTemplateId', payload)
        dispatch('getItemOfQuestionnaireTemplate')
      },
      async getItemOfQuestionnaireTemplate({ state, commit }) {
        commit('setItemLoading', true)

        const response = await apis.getItemOfQuestionnaireTemplate({ templateId: state.templateId })

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
