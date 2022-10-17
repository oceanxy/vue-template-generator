import { List } from 'ant-design-vue'
import utilityFunction from '@/utils/utilityFunction'
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
        dataSource={[
          { a: '我的报表', name: 'reportForm' },
          { a: '政策申报', name: 'policyDeclaration' },
          { a: '我的资料', name: 'corInfo' },
          { a: '我的合同', name: 'contract' },
          { a: '我的账单', name: 'bill' },
          { a: '我的发票', name: 'invoice' },
          { a: '会议室预约', name: 'reservation' },
          { a: '物业报修', name: 'repair' },
          { a: '在线投诉', name: 'complaint' },
          { a: '退出登录', name: 'logOut' }
        ]}
        {...{
          scopedSlots: {
            renderItem: item =>
              item.name !== 'logOut' || this.showLogout ? (
                <List.Item class="list-container icon-menu">
                  <div
                    class={`list-icon ${utilityFunction.toLowerCase(item.name)}`}
                    onClick={() => this.onClick(item)}
                  >
                    {item.a}
                  </div>
                </List.Item>
              ) : null
          }
        }}
      />
    )
  }
}
