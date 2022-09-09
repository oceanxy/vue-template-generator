import './index.scss'

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
     * point：圆点 / vertical：竖线 / ring：圆环
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
