import '../assets/styles/index.scss'
import { Tabs } from 'ant-design-vue'
import Table from './Table'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({ activeKey: 1 }),
  methods: {
    onChange(activeKey) {
      this.activeKey = activeKey
      this.$emit('change', activeKey)
    }
  },
  render() {
    return (
      <Tabs
        class={'fe-height-of-statistical-tabs'}
        activeKey={this.activeKey}
        onChange={this.onChange}
        tabBarGutter={8}
        type={'card'}
      >
        <Tabs.TabPane key={1} tab={'按年龄统计'}>
          <Table type={1} />
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab={'按年级统计'}>
          <Table type={2} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
