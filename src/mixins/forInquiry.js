/**
 * 表格搜索混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { cloneDeep } from 'lodash'

export default () => {
  return {
    inject: ['moduleName'],
    methods: {
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
            await this.$store.dispatch('setSearch', {
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              payload: cloneDeep(values)
            })
          }
        })
      }
    }
  }
}
