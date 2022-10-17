import './index.scss'
import { Button } from 'ant-design-vue'

export default {
  props: {
    /**
     * 标题文字
     */
    modalTitle: {
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
    },
    showTitleShape: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onMore() {
      this.$emit('more')
    }
  },
  render() {
    return (
      <div
        class={`${this.showBoxShadow ? 'show-shadow ' : ''}tg-universal-box`}
        style={{ '--box-width': `${this.width}${isNaN(this.width) ? '' : 'px'}` }}
      >
        {
          this.modalTitle
            ? (
              <div
                class={`${
                  this.titleClass
                    ? `${this.titleClass} `
                    : ''
                }${
                  this.showTitleShape
                    ? 'divider '
                    : ''
                }box-title`}
              >
                {this.modalTitle}
                {
                  this.showMore
                    ? <Button
                      class={'more-btn'}
                      icon="right"
                      onclick={this.onMore}
                    />
                    : null
                }
              </div>
            )
            : null
        }
        {
          this.$slots.default
            ? (
              <div class={`${this.contentClass ? `${this.contentClass} ` : ''}box-content`}>
                {this.$slots.default}
              </div>
            )
            : null
        }
      </div>
    )
  }
}
