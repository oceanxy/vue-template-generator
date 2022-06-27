/**
 * 表格弹窗混合，依赖 forModal 混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-27 周一 10:14:13
 */

import { message } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import { omit } from 'lodash'

export default visibleField => {
  return {
    mixins: [forModal()],
    data() {
      return {
        visibleField
      }
    },
    methods: {
    }
  }
}
