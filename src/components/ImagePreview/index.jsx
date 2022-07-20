import { Modal, Badge, Button } from 'ant-design-vue'
import './index.scss'
export default {
  props: {
    imageUrls: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      curIndex: 0,
      visible: false
    }
  },
  computed: {
    firstUrl() {
      let url = ''
      if (this.imageUrls.length > 0) {
        url = this.imageUrls[this.imageUrls.length - 1]
      }
      return url
    },
    curUrl() {
      let url = ''
      if (this.imageUrls.length > 0) {
        url = this.imageUrls[this.curIndex]
      }
      return url
    }
  },
  methods: {
    onClickImg() {
      if (this.imageUrls.length > 0) {
        this.visible = true
      }
    },
    onCancel() {
      this.visible = false
      this.curIndex = 0
    },
    onSwitch(type) {
      if (type === 'up') {
        if (this.curIndex !== 0) {
          this.curIndex--
        }
      } else {
        if (this.curIndex !== this.imageUrls.length - 1) {
          this.curIndex++
        }
      }
    }
  },
  render() {
    return (
      <div class="bn-image-preview">
        <Badge
          count={this.imageUrls.length}
          offset={[0, 5]}
          number-style={{
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset'
          }}>
          <img
            class="img"
            src={this.firstUrl}
            style={{ width: `${this.width}px`, height: `${this.height}px` }}
            onClick={() => this.onClickImg()}></img>
        </Badge>
        <Modal
          visible={this.visible}
          wrapClassName="bn-image-preview-modal"
          width="90%"
          footer={null}
          oncancel={this.onCancel}>
          <img src={this.curUrl}></img>
          <div class="btn up">
            <Button shape="circle" icon="left" onClick={() => this.onSwitch('up')}></Button>
          </div>
          <div class="btn next">
            <Button shape="circle" icon="right" onClick={() => this.onSwitch('next')}></Button>
          </div>
        </Modal>
      </div>
    )
  }
}
