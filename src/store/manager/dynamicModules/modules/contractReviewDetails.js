import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule =>
  createStoreModule({
    state: {previewUrl: ''},
    mutations: {
      setPreviewUrl(state, url) {
        state.previewUrl = url
      }
    },
    actions: {
      async getContractPreview({ commit }, { id }) {
        const res = await apis.getContractPreviewContractReviewDetails({ id })
        const blob = new Blob([res], { type: 'application/pdf' })
        const blobUrl = window.URL.createObjectURL(blob)

        commit('setPreviewUrl', blobUrl)
      }
    }
  })
