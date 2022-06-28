import './index.scss'
import { Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  async created() {
    await this.$store.dispatch('common/setCurrentParkTreeKeySelected', {
      moduleName: this.moduleName,
      submoduleName: this.submoduleName,
      value: '0'
    })
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      floorTree: 'floorTree',
      currentParkTreeKeySelected: 'currentParkTreeKeySelected'
    })
  },
  watch: {
    floorTree: {
      immediate: true,
      async handler(value) {
        if (value.length) {
          this.loading = false
        } else {
          await dispatch('common', 'getFloorTree')
        }
      }
    }
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      if (selected) {
        await this.$store.dispatch('common/setCurrentParkTreeKeySelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          value: selectedKeys[0]
        })
      } else {
        await this.$store.dispatch('common/setCurrentParkTreeKeySelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          value: '0'
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
          spinning={this.loading}
        >
          <Tree
            selectedKeys={[this.currentParkTreeKeySelected]}
            replaceFields={{ children: 'children', title: 'name', key: 'id' }}
            treeData={this.floorTree}
            onSelect={this.onSelect}
          />
        </Spin>
      </TGContainerWithSider>
    )
  }
}
