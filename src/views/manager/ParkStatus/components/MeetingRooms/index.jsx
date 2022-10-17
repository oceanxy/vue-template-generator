import './index.scss'
import { Button, Dropdown, Empty, Icon, Menu, Spin, Tag } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
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
    onSigningProcess(item) {
      this.$router.push({
        name: 'signingProcess',
        query: item.contractId
          ? {
            id: item.contractId,
            rid: item.id,
            ac: item.signingType // ac(signingType): 1 新约 2 续约
          }
          : { rid: item.id }
      })
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
              <div
                class="bnm-meeting-room"
                style={{ '--color': this.statusColor[item.useStatus - 1] }}
              >
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
                          <Button
                            ghost
                            onClick={() => this.onSigningProcess(item)}
                          >
                            客户签约
                          </Button>
                        </div>
                      )
                  }
                </div>
                <Dropdown class="btn">
                  <Icon type="more" />
                  <Menu slot="overlay">
                    <Menu.Item
                      onClick={() => this._setVisibleOfModal({ id: item.id }, 'visibleOfDetails')}
                    >
                      场地详情
                    </Menu.Item>
                    {
                      // item.useStatus === 3 ? (
                      //   <Menu.Item onClick={() => this.onVenueReservation(item.id)}>
                      //     场地预定
                      //   </Menu.Item>
                      // ) : null
                    }
                    {
                      item.useStatus === 1 || item.useStatus === 3 ? (
                        <Menu.Item onClick={() => this.onSigningProcess(item)}>客户签约</Menu.Item>
                      ) : null
                    }
                    {
                      item.useStatus === 2 ? [
                        <Menu.Item
                          onClick={async () => {
                            // 跳合同详情
                            await this.$router.push({
                              name: 'contractReviewDetails',
                              query: { cid: item.contractId }
                            })
                          }}
                        >
                          入驻企业详情
                        </Menu.Item>,
                        <Menu.Item
                          onClick={() => this._setVisibleOfModal(
                            { id: item.contractId },
                            'visibleOfBills'
                          )}
                        >
                          待缴账单
                        </Menu.Item>,
                        <Menu.Item
                          onClick={
                            () => this._setVisibleOfModal(
                              { id: item.contractId },
                              'visibleOfRenew'
                            )
                          }
                        >
                          客户续约
                        </Menu.Item>,
                        <Menu.Item
                          onClick={
                            () => this._setVisibleOfModal(
                              {
                                ...item,
                                id: item.contractId
                              },
                              'visibleOfTerminate'
                            )
                          }
                        >
                          客户解约
                        </Menu.Item>
                      ] : null
                    }
                  </Menu>
                </Dropdown>
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
