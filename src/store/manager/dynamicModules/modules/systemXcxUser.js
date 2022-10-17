/**
 * 小程序用户管理
 */

import apis from '@/apis'
import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfResetPwd: false,
      companyList: {
        loading: false,
        list: []
      }
    },
    mutations: {},
    actions: {
      async getDetail({ commit }, { id, moduleName }) {
        if (!id) return {}

        const res = await apis.getDetailsOfSystemUser({ id })

        if (res.status) {
          commit(
            'setDetails',
            {
              value: res.data,
              moduleName
            },
            { root: true }
          )
        }

        return res
      }
    },
    modules: {}
  })
