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
  created() {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  render() {
    return (
      <TGContainerWithSider
        class="bn-system-container"
        siderClass="bn-system-sider-container"
        contentClass={`bn-system-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger>
        <template slot="default">{this.$slots.default}</template>
        <template slot="sider">{this.$slots.tree}</template>
      </TGContainerWithSider>
    )
  }
}
