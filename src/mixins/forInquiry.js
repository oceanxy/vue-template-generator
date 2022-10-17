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
      /**
       * 此函数值保留一些高频共用类参数的处理
       * @param values
       * @returns {{}}
       */
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

        if ('monthRange' in temp) {
          temp.appointmentDateStartMonth = temp.monthRange[0]
            ? moment(temp.monthRange[0]).format('YYYYMM')
            : ''
          temp.appointmentDateEndMonth = temp.monthRange[1]
            ? moment(temp.monthRange[1]).format('YYYYMM')
            : ''

          temp = omit(temp, 'monthRange')
        }

        return temp
      },
      async onClear() {
        this.form.resetFields()
        await this.onSearch({})
      },
      async onSearch(payload) {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          additionalQueryParameters: {
            ...this.$route.query,
            // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
            // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
            ...(this.additionalQueryParameters || {})
          },
          payload
        })
      },
      onSubmit(e) {
        e?.preventDefault()

        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            const payload = this.transformValue(values)

            await this.onSearch(payload)
          }
        })
      }
    }
  }
}
