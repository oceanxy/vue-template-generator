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
        grid={{ gutter: 16, column: 4 }}
        dataSource={
          [
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' },
            { a: '关于停电', b: '05-23 16:02:00' }
          ]
        }
        {
          ...{
            scopedSlots: {
              renderItem: (item, index) => (
                <List.Item
                  class="list-container"
                >
                  <div class="list-icon">{item.a}</div>
                </List.Item>
              )
            }
          }
        } />
    )
  }
}
