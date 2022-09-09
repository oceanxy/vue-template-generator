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
    await this.$store.dispatch('getListForSelect', {
      moduleName: 'common',
      stateName: 'indicatorCategoryTree',
      customApiName: 'getIndicatorCategoryTree'
    })
  },
  async destroyed() {
    await this.setIndicatorCategoryIdSelected('')
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
    async setIndicatorCategoryIdSelected(value) {
      await this.$store.dispatch('common/setIndicatorCategoryIdSelected', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        value
      })
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
                  children: 'children', title: 'name', key: 'id'
                }}
                treeData={this.indicatorCategoryTree.list}
                onSelect={this.onSelect}
                defaultExpandedKeys={[
                  this.indicatorCategoryIdSelected,
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
