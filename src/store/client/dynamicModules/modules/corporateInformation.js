import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: { loading: false },
      mutations: {},
      actions: {
        async getCompanyDetail({ commit, rootState }) {
          const { userInfo } = rootState.login

          commitRootInModule('setLoading', true)
          const res = await apis.notifyMessageGetCompanyDetail({ companyId: userInfo.companyId })

          commitRootInModule('setLoading', false)

          if (res.status) {
            commitRootInModule('setDetails', res.data)
          }
        },
        async updateCompanyDetail({ commit, state }, payload) {
          const form = {
            id: state.details.id,
            ...payload
          }
          const [logo] = form.logo

          form.logo = logo ? logo?.response?.data[0].key ?? logo.key : ''

          const [businessLicense] = form.businessLicense

          form.businessLicense = businessLicense ? businessLicense?.response?.data[0].key ?? businessLicense.key : ''
          const [legalPersonIdCardFront] = form.legalPersonIdCardFront

          form.legalPersonIdCardFront = legalPersonIdCardFront
            ? legalPersonIdCardFront?.response?.data[0].key ?? legalPersonIdCardFront.key
            : ''
          const [legalPersonIdCardReverse] = form.legalPersonIdCardReverse

          form.legalPersonIdCardReverse = legalPersonIdCardReverse
            ? legalPersonIdCardReverse?.response?.data[0].key ?? legalPersonIdCardReverse.key
            : ''

          commitRootInModule('setLoading', true)
          const res = await apis.notifyMessageUpdateCompanyDetail(form)

          commitRootInModule('setLoading', false)

          if (res.status) {
            message.success('保存成功')
          }

          return res
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )
