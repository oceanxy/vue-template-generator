import './index.scss'
import { List } from 'ant-design-vue'

export default {
  props: {
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
        class={'tg-list-container'}
        dataSource={
          [
            // { a: '关于转发《重庆市高新技术企业认定管理机构办公室关于开展2022年第二批高新技术企业认定申报工作的通知》的通知', b: '06-27 14:02:50' },
            // { a: '关于开展2022年度制造业优质项目白名单申报工作的通知', b: '06-24 12:01:15' },
            // { a: '关于转发重庆市财政局《关于印发重庆市政府采购常见违规违法行为清单的通知》的通知', b: '06-20 17:22:07' },
            // { a: '关于做好工业和信息化部第四批专精特新“小巨人”企业申报和第一批专精特新“小巨人”企业复核工作的通知', b: '06-17 14:52:45' },
            // { a: '关于开展2021年度巴南区重点产业企业招工补贴申报工作的通知', b: '06-14 16:02:00' },
            // { a: '重庆市关于印发支持平台经济规范健康发展具体措施的通知', b: '06-13 18:07:41' },
            // { a: '关于征集全区科技型企业需求的通知', b: '06-13 19:02:00' }
          ]
        }
        {
          ...{
            scopedSlots: {
              renderItem: (item, index) => (
                <List.Item class="list-container">
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
