import './index.scss'
import Scroll from './Scroll'

export default {
  name: 'TGScrollingNumberMain',
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    // 值的高度
    valueHeight: {
      type: Number,
      default: 40
    },
    // 文本预值的间隔
    gap: {
      type: Number,
      default: 10
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
        this.innerValue = value.toLocaleString().split('')
      }
    }
  },
  render() {
    return (
      <div class="tg-scrolling-number-container" style={{ gap: this.gap + 'px' }}>
        {
          this.innerText
            ? (
              <div class="tg-scrolling-number-text">
                {this.innerText}
              </div>
            )
            : null
        }
        <div
          class="tg-scrolling-number-value"
          style={
            { height: this.valueHeight + 'px' }
          }
        >
          {
            this.innerValue.map(numStr => {
              return !isNaN(+numStr)
                ? <Scroll targetNumber={+numStr} itemHeight={this.valueHeight} />
                : <div>{numStr}</div>
            })
          }
        </div>
      </div>
    )
  }
}
