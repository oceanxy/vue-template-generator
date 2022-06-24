import './index.scss'
import { Button, List, Tag } from 'ant-design-vue'
import TGTitleWithShape from '@/components/TGTitleWithShape'

export default {
  props: {
    /**
     * 数据
     */
    dataSource: {
      type: Array,
      default: () => []
    },
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
        dataSource={this.dataSource}
        {
          ...{
            scopedSlots: {
              renderItem: item => (
                <List.Item class="list-container">
                  <TGTitleWithShape
                    type={this.type}
                    class={`shape ${['normal', 'todo', 'doing', 'done'][+item.status || 0]}`}
                  >
                    <span class="name">{item.fullName}</span>
                    {
                      this.status ? (<Tag color="#F5222D">急</Tag>) : null
                    }
                  </TGTitleWithShape>
                  <Button.Group class="btns">
                    {
                      this.status
                        ? <Button type="link">处理</Button>
                        : (
                          <span
                            class={'status'}
                            style={{
                              color: [
                                '#52c41a', '#faad14', '#f5222d'
                              ][item.auditStatus - 1]
                            }}
                          >
                            {item.auditStatusStr}
                          </span>
                        )
                    }
                  </Button.Group>
                  <div class="date">{item.applyTimeStr}</div>
                </List.Item>
              )
            }
          }
        }
      />
    )
  }
}
