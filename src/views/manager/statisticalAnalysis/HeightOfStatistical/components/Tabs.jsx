import '../assets/styles/index.scss'
import { Tabs } from 'ant-design-vue'
import Table from './Table'
import Inquiry from './Inquiry'

export default {
  render() {
    return (
      <Tabs
        class={'fe-height-of-statistical-tabs'}
        defaultActiveKey={1}
        tabBarGutter={8}
        type={'card'}
      >
        <Tabs.TabPane key={1} tab={'按年龄统计'}>
          <Inquiry />
          {/*<Table />*/}
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab={'按年级统计'}>
          {/*<Table />*/}
          2
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
