import './index.scss'
import { Button, Dropdown, Icon, Menu, Tag } from 'ant-design-vue'

export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    // rgb格式
    statusColor: ['0,113,255', '82,196,26', '250,140,22'],
    statusText: ['已签约', '空 闲', '已预订']
  }),
  methods: {
    toBook() {
      this.$router.push({ name: 'book' })
    }
  },
  render() {
    return (
      <div
        class="bnm-meeting-room"
        style={{ '--color': this.statusColor[this.status] }}
      >
        <div class="info">
          <div class="title">
            <Tag>{this.statusText[this.status]}</Tag>
            8701（大会议室）
          </div>
          {
            this.status !== 1
              ? [
                <div class="name">重庆誉存科技有限公司</div>,
                <div class="time">2022-05-18 14:10~16:00</div>
              ]
              : (
                <div class='bnm-meeting-room-btns'>
                  <Button ghost>场地预定</Button>
                  <Button ghost>客户签约</Button>
                </div>
              )
          }
        </div>
        {
          this.status !== 1 ? (
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
    )
  }
}
