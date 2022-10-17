import './index.scss'
import { List } from 'ant-design-vue'
import moment from 'moment'

export default {
  props: {
    /**
     * 布局
     * normal/dateBefore
     */
    layout: {
      type: String,
      default: 'normal'
    },
    data: Array,
    loading: Boolean
  },
  methods: {
    onClick(item) {
      this.$emit('clickItem', item)
    }
  },
  render() {
    return (
      <List
        loading={this.loading}
        class={'tg-list-container'}
        data-source={this.data}
        {...{
          scopedSlots: {
            renderItem: (item, index) => (
              <List.Item
                class="list-container"
                onclick={() => this.onClick(item)}
              >
                {this.layout === 'dateBefore' ? (
                  <div class="list-date-before">
                    <div class="which-day">{moment(item.time).date()}</div>
                    <div class="which-month">{moment(item.time).month()}月</div>
                  </div>
                ) : (
                  <div class="list-serial-number">{index + 1}</div>
                )}
                <div
                  class="list-text"
                  title={item.title}
                >
                  {item.title}
                </div>
                {this.layout !== 'dateBefore' ? <div class="list-datetime">{item.time}</div> : null}
              </List.Item>
            )
          }
        }}
      />
    )
  }
}
