import apis from '@/apis'
import { message } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        parkList: []
      },
      mutations: {
        setParkList(state, payload) {
          state.parkList = payload
        }
      },
      actions: {
        async onSubmit(ctx, values) {
          this.loading = true
          const form = {
            companyCategory: 1,
            ...values
          }
          const [businessLicense] = form.businessLicense

          form.businessLicense = businessLicense ? businessLicense.response.data[0].key : ''
          const [legalPersonIdCardFront] = form.legalPersonIdCardFront

          form.legalPersonIdCardFront = legalPersonIdCardFront ? legalPersonIdCardFront.response.data[0].key : ''
          const [legalPersonIdCardReverse] = form.legalPersonIdCardReverse

          form.legalPersonIdCardReverse = legalPersonIdCardReverse ? legalPersonIdCardReverse.response.data[0].key : ''
          commitRootInModule('setLoading', true)
          const res = await apis.notifyMessageEnterprisesIncome(form)

          commitRootInModule('setLoading', false)
          this.loading = false

          if (res.status) {
            message.success('申请成功')
          }

          return res
        },
        async getParkList({ commit }) {
          const res = await apis.notifyMessageGetParkList()

          if (res.status) {
            commit('setParkList', res.data)
          }
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )
