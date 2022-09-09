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
  render() {
    return (
      <TGContainerWithSider
        class="bn-content-container"
        siderClass="bn-content-sider-container"
        contentClass={`bn-content-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
      >
        <template slot="default">{this.$slots.default}</template>
        <template slot="sider">{this.$slots.tree}</template>
      </TGContainerWithSider>
    )
  }
}
