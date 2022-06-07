import './index.scss'
import { Dropdown, Icon, Menu, Tag } from 'ant-design-vue'

export default {
  props: {
    occupied: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    toBook() {
      this.$router.push({ name: 'book' })
    }
  },
  render() {
    return (
      <div class={`bnm-meeting-room${this.occupied ? ' occupied' : ''}`}>
        <div class="info">
          <div class="title">
            <Tag>已占用</Tag>
            8701（大会议室）
          </div>
          <div class='name'>重庆誉存科技有限公司</div>
          <div class='time'>2022-05-18 14:10~16:00</div>
        </div>
        <Dropdown class="btn">
          <Icon type='more' />
          <Menu slot='overlay'>
            <Menu.Item>场地详情</Menu.Item>
            <Menu.Item>场地预定</Menu.Item>
            <Menu.Item>入驻企业详情</Menu.Item>
            <Menu.Item>账单查询</Menu.Item>
            <Menu.Item>客户签约</Menu.Item>
            <Menu.Item>客户续约</Menu.Item>
            <Menu.Item>客户解约</Menu.Item>
          </Menu>
        </Dropdown>
      </div>
    )
  }
}
