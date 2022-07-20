/**
 * 物业报修记录卡片
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-02 周四 10:49:50
 */

import './index.scss'
import { Icon, Modal } from 'ant-design-vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    onOpen(src) {
      this.previewVisible = true
      this.previewImage = src
    },
    onCancel() {
      this.previewVisible = false
    }
  },
  render() {
    return (
      <div class="repair-record-item">
        <div class="item-status" style={{ '--bgcolor': this.data.acceptStatus === 2 ? '#faad14' : '#1890ff' }}>
          {this.data.acceptStatus === 2 ? '待处理' : '已处理'}
        </div>
        <div class="item-title">{this.data.repairItem}</div>
        <div class="item-desc">{this.data.description}</div>
        <div class="item-images">
          {this.data.imgList.map(item => {
            return <img src={item} alt="tupian" onClick={() => this.onOpen(item)} />
          })}
        </div>
        {this.data.acceptStatus === 1 ? (
          <div class="item-process-info">
            <div class="item-handler">
              处理人：{this.data.assigneeName}（{this.data.acceptTimeStr}）
            </div>
            <div class="item-result">{this.data.acceptResult}</div>
            <div class="item-images">
              {this.data.acceptImgList.map(item => (
                <img src={item} alt="tupian" onClick={() => this.onOpen(item)} />
              ))}
            </div>
          </div>
        ) : null}
        <div class="item-time">
          <Icon type="history" />
          <span>{this.data.repairTimeStr}</span>
        </div>
        <Modal visible={this.previewVisible} footer={null} onCancel={() => this.onCancel()}>
          <img alt="example" style="width: 100%" src={this.previewImage} />
        </Modal>
      </div>
    )
  }
}
