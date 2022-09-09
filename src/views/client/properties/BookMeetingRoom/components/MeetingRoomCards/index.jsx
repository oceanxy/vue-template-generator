import './index.scss'
import { Button, Empty, Tag } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    list() {
      return this.getState('list', this.moduleName)
    }
  },
  methods: {
    async toBook(item) {
      await this.$router.push({
        name: 'book',
        params: {
          id: item.id,
          roomNo: item.roomNo,
          roomType: item.roomType
        }
      })
    }
  },
  async created() {
    await this.$store.dispatch('getList', { moduleName: this.moduleName })
  },
  render() {
    return (
      <div class={'book-meeting-room-content'}>
        {
          this.list.length
            ? this.list.map(item => (
              <div class={`meeting-room${item.roomStatus !== 1 ? ' occupied' : ''}`}>
                <div class="info">
                  <div class="title">
                    <Tag>
                      {
                        item.roomStatus === 1
                          ? '空置'
                          : '已占用'
                      }
                    </Tag>
                    {
                      item.roomNo
                    }（{item.roomType === 1 ? '普通' : '会议室'}）
                  </div>
                  <div>
                    {item.buildName}/{item.floorName}
                  </div>
                  {/* <div>2022-05-18 14:10~16:00</div> */}
                </div>
                <div class="btns">
                  <Button
                    ghost
                    type="primary"
                    onClick={() => this.toBook(item)}
                  >
                    立即预约
                  </Button>
                </div>
              </div>
            ))
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </div>
    )
  }
}
