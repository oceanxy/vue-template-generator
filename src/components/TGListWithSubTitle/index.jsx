import './index.scss'
import { Button, List, Tag } from 'ant-design-vue'
import TGTitleWithShape from '@/components/TGTitleWithShape'

export default {
  props: {
    /**
     * 形状类型
     * point：圆点 / vertical：竖线 / ring：圆环
     */
    type: {
      type: String,
      default: 'point'
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
        class="tg-list-with-sub-title-container"
        dataSource={[
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 0 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 1 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 2 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
          { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 }
        ]}
        {
          ...{
            scopedSlots: {
              renderItem: item => (
                <List.Item class="list-container">
                  <TGTitleWithShape
                    type={this.type}
                    class={`shape ${['normal', 'todo', 'doing', 'done'][+item.status]}`}
                  >
                    <span class="name">{item.name}</span>
                    <Tag color="#F5222D">急</Tag>
                  </TGTitleWithShape>
                  <Button.Group class="btns">
                    <Button type="link">处理</Button>
                  </Button.Group>
                  <div class="date">{item.date}</div>
                </List.Item>
              )
            }
          }
        }
      />
    )
  }
}
