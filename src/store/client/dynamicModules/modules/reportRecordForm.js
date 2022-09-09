import apis from '@/apis'
import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      loading: false,
      list: []
    },
    actions: {
      async getReportRecord(ctx, { reportId }) {
        commitRootInModule('setLoading', true)
        const res = await apis.getReportRecord({ reportId })

        commitRootInModule('setLoading', false)

        if (res.status) {
          commitRootInModule('setList', res.data.reportResultList || [])
        }

        return res
      }
    }
  })
