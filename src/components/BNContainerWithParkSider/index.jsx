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
  created() {
    this.$store.commit('common/setCurrentParkTreeKeySelected')
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      parkTree: 'parkTree',
      currentParkTreeKeySelected: 'currentParkTreeKeySelected'
    })
  },
  watch: {
    parkTree: {
      immediate: true,
      async handler(value) {
        if (value.length) {
          this.loading = false
        } else {
          await dispatch('common', 'getParkTree')
        }
      }
    },
    /**
     * 监听当前园区变化，根据 moduleName 触发列表更新
     * @param value
     * @returns {Promise<void>}
     */
    async currentParkTreeKeySelected(value) {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        additionalQueryParameters: {
          pageIndex: 0,
          parkId: value
        }
      })
    }
  },
  methods: {
    onSelect(selectedKeys, { selected }) {
      if (selected) {
        this.$store.commit('common/setCurrentParkTreeKeySelected', selectedKeys[0])
      } else {
        this.$store.commit('common/setCurrentParkTreeKeySelected')
      }
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bn-park-container"
        siderClass="bn-park-sider-container"
        contentClass={`bn-park-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft={true}
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
            treeData={this.parkTree}
            onSelect={this.onSelect}
          />
        </Spin>
      </TGContainerWithSider>
    )
  }
}
