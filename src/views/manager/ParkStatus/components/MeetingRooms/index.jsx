import './index.scss'
import { Button, Dropdown, Empty, Icon, Menu, Spin, Tag } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  data: () => ({
    // rgb格式
    statusColor: ['0,113,255', '250,140,22', '82,196,26']
  }),
  computed: {
    ...mapGetters({
      getLoading: 'getLoading',
      getCurrentItem: 'getCurrentItem',
      getState: 'getState'
    }),
    dataSource() {
      return this.getState('list', this.moduleName)
    },
    loading() {
      return this.getLoading(this.moduleName)
    }
  },
  methods: {
    onVenueReservation(id) {
      this.$router.push({ name: 'venueReservation', query: { id } })
    },
    onSigningProcess(id) {
      this.$router.push({ name: 'signingProcess', query: { rid: id } })
    }
  },
  render() {
    return (
      <Spin
        spinning={this.loading}
        class={`park-status-main--main${!this.dataSource.length ? ' tile' : ''}`}
      >
        {
          this.dataSource.length
            ? this.dataSource.map(item => (
              <div class="bnm-meeting-room" style={{ '--color': this.statusColor[item.useStatus - 1] }}>
                <div class="info">
                  <div class="title">
                    <Tag>{item.useStatusStr}</Tag>
                    {item.roomNo}
                  </div>
                  {
                    item.useStatus !== 3
                      ? [
                        <div class="name">{item.companyName}</div>,
                        <div class="time">{item.timePeriod}</div>
                      ]
                      : (
                        <div class="bnm-meeting-room-btns">
                          {/*<Button ghost onClick={() => this.onVenueReservation(item.id)}>场地预定</Button>*/}
                          <Button ghost onClick={() => this.onSigningProcess(item.id)}>客户签约</Button>
                        </div>
                      )
                  }
                </div>
                {
                  item.useStatus === 1 ? (
                    <Dropdown class="btn">
                      <Icon type="more" />
                      <Menu slot="overlay">
                        <Menu.Item>场地详情</Menu.Item>
                        <Menu.Item>场地预定</Menu.Item>
                        <Menu.Item>入驻企业详情</Menu.Item>
                        <Menu.Item>账单查询</Menu.Item>
                        <Menu.Item>客户签约</Menu.Item>
                        <Menu.Item>客户续约</Menu.Item>
                        <Menu.Item>客户解约</Menu.Item>
                      </Menu>
                    </Dropdown>
                  ) : null
                }
              </div>
            ))
            : (
              <div class={'park-status-empty'}>
                <Empty />
              </div>
            )
        }
      </Spin>
    )
  }
}
