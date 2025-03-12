import './index.scss'
import Scroll from './Scroll'
import { Icon, Tooltip } from 'ant-design-vue'

export default {
  name: 'TGScrollingNumberMain',
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    // 值的高度
    valueHeight: {
      type: Number,
      default: 40
    },
    // 次要显示数值
    subValue: {
      type: [Object, Number, String, undefined],
      default: undefined
    },
    // 文本预值的间隔
    gap: {
      type: Number,
      default: 0
    },
    // 单位
    unit: {
      type: String,
      default: undefined
    },
    tip: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      innerText: '',
      innerValue: ''
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(value) {
        this.innerText = value
      }
    },
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value?.toLocaleString()?.split('') ?? [0]
      }
    }
  },
  render() {
    return (
      <div class="tg-scrolling-number-container" style={{ gap: this.gap + 'px' }}>
        <div class="tg-scrolling-number-text">
          {this.innerText && <span>{this.innerText}</span>}
          {this.unit && <span class={'tg-scrolling-number-unit'}>({this.unit})</span>}
          {
            this.tip && (
              <Tooltip style={{ marginLeft: 'auto' }} title={this.tip}>
                <Icon type="question-circle" />
              </Tooltip>
            )
          }
        </div>
        <div
          class="tg-scrolling-number-value"
          style={{ height: this.valueHeight + 'px', flexBasis: `${this.valueHeight}px` }}
        >
          {
            this.innerValue.map(numStr => {
              return !isNaN(+numStr)
                ? <Scroll targetNumber={+numStr} itemHeight={this.valueHeight} />
                : <div>{numStr}</div>
            })
          }
        </div>
        {
          this.subValue && (
            <div class={'tg-scrolling-number-sub-value'}>
              {this.subValue}
            </div>
          )
        }
      </div>
    )
  }
}
