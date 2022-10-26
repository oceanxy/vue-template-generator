import './assets/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'

export default {
  inject: ['moduleName'],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return { tableRef: undefined }
  },
  provide() {
    return {
      getRefOfChild: ref => {
        this.tableRef = ref
      }
    }
  },
  methods: {
    onSidebarSwitch() {
      this.tableRef?.$parent?.resize()
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bn-content-container"
        siderClass="bn-content-sider-container"
        contentClass={`bn-content-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
        onSidebarSwitch={this.onSidebarSwitch}
      >
        <template slot="default">{this.$slots.default}</template>
        <template slot="sider">{this.$slots.tree}</template>
      </TGContainerWithSider>
    )
  }
}
