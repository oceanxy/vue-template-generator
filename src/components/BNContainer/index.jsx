import './index.scss'
import { Button } from 'ant-design-vue'

export default {
  props: {
    /**
     * 标题文字
     */
    title: {
      type: [String, Object],
      default: ''
    },
    /**
     * 组件宽度
     * 数字的单位为像素，字符串的单位为百分比
     */
    width: {
      type: [Number, String],
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
    },
    /**
     * 显示边框阴影
     */
    showBoxShadow: {
      type: Boolean,
      default: true
    },
    /**
     * 标题区的自定义class
     */
    titleClass: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <div
        class={`tg-universal-box${this.showBoxShadow ? ' show-shadow' : ''}`}
        style={{ '--box-width': `${this.width}${isNaN(this.width) ? '' : 'px'}` }}
      >
        {
          this.title ? (
            <div class={`box-title${this.titleClass ? ` ${this.titleClass}` : ''}`}>
              {this.title}
              {this.showMore ? <Button icon="right" /> : null}
            </div>
          ) : null
        }
        <div class={`box-content${this.contentClass ? ` ${this.contentClass}` : ''}`}>
          {
            this.$slots.default
          }
        </div>
      </div>
    )
  }
}
