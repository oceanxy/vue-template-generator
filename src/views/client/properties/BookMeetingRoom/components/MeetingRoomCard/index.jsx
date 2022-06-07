import './index.scss'
import { Button, Tag } from 'ant-design-vue'

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
      <div class={`meeting-room${this.occupied ? ' occupied' : ''}`}>
        <div class="info">
          <div class="title">
            <Tag>已占用</Tag>
            8701（大会议室）
          </div>
          <div>重庆誉存科技有限公司</div>
          <div>2022-05-18 14:10~16:00</div>
        </div>
        <div class="btns">
          <Button ghost type="primary" onClick={this.toBook}>立即预约</Button>
        </div>
      </div>
    )
  }
}
