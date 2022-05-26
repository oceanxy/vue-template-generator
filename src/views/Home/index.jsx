import './assets/styles/index.scss'
import { Icon, Tag } from 'ant-design-vue'
import Bg from '@/views/Home/assets/images/Bg'

export default {
  render() {
    return (
      <div class="tg-home">
        <div class="tg-home-summary">
          <div class="user-info">
            <Icon type="user" class="avatar" />
            <div class="info">
              <span class="name">重庆誉存科技有限公司</span>
              <span class="address">
                珠光御景/南区27栋/606号
                <Icon type="right" />
              </span>
            </div>
            <div class="tags">
              <Tag color="blue">已入住</Tag>
              <Tag color="cyan">已签约</Tag>
              <Tag color="red">已欠费</Tag>
            </div>
          </div>
          <div class="upcoming">
            <div class="upcoming-item">
              <Icon component={Bg} />
              <div>111</div>
            </div>
            <div>1</div>
            <div>1</div>
          </div>
        </div>
        <div class="tg-home-upcoming">
          111
        </div>
      </div>
    )
  }
}
