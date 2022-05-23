import { List } from 'ant-design-vue'

export default {
  props: {
    themeColor: {
      type: String,
      default: '#ffffff'
    }
  },
  render() {
    return (
      <List
        dataSource={
          [
            { a: '关于停电的通知', b: '05-23 16:02:00' },
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
                  <div class="list-serial-number">{index + 1}</div>
                  <div class="list-text">{item.a}</div>
                  <div class="list-datetime">{item.b}</div>
                </List.Item>
              )
            }
          }
        } />
    )
  }
}
