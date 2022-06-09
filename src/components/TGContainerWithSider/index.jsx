import './assets/styles/index.scss'

export default {
  name: 'TGProfileLayout',
  props: {
    contentClass: {
      type: String,
      default: ''
    },
    siderClass: {
      type: String,
      default: ''
    },
    siderOnLeft: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    collapsed: false
  }),
  methods: {},
  render() {
    return (
      <div class="tg-container-with-sider">
        <div
          class={`tg-container-with-sider--main${this.contentClass ? ` ${this.contentClass}` : ''}`}
        >
          {
            this.$slots.default
          }
        </div>
        <div
          style={{ order: this.siderOnLeft ? -1 : 1 }}
          class={`tg-container-with-sider--sider${this.siderClass ? ` ${this.siderClass}` : ''}`}
        >
          {
            this.$slots.sider
          }
        </div>
      </div>
    )
  }
}
