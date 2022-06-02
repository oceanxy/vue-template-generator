/**
 * 物业报修记录卡片
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-02 周四 10:49:50
 */

import './index.scss'
import { Icon } from 'ant-design-vue'

export default {
  props: {
    statusColor: {
      type: String,
      default: '#faad14'
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    return (
      <div class="repair-record-item">
        <div class="item-status" style={{ '--bgcolor': this.statusColor }}>
          {!this.data.status ? '待处理': '已处理'}
        </div>
        <div class="item-title">水龙头坏了</div>
        <div class="item-desc">水龙头坏了需要修理</div>
        <div class="item-images">
          <img src="x.png" alt="tupian" />
          <img src="x.png" alt="tupian" />
          <img src="x.png" alt="tupian" />
          <img src="x.png" alt="tupian" />
          <img src="x.png" alt="tupian" />
          <img src="x.png" alt="tupian" />
        </div>
        {
          this.data.status ? (
            <div class="item-process-info">
              <div class="item-handler">处理人：xxx（2022年6月1日 18:14:36）</div>
              <div class="item-result">处理结果</div>
              <div class="item-images">
                <img src="x.png" alt="tupian" />
                <img src="x.png" alt="tupian" />
                <img src="x.png" alt="tupian" />
              </div>
            </div>
          ) : null
        }
        <div class="item-time">
          <Icon type="history" />
          <span>2022年6月1日 18:12:54</span>
        </div>
      </div>
    )
  }
}
