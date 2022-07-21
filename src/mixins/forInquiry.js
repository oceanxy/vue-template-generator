/**
 * 表格搜索混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { omit } from 'lodash'
import moment from 'moment'

export default () => {
  return {
    inject: ['moduleName'],
    methods: {
      transformValue(values) {
        let temp = { ...values }

        if ('dateRange' in temp) {
          temp.startTime = temp.dateRange[0] ? moment(temp.dateRange[0]).format('YYYYMMDD') : ''
          temp.endTime = temp.dateRange[1] ? moment(temp.dateRange[1]).format('YYYYMMDD') : ''

          temp = omit(temp, 'dateRange')
        }

        if ('datetimeRange' in temp) {
          temp.startTime = temp.datetimeRange[0] ? moment(temp.datetimeRange[0]).format('YYYYMMDDHHmm') : ''
          temp.endTime = temp.datetimeRange[1] ? moment(temp.datetimeRange[1]).format('YYYYMMDDHHmm') : ''

          temp = omit(temp, 'datetimeRange')
        }

        if ('appointmentDateStartMonth' in temp) {
          temp.appointmentDateStartMonth = temp.appointmentDateStartMonth
            ? temp.appointmentDateStartMonth.format('YYYYMM')
            : ''
        }

        if ('appointmentDateEndMonth' in temp) {
          temp.appointmentDateEndMonth = temp.appointmentDateEndMonth
            ? temp.appointmentDateEndMonth.format('YYYYMM')
            : ''
        }

        return temp
      },
      async onClear() {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {}
        })

        this.form.resetFields()
      },
      onSubmit(e) {
        e?.preventDefault()

        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            const payload = this.transformValue(values)

            await this.$store.dispatch('setSearch', {
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              additionalQueryParameters: this.additionalQueryParameters,
              payload
            })
          }
        })
      }
    }
  }
}
