import './index.scss'
import { List } from 'ant-design-vue'

export default {
  props: {
    /**
     * 主题颜色
     */
    themeColor: {
      type: String,
      default: '#ffffff'
    },
    /**
     * 布局
     * normal/dateBefore
     */
    layout: {
      type: String,
      default: 'normal'
    }
  },
  render() {
    return (
      <List
        dataSource={
          [
            { a: '关于停电的通知关于停电的通知关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' },
            { a: '关于停电的通知', b: '05-23 16:02:00' }
          ]
        }
        {
          ...{
            scopedSlots: {
              renderItem: (item, index) => (
                <List.Item
                  class="list-container"
                  style={{ '--theme-color': this.themeColor }}
                >
                  {
                    this.layout === 'dateBefore'
                      ? (
                        <div class="list-date-before">
                          <div class="which-day">23</div>
                          <div class="which-month">05月</div>
                        </div>
                      )
                      : <div class="list-serial-number">{index + 1}</div>
                  }
                  <div class="list-text" title={item.a}>{item.a}</div>
                  {
                    this.layout !== 'dateBefore'
                      ? <div class="list-datetime">{item.b}</div>
                      : null
                  }
                </List.Item>
              )
            }
          }
        } />
    )
  }
}
