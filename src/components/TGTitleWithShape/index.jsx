import './index.scss'
import { Tag } from 'ant-design-vue'

export default {
  props: {
    /**
     * 显示形状
     */
    showShape: {
      type: Boolean,
      default: true
    },
    /**
     * 形状类型
     * point：圆点 / vertical：竖线
     */
    type: {
      type: String,
      default: 'point'
    }
  },
  render() {
    return (
      <div class={`title-with-shape${this.showShape ? ` ${this.type}` : ''}`}>
        {this.$slots.default}
      </div>
    )
  }
}
