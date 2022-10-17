import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule =>
  createStoreModule({
    state: {
      previewUrl: '',
      message: ''
    },
    mutations: {
      setPreviewUrl(state, url) {
        state.previewUrl = url
      },
      setMessage(state, message) {
        state.message = message
      }
    },
    actions: {
      async getContractPreview({ commit }, { id }) {
        const res = await apis.getContractPreviewContractReviewDetails({ id })

        if (res.type === 'text/xml') {
          const blob = new Blob([res], { type: 'application/pdf' })
          const blobUrl = window.URL.createObjectURL(blob)

          commit('setPreviewUrl', blobUrl)
          commit('setMessage', '')
        } else {
          if (res instanceof Blob) {
            //此时返回的data为blob格式
            const file = new FileReader()

            file.readAsText(res, 'utf-8')
            file.onload = function() {
              commit('setPreviewUrl', '')
              commit('setMessage', JSON.parse(file.result).message)
            }
          }
        }
      }
    }
  })
