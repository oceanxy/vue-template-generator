import '../assets/styles/index.scss'
import { Button } from 'ant-design-vue'

export default {
  props: {
    /**
     * 标题文字
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 组件宽度
     */
    width: {
      type: Number,
      default: 500
    },
    /**
     * 是否展示“更多”箭头
     */
    showMore: {
      type: Boolean,
      default: false
    },
    /**
     * 内容区的自定义class
     */
    contentClass: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <div
        class="login-box"
        style={{ '--box-width': `${this.width}px` }}
      >
        {
          this.title ? (
            <div class="login-box-title">
              {this.title}
              {this.showMore ? <Button icon="right" /> : null}
            </div>
          ) : null
        }
        <div class={`login-box-content${this.contentClass ? ` ${this.contentClass}` : ''}`}>
          {
            this.$slots.default
          }
        </div>
      </div>
    )
  }
}
