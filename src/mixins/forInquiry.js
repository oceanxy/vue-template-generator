/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格搜索
 * @Date: 2022-03-14 周一 15:33:20
 */

import { dispatch } from '@/utils/store'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

/**
 * 表格搜索混合
 * @param required {{parkId: boolean}}
 * @returns {Object}
 */
export default (required = { parkId: false }) => {
  const forInquiry = {
    inject: ['moduleName'],
    created() {
      // 为 search 创建动态侦听器
      this.$watch(
        () => this.$store.state[this.moduleName].search,
        () => this.$store.dispatch('getList', {
          moduleName: this.moduleName,
          pagination: {
            pageIndex: 0
          }
        })
      )
    },
    computed: {},
    watch: {},
    methods: {
      async onClear() {
        await dispatch(this.moduleName, 'setSearch')
        this.form.resetFields()
      },
      onSubmit(e) {
        e?.preventDefault()

        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.$store.dispatch('setSearch', {
              moduleName: this.moduleName,
              payload: cloneDeep(values)
            })
          }
        })
      }
    }
  }

  if (required.parkIdRequired) {
    forInquiry.computed = {
      ...forInquiry.computed,
      ...mapGetters({
        currentParkTreeKeySelected: 'currentParkTreeKeySelected'
      })
    }

    forInquiry.watch = {
      ...forInquiry.watch,
      currentParkTreeKeySelected() {
        this.$nextTick(this.onSubmit)
      }
    }
  }

  return forInquiry
}
