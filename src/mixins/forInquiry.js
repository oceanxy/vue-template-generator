/**
 * 表格搜索混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { omit } from 'lodash'

export default () => {
  return {
    inject: ['moduleName'],
    methods: {
      transformValue(values) {
        let temp = { ...values }

        if ('dateRange' in temp) {
          temp.startTime = temp.dateRange[0]
          temp.endTime = temp.dateRange[1]

          temp = omit(temp, 'dateRange')
        }

        if ('priceRange' in temp) {
          temp.min = temp.priceRange[0]
          temp.max = temp.priceRange[1]

          temp = omit(temp, 'priceRange')
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
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const payload = this.transformValue(values)
            await this.$store.dispatch('setSearch', {
              moduleName: this.moduleName,
              payload
            })
          }
        })
      }
    }
  }
}
