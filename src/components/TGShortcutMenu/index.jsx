import { List } from 'ant-design-vue'
import './index.scss'

export default {
  props: {
    column: {
      type: Number,
      default: 4
    },
    showLogout: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(item) {
      if (item.name === 'log-out') {
        this.$store.dispatch('login/logout')
      } else {
        this.$router.push({ name: item.name })
      }
    }
  },
  render() {
    return (
      <List
        grid={{ gutter: 18, column: this.column }}
        dataSource={
          [
            { a: '我的报表', name: 'report-form' },
            { a: '政策申报', name: 'policy-declaration' },
            { a: '我的资料', name: 'my-profile' },
            { a: '我的合同', name: 'my-contract' },
            { a: '我的账单', name: 'my-bill' },
            { a: '我的发票', name: 'my-invoice' },
            { a: '会议室预约', name: 'meeting-room-reservation' },
            { a: '物业保修', name: 'property-warranty' },
            { a: '在线投诉', name: 'online-complaint' },
            { a: '退出登录', name: 'log-out' }
          ]
        }
        {
          ...{
            scopedSlots: {
              renderItem: item => (
                item.name !== 'log-out' || this.showLogout ? (
                  <List.Item
                    class="list-container icon-menu"
                  >
                    <div
                      class={`list-icon ${item.name}`}
                      onClick={() => this.onClick(item)}
                    >
                      {item.a}
                    </div>
                  </List.Item>
                ) : null
              )
            }
          }
        } />
    )
  }
}
