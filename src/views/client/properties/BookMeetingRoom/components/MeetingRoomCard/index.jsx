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
    toBook(item) {
      this.$router.push({
        name: 'book',
        params: { id: this.data.id, roomNo: this.data.roomNo, roomType: this.data.roomType }
      })
    }
  },
  render() {
    return (
      <div class={`meeting-room${this.occupied ? ' occupied' : ''}`}>
        <div class="info">
          <div class="title">
            <Tag>{this.data.roomStatus === 1 ? '空置' : '已占用'}</Tag>
            {this.data.roomNo}（{this.data.roomType === 1 ? '普通' : '会议室'}）
          </div>
          <div>
            {this.data.buildName}/{this.data.floorName}
          </div>
          {/* <div>2022-05-18 14:10~16:00</div> */}
        </div>
        <div class="btns">
          <Button ghost type="primary" onClick={this.toBook}>
            立即预约
          </Button>
        </div>
      </div>
    )
  }
}
