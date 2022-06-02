import './assets/styles/index.scss'

export default {
  name: 'TGProfileLayout',
  data: () => ({
    collapsed: false
  }),
  methods: {},
  render() {
    return (
      <div class="tg-container-with-sider">
        <div class='tg-container-with-sider--main'>
          {
            this.$slots.default
          }
        </div>
        <div class="tg-container-with-sider--sider">
          {
            this.$slots.sider
          }
        </div>
      </div>
    )
  }
}
