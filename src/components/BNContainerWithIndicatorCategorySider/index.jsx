import './index.scss'
import { mapGetters } from 'vuex'
import { Empty, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'

export default {
  inject: ['moduleName'],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    indicatorCategoryIdSelected() {
      return this.getState('indicatorCategoryIdSelected', 'common')
    },
    indicatorCategoryTree() {
      return this.getState('indicatorCategoryTree', 'common')
    }
  },
  async created() {
    if (this.indicatorCategoryIdSelected !== '0') {
      // 重新进入页面时，初始化/重置指标分类ID
      // isFetchList为false代表本次修改状态不触发页面表格数据更新
      // indicatorCategoryIdSelected 取值‘0’，代表所有分类（与后端约定）
      await this.setIndicatorCategoryIdSelected('0', false)
    }

    await this.$store.dispatch('getListForSelect', {
      moduleName: 'common',
      stateName: 'indicatorCategoryTree',
      customApiName: 'getIndicatorCategoryTree'
    })
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      if (selected) {
        await this.setIndicatorCategoryIdSelected(selectedKeys[0])
      } else {
        await this.setIndicatorCategoryIdSelected(this.indicatorCategoryTree.list?.[0].id || '0')
      }
    },
    async setIndicatorCategoryIdSelected(value, isFetchList) {
      if (value !== this.indicatorCategoryIdSelected) {
        await this.$store.dispatch('common/setIndicatorCategoryIdSelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: { value, isFetchList }
        })
      }
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bn-park-container"
        siderClass="bn-park-sider-container"
        contentClass={`bn-park-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
      >
        <template slot="default">{this.$slots.default}</template>
        <Spin
          slot={'sider'}
          class="bnm-park-sider"
          spinning={this.indicatorCategoryTree.loading}
        >
          {
            this.indicatorCategoryTree.list?.length ? (
              <Tree
                selectedKeys={[this.indicatorCategoryIdSelected]}
                replaceFields={{
                  children: 'children',
                  title: 'name',
                  key: 'id'
                }}
                treeData={this.indicatorCategoryTree.list}
                onSelect={this.onSelect}
                defaultExpandedKeys={[
                  this.indicatorCategoryIdSelected,
                  this.indicatorCategoryTree.list?.[0].id,
                  this.indicatorCategoryTree.list?.[0].children?.[0].id
                ]}
                showLine
              />
            ) : <Empty />
          }

        </Spin>
      </TGContainerWithSider>
    )
  }
}
