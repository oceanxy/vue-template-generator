import apis from '@/apis'
import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {loading: false},
    actions: {
      async getMyReportList() {
        commitRootInModule('setLoading', true)
        const res = await apis.getMyReportList()

        commitRootInModule('setLoading', false)

        if (res.status) {
          commitRootInModule('setList', res.data)
        }

        return res
      }
    }
  })
