/**
 * 表格搜索混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { cloneDeep, omit } from 'lodash'

export default () => {
  return {
    inject: ['moduleName'],
    methods: {
      transformValue(values) {
        const temp = { ...values }
        if ('dateRange' in temp) {
          const [startTime, endTime] = temp.dateRange
          temp.startTime = startTime
          temp.endTime = endTime
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
