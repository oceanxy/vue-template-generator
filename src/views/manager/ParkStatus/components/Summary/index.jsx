import './styles/index.scss'
import { Card } from 'ant-design-vue'
import ScrollingNumber from '@/components/ScrollingNumber'

export default {
  render() {
    return (
      <div class={'pe-summary-container'}>
        <Card class={'school-summary-card'}>
          <ScrollingNumber
            value={1542}
            text={'学校数'}
          />
        </Card>
        <Card class={'student-summary-card'}>
          <ScrollingNumber
            value={1728}
            text={'学生数'}
          />
        </Card>
        <Card class={'pe-item-summary-card'}>
          <ScrollingNumber
            value={1394}
            text={'已开通体检项目'}
          />
        </Card>
      </div>
    )
  }
}
