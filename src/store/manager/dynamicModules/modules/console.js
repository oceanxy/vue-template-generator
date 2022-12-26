import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    activities: {
      list: [],
      loading: false
    },
    list: {
      bmiData: [],
      endDataVO: {},
      schoolNumVO: {},
      visionData: []
    },
    // 页面底部可切换模块的当前展示模块类型，具体类型见组件。组件位置：本页面 components 下 Title 组件
    othersType: 1,
    others: {
      loading: false,
      list: []
    }
  }
}), [
  'state.pagination',
  'state.treeIdField',
  'state.sortFieldList',
  'state.currentItem',
  'state.details',
  'state.visibilityOfEdit',
  'state.selectedRowKeys',
  'state.selectedRows'
])
