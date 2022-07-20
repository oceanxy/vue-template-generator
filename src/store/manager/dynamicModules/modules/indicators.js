import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfGrading: false,
    // 指标分类树（不带顶级）
    indicatorCategoryLikeTree: {
      loading: false,
      list: []
    }
  }
})
